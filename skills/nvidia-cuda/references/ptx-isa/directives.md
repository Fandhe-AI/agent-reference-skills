# Directives

Assembly directives that declare module metadata, kernel/function entry points, control-flow hints, performance-tuning hints, debugging info, linking visibility, and cluster dimensions.

## Signature / Usage

```ptx
// example directives (per PTX ISA .version / .address_size docs)
.version 3.1
.address_size 64       // addresses are 64 bit
```

## Options / Props

| Group | Directives |
| --- | --- |
| Module directives | `.version`, `.target`, `.address_size` |
| Kernel and function directives | `.entry`, `.func`, `.alias` |
| Control flow directives | `.branchtargets`, `.calltargets`, `.callprototype` |
| Performance-tuning directives | `.maxnreg`, `.maxntid`, `.reqntid`, `.minnctapersm`, `.maxnctapersm` (deprecated), `.noreturn`, `.pragma`, `.abi_preserve`, `.abi_preserve_control` |
| Debugging directives | `@@dwarf`, `.section`, `.file`, `.loc` |
| Linking directives | `.extern`, `.visible`, `.weak`, `.common` |
| Cluster dimension directives | `.reqnctapercluster`, `.explicitcluster`, `.maxclusterrank` |
| Miscellaneous directives | `.blocksareclusters`, `.language` |

## Notes

- PTX ISA 9.3 — Chapter 11
- `.version`/`.target`/`.address_size` must appear once at the top of every module, declaring the PTX ISA version, target GPU architecture (e.g. `sm_100`, `sm_90`), and pointer address width (32 or 64 bits, default 32 if `.address_size` is omitted).
- `.visible` controls external linkage visibility of a kernel or function symbol across modules, analogous to symbol visibility in a linked object file.
- `.reqnctapercluster` / `.explicitcluster` / `.maxclusterrank` (sm_90+) declare the cluster dimensions a kernel requires or supports.

## Related

- [introduction](./introduction.md)
- [abi](./abi.md)
