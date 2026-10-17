# Symbols and Symbol Libraries

Management and use of schematic symbols and their libraries.

## Managing Symbol Libraries

KiCad uses a **Symbol Library Table** to track libraries at two scopes:

| Scope | Location | Applies to |
|-------|----------|------------|
| Global | `sym-lib-table` in the KiCad configuration folder | All KiCad projects |
| Project | `sym-lib-table` in the project folder (only if project-specific libraries exist) | Current project only |

Access the table via **Preferences** → **Manage Symbol Libraries…**.

Path variables (**Preferences** → **Configure Paths…**), used as `${PATH_VAR_NAME}` in library paths:
- `${KICAD10_SYMBOL_DIR}` — default path to the official KiCad symbol libraries (older `${KICAD9_SYMBOL_DIR}` etc. resolve to it automatically when undefined)
- `${KIPRJMOD}` — absolute path of the current project directory

### Adding a Library

1. Open **Manage Symbol Libraries…** and pick the **Global** or **Project Specific** tab.
2. Click the add-library button and select a library, or the button that lets you type a path.
3. Set a **nickname** (referenced as `nickname:symbol_name`; `:` is not allowed in nicknames or symbol names).
4. Set the **path** and the library format (`.kicad_sym` is the only writable format; legacy `.lib`, Altium, CADSTAR, Eagle, EasyEDA, `.kicad_dbl`, `.kicad_httplib` are read-only; **Migrate Libraries** converts them). Since KiCad 10.0 a library can also be a folder of `.kicad_sym` files (unpacked, conventionally `.kicad_symdir`).
5. Use the **Enable** checkbox to load a library and **Show** to list it in browsers; nested library tables are supported.

### Removing a Library

Select the library row(s) and click the remove button. Does not delete the file.

## Browsing Symbol Libraries

The **Symbol Chooser** (press **A** when placing symbols) provides:
- Search by name, keywords, description, and custom fields
- Wildcard (`*`, `?`), key-value (`Key>123`), and regex filtering
- Footprint preview
- Repeated placement mode

The **Symbol Library Panel** (left sidebar in Symbol Editor) shows a hierarchical tree of all loaded libraries.

## Symbol Editor Overview

Open via **Tools** → **Symbol Editor** in the Schematic Editor, or from the KiCad Project Manager.

The Symbol Editor interface includes:
- Library and symbol tree, Properties Manager, and selection filter (collapsible left panels)
- Canvas (center) for drawing the symbol
- Top, left (display controls), and right (drawing tools) toolbars; a message panel at the bottom

## Browsing, Modifying, and Saving Symbols

- Click a symbol name in the library tree to open it for editing (hover shows a preview). Derived symbols are shown in italics and their graphics are not editable.
- The **Save** toolbar icon saves the selected library (all modified symbols in it).
- **File** → **Save As…** saves to a different library or name; **Save Copy As…** keeps the original open.
- Changes to a library symbol do NOT automatically update existing schematic instances. Use **Update Symbol from Library…** in the schematic editor.

## Creating a New Symbol Library

**File** → **New Library** in the Symbol Editor. Choose **Global** or **Project** scope. A new `.kicad_sym` file is created and added to the library table.

## Creating a New Symbol

1. In the Symbol Editor, select a target library.
2. Click the new-symbol toolbar button (**File** → **New Symbol…**, `Ctrl+N`).
3. Set the symbol name, optional base symbol (derived symbol, same library), reference prefix (e.g., `R`, `U`, `C`), number of units and whether they are interchangeable, alternate body style, power symbol, exclude from BOM / board, and pin name offset / visibility options.
4. Draw the body graphics (rectangles, lines, etc.) and add pins.
5. Add required fields (Reference, Value, Footprint, Datasheet).
6. Save to the library.

## Editing Symbol Properties

Click the symbol-properties toolbar button or double-click an empty spot in the canvas. The General tab holds the fields and basic properties; other tabs cover Units & Body Styles, footprint filters, jumper pins (Pin Connections), and embedded files.

| Property | Description |
|----------|-------------|
| Symbol name | Symbol identifier within the library (no longer linked to Value since KiCad 7) |
| Keywords | Extra search terms (used with name and Description in the Symbol Chooser) |
| Define as power symbol / local power symbol | Makes the symbol a power symbol |
| Show pin number / Show pin name / Place pin names inside | Pin text display; Pin Name Position Offset applies when names are inside (0.02 to 0.05 in usually reasonable) |
| Exclude from simulation / BOM / board / position files | Default attribute state when added to a schematic |

## Symbol Units and Alternate Body Styles

### Multiple Units

For multi-part components (e.g., dual op-amp):
- Define the number of units (Units & Body Styles tab); optionally mark **All units are interchangeable** and name units
- Each unit can have its own pin layout and graphics
- Pins and graphics can be common to all units or unit-specific

### Body Styles

Single body style, "Standard" plus "De Morgan", or an arbitrary number of custom named body styles (multiple alternates since KiCad 10.0). Pins and graphics can be common to all body styles or specific to one.

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
| Number | String identifying the pin (matches PCB footprint pad); spaces become underscores; `[1-3]` form stacks several numbers on one pin (KiCad 10.0) |
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
| Free | Does not electrically affect the device (e.g. unconnected package leads); DRC allows its pad on any net |
| Unspecified | Unknown type; ERC warns when connected to most pin types |
| Power Input | Powers the device; must be driven by a Power Output (invisible Power Input pins act as global labels) |
| Power Output | Provides power to a net |
| Open Collector | Open-collector output |
| Open Emitter | Open-emitter output |
| Unconnected | Pin must never be connected; not configurable in the Pin Conflicts Map, no "unconnected pin" violation when left open |

### Alternate Pin Functions

Pins can have multiple named functions. Alternate functions define a different name, electrical type, and graphical style selectable when the symbol is placed in a schematic.

## Symbol Fields

Every library symbol has five default fields that cannot be deleted; only Reference must have a value (its content is the designator prefix).

| Field | Description |
|-------|-------------|
| Reference | Designator prefix in the library (R, C, U); full designator in the schematic |
| Value | Component value or name (determines the net of a power symbol) |
| Footprint | PCB footprint (`LIBNAME:FOOTPRINTNAME`) |
| Datasheet | URL or file path to datasheet |
| Description | Text used in Symbol Chooser search (a dedicated property before KiCad 8.0) |
| Custom fields | Manufacturer PN, specs, etc. — avoid `ki_` prefix |

Field visibility, position, font, and autoplacement are configurable per field.

## Footprint Filters

Define acceptable footprint names in the Footprint Filters tab. `*` matches any number of characters (including zero); `?` matches zero or one character (`SOT?23` matches `SOT23` and `SOT-23`). Footprints matching any filter are listed; with no filters all are listed. Filters are applied in the Footprint Assignment tool and the footprint chooser.

## Jumper Pins

Configure in the **Pin Connections** tab of Symbol Properties: **All pins with duplicate numbers are jumpers**, or **Explicit pin jumper groups** (pin numbers separated by spaces or commas, e.g. `1, 2`). Jumpered pins always share the same net; settings transfer to the linked footprint. Not the same as a net tie.

## Embedding Files

Files (e.g., datasheets, SPICE models) can be embedded in a symbol via the **Embedded Files** tab, or with the **Embed File** checkbox in the file browser. Embedded files are deduplicated when symbols are added to a schematic; derived symbols can use their parent's embedded files.

## Creating Power Symbols

A power symbol is a regular symbol where:
- The **Value** field determines the net name (global for power symbols; local power symbols do not connect between sheets)
- It has a single pin: for an ordinary power symbol (net label), a visible pin of type **Power Input** (pin number 1, length 0, placed on the anchor is recommended); a symbol that declares a power source, like `PWR_FLAG`, uses a single **Power Output** pin instead
- **Define as power symbol** is checked (appears in the Add Power Symbol dialog, no footprint, excluded from board / BOM / netlists)
- The Reference starts with `#` (e.g. `#GND`) and its Show box is unchecked

Place power symbols with the Add Power Symbol tool; KiCad's own live in the `power` library.

## Creating Derived Symbols

A derived symbol shares the base symbol's graphics and pins, and can override metadata (value, footprint, datasheet, other fields, description, footprint filters). Base and derived symbols must be in the same library.

1. Click the derive button in the Symbol Editor, or right-click a symbol in the library tree and choose **Derive from existing symbol…**.
2. Set the symbol name and base symbol; options: Keep linked datasheet, Keep linked footprint, Transfer user-defined fields, Keep content of user-defined fields.
3. Save. To move it to another library, right-click → **Flatten Symbol** (or check Flatten/remove symbol inheritance in Save As).

## Bulk Editing Symbol Fields

- Schematic Editor: the Symbol Fields Table (top-toolbar button; the 10.0 manual's menu label is **Tools** → **Edit Symbol Fields…** in some chapters and **Bulk Edit Symbol Fields…** in others) edits all symbols in the schematic.
- Symbol Editor: right-click a symbol in the library tree → **Bulk Edit Symbol Fields…** (all symbols in that library) or **Bulk Edit Related Symbol Fields…** (base symbol and its derived symbols).

## Checking Symbols

The symbol checker toolbar button in the Symbol Editor reports:
- Off-grid pins (50 mil grid recommended)
- Duplicate pins
- Issues with graphic shapes, such as zero-sized shapes
- Illegal reference prefixes (must not end with a number or `?`)
- Incorrectly designed power symbols (single unit, no alternate body styles, a single Power Output pin or visible Power Input pin)
- Hidden Power Input pins in non-power symbols

## Importing Symbols

**File** → **Import** → **Symbol…** imports symbols from an external KiCad library into the active library (derived symbols bring their base symbol).

## Notes

- The 10.0 manual's Power Symbols section says power symbols consist of a single Power Input pin, while its symbol checker section accepts either a single Power Output pin (see PWR_FLAG) or a visible Power Input pin; both are listed here.
- Local power symbols are described only in the 10.0 Introduction (they do not connect between sheets); the Symbol Editor section gives no further scope details.
- Library nicknames must be unique within each scope (global or project). A project library with the same nickname as a global library overrides the global one.
- Symbol changes in the library do not retroactively update existing schematic instances. Run **Tools** → **Update Symbols from Library…** in the schematic editor to sync.
- The `ki_` field prefix is reserved for KiCad internal use.

## Related

- [Creating and Editing Symbols](./10-creating-and-editing-symbols.md)
- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Assigning Footprints](./05-assigning-footprints.md)
