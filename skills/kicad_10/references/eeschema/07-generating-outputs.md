# Generating Outputs

The Schematic Editor can export schematics in multiple formats for documentation, fabrication, and downstream tools.

## Printing

Print directly to a printer or PDF via **File** → **Print**. Configure page orientation, scaling, and color/black-and-white output.

## Plotting

**File** → **Plot** (or the plot toolbar button)

### Supported Formats

| Format | Use case |
|--------|----------|
| PDF | Archival, sharing, review |
| SVG | Web display, vector editing applications |
| DXF | Import into CAD software |
| HPGL | Legacy plotters |
| PostScript | Professional printing |

**Configuration options:**
- Color mode (color or black-and-white)
- Page size and orientation
- Line width overrides
- Output directory

## Generating a Bill of Materials (BOM)

### Symbol Fields Table

**Tools** → **Edit Symbol Fields** opens a spreadsheet-style editor that also functions as a BOM export tool.

Features:
- View and edit all component fields across the entire design
- Group identical components
- Add, remove, or rename columns
- Define virtual fields with dynamic content (e.g., quantity)
- **Export** tab: save to CSV or other formats

BOM generation uses Python or XSLT scripts, allowing flexible output formats. Scripts can be selected in the **Generate BOM** dialog (**Tools** → **Generate BOM**).

### Excluding Components from BOM

In symbol properties, check **Exclude from bill of materials** to omit a component from all BOM exports.

## Generating a Netlist

**File** → **Export** → **Netlist**

### Supported Netlist Formats

| Format | Description |
|--------|-------------|
| KiCad | Native format for internal use |
| Orcad PCB 2 | Compatible with Orcad-based flows |
| CADSTAR | For CADSTAR PCB design tools |
| Spice | For ngspice and other SPICE simulators |
| Custom | Via Python or XSLT scripting |

Custom netlist scripts can be added and configured to integrate with specialized downstream tools.

## Notes

- Symbols marked **Exclude from board** will not appear in netlists used for PCB updates.
- The Symbol Fields Table is the recommended approach for BOM generation; it shows the live state of the design and allows real-time editing.
- Plot output respects the current net class graphical settings (wire color/width) if configured.

## Related

- [Assigning Footprints](./05-assigning-footprints.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Design Variants](./08-design-variants.md)
- [Advanced Topics](./14-advanced-topics.md)
