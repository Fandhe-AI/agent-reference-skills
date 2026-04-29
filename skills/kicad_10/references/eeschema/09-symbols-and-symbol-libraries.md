# Symbols and Symbol Libraries

Management and use of schematic symbols and their libraries.

## Managing Symbol Libraries

KiCad uses a **Symbol Library Table** to track libraries at two scopes:

| Scope | Location | Applies to |
|-------|----------|------------|
| Global | User configuration directory | All KiCad projects |
| Project | `<project>.kicad_sym` or table in project dir | Current project only |

Access the table via **Preferences** → **Manage Symbol Libraries**.

Key environment variables:
- `KICAD_SYMBOL_DIR` — default path to the official KiCad symbol library collection

### Adding a Library

1. Open **Manage Symbol Libraries**.
2. Click **Add** (folder icon for file-based libraries).
3. Set a **nickname** (used to reference symbols as `nickname:symbol_name`).
4. Set the **path** to the `.kicad_sym` file.
5. Choose **Global** or **Project** tab.

### Removing a Library

Select the library row and click **Remove**. Does not delete the file.

## Browsing Symbol Libraries

The **Symbol Chooser** (press **A** when placing symbols) provides:
- Search by name, keywords, description, and custom fields
- Wildcard (`*`, `?`), key-value (`Key>123`), and regex filtering
- Footprint preview
- Repeated placement mode

The **Symbol Library Panel** (left sidebar in Symbol Editor) shows a hierarchical tree of all loaded libraries.

## Symbol Editor Overview

Open via **Tools** → **Symbol Editor** or from the schematic editor's top menu.

The Symbol Editor interface includes:
- Library tree (left panel)
- Canvas (center) for drawing the symbol
- Properties panel
- Toolbar for add pin, add graphical elements, add field, etc.

## Browsing, Modifying, and Saving Symbols

- Double-click a symbol in the library tree to open it for editing.
- **Save** (Ctrl+S) saves to the current library file.
- **Save As** saves to a different library.
- Changes to a library symbol do NOT automatically update existing schematic instances. Use **Update Symbol from Library** in the schematic editor.

## Creating a New Symbol Library

**File** → **New Library** in the Symbol Editor. Choose **Global** or **Project** scope. A new `.kicad_sym` file is created and added to the library table.

## Creating a New Symbol

1. In the Symbol Editor, select a target library.
2. **File** → **New Symbol** (or right-click library → **New Symbol**).
3. Set the symbol name, reference prefix (e.g., `R`, `U`, `C`), number of units, and whether it has alternate body styles (De Morgan).
4. Draw the body graphics (rectangles, lines, etc.) and add pins.
5. Add required fields (Reference, Value, Footprint, Datasheet).
6. Save to the library.

## Editing Symbol Properties

Access via **Edit** → **Symbol Properties** or press **E** in the Symbol Editor.

| Property | Description |
|----------|-------------|
| Name | Symbol identifier within the library |
| Reference prefix | Default designator prefix (R, C, U, etc.) |
| Value | Default value string |
| Keywords | Space-separated search tags |
| Description | Human-readable description |
| Footprint filters | Restrict compatible footprints |
| Exclude from BOM / board / simulation | Attribute flags |

## Symbol Units and Alternate Body Styles

### Multiple Units

For multi-part components (e.g., dual op-amp):
- Define the number of units (parts A, B, C, ...)
- Each unit can have its own pin layout and graphics
- Pins can be shared across all units or unit-specific

### De Morgan (Alternate Body Style)

For logic gates: define both the standard and alternate (De Morgan equivalent) representations. Both styles share the same pin list.

## Symbol Graphics

| Element | Description |
|---------|-------------|
| Rectangle | Main symbol body |
| Circle | Round body shapes |
| Arc | Curved body elements |
| Line | Custom outlines |
| Bezier curve | Smooth curves |
| Text | Annotations on the body |

Graphics are visual only — no electrical significance.

## Symbol Pins

Each pin defines an electrical connection point.

### Pin Properties

| Property | Description |
|----------|-------------|
| Number | Unique pin identifier within the symbol (matches PCB footprint pad) |
| Name | Functional name (e.g., `VCC`, `DATA0`) |
| Electrical type | Determines ERC behavior (see table below) |
| Length | Physical length from body to connection end |
| Orientation | Direction (left, right, up, down) |
| Graphical style | Normal, inverted, clock, active-low clock, etc. |
| Visibility | Hidden pins do not display by default |

### Pin Electrical Types

| Type | Description |
|------|-------------|
| Input | Signal flows into pin |
| Output | Signal flows out of pin |
| Bidirectional | Signal flows both directions |
| Tri-state | Three-state output |
| Passive | Resistors, capacitors; no directional constraint |
| Free | No ERC checking |
| Unspecified | Unknown type |
| Power Input | Consumes power from a net |
| Power Output | Provides power to a net |
| Open Collector | Open-collector output |
| Open Emitter | Open-emitter output |
| No Connect | Pin should not be connected |

### Alternate Pin Functions

Pins can have multiple named functions. Alternate functions define a different name, electrical type, and graphical style selectable when the symbol is placed in a schematic.

## Symbol Fields

| Field | Required | Description |
|-------|----------|-------------|
| Reference | Yes | Designator (R, C, U + number) |
| Value | Yes | Component value or name |
| Footprint | Recommended | PCB footprint (`lib:name`) |
| Datasheet | Optional | URL or file path to datasheet |
| Custom fields | Optional | Manufacturer PN, specs, etc. — avoid `ki_` prefix |

Field visibility, position, font, and autoplacement are configurable per field.

## Footprint Filters

Define acceptable footprint names (wildcards supported) in symbol properties. The footprint chooser will only show matching footprints when assigning from within the symbol's properties.

## Jumper Pins

Jumper functionality can be modeled by placing two pins in a symbol with appropriate electrical types. The schematic editor treats them like any other connected pins.

## Embedding Files

Symbol definitions can embed associated files (e.g., datasheets) directly in the library file, making the design self-contained.

## Creating Power Symbols

A power symbol is a regular symbol where:
- The **Value** field determines the global net name
- The pin electrical type is **Power Input** or **Power Output**
- The symbol is typically a simple graphical indicator

Place power symbols with the Add Power Symbol tool, or in the symbol chooser under the `power` library.

## Creating Derived Symbols

A derived symbol inherits all properties from a parent symbol and overrides only specified attributes (value, footprint, description, etc.). Useful for creating component families from a single base symbol.

1. Select a parent symbol.
2. **File** → **Derive from Existing Symbol**.
3. Override the desired properties.
4. Save with a new name.

## Bulk Editing Symbol Fields

Use **Tools** → **Edit Symbol Fields** in the Schematic Editor for spreadsheet-style bulk editing of all fields across all symbols.

## Checking Symbols

**File** → **Check Symbol** in the Symbol Editor runs validation:
- Duplicate pin numbers
- Pins with no electrical type
- Missing required fields
- Invalid reference prefix

## Importing Symbols

**File** → **Import Symbol** supports importing symbols from other KiCad library files or from external formats.

## Notes

- Library nicknames must be unique within each scope (global or project). A project library with the same nickname as a global library overrides the global one.
- Symbol changes in the library do not retroactively update existing schematic instances. Run **Tools** → **Update Symbols from Library** in the schematic editor to sync.
- The `ki_` field prefix is reserved for KiCad internal use.

## Related

- [Creating and Editing Symbols](./10-creating-and-editing-symbols.md)
- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Assigning Footprints](./05-assigning-footprints.md)
