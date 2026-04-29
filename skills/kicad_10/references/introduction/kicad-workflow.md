# KiCad Workflow

Overview of KiCad's core concepts, integrated tools, and user interface conventions.

## Basic Terminology

| Term | Definition |
|------|-----------|
| Schematic | One or more sheets of circuit drawings representing a design |
| Hierarchical schematic | A schematic with multiple nested pages; has a single **root sheet** at the top |
| Symbol | A circuit element placed on a schematic; contains **pins** as connection points |
| Symbol library | A collection of reusable symbols |
| Pin | A connection point on a symbol |
| Net | An electrical connection between two or more pins |
| Netlist | A file conveying schematic information (pin connections and net names) to external programs |
| PCB | A design document representing the physical implementation of a schematic |
| Footprint | A PCB circuit element representing a physical component; contains **pads** |
| Pad | A copper area on a footprint used for electrical connections |
| Worksheet | A drawing template with a title block and frame |
| Plotting | The process of generating manufacturing outputs (e.g., Gerber files, PDFs) |
| Ngspice | The integrated mixed-signal circuit simulator, based on Berkeley SPICE |

## KiCad Components

The KiCad project manager launches the following integrated tools:

| Tool | Purpose |
|------|---------|
| Schematic Editor | Capture and edit circuit schematics |
| Symbol Editor | Create and manage schematic symbols |
| PCB Editor | Design and edit printed circuit boards |
| Footprint Editor | Create and manage PCB footprints |
| Gerber Viewer | Inspect Gerber manufacturing files |
| Image Converter | Convert images for use in KiCad |
| PCB Calculator | Compute PCB design values (trace width, etc.) |
| Drawing Sheet Editor | Edit worksheet templates |

Modern versions of KiCad integrate these tools within a single project workflow, eliminating the need for a separate netlist file to transfer data between the Schematic Editor and PCB Editor.

## User Interface

### Selection

Objects can be selected by clicking on them or by dragging a selection window:

- **Left-to-right drag**: selects only items completely enclosed within the window
- **Right-to-left drag**: selects items that the window touches (partial overlap)

### Tool Modes

Editors operate using tool modes. The default tool is the **selection tool**. The name of the active tool is displayed in the status bar.

- Press **Esc** to cancel the current action and return to the selection tool.

## Related

- [Welcome](./welcome.md)
- [Installing and Upgrading KiCad](./installing-and-upgrading-kicad.md)
