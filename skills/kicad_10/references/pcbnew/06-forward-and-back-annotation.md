# Forward and Back Annotation

Mechanisms for keeping the schematic and PCB in sync throughout the design flow.

## Update PCB From Schematic (Forward Annotation)

Transfers footprints, nets, and electrical connections from the schematic to the PCB.

**Steps:**
1. Open the board file
2. Run **Tools → Update PCB from Schematic…** or press `F8` (available in both the schematic and board editors; also a Board Editor top toolbar icon)
3. The Changes To Be Applied pane lists pending changes; the PCB is not modified until **Update PCB** is clicked
4. Message types can be shown/hidden with checkboxes; **Save…** writes a report

No intermediate netlist file is required.

**Options:**

| Option | Description |
|--------|-------------|
| Re-link footprints to schematic symbols based on their reference designators | Re-links each footprint to the symbol with the same reference designator, replacing the unique-identifier link. Generally leave unchecked; use after symbols were deleted and replaced (e.g. cut-and-paste of a sheet), then uncheck again |
| Group footprints based on symbol group | Adds footprints to PCB groups when their symbols are grouped |
| Replace footprints with those specified by symbols | If unchecked, existing footprints are not changed when a symbol's footprint assignment changes |
| Delete footprints with no symbols | Deletes footprints without a symbol; footprints with the "Not in schematic" attribute are unaffected |
| Override locks | If checked, locking does not protect a footprint from deletion/replacement; if unchecked, locked footprints are never deleted or replaced |
| Update footprint fields from symbols | Transfers new and updated symbol fields to footprints |
| Remove footprint fields not found in symbols | Removes footprint fields absent from the symbol; if unchecked, footprints may keep extra fields |

By default footprints and symbols are linked by a unique identifier (UUID), so reference designator changes in the schematic update the PCB references on the next update.

## Update Schematic from PCB (Back Annotation)

Synchronizes changes made in the PCB editor back to the schematic: **Tools → Update Schematic from PCB** (schematic or board editor). Syncs reference designators, values, attributes (DNP, Exclude From BOM), footprint assignments, other fields, and net names; each type can be enabled individually. Changes are listed in the Changes To Be Applied pane and applied with **Update Schematic**; a report can be saved.

| Option | Description |
|--------|-------------|
| Re-link footprints to schematic symbols based on their reference designators | Links by reference designator; incompatible with updating symbol reference designators. Generally leave unchecked |
| Reference designators | Update symbol references from footprints |
| Values | Update symbol values from footprints |
| Attributes | Update symbol attributes (exclude from BOM, DNP) |
| Other fields | Update other symbol fields (reference, value, and footprint have their own options) |
| Footprint assignments | Update symbols whose footprints were changed or replaced |
| Net names | Update or add net labels to match board net names; required to sync pin and gate swaps |
| Prefer symbol unit swaps over label swaps | Detected gate swaps are applied by swapping symbol units instead of net labels |
| Prefer symbol pin swaps over label swaps | Detected pin swaps are applied by swapping symbol pins (requires **Allow unconstrained pin swaps** in the Schematic Editor's Editing Options preferences); otherwise labels are swapped |

**Back annotation with CMP files:** export with **File → Export → Footprint Association (.cmp) File…** and import in the Schematic Editor with **File → Import → Footprint Assignments…**. Only footprint assignments and footprint fields sync; Update Schematic from PCB is recommended instead.

## Geographical Re-annotation

Sets reference designators from physical footprint position. Run via **Tools → Geographical Reannotate…**.

| Section | Settings |
|---------|----------|
| Footprint Order | Direction (left-to-right, right-to-left, top-to-bottom, bottom-to-top), column-major or row-major, use footprint or reference designator location, rounding of locations |
| Reannotation Scope | All footprints, front or back only, or selection; Exclude locked footprints; Exclude references (comma-separated) |
| Reference Designators | Front reference start / Back reference start (back defaults to one above the last front reference), Front prefix / Back prefix (inserted before any existing prefix), Remove front prefix / Remove back prefix |

Click **Reannotate PCB** to apply. The tool changes the board only; run Update Schematic from PCB with the reference-designator re-link option disabled (and Reference designators enabled) to sync the schematic.

## Notes

- Forward annotation is the primary and recommended direction of design changes
- Pin and gate swaps in the PCB editor reach the schematic only through Update Schematic from PCB
- The manual does not describe a diff-style preview beyond the Changes To Be Applied list (the PCB is unchanged until the Update button is pressed)

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
