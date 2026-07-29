# JIT Function Argument Generation

## Signature / Usage

```python
import cutlass

@cute.jit
def f(n: cutlass.Constexpr, x):  # n = static (compile-time), x = dynamic (runtime) by default
    ...

# custom type protocols
class MyHostArg:      # JitArgument protocol (host functions)
    def __c_pointers__(self): ...
    def __get_mlir_types__(self): ...
    @classmethod
    def __new_from_mlir_values__(cls, values): ...

class MyDeviceArg:    # DynamicExpression protocol (device functions)
    def __extract_mlir_values__(self): ...
    @classmethod
    def __new_from_mlir_values__(cls, values): ...

@cutlass.register_jit_arg_adapter()
def adapt_third_party_type(...): ...
```

## Options / Props

| Item | Description |
| --- | --- |
| Default argument kind | Dynamic (runtime value) |
| `cutlass.Constexpr` | Explicitly marks an argument as static (compile-time); static args don't appear in the generated signature |
| Type validation | Mismatched argument types raise `DSLRuntimeError` with expected-vs-received type in the message |
| `JitArgument` protocol | For host functions: `__c_pointers__` (ctypes pointers), `__get_mlir_types__` (MLIR types), `__new_from_mlir_values__` (reconstruct from MLIR values) |
| `DynamicExpression` protocol | For device functions: `__extract_mlir_values__` (dynamic expressions), `__new_from_mlir_values__` |
| `@cutlass.register_jit_arg_adapter()` | Adapts a third-party type to the JIT-argument protocols without modifying its source |

## Related

- [DSL Introduction](./dsl-introduction.md)
- [DSL Dynamic Layout](./dsl-dynamic-layout.md)
- [Struct-like JIT Arguments](./dsl-struct-types.md)
