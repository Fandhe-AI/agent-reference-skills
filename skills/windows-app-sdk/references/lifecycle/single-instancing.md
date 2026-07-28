# Single-instancing and multi-instancing

An app's instancing model determines whether multiple instances of its main process can run at once. WinUI 3 apps are multi-instanced by default; use `AppInstance.FindOrRegisterForKey` and `RedirectActivationToAsync` at launch to opt into single-instance (or partially single-instance) behavior.

## Signature / Usage

```cpp
bool DecideRedirection()
{
    AppActivationArguments args = AppInstance::GetCurrent().GetActivatedEventArgs();
    ExtendedActivationKind kind = args.Kind();
    if (kind == ExtendedActivationKind::File)
    {
        IFileActivatedEventArgs fileArgs = args.Data().as<IFileActivatedEventArgs>();
        IStorageItem file = fileArgs.Files().GetAt(0);
        AppInstance keyInstance = AppInstance::FindOrRegisterForKey(file.Name());

        if (keyInstance.IsCurrent())
        {
            // No other instance has this file open; continue normal startup.
        }
        else
        {
            keyInstance.RedirectActivationToAsync(args).get();
            return true; // exit; the other instance now handles this activation
        }
    }
    return false;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Single-instanced app | concept | Only one main process runs at a time; a second launch activates the first instance's window instead of starting a new process. |
| Multi-instanced app | concept | The main process can run multiple times simultaneously; each launch creates a new process and window (default for Windows App SDK apps). |
| `AppInstance.FindOrRegisterForKey(string key)` | method | Claims an arbitrary app-defined key; returns the instance that owns the key (itself if newly registered, or another instance if the key was already taken). |
| `AppInstance.RedirectActivationToAsync(args)` | method | Forwards the current activation to the instance that owns a claimed key; not terminal, so the app can continue running after redirecting. |
| `AppInstance.GetInstances()` | method | Lists all running instances, for scenarios that need to scan multiple instances (e.g. finding a "reusable" instance by custom key convention). |

## Notes

- Package: `Microsoft.Windows.AppLifecycle` (Windows App SDK). The instancing model differs from UWP's `Windows.ApplicationModel.AppInstance`: any instance (keyed or not) can be a redirection target, `GetInstances` returns all instances (not just keyed ones), and redirection is not terminal.
- Most apps should redirect as early as possible (e.g. in `WinMain`, before creating windows) to avoid unnecessary initialization work.
- Redirect logic can chain across instances (A → B → C); apps must guard against circular redirection themselves, since the platform does not detect cycles.
- When redirecting from an STA thread, call `RedirectActivationToAsync` on a background thread and wait via a non-blocking primitive (e.g. `Semaphore`) instead of blocking the STA on the async call directly.
- Keys are app-defined strings with no inherent platform meaning; use them to encode whatever redirection policy the app needs (e.g. per-open-file keys, or a fixed "REUSABLE" key for a pooled instance).
- Call `AppInstance.UnregisterKey()` before planned exit to avoid races where another instance redirects to an instance that is already terminating.

## Related

- [AppInstance](./app-instance.md)
- [AppActivationArguments and ExtendedActivationKind](./app-activation-arguments.md)
- [Rich activation (ActivationRegistrationManager)](./rich-activation.md)
