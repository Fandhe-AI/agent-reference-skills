# Optional Packages and Related Sets

Optional packages contain content that integrates with a main package — useful for downloadable content (DLC), splitting a large app to avoid size limits, or shipping additional content separately. Optional packages and related sets all run inside the main app's MSIX container.

## Signature / Usage

```xml
<!-- In the optional package's manifest -->
<Dependencies>
  <uap3:MainPackageDependency Name="[MainPackageFamilyNamePrefix]"/>
</Dependencies>
```

```csharp
// Removing an optional package at runtime
PackageCatalog catalog = PackageCatalog.OpenForCurrentPackage();
var optionalList = new List<string> { "FabrikamAgeAnalysis_kwpnjs8c36mz0" };
var result = await catalog.RemoveOptionalPackagesAsync(optionalList);
if (result.ExtendedError != null)
{
    throw result.ExtendedError;
}
```

`Bundle.Mapping.txt` for a related set (placed in the main package project):

```
[OptionalProjects]
"..\ActivatableOptionalPackage1\ActivatableOptionalPackage1.vcxproj"
"..\ActivatableOptionalPackage2\ActivatableOptionalPackage2.vcxproj"
```

## Options / Props

| Requirement | Value |
|-------------|-------|
| IDE | Visual Studio 2019, or 2017 15.1+ |
| OS/SDK | Windows 10, version 1703+ and matching SDK |
| Target Platform Min Version | `10.0.15063.0` or higher |
| Store submission | Requires developer support permission for optional packages/related sets; not required for LOB/enterprise, non-Store apps |

| Concept | Description |
|---------|-------------|
| Optional package | Loosely coupled to the main package via `MainPackageDependency`; can have a different publisher if not Store-distributed |
| Related set | Main package + optional package(s) tightly coupled via bundle metadata (`AppxBundleManifest.xml`); versions are synchronized across the set |

## Notes

- Related sets require a `Bundle.Mapping.txt` (`[OptionalProjects]` section with relative `.vcxproj`/project paths) in the main package project; Visual Studio then generates the bundle manifest with the required cross-references.
- Removing an optional package that's part of a related set requires restarting the main app to finalize; content-only optional packages can be marked "not in use" via API to remove without a restart.
- Debugging a related-set optional project in Visual Studio isn't directly supported — deploy/launch (Ctrl+F5) and attach the debugger to the main app process manually.
- Distinguish from modification packages: optional packages add functionality/content owned by the original developer; modification packages are typically authored by IT Pros/third parties to customize an app they don't own.

## Related

- [Modification Packages](./modification-packages.md)
- [Package Manifest Schema](./package-manifest-schema.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
