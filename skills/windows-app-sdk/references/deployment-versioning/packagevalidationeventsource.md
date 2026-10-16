# PackageValidationEventSource

Sealed class that exposes the `ValidationRequested` event. Windows App SDK 2.0 (prerelease on the official page).

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

[Windows.Foundation.Metadata.ContractVersion(typeof(Microsoft.Windows.Management.Deployment.PackageDeploymentContract), 196608)]
[Windows.Foundation.Metadata.MarshalingBehavior(Windows.Foundation.Metadata.MarshalingType.Agile)]
public sealed class PackageValidationEventSource
{
    public event TypedEventHandler<PackageValidationEventSource,PackageValidationEventArgs> ValidationRequested;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ValidationRequested | TypedEventHandler<PackageValidationEventSource,PackageValidationEventArgs> | Event. The official page gives no description. |

## Notes

- Namespace `Microsoft.Windows.Management.Deployment`; contract `PackageDeploymentContract` version 196608; agile marshaling. Not activatable (no constructor listed).
- The official page is marked prerelease ("may be substantially modified before it's released").
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagevalidationeventsource?view=windows-app-sdk-2.0 (and `.validationrequested`)

## Related

- [PackageValidationEventArgs](./packagevalidationeventargs.md)
- [PackageValidationHandler](./packagevalidationhandler.md)
- [IPackageValidator](./ipackagevalidator.md)
