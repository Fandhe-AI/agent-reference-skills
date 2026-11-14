# Generating Outputs

The Schematic Editor can export schematics in multiple formats for documentation, fabrication, and downstream tools.

## Printing

Print directly to a printer via **File** → **Print…**. Options: Print drawing sheet, Output mode, Print background color, Use a different color theme for printing, Page Setup…. The manual recommends Plotting instead when writing to a file.

## Plotting

**File** → **Plot…** (buttons: Plot Current Page, Plot All Pages)

### Supported Formats

| Format | Use case |
|--------|----------|
| PDF | Archival, sharing, review |
| SVG | Web display, vector editing applications |
| DXF | Import into CAD software |
| PostScript | Professional printing |

**Configuration options:** Output directory, Design variant, Output Format, Page size, Plot drawing sheet, Output mode, Color theme, Plot background color, Minimum line width, Export units (DXF), Open file after plot. PDF only: Generate property popups, Generate clickable links for hierarchical elements, Generate metadata from AUTHOR and SUBJECT variables.

## Generating a Bill of Materials (BOM)

### Symbol Fields Table

**Tools** → **Generate Bill of Materials…** (or the BOM button on the top toolbar) opens the Symbol Fields Table, a spreadsheet-style editor that also functions as a BOM export tool. Bulk field editing is also available as **Bulk Edit Symbol Fields…** (see the actions reference); the 10.0 manual also calls the same entry **Tools** → **Edit Symbol Fields…** in some chapters (footprint assignment, import) and **Bulk Edit Symbol Fields…** in others (design variants, actions reference); the table also opens from a top-toolbar button.

Features:
- View and edit all component fields across the entire design
- Group identical components
- Add, remove, or rename columns
- Define virtual fields with dynamic content (e.g., quantity)
- **Export** tab: save to CSV or other formats

Legacy script-based BOMs (bom_csv_grouped_extra, bom_csv_grouped_by_value, bom_csv_grouped_by_value_with_fp) are run via **Tools** → **Generate Legacy Bill of Materials…**. The PCB Editor's **File → Fabrication Outputs → BOM…** exporter is also available, but the manual recommends the schematic BOM tool.

### Excluding Components from BOM

In symbol properties, check **Exclude from bill of materials** to omit a component from all BOM exports.

## Generating a Netlist

**File** → **Export** → **Netlist…** (buttons: Export Netlist, Add Generator…)

### Supported Netlist Formats

| Format | Description |
|--------|-------------|
| KiCad | Native format for internal use |
| OrcadPCB2 | Compatible with Orcad-based flows |
| Allegro | For Allegro-based flows |
| PADS | For PADS-based flows |
| CADSTAR | For CADSTAR PCB design tools |
| Spice | For ngspice and other SPICE simulators |
| Spice Model | Hierarchical labels become subcircuit pins |

Additional generators can be added with **Add Generator…**.

## Notes

- HPGL plot output is not offered in the 10.0 Plot dialog (formats: PostScript, PDF, SVG, DXF); `kicad-cli sch export hpgl` is non-functional.
- Symbols marked **Exclude from board** will not appear in netlists used for PCB updates.
- The Symbol Fields Table is the recommended approach for BOM generation; it shows the live state of the design and allows real-time editing.
- Plot output respects the current net class graphical settings (wire color/width) if configured.

## Related

- [Assigning Footprints](./05-assigning-footprints.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Design Variants](./08-design-variants.md)
- [Advanced Topics](./14-advanced-topics.md)
