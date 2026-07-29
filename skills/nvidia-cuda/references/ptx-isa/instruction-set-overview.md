# Instruction Set Overview

Introductory material for the PTX instruction set (chapter 9, sections 9.1–9.6): the notation used to describe instructions, the general instruction syntax, predicated execution, operand type rules, warp divergence, and machine-specific semantics. Individual instruction categories are documented in separate pages (see `## Related`).

## Signature / Usage

```ptx
setp.eq.f32  p,y,0;     // is y zero?
@!p div.f32      ratio,x,y  // avoid division by zero
```

## Options / Props

| Section | Topic |
| --- | --- |
| 9.1 | Format and semantics used to describe each instruction in later sections |
| 9.2 | General instruction syntax: `opcode.type d, a, b;` (destination first, then sources) |
| 9.3 | Predicated execution via `@p` / `@!p` prefixes |
| 9.4 | Type information for instructions and operands, including size/type-conversion rules |
| 9.5 | Divergence of threads in control constructs (serialized execution of divergent paths) |
| 9.6 | Machine-specific execution semantics (e.g. 16-bit code behavior differences by architecture) |

## Notes

- PTX ISA 9.3 — Chapter 9 (sections 9.1–9.6)
- Predicated execution allows data-dependent control flow within a warp without explicit branching, reducing divergence.
- The instruction categories themselves (9.7.x) are split across `instructions-*.md` pages by official subsection grouping.

## Related

- [instructions-arithmetic](./instructions-arithmetic.md)
- [instructions-control-flow](./instructions-control-flow.md)
