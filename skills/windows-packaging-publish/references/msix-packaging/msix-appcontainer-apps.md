# MSIX AppContainer Apps

Configure a desktop app packaged with MSIX to run in an AppContainer (lightweight app container) instead of full trust. The process and its children access only explicitly granted resources and are isolated by file system and registry virtualization.

## Signature / Usage

Single-project WinUI 3 (`Package.appxmanifest`), default full trust:

```xml
<Applications>
  <Application ... EntryPoint="$targetentrypoint$">
  </Application>
</Applications>
<Capabilities>
  <rescap:Capability Name="runFullTrust" />
</Capabilities>
```

AppContainer: change `EntryPoint`, remove the restricted capability, keep `Capabilities`:

```xml
<Application ... EntryPoint="windows.partialTrustApplication">
</Application>
<Capabilities/>
```

On Windows 10 version 2004 (build 19041) and later, use `uap10` attributes instead of `EntryPoint`:

```xml
<Package ... xmlns:uap10="http://schemas.microsoft.com/appx/manifest/uap/windows10/10" ...>
  <Application ... EntryPoint="$targetentrypoint$"
      uap10:TrustLevel="appContainer"
      uap10:RuntimeBehavior="packagedClassicApp">
  </Application>
  <Capabilities/>
```

## Options / Props

| Project type | How to configure |
|--------------|------------------|
| WinUI 3 single-project MSIX | Edit `EntryPoint` or set `uap10:TrustLevel` / `uap10:RuntimeBehavior`; remove `runFullTrust` |
| WinUI 3 two-project (Windows Application Packaging Project) | In Properties window for Dependencies > Applications > project reference, set Trust Level to Partial Trust (writes `<TrustLevel>Partial</TrustLevel>` in the `ProjectReference`); remove `runFullTrust` |
| C++ Win32 WndProc app | Add a Windows Application Packaging Project and add `<TrustLevel>Partial</TrustLevel>` to the `ProjectReference` |
| WPF / WinForms (.NET) | Add a Windows Application Packaging Project; set Trust Level to Partial Trust on the project reference |

## Notes

- For any process in the AppContainer that causes `DeploymentManager.Initialize` to be called, the app must declare the `packageManagement` restricted capability.
- A packaging project implies a `TrustLevel` of Full that overrides `Package.appxmanifest`; the explicit `Partial` setting remedies this.
- C++ Win32 build may fail with `APPX1673: App manifest is missing required element 'PhoneIdentity'`; add `mp:PhoneIdentity` with `PhoneProductId` and `PhonePublisherId` GUIDs to the manifest.
- Unpackaged apps can also run in an AppContainer; this page covers packaged apps only.
- WPF / WinForms guidance applies to .NET projects, not the .NET Framework templates.
- Source: https://learn.microsoft.com/en-us/windows/msix/msix-container, last updated 09/22/2025 (ms.date).

## Related

- [MSIX Containerization Overview](./msix-containerization-overview.md)
- [Single-Project MSIX](./single-project-msix.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
