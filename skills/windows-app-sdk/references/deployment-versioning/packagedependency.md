# PackageDependency (Dynamic Dependency API)

Sealed class representing a framework package on which the current app has a dependency, used to let unpackaged (or packaged-with-external-location) apps reference framework packages — such as the Windows App SDK or other MSIX framework packages — at run time, beyond what the app's own package graph provides.

## Signature / Usage

```csharp
using Microsoft.Windows.ApplicationModel.DynamicDependency;
using Windows.ApplicationModel;

public sealed class PackageDependency
{
    public string Id { get; }
    public uint GenerationId { get; }
    public uint PackageGraphRevisionId { get; }

    public static PackageDependency Create(string packageFamilyName, PackageVersion minVersion);
    public static PackageDependency Create(string packageFamilyName, PackageVersion minVersion, CreatePackageDependencyOptions options);
    public static PackageDependency CreateForSystem(string packageFamilyName, PackageVersion minVersion, CreatePackageDependencyOptions options);

    public static PackageDependency GetFromId(string packageDependencyId);
    public static PackageDependency GetFromIdForSystem(string packageDependencyId);

    public PackageDependencyContext Add();
    public PackageDependencyContext Add(AddPackageDependencyOptions options);
    public void Delete();
}
```

## Options / Props

| Member | Description |
|---|---|
| `Create(packageFamilyName, minVersion[, CreatePackageDependencyOptions])` | Creates an install-time reference to a framework package for the current app, for the current user only. Returns the `PackageDependency` instance; its `Id` property holds the newly-created dependency ID. |
| `CreateForSystem(...)` | Same as `Create`, but the dependency is accessible to all users; requires administrative privileges. Also returns a `PackageDependency`. |
| `Add()` / `Add(AddPackageDependencyOptions)` | Adds a run-time reference for a dependency created earlier via `Create`/`CreateForSystem`; after this succeeds, the app may activate types and use content from the framework package. Returns a `PackageDependencyContext` — an object providing context info about the dependency and used to later remove the run-time reference via `PackageDependencyContext.Remove`. |
| `PackageDependencyContext.Remove()` | Removes the run-time reference added by `Add`/`Add(options)`, once the app no longer needs the framework package (mirror of `Delete()` for the install-time reference). |
| `Delete()` | Deletes the install-time reference created via `Create`, telling the OS it's safe to remove the framework package once no other app depends on it. |
| `GetFromId(id)` / `GetFromIdForSystem(id)` | Recreates a `PackageDependency` instance from a previously-created dependency's ID. |
| `Id` | The package dependency's ID, read from the `PackageDependency` returned by a successful `Create`/`CreateForSystem` call. |
| `GenerationId` / `PackageGraphRevisionId` | The caller's package graph's current generation ID (both properties report the same value). |
| `CreatePackageDependencyOptions.Architectures` | Processor architectures the dependency's framework package must match. |
| `CreatePackageDependencyOptions.LifetimeArtifactKind` / `LifetimeArtifact` | The kind of artifact (e.g. file path, registry key) and its name, used to scope the dependency's lifetime. |
| `CreatePackageDependencyOptions.VerifyDependencyResolution` | Whether to disable dependency resolution when pinning — useful for installers running as a different user context (e.g. LocalSystem). |
| `AddPackageDependencyOptions.Rank` | The rank at which the resolved package is added into the caller's package graph. |
| `AddPackageDependencyOptions.PrependIfRankCollision` | Whether the resolved package is added before others of the same `Rank` when multiple packages in the graph share that rank. |

## Notes

- Namespace: `Microsoft.Windows.ApplicationModel.DynamicDependency`. Available starting Windows App SDK 1.0 through 2.0 (moniker range `windows-app-sdk-1.0` .. `windows-app-sdk-2.0`).
- This is the API behind the "Dynamic Dependencies" bullet in the Deployment Guide for Unpackaged Apps: unpackaged (or packaged-with-external-location) apps use it to reference framework packages — the Windows App SDK's own Framework package, or other MSIX framework packages such as DirectX — that aren't already part of the app's package graph.
- Typical flow: call `Create` (once, e.g. at install time) to register the dependency and obtain a `PackageDependency` (whose `Id` is persisted, e.g. to reconstruct it later via `GetFromId`); call `Add` at each process start to bring the framework package into the running process's package graph, keeping the returned `PackageDependencyContext` for the process's lifetime; call `PackageDependencyContext.Remove` when the process no longer needs the framework package, and `Delete` at uninstall time to remove the install-time reference.

## Related

- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
- [Use the Windows App SDK Runtime (Bootstrapper API)](./use-windows-app-sdk-run-time.md)
