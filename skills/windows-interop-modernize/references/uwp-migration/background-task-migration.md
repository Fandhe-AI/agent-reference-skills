# Background task migration strategy

Migration strategy for UWP out-of-proc and in-proc background tasks to the Windows App SDK's full-trust COM `BackgroundTaskBuilder` model.

## Signature / Usage

```cpp
// C++: registering a background task with the Windows App SDK BackgroundTaskBuilder
winrt::Microsoft::Windows::ApplicationModel::Background::BackgroundTaskBuilder builder;
SystemTrigger trigger = SystemTrigger(SystemTriggerType::TimeZoneChange, false);
auto backgroundTrigger = trigger.as<IBackgroundTrigger>();
builder.SetTrigger(backgroundTrigger);
builder.AddCondition(SystemCondition(SystemConditionType::InternetAvailable));
builder.SetTaskEntryPointClsid(classGuid);
builder.Register();
```

```csharp
// Equivalent C#
var builder = new Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder();
var trigger = new SystemTrigger(SystemTriggerType.TimeZoneChange, false);
builder.SetTrigger(trigger);
builder.AddCondition(new SystemCondition(SystemConditionType.InternetAvailable));
builder.SetTaskEntryPointClsid(classGuid);
builder.Register();
```

```xml
<!-- Enable Windows App SDK background tasks in the project file -->
<WindowsAppSDKBackgroundTask>true</WindowsAppSDKBackgroundTask>
```

```xml
<!-- Package.appxmanifest — background task extension entry point -->
<Extension Category="windows.backgroundTasks"
           EntryPoint="Microsoft.Windows.ApplicationModel.Background.UniversalBGTask.Task">
    <BackgroundTasks>
        <Task Type="general"/>
    </BackgroundTasks>
</Extension>
```

## Options / Props

| UWP background task kind | Migration path |
|------|-------------|
| Out-of-proc (WinRT component, `TaskEntryPoint` on `BackgroundTaskBuilder`) | Can keep the WinRT component as-is, packaged with the desktop project; `backgroundtaskhost.exe` (Low IL) still hosts it. To run in the app's own Medium IL process, switch to a full-trust COM component registered via the Windows App SDK `BackgroundTaskBuilder`. |
| In-proc (`OnBackgroundActivated` callback in the foreground process) | Not possible in WinUI — `OnBackgroundActivated` doesn't exist. Move the implementation to a full-trust COM task and define the COM server in the manifest. |
| `ApplicationTrigger` | **Not supported** in Windows App SDK apps (relies on UWP process-suspend lifetime management, which doesn't apply). Rewrite using a new process or a thread-pool thread (`CreateThread`/`CreateProcess`). |

## Notes

- Two different `BackgroundTaskBuilder` APIs exist: `Windows.ApplicationModel.Background.BackgroundTaskBuilder` (UWP — many triggers unsupported for full-trust COM components) vs. `Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder` (Windows App SDK — supports registering full-trust COM components directly, no `backgroundtaskhost` workaround needed).
- For C# apps, also add an `ActivatableClass` registration in the manifest pointing at `Microsoft.Windows.ApplicationModel.Background.UniversalBGTask.dll` / `...UniversalBGTask.Task`.
- Windows **Task Scheduler** is an alternative path that achieves similar functionality to UWP's `BackgroundTaskBuilder` for desktop apps, without requiring the Windows App SDK background task infrastructure.

## Related

- [Application lifecycle functionality migration](./applifecycle-migration.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
