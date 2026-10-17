# Control Flow and Stack Manipulation Instructions

Branching, function call/return, and explicit stack-manipulation instructions (PTX ISA 9.4 §9.7.14, §9.7.19).

## Signature / Usage

```ptx
bra.uni  L_exit;    // uniform unconditional jump
@p  call     (d), h, (a, b);  // return value into register d
alloca.type  ptr, size{, immAlign};
```

## Options / Props

| Category | Mnemonics |
| --- | --- |
| Control flow (9.7.14) | `{}` (block grouping), `@` (predicate guard), `bra`, `brx.idx`, `call`, `ret`, `exit` |
| Stack manipulation (9.7.19) | `stacksave`, `stackrestore`, `alloca` |

## Notes

- PTX ISA 9.4 — Chapter 9.7.14, 9.7.19
- `bra` transfers control to a label or computed target; `brx.idx` performs an indexed (jump-table) branch.
- `call`/`ret` implement the ABI-level function call convention described in the abi page; `exit` terminates the executing thread.
- `alloca` reserves dynamic stack space and returns its address; `stacksave`/`stackrestore` snapshot and restore the stack pointer around such allocations.

## Related

- [abi](./abi.md)
- [instructions-comparison-logic](./instructions-comparison-logic.md)
