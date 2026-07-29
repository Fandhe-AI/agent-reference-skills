# Syntax

PTX source modules are ASCII text. A module begins with directive statements (`.version`, `.target`, `.address_size`) and is otherwise built from directive statements (beginning with `.`) and instruction statements, both terminated with `;`.

## Signature / Usage

```ptx
// example of directive placement within a module (per PTX ISA .address_size docs)
   .version 2.3
   .target sm_20
   .address_size 64

@p   bra{.uni}  tgt;           // tgt is a label, predicated branch
```

## Options / Props

| Element | Form | Description |
| --- | --- | --- |
| Line comment | `// ...` | Rest of line is a comment |
| Block comment | `/* ... */` | Multi-line comment |
| Directive statement | `.keyword ...;` | State-space, type, and module-level declarations |
| Instruction statement | `opcode.type d, a, b;` | Executable instruction |
| Predicate | `@p` / `@!p` | Guards an instruction on a predicate register |

## Notes

- PTX ISA 9.3 — Chapter 4
- Reserved keywords include state-space specifiers (`.reg`, `.global`, `.shared`, `.local`, `.const`), type specifiers (`.u32`, `.f32`, `.b64`, ...), and instruction mnemonics (`add`, `mul`, `ld`, `st`, ...).
- Integer constants may be written in decimal, hexadecimal, or binary form; floating-point constants use standard decimal or scientific notation.

## Related

- [state-spaces-types-variables](./state-spaces-types-variables.md)
- [instruction-set-overview](./instruction-set-overview.md)
