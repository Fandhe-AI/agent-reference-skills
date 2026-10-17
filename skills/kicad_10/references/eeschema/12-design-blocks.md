# Design Blocks

Design blocks are reusable schematic (and optionally PCB layout) fragments saved in a design block library and instantiated within one project or across projects.

## Design Block Concepts

A design block can contain a schematic fragment, a layout fragment, or both. Placing a schematic block inserts the fragment into the current sheet or into a new hierarchical subsheet.

**Placement modes:**

| Mode | Behavior |
|------|----------|
| Inline (no sheet) | Contents inserted directly into the current sheet |
| Place as sheet | Contents placed into a new hierarchical subsheet; the block's Default Fields become sheet fields |
| Place as group (either mode) | Wraps content in a group with a library link `<library>:<block>`; required for Save to Linked Design Block, Place Linked Design Block, and Apply Design Block Layout (PCB editor) |

Design blocks do not support nested hierarchical sheets; saving a sheet that contains subsheets is rejected.

**Library structure:** a library is a directory ending `.kicad_blocks`; each block is a subdirectory ending `.kicad_block` containing `<name>.kicad_sch` (if it has a schematic fragment), `<name>.kicad_pcb` (if it has a layout fragment), and `<name>.json` (description, keywords, default fields; always present).

## The Design Blocks Panel

Open via **View** → **Panels** → **Design Blocks** (docked on the right). It has:
- A filter textbox (name, description, keywords; **Sort Alphabetically** in the settings menu, default best match)
- A library tree with a **Recently Used** pseudo-library; right-click a library → **Pin Library**
- A preview area with name, description, keywords, and graphic

## Creating and Managing Design Blocks

### Managing Block Libraries

**Preferences** → **Manage Design Block Libraries…** manages the global and project library tables (same behavior as symbol and footprint library tables). Right-click in the library tree → **New Library…** creates a `.kicad_blocks` folder and registers it in the global or project table.

### Creating a Design Block

Select the source objects (or open the sheet), right-click the target library in the panel, then choose:
- **Save Current Sheet as Design Block…** — everything on the current sheet
- **Save Selection as Design Block…** — selected objects only (a single hierarchical sheet symbol saves that subsheet's contents; a selection is automatically grouped with a library link)

The **Design Block Properties** dialog sets Name (no `/ : ; \ | < > " * ?`), Keywords (space-separated), Description, and Default Fields (key/value pairs applied as sheet fields when placed as a sheet). Confirmation is requested before overwriting. Edit later via right-click → **Properties…**; delete with **Delete Design Block** (permanent; placed objects are unaffected).

### Updating a Design Block

All methods replace, not merge, the stored schematic:
- Select objects, then right-click the block → **Update Design Block from Selection**
- Open the sheet, then right-click the block → **Update Design Block from Current Sheet**
- Edit a linked group, then right-click the group → **Save to Linked Design Block**

Updating the library does not update previously placed instances.

## Using Design Blocks in a Schematic

Double-click a block in the panel, or right-click → **Place Design Block**. Placement options:

| Option | Effect |
|--------|--------|
| Place repeated copies | Placement restarts after each block; `Esc` or right-click → Cancel ends it |
| Place as group | Adds a group with the library link |
| Place as sheet | Click twice to define the sheet corners; contents go into a new hierarchical sheet |
| Keep annotations | Keeps saved reference designators; disable when placing several instances so they are re-annotated |

After placement the content consists of ordinary schematic objects. A manually created group can be linked retroactively: select the group, open Group Properties (right-click or `E`), enter `<library>:<block>` in **Library link**. To group the footprints in the PCB, use Update PCB from Schematic with **Group footprints based on symbol group**.

## Practical Workflows

**Power supply templates:** Draw and annotate the circuit, select it, right-click a library → **Save Selection as Design Block…**, then reuse in other projects with **Place as group** (and **Keep annotations** off to reassign references).

**Per-channel sheets:** Save a dedicated sheet with **Save Current Sheet as Design Block…**, add Default Fields (e.g. `GAIN_R` = `10k`), place with **Place as sheet**, and adjust the sheet fields per instance. All instances share one subsheet file, so **Update Design Block from Current Sheet** after edits updates every instance in the project.

## Notes

- Placed design blocks are independent copies of the content at placement time (unless placed as a repeated hierarchical sheet, which shares a subsheet file).
- The manual's multichannel tool can replicate a completed layout between groups without a stored layout fragment.
- Not found in the 10.0 manual (retained from the earlier page as unverified): a "Design Blocks vs. Hierarchical Sheets" comparison table, the "Interface connectors" and "Module standardization" workflow examples, and creating new empty libraries inside Manage Design Block Libraries (the manual uses **New Library…** in the panel's right-click menu).
- Not found in the 10.0 manual: a **View** → **Design Blocks** menu entry (the path is **View** → **Panels** → **Design Blocks**), a "Save as Design Block" entry under the **Tools** menu, drag-and-drop placement, and name-matching of labels inside a placed block to existing nets.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Multiple Sheets and Hierarchical Schematics](./03-multiple-sheets-and-hierarchical-schematics.md)
