# Deprecation Policy

## Signature / Usage

```python
# soft-deprecated (as of DSL 4.2.1) -> use these replacements instead
cute.arch.setmaxregister_increase  # replaces cute.arch.warpgroup_reg_alloc
cute.arch.setmaxregister_decrease  # replaces cute.arch.warpgroup_reg_dealloc

cutlass.AddressSpace   # replaces cute.AddressSpace for new code
```

## Options / Props

| Step | Description |
| --- | --- |
| 1. Soft deprecation | Feature gets `@deprecated` decorator or `DeprecationWarning` with a documented alternative; continues to work |
| 2. Removal | Removed in the next minor release if no valid use case surfaces |

| Currently soft-deprecated (DSL 4.2.1) | Replacement |
| --- | --- |
| `cute.arch.warpgroup_reg_alloc` / `warpgroup_reg_dealloc` | `cute.arch.setmaxregister_increase` / `setmaxregister_decrease` |
| `alignment` arg of `CooperativeGroup` constructor | None — unused parameter, no replacement |
| `cute.AddressSpace` | `cutlass.AddressSpace` (lowercase members `gmem`/`smem`/`rmem`/`tmem`/`dsmem` unchanged) |

## Notes

- No features are currently listed as fully removed; deprecations are announced both on this page and via in-code warnings.

## Related

- [DSL Introduction](./dsl-introduction.md)
