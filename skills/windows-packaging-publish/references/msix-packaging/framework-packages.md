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

## Notes

- The Windows App SDK deployment architecture (see windows-app-sdk-deployment-architecture.md in this skill) documents the Windows App SDK's own framework package specifically; this page covers the generic MSIX mechanism that any package can use to be, or depend on, a framework package.
- A framework package cannot declare dependencies on other packages, and cannot define `Applications` or `Capabilities` in its manifest.
- Windows services framework packages side-by-side, independent of the apps that depend on them: install-time references (from `PackageDependency`) keep a version installed while any app depends on it, and run-time references (from `MddAddPackageDependency`) keep a version resolved while an app is actively using it, so a shared bug fix can update all dependents without breaking one still running the old version.
- Common use of dynamic dependencies: an unpackaged desktop app referencing the Windows App SDK runtime, or referencing WinUI 2 / the DirectX Runtime as a framework package from an unpackaged app.

## Related

- [Windows App SDK Deployment Architecture](../deployment/windows-app-sdk-deployment-architecture.md)
- [Windows App SDK Bootstrapper API](../deployment/windows-app-sdk-bootstrapper-api.md)
- [Package Class](../package-identity/package-class.md)
