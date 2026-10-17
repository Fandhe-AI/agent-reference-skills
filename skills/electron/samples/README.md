# samples

| Name | Description | Path |
|------|-------------|------|
| Accessibility | Expose Chrome's accessibility tree manually, or toggle it from third-party macOS software. | [accessibility.md](./accessibility.md) |
| Application Menu | Set the single top-level application menu with `Menu.setApplicationMenu`, using standard OS menu roles and a per-window override. | [application-menu.md](./application-menu.md) |
| Clipboard (Copy and Paste Text) | Read and write the system clipboard text from the main process on behalf of the renderer. | [clipboard.md](./clipboard.md) |
| Context Menu | Show a native context menu for editable elements by listening to the `context-menu` event of `webContents` and calling `menu.popup()`. | [context-menu.md](./context-menu.md) |
| Custom Title Bar | Hide the OS title bar, restore native window controls on Windows and Linux, and draw an HTML title bar with a safe area. | [custom-title-bar.md](./custom-title-bar.md) |
| Custom Window Styles and Interactions | Create frameless and transparent windows, define draggable regions, and make a window click-through. | [custom-window-styles.md](./custom-window-styles.md) |
| Dark Mode | Follow the system theme with `prefers-color-scheme` and toggle or reset it through `nativeTheme.themeSource` over IPC. | [dark-mode.md](./dark-mode.md) |
| Deep Links (Default Protocol Handler) | Register the app as the handler for a custom protocol (`electron-fiddle://`) and react to launch URLs on each OS. | [deep-links.md](./deep-links.md) |
| Device Access (Web Bluetooth, WebHID, Web Serial, WebUSB) | Select devices for the web device APIs from the main process by handling the selection events and permission handlers. | [device-access.md](./device-access.md) |
| Native Dialogs (Open, Save, Message, Error) | Open native file, save, message, and error dialogs from main-process IPC handlers. | [dialogs.md](./dialogs.md) |
| First Electron App | Minimal app: load a local HTML page into a BrowserWindow and handle the window lifecycle on each OS. | [first-app.md](./first-app.md) |
| In-App Purchases (Mac App Store) | Query products, purchase, and handle transactions with the `inAppPurchase` module in a Mac App Store build. | [in-app-purchases.md](./in-app-purchases.md) |
| IPC: Renderer to Main (Two-Way) | Request/response from the renderer to the main process with `ipcRenderer.invoke` and `ipcMain.handle` (Pattern 2), here opening a native file dialog. | [ipc-invoke-handle.md](./ipc-invoke-handle.md) |
| IPC: Main to Renderer | Push messages from the main process to a renderer with `webContents.send` and receive them via `ipcRenderer.on` (Pattern 3), triggered from an application menu. | [ipc-main-to-renderer.md](./ipc-main-to-renderer.md) |
| IPC: Renderer to Main (One-Way) | Fire-and-forget message from the renderer to the main process with `ipcRenderer.send` and `ipcMain.on` (Pattern 1). | [ipc-renderer-to-main.md](./ipc-renderer-to-main.md) |
| Keyboard Shortcuts | Define local shortcuts with menu accelerators, global shortcuts with `globalShortcut`, and intercept keys in the main process. | [keyboard-shortcuts.md](./keyboard-shortcuts.md) |
| Linux Desktop Launcher Actions | Add custom entries to the Linux system launcher menu through the app's `.desktop` file. | [linux-desktop-actions.md](./linux-desktop-actions.md) |
| macOS Dock Menu | Attach a custom menu to the app's Dock icon with `app.dock.setMenu` (macOS only). | [macos-dock-menu.md](./macos-dock-menu.md) |
| Manage Windows (New Window, Bounds Events, Focus Events) | Open additional BrowserWindows from IPC and report bounds and focus changes back to the main window. | [manage-windows.md](./manage-windows.md) |
| MessagePorts: Transfer a Port and Stream Replies | Create a `MessageChannel` in the renderer, transfer one port to the main process with `ipcRenderer.postMessage`, and use it for a reply stream. | [message-ports.md](./message-ports.md) |
| Native Addon: C++ (Linux, GTK3) | Skeleton of a Linux-only Node-API addon written in C++ with GTK3: package, `binding.gyp` with `pkg-config`, C++ header, JavaScript wrapper, and usage. | [native-addon-cpp-linux.md](./native-addon-cpp-linux.md) |
| Native Addon: C++ (Win32) | Skeleton of a Windows-only Node-API addon written in C++ with the Win32 API: package, build configuration, C++ header, and JavaScript wrapper. | [native-addon-cpp-win32.md](./native-addon-cpp-win32.md) |
| Native Addon: Objective-C (macOS) | Skeleton of a macOS-only Node-API addon written in Objective-C++: package, `binding.gyp` with AppKit, C++ interface header, and JavaScript wrapper. | [native-addon-objc-macos.md](./native-addon-objc-macos.md) |
| Native Addon: Swift (macOS) | Skeleton of a macOS-only Node-API addon whose logic is written in Swift and exposed through an Objective-C bridge: package, `binding.gyp` with Swift build actions, bridge header, and bridge implementation. | [native-addon-swift-macos.md](./native-addon-swift-macos.md) |
| Native File Drag & Drop | Drag a file out of the web content into the operating system with `webContents.startDrag`. | [native-file-drag-drop.md](./native-file-drag-drop.md) |
| Navigation History | Go back and forward, list entries, jump to an index, and restore history into another window with `webContents.navigationHistory`. | [navigation-history.md](./navigation-history.md) |
| Notifications | Show OS notifications from the main process with the `Notification` module, or from the renderer with the web Notifications API. | [notifications.md](./notifications.md) |
| Offscreen Rendering | Render a BrowserWindow into bitmaps with the `paint` event and save a frame as PNG. | [offscreen-rendering.md](./offscreen-rendering.md) |
| Online/Offline Event Detection | Show a connection status indicator in the renderer with `navigator.onLine`, or query `net.isOnline()` in the main process. | [online-offline-detection.md](./online-offline-detection.md) |
| Packaging with Electron Forge | Import an existing app into Electron Forge and build a distributable with `make`. | [packaging-forge.md](./packaging-forge.md) |
| Preload Script with contextBridge | Expose selected versions and a `ping()` IPC call to the renderer through a preload script, without exposing `ipcRenderer` itself. | [preload-script.md](./preload-script.md) |
| Progress Bars (Taskbar / Dock) | Show progress outside the window with `win.setProgressBar`: a Windows taskbar button or the macOS Dock icon. | [progress-bar.md](./progress-bar.md) |
| Publishing to GitHub Releases and Auto-Updating | Publish with Forge's GitHub Publisher and self-update through update.electronjs.org using `update-electron-app`. | [publishing-updating.md](./publishing-updating.md) |
| Recent Documents | Add files to the Windows JumpList / macOS Dock recent documents list and clear it on exit. | [recent-documents.md](./recent-documents.md) |
| Representing Files in a BrowserWindow (macOS) | Show a represented file icon and an edited indicator in the macOS title bar. | [represented-file.md](./represented-file.md) |
| Take a Screenshot of the Screen | Capture the whole screen with `desktopCapturer.getSources` and save it as a PNG. | [screenshot.md](./screenshot.md) |
| SpellChecker | Set spellchecker languages, show suggestions in a context menu, and use a custom dictionary download URL. | [spellchecker.md](./spellchecker.md) |
| Tray Menu | Create a system tray icon with a context menu and keep the app alive when all windows are closed. | [tray-menu.md](./tray-menu.md) |
| Window State Persistence | Save and restore a window's bounds and display mode across restarts with the `windowStatePersistence` option. | [window-state-persistence.md](./window-state-persistence.md) |
| Windows Taskbar Customization | Configure the Windows taskbar presence: JumpList user tasks, thumbnail toolbar, icon overlay, and flash frame. | [windows-taskbar.md](./windows-taskbar.md) |
