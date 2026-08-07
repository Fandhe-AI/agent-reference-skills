# DirectML interfaces

Index of all interfaces declared in `DirectML.h`. Individual interface pages live under `/windows/win32/api/directml/nn-directml-*`; this skill covers the most commonly used ones as dedicated pages (linked below).

## Options / Props

| Interface | Description |
|-----------|-------------|
| `IDMLObject` | Base interface from which `IDMLDevice` and `IDMLDeviceChild` inherit (and, indirectly, all other DirectML interfaces); provides private-data association and object-name annotation. |
| `IDMLDeviceChild` | Implemented by all objects created from the DirectML device. |
| `IDMLPageable` | Implemented by objects that can be evicted from GPU memory, supplied to `IDMLDevice::Evict` / `IDMLDevice::MakeResident`. |
| `IDMLDevice` | Root device object; used to create operators, binding tables, command recorders, and other DirectML objects. |
| `IDMLDevice1` | Inherits from `IDMLDevice`; adds `CompileGraph`. |
| `IDMLDebugDevice` | Controls the DirectML debug layer. |
| `IDMLOperator` | Represents an uncompiled DirectML operator. |
| `IDMLDispatchable` | Implemented by objects that can be recorded into a command list for GPU dispatch via `IDMLCommandRecorder::RecordDispatch`. |
| `IDMLCompiledOperator` | Compiled, GPU-dispatchable form of an operator or graph. |
| `IDMLOperatorInitializer` | Specialized object that initializes one or more compiled operators. |
| `IDMLBindingTable` | Resource binding table for a dispatchable object. |
| `IDMLCommandRecorder` | Records DirectML dispatches into a Direct3D 12 command list. |

## Notes

- All interfaces are declared in `DirectML.h`.
- This page is the official API index; see the per-page references in this skill (`dmlcreatedevice.md`, `idmloperator.md`, `idmlcompiledoperator.md`, `idmloperatorinitializer.md`, `idmlbindingtable.md`, `idmlcommandrecorder.md`) for detailed signatures and usage of the most commonly used interfaces.

## Related

- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [IDMLOperatorInitializer](./idmloperatorinitializer.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [DirectML functions](./api-reference-functions.md)
- [DirectML structures](./api-reference-structures.md)
