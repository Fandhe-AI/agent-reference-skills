# Design Blocks

Save part of a schematic and/or layout and reuse it within a project or across projects. Design blocks live in design block libraries (like symbols and footprints). A block can contain a schematic fragment, a layout fragment, or both.

- Instantiating a schematic block inserts the fragment into the current sheet or a new subsheet
- Instantiating a layout block adds the board fragment to the board directly
- With both fragments, the saved layout can be applied to the footprints that correspond to the schematic fragment's symbols
- Blocks are usually created as a schematic fragment first, with layout added later

Open the **Design Blocks** panel with **View → Panels → Design Blocks** (close via the same menu, the panel close button, or right-click → **Hide Library Tree**).

## Creating and Managing Design Blocks

**Library:** right-click in the library tree → **New Library…**; saved as a folder `<name>.kicad_blocks`, added to the global or project design block library table. Tables are managed in **Preferences → Manage Design Block Libraries…** (same behavior as symbol/footprint tables).

**New design block (PCB Editor):** select the objects (or use the whole board), right-click the target library → **Save Board as Design Block…** or **Save Selection as Design Block…**. To add a layout to an existing block (even one with only a schematic), update it instead of creating a new one.

Design Block Properties:

| Field | Description |
|-------|-------------|
| Name | Shown in the library tree and preview; used in filtering; default name of the group or sheet when placed |
| Keywords | Space-separated; shown in the preview and used in filtering |
| Description | Shown in the tree and preview; used in filtering |
| Default Fields | Key/value pairs added as hierarchical sheet fields when placed as a sheet; ignored otherwise |

Edit later via right-click → **Properties…**.

**Updating a block:**
- Place the block (if it has no layout: place it in the schematic, Update PCB from Schematic, then edit the layout), edit it, select the elements, right-click the block → **Update Design Block from Selection** (replaces its contents)
- **Update Design Block from Board** replaces the contents with everything in the board
- For a block placed as a group: right-click the group → **Save to Linked Design Block**

## Using Design Blocks in a Board

**Directly placing a layout block** (no schematic correspondence, e.g. a mounting-hole pattern): in the Design Blocks panel, double-click a block or right-click → **Place Design Block** (`Shift+B` adds the selected block). The tree has a Recently Used pseudo-library and **Pin Library**; the filter box matches name, description, and keywords (sort by best match or **Sort Alphabetically**).

| Placement option | Description |
|------------------|-------------|
| Place repeated copies | Starts placing again after each block; `Esc` or right-click → Cancel ends |
| Place as group | Adds contents to a group whose library link points to the source block; required for some features |
| Keep annotations | Keeps saved footprint annotations; otherwise they are cleared on insert |

**Applying a layout to footprints from a schematic** (multichannel is an alternative):
1. Create a block with both schematic and layout fragments
2. Add it to the schematic **as a group**
3. Update PCB from Schematic with **Group footprints based on symbol group** enabled
4. In the PCB Editor, select the footprint group, right-click → **Apply Design Block Layout** (arranges footprints, draws tracks, adds graphics/text, all added to the group)

## Grouped Design Blocks

Grouped blocks enable (the block must be grouped in both schematic and PCB to apply a layout):
- **Place Linked Design Block** (right-click the group) for additional instances
- **Save to Linked Design Block** to update the library version from the PCB
- Copying the schematic group to the PCB group via Update PCB from Schematic
- **Apply Design Block Layout** on the grouped footprints

To group an already-placed block, group exactly its contents and set the group's Library link to `<library>:<block>` (e.g. `amplifiers:inverting_amplifier`). Alternative: place the block as a group in the schematic, lay out one group, and use the multichannel tool to repeat it.

## Notes

- Drag-and-drop placement of a block: not found in the 10.0 manual (double-click or **Place Design Block**)
- Updating a block does not automatically change already-placed instances, and design-block net handling: not stated in the 10.0 manual
- Cross-project reuse vs. same-board channel duplication: the manual presents multichannel layout as an alternative workflow for reusing layout within a project

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [13-multichannel-layout.md](./13-multichannel-layout.md)
- [11-footprints-and-footprint-libraries.md](./11-footprints-and-footprint-libraries.md)
