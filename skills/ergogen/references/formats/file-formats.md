# File Formats

Ergogen accepts configuration input in multiple formats and produces output files for outlines, cases, PCBs, and visualization.

## Input Formats

| Format | Description |
|--------|-------------|
| JSON | Standard JSON configuration file |
| YAML | YAML configuration file |
| JavaScript | JS module that exports/produces an object |
| ZIP / EKB | Bundle format; can include custom footprints |

## Output Formats

| Category | Format | File Extension | Tool / Viewer | Description |
|----------|--------|---------------|---------------|-------------|
| Points | YAML | — | any text editor | Canonical representation of all defined points |
| Points | Demo | — | browser / SVG viewer | Visual preview of the point layout |
| Outlines | DXF | `.dxf` | FreeCAD, KiCad, AutoCAD | 2D outline for laser cutting or import into PCB tools |
| Outlines | SVG | `.svg` | browser, Inkscape | Vector outline for visualization or editing |
| Cases | JSCAD | `.jscad` | OpenJSCAD, Cadhub | 3D case model; open in JSCAD-compatible viewer |
| PCBs | KiCad PCB | `.kicad_pcb` | KiCad | Unrouted PCB layout; requires manual routing in KiCad |

## Notes

- PCB output is **unrouted** — no traces are placed. You must open the file in KiCad and route connections manually.
- PCB output does **not** include a KiCad schema (`.kicad_sch`) or project file (`.kicad_pro`); these must be created separately in KiCad if needed.
- Case output uses the JSCAD format, which can be opened and rendered at [Cadhub](https://cadhub.xyz/) or with a local OpenJSCAD installation.
- Input bundles (ZIP/EKB) allow packaging a config together with custom footprints for sharing or reuse.

## Related

- [PCBs](../sections/pcbs.md)
- [Outlines](../sections/outlines.md)
- [Cases](../sections/cases.md)
