# Forward and Back Annotation

Mechanisms for keeping the schematic and PCB in sync throughout the design flow.

## Update PCB From Schematic (Forward Annotation)

Transfers footprints, nets, and electrical connections from the schematic to the PCB.

**Steps:**
1. Open the board file
2. Run **Tools → Update PCB from Schematic…** or press `F8` (also available as a toolbar icon)
3. The dialog previews all pending changes before applying
4. Confirm to import changes

No intermediate netlist file is required. Safe to repeat at any time — the dialog shows a diff-style preview.

## Update Schematic from PCB (Back Annotation)

Synchronizes changes made in the PCB editor back to the schematic.

**Methods:**
- Right-click an object → **Select on Schematic** (highlights the corresponding schematic element)
- **Tools → Update Schematic from PCB** — transfers modifications such as footprint position updates, component value changes, or pin/gate swap results

## Geographical Re-annotation

Renumbers component reference designators based on physical board position rather than schematic order.

**Usage:**
- Access via **Tools → Geographical Re-annotation**
- Specify the starting position and scan direction
- Useful for organizing assembly documentation or meeting manufacturing numbering requirements

## Notes

- Forward annotation is the primary and recommended direction of design changes
- Back annotation should be used deliberately; changes propagate to the schematic which may affect other derived documents
- Pin and gate swaps in the PCB editor require back annotation to keep the schematic accurate

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
