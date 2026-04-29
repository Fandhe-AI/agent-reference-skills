# Creating and Editing Symbols

Step-by-step guide to using the KiCad Symbol Editor to create and modify symbols.

## Symbol Editor Overview

Open via **Tools** → **Symbol Editor** (from the main KiCad window or Schematic Editor).

### Interface

| Panel | Description |
|-------|-------------|
| Library tree (left) | Hierarchical view of loaded libraries and their symbols |
| Canvas (center) | Drawing area for symbol body and pins |
| Toolbar (top/right) | Tools for adding pins, graphics, fields, and editing |
| Properties panel | Context-sensitive property editing |

### Key Toolbar Actions

| Tool | Description |
|------|-------------|
| Add Pin | Place a new pin on the symbol |
| Add Rectangle | Draw the symbol body |
| Add Line / Circle / Arc / Bezier | Additional body graphics |
| Add Field | Add a new symbol field |
| Edit Symbol Properties | Open the properties dialog |
| Check Symbol | Run symbol validation |

## Creating a New Symbol from Scratch

### Step 1: Create or Select a Library

- **File** → **New Library** to create a new `.kicad_sym` file, or
- Select an existing writable library in the tree

### Step 2: Add a New Symbol

- Right-click the library → **New Symbol**, or **File** → **New Symbol**
- Set:
  - **Symbol name** (must be unique within the library)
  - **Reference prefix** (e.g., `R`, `C`, `U`, `J`)
  - **Number of units** (default: 1)
  - **Has alternate body style (De Morgan)**: check if you need two body representations

### Step 3: Draw the Body

1. Use the **Add Rectangle** tool to draw the main body outline.
2. Center the body on the origin (the crosshair at 0, 0).
3. Add other graphical elements (circles, arcs, lines) as needed.

Body graphics are at 0 mil grid for fine positioning. Use **50 mil grid** for pin placement.

### Step 4: Add Pins

Click **Add Pin** or press **P**.

For each pin, configure:

| Property | Recommendation |
|----------|----------------|
| Name | Functional name (e.g., `VCC`, `IN+`, `DATA[0]`) |
| Number | Unique identifier matching PCB pad number |
| Electrical type | Select appropriate type for ERC |
| Length | 100 mil (standard) |
| Orientation | Point outward from body |
| Graphical style | Normal, Inverted (bubble), Clock, etc. |

Place pins so their **connection end** (the end away from the body) aligns to the 50 mil grid. The pin number must match the PCB footprint pad number exactly.

### Step 5: Add Fields

Required fields: **Reference**, **Value**, **Footprint**, **Datasheet**.

Add custom fields for manufacturer part numbers, specifications, etc.

Configure field visibility and position so they do not overlap each other or the symbol body.

### Step 6: Set Symbol Properties

**Edit** → **Symbol Properties**:
- Set keywords for symbol chooser search
- Write a description
- Add footprint filters
- Set exclusion attributes (BOM, board, simulation)

### Step 7: Save

**File** → **Save** (Ctrl+S) to save to the current library.

## Editing an Existing Symbol

1. Browse to the symbol in the library tree and double-click to open.
2. Make changes (add/move/delete pins, modify graphics, edit fields).
3. Save.

To edit a symbol from within the schematic:
- Right-click → **Edit Library Symbol…** (edits the library master)
- Right-click → **Edit Symbol…** (edits only the schematic instance)

## Symbol Units (Multi-part Components)

For ICs with multiple independent functional units (e.g., dual op-amp, quad gate):

- Set **Number of units** in symbol creation.
- In the canvas, a unit selector appears (A, B, C, ...).
- Draw pins and graphics per unit. Shared pins (VCC, GND) can be set to appear in all units.
- Pin sharing: set a pin as **Common to all units** to have it appear on every unit.

## Alternate Body Style (De Morgan)

Enable with **Has alternate body style** checkbox.

- In the canvas, toggle between Normal and Alternate style using the toolbar.
- Draw different body graphics for each style (same pins, different visual representation).
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

**File** → **Check Symbol** (or **Inspect** → **Electrical Rules**):

| Check | Issue detected |
|-------|---------------|
| Duplicate pin numbers | Two pins with the same number |
| Missing pin names | Unnamed pins |
| No electrical type | Pin type set to Unspecified |
| Reference prefix missing | Empty reference prefix |
| Overlapping pins | Pins at identical positions |

## Saving and Distributing Symbols

- Save to a **project library** for design-specific symbols.
- Save to a **global library** for symbols used across multiple projects.
- **File** → **Export** → **Symbol** to export a single symbol to a separate file for sharing.

## Notes

- Always use 50 mil grid for pin connection points; misaligned pins will not connect to wires in the schematic.
- The pin number must exactly match the PCB footprint pad number for correct netlist generation.
- Derived symbols (created with **Derive from Existing Symbol**) inherit parent properties and only override specified attributes — changes to the parent propagate to derived symbols.

## Related

- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
