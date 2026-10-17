# Framework Packages

A framework package is an MSIX package that other packages declare as a dependency to share common binaries/resources at runtime instead of duplicating them in every app package — the mechanism the Windows App SDK's own runtime package uses, but usable by any publisher for any shared package (for example WinUI 2 or a DirectX runtime). Dependent packages can reference a framework package either statically (declared in their manifest at package-creation time) or dynamically at run time via the *dynamic dependencies* API, which is the model primarily used by unpackaged desktop apps.

## Signature / Usage

```xml
<!-- In a dependent package's manifest -->
<Dependencies>
  <PackageDependency Name="Contoso.SharedFramework"
                      MinVersion="1.0.0.0"
                      Publisher="CN=Contoso" />
</Dependencies>
```

```cpp
// Dynamic dependency API — take a runtime dependency on a framework package
// already resolved via MddTryCreatePackageDependency, from an unpackaged
// (or externally-located) desktop app
HRESULT MddAddPackageDependency(
  PCWSTR                         packageDependencyId,
  INT32                          rank,
  MddAddPackageDependencyOptions options,
  MDD_PACKAGEDEPENDENCY_CONTEXT  *packageDependencyContext,
  PWSTR                          *packageFullName
) noexcept;
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Framework package | An MSIX package built to be depended on by other packages rather than run standalone; declares itself via the `<Framework>` element (under `<Properties>`) in its own manifest, defaulting to `false` |
| `PackageDependency` | Manifest element a dependent package uses to statically reference a framework package by `Name`/`Publisher`/`MinVersion` (the resolved package's version must be >= `MinVersion`) |
| Dynamic dependencies | Run-time API (`MddTryCreatePackageDependency`/`MddAddPackageDependency` family) that lets an unpackaged or externally-located app pull in a framework package (most commonly the Windows App SDK's own) without a manifest-level dependency |

Dynamic dependency API: two implementations. The Windows App SDK provides C/C++ functions (`msixdynamicdependency.h`, `Mdd` prefix) and WinRT types (`Microsoft.Windows.ApplicationModel.DynamicDependency`), usable on any Windows version the Windows App SDK supports. Windows 11, version 22H2 (build 22621) and later provide C/C++ functions in `appmodel.h`.

| Step | Windows 11 (C/C++, `appmodel.h`) | Windows App SDK (C/C++) | Windows App SDK (WinRT) |
|------|------|------|------|
| 1. Create install-time reference (app installer or first run; criteria: package family name, minimum version, architectures, plus a lifetime artifact: process, file, or registry key) | `TryCreatePackageDependency` | `MddTryCreatePackageDependency` | `PackageDependency.Create` |
| 2. Add run-time reference (returns the package full name and a handle; highest version satisfying the criteria is chosen) | `AddPackageDependency` | `MddAddPackageDependency` | `PackageDependency.Add` |
| 3. Remove run-time reference (typically at shutdown; pass the handle) | `RemovePackageDependency` | `MddRemovePackageDependency` | `PackageDependencyContext.Remove` |
| 4. Delete install-time reference (on app uninstall; pass the dependency ID) | `DeletePackageDependency` | `MddDeletePackageDependency` | `PackageDependency.Delete` |

## Notes

- Differences between the two implementations: the Windows App SDK implementation needs a lifetime manager (for its own framework package, the Dynamic Dependency Lifetime Manager, DDLM; no other framework packages currently provide one), cannot reference a main package, and cannot reference the Windows App SDK framework package from an unpackaged app (use the bootstrapper API instead). The Windows 11 implementation has none of these limitations.
- To let a dynamic dependency target a main package (Windows 11 API only), the target main package must opt in with `<uap15:DependencyTarget>true</uap15:DependencyTarget>` in its manifest; framework packages always implicitly allow it.
- The Windows App SDK deployment architecture (see windows-app-sdk-deployment-architecture.md in this skill) documents the Windows App SDK's own framework package specifically; this page covers the generic MSIX mechanism that any package can use to be, or depend on, a framework package.
- A framework package cannot declare dependencies on other packages, and cannot define `Applications` or `Capabilities` in its manifest.
- Windows services framework packages side-by-side, independent of the apps that depend on them: install-time references (from `PackageDependency`) keep a version installed while any app depends on it, and run-time references (from `MddAddPackageDependency`) keep a version resolved while an app is actively using it, so a shared bug fix can update all dependents without breaking one still running the old version.
- Common use of dynamic dependencies: an unpackaged desktop app referencing the Windows App SDK runtime, or referencing WinUI 2 / the DirectX Runtime as a framework package from an unpackaged app.

## Related

- [Windows App SDK Deployment Architecture](../deployment/windows-app-sdk-deployment-architecture.md)
- [Windows App SDK Bootstrapper API](../deployment/windows-app-sdk-bootstrapper-api.md)
- [Package Class](../package-identity/package-class.md)
