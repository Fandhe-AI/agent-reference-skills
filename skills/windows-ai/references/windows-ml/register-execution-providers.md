# Register Windows ML execution providers

After a Windows ML execution provider (EP) is installed on the device, it must be registered with ONNX Runtime before it can be used to create inference sessions.

## Signature / Usage

```csharp
// Check registered EP devices
IReadOnlyList<OrtEpDevice> ortEpDevices = OrtEnv.Instance().GetEpDevices();
foreach (var d in ortEpDevices)
    Console.WriteLine($"{d.EpName} (DeviceType: {d.HardwareDevice.Type})");

// Register all installed EPs
var catalog = ExecutionProviderCatalog.GetDefault();
await catalog.RegisterCertifiedAsync();

// Register a single already-installed provider
var result = await installedProvider.EnsureReadyAsync();
if (result.Status == ExecutionProviderReadyResultState.Success)
{
    bool registered = installedProvider.TryRegister();
}
```

## Options / Props

| API | Description |
|------|-------------|
| `OrtEnv.Instance().GetEpDevices()` / `Ort::Env::GetEpDevices()` / `ort.get_ep_devices()` | Lists currently registered ONNX Runtime EP devices (before any Windows ML EP is registered, only `CPUExecutionProvider` and `DmlExecutionProvider` appear) |
| `ExecutionProviderCatalog.RegisterCertifiedAsync()` | Registers all EPs already present on the device (no download) |
| `ExecutionProvider.TryRegister()` | Registers a single EP (must call `EnsureReadyAsync()` first) with ONNX Runtime |
| `RegisterExecutionProviderLibrary(name, path)` | Low-level ONNX Runtime API used by the C API path and by "bring your own EP" registration |

## Notes

- **List of devices can dynamically change**: EP devices can appear or disappear at runtime as Windows ML EPs auto-update or drivers update. Code enumerating `GetEpDevices()` must be resilient to this.
- The C API has no single `RegisterCertifiedAsync()` call; enumerate providers via `WinMLEpCatalogEnumProviders` and register each with `Ort::Env::RegisterExecutionProviderLibrary()`.
- Python must not call `RegisterCertifiedAsync()`; register EPs individually with `ort.register_execution_provider_library()`.

## Related

- [Install execution providers](./install-execution-providers.md)
- [Select execution providers (device policy)](./select-execution-providers.md)
- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
