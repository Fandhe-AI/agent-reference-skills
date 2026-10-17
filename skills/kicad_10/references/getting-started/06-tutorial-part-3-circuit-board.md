# Tutorial Part 3: Circuit Board

This section covers laying out and routing a PCB using the KiCad PCB Editor.

## PCB Editor Basics

### Navigation

| Action | Control |
|--------|---------|
| Pan | Middle mouse button drag or right mouse button drag |
| Zoom in/out | Scroll wheel or F1 / F2 |

The **Appearance Panel** (right side) manages layer visibility and colors. The **Selection Filter** controls which object types can be selected.

Toolbar conventions mirror the Schematic Editor: buttons with a small triangle indicate expandable palettes.

## Board Setup and Stackup

Before designing, configure the board:

1. **File** → **Page Settings…** — paper size, date, revision, and title.
2. **File** → **Board Setup…** — define manufacturing specifications.

Key settings in Board Setup:

| Setting | Location | Notes |
|---------|----------|-------|
| Stackup (copper/dielectric layers and thicknesses) | Board Stackup → Physical Stackup | Tutorial leaves copper layers at 2 |
| Design rules (min track width, clearances) | Design Rules → Constraints | Overriding rules for the whole board; defaults fine for the tutorial; set per fab house capabilities for real projects |
| Net classes | Design Rules → Net Classes | Group nets with different design rules; nets can also be assigned in the schematic editor |

Tutorial: with no net classes defined all nets are in the Default net class; increase its Track Width from 0.2 mm to 0.4 mm so routed tracks are 0.4 mm.

## Importing Changes from Schematic

Synchronize the schematic with the PCB layout:

**Tools** → **Update PCB from Schematic…** (or press **F8**, or the top toolbar button)

The Changes To Be Applied window lists proposed changes; click **Update PCB**, **Close**, then click the canvas to place the footprints. This is a manual process — the designer decides when to update and must re-run it after schematic edits.

## Drawing a Board Outline

1. Select the `Edge.Cuts` layer in the Layers tab of the Appearance panel.
2. Use the rectangle tool (click opposite corners) or line, arc, circle, polygon, or bezier tools to draw a single closed, non-self-intersecting outline.
3. Choose a coarse grid (e.g. `1mm` in the Grid dropdown above the canvas) for round dimension values.

The lighter interior color of the closed shape indicates the board area.

## Placing Footprints

Guidelines for footprint placement:

- Place connectors at board edges for accessibility.
- Keep related components (e.g., decoupling capacitors) close to their associated ICs.
- Avoid courtyard overlaps between components.
- Minimize ratsnest line crossings to simplify routing.

The **ratsnest** (thin lines showing unrouted connections) guides optimal placement. Move with **M**, rotate with **R**, flip to the opposite side with **F** (during a move); pads turn from red (F.Cu) to blue (B.Cu) in the default color scheme.

## Routing Tracks

1. Select **Route Tracks** (right toolbar or **X**).
2. Click a pad to start; click the destination pad to complete.
3. The active layer switches automatically when routing between layers.
4. Press **V** during routing to insert a via (layer transition).
5. Completed connections remove the corresponding ratsnest line.

Through-hole pads connect to all copper layers directly.

## Placing Copper Zones

Copper zones are filled copper regions that automatically connect to all same-net objects within their boundary.

1. Select **Add a Filled Zone**.
2. Specify the net (typically `GND` or `VCC`).
3. Click corner points to define the zone boundary.
4. Fill: **Edit** → **Fill All Zones** (or press **B**).

Thermal reliefs connect pads to zones while easing hand soldering. Zones are not refilled automatically after layout modifications; refill them manually (**B**) or via DRC's refill option. Use **Show only zone boundaries** to reduce visual clutter without clearing the fill.

## Design Rule Checking (DRC)

DRC detects:
- Schematic-to-PCB mismatches
- Insufficient clearances
- Shorts
- Unconnected tracks
- Custom rule violations

Run DRC from the top toolbar or **Inspect** → **Design Rules Checker**, then **Run DRC**. Adjust severity at **File** → **Board Setup…** → **Design Rules** → **Violation Severity**. Custom DRC rules can also be written. The dialog has a **Refill all zones before performing DRC** checkbox. In the tutorial, **D** (Drag) moves a footprint keeping tracks attached.

## 3D Viewer

Visualize the finished board: **View** → **3D Viewer**

| Action | Control |
|--------|---------|
| Pan | Middle mouse button drag |
| Orbit | Left mouse button drag |

Enable raytracing for enhanced rendering: **Preferences** → **Raytracing**.

Many library footprints include 3D models; custom models can be added for components that do not.

## Fabrication Outputs

Generate manufacturing files via **File** → **Plot…** (specify an output directory; other defaults are fine):

- **Format**: Gerber (standard for most PCB fabricators).
- **Required layers to plot**: all copper layers, `Edge.Cuts`, solder mask, silkscreen.
- **Optional**: solder paste layers (needed only for solder paste stencils).

Click **Plot** to generate the Gerber files, then **Generate Drill Files…** and **Generate Drill File** to produce drill data.

## Notes

- Zones are not filled automatically when drawn or modified; refill them (**B**, or the DRC refill checkbox) before DRC and before generating fabrication outputs.
- Always verify fab house capabilities and set design rules accordingly.

## Related

- [Tutorial Part 2: Schematic](./05-tutorial-part-2-schematic.md)
- [Tutorial Part 4: Custom Symbols and Footprints](./07-tutorial-part-4-custom-symbols-and-footprints.md)
