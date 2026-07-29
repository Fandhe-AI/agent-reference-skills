# Get Activation Info for Packaged Apps

Starting in Windows 10, version 1809, packaged desktop (Win32/.NET) apps can call `Windows.ApplicationModel.AppInstance.GetActivatedEventArgs` at startup to retrieve UWP-style activation info — e.g. which file, protocol, or toast notification triggered the launch. Starting in Windows 10, version 2004, this also works for apps granted package identity via external location (sparse packaging).

## Signature / Usage

```csharp
static void Main()
{
    Application.EnableVisualStyles();
    Application.SetCompatibleTextRenderingDefault(false);

    var args = AppInstance.GetActivatedEventArgs();
    switch (args.Kind)
    {
        case ActivationKind.Launch:
            HandleLaunch(args as LaunchActivatedEventArgs);
            break;
        case ActivationKind.ToastNotification:
            HandleToastNotification(args as ToastNotificationActivatedEventArgs);
            break;
        case ActivationKind.File:
            HandleFile(args as FileActivatedEventArgs);
            break;
        case ActivationKind.Protocol:
            HandleProtocol(args as ProtocolActivatedEventArgs);
            break;
        case ActivationKind.StartupTask:
            HandleStartupTask(args as StartupTaskActivatedEventArgs);
            break;
        default:
            HandleLaunch(null);
            break;
    }
}
```

## Options / Props

| Event args type | Package extension | Minimum version |
|------|------|------|
| `LaunchActivatedEventArgs` | None | Windows 10, version 1809 |
| `FileActivatedEventArgs` | `uap:FileTypeAssociation` | Windows 10, version 1809 |
| `ProtocolActivatedEventArgs` | `uap:Protocol` | Windows 10, version 1809 |
| `ToastNotificationActivatedEventArgs` | `desktop:ToastNotificationActivation` | Windows 10, version 1809 |
| `StartupTaskActivatedEventArgs` | `desktop:StartupTask` | Windows 10, version 1809 |
| `ShareTargetActivatedEventArgs` | `uap:ShareTarget` | Windows 10, version 2004 |

## Notes

- Requires package identity: full MSIX packaging, or packaging with external location (sparse packaging) starting in version 2004. See APIs Requiring Package Identity and Sparse Packages and External Location Packages.
- `AppInstance` here is the UWP class `Windows.ApplicationModel.AppInstance` (`GetActivatedEventArgs` is a static method returning `IActivatedEventArgs`, cast per `args.Kind`). This is distinct from the Windows App SDK's `Microsoft.Windows.AppLifecycle.AppInstance` / `AppActivationArguments` / `ExtendedActivationKind` (covered by the windows-app-sdk skill), which is a newer, richer replacement that also supports single/multi-instance redirection and unpackaged apps.
- Activation info for background tasks is retrieved differently — by defining a COM background task class — rather than through `GetActivatedEventArgs`.

## Related

- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
- [Detecting Package Identity](./detect-package-identity.md)
