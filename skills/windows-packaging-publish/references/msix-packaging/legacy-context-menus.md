# Support Legacy Context Menus

Register legacy `IContextMenu` shell extensions (context menu handler, drag-and-drop handler) of a packaged desktop app through the package manifest. Available on Windows 11 version 21H2 (build 22000) and later.

## Signature / Usage

Declare the `com` namespace (`xmlns:com="http://schemas.microsoft.com/appx/manifest/com/windows10"`) and a COM server for the shell extension DLL:

```xml
<com:Extension Category="windows.comServer">
    <com:ComServer>
        <com:SurrogateServer DisplayName="<display-name-for-the-com-server>">
            <com:Class Id="<GUID-for-the-com-server>" Path="<path-to-the-com-server-or-dll>" ThreadingModel="STA" />
        </com:SurrogateServer>
    </com:ComServer>
</com:Extension>
```

Declare the `desktop9` namespace (`xmlns:desktop9="http://schemas.microsoft.com/appx/manifest/desktop/windows10/9"`) and the handlers:

```xml
<desktop9:Extension Category="windows.fileExplorerClassicContextMenuHandler">
    <desktop9:FileExplorerClassicContextMenuHandler>
        <desktop9:ExtensionHandler Type="*" Clsid="<GUID-for-the-com-server>" />
        <desktop9:ExtensionHandler Type=".txt" Clsid="<GUID-for-the-com-server>" />
        <desktop9:ExtensionHandler Type="Directory" Clsid="<GUID-for-the-com-server>" />
    </desktop9:FileExplorerClassicContextMenuHandler>
</desktop9:Extension>

<desktop9:Extension Category="windows.fileExplorerClassicDragDropContextMenuHandler">
    <desktop9:FileExplorerClassicDragDropContextMenuHandler>
        <desktop9:ExtensionHandler Type="Directory" Clsid="<GUID-for-the-com-server>" />
        <desktop9:ExtensionHandler Type="Drive" Clsid="<GUID-for-the-com-server>" />
    </desktop9:FileExplorerClassicDragDropContextMenuHandler>
</desktop9:Extension>
```

Raise `MaxVersionTested` above 10.0.21300.0:

```xml
<Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.21301.0" />
</Dependencies>
```

## Options / Props

| Manifest item | Purpose |
|---------------|---------|
| `windows.comServer` (`com:SurrogateServer`, `com:Class`) | Registers the shellex DLL as a COM class (`Id`, `Path`, `ThreadingModel="STA"`) |
| `windows.fileExplorerClassicContextMenuHandler` | Classic context menu handler; `ExtensionHandler Type` e.g. `*`, `.txt`, `Directory` |
| `windows.fileExplorerClassicDragDropContextMenuHandler` | Drag-and-drop handler; `Type` e.g. `Directory`, `Drive` |

## Notes

- For new shell extensions (not packaging an existing `IContextMenu` implementation), implement `IExplorerCommand` and use `desktop4:FileExplorerContextMenus` instead.
- Not available on Windows 10 (see MSIX on Windows 10 and Windows 11 for alternatives).
- Source page last updated 04/15/2026 (ms.date).

## Related

- [MSIX on Windows 10 and Windows 11](./msix-windows10-windows11.md)
- [MSIX Features and Supported Platforms](./supported-platforms.md)
- [Package Manifest Schema](./package-manifest-schema.md)
