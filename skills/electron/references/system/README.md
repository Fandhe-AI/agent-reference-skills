# system

| Name | Description | Path |
|------|-------------|------|
| ClipboardItem | A single clipboard entry that pairs one or more MIME-typed payloads. Process: Main. | [clipboard-item.md](./clipboard-item.md) |
| clipboard | Perform copy and paste operations on the system clipboard. Process: Main. | [clipboard.md](./clipboard.md) |
| -electron-corner-smoothing CSS rule | Smoothes out the corner rounding of the `border-radius` CSS rule. | [corner-smoothing-css.md](./corner-smoothing-css.md) |
| desktopCapturer | Access information about media sources that can be used to capture audio and video from the desktop using the `navigator.mediaDevices.getUserMedia` API. Process: Main. | [desktop-capturer.md](./desktop-capturer.md) |
| dialog: showMessageBox / showErrorBox / showCertificateTrustDialog / sheets | Message boxes, error boxes and certificate trust dialogs of the `dialog` module, plus the Bookmarks array table and macOS sheets. Process: Main. | [dialog-message-box-certificate.md](./dialog-message-box-certificate.md) |
| dialog: showOpenDialog / showSaveDialog | Display native system dialogs for opening and saving files, alerting, etc. Process: Main. This page covers the open and save dialogs and the `FileFilter` structure; message boxes, error boxes and certificate dialogs are in the companion page. | [dialog-open-save.md](./dialog-open-save.md) |
| In-app purchase structures (Product, Transaction, discounts) | Structures used by `inAppPurchase`: `Product`, `ProductDiscount`, `ProductSubscriptionPeriod`, `PaymentDiscount` and `Transaction`. | [in-app-purchase-structures.md](./in-app-purchase-structures.md) |
| inAppPurchase (Mac App Store) | In-app purchases on Mac App Store. Process: Main. | [in-app-purchase.md](./in-app-purchase.md) |
| nativeImage | Create tray, dock, and application icons using PNG or JPG files. Process: Main, Renderer. | [native-image.md](./native-image.md) |
| nativeTheme | Read and respond to changes in Chromium's native color theme. Process: Main. | [native-theme.md](./native-theme.md) |
| Notification: constructor and static methods | Create OS desktop notifications. Process: Main. `Notification` is an EventEmitter. This page covers the constructor options and static methods; instance events, methods and properties are in the companion page. | [notification-class-static.md](./notification-class-static.md) |
| Notification: instance events, methods, properties, sounds | Instance events, methods and properties of objects created with `new Notification`, plus the `NotificationAction`, `NotificationResponse` and `ActivationArguments` structures. Process: Main. | [notification-events-methods.md](./notification-events-methods.md) |
| powerMonitor | Monitor power state changes. Process: Main. | [power-monitor.md](./power-monitor.md) |
| powerSaveBlocker | Block the system from entering low-power (sleep) mode. Process: Main. | [power-save-blocker.md](./power-save-blocker.md) |
| pushNotifications (macOS) | Register for and receive notifications from remote push notification services. Process: Main. | [push-notifications.md](./push-notifications.md) |
| safeStorage | Allows access to simple encryption and decryption of strings for storage on the local machine. Process: Main. | [safe-storage.md](./safe-storage.md) |
| Geometry structures (Display, Point, Rectangle, Size) | Plain-object structures used by `screen`, `BrowserWindow` bounds, `nativeImage` and other Electron APIs. | [screen-structures.md](./screen-structures.md) |
| screen | Retrieve information about screen size, displays, cursor position, etc. Process: Main. | [screen.md](./screen.md) |
| Shared texture structures (SharedTexture*, OffscreenSharedTexture) | Structures used by the `sharedTexture` module and by offscreen rendering with shared textures: `SharedTextureHandle`, `SharedTextureImportTextureInfo`, `SharedTextureImported`, `SharedTextureImportedSubtle`, `SharedTextureSubtle`, `SharedTextureSyncToken`, `SharedTextureTransfer` and `OffscreenSharedTexture`. | [shared-texture-structures.md](./shared-texture-structures.md) |
| sharedTexture | Import shared textures into Electron and converts platform specific handles into `VideoFrame`. Supports all Web rendering systems, and can be transferred across Electron processes. Process: Main, Renderer. | [shared-texture.md](./shared-texture.md) |
| shell | Manage files and URLs using their default applications. Process: Main, Renderer (non-sandboxed only). | [shell.md](./shell.md) |
| systemPreferences | Get system preferences. Process: Main, Utility. | [system-preferences.md](./system-preferences.md) |
