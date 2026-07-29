# API: Kernel Discovery

## Signature / Usage

```python
operators = ops.get_operators(
    args=args,               # RuntimeArguments (optional)
    metadata_filter=None,    # callable(OperatorMetadata) -> bool (optional)
    target_sm="100a",        # str or TargetSm instance (optional)
    providers=None,          # restrict to specific Providers (optional)
)

target = ops.TargetSm.ensure("100a")
target.is_portable_to(other_target)
```

## Options / Props

| Function / Class | Description |
| --- | --- |
| `get_operators(args=None, metadata_filter=None, target_sm=None, providers=None)` | Primary entry point; returns matching `Operator` list from the registered kernel manifest |
| `Manifest.get_operators()` | Filters the manifest's operators by filter criteria and compute capability |
| `Manifest.add_operators()` | Adds operators to the manifest |
| `Manifest.filter_operators()` | Filters previously added operators |
| `Manifest.operators` (property) | Accesses operators added to the manifest |
| `TargetSm.ensure()` | Coerces a string to a `TargetSm` instance |
| `TargetSm.get_supported_targets()` | Returns supported targets for a given design/operands |
| `TargetSm.is_portable_to()` | Checks portability across architectures |
| `TargetSm.supports_operators_from()` | Validates operator compatibility |
| `TargetSm.major` / `.minor` | SM version components |
| `ArchPortability.Portable` | Compatible with future architectures |
| `ArchPortability.FamilyPortable` | Compatible within the same architecture family (Blackwell+) |
| `ArchPortability.ArchConditional` | Architecture-specific only (Hopper+) |

## Related

- [API: Operator](./api-operator.md)
- [API: Metadata](./api-metadata.md)
- [Tutorial 002: Bring Your Own Kernel](./tutorial-002-bring-your-own-kernel.md)
