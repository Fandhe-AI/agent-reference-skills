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
| Metadata directives (11.2) | `.metadata_section` (with `.metadata_domain`, `.metadata`) |
| Kernel and function directives | `.entry`, `.func`, `.alias` |
| Control flow directives | `.branchtargets`, `.calltargets`, `.callprototype` |
| Performance-tuning directives | `.maxnreg`, `.maxntid`, `.reqntid`, `.minnctapersm`, `.maxnctapersm` (deprecated), `.noreturn`, `.pragma`, `.abi_preserve`, `.abi_preserve_control`, `.minperctamemory` (11.5.10) |
| Debugging directives | `@@dwarf`, `.section`, `.file`, `.loc`, `.loc_intermediate` (11.6.5), `.nv_intermediate_source_section` (11.6.6) |
| Linking directives | `.extern`, `.visible`, `.weak`, `.common` |
| Cluster dimension directives | `.reqnctapercluster`, `.explicitcluster`, `.maxclusterrank` |
| Miscellaneous directives | `.blocksareclusters`, `.language` |

## Notes

- PTX ISA 9.5 — Chapter 11
- `.target` accepts `sm_107`, `sm_107f` (family-specific features), and `sm_107a` (architecture-specific features), added in PTX ISA 9.4.
- `.metadata_section { metadata-domain metadata-element-list }` (9.5, 11.2.1, module level; may not be redefined within a module, and with separate compilation the metadata of all modules must be aggregated into a single directive): `metadata-domain = .metadata_domain domain-id`; `metadata-element = .metadata elem-index { elem-string, value-list }`; a `value` is a double-quoted string, `.b32 integer`, `.metadata_index elem-index` (refers to an already-defined element), or `.metadata_label string`. The only supported domain is `.metadata_domain 1` (`trace.mark` metadata domain), supported on family-specific `sm_107f` or higher in the same family. Excerpt of the official example (the `.metadata_domain 1` line and the `.metadata 4` element only, whitespace condensed): `.metadata_section { .metadata_domain 1  .metadata 4 { "associate_label1_event1", .b32 0, .metadata_label "event_label1", .metadata_index 1 } }`. See `trace.mark` in instructions-video-misc.
- The 9.5 insertion of Metadata Directives as 11.2 shifted the later 11.x section numbers by one relative to 9.4.
- `.minperctamemory size;` (9.4, `sm_80`+): `size` is a 32-bit unsigned integer in bytes; declares the minimum per-CTA global memory required when the kernel is launched. Allowed only on `.entry` functions, between the `.entry` directive and its body; only entries with this directive may use `%perctamemoryoffset` / `%perctamemorysize`. Example: `.entry foo .minperctamemory 2048 { ... }`.
- `.loc_intermediate file_index line_number column_position` (9.4, all targets): intermediate-language source location for the immediately following PTX instruction; `file_index` must name an intermediate IR file defined by `.file`; must be immediately preceded by a `.loc` for the same instruction; one per instruction; no `inlined_at` attribute; recorded in a secondary debug line table (not merged into `.debug_line` / `.nv_debug_line_ptx`); allowed only inside kernel or device function bodies.
- `.nv_intermediate_source_section { .code_block { .ir_name: ir-name-string .sourceFileName: file-index .source_begin source-text .source_end } ... }` (9.4, all targets, module scope only): embeds intermediate IR source in the PTX module. Each `.code_block` produces a separate ELF section named from `ir_name`; currently only `"TileIR"` is supported for `ir-name`; `.sourceFileName` must reference a `.file` index declared in the same module.
- `.version`/`.target`/`.address_size` must appear once at the top of every module, declaring the PTX ISA version, target GPU architecture (e.g. `sm_100`, `sm_90`), and pointer address width (32 or 64 bits, default 32 if `.address_size` is omitted).
- `.visible` controls external linkage visibility of a kernel or function symbol across modules, analogous to symbol visibility in a linked object file.
- `.reqnctapercluster` / `.explicitcluster` / `.maxclusterrank` (sm_90+) declare the cluster dimensions a kernel requires or supports.

## Related

- [introduction](./introduction.md)
- [abi](./abi.md)
