# Tutorial Part 2: Schematic

This section covers creating a circuit schematic using the KiCad Schematic Editor.

## Schematic Editor Basics

### Navigation

| Action | Control |
|--------|---------|
| Pan | Middle mouse button drag or right mouse button drag |
| Zoom in/out | Scroll wheel or F1 / F2 |

The **Center and Warp Cursor on Zoom** feature (enabled by default) moves the cursor to the screen center when zooming, keeping the zoomed region centered; disable it in Mouse and Touchpad preferences. Touchpad users can customize controls via **Preferences** → **Preferences…** → **Mouse and Touchpad** (macOS: KiCad menu → Settings…).

### Toolbars

- **Left toolbar** — display settings and view options.
- **Right toolbar** — editing tools (buttons with a small triangle indicate expandable palettes; activate by click-and-hold or click-and-drag).

### Hotkeys

Most tools have default hotkeys or support custom hotkeys. View the full list at **Help** → **List Hotkeys…**

## Schematic Sheet Setup

Configure the title block before adding components:

**File** → **Page Settings** — set title, date, and paper size (revision and other fields are not mentioned in the tutorial text).

## Adding Symbols

1. Press **A** or click **Add Symbols** to open the symbol chooser.
2. Browse or search for a symbol (e.g., type `R` to filter resistors).
3. Select the symbol and click OK to place it on the schematic.

Useful symbols from the `Device` library:

| Symbol | Description |
|--------|-------------|
| `R` / `R_US` | Resistor (IEC rectangular / ANSI zigzag) |
| `LED` | Light-emitting diode |
| `Battery_Cell` | Single battery cell |

Power and ground symbols are in the `power` library (the tutorial text calls it the Power symbol library). Press **P** or click **Add a Power Symbol** to filter to power symbols only.

## Selecting and Moving Objects

| Action | Method |
|--------|--------|
| Select single object | Click |
| Add to selection | Shift+click |
| Remove from selection | Ctrl+Shift+click (macOS: Cmd+Shift+click) |
| Toggle selection | Ctrl+click (macOS: Cmd+click) |
| Box select (enclosed) | Drag left-to-right |
| Box select (touching) | Drag right-to-left |
| Move (wires detach) | M |
| Drag (wires follow) | G |
| Rotate | R |
| Delete | Del |

## Wiring the Schematic

1. Press **W** or click **Add a Wire** to start drawing.
2. Click and release to begin; click a pin or double-click to end.
3. Press **Escape** to cancel.

Hovering over an unconnected pin changes the cursor to indicate that clicking will start a wire automatically.

### Net Labels

Press **L** or click **Place Net Labels** to label a wire. Labels and power symbols with the same name are connected together, even without visible wire connections (the tutorial's example is on the same schematic page; local labels connect only within a sheet).

## Annotation, Symbol Properties, and Footprints

### Reference Designators

Each symbol requires a unique reference designator (e.g., R1, LED1). KiCad applies automatic annotation when symbols are added. Reannotate via the **Fill in schematic symbol reference designators** button.

### Symbol Properties

Press **E** or right-click → **Properties** to edit the symbol's `Value`, reference designator, and other fields.

### Footprint Assignment

Open the footprint assignment tool (top toolbar button) to link each symbol to a physical package. Left pane: footprint libraries; middle pane: schematic symbols; right pane: candidate footprints (double-click to assign). Filters:

| Filter | Description |
|--------|-------------|
| Symbol-defined filters (leftmost button) | Filters defined in each symbol (e.g. SOIC / DIP for an opamp) |
| Pin-count filter (middle button) | Shows only footprints with matching pad count |
| Library filter (right button) | Shows only footprints in the library selected in the left pane |
| Text box | Filters by text; disabled when empty |

Right-click a footprint name and select **View selected footprint** to preview it. Tutorial assignments: BT1 `Battery:BatteryHolder_Keystone_1058_1x2032`, D1 `LED_THT:LED_D5.0mm`, R1 `Resistor_THT:R_Axial_DIN0309_L9.0mm_D3.2mm_P12.70mm_Horizontal`. Footprints can also be assigned in the symbol properties window.

## Electrical Rules Check (ERC)

The ERC checks for common connection issues: unconnected pins, shorted power outputs, unpowered power inputs, etc. It cannot verify that the circuit functions correctly.

1. Click the **ERC** button in the top toolbar (the tutorial does not name a menu path; the Inspect menu entry is not found in the 10.0 getting-started text).
2. Click **Run ERC**.
3. Review violations; arrows point to problem locations.

To resolve common power-related warnings, add a `PWR_FLAG` symbol (from the `power` library) to `VCC` and `GND` nets.

Adjust severity levels at **File** → **Schematic Setup…** → **Electrical Rules** → **Violation Severity**.

## Bill of Materials

Generate a BOM via **Tools** → **Generate Bill of Materials…**:

- **Edit tab** — configure which symbol metadata to export; preview raw output.
- **Export tab** — set output file path, then click **Export**.

The resulting file opens in any spreadsheet application.

## Notes

- Net labels with the same name on the same sheet are electrically connected even if not drawn with a wire.
- The getting-started text capitalizes "Power symbol library"; the Schematic Editor manual refers to the `power` library.
- `PWR_FLAG` is required on nets where power is provided without a formal power-output pin.

## Related

- [Tutorial Part 1: Project](./04-tutorial-part-1-project.md)
- [Tutorial Part 3: Circuit Board](./06-tutorial-part-3-circuit-board.md)
