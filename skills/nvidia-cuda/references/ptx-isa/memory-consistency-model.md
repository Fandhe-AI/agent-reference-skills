# Memory Consistency Model

PTX defines a memory consistency model based on scoped, "morally strong" operations: atomic and volatile memory operations that establish ordering guarantees across a specified scope, plus explicit fence instructions.

## Signature / Usage

```ptx
ld.acquire [M];
st.release [M];
```

## Options / Props

| Scope | Description |
| --- | --- |
| `.cta` | Cooperative thread array (thread block) scope |
| `.cluster` | Cluster scope (multiple CTAs, sm_90+) |
| `.gpu` | All threads on the GPU |
| `.sys` | System-wide scope, including the host |

| Fence variant | Description |
| --- | --- |
| `fence.sc` | Sequential-consistency fence |
| `fence.acquire` | Acquire-semantics fence |
| `fence.release` | Release-semantics fence |

## Notes

- PTX ISA 9.3 — Chapter 8
- Atomic operations (`atom`) guarantee an indivisible read-modify-write; volatile operations prevent compiler optimizations that would violate consistency requirements.
- "Morally strong" operations are those using acquire/release or fence semantics that provide predictable ordering across the thread hierarchy.

## Related

- [instructions-sync-communication](./instructions-sync-communication.md)
- [machine-model](./machine-model.md)
