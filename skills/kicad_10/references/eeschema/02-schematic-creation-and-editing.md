# Schematic Creation and Editing

Complete workflow for creating and editing schematics: symbol placement, electrical connections, annotation, and design configuration.

## Schematic Editing Operations

The right toolbar contains primary editing tools. Tools stay active until you press Escape or select another tool. Key tools:

- **Selection tool** — default mode
- **Add Symbol** (A) — open symbol chooser
- **Add Power Symbol** — place power connections
- **Add Wire** (W) — draw wire connections
- **Add Bus** — draw buses and wire-to-bus entries
- **Add Label / Global Label / Hierarchical Label** — place nets labels
- **Add Junction** — connect crossing wires
- **Add No-Connect Flag** — mark intentionally unconnected pins
- **Add Text / Text Box** — annotations
- **Add Hierarchical Subsheet** — multi-sheet organization
- **Interactive Delete** — remove clicked items

## Grids and Snapping

- Standard grid: **50 mil (0.050" / 1.27 mm)** — required for symbol pin compatibility
- Smaller grids are suitable only for text and graphics, not pins/wires
- Snapping also occurs to connected objects (pins, existing wires) even when grid snap is off

| Modifier | Effect |
|----------|--------|
| Ctrl | Disable grid snapping |
| Shift | Disable connected-object snapping |

Configure grid via right-click menu or **Preferences** → **Grids** pane. Grid overrides per object type are toggled via the left toolbar button.

## Editing Object Properties

### Properties Dialog

All schematic objects have editable properties accessible via:
- Press **E** — opens the Properties dialog for the selected object
- Right-click → **Properties** — same as above

Only one object type can be edited at a time via the Properties dialog. Symbol properties additionally restrict editing to a single instance.

### Properties Manager

A docked panel for real-time editing of multiple selected items (including mixed types). Access via **View → Panels → Properties** or the properties button on the left toolbar.

- When multiple object types are selected, only shared properties appear
- Changes apply immediately and individually (e.g., rotating multiple objects rotates each around its own center)

### Math Expressions in Numeric Fields

Numeric fields in all dialogs accept basic mathematical expressions:

```
2 * 2mm     → 4mm
1in + 1mm   → 26.4mm
```

Supports `+`, `-`, `*`, `/`, parentheses, and unit suffixes with automatic conversion.

## Working with Symbols

### Placing Symbols

Press **A** or click the add-symbol button. The chooser dialog filters by name, keywords, description, and custom fields.

Filtering syntax:
- Wildcards: `*` (any chars), `?` (single char)
- Key-value: `Key>123`, `Key<123` with metric suffixes
- Regex: wxWidgets Advanced Regular Expression style

After selection, the symbol attaches to the cursor. Before placing: rotate, mirror, and edit fields via hotkeys or right-click menu.

### Symbol Properties (E or double-click)

Fields are shown in a table. Reserved field name prefix: `ki_` (do not use).

| Field | Description |
|-------|-------------|
| Reference | Designator (R1, U3, etc.) |
| Value | Component value or type |
| Footprint | PCB footprint (`library:footprint_name`) |
| Datasheet | URL or file path; supports embedding |

**Symbol Attributes:**
- Exclude from simulation
- Exclude from bill of materials
- Exclude from board
- Do Not Populate (DNP)

### Editing Symbol Definitions

- **Edit Symbol…** — opens the schematic instance only (affects this copy)
- **Edit Library Symbol…** — opens the library master (does not update existing instances)
- **Update Symbol from Library…** — syncs instance with library
- **Change Symbol…** — swap to a different symbol

### Alternate Pin Functions

Access the **Pin Functions** tab in Symbol Properties. Right-click a pin for the **Pin Function** context menu.

## Reference Designators and Annotation

Reference designators consist of a type letter + number (e.g., R1, C5, U10). Multi-unit symbols append a trailing letter (U1A, U1B).

### Auto-Annotation

Enable via **Preferences** → **Schematic Editor** → **Editing Options** or the toolbar toggle.

Configure in **Schematic Setup** → **Annotation**:
- **Order**: Sort by X or Y position
- **Numbering**: Lowest available or sheet-number-based
- **Allow reference reuse**: Permit reassigning numbers

### Annotation Tool (top toolbar)

Options:
- **Scope**: Entire schematic, current sheet, or selection
- **Recurse into subsheets**: Include child sheets
- **Options**: All symbols or unannotated only; reset symbol units
- **Order**: Left-to-right (X) or top-to-bottom (Y)

## Electrical Connections

Connections are called **nets** (circuit nodes). All pins on the same net are electrically connected. Two methods:
1. **Wires** — direct physical connection
2. **Labels** — connection by matching name

### Net Name Priority

When multiple labels share a net, the name is determined by priority:

1. Global labels
2. Power symbols
3. Local labels
4. Hierarchical labels
5. Hierarchical sheet pins

Within each level, alphabetically first name wins.

## Wires

Press **W** to draw wires. Only wire ends create connections — crossing wires without a junction do not connect.

Angle modes (cycle with Shift+Space):
- Free angle
- 90-degree
- 45-degree

Key operations:
- **Move**: Repositions wire without maintaining connections
- **Drag**: Repositions while keeping connections
- **Ctrl+4**: Select all connected wire segments
- Right-click → **Slice**: Separate at cursor
- Right-click → **Break**: Disconnect from adjacent segments

Wire properties (press E on selected wire): width, color, line style (solid/dashed/dotted/etc.), junction size. Set to `0` / clear / `Default` to inherit net class settings.

### Junctions

Required where crossing wires should connect. Auto-created when a wire starts or ends on an existing wire. Size configured in **Schematic Setup** → **General** → **Formatting**.

### Wire Hop-Overs

Visual indicator for non-connected crossings. Configure hop-over size in **Schematic Setup** → **Formatting**.

## Labels

### Types

| Type | Scope | Hotkey / Button |
|------|-------|-----------------|
| Local label | Same sheet only | L |
| Global label | Entire schematic | Ctrl+L |
| Hierarchical label | Connects to parent sheet pins | — |

### Label Properties

- **Label name**: Supports markup (overbars, subscripts), variable substitution
- **Shape** (global/hierarchical): Input, Output, Bidirectional, Tri-state, Passive
- **Multiple label input mode**: Place several labels in sequence
- **Font, size, color, orientation**

### Inter-Sheet References

Global labels can show page numbers of matching labels elsewhere. Configure in **Schematic Setup** → **Formatting** (optional prefix/suffix). Click a reference to navigate.

## Buses

Buses group related signals. Draw with the bus tool.

### Vector Buses

Syntax: `<PREFIX>[M..N]`

```
DATA[0..7]   → DATA0, DATA1, ..., DATA7
```

Rules: Non-negative integers; `M` and `N` may be in any order.

### Group Buses

Syntax: `<OPTIONAL_NAME>{SIGNAL1 SIGNAL2 ...}`

```
USB1{DP DM}        → USB1.DP, USB1.DM
{SCL SDA}          → SCL, SDA
MEMORY{A[7..0] D[7..0] OE WE}   → MEMORY.A7, ..., MEMORY.OE, ...
```

Spaces in names: use backslash or quotes:
```
"DATA BUS"[0..7]
"DATA BUS"{"SIGNAL 1" "SIGNAL 2"}
```

### Bus Connections

Connect pins to bus members using **labels** (not direct wires). Bus entries (45° segments) are graphical only. Use right-click → **Unfold from Bus** (hotkey **C**) to extract individual signals.

### Bus Aliases

Define in **Schematic Setup** → **Bus Alias Definitions**. Example: alias `USB` = `{DP DM VBUS}`, then use `{USB}` or `USB1{USB}` in labels.

## Power Symbols

Power symbols represent global nets (VCC, GND, etc.). The **Value** field determines the net name. Two power symbols with the same value connect anywhere in the schematic regardless of sheet.

**PWR_FLAG**: Add to nets that connect to a power source to prevent ERC warnings about undriven power input pins.

**Hidden power pins**: Legacy feature — invisible Power Input pins that implicitly connect to global nets by name. Enable visibility via **Preferences** → **Display Options** → **Show hidden pins**.

## No-Connection Flags

Mark intentionally unconnected pins with the no-connect tool (X marker) to suppress ERC warnings. Stacked pins with no-connect flags get separate nets.

## Net Classes

Group nets for PCB design rules and schematic graphical properties. Create/edit in **Schematic Setup** or **Board Setup**.

Assignment methods:
- Pattern-based matching
- Graphical net class directives
- Net class fields on labels

Multiple net classes can apply to one net; `Default` class is the fallback. The resolved net class appears in the status bar when a wire or label is selected.

## Component Classes

Group symbols for PCB layout rules. Assign via graphical markers or symbol field filtering.

## Rule Areas

Apply local design rules to enclosed schematic elements. Right-click → **Add Rule Area**, then configure rules within the boundary.

## Graphics and Text

| Element | Hotkey | Notes |
|---------|--------|-------|
| Text | T | Supports markup, variables, font/color |
| Text Box | — | Bordered text region |
| Rectangle | — | Graphical only |
| Circle | — | Graphical only |
| Arc | — | Graphical only |
| Bezier curve | — | Graphical only |
| Line segment | — | Graphical only |
| Table | — | Structured data display |
| Bitmap image | — | Documentation/reference |

Graphical elements do not create electrical connections.

## Groups

Select objects → right-click → **Group**. Groups move, rotate, and delete as a unit.

## Aligning Objects

Select multiple objects → **Align** tools for left/right/top/bottom/center alignment and horizontal/vertical distribution.

## Schematic Setup

Access via **File** → **Schematic Setup**:

| Tab | Contents |
|-----|----------|
| General | Sheet size, title block, formatting |
| Formatting | Grid, junction dots, text sizes, margins, inter-sheet references |
| Annotation | Auto-annotation behavior, numbering style |
| Net Classes | Net class names and properties |
| Component Classes | Component class groups |
| Bus Aliases | Shortcuts for bus definitions |
| Text Variables | Project-wide substitution variables |

## Notes

- Use 50 mil grid for all pins and wires to ensure compatibility with the KiCad standard symbol library
- Wires connect only at endpoints — crossing wires require an explicit junction to connect
- The `ki_` field name prefix is reserved by KiCad

## Related

- [Introduction](./01-introduction.md)
- [Multiple Sheets and Hierarchical Schematics](./03-multiple-sheets-and-hierarchical-schematics.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
