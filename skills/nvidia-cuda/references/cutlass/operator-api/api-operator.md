# API: Operator

## Signature / Usage

```python
class Operator:
    supported_args_type: type   # RuntimeArguments subtype this Operator supports
    designed_for_min_cc: int    # minimum compute capability targeted

    @property
    def metadata(self) -> "OperatorMetadata": ...

    def supports(self, args, target_sm=None) -> "Status": ...
    def compile(self, args, target_sm=None) -> "CompiledArtifact": ...
    def run(self, args, compiled_artifact=None, stream=None,
            workspace=None, assume_supported_args=False): ...
    def get_workspace_size(self, args) -> "AllocationRequirement": ...
    def initialize_workspace(self, args, workspace) -> None: ...

    @classmethod
    def generate_operators(cls, metadata_filter, epilogue_args=None,
                            target_sm=None, args=None) -> list["Operator"]: ...
```

## Options / Props

| Class | Field / Method | Description |
| --- | --- | --- |
| `Operator` | `supported_args_type` | The `RuntimeArguments` subtype this operator supports |
| `Operator` | `designed_for_min_cc` | Minimum compute capability the operator targets |
| `Operator` | `metadata` (property) | Read-only `OperatorMetadata` describing capabilities/features |
| `Operator` | `supports(args, target_sm=None)` | Returns a `Status` indicating compatibility |
| `Operator` | `compile(args, target_sm=None)` | Compiles for the given args/architecture; returns `CompiledArtifact` |
| `Operator` | `run(args, compiled_artifact=None, stream=None, workspace=None, assume_supported_args=False)` | End-to-end execution, with validation and auto-compile if `compiled_artifact` is omitted |
| `Operator` | `get_workspace_size(args)` | Returns `AllocationRequirement` |
| `Operator` | `initialize_workspace(args, workspace)` | Prepares workspace before execution |
| `Operator` | `generate_operators(metadata_filter, ...)` (classmethod) | Lists supported operator configurations filtered by metadata/epilogue/target |
| `CompiledArtifact` | `compiled_obj`, `operator_obj`, `compiled_for` | Compilation result, source `Operator`, target compute capability |
| `Workspace` | `data`, `leading_zero_bytes` | User-allocated scratch buffer (tensor or int address), pre-zeroed byte count |
| `AllocationRequirement` | `size_bytes`, `ptr_alignment`, `empty()` (classmethod) | Minimum size, pointer alignment, zero-requirement factory |

## Related

- [Tutorial 002: Bring Your Own Kernel](./tutorial-002-bring-your-own-kernel.md)
- [API: Arguments](./api-arguments.md)
- [API: Metadata](./api-metadata.md)
- [API: Misc](./api-misc.md)
