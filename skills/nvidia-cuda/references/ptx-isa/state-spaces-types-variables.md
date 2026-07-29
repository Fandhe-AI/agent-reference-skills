# State Spaces, Types, and Variables

PTX defines named state spaces for organizing memory and register access, and a set of fundamental data types used to declare registers and variables within those state spaces.

## Signature / Usage

```ptx
.global .align 128 .b8 gbl[128];
.reg .u32 %r0;
.shared .align 128 .b8 sMem[128];
```

## Options / Props

| State space | Description |
| --- | --- |
| `.reg` | Register — private per-thread fast storage |
| `.sreg` | Special register — read-only, thread/block/grid identity (see special-registers) |
| `.const` | Read-only memory optimized for uniform access across threads |
| `.global` | Memory accessible by all threads, persists across kernel launches |
| `.local` | Thread-private memory, typically used for stack-like allocation |
| `.param` | Kernel/function parameters |
| `.shared` | Visible to all threads of the CTA, and to all active CTAs in the cluster |
| `.tex` | Deprecated legacy read-only cached texture memory |

| Type suffix | Category |
| --- | --- |
| `.b8` / `.b16` / `.b32` / `.b64` | Untyped bits |
| `.u8`…`.u64` | Unsigned integer |
| `.s8`…`.s64` | Signed integer |
| `.f16` / `.f16x2` / `.f32` / `.f64` | Floating-point |
| `.bf16` | bfloat16 |
| `.e4m3` / `.e5m2` | 8-bit floating-point formats |
| `.pred` | Predicate (boolean) |

## Notes

- PTX ISA 9.3 — Chapter 5
- Variable declarations combine a state space, a type, a name, and an optional array size: `.[state-space] .[type] name[size];`.

## Related

- [instruction-operands](./instruction-operands.md)
- [machine-model](./machine-model.md)
