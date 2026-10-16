# PackageCertificateEkuValidator

Sealed `IPackageValidator` implementation constructed with an expected certificate EKU string. Windows App SDK 2.0 (and 2.0-experimental) only.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public sealed class PackageCertificateEkuValidator : IPackageValidator
{
    public PackageCertificateEkuValidator(string expectedCertificateEku);
    public bool IsPackageValid(object appxPackagingObject);
}

var validator = new PackageCertificateEkuValidator(expectedEku);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| expectedCertificateEku (constructor) | string | Expected certificate EKU. No further description on the official page. |
| IsPackageValid(Object) | bool | `IPackageValidator` implementation; no description on the official page. |

## Notes

- Agile marshaling, threading model Both, activatable via `IPackageCertificateEkuValidatorFactory` (contract version 196608).
- The official page does not describe the validation semantics (for example, which certificate is inspected); none are stated here.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagecertificateekuvalidator

## Related

- [IPackageValidator](./ipackagevalidator.md)
- [PackageFamilyNameValidator](./packagefamilynamevalidator.md)
- [PackageMinimumVersionValidator](./packageminimumversionvalidator.md)
