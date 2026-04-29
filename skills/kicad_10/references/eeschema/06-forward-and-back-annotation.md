# Forward and Back Annotation

Synchronization of design data between the Schematic Editor and the PCB Editor.

## Forward Annotation: Update PCB from Schematic

Transfers schematic changes to the PCB layout.

**Access:** **Tools** → **Update PCB from Schematic** (in the Schematic Editor or PCB Editor)

### What Gets Synchronized

| Change type | Description |
|-------------|-------------|
| Component additions | New symbols in the schematic become new footprints in the PCB |
| Component removals | Deleted symbols are removed from the PCB |
| Reference designator changes | Updated reference designators propagate to footprint labels |
| Value changes | Updated component values appear on footprints |
| Footprint assignment changes | New footprint selection replaces the old one in the PCB |
| Net connectivity changes | Ratsnest and net names update to reflect new connections |
| Symbol field changes | All symbol fields are copied to the footprint's corresponding fields |

### Process

1. Open the PCB Editor (or invoke the tool from the Schematic Editor).
2. A **Change Preview** dialog lists all pending changes — review before applying.
3. Accept or reject individual changes, then click **Update PCB**.

## Back Annotation: Update Schematic from PCB

Transfers PCB-side changes back to the schematic.

**Access:** **Tools** → **Update Schematic from PCB** (in the PCB Editor)

### What Gets Synchronized

- Reference designator changes (e.g., swapping R1 and R2 during layout)
- Footprint assignment changes made in the PCB Editor

### Process

1. Make changes in the PCB Editor (e.g., re-annotate components for layout convenience).
2. Use **Update Schematic from PCB** to reflect those changes in the schematic.
3. Review the change preview and accept.

## Notes

- The schematic is independent of the system symbol libraries. Symbols are embedded copies; library changes do not automatically update the schematic. Use **Update Symbol from Library** manually.
- Forward annotation is non-destructive: placement and routing in the PCB are preserved; only netlist and component data change.
- Always run ERC before forward annotation to avoid propagating errors to the PCB.

## Related

- [Assigning Footprints](./05-assigning-footprints.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
- [Generating Outputs](./07-generating-outputs.md)
