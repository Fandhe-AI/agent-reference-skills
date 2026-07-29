# Abstracting the ABI

PTX abstracts function calls through the `.func` directive, the `.param` state space for argument/return passing, and the `call` instruction, allowing a single PTX module to target different underlying calling conventions.

## Signature / Usage

```ptx
.func (.reg .u32 rv) foo (.reg .u32 a, .reg .u32 b) ...

call.uni g, (a);  // call function 'g' with parameter 'a'
```

## Options / Props

| Concept | Description |
| --- | --- |
| `.func` | Declares/defines a PTX function (as opposed to `.entry` for kernels) |
| `.callprototype` | Declares a call signature for indirect/external calls |
| `.param` | State space used to pass function parameters and kernel arguments |
| Variadic functions | Functions accepting a variable-length argument list |
| `alloca` | Stack-based dynamic memory allocation within a function |

## Notes

- PTX ISA 9.3 — Chapter 7
- Kernel-entry parameter passing (`.entry`) and device-function parameter passing (`.func`) are handled differently, reflecting the two distinct call boundaries (host launch vs. device call).

## Related

- [instruction-operands](./instruction-operands.md)
- [directives](./directives.md)
