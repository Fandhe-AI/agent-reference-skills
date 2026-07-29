# Directives

Assembly directives that declare module metadata, kernel/function entry points, control-flow hints, performance-tuning hints, debugging info, linking visibility, and cluster dimensions.

## Signature / Usage

```ptx
.version 9.3
.target sm_90
.address_size 64

.visible .entry my_kernel (.param .u64 ptr)
.maxntid 256, 1, 1
{
    ret;
}
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
- `.version`/`.target`/`.address_size` must appear once at the top of every module, declaring the PTX ISA version, target GPU architecture (e.g. `sm_90`), and pointer address width (32 or 64 bits).
- `.visible` controls external linkage visibility of a kernel or function symbol across modules, analogous to symbol visibility in a linked object file.
- `.reqnctapercluster` / `.explicitcluster` / `.maxclusterrank` (sm_90+) declare the cluster dimensions a kernel requires or supports.

## Related

- [introduction](./introduction.md)
- [abi](./abi.md)
