# Multiple Sheets and Hierarchical Schematics

KiCad organizes multi-sheet designs through three hierarchical structures: flat hierarchies, simple hierarchies, and complex hierarchies (where sheets are reused multiple times).

## Hierarchy Types

| Type | Description |
|------|-------------|
| Flat hierarchy | Multiple sheets with no explicit parent-child relationship |
| Simple hierarchy | Each subsheet is used exactly once |
| Complex hierarchy | A subsheet file is used more than once (e.g. several sheet symbols referencing the same file) |

## Adding Top-Level Sheets

Each sheet is an independent `.kicad_sch` file. Since KiCad 10.0 a schematic can have multiple top-level sheets (earlier versions allowed one root). Top-level sheets are not shown as sheet symbols and cannot use hierarchical connections; they connect only via global labels and global power symbols.

Create one by right-clicking in the Schematic Hierarchy panel (**View** → **Panels** → **Hierarchy Navigator**) → **New Top-Level Sheet**; right-click a sheet there for **Edit Page Number** or **Rename**.

## Adding Hierarchical Subsheets

Use the **Add Hierarchical Sheet** tool (`S`, right toolbar): click twice (or drag) for the upper-left and lower-right corners. The **Sheet Properties** dialog then asks for the sheet name (unique; part of full net names such as `/sheet1/net1`) and the sheet file (relative or absolute path), plus page number, attributes (Exclude from simulation / bill of materials / board, Do not populate; inherited by all symbols in the sheet), border and fill graphics, and custom fields. Reopen with `E` or right-click → **Properties…**. Reusing an existing file instantiates the same sheet multiple times; only reference designators differ. Dragging a selection onto a sheet symbol moves it into the child sheet.

## Sheet Pins and Hierarchical Labels

**Hierarchical labels** (created inside a subsheet) expose signals at the sheet boundary. They visually indicate signal direction (Input, Output, Bidirectional, Tri-state, Passive).

**Hierarchical sheet pins** appear on the parent sheet's subsheet symbol. Each pin corresponds to a hierarchical label in the child sheet.

### Syncing Pins and Labels

Use the **Sync Sheet Pins** tool (right toolbar, **Place** → **Sync Sheet Pins**, or right-click a sheet symbol → **Sync Sheet Pins**). It has a tab per hierarchical sheet with three columns: unmatched sheet pins, unmatched hierarchical labels, and matched pairs. Buttons: Add Hierarchical Labels, Delete Sheet Pins, Add Sheet Pins, Delete Hierarchical Labels, plus rename-to-match and unmatch buttons. Pins and labels match when name and shape are equal. Changes apply immediately; use Undo to cancel. Alternatively, the sheet pin tool (right toolbar) or right-click → **Place Sheet Pin** attaches a pin for each unmatched hierarchical label.

Sheet pin shape (Input, Output, Bidirectional, Tri-state, Passive) has no electrical effect; the name must match the label. Edit via `E`, double-click, or **Properties…**.

## Navigating Between Sheets

Double-click a sheet symbol or right-click → **Enter Sheet** to enter it; use the top-toolbar button or right-click empty space → **Leave Sheet** to return. Next / previous sheet buttons are on the top toolbar. The **Hierarchy Navigator** (left-toolbar button, **View** → **Panels** → **Hierarchy Navigator**) shows a tree of all sheets; click a sheet to open it.

## Electrical Connections Between Sheets

Three mechanisms establish cross-sheet connectivity:

| Mechanism | Scope | Usage |
|-----------|-------|-------|
| Hierarchical labels + sheet pins | Parent ↔ child sheet | Used for explicit hierarchical connections |
| Global labels | Entire schematic | Same label name connects anywhere |
| Global power symbols | Entire schematic | Same Value connects anywhere (local power symbols do not cross sheets) |

### Hierarchical Label Workflow

1. In the child sheet, add hierarchical labels for signals crossing the boundary.
2. In the parent sheet, import those labels as sheet pins (sheet pin tool, **Place Sheet Pin**, or **Sync Sheet Pins**); labels must exist in the subsheet first.
3. Connect wires or labels to the sheet pins on the parent sheet.

## Notes

- A subsheet in a complex hierarchy (used more than once) generates separate net names per instance; each instance is electrically independent unless connected via global labels or global power symbols.
- Global labels take highest priority in net naming. Prefer hierarchical labels for signals that should remain local to the hierarchy.
- Sheet pin shapes have no electrical effect, but the Sync Sheet Pins dialog treats a pin and label as matching only when name and shape are the same.
- Net name priority (highest first): global labels, power symbols, local labels, hierarchical labels, sheet pins (Output above Input).
- Local power symbols (KiCad 10.0, per the Introduction manual) do not connect between sheets; the Schematic Editor manual's wording "global power symbols" is used here.
- Not found in the 10.0 manual: a breadcrumb trail at the top of the canvas, and an "Add Hierarchical Subsheet" tool name (the manual's prose says **Add Hierarchical Sheet**; the action reference calls it **Draw Hierarchical Sheets**).

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
