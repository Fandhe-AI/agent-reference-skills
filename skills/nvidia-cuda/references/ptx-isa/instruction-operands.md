# Instruction Operands

PTX instructions operate on register operands, immediate constants, and address operands, with rules governing type conversion between operand and instruction types.

## Signature / Usage

```ptx
d = *(a+immOff);   // register-plus-offset addressing, i.e. [reg+immOff]
mov.v4.f32 {a,b,c,d}, V;   // vector operand (brace notation)
```

## Options / Props

| Operand kind | Form | Description |
| --- | --- | --- |
| Register | `%r0`, `%f1`, `%p1` | Named virtual register |
| Immediate | numeric literal | Constant value |
| Address | `[a]`, `[a+immOff]` | Memory reference, generic or state-space qualified |
| Vector | `{d1, d2}` | Brace-notation grouping of multiple destination/source operands |
| Label / function name | symbol | Used as an operand for control-flow and call instructions |

## Notes

- PTX ISA 9.3 — Chapter 6
- Operand size may exceed instruction-type size; the ISA defines rounding modifiers and conversion rules for such cases.
- Address operands support generic addressing across state spaces, resolved via `cvta`.

## Related

- [state-spaces-types-variables](./state-spaces-types-variables.md)
- [abi](./abi.md)
