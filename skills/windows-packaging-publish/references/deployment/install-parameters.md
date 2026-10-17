# Pass Installation Parameters to Your App via App Installer

Query string parameters defined in the download/install URI are passed to the app on launch through a custom protocol activation, both on first install and when the app is already installed.

## Signature / Usage

Register a custom protocol in the manifest:

```xml
<Application>
...
   <Extensions>
     <uap:Extension Category="windows.protocol">
        <uap:Protocol Name="my-custom-protocol"/>
     </uap:Extension>
   </Extensions>
...
</Application>
```

Install URI carrying the parameters:

```text
ms-appinstaller:?source=https://contoso.com/myapp.appinstaller&activationUri=my-custom-protocol:?my-parameter=my-param-value
```

Handle the activation:

```csharp
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;

var activationArgs = AppInstance.GetActivatedEventArgs();
switch (activationArgs.Kind)
{
    case ActivationKind.Protocol:
        HandleProtocolActivation(activationArgs as ProtocolActivatedEventArgs);
        break;
    case ActivationKind.Launch:
        HandleLaunch(activationArgs as LaunchActivatedEventArgs);
        break;
}
```

## Options / Props

The install URI must contain:

| Part | Description |
| --- | --- |
| `ms-appinstaller` protocol | Invokes App Installer. |
| `activationUri` | Unique parameter pointing to the app's custom protocol and the install parameters to pass at launch. |
| Custom protocol, parameter, and value | e.g. `my-custom-protocol:?my-parameter=my-param-value`. |

## Notes

- The app receives the portion after `activationUri` (here `my-custom-protocol:?my-parameter=my-param-value`) as a protocol activation (`ProtocolActivatedEventArgs`, read `args.Uri`).
- Useful for tracking or handling installs by source or download type, e.g. from an email campaign.
- With a Windows Packaging Project the protocol can be declared in the manifest editor's Declarations tab (Protocol).
- Using `ms-appinstaller` can be controlled by an administrator via the `EnableMSAppInstallerProtocol` policy.
- Source: https://learn.microsoft.com/en-us/windows/msix/app-installer/install-parameters, last updated 12/17/2020 (ms.date).

## Related

- [Web install with App Installer](./web-install-app-installer.md)
- [App Installer authentication manager](./app-installer-authentication-manager.md)
