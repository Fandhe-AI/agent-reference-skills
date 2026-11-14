# Footprints and Footprint Libraries

Management of footprint libraries and the Footprint Library Browser. A footprint is identified by `<library nickname>:<footprint name>`, e.g. `Capacitor_SMD:C_0603_1608Metric`.

## Managing Footprint Libraries

Edit the library tables with **Preferences → Manage Footprint Libraries…**. Libraries are not loaded unless listed in a table.

| Scope | Description |
|-------|-------------|
| Global | Always available; saved as `fp-lib-table` in the KiCad configuration folder |
| Project | Specific to the loaded project; saved as `fp-lib-table` in the project folder (if any project libraries exist) |

Supported library formats (only `.pretty` can be written; others are read-only and must be converted):

- KiCad `.pretty` folders of `.kicad_mod` files
- KiCad Legacy (`.mod`)
- Altium Designer (`.PcbLib`, `.IntLib`)
- CADSTAR PCB Archive (`.cpa`)
- Eagle (`.lbr`)
- EasyEDA / JLCEDA Standard (`.json`, `.zip`) and Professional (`.elibz`, `.epro`, `.zip`)
- gEDA (folders of `.fp`)

Table entries:

| Item | Behavior |
|------|----------|
| Add / remove | Add via library chooser or path entry; remove selected entries. Nested tables are added by choosing the **Table** library type |
| Enable checkbox | Disabled libraries stay in the table but are not loaded and do not appear in browsers |
| Nickname | Unique within a table (may repeat across global and project; project takes precedence); may not contain `:` |
| Path | Absolute, relative, or with `${PATH_VAR_NAME}` substitution; `${KIPRJMOD}` expands to the project directory; `${KICAD9_FOOTPRINT_DIR}` resolves to `${KICAD10_FOOTPRINT_DIR}` if the old variable is undefined; paths configured in **Preferences → Configure Paths…** |
| Move up / down | Reorders the table only; does not change browser display order |
| Options | Field is not used at this time |
| Reset Libraries | Resets the table to the default (permanently changes the table on disk) |
| Migrate Libraries | Converts selected non-KiCad libraries to `.pretty` |

The default global table has one entry pointing to a nested table with all default KiCad footprint libraries, updated along with KiCad; do not edit it. Nested tables load as if listed directly in the parent table (useful for a shared company table). The GitHub library plugin was removed in KiCad 6.0.

## Browsing Footprint Libraries

The **Footprint Library Browser** opens from the main Board Editor toolbar icon or **View → Footprint Library Browser**. Select a library in the left pane, then a footprint in the second pane to view it. Double-clicking a footprint, or the toolbar add button, adds it to the board.

- Top toolbar: previous/next footprint, zoom tools, open in 3D Viewer, add footprint to board, automatic zoom to fit
- Left toolbar: selection, measure, grid toggle, polar/Cartesian, units, crosshair style, show/hide pad numbers, pad / text / graphic filled-outline display

## Notes

- Nicknames are used to reference footprints; see [05-editing-a-board.md](./05-editing-a-board.md) for the Add Footprint tool (`A`) and updating footprints from libraries
- Category tree, keyword search, and 2D/3D preview panes of the footprint chooser, and project- vs global-scope portability advice: not found in this section of the 10.0 manual

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
- [12-creating-and-editing-footprints.md](./12-creating-and-editing-footprints.md)
