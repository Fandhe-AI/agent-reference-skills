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
| `.wbk` | Simulator workbook files for SPICE simulation configuration |
| `.sym-lib-table` | Symbol library configuration table |
| `.design-block-lib-table` | Design block library configuration table |

**Legacy formats** (`.sch`, `.lib`, `.dcm`, `*-cache.lib`): readable but not writable by current versions.

## Board Editor Files and Folders

| Extension | Description |
|-----------|-------------|
| `.kicad_pcb` | Main board file containing all design information except page layout |
| `.pretty` | Footprint library folder (the folder itself acts as the library) |
| `.kicad_mod` | Individual footprint file |
| `.kicad_dru` | Custom design rules file for a specific board |
| `.fp-lib-table` | Footprint library configuration table |
| `.fp-info-cache` | Performance cache (distribution is optional) |

**Legacy formats** (`.brd`, `.mod`): readable but not writable.

## Common Files

| Extension | Description |
|-----------|-------------|
| `.kicad_prl` | Project-local settings (not required for distribution) |
| `.kicad_wks` | Page layout / drawing sheet description |
| `.kicad_jobset` | Output job definitions |
| `.kicad_blocks` | Design block library |
| `.kicad_block` | Individual design block folder |
| `.net` | Netlist for schematic-to-board communication |

## Fabrication and Documentation Files

| Extension | Description |
|-----------|-------------|
| `.gbr` | Gerber fabrication file |
| `.drl` | Drill file |
| `.pos` | Component placement / pick-and-place file |
| `.rpt` | Report file |
| `.ps` | PostScript output |
| `.pdf` | PDF output |
| `.svg` | SVG output |
| `.dxf` | DXF output |

## Storing and Sending KiCad Files

KiCad schematic and board files contain all schematic symbols and footprints used in the design, enabling standalone distribution.

**Include when sharing:**
- `.kicad_pro` (required)
- `.kicad_sch`
- `.kicad_pcb`
- All referenced sub-schematic files

**Exclude when sharing:**
- `.kicad_prl` (project-local settings)
- `.fp-info-cache` (performance cache)
- `*-cache.lib` (legacy cache files)

## Notes

- Files created or modified by one version of KiCad cannot be opened by older versions
- Legacy formats can be read and will be converted to current format on save

## Related

- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
- [Using the KiCad Project Manager](./03-using-the-kicad-project-manager.md)
