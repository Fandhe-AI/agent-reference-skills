# Resource Packages

Resource packages segment language- or display-scale-specific assets into separate packages that Windows downloads automatically based on a device's configuration, reducing the disk footprint of an installed app. When a user adds an OS display language or changes display scaling, Windows fetches the applicable resource packages for all installed apps during the next automatic update.

## Signature / Usage

```csharp
// On-demand install of a resource package the app doesn't already have
var packageCatalog = PackageCatalog.OpenForCurrentPackage();
string resourceId = "split.language-de"; // matches ResourceId in the resource package's AppxManifest.xml
PackageCatalogAddResourcePackageResult result = await packageCatalog.AddResourcePackageAsync(
    "Contoso.MyApp_8wekyb3d8bbwe", resourceId,
    AddResourcePackageOptions.ApplyUpdateIfAvailable | AddResourcePackageOptions.ForceTargetApplicationShutdown);
if (result.ExtendedError != null)
{
    // display error or retry
}
```

## Options / Props

| API | Purpose |
|-----|---------|
| `PackageCatalog.AddResourcePackageAsync` | Downloads a resource package on demand by package family name + `ResourceId`; returns download progress |
| `AddResourcePackageOptions.ForceTargetApplicationShutdown` | Restarts the app so it picks up a merged view of the newly available resources |
| `AddResourcePackageOptions.ApplyUpdateIfAvailable` | If a newer app version is available, updates the app and acquires the resource package in the same download instead of failing |
| `PackageCatalog.RemoveResourcePackagesAsync` | Removes resource packages the app previously downloaded on demand; packages applicable to the current user/device as a whole cannot be removed |

## Notes

- Requires Windows SDK 10.0.17095.0+ for `AddResourcePackageAsync`.
- For local validation, build an `.msixbundle`/`.appxbundle` and install it from a local drive, network share, or web server — `AddResourcePackageAsync` acquires the resource package from wherever the app was originally installed.
- Distinct from asset packages: resource packages are language/scale-specific and only the relevant ones are downloaded per device; asset packages are architecture/language/scale-agnostic and are always downloaded.

## Related

- [Asset Packages and Flat Bundles](./asset-packages.md)
- [MSIX Package Structure](./package-structure.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
