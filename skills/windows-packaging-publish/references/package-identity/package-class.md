# Package Class

`Windows.ApplicationModel.Package` provides information about an installed package: its identity, location, dependencies, and metadata. Available since Windows 10 (10.0.10240.0), `Windows.Foundation.UniversalApiContract` v1.0.

## Signature / Usage

```csharp
using Windows.ApplicationModel;

Package package = Package.Current;
PackageId id = package.Id;
string fullName = id.FullName;
string installedLocation = package.InstalledLocation.Path;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Current` (static) | `Package` | Gets the package for the current app. |
| `Id` | `PackageId` | Gets the package identity (5-part tuple) of the current package. |
| `InstalledLocation` | `StorageFolder` | The package's path in the original install folder. |
| `InstalledPath` | `String` | Same as `InstalledLocation`, as a path string. |
| `DisplayName` | `String` | Display name of the package. |
| `PublisherDisplayName` | `String` | Publisher display name. |
| `Description` | `String` | Package description. |
| `Dependencies` | `IVector<Package>` | Packages on which the current package depends. |
| `Logo` | `Uri` | Logo of the package. |
| `IsBundle` | `Boolean` | Whether the package is a bundle. |
| `IsFramework` | `Boolean` | Whether other packages can depend on this one. |
| `IsOptional` | `Boolean` | Whether the package is optional. |
| `IsResourcePackage` | `Boolean` | Whether the package is a resource package. |
| `IsDevelopmentMode` | `Boolean` | Whether the package is installed in development (sideload) mode. |
| `IsStub` | `Boolean` | Whether the app in the current package is a stub app. |
| `SignatureKind` | `PackageSignatureKind` | How the package is signed. |
| `Status` | `PackageStatus` | Current status of the package for the user (e.g. tampered, license invalid). |
| `InstalledDate` | `DateTimeOffset` | Date the package was installed or last updated. |
| `EffectiveLocation` / `EffectivePath` | `StorageFolder` / `String` | Effective install or mutable folder, depending on manifest declaration. |
| `MutableLocation` / `MutablePath` | `StorageFolder` / `String` | The mutable-folder path, if the app is declared mutable. |
| `UserExternalLocation` / `MachineExternalLocation` / `EffectiveExternalLocation` | `StorageFolder` | External folder location(s) declared in the manifest for sparse/external-location packages. |

Key methods: `FindRelatedPackages(FindRelatedPackagesOptions)`, `GetAppListEntries()` / `GetAppListEntriesAsync()`, `GetAppInstallerInfo()`, `CheckUpdateAvailabilityAsync()`, `VerifyContentIntegrityAsync()`.

## Notes

- `Package` is usable from an unpackaged process, but many of its members (e.g. `Current`) only function meaningfully in a *packaged* process — calling `Package.Current` from a process without package identity throws.
- Namespace is `Windows.ApplicationModel.Package` — do not confuse with the `Windows.Management.Deployment.PackageManager` class, which manages install/register/remove operations rather than describing a single installed package.
- `Dependencies` reflects the packages declared as dependencies in the app's manifest (e.g. framework packages, other MSIX packages).

## Related

- [PackageId Class](./package-id-class.md)
- [PackageManager Class](./package-manager.md)
- [Package Identity Overview](./package-identity-overview.md)
