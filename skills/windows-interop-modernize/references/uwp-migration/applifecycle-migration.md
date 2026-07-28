# Application lifecycle functionality migration

Migration guidance for app activation, instancing, and file type association when moving from UWP's `App` activation overrides to the Windows App SDK's `AppInstance`-based model.

## Signature / Usage

```csharp
// App.xaml.cs in a Windows App SDK (WinUI) app
protected override async void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
{
    var mainInstance = Microsoft.Windows.AppLifecycle.AppInstance.FindOrRegisterForKey("main");

    if (!mainInstance.IsCurrent)
    {
        var activatedEventArgs =
            Microsoft.Windows.AppLifecycle.AppInstance.GetCurrent().GetActivatedEventArgs();
        await mainInstance.RedirectActivationToAsync(activatedEventArgs);
        System.Diagnostics.Process.GetCurrentProcess().Kill();
        return;
    }

    m_window = new MainWindow();
    m_window.Activate();
}
```

## Options / Props

| Important API | Description |
|------|-------------|
| `Microsoft.Windows.AppLifecycle.AppInstance` | Represents a running app instance; used for instancing and activation-args retrieval |
| `AppInstance.FindOrRegisterForKey` | Registers/retrieves the "main" instance by key |
| `AppInstance.IsCurrent` | Whether the current instance is the one just retrieved/registered |
| `AppInstance.RedirectActivationToAsync` | Redirects activation to another (already-running) instance |
| `AppInstance.GetActivatedEventArgs` | Retrieves activation args to determine how the app was activated |
| `Microsoft.UI.Xaml.Application.OnLaunched` | Single entry point for all activation kinds in Windows App SDK apps |
| `ExtendedActivationKind` | Enum reporting the activation kind (e.g. `File`, `AppNotification`) |

## Notes

- **Default instancing differs**: UWP apps are single-instanced by default; Windows App SDK (WinUI 3) apps are **multi-instanced by default**. To restore single-instance behavior, perform the `FindOrRegisterForKey`/`IsCurrent`/`RedirectActivationToAsync` pattern above as early as possible — ideally in `Main`/`wWinMain` (define `DISABLE_XAML_GENERATED_MAIN` and hand-write `Main`/`wWinMain`) rather than in `OnLaunched`, to avoid throwaway work before redirecting.
- UWP's per-activation-kind overrides (`App.OnFileActivated`, `OnSearchActivated`, `OnActivated`, `OnBackgroundActivated`) have no direct override equivalents — instead call `AppInstance.GetActivatedEventArgs()` from `App.OnLaunched` (or anywhere) and branch on `ExtendedActivationKind`. Do **not** use the `LaunchActivatedEventArgs` passed into `OnLaunched` to determine activation kind — it unconditionally reports `Launch`.
- File type association: `Package.appxmanifest` **File Type Associations** declarations are unchanged from UWP; only the imperative activation-handling code changes (per above).
- The single-instancing code pattern requires targeting the **x64** architecture (applies to both C# and C++/WinRT).

## Related

- [Migration overview](./migration-overview.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
- [Background task migration strategy](./background-task-migration.md)
- [App notifications from UWP to WinUI migration](./toast-notifications-migration.md)
