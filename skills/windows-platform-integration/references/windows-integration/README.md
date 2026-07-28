# Windows Integration

| Name | Description | Path |
|------|-------------|------|
| Clipboard | Static class for reading/writing the system clipboard (`SetContent` / `GetContent` / `ContentChanged`). | [clipboard.md](./clipboard.md) |
| DataPackage | Payload container for clipboard and share operations (`SetText`, `SetStorageItems`, ...). | [data-package.md](./data-package.md) |
| DataPackageView | Read-only view of a `DataPackage` used by receiving apps. | [data-package-view.md](./data-package-view.md) |
| DataTransferManager | Initiates the Share UI; requires HWND-based interop init in WinUI 3/desktop apps. | [data-transfer-manager.md](./data-transfer-manager.md) |
| Protocol and FileTypeAssociation | Package manifest extensions registering custom URI schemes and file type handlers. | [protocol-file-association.md](./protocol-file-association.md) |
| Launcher | Starts the default app for a file/folder/URI (`LaunchUriAsync`, `LaunchFileAsync`). | [launcher.md](./launcher.md) |
| JumpList / JumpListItem | Custom taskbar/Start jump list tasks and groups. | [jump-list.md](./jump-list.md) |
| TaskbarManager | Requests pinning the current app (or a secondary tile) to the taskbar. | [taskbar-manager.md](./taskbar-manager.md) |
| SecondaryTile | Creates/pins/unpins a secondary Start tile. | [secondary-tile.md](./secondary-tile.md) |
| StartScreenManager | Queries and manages Start menu pin state for the app or its tiles. | [start-screen-manager.md](./start-screen-manager.md) |
| StartupTask | Registers/enables a background task to run at system startup or login. | [startup-task.md](./startup-task.md) |
| AppDiagnosticInfo | Diagnostic info (resource usage, relaunch) for running app instances. | [app-diagnostic-info.md](./app-diagnostic-info.md) |
| App Actions and Windows search integration | Registers discoverable actions surfaced in Windows search / Click to Do. | [app-actions-search.md](./app-actions-search.md) |
| Context menu extensions (IExplorerCommand / shell extensions) | File Explorer right-click menu extensions for packaged apps. | [context-menu-extensions.md](./context-menu-extensions.md) |
| Protocol activation | Receiving `OnActivated`/`ProtocolActivatedEventArgs` for registered URI schemes. | [protocol-activation.md](./protocol-activation.md) |
