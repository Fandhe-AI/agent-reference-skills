# KiCad Files and Folders

Reference for all file types used by KiCad, organized by editor and purpose.

## Project Files

| Extension | Description |
|-----------|-------------|
| `.kicad_pro` | Project settings shared across schematic and PCB work |

Legacy `.pro` files (KiCad 5.x and earlier) are read automatically and converted to `.kicad_pro` on save.

## Schematic Editor Files and Folders

| Extension | Description |
|-----------|-------------|
| `.kicad_sch` | Primary schematic document containing all symbol and connection information |
| `.kicad_sym` | Symbol library file (packed single file or unpacked folder-based) |
| `.kicad_symdir` | Convention for unpacked symbol library folders |
| `.wbk` | Simulator workbook file containing SPICE simulation setup information |
| `sym-lib-table` | Symbol library table: libraries available in the schematic editor (no leading dot) |
| `design-block-lib-table` | Design block library table: libraries available in the schematic editor (no leading dot) |

**Legacy formats** (KiCad 5.x and earlier): `.sch` can be read and is converted to `.kicad_sch` on write; `.lib` and `.dcm` can be read but not written; `*-cache.lib` is required for proper loading of a legacy `.sch` file.

`.kicad_sym` is a packed library (all symbols in one file) or an individual symbol file inside an unpacked library folder. `.kicad_symdir` is a common but not required naming convention for unpacked folders.

## Board Editor Files and Folders

| Extension | Description |
|-----------|-------------|
| `.kicad_pcb` | Main board file containing all design information except page layout |
| `.pretty` | Footprint library folder (the folder itself acts as the library) |
| `.kicad_mod` | Individual footprint file |
| `.kicad_dru` | Custom design rules file for a specific board |
| `fp-lib-table` | Footprint library table: libraries available in the board editor (no leading dot) |
| `fp-info-cache` | Cache to speed up loading of footprint libraries; need not be distributed or version-controlled |

**Legacy formats** (KiCad 4.x and earlier): `.brd` (board) and `.mod` (footprint library) can be read but not written.

## Common Files

| Extension | Description |
|-----------|-------------|
| `.kicad_prl` | Local settings for the current project (last used layer visibility, selection filter); need not be distributed or version-controlled |
| `.kicad_wks` | Page layout (drawing border and title block) description |
| `.kicad_jobset` | Jobset definition file containing output jobsets |
| `.kicad_blocks` | Design block library folder (folder is the library; may contain schematic and layout fragments) |
| `.kicad_block` | Design block folder containing a `.kicad_sch`, a `.kicad_pcb` and a `.json` metadata file |
| `.net` | Netlist created from the schematic and read by the board editor (not required by the recommended workflow) |
| `.cmp` | Association between schematic components and footprints; created by the board editor and imported by the schematic editor (not required by the recommended workflow) |

## Fabrication and Documentation Files

| Extension | Description |
|-----------|-------------|
| `.gbr` | Gerber files, for fabrication |
| `.drl` | Drill files (Excellon format), for fabrication |
| `.pos` | Position files (ASCII format), for automatic insertion machines |
| `.rpt` | Report files (ASCII format), for documentation |
| `.ps` | Plot files (PostScript) |
| `.pdf` | Plot files (PDF) |
| `.svg` | Plot files (SVG) |
| `.dxf` | Plot files (DXF) |

## Storing and Sending KiCad Files

KiCad schematic and board files contain all schematic symbols and footprints used in the design, enabling standalone distribution.

**Include when sharing:**
- `.kicad_pro` (holds important design information; include for a complete design)
- `.kicad_sch`
- `.kicad_pcb`
- All referenced sub-schematic files (not stated in the 10.0 manual)

**Not necessary when sharing** (can be added to the VCS ignore list):
- `.kicad_prl` (project-local settings)
- `fp-info-cache` (performance cache)

`*-cache.lib` is required for loading a legacy `.sch`; the manual does not list it as excludable.

## Notes

- In general, files created or modified by one version of KiCad cannot be opened by older versions; keep backup copies (stated in the Installing and Upgrading chapter, not in the Files and Folders chapter)
- Legacy `.pro` / `.sch` are converted to the current format on write; `.lib`, `.dcm`, `.brd`, `.mod` are read-only

## Related

- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
- [Using the KiCad Project Manager](./03-using-the-kicad-project-manager.md)
