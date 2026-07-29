# Struct-like JIT Arguments

## Signature / Usage

```python
class Params(typing.NamedTuple):
    a: cutlass.Int32
    b: cutlass.Float32

@cute.jit
def f(p: Params):
    return p.a  # dot-notation access; works inside if/for; immutable — build a new instance to "update"

@native_struct(zero_init=False, packed=True)
class MutableState:
    acc: cutlass.Float32   # mutated via direct assignment -> llvm.insertvalue

@dataclasses.dataclass(frozen=True)
class FrozenParams:
    a: cutlass.Int32
```

## Options / Props

| Type | Mutable fields? | Notes |
| --- | --- | --- |
| `typing.NamedTuple` | No | Tuple subclass, fixed fields, flattened through the pytree system; fields reconstructed via the NamedTuple constructor on the way into the kernel body; hashable/unpackable like native tuples |
| `@native_struct` | Yes | Generates an LLVM struct type; field writes emit `llvm.insertvalue`; options `zero_init=False`, `packed=True`; supports `Constexpr` fields (passed as plain Python values, excluded from the struct) |
| `@dataclass(frozen=True)` | No | Read-only pytree container, similar semantics to NamedTuple |

## Notes

- Selection guidance: read-only parameters → `NamedTuple` or frozen `dataclass`; mutable accumulators/state → `@native_struct`; Python-native semantics preferred → `NamedTuple`; fine-grained LLVM control needed → `@native_struct`.

## Related

- [JIT Argument Generation](./dsl-jit-arg-generation.md)
- [DSL Types](./dsl-types.md)
