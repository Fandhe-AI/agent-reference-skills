# Creating a PCB

Overview of PCB concepts and workflows for starting a new board design in KiCad.

## Basic PCB Concepts

A KiCad PCB consists of:

- **Footprints** — physical representations of electronic components with pads
- **Nets** — logical connections between pads
- **Tracks, vias, and filled zones** — copper that physically realizes net connections
- **Graphical shapes** — board edge (Edge.Cuts), silkscreen markings, documentation

PCB nets stay synchronized with schematic information; nets can also be created directly in the board editor.

## Capabilities and Specifications

| Parameter | Value |
|-----------|-------|
| Copper layers | Up to 32 |
| Technical layers | 14 (silkscreen, solder mask, adhesive, paste, etc.) |
| General-purpose drawing layers | 13 |
| Internal resolution | 1 nanometer |
| Maximum board size | ~4 m × 4 m |
| Boards per project | One |

Only even numbers of copper layers are supported.

## Starting from a Schematic (Recommended)

1. Complete the schematic in KiCad Schematic Editor
2. Open (or create) the board file
3. Run **Tools → Update PCB from Schematic…** (`F8`)
4. Footprints and net connections are transferred automatically — no intermediate netlist file needed

## Starting from Scratch

For standalone board design without a schematic:

1. Launch the PCB editor independently
2. Save the board file immediately — this creates a project file
3. Add footprints manually; nets can be defined within the board editor

> Starting from scratch is possible but not recommended for most workflows.

## Notes

- The board file and schematic share the same project; changes in one can be synchronized to the other via forward/back annotation
- Running **Update PCB from Schematic** is safe to repeat — it shows a preview of changes before applying them

## Related

- [04-board-setup.md](./04-board-setup.md)
- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
