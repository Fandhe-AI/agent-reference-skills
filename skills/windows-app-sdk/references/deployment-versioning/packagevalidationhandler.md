# PackageValidationHandler

Sealed class constructed from an `IPackageValidator`, exposing a `TypedEventHandler` in its `Handler` property. Windows App SDK 2.0 (prerelease on the official page).

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public sealed class PackageValidationHandler
{
    public PackageValidationHandler(IPackageValidator validator);
    public TypedEventHandler<PackageValidationEventSource,PackageValidationEventArgs> Handler { get; }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| validator (constructor) | IPackageValidator | Validator passed to the constructor. No description on the official page. |
| Handler | TypedEventHandler<PackageValidationEventSource,PackageValidationEventArgs> | Read-only. No description on the official page. |

## Notes

- Activatable via `IPackageValidationHandlerFactory` (contract version 196608); agile marshaling; threading model Both.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagevalidationhandler?view=windows-app-sdk-2.0 (and `.-ctor` / `.handler`)

## Related

- [IPackageValidator](./ipackagevalidator.md)
- [PackageValidationEventSource](./packagevalidationeventsource.md)
- [PackageValidationEventArgs](./packagevalidationeventargs.md)
