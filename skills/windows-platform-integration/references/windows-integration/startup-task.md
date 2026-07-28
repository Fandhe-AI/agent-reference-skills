# StartupTask

Represents a packaged UWP app or desktop application background task that can run automatically at system startup or user login.

## Signature / Usage

```csharp
StartupTask startupTask = await StartupTask.GetAsync("MyStartupId"); // TaskId from the manifest
switch (startupTask.State)
{
    case StartupTaskState.Disabled:
        // Must be called on a UI thread; shows a user-consent dialog.
        StartupTaskState newState = await startupTask.RequestEnableAsync();
        break;
    case StartupTaskState.DisabledByUser:
        // User must manually re-enable via Task Manager's Startup tab.
        break;
    case StartupTaskState.DisabledByPolicy:
        // Disabled by group policy, or unsupported on this device.
        break;
    case StartupTaskState.Enabled:
        break;
}
```

```xml
<!-- Packaged desktop app startup task, declared in the package manifest -->
<Package xmlns:uap5="http://schemas.microsoft.com/appx/manifest/uap/windows10/5" ...>
  <Applications>
    <Application ...>
      <Extensions>
        <uap5:Extension
          Category="windows.startupTask"
          Executable="MyDesktopApp.exe"
          EntryPoint="Windows.FullTrustApplication">
          <uap5:StartupTask
            TaskId="MyStartupId"
            Enabled="false"
            DisplayName="My Desktop App" />
        </uap5:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetAsync(String)` | static method | Gets a startup task by its `TaskId`. |
| `GetForCurrentPackageAsync()` | static method | Gets all startup tasks declared for the current app package. |
| `State` | `StartupTaskState` | `Disabled`, `DisabledByUser`, `DisabledByPolicy`, or `Enabled`. |
| `TaskId` | property | The task's unique identifier, matching the manifest's `TaskId`. |
| `RequestEnableAsync()` | method | Requests the task be enabled; for UWP apps this must run on a UI thread and shows a consent dialog. For packaged desktop apps, no dialog is shown. Does not override a user's explicit `DisabledByUser` choice. |
| `Disable()` | method | Disables the startup task. |
| `uap5:Extension/@Category` | manifest attribute | Must be `"windows.startupTask"`. |
| `uap5:StartupTask/@TaskId` / `@Enabled` / `@DisplayName` | manifest attributes | Task identifier, whether enabled without `RequestEnableAsync` (desktop apps only), and the name shown in Task Manager. |

## Notes

- Namespace: `Windows.ApplicationModel` (WinRT), requires the Windows Desktop Extension SDK (10.0.14393.0+).
- Packaged desktop apps can set `Enabled="true"` in the manifest to skip the consent dialog; UWP apps always require the user to launch the app once and approve via `RequestEnableAsync`.
- Regardless of API state, the end user retains full control via **Settings > Startup** or the **Startup** tab in Task Manager and can override the app's request at any time.
- UWP startup apps always start minimized.

## Related

- [AppDiagnosticInfo](./app-diagnostic-info.md)
