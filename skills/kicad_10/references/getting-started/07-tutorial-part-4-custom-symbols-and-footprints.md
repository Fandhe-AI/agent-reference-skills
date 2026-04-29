# Tutorial Part 4: Custom Symbols and Footprints

This section covers creating custom symbols and footprints, and linking them together with 3D models.

## Library and Library Table Basics

KiCad stores symbols and footprints in separate libraries, each tracked in a **library table**.

| Table type | Scope |
|-----------|-------|
| Global library table | All projects |
| Project library table | Current project only |

Library tables support path substitution variables:

| Variable | Meaning |
|----------|---------|
| `${KIPRJMOD}` | Current project directory |

Manage library tables:
- Symbols: **Preferences** → **Manage Symbol Libraries**
- Footprints: **Preferences** → **Manage Footprint Libraries**
- Path variables: **Preferences** → **Configure Paths**

## Creating New Global or Project Libraries

### Symbol Library

1. Open the Symbol Editor from the Project Manager.
2. **File** → **New Library**.
3. Select **Add new library to project library table**.
4. Name the file (e.g., `getting-started.kicad_sym`) and save inside the project directory.

The library is automatically registered in the project's library table.

### Footprint Library

1. Open the Footprint Editor.
2. **File** → **New Library**.
3. Save as a `.pretty` folder inside the project directory.

## Creating New Symbols

### Steps

1. In the Symbol Editor, select the target library.
2. **File** → **New Symbol** — enter the part number as the symbol name.
3. Set the reference designator prefix (e.g., `SW` for switches).

### Adding Pins

- Use the **Add a pin** tool.
- Set pin name, number, electrical type, orientation, and exact coordinates.
- **Symbol pins must always be placed on a 50 mil grid.**
- Press **Insert** to add the next pin with auto-incremented numbering.

### Adding Graphics

- Use circle and line tools to draw the symbol body.
- A finer grid can be used for graphical elements, but pins must remain on 50 mil spacing.

### Symbol Properties

**File** → **Symbol Properties** — set `Value`, keywords, and other metadata to improve library searchability.

## Creating New Footprints

### Steps

1. Open the Footprint Editor.
2. Create or select a library.
3. **File** → **New Footprint** — set the footprint name and component type in properties.

### Adding Pads

- Use the **Add a pad** tool.
- Calculate pad size from physical dimensions:

```
Pad diameter = hole diameter + 2 × annular ring
Example: 1.62 mm hole → 1.62 + 2×0.15 = 1.92 mm pad diameter
```

- Place pads at their calculated positions; press **Escape** to exit pad placement mode.

### Outline Layers

| Layer | Purpose |
|-------|---------|
| `F.Fab` | Exact component dimensions (fabrication reference) |
| `F.Silkscreen` | Slightly larger outline for assembly |
| `F.Courtyard` | Surrounding boundary to prevent component overlap |

Custom grid configurations with unequal X/Y spacing and adjusted origins facilitate precise coordinate placement.

## Linking Symbols, Footprints, and 3D Models

### Symbol-Footprint Association

Set the default footprint in the symbol's `Footprint` field (**Symbol Properties**). This eliminates manual footprint selection during schematic annotation. Symbols can also define footprint filters to restrict compatible packages shown in the chooser.

### 3D Model Integration

Attach 3D models via **Footprint Properties** → **3D Models** tab:

- Supported formats: **STEP**, **VRML**
- Multiple models per footprint are supported
- Configurable per model: scale, rotation, offset, opacity
- Recommended tool for creating models: **FreeCAD** with the **StepUp Workbench**

## Notes

- `${KIPRJMOD}` enables project-portable library paths — use it for project-specific libraries.
- Pin placement on a 50 mil grid is mandatory; off-grid pins cause connection failures in schematics.

## Related

- [Tutorial Part 3: Circuit Board](./06-tutorial-part-3-circuit-board.md)
- [Where to Go From Here](./08-where-to-go-from-here.md)
