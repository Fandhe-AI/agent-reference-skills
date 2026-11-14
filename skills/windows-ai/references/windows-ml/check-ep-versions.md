# Check execution provider versions in Windows ML

Programmatically or manually check which version of an execution provider (EP) is currently installed on a device, since EPs are dynamically acquired at runtime and their versions can vary over time.

## Signature / Usage

```csharp
// Get all EPs compatible with this device
var providers = ExecutionProviderCatalog.GetDefault().FindAllProviders();

// For each provider
foreach (var provider in providers)
{
    // Log the name
    Debug.WriteLine($"Windows ML EP: {provider.Name}");

    // Log the version
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

```cpp
#include <WinMLEpCatalog.h>
#include <stdio.h>

// Callback to log each provider's name and version
BOOL CALLBACK LogProviderVersionCallback(
    WinMLEpHandle ep,
    const WinMLEpInfo* info,
    void* context)
{
    // Log the name
    printf("Windows ML EP: %s\n", info->name);

    // Log the version (available directly in the info struct)
    if (info->version != nullptr && info->version[0] != '\0')
    {
        printf("Version: %s\n", info->version);
    }
    else
    {
        printf("Version: Not installed\n");
    }

    return TRUE; // Continue enumeration
}

void CheckAllProviderVersions()
{
    WinMLEpCatalogHandle catalog = nullptr;
    HRESULT hr = WinMLEpCatalogCreate(&catalog);
    if (SUCCEEDED(hr))
    {
        // Enumerate all providers and log their versions
        WinMLEpCatalogEnumProviders(catalog, LogProviderVersionCallback, nullptr);
        WinMLEpCatalogRelease(catalog);
    }
}
```

```python
catalog = winml.ExecutionProviderCatalog.get_default()
providers = catalog.find_all_providers()

# For each provider
for provider in providers:
    # Log the name
    print(f"Windows ML EP: {provider.name}")

    # Log the version
    if provider.package_id is not None:
        v = provider.package_id.version
        print(f"Version: {v.major}.{v.minor}.{v.build}.{v.revision}")
    else:
        print("Version: Not installed")
```

```powershell
# Check which EP version is installed on your own dev device
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

Example output on a device with the QNN EP installed:

```text
Windows ML EP: QNNExecutionProvider
Version: 1.8.27.0
```

```text
Name              : MicrosoftCorporationII.WinML.Qualcomm.QNN.EP.1.8
Publisher         : CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US
Architecture      : Arm64
ResourceId        :
Version           : 1.8.27.0
...
```

## Notes

- Check via the `PackageId` property on `ExecutionProvider` (`Microsoft.Windows.AI.MachineLearning`). If the EP is not yet present, `PackageId` returns null.
- The C/C++ native path uses `WinMLEpCatalogEnumProviders` from `WinMLEpCatalog.h`, which exposes the version directly on `WinMLEpInfo`.
- EPs are dynamically acquired at runtime (see [Install execution providers](./install-execution-providers.md)) and updated automatically with compatible updates, so the version can vary over time.
- See [Windows ML execution providers](./supported-execution-providers.md) for the available EPs and their release history.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/versioning (retrieved 2026-11-14)

## Related

- [Update execution providers](./update-eps.md)
- [Install execution providers](./install-execution-providers.md)
- [Windows ML execution providers](./supported-execution-providers.md)
