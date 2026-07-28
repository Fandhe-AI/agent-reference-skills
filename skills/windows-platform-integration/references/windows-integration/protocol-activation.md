# Protocol activation (receiving URI activation)

Describes how a packaged Windows app receives control when it is launched via a URI matching its registered `windows.protocol` scheme (see [Protocol and FileTypeAssociation](./protocol-file-association.md) for registering the scheme).

## Signature / Usage

```csharp
// WinUI / UWP: override OnActivated in App.xaml.cs
public partial class App
{
    protected override void OnActivated(IActivatedEventArgs args)
    {
        if (args.Kind == ActivationKind.Protocol)
        {
            var eventArgs = args as ProtocolActivatedEventArgs;
            // The received URI is eventArgs.Uri.AbsoluteUri
        }
    }
}
```

```csharp
// Programmatically trigger the same activation, e.g. from another app
var uri = new Uri("alsdk:");
bool success = await Windows.System.Launcher.LaunchUriAsync(uri);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Windows.ApplicationModel.Activation.ProtocolActivatedEventArgs` | class | Activation args delivered when the app is launched via a registered URI scheme; exposes `Uri` (WinRT `Uri` type). |
| `Microsoft.UI.Xaml.Application.OnActivated` | method (WinUI) | Override point for handling all non-launch activation kinds, including `ActivationKind.Protocol`. |
| `AppInstance.GetCurrent().GetActivatedEventArgs()` | method (Windows App SDK) | Alternative way to retrieve activation args at any point (e.g. in `OnLaunched`), used by unpackaged apps together with `ActivationRegistrationManager`. |
| `ActivationKind.Protocol` | enum value | Identifies protocol/URI activation among other `ActivationKind` values (Launch, File, ...). |

## Notes

- Namespace: `Windows.ApplicationModel.Activation` (WinRT) for `ProtocolActivatedEventArgs`; `Microsoft.Windows.AppLifecycle` (Windows App SDK) for `AppInstance`/`ActivationRegistrationManager`.
- This page covers **packaged apps** (WinUI 3, MSIX-packaged WPF/Win32) registering via the package manifest — see [Protocol and FileTypeAssociation](./protocol-file-association.md). **Unpackaged** apps must instead register the protocol with `ActivationRegistrationManager` and read `AppInstance.GetCurrent().GetActivatedEventArgs()`.
- Treat all URI parameters as **untrusted input**: any process can invoke your scheme with arbitrary payloads. Never perform irreversible actions (delete files, send messages) based solely on URI parameters; validate/sanitize before use, and never pass raw parameters to `Process.Start`/`ShellExecute`/SQL queries.
- Best practice: create a new navigation `Frame` per activation (or clear the existing frame's backstack) so the Back button returns the user to where they were, not into stale content from before suspension.

## Related

- [Protocol and FileTypeAssociation](./protocol-file-association.md)
- [Launcher](./launcher.md)
