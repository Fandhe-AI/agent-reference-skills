# Detecting WinRT API Availability (ApiInformation)

`Windows.Foundation.Metadata.ApiInformation` lets you detect whether a WinRT API contract, type, or member is present at runtime, so a desktop app compiled against a newer TFM can still run on — and adapt to — an older Windows version. `IsApiContractPresent` checks a whole API contract (a versioned group of related APIs); `IsTypePresent` (plus `IsMethodPresent`, `IsPropertyPresent`, `IsEventPresent`) checks individual members at finer granularity.

## Signature / Usage

```csharp
using Windows.Foundation.Metadata;

// Check for an entire API contract (all APIs in it are guaranteed present together).
bool hasUniversalApiContract6 =
    ApiInformation.IsApiContractPresent("Windows.Foundation.UniversalApiContract", 6);

// Check for a single type before using it.
if (ApiInformation.IsTypePresent("Windows.UI.ViewManagement.UISettings"))
{
    var settings = new Windows.UI.ViewManagement.UISettings();
}
```

## Options / Props

| Member | Description |
| --- | --- |
| `ApiInformation.IsApiContractPresent(string contractName, ushort majorVersion)` | Returns whether the named API contract (a versioned group of related WinRT APIs) is present. A platform implementing any API in a contract must implement the whole contract. |
| `ApiInformation.IsTypePresent(string typeName)` | Returns whether a specific WinRT type is present. |
| `ApiInformation.IsMethodPresent` / `IsPropertyPresent` / `IsEventPresent` | Finer-grained checks for a specific member of a type. |

## Notes

- The TFM's target OS version controls what compiles; it does not guarantee the API exists at runtime on an older `SupportedOSPlatformVersion`. Guard calls to APIs not present on all supported versions with `ApiInformation` checks.
- When `SupportedOSVersion` is set below the TFM's OS version, Visual Studio emits build warning `CA1416` ("Using platform dependent API...") for calls that need such a runtime guard.
- `Windows.Foundation.UniversalApiContract` is the largest and most commonly used API contract, covering most of the Universal Windows Platform surface.
- These checks matter specifically in desktop apps that target a range of Windows versions; see also [WinRT APIs Not Supported in Desktop Apps](./winrt-api-desktop-support.md) for APIs that are unsupported in desktop apps *regardless* of OS version (a separate, unrelated restriction from version availability).

## Related

- [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)
- [WinRT APIs Not Supported in Desktop Apps](./winrt-api-desktop-support.md)
