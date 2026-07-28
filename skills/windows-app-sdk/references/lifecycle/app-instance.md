# AppInstance

`Microsoft.Windows.AppLifecycle.AppInstance` represents an instance of an app. It supports activation redirection scenarios (single-instancing / multi-instancing) for both packaged and unpackaged Windows App SDK apps.

## Signature / Usage

```cpp
// Register a key and redirect to an existing instance if one already owns it.
AppActivationArguments args = AppInstance::GetCurrent().GetActivatedEventArgs();
AppInstance keyInstance = AppInstance::FindOrRegisterForKey(L"main");
if (!keyInstance.IsCurrent())
{
    keyInstance.RedirectActivationToAsync(args).get();
    return true; // exit this instance
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetCurrent()` | static method → `AppInstance` | Retrieves the `AppInstance` object representing the current running instance of the app. |
| `GetInstances()` | static method → `IVector<AppInstance>` | Retrieves all running instances of the app that are using the AppInstance API (registered a key or not), including the current instance if obtained via `GetCurrent`. |
| `FindOrRegisterForKey(string key)` | static method → `AppInstance` | Registers this instance with an app-defined key, or returns the existing instance already registered for that key. Only one key per instance; a new call overwrites the previous value. |
| `RedirectActivationToAsync(AppActivationArguments args)` | method → `IAsyncAction` | Redirects the current activation request to another `AppInstance`. Not a terminal operation — the calling instance is not automatically terminated and can continue running. |
| `GetActivatedEventArgs()` | method → `AppActivationArguments` | Retrieves the event args for the activation that started or redirected to this instance. |
| `Restart(string arguments)` | static method → `AppRestartFailureReason` | Restarts the application instance, passing `arguments` to the restarted instance. |
| `UnregisterKey()` | method | Unregisters this instance's key, making it no longer a target for key-based lookup via `FindOrRegisterForKey`. |
| `IsCurrent` | bool (property) | Whether this `AppInstance` object represents the current instance or a different one. |
| `Key` | string (property) | The app-defined key that identifies this instance for redirection purposes. |
| `ProcessId` | uint (property) | The process ID of the app instance. |
| `Activated` | event | Raised on the target instance when an activation is redirected to it via `RedirectActivationToAsync`. |

## Notes

- Package: `Microsoft.Windows.AppLifecycle` (Windows App SDK). Distinct from the UWP `Windows.ApplicationModel.AppInstance` class, which only supports redirection and requires explicit key registration to appear in `GetInstances`.
- WinUI 3 apps are multi-instanced by default; call `FindOrRegisterForKey` + `RedirectActivationToAsync` at startup, before heavy initialization, to implement single-instancing.
- Unlike UWP, redirection is not terminal: the redirecting instance keeps running unless the app explicitly exits. Guard against circular redirection (A → B → C → A) when building multi-hop redirection chains.
- `RedirectActivationToAsync` must not block the STA thread; if calling from `WinMain`/STA startup code, run the async call on a background thread and wait on a non-blocking synchronization primitive (e.g. `Semaphore`).
- `Restart` returns an `AppRestartFailureReason` (`RestartPending`, `InvalidUser`, `Other`, or none on success) — check the return value rather than assuming success.
- Keys are automatically unregistered when the process terminates, but call `UnregisterKey()` proactively before planned termination to avoid a race where another instance redirects to an already-exiting instance.

## Related

- [AppActivationArguments and ExtendedActivationKind](./app-activation-arguments.md)
- [Single-instancing and rich activation](./single-instancing.md)
- [Application](./application.md)
