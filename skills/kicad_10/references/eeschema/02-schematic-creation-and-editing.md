# Schematic Creation and Editing

Complete workflow for creating and editing schematics: symbol placement, electrical connections, annotation, and design configuration.

## Schematic Editing Operations

The right toolbar contains primary editing tools. Tools stay active until you press Escape or select another tool. Key tools:

- **Selection tool** — default mode
- **Highlight Net** (`` ` ``) — highlight a net; clear with `~`
- **Place Symbols** (A) — open symbol chooser
- **Place Power Symbols** (P) — place power connections
- **Draw Wires** (W) — draw wire connections
- **Draw Buses** (B) and **Place Wire to Bus Entries** (Z) — buses and graphical entries
- **Place Net Labels** (L) / **Place Global Labels** (Ctrl+L) / **Place Hierarchical Labels** (H) / **Place Directive Labels** — place labels
- **Place Junctions** (J) — connect crossing wires
- **Place No Connect Flags** (Q) — mark intentionally unconnected pins
- **Draw Text** (T) / **Draw Text Boxes** / **Draw Tables** — annotations
- **Draw Rule Areas**, **Draw Hierarchical Sheets** (S), sheet pin and Sync Sheet Pins tools — multi-sheet organization
- **Draw Lines** (I), rectangles, circles, arcs, Bezier curves, **Place Images** — graphics
- **Interactive Delete Tool** — remove clicked items

Rectangular / lasso selection modes share a palette in the right toolbar. Other editing hotkeys: Move `M`, Drag `G`, Rotate `R` (Shift+R clockwise), Mirror `X` / `Y`, Properties `E`, Repeat Last Item `Ins`, Autoplace Fields `O`, Edit Reference `U`, Edit Value `V`, Edit Footprint `F`, Swap `Alt+S`.

## Grids and Snapping

- Standard grid: **50 mil (0.050" / 1.27 mm)** — required for symbol pin compatibility
- Smaller grids are suitable only for text and graphics, not pins/wires
- Snapping also occurs to connected objects (pins, existing wires) even when grid snap is off

| Modifier | Effect |
|----------|--------|
| Ctrl | Disable grid snapping |
| Shift | Disable connected-object snapping |

Default grid 50 mil. Select a grid from the right-click **Grid** submenu, cycle with `n` / `N`, or edit grids in the **Grids** pane of Preferences (right-click the grid button on the left toolbar → **Edit Grids…**). Two "Fast Grids" are selectable with `Alt+1` / `Alt+2`. Grid overrides per object type are toggled with the left toolbar button (`Ctrl+Shift+G`). **Align Elements to Grid** (right-click) snaps misaligned items back.

## Editing Object Properties

### Properties Dialog

All schematic objects have editable properties accessible via:
- Press **E** — opens the Properties dialog for the selected object
- Right-click → **Properties** — same as above

Only one object type can be edited at a time via the Properties dialog. Symbol properties additionally restrict editing to a single instance.

### Properties Manager

A docked panel for real-time editing of multiple selected items (including mixed types). Access via **View** → **Panels** → **Properties** or the properties button on the left toolbar. The Properties dialog opens only when all selected items are of the same type; the Edit Text and Graphics tool (**Edit** → **Edit Text and Graphic Properties…**) and the Symbol Fields Table edit text/fields in bulk.

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

Press **A** or click the add-symbol button. The Choose Symbol dialog filters by name, keywords, description, and all additional fields (extra columns via right-click header → **Select Columns**; sort alphabetically or by best match).

Filtering syntax:
- Wildcards: `*` (any chars), `?` (single char)
- Key-value: `Key>123`, `Key<123` against `Key:123` tags, with case-insensitive suffixes p, n, u, m, k, meg, g, t, ki, mi, gi, ti
- Regex: wxWidgets Advanced Regular Expression style

A default footprint is previewed at lower right; filtered alternates appear in the footprint dropdown. After selection, the symbol attaches to the cursor. Before placing: rotate, mirror, and edit fields via hotkeys or right-click menu. Options: **Place repeated copies**, **Place all units**.

### Symbol Properties (E or double-click)

Fields are shown in a table. Reserved field name prefix: `ki_` (do not use).

| Field | Description |
|-------|-------------|
| Reference | Designator (R1, U3, etc.) |
| Value | Component value or type |
| Footprint | PCB footprint (`library:footprint_name`) |
| Datasheet | URL or file path; supports embedding (`Embed File`); **Show Datasheet** (D) |

**Symbol Attributes:**
- Exclude from simulation (grey outline plus waveform icon; hide with **View** → **Mark items which are excluded from simulation**)
- Exclude from bill of materials
- Exclude from board
- Do Not Populate (DNP) (red X)

### Editing Symbol Definitions

- **Edit Symbol…** — opens the schematic instance only (affects this copy); also right-click → **Edit with symbol editor** (`Ctrl+E`)
- **Edit Library Symbol…** — opens the library master (`Ctrl+Shift+E`; does not update existing instances)
- **Update Symbol from Library…** — syncs instance with library (**Tools** → **Update Symbols from Library…**, or right-click → **Update Symbol…**); the dialog selects scope (all, selected, by reference / value / library identifier) and which fields, visibilities, attributes, and alternate pin functions are reset
- **Change Symbol…** — swap to a different symbol (**Edit** → **Change Symbols…**, or right-click → **Change Symbol…**)
- **Tools** → **Edit Symbol Library Links…** — repoint all instances of a symbol to another library symbol; **Map Orphans** remaps orphaned symbols
- **Inspect** → **Compare Symbol With Library** — Summary and Visual tabs for schematic-vs-library differences

### Alternate Pin Functions

Select in the **Pin Functions** tab of Symbol Properties (Alternate Assignment column), or right-click a pin → **Pin Function**. **View** → **Show Pin Alternate Icons** toggles the indicator.

### Symbol Fields Table

Opens from the top-toolbar button (the manual's menu label varies between **Edit Symbol Fields…** and **Bulk Edit Symbol Fields…**). Spreadsheet of all symbol fields (Include checkboxes, add / rename / delete fields, column labels, virtual fields such as Quantity and Item Number); also the BOM export tool. Show only the current sheet, current sheet plus subsheets, or the whole project.

## Reference Designators and Annotation

Reference designators consist of a type letter + number (e.g., R1, C5, U10). Multi-unit symbols append a trailing letter (U1A, U1B).

### Auto-Annotation

Enable via **Preferences** → **Schematic Editor** → **Editing Options** or the toolbar toggle.

Enable by checking **Automatically annotate symbols** in Preferences or with the left-toolbar toggle. Configure in **Schematic Setup** → **Annotation**:
- **Symbol unit notation**: letter or number, with separator `.`, `-`, `_`, or none (default `U1B`)
- **Order**: Sort by X or Y position
- **Numbering**: Lowest available, or starting from sheet number × 100 / × 1000
- **Allow reference reuse**: Permit reassigning numbers not currently used

### Annotation Tool (top toolbar)

Options:
- **Scope**: Entire schematic, current sheet, or selection only
- **Recurse into subsheets**: Include child sheets
- **Options**: All symbols (reset existing) or unannotated only; **Reset symbol units** reannotates units individually
- **Order**: Left-to-right (X) or top-to-bottom (Y)
- **Numbering**: Starting point
- **Clear Annotation** button; messages can be saved with **Save…**

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
| Hierarchical label | Connects to parent sheet pins | H |
| Directive label | Assigns net / component classes; cannot name a net | — |

Labels with the same name connect within a sheet regardless of type. Convert with the **Change To** tools. **View** → **Show Directive Labels** toggles directive visibility.

### Label Properties

- **Label name**: Supports markup (overbars, subscripts), variable substitution; any character allowed; dropdown of existing nets
- **Shape** (global/hierarchical): Input, Output, Bidirectional, Tri-state, Passive (visual only); **Auto** orientation
- **Multiple label input**: one label per line, placed in sequence
- **Font, size, color, orientation**, bold / italic
- **Fields**: `Net Class` (default field name; assigns a net class) and `Sheet References` (`${INTERSHEET_REFS}`, global labels only)
- `Ins` repeats the last label with an incremented name (pitch and increment in Preferences → Editing Options)

### Inter-Sheet References

Global labels can show page numbers of matching labels elsewhere. Configure in **Schematic Setup** → **Formatting**: Show inter-sheet references, Show own page reference, Standard / abbreviated, prefix and suffix. Click a reference to navigate.

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

Power symbols represent global nets (VCC, GND, etc.). The **Value** field determines the net name. Two (global) power symbols with the same value connect anywhere in the schematic regardless of sheet; symbols marked as local power symbols (KiCad 10.0) do not connect between sheets.

**PWR_FLAG**: Add to nets that connect to a power source to prevent the ERC error "Input Power pin not driven by any Output Power pins" (equivalent to connecting any Output Power pin). PWR_FLAG is in the `power` symbol library.

**Hidden power pins**: Legacy feature (not recommended) — invisible Power Input pins connect to a global net with the same name as the pin. Show hidden pins via **Preferences** → **Schematic Editor** → **Display Options** → **Show hidden pins**, **View** → **Show hidden pins**, or the left-toolbar toggle.

## No-Connection Flags

Mark intentionally unconnected pins with the no-connect tool (`Q`) to suppress "unconnected pin" ERC errors. Stacked pins with no-connect flags get separate nets. Distinct from the "Unconnected" pin type.

## Net Classes

Group nets for PCB design rules and schematic graphical properties. Create/edit in **Schematic Setup** or **Board Setup**.

Assignment methods:
- Pattern-based matching (Net Classes panel; wildcards `*` / `?` and regular expressions; right-click a net → **Assign Netclass…**; names include the sheet path, e.g. `/`)
- Graphical net class directives (directive labels, optionally attached to rule areas)
- Net class fields on labels

Multiple net classes can apply to one net; the highest-priority class supplies each property (order set in Schematic or Board Setup) and `Default` is the fallback. The resolved net class appears in the message panel when a wire or label is selected. Wire / bus width, color, and line style are set per net class; **Highlight netclass colors** (Display Options) draws the class color as a highlight instead.

## Component Classes

Group symbols (and their footprints) for multichannel designs and custom DRC rules. Assign with a symbol field named `Component Class`, or with directive labels plus rule areas.

## Rule Areas

Rule Area tool (right toolbar): click corners, double-click to finish; obeys the current line mode. Rule areas apply attributes (Exclude from simulation / BOM / board, Do not populate; set with `E`) to symbols fully or partially inside, and with directive labels on the border assign net classes and component classes.

## Graphics and Text

| Element | Hotkey | Notes |
|---------|--------|-------|
| Text | T | Supports markup, variables, font/color |
| Text Box | — | Bordered text region |
| Rectangle | — | Graphical only |
| Circle | — | Graphical only |
| Arc | — | Graphical only |
| Bezier curve | — | Graphical only |
| Line segment | I | Graphical only (not a wire) |
| Table | — | Structured data display |
| Bitmap image | — | Documentation/reference |

Graphical elements do not create electrical connections.

## Groups

Select objects → right-click → **Grouping** → **Group Items** (or the top-toolbar button); **Ungroup Items**, **Enter Group** (double-click), **Leave Group**, **Remove Items**. Groups move, rotate, and delete as a unit; properties (`E`) include a name and a **Library link** (`<library>:<block>`, for design blocks).

## Aligning Objects

Select multiple objects → right-click → **Align/Distribute** → **Align to Left** (or another edge / center). The object under the cursor is the reference; otherwise the furthest object in that direction.

## Schematic Setup

Access via **File** → **Schematic Setup…** or the top-toolbar button:

| Panel | Contents |
|-------|----------|
| Formatting | Symbol unit notation, default text size, overbar / label offset ratios, global label margin, default line width, pin symbol size, hop-over size, junction dot size, connection width (default 50 mil), operating point overlay, inter-sheet references, dashed line lengths |
| Annotation | Order, numbering, allow reference reuse |
| Field Name Templates | Empty fields added to every symbol (project-wide; global ones in Preferences) |
| BOM Presets | List / delete saved BOM and BOM formatting presets |
| Violation Severity / Pin Conflicts Map | ERC severities and pin-type conflict matrix |
| Net Classes | Net class names, properties, and pattern assignments |
| Bus Alias Definitions | Shortcuts for bus definitions |
| Text Variables | Project-wide substitution variables |
| Embedded Files | Files embedded in the schematic |

## Notes

- The 10.0 manual spells the global-label sheet-reference variable `${INTERSHEET_REFS}` in the Labels chapter but `INTERSHEETREFS` in the Advanced Topics label-field list; both spellings appear in the source.
- The 10.0 Schematic Editor power-symbol section still says power symbols connect regardless of sheet, while the 10.0 Introduction (What's New) states local power symbols do not connect between sheets.
- Use 50 mil grid for all pins and wires to ensure compatibility with the KiCad standard symbol library
- Wires connect only at endpoints — crossing wires require an explicit junction to connect
- The `ki_` field name prefix is reserved by KiCad
- Not found in the 10.0 manual: a separate "General" or "Component Classes" tab in Schematic Setup (component classes are field / directive based), an "Add Hierarchical Subsheet" tool name (the action is **Draw Hierarchical Sheets**), and horizontal / vertical distribute options in the align section.
- The Schematic Setup "General → Formatting" path appears in the junction-size text; the dialog itself lists panels as above.

## Related

- [Introduction](./01-introduction.md)
- [Multiple Sheets and Hierarchical Schematics](./03-multiple-sheets-and-hierarchical-schematics.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
