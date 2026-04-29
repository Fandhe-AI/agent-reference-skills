# Multiple Sheets and Hierarchical Schematics

KiCad organizes multi-sheet designs through three hierarchical structures: flat hierarchies, simple hierarchies, and complex hierarchies (where sheets are reused multiple times).

## Hierarchy Types

| Type | Description |
|------|-------------|
| Flat hierarchy | Multiple sheets with no explicit parent-child relationship |
| Simple hierarchy | Each subsheet is used exactly once |
| Complex hierarchy | A subsheet is instantiated multiple times from different parent sheets |

## Adding Top-Level Sheets

Each sheet is an independent `.kicad_sch` file. Multiple root-level sheets can exist in a project. There is no explicit connection between top-level sheets; they share global nets only via global labels and power symbols.

## Adding Hierarchical Subsheets

Use the **Add Hierarchical Subsheet** tool from the right toolbar. When placing a subsheet, specify the filename for the sheet file. The placed subsheet appears as a rectangle on the parent sheet.

## Sheet Pins and Hierarchical Labels

**Hierarchical labels** (created inside a subsheet) expose signals at the sheet boundary. They visually indicate signal direction (Input, Output, Bidirectional, Tri-state, Passive).

**Hierarchical sheet pins** appear on the parent sheet's subsheet symbol. Each pin corresponds to a hierarchical label in the child sheet.

### Syncing Pins and Labels

Use the **Sync Hierarchical Sheet Pins and Hierarchical Labels** tool to manage correspondence. It shows all hierarchical labels in each subsheet and lets you add, remove, or update pins accordingly.

## Navigating Between Sheets

The **Hierarchy Navigator** panel (toolbar icon or View menu) shows a tree of all sheets. Double-click a sheet to open it. You can also use the breadcrumb trail at the top of the canvas to navigate up to a parent sheet.

## Electrical Connections Between Sheets

Three mechanisms establish cross-sheet connectivity:

| Mechanism | Scope | Usage |
|-----------|-------|-------|
| Hierarchical labels + sheet pins | Parent ↔ child sheet | Used for explicit hierarchical connections |
| Global labels | Entire schematic | Same label name connects anywhere |
| Power symbols | Entire schematic | Same Value connects anywhere |

### Hierarchical Label Workflow

1. In the child sheet, add hierarchical labels for signals crossing the boundary.
2. In the parent sheet, use **Sync Sheet Pins** to import those labels as sheet pins.
3. Connect wires or labels to the sheet pins on the parent sheet.

## Notes

- A subsheet in a complex hierarchy (used more than once) generates separate net names per instance; each instance is electrically independent unless connected via global labels or power symbols.
- Global labels take highest priority in net naming. Prefer hierarchical labels for signals that should remain local to the hierarchy.
- Sheet pin shapes should match the corresponding hierarchical label shapes for clarity, though this is not enforced electrically.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
