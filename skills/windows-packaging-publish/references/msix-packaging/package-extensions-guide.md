# Package Extensions How-To Guide

Predefined manifest **extensions** let a packaged desktop app (one with runtime package identity) integrate with Windows in specific ways — creating a firewall exception, becoming a file type's default handler, running a startup task, appearing as a print target — by adding XML to the package manifest, with no code required beyond implementing whatever handler interface the extension category calls into.

## Signature / Usage

```xml
<!-- Firewall exception (requires the Full Trust Permission Level restricted capability) -->
<Package xmlns:desktop2="http://schemas.microsoft.com/appx/manifest/desktop/windows10/2"
         IgnorableNamespaces="desktop2">
  <Applications>
    <Application>
      <Extensions>
        <desktop2:Extension Category="windows.firewallRules">
          <desktop2:FirewallRules Executable="Contoso.exe">
            <desktop2:Rule Direction="in" IPProtocol="TCP" Profile="all"/>
          </desktop2:FirewallRules>
        </desktop2:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

```xml
<!-- Startup task: run an executable automatically when the user logs on -->
<Package xmlns:desktop="http://schemas.microsoft.com/appx/manifest/desktop/windows10"
         IgnorableNamespaces="desktop">
  <Applications>
    <Application>
      <Extensions>
        <desktop:Extension Category="windows.startupTask"
                            Executable="bin\MyStartupTask.exe"
                            EntryPoint="Windows.FullTrustApplication">
          <desktop:StartupTask TaskId="MyStartupTask" Enabled="true" DisplayName="My App Service"/>
        </desktop:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

## Options / Props

| Category | Purpose |
|----------|---------|
| `windows.firewallRules` | Adds inbound/outbound firewall exception rules for the app's executable(s) |
| `windows.startupTask` | Runs an executable automatically at user logon; user can disable it via Task Manager's Startup tab, and once disabled it can't be re-enabled programmatically |
| `windows.fileTypeAssociation` | Associates the app with file extensions/ProgIDs: default-open behavior, context-menu verbs, thumbnail/preview/property handlers, Kind-column grouping, multi-select launch model (`Player`/`Single`/`Document`) |
| `windows.protocol` | Registers a custom URI protocol that activates the app with parameters |
| `windows.appExecutionAlias` | Registers a short alias (must end in `.exe`) that starts the app without a full path; also used to redirect an existing unpackaged exe to the packaged app via `AppExecutionAliasRedirect` registry values |
| `windows.fileExplorerContextMenus` (+ `windows.comServer`) | Registers a File Explorer context-menu command backed by an `IExplorerCommand`/`IExplorerCommandState` COM implementation |
| `windows.cloudfiles` | Surfaces cloud-provider files in File Explorer's navigation pane with custom state/thumbnail/property handlers and context-menu verbs |
| `windows.autoPlayHandler` | Presents the app as an AutoPlay option when a device/volume is connected |
| `windows.appPrinter` | Makes the app appear as a print target in other apps' print dialogs; the app must accept print data in XPS format |
| `uap6:LoaderSearchPathOverride` | Declares up to 5 package-relative folders to add to the DLL loader search path for the app's processes |

## Notes

- All of these require the app to have package identity at runtime (packaged, or packaged with external location) — see Package Manifest Schema's `Extensions` element for the schema-level view of the `Extensions` block these categories populate.
- The `windows.startupTask` category only declares the extension; the run-time `StartupTask` class used to query/request-enable a declared task at run time is covered in windows-platform-integration, not in this skill.
- `windows.firewallRules` additionally requires the `Full Trust Permission Level` restricted capability declared in `Capabilities`.
- Restart-after-update behavior (`RegisterApplicationRestart` + `WM_QUERYENDSESSION`/`WM_ENDSESSION`) is a Win32 API pattern, not a manifest extension, but is commonly paired with these extensions for packaged desktop apps.

## Related

- [Package Manifest Schema](./package-manifest-schema.md)
- [Package Support Framework](./package-support-framework.md)
