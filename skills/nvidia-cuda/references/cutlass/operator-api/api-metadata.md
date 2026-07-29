# API: Metadata

## Signature / Usage

```python
class OperatorMetadata:
    operator_name: str
    operator_class: type
    supported_targets: list["TargetSm"]
    operands: "OperandsMetadata"
    design: "DesignMetadata | None"
    epilogue: "EpilogueMetadata | None"

    @property
    def provider(self): ...

    def supports(self, args=None, *, target_sm=None) -> "Status": ...
```

## Options / Props

| Class | Description |
| --- | --- |
| `OperatorMetadata` | Uniform schema exposing operator properties (name, class, supported targets, operand/design/epilogue metadata, provider) without reading source; `supports(args, target_sm=...)` validates fit |
| `OperandsMetadata` (abstract) | Logical operand requirements independent of operation type; `supports(args)` abstract check |
| `GemmOperandsMetadata` | `A`, `B`, `out` (`OperandConstraints`), `accumulator_type`; `supports(other)` |
| `GroupedGemmOperandsMetadata` | Adds `offsets` (`OperandConstraints`) |
| `OperandConstraints` (abstract) | `supports(operand)` abstract validation |
| `DenseTensorConstraints` | `dtype`, `stride` (`None` = arbitrary), `divisibility`, `ptr_alignment_bytes` |
| `ScaledOperandConstraints` | `quantized` / `scale` (`DenseTensorConstraints`), `mode` (`ScaleMode`), `swizzle` (`ScaleSwizzleMode`) |
| `DesignMetadata` (abstract) | Architectural/performance characteristics; `supports(args)` validates `PerformanceControls` |
| `BLASDesignMetadata` | `mma_instruction_type`, `tile_shape`, `cluster_shape`, optional `num_smem_stages` |
| `Sm100DesignMetadata` | `use_2cta_mma`, `use_tma_store`, optional `tile_scheduler`, optional `fallback_cluster_shape`; `use_fallback_cluster()` |
| `TileSchedulerMetadata` (abstract) | `supported_targets(design=None, operands=None)` static method |
| `CLCDynamicPersistentTileSchedulerMetadata` / `StaticPersistentTileSchedulerMetadata` | Concrete tile-scheduler metadata implementations |
| `EpilogueMetadata` | `from_args(args)` classmethod; `parameters`, `parameter_names`; `supports(args)` |
| `MmaInstruction` (abstract) | `supported_targets(design=None, operands=None)`, `shape_k(operands)` static methods |
| `BlackwellTcgen05Mma` / `BlackwellTcgen05MmaSparse` / `HopperWgmma` / `AmpereMma` | Concrete MMA-instruction metadata implementations |

## Related

- [API: Operator](./api-operator.md)
- [API: Arguments](./api-arguments.md)
- [Blackwell SM100 GEMM](../cpp/blackwell-sm100-gemm.md)
