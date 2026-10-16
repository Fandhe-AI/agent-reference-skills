# Differential (Delta) Package Updates

MSIX/AppX package updates only download the blocks of files that actually changed rather than the whole package, using per-file block hashes recorded at package-creation time. This differential-update machinery works between any two versions of a package (source version must be lower than the target version) and requires no extra developer action beyond normal packaging.

## Signature / Usage

```xml
<!-- AppxBlockMap.xml — per-file, per-64KB-block SHA2-256 hashes -->
<blockmap hashmethod="http://www.w3.org/2001/04/xmlenc#sha256"
          xmlns="http://schemas.microsoft.com/appx/2010/blockmap">
  <file lfhsize="66" size="101188" name="asset1.jpg">
    <block hash="2bidNE0JyaO+FjaTpRe0g8HzUCblUf/cfBcTXiZR74c="/>
    <block hash="+jeFwKrGk5gw9wSICWsWRtEQXwcLC7af4EWS7DgrAkY="/>
  </file>
</blockmap>
```

## Options / Props

| Constraint | Rule |
|------------|------|
| Package family | Update package must share the same package family name (package name + publisher) as the installed package |
| Version | New package version must be higher than the installed one by default; `ForceUpdateFromAnyVersion` (PowerShell `Add-AppxPackage`, `PackageManager` API, EnterpriseModernAppManagement CSP, or the App Installer file) allows a lower-version package to be installed instead |
| Architecture | Update package may use a different architecture than the installed one, as long as the new architecture is supported on the target OS |
| Bundle direction | An update can go from a single MSIX package to an `.msixbundle`, but not from a bundle back to a single package |

Behavior when the package is in use, for `Add-AppxPackage` installs and updates:

| Parameter | Description |
|-----------|-------------|
| `-DeferRegistrationWhenPackagesAreInUse` | If the package is in use, defers registration until it is no longer in use; Windows completes the registration later |
| `-ForceApplicationShutdown` | If the package is in use, forcibly shuts down the processes associated with the package so registration can continue |
| `-ForceTargetApplicationShutdown` | If the target package is in use, forcibly shuts down the processes associated with the target package so registration can continue |

```powershell
Add-AppxPackage -Path .\updated-app.msix -DeferRegistrationWhenPackagesAreInUse
```

## Notes

- A deployment can fail, request application shutdown, or defer registration until the package is no longer in use. MSIX does not modify a package while a process is using it; an update, repair, removal, or reinstall that hits this fails with `ERROR_PACKAGES_IN_USE` (`0x80073D02`). Preferred fix: ask the user to close the app cleanly and check for background processes, services, or out-of-process components of the package.
- `Windows.Management.Deployment` equivalents: `AddPackageOptions.ForceTargetAppShutdown` (for `-ForceTargetApplicationShutdown`) and `AddPackageOptions.DeferRegistrationWhenPackagesAreInUse`. Forced shutdown can terminate the app and lose unsaved work; avoid it where that matters.
- On Windows 11, version 24H2 and later, a package can declare the `uap17:UpdateWhileInUse` manifest element with value `defer`; this package-level setting takes precedence over force-shutdown options.
- Windows App SDK apps can call `PackageDeploymentManager.IsPackageRegistrationPending` to detect a previously deferred registration for the current user (`IsPackageRegistrationPendingForUser` for another user, as an administrator).
- Removal normally requests application shutdown; to defer it, call `PackageManager.RemovePackageAsync` with `RemovalOptions.DeferRemovalWhenPackagesAreInUse`.
- `AppxBlockMap.xml` stores a two-dimensional file list: file-level metadata (name, size) plus a SHA2-256 hash per 64 KB block; during an update Windows diffs old vs. new block hashes and downloads only changed blocks, reusing unchanged blocks (or whole unchanged files) from the existing install.
- To get the most benefit from differential updates: keep individual files small, prefer additive changes over in-place edits, and try to keep changed bytes aligned to 64 KB block boundaries.
- `ForceUpdateFromAnyVersion` on a Microsoft Store app is also honored automatically by Windows Update, which will update to the latest applicable version regardless.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Package Uninstall / Update Behavior](../package-identity/package-uninstall-update.md)
