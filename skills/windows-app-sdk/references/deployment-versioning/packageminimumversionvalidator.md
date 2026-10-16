# PackageMinimumVersionValidator

Sealed `IPackageValidator` implementation constructed with a minimum `PackageVersion`. Windows App SDK 2.0 (and 2.0-experimental) only.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;
using Windows.ApplicationModel;

public sealed class PackageMinimumVersionValidator : IPackageValidator
{
    public PackageMinimumVersionValidator(PackageVersion minimumVersion);
    public bool IsPackageValid(object appxPackagingObject);
}

var validator = new PackageMinimumVersionValidator(
    new PackageVersion { Major = 1, Minor = 2, Build = 0, Revision = 0 });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| minimumVersion (constructor) | Windows.ApplicationModel.PackageVersion | Minimum package version. No further description on the official page. |
| IsPackageValid(Object) | bool | `IPackageValidator` implementation; no description on the official page. |

## Notes

- Agile marshaling, threading model Both, activatable via `IPackageMinimumVersionValidatorFactory` (contract version 196608).
- The official page does not describe the validation semantics; none are stated here.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packageminimumversionvalidator

## Related

- [IPackageValidator](./ipackagevalidator.md)
- [PackageCertificateEkuValidator](./packagecertificateekuvalidator.md)
- [PackageFamilyNameValidator](./packagefamilynamevalidator.md)
