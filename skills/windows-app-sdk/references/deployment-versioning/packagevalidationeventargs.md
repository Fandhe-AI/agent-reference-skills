# PackageValidationEventArgs

Sealed event-args class for `PackageValidationEventSource.ValidationRequested`, carrying the package being validated, a `Cancel` flag and a deferral. Windows App SDK 2.0 (prerelease on the official page).

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public sealed class PackageValidationEventArgs
{
    public object AppxPackagingObject { get; }
    public bool Cancel { get; set; }
    public System.Uri PackageUri { get; }
    public Deferral GetDeferral();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AppxPackagingObject | Object (IInspectable) | Read-only. |
| Cancel | bool | Get/set. |
| PackageUri | Uri | Read-only. |
| GetDeferral() | Deferral | Method returning a `Deferral`. |

## Notes

- Contract `PackageDeploymentContract` version 196608; agile marshaling; not activatable.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagevalidationeventargs?view=windows-app-sdk-2.0 (and `.appxpackagingobject` / `.cancel` / `.packageuri` / `.getdeferral`)

## Related

- [PackageValidationEventSource](./packagevalidationeventsource.md)
- [PackageValidationHandler](./packagevalidationhandler.md)
- [IPackageValidator](./ipackagevalidator.md)
