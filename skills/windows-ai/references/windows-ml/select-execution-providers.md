# Select execution providers

Two ways to configure which execution provider (EP) and device ONNX Runtime uses for a session: explicit selection, or outcome-oriented device policies.

## Signature / Usage

```csharp
// Explicit selection
var epDevices = ortEnv.GetEpDevices();
var selected = epDevices.Where(d => d.EpName == "QNNExecutionProvider"
    && d.HardwareDevice.Type == OrtHardwareDeviceType.NPU).ToList();

var sessionOptions = new SessionOptions();
var epOptions = new Dictionary<string,string> { ["provider_specific_option"] = "4" };
sessionOptions.AppendExecutionProvider(ortEnv, new[] { selected.First() }, epOptions);
```

```csharp
// Device policy — outcome-oriented (e.g. NPU with CPU fallback for max efficiency)
var sessionOptions = new SessionOptions();
sessionOptions.SetEpSelectionPolicy(ExecutionProviderDevicePolicy.MAX_EFFICIENCY);
```

```python
options = ort.SessionOptions()
options.set_provider_selection_policy(ort.OrtExecutionProviderDevicePolicy.MAX_EFFICIENCY)
```

## Options / Props

| Approach | API | Description |
|------|-------------|------|
| Explicit | `GetEpDevices()` | Enumerate all available `OrtEpDevice`s |
| Explicit | `SessionOptions.AppendExecutionProvider()` (C#) / `AppendExecutionProvider_V2()` (C++) / `add_provider_for_devices()` (Python) | Append specific EP devices with provider-specific options |
| Policy | `SessionOptions.SetEpSelectionPolicy(ExecutionProviderDevicePolicy)` | Outcome-oriented automatic selection; values include `MAX_PERFORMANCE`, `MAX_EFFICIENCY`, `MIN_OVERALL_POWER`, `PREFER_NPU`, and more (full list in the ONNX Runtime `OrtExecutionProviderDevicePolicy` docs) |

## Notes

- Microsoft recommends starting with **explicit selection** for predictable results, then experimenting with device policies once that path works.
- **List of devices can dynamically change**: code using `GetEpDevices()` must handle new/removed EP devices appearing at runtime due to auto-updates or driver changes.
- `ExecutionProviderDevicePolicy` values are defined by ONNX Runtime, not Windows ML — Windows ML's `SessionOptions` type simply exposes the same policy enum.

## Related

- [Register execution providers](./register-execution-providers.md)
- [ONNX Runtime inference APIs](./onnx-runtime-inference.md)
- [Supported execution providers](./supported-execution-providers.md)
