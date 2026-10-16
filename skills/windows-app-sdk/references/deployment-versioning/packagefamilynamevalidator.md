# PackageFamilyNameValidator

Sealed `IPackageValidator` implementation constructed with an expected package family name. Windows App SDK 2.0 (and 2.0-experimental) only.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public sealed class PackageFamilyNameValidator : IPackageValidator
{
    public PackageFamilyNameValidator(string expectedPackageFamilyName);
    public bool IsPackageValid(object appxPackagingObject);
}

var validator = new PackageFamilyNameValidator("Contoso.App_8wekyb3d8bbwe");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| expectedPackageFamilyName (constructor) | string | Expected package family name. No further description on the official page. |
| IsPackageValid(Object) | bool | `IPackageValidator` implementation; no description on the official page. |

## Notes

- Agile marshaling, threading model Both, activatable via `IPackageFamilyNameValidatorFactory` (contract version 196608).
- The official page does not describe the validation semantics; none are stated here.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagefamilynamevalidator

## Related

- [IPackageValidator](./ipackagevalidator.md)
- [PackageCertificateEkuValidator](./packagecertificateekuvalidator.md)
- [PackageMinimumVersionValidator](./packageminimumversionvalidator.md)
