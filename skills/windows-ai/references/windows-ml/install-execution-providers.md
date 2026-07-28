# Install Windows ML execution providers

How to download, install, and track readiness of Windows ML execution providers (EPs) on a user's device via the `ExecutionProviderCatalog` APIs, before registering them with ONNX Runtime.

## Signature / Usage

```csharp
// Install all compatible EPs in one call
var catalog = ExecutionProviderCatalog.GetDefault();
await catalog.EnsureAndRegisterCertifiedAsync();

// Or: find and install a specific EP
ExecutionProvider[] providers = catalog.FindAllProviders();
var provider = providers.First(p => p.Name == "QNNExecutionProvider");
var result = await provider.EnsureReadyAsync();
bool installed = result.Status == ExecutionProviderReadyResultState.Success;
```

```csharp
// Track download progress
var operation = provider.EnsureReadyAsync();
operation.Progress = (asyncInfo, progressInfo) =>
{
    double normalizedProgress = progressInfo / 100.0; // 0-1 range
};
var result = await operation;
```

## Options / Props

| API | Description |
|------|-------------|
| `EnsureAndRegisterCertifiedAsync()` | Downloads/installs all EPs compatible with the device, then registers them all in one call (C#/C++ only; not usable from Python) |
| `FindAllProviders()` | Enumerates all EPs (including not-installed) with a `ReadyState` and `Name` |
| `EnsureReadyAsync()` (on `ExecutionProvider`) | Downloads/installs a specific `NotPresent` EP and adds it to the app's runtime dependency graph; supports a `Progress` callback (0–100) |
| `ExecutionProviderReadyResult.Status` | `Success`, `Failure` (check `ExtendedError` HRESULT and `DiagnosticText`), or `InProgress` |

C API equivalents (`WinMLEpCatalog.h`): `WinMLEpCatalogCreate`, `WinMLEpCatalogEnumProviders`, `WinMLEpCatalogFindProvider`, `WinMLEpEnsureReady`, `WinMLEpGetLibraryPath`, paired with ONNX Runtime's `RegisterExecutionProviderLibrary`.

## Notes

- For offline, restricted-network, managed, or strict version-pinning environments, use [Bring your own execution providers](./bring-your-own-eps.md) instead of the catalog download path.
- Once installed, an EP must still be registered with ONNX Runtime — see [Register execution providers](./register-execution-providers.md).
- Python must not call `EnsureAndRegisterCertifiedAsync()`; instead call `find_all_providers()` then `ensure_ready_async()` per provider and register with `ort.register_execution_provider_library()`.

## Related

- [ExecutionProviderCatalog](./execution-provider-catalog.md)
- [Register execution providers](./register-execution-providers.md)
- [Supported execution providers](./supported-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
