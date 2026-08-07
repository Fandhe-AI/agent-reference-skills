# Check execution provider versions in Windows ML

Programmatically or manually check which version of an execution provider (EP) is currently installed on a device, since EPs are dynamically acquired via Windows Update and their versions can vary over time.

## Signature / Usage

```csharp
// Get all EPs compatible with this device
var providers = ExecutionProviderCatalog.GetDefault().FindAllProviders();

foreach (var provider in providers)
{
    Debug.WriteLine($"Windows ML EP: {provider.Name}");

    if (provider.PackageId != null)
    {
        var v = provider.PackageId.Version;
        Debug.WriteLine($"Version: {v.Major}.{v.Minor}.{v.Build}.{v.Revision}");
    }
    else
    {
        Debug.WriteLine("Version: Not installed");
    }
}
```

```powershell
# Check which EP version is installed on your own dev device
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

## Notes

- Check via the `PackageId` property on `ExecutionProvider` (`Microsoft.Windows.AI.MachineLearning`). If the EP isn't present, `PackageId` returns null.
- The C/C++ native path uses `WinMLEpCatalogEnumProviders` from `WinMLEpCatalog.h`, which exposes the version directly on `WinMLEpInfo`.
- See [Windows ML execution providers](./supported-execution-providers.md) for release history per EP.

## Related

- [Update execution providers](./update-eps.md)
- [Install execution providers](./install-execution-providers.md)
- [Windows ML execution providers](./supported-execution-providers.md)
