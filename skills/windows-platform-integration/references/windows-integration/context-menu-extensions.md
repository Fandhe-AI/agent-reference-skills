# Context menu extensions (IExplorerCommand / shell extensions)

Package manifest extensions and Win32 shell COM interfaces that let a packaged (MSIX) app add entries to File Explorer's right-click context menu, either by implementing the modern `IExplorerCommand` interface or by packaging a legacy `IContextMenu` shell extension.

## Signature / Usage

```xml
<!-- Recommended: new-style context menu handler via IExplorerCommand -->
<Extensions>
  <desktop4:Extension Category="windows.fileExplorerContextMenus">
    <desktop4:FileExplorerContextMenus>
      <desktop5:ItemType Type="*">
        <desktop4:Verb Id="MyVerb" Clsid="<GUID-of-IExplorerCommand-implementation>" />
      </desktop5:ItemType>
    </desktop4:FileExplorerContextMenus>
  </desktop4:Extension>
</Extensions>
```

```xml
<!-- Legacy IContextMenu support: register the COM server and classic handler -->
<com:Extension Category="windows.comServer">
  <com:ComServer>
    <com:SurrogateServer DisplayName="MyShellExtension">
      <com:Class Id="<GUID-for-the-com-server>" Path="MyShellExtension.dll" ThreadingModel="STA" />
    </com:SurrogateServer>
  </com:ComServer>
</com:Extension>
<desktop9:Extension Category="windows.fileExplorerClassicContextMenuHandler">
  <desktop9:FileExplorerClassicContextMenuHandler>
    <desktop9:ExtensionHandler Type="*" Clsid="<GUID-for-the-com-server>" />
  </desktop9:FileExplorerClassicContextMenuHandler>
</desktop9:Extension>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IExplorerCommand` | Win32 COM interface | Modern shell verb interface; supports in-process activation only, recommended for new context menu / shortcut menu handlers. |
| `desktop4:FileExplorerContextMenus` | manifest extension | Declares one or more `IExplorerCommand`-backed verbs for packaged apps, grouped under the app's own flyout in the Windows 11 context menu. |
| `IContextMenu` | Win32 COM interface (legacy) | Older shell extension interface; still works when packaged, but requires the classic-handler manifest extensions below. |
| `com:Extension Category="windows.comServer"` | manifest extension | Registers the shell extension DLL as a COM surrogate server so MSIX packaging can host it. |
| `desktop9:Extension Category="windows.fileExplorerClassicContextMenuHandler"` | manifest extension | Registers a legacy `IContextMenu` handler for specific file types/`Directory`/`*`. |
| `desktop9:Extension Category="windows.fileExplorerClassicDragDropContextMenuHandler"` | manifest extension | Registers a legacy drag-and-drop context menu handler. |

## Notes

- Win32 interfaces (`IExplorerCommand`, `IContextMenu`): `shobjidl_core.h` (Win32 shell API). Not part of WinRT — implemented as classic COM.
- In Windows 11, apps with more than one verb are grouped into a flyout with app attribution; "Show more options" falls back to the classic Windows 10 menu for handlers not yet ported.
- Legacy `IContextMenu`/drag-and-drop handler support for packaged apps requires Windows 11 21H2 (build 22000) or later and `MaxVersionTested` greater than `10.0.21300.0`.
- Distinct from [App Actions](./app-actions-search.md), which surface functionality in search/Click to Do rather than the File Explorer right-click menu.

## Related

- [App Actions and Windows search integration](./app-actions-search.md)
