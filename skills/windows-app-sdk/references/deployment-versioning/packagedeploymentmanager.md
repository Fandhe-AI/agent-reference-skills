# PackageDeploymentManager

Sealed class that manages the MSIX packages available to a user: adding, registering, staging, provisioning, removing, repairing, and resetting packages, individually or as a `PackageSet`. Distinct from `DeploymentManager` (see Notes).

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

public sealed class PackageDeploymentManager
{
    public static PackageDeploymentManager GetDefault();

    public bool IsPackageDeploymentFeatureSupported(PackageDeploymentFeature feature);

    // Each verb below has multiple call shapes: by package path/URI (String "package" or Uri),
    // by package family/full name (...ByFamilyName / ...ByFullName), and for a whole PackageSet (...PackageSet).
    // All of them return the same shape: IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress>.
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> AddPackageAsync(string package, AddPackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> AddPackageByUriAsync(Uri uri, AddPackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> AddPackageSetAsync(PackageSet packageSet, AddPackageOptions options);

    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RegisterPackageAsync(string package, RegisterPackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RegisterPackageByUriAsync(Uri uri, RegisterPackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RegisterPackageSetAsync(PackageSet packageSet, RegisterPackageOptions options);

    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> StagePackageAsync(string package, StagePackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> ProvisionPackageAsync(string package, ProvisionPackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> DeprovisionPackageAsync(string packageFamilyName);

    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RemovePackageAsync(string package, RemovePackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RemovePackageByFamilyNameAsync(string packageFamilyName, RemovePackageOptions options);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RemovePackageByFullNameAsync(string packageFullName, RemovePackageOptions options);

    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> RepairPackageAsync(string package);
    public IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress> ResetPackageAsync(string package);

    public bool IsPackageReady(string packageFamilyName);
    public bool IsPackageProvisioned(string packageFamilyName);
    public bool IsPackageRegistrationPending(string packageFamilyName);
}
```

## Options / Props

| Member family | Description |
|---|---|
| `GetDefault()` | Retrieves the singleton `PackageDeploymentManager` instance; the entry point for every other member. |
| `IsPackageDeploymentFeatureSupported(PackageDeploymentFeature)` | Checks whether a given feature of this API is supported on the current OS/runtime before calling it. |
| `AddPackage*Async` | Adds a package (and its dependencies) for the current user: `AddPackageAsync` (path/URI string to a package file, e.g. `.msix`), `AddPackageByUriAsync` (`Uri` to package/manifest/App Installer file), `AddPackageSetAsync` (a `PackageSet` of several packages at once). Configured via `AddPackageOptions`. |
| `RegisterPackage*Async` | Registers an already-staged package for the current user, same three call shapes, configured via `RegisterPackageOptions`. |
| `StagePackage*Async` | Stages a package to the system without registering it, via `StagePackageOptions`. |
| `Provision`/`DeprovisionPackage*Async` | Provisions (or removes provisioning of) a package for all users on the machine, via `ProvisionPackageOptions`. |
| `RemovePackage*Async` | Removes a package by family name, full name, or URI, via `RemovePackageOptions`. |
| `RepairPackageAsync` / `ResetPackageAsync` | Programmatic equivalents of the **Repair** / **Reset** buttons in Windows Settings > Apps > *app* > Advanced options. `Reset` deletes the app's data; `Repair` doesn't. |
| `IsPackageReady*` / `IsPackageProvisioned*` / `IsPackageRegistrationPending*` | Cheap status checks (by family name, by URI, or for a `PackageSet`) to decide whether an install/registration/provisioning call is actually needed. |
| `EnsurePackageReady*Async` / `EnsurePackageSetReadyAsync` | Combined "make sure it's ready, doing whatever's needed" call (download, register, remediate), via `EnsureReadyOptions`. |
| `AddPackageOptions` | Deployment options for adding a package: notable members include `AllowUnsigned`, `DeferRegistrationWhenPackagesAreInUse`, `ForceAppShutdown` / `ForceTargetAppShutdown`, `ForceUpdateFromAnyVersion`, `ExternalLocationUri`, `DependencyPackageUris`, `TargetVolume`, `RetainFilesOnFailure`, `StageInPlace`. Available on Windows 10 version 2004 (build 19041) and later. |
| `PackageSet` | Group of packages operated on as one request (no ordering guarantee among `Items`); has an optional `Id` (for logging) and a default `PackageUri`. |

## Notes

- Namespace: `Microsoft.Windows.Management.Deployment`. Available starting Windows App SDK 1.5 through 2.0 (moniker range `windows-app-sdk-1.5` .. `windows-app-sdk-2.0`); `PackageDependency_ResolveDynamically`-adjacent features added later are gated behind `IsPackageDeploymentFeatureSupported`.
- Distinct from two similarly-named/adjacent APIs — don't merge:
  - `Microsoft.Windows.ApplicationModel.WindowsAppRuntime.DeploymentManager` (this skill, `deploymentmanager.md`) only initializes/repairs the Windows App SDK runtime itself for the current package; it has no concept of installing arbitrary MSIX packages.
  - `Windows.Management.Deployment.PackageManager` (the UWP-era predecessor this API supersedes) is documented in the windows-packaging-publish skill.
- Every mutating verb has 2-3 call shapes: a plain `string package` (path/URI to a package file, or a family/full name depending on the verb), an explicit `Uri`/`...ByFamilyName`/`...ByFullName` variant, and — for the `*Async` methods that support it — for a whole `PackageSet` in one call.
- Async methods return `IAsyncOperationWithProgress<PackageDeploymentResult, PackageDeploymentProgress>` — `PackageDeploymentResult` (`Status`/`Error`/`ExtendedError`/`ErrorText`/`ActivityId`) carries the operation's outcome. This is a distinct type from `DeploymentManager`'s `DeploymentResult` — don't conflate the two.

## Related

- [DeploymentManager](./deploymentmanager.md)
- [DeploymentResult](./deploymentresult.md) — the distinct result type used by `DeploymentManager`, not by this class
