# IPackageValidator

Interface implemented by the Windows App SDK package validators. Defines a single `IsPackageValid` check. Windows App SDK 2.0 (and 2.0-experimental) only.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public interface IPackageValidator
{
    bool IsPackageValid(object appxPackagingObject);
}

// Built-in implementations
IPackageValidator validator = new PackageFamilyNameValidator("Contoso.App_8wekyb3d8bbwe");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsPackageValid(Object appxPackagingObject) | bool | Returns whether the supplied packaging object passes validation. The official page gives no further description. |

Derived (built-in) types:

| Type | Constructor argument |
|------|----------------------|
| PackageCertificateEkuValidator | `string expectedCertificateEku` |
| PackageFamilyNameValidator | `string expectedPackageFamilyName` |
| PackageMinimumVersionValidator | `Windows.ApplicationModel.PackageVersion minimumVersion` |

## Notes

- Contract: `PackageDeploymentContract` version 196608; GUID attribute `89610944, 61223, 22059, 168, 235, 102, 78, 56, 128, 63, 174`.
- Wiring (Windows App SDK 2.0 stable release notes, "Package deployment and validation"): validators are attached to deployment calls through the new read-only `PackageValidators` property on `AddPackageOptions` and `StagePackageOptions`. C#: `IReadOnlyDictionary<System.Uri, PackageValidationEventSource>`; C++/WinRT: `IMapView<Uri, PackageValidationEventSource>`.
- `PackageValidationEventArgs`, `PackageValidationEventSource` and `PackageValidationHandler` carry the validation events.
- `IsPackageValidationSupported` (bool) and `GetValidationEventSourceForUri(Uri)` (returns `PackageValidationEventSource`), both members of `AddPackageOptions` and `StagePackageOptions`, let callers probe support before invoking deployment.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.ipackagevalidator

## Related

- [PackageCertificateEkuValidator](./packagecertificateekuvalidator.md)
- [PackageFamilyNameValidator](./packagefamilynamevalidator.md)
- [PackageMinimumVersionValidator](./packageminimumversionvalidator.md)
- [PackageValidationEventSource](./packagevalidationeventsource.md)
- [PackageValidationEventArgs](./packagevalidationeventargs.md)
- [PackageValidationHandler](./packagevalidationhandler.md)
- [PackageDeploymentManager](./packagedeploymentmanager.md)
