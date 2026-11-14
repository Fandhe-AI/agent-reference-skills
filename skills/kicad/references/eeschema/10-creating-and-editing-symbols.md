# Creating and Editing Symbols

Step-by-step guide to using the KiCad Symbol Editor to create and modify symbols.

## Symbol Editor Overview

Open via **Tools** → **Symbol Editor** (Schematic Editor) or from the KiCad Project Manager.

### Interface

| Panel | Description |
|-------|-------------|
| Symbol tree, Properties Manager, selection filter (left) | Collapsible panels; tree lists loaded libraries and their symbols |
| Canvas (center) | Drawing area for symbol body and pins |
| Toolbars (top / left / right) | Top: undo, zoom, rotate, mirror, properties, Pin Table, datasheet, checker, body style and unit selectors, synchronized pin edit, insert into schematic. Left: display controls. Right: drawing tools |
| Message panel (bottom) | Details of the selected object |

### Right Toolbar Tools

| Tool | Description |
|------|-------------|
| Select | Right-click for context menu, double-click for properties |
| Pin | Place a new pin |
| Graphical text / textbox | Add text items |
| Rectangle / Circle / Arc / Bezier / Connected lines | Body graphics |
| Anchor | Set the symbol origin (0, 0) |
| Delete | Delete an object |

## Creating a New Symbol from Scratch

### Step 1: Create or Select a Library

- **File** → **New Library** to create a new `.kicad_sym` file, or
- Select an existing writable library in the tree

### Step 2: Add a New Symbol

- Click the new-symbol toolbar button (**File** → **New Symbol…**, `Ctrl+N`)
- Set:
  - **Symbol name**
  - Optional **base symbol** (derived symbol, same library)
  - **Reference prefix** (e.g., `R`, `C`, `U`, `J`)
  - **Number of units** and whether they are interchangeable
  - Alternate body style ("De Morgan" equivalent)
  - Power symbol, exclude from BOM, exclude from board, pin name offset and pin number / name visibility

### Step 3: Draw the Body

1. Use the Rectangle tool to draw the main body outline.
2. The blue cross is the symbol anchor (0, 0); move it with the Anchor tool if needed.
3. Add other graphical elements (circles, arcs, lines, polygons, text) as needed.

Use a **50 mil grid** for pin placement (the symbol checker flags off-grid pins).

### Step 4: Add Pins

Click the Pin tool (right toolbar, Draw Pins `P`); the Pin Properties dialog opens, then place the pin. Reopen it with `E` or double-click.

For each pin, configure:

| Property | Recommendation |
|----------|----------------|
| Name | Functional name (e.g., `VCC`, `IN+`); spaces become underscores; `~{FO}O` shows an overbar |
| Number | String matching the PCB pad number; spaces become underscores |
| Electrical type | Select appropriate type for ERC |
| X / Y position, Length, Orientation | Relative to the symbol anchor; orientation is the direction the pin extends |
| Name / Number text size | Display sizes |
| Graphical style | Normal, Inverted (bubble), Clock, etc. |
| Common to all units / body styles, Visible | Sharing and visibility |

Place pins so their connection end aligns to the 50 mil grid. The pin number must match the PCB footprint pad number. Use the Pin Table (toolbar button) for bulk edits, CSV / TSV import and export, and right-click **Push Pin Length / Name Size / Number Size** to apply to all pins. Stacked pins: several pins at one location, or one pin numbered `[1-3]` (KiCad 10.0; **Convert Stacked Pins** / **Explode Stacked Pin**).

### Step 5: Add Fields

Default fields (always present): **Reference**, **Value**, **Footprint**, **Datasheet**, **Description**.

Add custom fields for manufacturer part numbers, specifications, etc. (not starting with `ki_`). Field name templates (Schematic Editor Preferences or Schematic Setup) add empty fields on insert.

Configure field visibility and position so they do not overlap each other or the symbol body.

### Step 6: Set Symbol Properties

Click the symbol-properties toolbar button (or double-click an empty spot in the canvas):
- Set keywords for symbol chooser search
- Write a description
- Add footprint filters
- Set exclusion attributes (simulation, BOM, board, position files)

### Step 7: Save

Use the **Save** toolbar icon (saves all modified symbols in the library), or **File** → **Save As…** / **Save Copy As…** for a new name or library.

## Editing an Existing Symbol

1. Click the symbol in the library tree to open it.
2. Make changes (add/move/delete pins, modify graphics, edit fields).
3. Save.

To edit a symbol from within the schematic:
- Symbol Properties dialog **Edit Library Symbol…** (edits the library master; `Ctrl+Shift+E`)
- Symbol Properties dialog **Edit Symbol…**, or right-click → **Edit with Symbol Editor** (`Ctrl+E`) (edits only the schematic instance)

## Symbol Units (Multi-part Components)

For ICs with multiple independent functional units (e.g., dual op-amp, quad gate):

- Set **Number of Units** in the Units & Body Styles tab of Symbol Properties; **All units are interchangeable** enables Synchronized Pins Edit mode.
- Use the unit selection dropdown to switch units (named Unit A, Unit B, ... unless Unit Display Names are set).
- Pins are common to all units or unit-specific; set **Common to all units in symbol** in the pin (or graphic) properties.

## Alternate Body Styles

Choose in the Body Styles options of the Units & Body Styles tab: single, "Standard" plus "De Morgan", or custom named styles (several alternates since KiCad 10.0).

- Switch styles with the body style dropdown.
- Pins can be common to all body styles; graphics are typically per style.
- Example: AND gate (normal) vs. NOR gate (De Morgan equivalent).

## Pin Graphical Styles

| Style | Appearance | Usage |
|-------|------------|-------|
| Normal | Plain line | Standard signal |
| Inverted | Bubble at end | Active-low signal |
| Clock | Triangle at body | Clock input |
| Inverted clock | Bubble + triangle | Active-low clock |
| Input low | Angle at end | Active-low input (IEEE style) |
| Output low | Angle + hat | Active-low output |
| Edge clock | Double line | Edge-triggered clock |

## Symbol Validation

Run the symbol checker with the top-toolbar button:

| Check | Issue detected |
|-------|---------------|
| Off-grid pins | Position not a multiple of the current grid (50 mil recommended) |
| Duplicate pins | Duplicated pins |
| Graphical shapes | Issues such as zero-sized shapes |
| Reference prefix | Prefix ends with a number or `?` |
| Power symbols | Not a single unit, has alternate body styles, or lacks a single Power Output / visible Power Input pin |
| Hidden Power Input pins | In non-power symbols (implicit connections) |

## Saving and Distributing Symbols

- Save to a **project library** for design-specific symbols.
- Save to a **global library** for symbols used across multiple projects.
- **File** → **Export** → **Symbol…** to export a single symbol to a separate library file (not added to the library table).
- **File** → **Import** → **Symbol…** copies symbols from another KiCad library into the active library.

## Notes

- Use a 50 mil grid for pin connection points; off-grid pins are flagged by the checker and may not connect to wires in the schematic.
- The pin number must match the PCB footprint pad number for correct netlist generation.
- Derived symbols (**Derive from existing symbol…**) share the base symbol's graphics and pins and override metadata; edit the base symbol to change graphics or pins of the whole family.
- Corrected from the earlier page: the symbol checker is the top-toolbar button, not **Inspect** → **Electrical Rules** (that is the schematic ERC).
- Not found in the 10.0 manual: the Pin Graphical Styles table with names such as Input low / Output low / Edge clock, a standard pin length of 100 mil.

## Related

- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
