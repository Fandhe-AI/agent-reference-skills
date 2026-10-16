# Windows Resume with promoted install (Android only)

Use the Continuity SDK in an Android app to send `AppContext` to Link to Windows (LTW) so the user can resume the activity on a Windows PC, with install promotion of the Windows app. Android only; iOS is not supported.

## Signature / Usage

```xml
<meta-data
    android:name="com.microsoft.crossdevice.resumeActivityProvider"
    android:value="true" />

<meta-data
    android:name="com.microsoft.crossdevice.trigger.PartnerApp"
    android:value="4" />
```

```kotlin
AppContextManager.initialize(this.applicationContext, appContextEventHandler)

val appContext = AppContext().apply {
    this.contextId = "${packageName}.${UUID.randomUUID()}"
    this.appId = applicationContext.packageName
    this.createTime = System.currentTimeMillis()
    this.lastUpdatedTime = System.currentTimeMillis()
    this.type = ProtocolConstants.TYPE_RESUME_ACTIVITY
}
AppContextManager.sendAppContext(this.applicationContext, appContext, appContextResponse)

AppContextManager.deleteAppContext(this.applicationContext, appContext.contextId, appContextResponse)
AppContextManager.deInitialize(this.applicationContext)
```

## Options / Props

AppContext fields:

| Name | Required | Description |
|------|----------|-------------|
| contextId | required | Unique identifier distinguishing one AppContext from another. |
| type | required | Binary flag for the AppContext type sent to LTW; consistent with requestedContextType, e.g. `ProtocolConstants.TYPE_RESUME_ACTIVITY`. |
| createTime | required | Creation timestamp. |
| intentUri | required unless weblink given | URI indicating which app can continue the context on the target device. |
| weblink | required unless intentUri given | Launches the web endpoint instead of a Store app. Used only when intentUri is absent; if both are given, intentUri is used. Opens in the system default browser. |
| appId | required | Package name of the application the context is for. |
| title | required | Title such as a document name or web page title. |
| preview | optional | Bytes of a preview image. |
| LifeTime | optional | Lifetime in milliseconds for ongoing scenarios; default 5 minutes, values above 5 minutes are shortened to 5 minutes. |

Callbacks:

| Name | Type | Description |
|------|------|-------------|
| onContextRequestReceived | `IAppContextEventHandler`: `(contextRequestInfo: ContextRequestInfo)` | Connection established; the app may send, update, or delete AppContext. |
| onInvalidContextRequestReceived | `IAppContextEventHandler`: `(throwable: Throwable)` | Invalid context request received. |
| onSyncServiceDisconnected | `IAppContextEventHandler`: `()` | Sync service disconnected; do not send AppContext afterward. |
| onContextResponseSuccess | `IAppContextResponse`: `(response: AppContext)` | Called after a successful send; indicates the SDK integration works. |
| onContextResponseError | `IAppContextResponse`: `(response: AppContext, throwable: Throwable)` | Send failed, e.g. "PC is not connected". |

## Notes

- Limited Access Feature: email wincrossdeviceapi@microsoft.com with a description of the user experience, a screenshot where users natively access web or documents, the PackageId, and the Google Play URL. Approval depends on the scenario requirements.
- Prerequisites: Android minimum SDK 24, Kotlin 1.9.x, Link to Windows 1.241101.XX; Windows 11 and Visual Studio 2019 or later. Get the .aar from the Windows Cross-Device SDK releases (github.com/microsoft/Windows-Cross-Device/releases).
- Flow: after `initialize`, `onContextRequestReceived` means a connection is established and the app may send/update/delete AppContext. If PC is not connected, `onContextResponseError` returns "PC is not connected"; when reconnected, `onContextRequestReceived` fires again. After `onSyncServiceDisconnected` or deinitialization, do not send AppContext.
- Windows side: the app handles the intent URI via protocol activation. Win32 apps register a protocol in the registry and parse the command line; packaged WinUI apps declare `windows.protocol` in `Package.appxmanifest` and handle `ActivationKind.Protocol` in `OnActivated`.

```xml
<uap:Extension Category="windows.protocol">
  <uap:Protocol Name="alsdk">
    <uap:Logo>images\icon.png</uap:Logo>
    <uap:DisplayName>SDK Sample URI Scheme</uap:DisplayName>
  </uap:Protocol>
</uap:Extension>
```

- Each app must deserialize and decrypt the arguments it receives and restore the context itself.
- Validation: confirm `onContextRequestReceived`, then `onContextResponseSuccess` after sending; verify the "PC is not connected" error when the PC is locked or disconnected.
- This page is the Android Continuity SDK path; the overview page [cross-device-resume-overview.md](./cross-device-resume-overview.md) describes the WNS raw notification path.

## Related

- [Windows Resume (cross-device task continuity)](./cross-device-resume-overview.md)
- [Protocol activation](./protocol-activation.md)
- [Install from Phone Link notifications](./phone-link-notifications.md)
