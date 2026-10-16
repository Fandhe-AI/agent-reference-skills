# MSIX Package Types (Main / Framework / Resource / Optional / Bundle)

MSIX supports four package types (Main, Framework, Resource, Optional) plus Bundle packages, which are distribution containers rather than a fifth deployable type. A type defines deployment, dependency, execution, and servicing behavior.

## Signature / Usage

```csharp
static string GetPackageType(Windows.ApplicationModel.Package package)
{
    if (package.IsBundle) return "Bundle";
    if (package.IsFramework) return "Framework";
    if (package.IsResourcePackage) return "Resource";
    if (package.IsOptional) return "Optional";
    return "Main";
}
```

```powershell
Get-AppxPackage -PackageTypeFilter Main,Framework,Resource,Optional,Bundle |
    Select-Object Name, PackageFullName, IsFramework, IsResourcePackage, IsBundle
```

## Options / Props

| Type | Primary purpose | Manifest or identity indicator |
|------|-----------------|--------------------------------|
| Main | Primary package for an application | No declaration for another package type |
| Framework | Shared libraries, components, or runtime content | `<Framework>true</Framework>` |
| Resource | Language-, scale-, or qualifier-specific resources | `<ResourcePackage>true</ResourcePackage>` |
| Optional | Additional content associated with one Main package | `<uap3:MainPackageDependency>` |
| Bundle | Distribution container for multiple MSIX packages | Bundle manifest and a `ResourceId` value of `~` |

## Notes

- Main: can declare applications, capabilities, dependencies, extensions, and out-of-process servers; there is no explicit Main marker.
- Framework: supports side-by-side versions; other packages or processes add it to their package graph before loading its content.
- Resource: installs only the resource packages applicable to the device or user; does not permit execution by default (override with `uap6:AllowExecution`).
- Optional: associated with one Main package family via `uap3:MainPackageDependency`, unlike a Framework package.
- Bundle (`.msixbundle`): all packages belong to the same package family; Windows installs only the applicable architecture and resource packages.
- `Get-AppxPackage` returns only Main and Framework by default; use `-PackageTypeFilter`. The output has no `IsOptional` property, so inspect the manifest or package relationship to identify Optional packages.
- Source page last updated 09/30/2026 (ms.date).

## Related

- [Framework Packages](./framework-packages.md)
- [Resource Packages](./resource-packages.md)
- [Optional Packages](./optional-packages.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
