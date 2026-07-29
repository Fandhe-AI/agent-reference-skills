# Release Notes

PTX ISA is versioned independently from — but shipped alongside — each CUDA Toolkit release. Each new PTX ISA version adds instructions, directives, and qualifiers, generally introduced together with a new `sm_xx` target architecture.

## Signature / Usage

```ptx
.version  major.minor    // major, minor are integers; current doc title reports 9.3
```

## Options / Props

| PTX ISA version | Notable additions (as of this distillation) |
| --- | --- |
| 9.3 (this reference) | `clmad` instruction; `mma_throughput` pragma; `.phase_type::*` qualifier and `reportPredicate`/`reportValue` operands for `mbarrier` wait instructions; `.layout` qualifier and `mbarrier.check_layout`; `multimem.st.async` / `multimem.red.async`; `.sem`/`.scope` qualifiers for async bulk-copy instructions; fabric instructions (`fabric.try_get`, `fabric.try_put`, `fabric.try_red`, `fabric.try_pullred`, `fabric.wait`, `fabric.submit`); `.language` directive |
| 9.2 / 9.1 / 9.0 / 8.x | Prior releases; see the official Release Notes chapter for the full per-version changelog |

## Notes

- PTX ISA 9.3 — Chapter 13
- The version-to-CUDA-Toolkit / `sm_xx` architecture correspondence is documented in full in the official Release Notes chapter; this page distills only the most recent (9.3) entry confirmed at the time of writing, since the base URL always serves the latest version and older entries were not re-verified here.
- When updating this skill, re-check the `.version` string printed at the top of the official page and refresh this table before trusting version-specific instruction availability.

## Related

- [pragma-strings](./pragma-strings.md)
- [directives](./directives.md)
