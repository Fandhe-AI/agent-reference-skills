# Forward and Back Annotation

Synchronization of design data between the Schematic Editor and the PCB Editor.

## Forward Annotation: Update PCB from Schematic

Transfers schematic changes to the PCB layout.

**Access:** **Tools** → **Update PCB from Schematic** (`F8`) in the Schematic Editor or PCB Editor; also the toolbar icon in the PCB Editor. Symbols with the Exclude from board attribute are not transferred.

### What Gets Synchronized

| Change type | Description |
|-------------|-------------|
| Component additions | New symbols in the schematic become new footprints in the PCB |
| Component removals | Footprints without a symbol are deleted only if **Delete footprints with no symbols** is checked (footprints with the "Not in schematic" attribute are unaffected) |
| Reference designator changes | Symbols and footprints are linked by unique identifier, so re-annotation updates the PCB reference designators |
| Footprint assignment changes | Existing footprints are replaced only if **Replace footprints with those specified by symbols** is checked |
| Net connectivity changes | Board net connections are updated to match the schematic |
| Symbol field changes | Transferred only if **Update footprint fields from symbols** is checked |

### Options

| Option | Effect |
|--------|--------|
| Re-link footprints to schematic symbols based on their reference designators | Re-links by reference designator instead of unique identifier; generally leave unchecked, use after a symbol was deleted and replaced |
| Group footprints based on symbol group | Adds footprints to PCB groups when their symbols are grouped |
| Replace footprints with those specified by symbols | Replaces PCB footprints with the symbol's assigned footprint |
| Delete footprints with no symbols | Deletes footprints that have no schematic symbol |
| Override locks | Locked footprints may still be deleted or replaced |
| Update footprint fields from symbols | Syncs new and updated symbol fields to footprints |
| Remove footprint fields not found in symbols | Removes footprint fields absent from the symbol |

### Process

1. Invoke the tool from the Schematic Editor or PCB Editor.
2. The **Changes To Be Applied** pane lists all pending changes; the PCB is not modified until you click **Update PCB**.
3. Use the checkboxes at the bottom to show or hide message types; **Save…** writes a report.

## Back Annotation: Update Schematic from PCB

Transfers PCB-side changes back to the schematic.

**Access:** **Tools** → **Update Schematic from PCB** (in either the Schematic Editor or PCB Editor)

### What Gets Synchronized

Each type can be individually enabled (options below):

| Option | Effect |
|--------|--------|
| Re-link footprints to schematic symbols based on their reference designators | Incompatible with updating reference designators; generally leave unchecked |
| Reference designators | Symbol references follow linked footprints |
| Values | Symbol values follow footprints |
| Attributes | Attributes such as exclude from BOM and DNP follow footprints |
| Other fields | Other symbol fields follow footprints |
| Footprint assignments | Updates symbols whose footprints were changed or replaced |
| Net names | Adds or updates net labels to match board net names |
| Prefer symbol unit swaps over label swaps | Detected gate swaps are applied as unit swaps instead of label swaps |
| Prefer symbol pin swaps over label swaps | Pin swaps are applied in the symbol (requires Allow unconstrained pin swaps in Editing Options) |

### Process

1. Make changes in the PCB Editor (e.g., re-annotate components for layout convenience).
2. Use **Update Schematic from PCB** to reflect those changes in the schematic.
3. Review the **Changes To Be Applied** pane, then click **Update Schematic**; the schematic is not modified before that.

### Back Annotation with CMP Files

Footprint assignments and footprint fields only: export in the PCB Editor via **File** → **Export** → **Footprint Association (.cmp) File…**, import in the Schematic Editor via **File** → **Import** → **Footprint Assignments…**. The manual recommends Update Schematic from PCB instead.

## Notes

- The schematic is independent of the system symbol libraries. Symbols are embedded copies; library changes do not automatically update the schematic. Use **Update Symbol from Library** manually.
- Forward annotation preserves existing placement and routing unless options such as **Replace footprints**, **Delete footprints with no symbols**, or **Override locks** are enabled, or symbol identifiers changed (deleted and re-added symbols cause their footprints to be deleted and re-added, losing their positions; use re-link by reference designator). The blanket "non-destructive" claim is not found in the 10.0 manual.
- Corrected from the earlier page: the changes pane does not offer per-change accept / reject; checkboxes only show or hide message types and nothing is applied until **Update PCB** / **Update Schematic** is clicked.
- Always run ERC before forward annotation to avoid propagating errors to the PCB.

## Related

- [Assigning Footprints](./05-assigning-footprints.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
- [Generating Outputs](./07-generating-outputs.md)
