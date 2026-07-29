# Descriptions of .pragma Strings

The `.pragma` directive attaches a string-literal hint to a scope (module, kernel, or basic block) that guides the compiler/JIT without changing program semantics.

## Signature / Usage

```ptx
.pragma "nounroll";
```

## Options / Props

| Pragma string | Purpose |
| --- | --- |
| `"nounroll"` | Prevents loop-unrolling optimization on the annotated loop |
| `"used_bytes_mask"` | Specifies which bytes of a value are actively used |
| `"enable_smem_spilling"` | Allows the compiler to use shared memory for register spilling |
| `"frequency"` | Controls instruction frequency/pipelining hints |
| `"mma_throughput"` | Adjusts matrix-multiply-accumulate throughput hints (introduced in PTX ISA 9.3) |

## Notes

- PTX ISA 9.3 — Chapter 12
- Pragma strings are specified as string literals passed to the `.pragma` directive and are architecture/compiler-version specific; unrecognized strings are ignored rather than causing an error.

## Related

- [directives](./directives.md)
- [release-notes](./release-notes.md)
