# AppActivationArguments / ExtendedActivationKind

`AppActivationArguments` contains the type and data payload for an app activation. `ExtendedActivationKind` defines the set of activation types the payload can represent, used by the `Kind` property.

## Signature / Usage

```cpp
void GetActivationInfo()
{
    AppActivationArguments args = AppInstance::GetCurrent().GetActivatedEventArgs();
    ExtendedActivationKind kind = args.Kind();
    if (kind == ExtendedActivationKind::Launch)
    {
        ILaunchActivatedEventArgs launchArgs = args.Data().as<ILaunchActivatedEventArgs>();
        winrt::hstring argString = launchArgs.Arguments();
    }
    else if (kind == ExtendedActivationKind::File)
    {
        IFileActivatedEventArgs fileArgs = args.Data().as<IFileActivatedEventArgs>();
        IStorageItem file = fileArgs.Files().GetAt(0);
    }
    else if (kind == ExtendedActivationKind::Protocol)
    {
        IProtocolActivatedEventArgs protocolArgs = args.Data().as<IProtocolActivatedEventArgs>();
        Uri uri = protocolArgs.Uri();
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Kind` | `ExtendedActivationKind` (property) | The type of the registered activation. |
| `Data` | `object` (property) | The data payload for the activation; cast (`.as<T>()`) to the `I*ActivatedEventArgs` interface matching `Kind` (e.g. `ILaunchActivatedEventArgs`, `IFileActivatedEventArgs`, `IProtocolActivatedEventArgs`, `IStartupTaskActivatedEventArgs`). |

Common `ExtendedActivationKind` values relevant to unpackaged and packaged apps:

| Value | Description |
|-------|-------------|
| `Launch` | App launched from the command line, icon double-click, `ShellExecute`, or `CreateProcess`. |
| `File` | App registered for a file type; that file type was opened. |
| `Protocol` | App registered for a URI scheme; a matching URI was executed. |
| `StartupTask` | App activated at Windows sign-in via registry key or startup-folder shortcut. |
| `Search`, `ShareTarget`, `ToastNotification`, `Push`, `AppNotification`, ... | Additional UWP-derived kinds; packaged apps support all 44 UWP activation kinds, unpackaged apps currently support `Launch`, `File`, `Protocol`, and `StartupTask`. |

## Notes

- Package: `Microsoft.Windows.AppLifecycle` (Windows App SDK). `ExtendedActivationKind` extends UWP's `Windows.ApplicationModel.Activation.ActivationKind` set with Windows App SDK-specific values (`CommandLineLaunch`, `Push`, `AppNotification`, etc.).
- Instances are obtained either from the `AppInstance.Activated` event handler or by calling `AppInstance.GetCurrent().GetActivatedEventArgs()`.
- Unpackaged apps must first register for `File`, `Protocol`, or `StartupTask` kinds via `ActivationRegistrationManager` before they can receive those activation kinds; `Launch` (including command-line launches) is supported by default.
- Some enum values are marked "Not supported" for the Windows App SDK (e.g. `PickerReturned`, `WalletAction`, `PickFileContinuation`) — they exist for parity with UWP's `ActivationKind` but are not applicable outside UWP.

## Related

- [AppInstance](./app-instance.md)
- [Single-instancing and rich activation](./single-instancing.md)
