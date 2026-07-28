# ExecutionProviderCatalog

Provides methods to discover, acquire, and register AI execution providers (EPs) for use with the ONNX Runtime. `ExecutionProviderCatalog` handles package management and hardware selection, and is the entry point for accessing hardware-optimized ML acceleration through the Windows ML runtime.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.MachineLearning;

// Get the default catalog
var catalog = ExecutionProviderCatalog.GetDefault();

// Ensure execution providers compatible with the device are present (downloads if necessary)
// and register all present execution providers with ONNX Runtime, in one call
await catalog.EnsureAndRegisterCertifiedAsync();

// Use ONNX Runtime directly for inference (Microsoft.ML.OnnxRuntime namespace)
```

```cppwinrt
winrt::Microsoft::Windows::AI::MachineLearning::ExecutionProviderCatalog catalog =
    winrt::Microsoft::Windows::AI::MachineLearning::ExecutionProviderCatalog::GetDefault();
catalog.EnsureAndRegisterCertifiedAsync().get();
```

```python
import winui3.microsoft.windows.ai.machinelearning as winml

catalog = winml.ExecutionProviderCatalog.get_default()
# DO NOT call winml's register methods in Python — they don't register to the ORT python env.
providers = catalog.find_all_providers()
for provider in providers:
    provider.ensure_ready_async().get()
    ort.register_execution_provider_library(provider.name, provider.library_path)
```

## Options / Props

| Member | Description |
|------|-------------|
| `GetDefault()` | Retrieves the default `ExecutionProviderCatalog` instance providing access to all execution providers on the system |
| `FindAllProviders()` | Retrieves a collection of all execution providers (`ExecutionProvider[]`) compatible with the current hardware, including not-yet-installed EPs |
| `EnsureAndRegisterCertifiedAsync()` | Downloads/installs all compatible EPs and registers them all with ONNX Runtime in a single call. Not supported by the C API or recommended for Python's ORT env |
| `RegisterCertifiedAsync()` | Registers all EPs already present on the machine, without downloading — avoids the potentially long download times of `EnsureAndRegisterCertifiedAsync()` |

`ExecutionProvider.ReadyState` values:

| ReadyState | Definition | Next step |
|------|-------------|------|
| `NotPresent` | EP not installed on the device | Call `EnsureReadyAsync()` to download and install |
| `NotReady` | EP installed but not added to the app's runtime dependency graph | Call `EnsureReadyAsync()` |
| `Ready` | EP installed and added to the app's dependency graph | Call `TryRegister()` to register with ONNX Runtime |

## Notes

- Namespace: `Microsoft.Windows.AI.MachineLearning` (WinRT, Windows App SDK). C API equivalents are declared in `WinMLEpCatalog.h` (`WinMLEpCatalogCreate`, `WinMLEpCatalogFindProvider`, `WinMLEpCatalogEnumProviders`, `WinMLEpEnsureReady`).
- Python must not call `EnsureAndRegisterCertifiedAsync()` / `RegisterCertifiedAsync()` — Python and native ORT environments are separate; register EPs individually via `ort.register_execution_provider_library()`.
- On first run, `EnsureAndRegisterCertifiedAsync()` can take multiple seconds to minutes depending on network speed and EPs to download.

## Related

- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Select execution providers (device policy)](./select-execution-providers.md)
