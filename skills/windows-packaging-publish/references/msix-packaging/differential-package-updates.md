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

## Notes

- `AppxBlockMap.xml` stores a two-dimensional file list: file-level metadata (name, size) plus a SHA2-256 hash per 64 KB block; during an update Windows diffs old vs. new block hashes and downloads only changed blocks, reusing unchanged blocks (or whole unchanged files) from the existing install.
- To get the most benefit from differential updates: keep individual files small, prefer additive changes over in-place edits, and try to keep changed bytes aligned to 64 KB block boundaries.
- `ForceUpdateFromAnyVersion` on a Microsoft Store app is also honored automatically by Windows Update, which will update to the latest applicable version regardless.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Package Uninstall / Update Behavior](../package-identity/package-uninstall-update.md)
