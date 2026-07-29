# Integrate a Packaged Desktop App with File Explorer

Windows 11 apps extend the modern File Explorer context menu by implementing `IExplorerCommand` and registering the command with app identity. This applies to packaged desktop apps and to unpackaged Win32 apps that use a sparse package (external location) to gain package identity.

## Signature / Usage

```xml
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:com="http://schemas.microsoft.com/appx/manifest/com/windows10"
  xmlns:desktop4="http://schemas.microsoft.com/appx/manifest/desktop/windows10/4"
  xmlns:desktop5="http://schemas.microsoft.com/appx/manifest/desktop/windows10/5"
  IgnorableNamespaces="com desktop4 desktop5">

  <Applications>
    <Application Id="ContosoApp" Executable="ContosoApp.exe">
      <Extensions>
        <!-- Register the DLL as a COM server; Id is the command's CLSID -->
        <com:Extension Category="windows.comServer">
          <com:ComServer>
            <com:SurrogateServer DisplayName="Contoso commands">
              <com:Class
                Id="01234567-89AB-CDEF-0123-456789ABCDEF"
                Path="ContosoCommand.dll"
                ThreadingModel="STA" />
            </com:SurrogateServer>
          </com:ComServer>
        </com:Extension>

        <!-- Associate the CLSID with the shell item types it targets -->
        <desktop4:Extension Category="windows.fileExplorerContextMenus">
          <desktop4:FileExplorerContextMenus>
            <desktop5:ItemType Type="*">
              <desktop5:Verb
                Id="EditWithContoso"
                Clsid="01234567-89AB-CDEF-0123-456789ABCDEF" />
            </desktop5:ItemType>
          </desktop4:FileExplorerContextMenus>
        </desktop4:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

The native COM class implements `IExplorerCommand` (`GetTitle`, `GetState`, `GetIcon`, `Invoke`, `EnumSubCommands`, ...); File Explorer activates it to build the context menu and calls `Invoke` with the selected `IShellItemArray` when the user chooses the command. `GetState` returns `ECS_ENABLED`, `ECS_DISABLED`, or `ECS_HIDDEN` to control whether the command appears and can be selected; `EnumSubCommands` groups multiple commands from the same app into an app-attributed flyout.

## Options / Props

| Element / Attribute | Description |
|------|-------------|
| `com:Class/@Id` | CLSID of the COM class implementing `IExplorerCommand`; must match the class's own CLSID and the `Verb/@Clsid` below |
| `com:Class/@Path` | Package-relative path to the DLL |
| `com:SurrogateServer` | Hosts the COM class out-of-process in a surrogate; one of several `windows.comServer` registration kinds (`ExeServer`, `SurrogateServer`, `TreatAsClass`, `ProgId`, `ServiceServer`) — not the only option, but the one used for this scenario |
| `desktop5:ItemType/@Type` | Target shell items: `*` for files, `Directory` for folders, `Directory\Background` for a folder's background; multiple `ItemType` entries can map to the same CLSID |
| `desktop5:Verb/@Id` | Identifies this manifest registration |
| `desktop5:Verb/@Clsid` | Must match `com:Class/@Id` |
| `uap10:AllowExternalContent` (sparse package only) | Declares that the sparse package's app content lives outside the package |
| `uap10:TrustLevel` / `uap10:RuntimeBehavior="win32App"` (sparse package only) | Marks the `Application` entry as an externally-located Win32 app |
| `rescap:Capability Name="runFullTrust"` / `Name="unvirtualizedResources"` (sparse package only) | Required capabilities for the externally-located Win32 app |

## Notes

- Requires package identity: full MSIX packaging, or a sparse package (external location) for an otherwise-unpackaged Win32 app. See APIs Requiring Package Identity ("Custom context menu extensions") and Sparse Packages and External Location Packages.
- File Explorer loads the shell extension as part of the shell process: keep `GetTitle`, `GetIcon`, `GetState`, and other menu-construction methods fast, and defer expensive work until `Invoke` is called.
- A file type association (`uap:FileTypeAssociation`) only affects **Open with** and a per-type edit verb; it does not add a general-purpose context menu command for arbitrary files, folders, or folder backgrounds. Use `windows.fileExplorerContextMenus` + `IExplorerCommand` for that.
- The DLL's architecture must match the File Explorer process architecture that loads it.
- If a newly registered command doesn't appear, restart File Explorer or sign out/in so the shell reloads the extension registration.
- The official page covers File Explorer context-menu extensions (`IExplorerCommand`) only; it does not document drag-and-drop handlers or preview handlers.

## Related

- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
- [Package Identity Overview](./package-identity-overview.md)
