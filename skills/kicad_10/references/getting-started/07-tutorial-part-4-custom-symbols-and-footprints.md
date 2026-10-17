# Tutorial Part 4: Custom Symbols and Footprints

This section covers creating custom symbols and footprints, and linking them together with 3D models.

## Library and Library Table Basics

KiCad stores symbols and footprints in separate libraries (a library holds symbols or footprints, not both), each tracked in a **library table** (library names and on-disk locations). Library tables can include other library tables. The tutorial's example part is an NKK M2011S3A1W03 SPST toggle switch.

| Table type | Scope |
|-----------|-------|
| Global library table | All projects |
| Project library table | Current project only |

Library tables support path substitution variables:

| Variable | Meaning |
|----------|---------|
| `${KIPRJMOD}` | Current project directory |

Manage library tables:
- Symbols: **Preferences** → **Manage Symbol Libraries…** (Schematic Editor or Symbol Editor)
- Footprints: **Preferences** → **Manage Footprint Libraries…** (Board Editor or Footprint Editor)
- Both tables are also reachable from the Project Manager
- Path variables: **Preferences** → **Configure Paths…** (Project Manager or any editor)
- The **Reset Libraries** button in the library table dialog resets libraries to default

## Creating New Global or Project Libraries

### Symbol Library

1. Open the Symbol Editor from the Project Manager.
2. **File** → **New Library**.
3. Select **Add new library to project library table**.
4. Name the file (e.g., `getting-started.kicad_sym`) and save inside the project directory.

The library is automatically registered in the project's library table (see the Project Specific Libraries tab in Preferences → Manage Symbol Libraries…).

### Footprint Library

1. Open the Footprint Editor.
2. **File** → **New Library…**.
3. Select **Add new library to project library table**.
4. Name it (e.g. `getting-started.pretty`) and save inside the project directory.

## Creating New Symbols

### Steps

1. In the Symbol Editor, select the target library.
2. **File** → **New Symbol…** — enter the part number (`M2011S3A1W03`) as the Symbol name.
3. Set the Default reference designator to `SW` (switches) and uncheck **Show pin name text**; leave other fields at defaults.

### Adding Pins

- Use the **Add a pin** tool; the Pin Properties dialog sets name, number, electrical type, orientation, and X/Y position. Tutorial pin 2: name `A`, Passive, orientation Right, X -200 mils, Y 0; pin 3: name `B`, X 200 mils, Y 0, orientation Left.
- **Symbol pins must always be placed on a 50 mil (1.27 mm) grid.** Use mils (or inches) in the Schematic and Symbol Editors; mixing units prevents pins from connecting to KiCad's built-in symbols.
- Press **Insert** to repeat the last action; a new pin with an incremented number is added just below the previous one.
- The Properties Panel (docked left of the canvas; toggle with the left-toolbar button) edits the selected object in every KiCad editor.

### Adding Graphics

- Use circle and line tools to draw the symbol body.
- A finer grid can be used for graphical elements, but pins must remain on 50 mil spacing.

### Symbol Properties

**File** → **Symbol Properties** (or double-click the canvas) — set `Value` (`M2011S3A1W03`) and the Keyword field (`spst switch toggle`) to make the symbol searchable.

## Creating New Footprints

### Steps

1. Open the Footprint Editor.
2. Create or select a library.
3. **File** → **New Footprint** — creates an empty untitled footprint; in its properties set Footprint name and Value to `Switch_Toggle_SPST_NKK_M2011S3A1x03` and Component type to Through hole.

### Adding Pads

- Use the **Add a pad** tool.
- Calculate pad size from physical dimensions:

```
Pad diameter = hole diameter + 2 × annular ring
Example: 1.62 mm hole → 1.62 + 2×0.15 = 1.92 mm pad diameter
```

- Tutorial pads: pin numbers 2 and 3 at (0, 4.7 mm) and (0, 9.4 mm) (positive Y points down); circular; hole 1.62 mm (pin diagonal 1.42 mm + 0.2 mm); pad diameter later increased to 2.22 mm (1.62 + 2×0.3 mm annular ring; the field accepts expressions such as `1.62+2*0.3`). The hole size is unchanged.
- The next pad copies properties from the previous one and increments the number. **Push Pad Properties to Other Pads…** → **Change Pads on Current Footprint** propagates edits.
- Press **Escape** to exit pad placement mode.

### Outline Layers

| Layer | Purpose |
|-------|---------|
| `F.Fab` | Exact component dimensions (fabrication reference) |
| `F.Silkscreen` | Slightly larger outline (tutorial: 0.11 mm outside the fab lines, line width 0.12 mm) |
| `F.Courtyard` | Surrounding boundary to prevent component overlap (tutorial: 0.25 mm clearance; corners (-4.2, -2.05) and (4.2, 11.45)) |

The tutorial part is 7.9 mm wide and 13 mm tall (fab outline). With the rectangle tool, the line mode must be free-angle (cycle with Shift+Space) or only squares can be drawn.

Custom grid configurations with unequal X/Y spacing and adjusted origins facilitate precise coordinate placement.

## Linking Symbols, Footprints, and 3D Models

### Symbol-Footprint Association

Set the default footprint in the symbol's `Footprint` field (**Symbol Properties**; click the field, then the library book icon). Symbols with a preselected footprint need no manual assignment (it can still be overridden during footprint assignment). Symbols can also define footprint filters (e.g. 74HC00 shows only DIP and SO14 footprints) to hide incompatible footprints; see the KiCad Library Conventions (KLC), which official-library symbols and footprints must follow.

### 3D Model Integration

Attach 3D models via **Footprint Properties** → **3D Models** tab:

- Supported formats: **STEP** (`.step`, dimensional accuracy; library models are STEP) and **VRML** (`.wrl`, more attractive renders)
- Any number of models per footprint; the model filename is stored in the footprint (all library footprints list one even if the model does not exist)
- Configurable per model: filename, scale, rotation, offset, opacity
- Recommended tool for creating models: **FreeCAD** with the **StepUp Workbench**

## Notes

- `${KIPRJMOD}` enables project-portable library paths — use it for project-specific libraries.
- Pin placement on a 50 mil grid is mandatory; off-grid pins cause connection failures in schematics.

## Related

- [Tutorial Part 3: Circuit Board](./06-tutorial-part-3-circuit-board.md)
- [Where to Go From Here](./08-where-to-go-from-here.md)
