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

1. **File** → **Page Settings** — enter title block information.
2. **File** → **Board Setup** — define manufacturing specifications.

Key settings in Board Setup:

| Setting | Location | Notes |
|---------|----------|-------|
| Stackup (copper/dielectric layers and thicknesses) | Stackup page | Default is 2-layer; sufficient for most simple designs |
| Design rules (min track width, clearances) | Constraints page | Set according to PCB fab capabilities |
| Net classes | Net Classes page | Group nets with different design rules |

## Importing Changes from Schematic

Synchronize the schematic with the PCB layout:

**Tools** → **Update PCB from Schematic** (or press **F8**)

The dialog shows proposed changes; review and confirm before applying. This is a manual process — the designer decides when to update.

## Drawing a Board Outline

1. Select the `Edge.Cuts` layer.
2. Use line, arc, circle, polygon, or bezier tools to draw a closed, non-self-intersecting outline.
3. Choose a coarse grid for round dimension values.

The lighter interior color of the closed shape indicates the board area.

## Placing Footprints

Guidelines for footprint placement:

- Place connectors at board edges for accessibility.
- Keep related components (e.g., decoupling capacitors) close to their associated ICs.
- Avoid courtyard overlaps between components.
- Minimize ratsnest line crossings to simplify routing.

The **ratsnest** (thin lines showing unrouted connections) guides optimal placement. Components can be flipped to the back layer; pads turn from red (front) to blue (back).

## Routing Tracks

1. Select **Route Tracks** tool.
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

Thermal reliefs connect pads to zones while easing hand soldering. Zones must be manually refilled after layout modifications. Use **Show only zone boundaries** to reduce visual clutter without clearing the fill.

## Design Rule Checking (DRC)

DRC detects:
- Schematic-to-PCB mismatches
- Insufficient clearances
- Shorts
- Unconnected tracks
- Custom rule violations

Run DRC from the top toolbar or **Inspect** → **Design Rules Checker**. Adjust severity at **File** → **Board Setup** → **Design Rules**. Custom DRC rules can also be written.

## 3D Viewer

Visualize the finished board: **View** → **3D Viewer**

| Action | Control |
|--------|---------|
| Pan | Middle mouse button drag |
| Orbit | Left mouse button drag |

Enable raytracing for enhanced rendering: **Preferences** → **Raytracing**.

Many library footprints include 3D models; custom models can be added for components that do not.

## Fabrication Outputs

Generate manufacturing files via **File** → **Plot**:

- **Format**: Gerber (standard for most PCB fabricators).
- **Required layers to plot**: all copper layers, `Edge.Cuts`, solder mask, silkscreen.
- **Optional**: solder paste layers.

After plotting Gerber files, click **Generate Drill Files** to produce drill data required for fabrication.

## Notes

- Refill all copper zones (**B**) before running DRC to avoid false clearance violations.
- Always verify fab house capabilities and set design rules accordingly.

## Related

- [Tutorial Part 2: Schematic](./05-tutorial-part-2-schematic.md)
- [Tutorial Part 4: Custom Symbols and Footprints](./07-tutorial-part-4-custom-symbols-and-footprints.md)
