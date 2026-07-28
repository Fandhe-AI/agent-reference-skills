# PackageManager Class

`Windows.Management.Deployment.PackageManager` manages the software (MSIX packages) available to a user: adding, registering, removing, staging, and querying packages, and managing package volumes.

## Signature / Usage

```csharp
using Windows.Management.Deployment;

var packageManager = new PackageManager();

// Register/add a package
var result = await packageManager.AddPackageAsync(packageUri, dependencyUris, DeploymentOptions.None);

// Find installed packages by family name
IEnumerable<Windows.ApplicationModel.Package> packages = packageManager.FindPackages("Contoso.App_8wekyb3d8bbwe");

// Remove a package for the current user
await packageManager.RemovePackageAsync(packageFullName);
```

## Options / Props

| Name | Description |
|------|-------------|
| `AddPackageAsync(...)` | Adds (installs) a main package and its dependencies for the current user. Multiple overloads for volume, external location, optional/related packages. |
| `AddPackageByUriAsync(Uri, AddPackageOptions)` | Adds a package and dependencies for the current user; `AddPackageOptions.ExternalLocationUri` is used to register a sparse/external-location package. |
| `AddPackageByAppInstallerFileAsync(...)` | Installs one or more packages from an `.appinstaller` file. |
| `RegisterPackageAsync(Uri, IIterable<Uri>, DeploymentOptions, ...)` | Registers a package (and dependencies) already staged on the volume, for the current user. |
| `RegisterPackageByFamilyNameAsync(...)` | Registers a package by family name. |
| `RegisterPackageByFullNameAsync(...)` / `RegisterPackagesByFullNameAsync(...)` | Registers package(s) by full name. |
| `RegisterPackageByUriAsync(Uri, RegisterPackageOptions)` | Registers a package (and dependencies) by URI, with options such as `ExternalLocationUri`. |
| `RemovePackageAsync(String)` / `RemovePackageAsync(String, RemovalOptions)` | Removes a package for the current user; also removes dependency packages if unused by others. |
| `RemovePackageByUriAsync(Uri, RemovePackageOptions)` | Removes a package identified by URI. |
| `StagePackageAsync(...)` / `StagePackageByUriAsync(...)` | Stages a package on the system without registering it (used for per-machine provisioning flows). |
| `UpdatePackageAsync(Uri, IIterable<Uri>, DeploymentOptions)` | Updates an installed package or its dependencies for the current user. |
| `ProvisionPackageForAllUsersAsync(...)` / `DeprovisionPackageForAllUsersAsync(...)` | Provisions/deprovisions a package so new users on the device get/lose the app automatically (machine-wide installs). |
| `FindPackages()` / `FindPackages(String)` / `FindPackages(String name, String publisher)` | Finds installed packages across all users, optionally filtered by family name or name+publisher. |
| `FindPackageForUser(String, String)` / `FindPackagesForUser(...)` | Finds package(s) installed for a specific user. |
| `FindPackagesWithPackageTypes(...)` / `FindPackagesForUserWithPackageTypes(...)` | Same as `FindPackages`/`FindPackagesForUser` filtered by `PackageTypes` (e.g. `Main`, `Framework`, `Resource`). |
| `FindProvisionedPackages()` | Gets all packages provisioned on the device. |
| `IsPackageRemovalPending(String)` / `...ByUri(...)` / `...ForUser(...)` | Checks whether removal of a package is pending. |
| `GetDefaultPackageVolume()` / `SetDefaultPackageVolume(...)` / `AddPackageVolumeAsync(...)` / `FindPackageVolume(...)` / `FindPackageVolumes()` / `GetPackageVolumesAsync()` / `RemovePackageVolumeAsync(...)` | Manage package volumes (where packages are stored). |
| `DebugSettings` | Gets debugging settings for package deployment. |

## Notes

- All add/register/remove/stage methods return `AsyncOperationWithProgress` results; results typically expose `ExtendedErrorCode` / `ErrorText` that should be checked for failures.
- Per-user registration uses `AddPackageByUriAsync` (with `ExternalLocationUri` for sparse packages) and `RemovePackageAsync`. Per-machine/provisioned installs use `StagePackageByUriAsync` + `ProvisionPackageForAllUsersAsync`, and `DeprovisionPackageForAllUsersAsync` + `RemovePackageAsync(..., RemovalOptions.RemoveForAllUsers)` to uninstall.
- Many `PackageManager` operations require elevated (administrator) context for machine-wide operations; per-user operations generally do not.
- Do not confuse `Windows.Management.Deployment.PackageManager` (this class, deployment operations) with `Windows.ApplicationModel.Package` (describes a single already-resolved package instance).

## Related

- [Package Class](./package-class.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
- [Package Uninstall and Update Behavior](./package-uninstall-update.md)
