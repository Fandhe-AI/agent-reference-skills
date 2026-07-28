# Package Uninstall and Update Behavior

How a package is uninstalled or updated depends on its packaging model: full MSIX packages are managed atomically by the OS/Store; packages with external location (sparse packages) keep using the host app's own installer/update mechanism while only the lightweight identity package goes through MSIX registration.

## Signature / Usage

```csharp
using Windows.Management.Deployment;

var packageManager = new PackageManager();

// Update an installed package (main + dependencies) for the current user
await packageManager.UpdatePackageAsync(packageUri, dependencyUris, DeploymentOptions.None);

// Remove a package for the current user (also removes now-unused dependencies)
await packageManager.RemovePackageAsync(packageFullName, RemovalOptions.RemoveForAllUsers);
```

## Options / Props

| Model | Update mechanism | Uninstall mechanism |
|------|-------------|-------------|
| Packaged (MSIX) | MSIX update (Store-managed or `PackageManager.UpdatePackageAsync` / `AddPackageAsync` with a newer version); dependency packages updated alongside the main package | Store uninstall UI, `Remove-AppxPackage`, or `PackageManager.RemovePackageAsync`; dependencies also removed if unused by other packages |
| Packaging with external location (sparse) | The app's own existing update mechanism (unchanged); the identity package version is typically kept aligned with the app version and re-registered on update | The app's own uninstaller calls `Remove-AppxPackage`/`RemovePackageAsync` to unregister the identity package, in addition to removing the app's own files |
| Unpackaged | `.exe`/`.msi`/custom installer or xcopy; no OS-level atomicity guarantee | Same installer's uninstall routine; no OS-level tracking |

## Notes

- A given version of an identity (sparse) package **cannot be re-registered** while that exact version is already registered on the system — the existing registration must be removed first, then the new version registered.
- Per-machine (provisioned) sparse packages must be **deprovisioned** (`Remove-AppxProvisionedPackage` / `DeprovisionPackageForAllUsersAsync`) *and* removed (`Remove-AppxPackage` / `RemovePackageAsync` with `RemovalOptions.RemoveForAllUsers`) — deprovisioning alone does not remove an already-registered package for existing users.
- `PackageManager.RemovePackageAsync` also removes dependency packages for the user if no other installed package still depends on them.
- MSIX's atomic install/uninstall and clean-rollback guarantees do not extend to sparse/external-location packages' external content — only the identity package registration itself is atomic; the app's own binaries are managed by its own installer.
- Migrating from a legacy (MSI/EXE/ClickOnce) installer to MSIX changes install/update/uninstall to the MSIX model; because storage locations and package identity differ between MSIX and MSI/EXE installs, an explicit settings/data migration step (e.g. import on first run) is typically needed.

## Related

- [PackageManager Class](./package-manager.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
- [Package Identity Overview](./package-identity-overview.md)
