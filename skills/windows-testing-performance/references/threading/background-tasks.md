# Background tasks

Background tasks let lightweight code run without a UI, triggered by events such as a timer, system change, or push notification, even while the app isn't running. UWP uses `Windows.ApplicationModel.Background`; WinUI 3 and other MSIX-packaged desktop apps use the Windows App SDK's `Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder`. Unpackaged desktop apps use Task Scheduler or .NET Worker Services instead.

## Signature / Usage

```csharp
// Windows App SDK (WinUI 3 / packaged WPF / packaged WinForms) — register.
await BackgroundExecutionManager.RequestAccessAsync();

var builder = new Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder();
builder.Name = "TimeZoneChangeTask";
var trigger = new SystemTrigger(SystemTriggerType.TimeZoneChange, false);
builder.SetTrigger(trigger as IBackgroundTrigger);
builder.AddCondition(new SystemCondition(SystemConditionType.InternetAvailable));
builder.SetTaskEntryPointClsid(typeof(BackgroundTask).GUID);
builder.Register();

// Implement IBackgroundTask (shared UWP interface).
[ComVisible(true)]
[Guid("00001111-aaaa-2222-bbbb-3333cccc4444")]
public class BackgroundTask : IBackgroundTask
{
    private BackgroundTaskDeferral _deferral;

    [MTAThread]
    public void Run(IBackgroundTaskInstance taskInstance)
    {
        _deferral = taskInstance.GetDeferral();
        taskInstance.Canceled += (sender, reason) => { /* handle cancellation */ };

        // ... do work ...

        _deferral.Complete();
    }
}
```

```xml
<!-- Package.appxmanifest -->
<Extensions>
    <Extension Category="windows.backgroundTasks"
               EntryPoint="Microsoft.Windows.ApplicationModel.Background.UniversalBGTask.Task">
        <BackgroundTasks>
            <Task Type="general"/>
        </BackgroundTasks>
    </Extension>
    <com:Extension Category="windows.comServer">
        <com:ComServer>
            <com:ExeServer Executable="MyApp.exe" DisplayName="BackgroundTask"
                LaunchAndActivationPermission="O:PSG:BUD:(A;;11;;;IU)(A;;11;;;S-1-15-2-1)S:(ML;;NX;;;LW)">
                <com:Class Id="00001111-aaaa-2222-bbbb-3333cccc4444" DisplayName="BackgroundTask" />
            </com:ExeServer>
        </com:ComServer>
    </com:Extension>
</Extensions>
```

## Options / Props

| Name | Description |
|------|-------------|
| `BackgroundTaskBuilder.Name` | Meaningful registration name, for debugging/management. |
| `BackgroundTaskBuilder.SetTrigger(IBackgroundTrigger)` | Attaches a trigger, e.g. `SystemTrigger(SystemTriggerType, bool oneShot)`, `TimeTrigger` (15-minute minimum period), `PushNotificationTrigger`. |
| `BackgroundTaskBuilder.AddCondition(IBackgroundCondition)` | Adds a `SystemCondition` (e.g. `InternetAvailable`, `UserPresent`) the task must satisfy before running. |
| `BackgroundTaskBuilder.SetTaskEntryPointClsid(Guid)` | Windows App SDK-specific: registers the COM class ID implementing `IBackgroundTask` (UWP instead uses `SetTaskEntryPoint(string)` with the class's full name). |
| `BackgroundTaskBuilder.Register()` | Registers the task; call `BackgroundExecutionManager.RequestAccessAsync()` first. |
| `IBackgroundTask.Run(IBackgroundTaskInstance)` | Entry point invoked when the task fires. |
| `IBackgroundTaskInstance.GetDeferral()` / `BackgroundTaskDeferral.Complete()` | Keeps the host process (`backgroundtaskhost.exe`) alive across asynchronous work inside `Run`; call `Complete()` when finished. |
| `IBackgroundTaskInstance.Progress` | Reports progress to the app without touching UI directly from the task. |
| `IBackgroundTaskInstance.Canceled` | Event raised when the system requests cancellation; the task must observe it and unwind. |

## Notes

- Windows App SDK background tasks (`Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder`) require **MSIX packaging** and apply to WinUI 3 and packaged WPF/WinForms apps; they use `IBackgroundTask` from the shared `Windows.ApplicationModel.Background` namespace but a different builder type/namespace and manifest/COM-registration steps than plain UWP. The pure-UWP `Windows.ApplicationModel.Background.BackgroundTaskBuilder` (with `SetTaskEntryPoint(string)`) is a distinct, UWP-only registration path.
- **Unpackaged** .NET desktop apps (no MSIX) can't use either `BackgroundTaskBuilder`; use Windows [Task Scheduler](https://learn.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page) (periodic/triggered execution, no packaging) or [.NET Worker Services](https://learn.microsoft.com/en-us/dotnet/core/extensions/workers) (long-running headless processes, any deployment model) instead. `StartupTask` (`Windows.ApplicationModel.StartupTask`) is the separate mechanism for launching an app or a packaged desktop app's executable at sign-in/system startup, not for periodic background execution.
- Background tasks are resource-constrained: limited to roughly 30 seconds of wall-clock CPU time per activation, and subject to memory limits and Battery Saver throttling; keep task bodies lightweight.
- Never attempt direct UI updates from inside a background task's `Run` method (other than toasts/notifications); use `IBackgroundTaskInstance.Progress` and completion/cancellation events to communicate status back to the (possibly not running) app.
- Always call `GetDeferral()` before doing asynchronous work inside `Run`, and `Complete()` it afterward — otherwise the host may terminate the process as soon as `Run` returns, before async work finishes.

## Related

- [Thread pool](./thread-pool.md)
