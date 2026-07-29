# windows-integration

| Name | Description | Path |
| --- | --- | --- |
| App Actions and Windows search integration | App Actions on Windows let a packaged app register atomic units of functionality (e.g. "send a message", "translate text") that other apps, Windows search, and Click to Do can discover and invoke, without the user needing to open the provider app directly. | [app-actions-search.md](./app-actions-search.md) |
| AppDiagnosticInfo | Contains APIs for getting basic diagnostic information (running state, resource usage) for all running apps, and for launching an app associated with a diagnostic info instance. | [app-diagnostic-info.md](./app-diagnostic-info.md) |
| Clipboard | Gets and sets information from the system clipboard object. Static class in `Windows.ApplicationModel.DataTransfer`. | [clipboard.md](./clipboard.md) |
| Context menu extensions (IExplorerCommand / shell extensions) | Package manifest extensions and Win32 shell COM interfaces that let a packaged (MSIX) app add entries to File Explorer's right-click context menu, either by implementing the modern `IExplorerCommand` interface or by packaging a legacy `IContextMenu` shell extension. | [context-menu-extensions.md](./context-menu-extensions.md) |
| DataPackage | Contains the data that a user wants to exchange with another app, used both for clipboard operations and for the share (`DataTransferManager`) contract. | [data-package.md](./data-package.md) |
| DataPackageView | A read-only version of a `DataPackage`. Apps that receive shared or pasted content (via `Clipboard.GetContent()` or a share target) get this object to acquire the data. | [data-package-view.md](./data-package-view.md) |
| DataTransferManager | Static class that programmatically initiates an exchange of content ("Share") with other apps. Fires `DataRequested` when a share operation starts, and can trigger the Share UI on demand with `ShowShareUI`. | [data-transfer-manager.md](./data-transfer-manager.md) |
| JumpList / JumpListItem | `JumpList` provides functionality for an app's jump list — the system menu shown when the user right-clicks the app on the taskbar or Start menu. `JumpListItem` represents a single custom task/entry within that list. Only the desktop device family supports jump lists. | [jump-list.md](./jump-list.md) |
| Launcher | Static class that starts the default app associated with the specified file, folder, or URI. | [launcher.md](./launcher.md) |
| Protocol activation (receiving URI activation) | Describes how a packaged Windows app receives control when it is launched via a URI matching its registered `windows.protocol` scheme… | [protocol-activation.md](./protocol-activation.md) |
| Protocol and FileTypeAssociation (package manifest extensions) | Package manifest `<uap:Extension>` declarations that register an app as a handler for a custom URI scheme (`windows.protocol`) or for specific file types (`windows.fileTypeAssociation`). | [protocol-file-association.md](./protocol-file-association.md) |
| Recall integration (UserActivity relaunch, sensitivity labels, DLP provider) | Recall (Copilot+ PCs) periodically saves local snapshots of the screen so users can semantically search their past activity.… | [recall.md](./recall.md) |
| SecondaryTile | Creates, enumerates, and manages a secondary tile pinned to the Start menu (in addition to the app's own primary tile). | [secondary-tile.md](./secondary-tile.md) |
| StartScreenManager | Represents a Start screen manager object; used to query and request pinning of the app or its secondary tiles to the Start menu. | [start-screen-manager.md](./start-screen-manager.md) |
| StartupTask | Represents a packaged UWP app or desktop application background task that can run automatically at system startup or user login. | [startup-task.md](./startup-task.md) |
| TaskbarManager | Provides methods for pinning the current app (or a secondary tile) to the Windows taskbar. | [taskbar-manager.md](./taskbar-manager.md) |
