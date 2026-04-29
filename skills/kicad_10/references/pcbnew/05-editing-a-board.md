# Editing a Board

Core editing operations for placing, routing, and modifying objects in the PCB Editor.

## Placement and Drawing Tools (Right Toolbar)

Tools stay active until cancelled with `Esc`. Tools with multiple variants show a small arrow — click-and-hold to open a palette.

| Tool | Function |
|------|----------|
| Footprint placement | Opens footprint chooser; click to place |
| Route tracks | Interactive single-track router |
| Route differential pair | Interactive differential pair router |
| Length tuning | Adjust track lengths after routing |
| Via | Add standalone via without routing |
| Zone | Draw a filled copper area |
| Rule area | Draw a keepout region |
| Graphical shapes | Lines, arcs, rectangles, circles, polygons, bezier curves |
| Text | Add text annotation |
| Dimension | Add measurement annotation |
| Delete | Remove selected objects |

## Grids and Snapping

- Active grid is set via the top toolbar dropdown or right-click → grid options
- `N` / `Shift+N` cycles through available grid sizes
- Snap points: endpoints, midpoints, centers, intersections of graphical shapes
- Auxiliary snap lines and circles extend beyond shape boundaries

**Modifier keys:**

| Key | Effect |
|-----|--------|
| `Ctrl` | Disable grid snapping |
| `Shift` | Disable object snapping |
| `Shift+S` | Toggle layer-specific vs. universal snapping |

## Editing Object Properties

- Select an object → message panel shows properties
- Double-click → opens property editor dialog
- Properties panel (left side) shows editable attributes for the current selection

## Board Outlines (Edge Cuts)

The physical board boundary is defined by graphical shapes on the **Edge.Cuts** layer. This layer determines the board outline sent to fabrication.

## Working with Footprints

- Place via the footprint placement tool (opens footprint chooser)
- Move, rotate, and flip (front/back) after placement
- Reference designator and value are editable fields
- Footprints can be **locked** to prevent accidental movement

## Working with Pads

| Property | Description |
|----------|-------------|
| Shape | Circular, rectangular, oval, custom, etc. |
| Size | Width and height |
| Hole | Drill diameter (through-hole pads) |
| Net | Electrical net assignment |
| Layer(s) | Copper layers the pad appears on |
| Thermal relief | Zone connection style and clearances |
| Solder mask/paste | Per-pad clearance overrides |

## Working with Zones

Filled copper polygons that connect all pads on the same net while maintaining clearance from other nets.

Key zone settings:
- Net assignment and layer
- Fill style: solid or hatched
- Thermal relief parameters for pad connections
- Zones auto-update when nearby copper changes (or manually via **Edit → Fill All Zones**, `B`)

## Routing Tracks and Vias

The interactive router supports three modes:
- **Push-and-shove**: moves existing tracks out of the way
- **Walkaround**: routes around existing copper
- **Highlight collision**: routes freely, flags violations

Press `Space` to toggle between free angle, 90°, and 45° routing modes. Track width and via size follow net class defaults or manual overrides set in the top toolbar.

## Routing Differential Pairs

Maintains controlled gap spacing between paired traces and optionally equalizes their lengths. Activate via **Route → Route Differential Pair** or the right toolbar.

## Length Tuning

Adjusts routed paths with serpentine meanders to match a target length or skew constraint. Activated after routing via the length tuning tool. Tuning parameters (amplitude, spacing) are configurable per-segment.

## Teardrops

Smooth copper transitions from track to pad or via, improving solder joint reliability and mechanical strength. Configured via **Edit → Edit Teardrops**. Parameters include size ratios and applicability to different connection types.

## Backdrills / Hole Post-Machining

Configuration for controlled-depth drilling operations: counterborescountersinks and similar post-machining operations for through-hole vias.

## Graphics and Text

- Text objects support variable substitution using `${VARIABLENAME}` syntax
- Graphical shapes (lines, arcs, rectangles, circles) appear on specified layers
- Shapes can be filled or outline-only

## Rule Areas (Keepouts)

Polygonal regions that restrict:
- Footprint placement
- Track routing
- Zone filling

Named rule areas can be referenced in custom DRC rules to apply constraints to specific board sections.

## Locking

Lock objects to prevent selection or modification. The selection filter has an independent control for whether locked items are selectable.

## Groups

Collect objects into a group for simultaneous movement and editing while maintaining relative positions. Groups can be nested.

## Aligning and Distributing Objects

Align selected objects relative to each other (left, right, top, bottom, center) and distribute them at equal spacing via **Align → …** menus.

## Arrays

Create multiple copies of selected objects in configurable patterns:
- **Linear**: offset by X/Y with a count
- **Circular**: evenly distributed around a center point
- **Grid**: rows × columns with X and Y spacing

## Using Reference Images

Import reference images (raster graphics) onto the board canvas as design aids, without including them in fabrication outputs.

## Pin and Gate Swapping

Swap equivalent pins or gates within a component to improve routing, with changes propagated back to the schematic via back-annotation.

## Notes

- `B` fills all zones; `Ctrl+B` unfills all zones
- Locking does not affect whether an item is included in outputs

## Related

- [02-display-and-selection-controls.md](./02-display-and-selection-controls.md)
- [04-board-setup.md](./04-board-setup.md)
- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
