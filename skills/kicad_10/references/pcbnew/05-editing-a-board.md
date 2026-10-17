# Editing a Board

Core editing operations for placing, routing, and modifying objects in the PCB Editor.

## Placement and Drawing Tools (Right Toolbar)

Tools stay active until cancelled with `Esc`. Tools with multiple variants show a small arrow — click-and-hold to open a palette.

| Tool | Function |
|------|----------|
| Selection | Default tool; rectangular or lasso mode (palette) |
| Local ratsnest | Shows the ratsnest of selected footprints only while the board ratsnest is hidden |
| Footprint placement | Click on the board to open the footprint chooser, click again to confirm the location |
| Route tracks / differential pairs | Interactive router (palette; hotkeys `X` / `6`) |
| Tune length | Single-track length, differential-pair length, differential-pair skew (palette; hotkeys `7` / `8` / `9`) |
| Add vias | Standalone ("free") via without routing (`Ctrl+Shift+X`) |
| Add filled zone | Draw a filled copper area (`Ctrl+Shift+Z`) |
| Add rule area | Rule areas (formerly keepouts) (`Ctrl+Shift+K`) |
| Graphical shapes | Lines, arcs, rectangles, circles, polygons, bezier curves (shapes are not tracks; graphic polygons cannot be assigned a net and keep no clearance) |
| Reference image | Bitmap for reference; not included in fabrication outputs |
| Text / textbox / table | Add text, textbox, or table |
| Dimension | Add dimensions (palette of dimension types) |
| Barcode | Add barcodes |
| Delete | Click objects to delete them |
| Origins | Grid origin or drill/place origin (palette) |
| Point | Nonphysical, dimensionless object for snapping and documentation |
| Measure | Interactively measure the distance between two locations |

## Grids and Snapping

- Active grid is set via the top toolbar dropdown or right-click → Grid submenu; grids are edited in the Grids pane of Preferences (or right-click the grid button on the left toolbar → **Edit Grids…**)
- `N` / `Shift+N` cycles to the next / previous grid; two grids can be designated "Fast Grids" (`Alt+1` / `Alt+2`; `Alt+4` cycles the fast grids)
- Grid overrides set per-object-type grids; toggled globally with the left toolbar button (`Ctrl+Shift+G`)
- Grid origin: **Place → Grid Origin** or **Edit → Grid Origin…**; other origins are the page origin, the drill/place file origin (**Place → Drill/Place File Origin**), and the local origin (`Space`)
- Snap points: endpoints/corners, midpoints, centers, intersections of graphical shapes
- Auxiliary snap lines and circles extend beyond shape boundaries; tools snap only to objects on visible layers

**Modifier keys:**

| Key | Effect |
|-----|--------|
| `Ctrl` | Disable grid snapping |
| `Shift` | Disable object snapping |
| `Shift+S` | Toggle snapping to objects on all layers vs. current layer only |

On Apple keyboards use `Cmd` instead of `Ctrl`.

## Editing Object Properties

- Select an object → message panel shows information about it
- Double-click or `E` (or right-click → Properties) → opens the properties dialog; only available when all selected items are the same type
- Properties Manager (docked panel; **View → Panels → Properties**) shows properties shared by the selection and applies edits immediately, to each item individually
- Bulk tools: Edit Text and Graphics Properties, Edit Track and Via Properties, Edit Teardrops
- Numeric fields accept arithmetic expressions with units (e.g. `2 * 2mm`, `1in + 1mm`)

## Board Outlines (Edge Cuts)

The physical board boundary is defined by graphical shapes on the **Edge.Cuts** layer. The outline must be closed with exactly coincident endpoints and without intersecting or overlapping shapes; otherwise DRC reports "Board has malformed outline" and the 3D viewer and some DRC checks do not work. Use the grid/snapping or the Heal Shapes tool to close gaps. With several closed shapes, the outermost is the board edge and enclosed shapes are cutouts. Zones fill only inside the outline.

## Working with Footprints

- Added automatically by **Update PCB from Schematic** (clustered by sheet and schematic location, attached to the cursor); manual add with the Add Footprint tool (`A`) creates footprints with no symbol link or nets, which later schematic updates remove unless the footprint is locked or **Delete footprints with no symbols** is unchecked
- Move `M` (no DRC; reference point = pad center under cursor, else footprint anchor; **Move with Reference** picks another), Drag `D` (keeps track connections; Highlight Collisions behavior, `Ctrl`+click commits despite violations), Flip `F`, Rotate `R` (counter-clockwise) / `Shift+R` (clockwise), 90 degrees per step by default (Preferences → PCB Editor → Editing Options)
- Move Exactly `Shift+M`, Position Relative To `Shift+P`, Interactive Offset Tool, Swap `Alt+S`, Get and Move Footprint `T`, Select All Unconnected Footprints `O`, Grab Nearest Unconnected Footprint `Shift+O`, Move Individually `Ctrl+M`, Pack and Move Footprints `P`
- Auto-place: **Place → Auto-Place Footprints → Place Selected Footprints / Place Off-Board Footprints**
- Properties dialog (`E`): fields, attributes, clearance and zone connection settings, 3D models, embedded files, position/orientation/side; **Edit Footprint…** (instance only, `Ctrl+E` Open in footprint editor), **Edit Library Footprint…**, **Update Footprint from Library…**, **Change Footprint…**
- Only footprint fields (not footprint text, since KiCad 8.0) are editable in the board editor
- Library changes are not applied automatically: **Tools → Update Footprints from Library…**, **Edit → Change Footprints…**, **Inspect → Compare Footprint With Library** (Summary and Visual tabs; `/` toggles A/B)
- Footprints can be **locked** to prevent accidental movement

## Working with Pads

Pad properties of a footprint instance can be overridden on the board (`E` on a pad). Pad positions are locked by default (properties editable, location not). Click inside the pad area to select a single pad, or turn off Footprints in the selection filter. The dialog matches the footprint editor's pad properties plus a manual net selector (not a typical workflow; nets normally come from the schematic).

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
- Pad connection: Solid, Thermal reliefs, Reliefs for PTH, None; thermal relief gap and spoke width
- Remove islands: always / never / below area limit
- Zone priority is set by ordering in the Zone Manager (KiCad 10), or via the Priority value in the properties panel
- Draw with `Ctrl+Shift+Z`; the Zone Properties dialog appears after the first point; double-click ends the outline
- Zone filling is manual by default: fill all zones with `B` (**Edit → Fill All Zones**), unfill with `Ctrl+B`; automatic refilling is optional (Preferences → PCB Editor → Editing Options → Miscellaneous → Automatically refill zones). KiCad warns before DRC/outputs if zones are not refilled
- Hatched fill options: Orientation (0 = horizontal/vertical lines), Hatch width, Hatch gap, Smoothing effort (0 none to 3 finest; slower, larger Gerbers), Smoothing amount (0.0 to 1.0), Hatch offset overrides per layer (defaults in Board Setup → Zone Hatch Offsets)
- Display overrides: Outline display (Line / Hatched / Fully Hatched) and Outline hatch pitch
- Zone Manager (**Tools → Zone Manager**): lists all zones in priority order (drag or arrow buttons; top/bottom buttons; an auto-assign button prefers the zone with more connected pads/vias in an overlap, then the smaller zone), filter by name/net/layer, per-layer preview, **Update Displayed Zones** previews without changing the board, **Refill zones** option refills on OK
- Context menu Zones submenu: Merge Zones, Add a Zone Cutout, Duplicate Zone onto Layer…, Add a Similar Zone, Draft Fill Selected Zone(s)

## Routing Tracks and Vias

Route tracks with the right toolbar or **Route → Route Single Track**, hotkey `X`. The router has three modes, selected in **Route → Interactive Router Settings** (also right-click the route button); the mode applies to new tracks and to Drag (`D`):
- **Highlight Collisions**: mostly manual; collisions highlighted in green; up to two segments placed at a time; tracks cannot be fixed on collision unless Allow DRC Violations is on
- **Shove**: walks around immovable obstacles (pads, locked items) and shoves movable ones; creates no tracks if a DRC-clean route is impossible
- **Walk Around**: like Shove but never moves obstacles

Shove and Walk Around always create horizontal/vertical/45° segments; free-angle routing needs Highlight Collisions plus **Free angle mode**.

| Router setting | Notes |
|----------------|-------|
| Mode | Highlight Collisions / Shove / Walk Around |
| Free angle mode | Only in Highlight Collisions mode |
| Allow DRC violations | Only in Highlight Collisions mode |
| Shove vias | Only in Shove mode |
| Jump over obstacles | Only in Shove mode |
| Remove redundant tracks | Removes loops, keeping the most recently routed section |
| Optimize pad connections | Avoids acute angles when exiting pads and vias |
| Smooth dragged segments | Combines segments when dragging |
| Optimize entire track being dragged | Optimizes the visible rest of the dragged track |
| Use mouse path to set track posture | Picks posture from mouse movement |
| Fix all segments on click | On by default (KiCad 6+); off restores the old behavior |

Routing keys: `Enter`/click fix segments; `End` Finish Route; `Backspace` Undo Last Segment; `/` Switch Track Posture; `Ctrl+/` Track Corner Mode switch (45 degree (default), 45 degree rounded, 90 degree, 90 degree rounded; not in free angle mode; direct modes `Ctrl+W` 45, `Ctrl+Alt+W` 90, `Ctrl+Shift+W` arc 45, `Alt+W` arc 90); `Q` custom track/via size; `Ctrl+<` Interactive Router Settings; `Shift+Del` delete full track; `W` / `Shift+W` step through pre-defined track widths; `V` Place Via (switches to the other layer of the active layer pair); `PgUp`/`PgDn` select F.Cu/B.Cu; `+`/`-` next/previous layer (Actions Reference also lists `Ctrl++` / `Ctrl+-` for "Switch Track to Next/Previous Layer"); `<` Select Layer and Place Through Via; `'` / `\` increase/decrease via size; `Ctrl+V` microvia; `Alt+Shift+V` blind/buried via; `Shift+V` cycles layer pair presets (Set Layer Pair dialog). `Ctrl` disables grid snapping and `Shift` disables object snapping while routing. The line mode toggle on the left toolbar (free angle / 90° / 45°) uses `Shift+Space`. Track width and via size follow "use netclass values" or pre-defined sizes from the top toolbar; never below the Board Setup minimum.

Modifying tracks: `D` Drag (router-based; also drags tracks attached to selected footprints, Highlight Collisions only), `G` Drag Free Angle, `M` Move (no DRC), `U` expand selection (first to nearest junctions, then all connected), `Del` delete, right-click → Break Track. Free vias: `Ctrl+Shift+X` (net comes from the track/pad it touches, else a zone under it; "Automatically update via nets" is on only for the first case).

Convenience functions: **Route Selected** (`Shift+X`; routes from each selected pad or unrouted pads of selected footprints in selection order; right-click → Cancel Current Item skips one, `Esc` stops), **Route Selected From Other End** (`Shift+E`), `Ctrl+E` while routing (commit and continue from the other end of the ratsnest line), **Unroute Selected**. Automatic completion (current layer only, no vias): `F` while routing or **Attempt Finish**; **Attempt Finish Selected (Autoroute)** (`Shift+F`) for selected items.

Track and via properties (dialog or Properties Manager): net (vias with "Automatically update via nets" cannot have a manual net), track start/end/layer/width, optional solder mask opening with Expansion (added to each side), via position/type (through, micro, blind, buried)/layers, padstack mode (Normal, Front/Inner/Back, Custom), Annular rings (All copper layers; Start, end, and connected layers; Connected layers only; Start and end layers only = skip vias), via Protection features (IPC-4761: From rules, None, Type I tented, II covered and tented, III plugged, IV plugged and tented, V filled, VI filled and tented, VII filled and capped), via back-drilling and post-machining, via teardrops.

Bulk tools: **Edit → Edit Track & Via Properties…** (Scope tracks/vias/via type; filters by net, net class, layer, track width, via diameter, selection; action "Set to net class / custom rule values" or "Set to specified values": track layer and width, via size, annular rings, protection), **Tools → Remove Unused Pads…** (Remove Unused Layers / Restore All Layers; Vias, Pads, Selected only, Keep outside layers), **Tools → Cleanup Tracks & Vias…** (Refill zones before and after cleanup, Delete tracks connecting different nets, Delete redundant vias, Delete vias connected on only one layer, Merge co-linear tracks, Delete tracks unconnected at one end, Delete tracks fully inside pads; filters; **Build Changes** then **Update PCB**).

## Routing Differential Pairs

Differential pairs are nets sharing a base name with `+`/`-` or `P`/`N` suffixes (e.g. `USB+`/`USB-`, `USB_P`/`USB_N`); suffix styles cannot be mixed. Activate via the right toolbar, the **Route** menu, or hotkey `6`. Gap comes from the Net Classes section of Board Setup or custom rules; a short fan-out is created where start/end spacing differs. Switching layers creates two adjacent vias.

## Length Tuning

Serpentine tuning shapes are persistent objects added after routing. Tools: single-track length (`7`), differential pair length (`8`), differential pair skew (`9`). While tuning, `1`/`2` increase/decrease spacing and `3`/`4` increase/decrease amplitude. Only point-to-point nets between two pads are supported; differential pair length tuning applies only to coupled portions. Spacing, amplitude, corner style (fillet or chamfer), single-sided option, and target length/skew are editable in the pattern's properties; defaults are in Board Setup → Design Rules → Length-tuning Patterns. Time-domain (delay) tuning uses the same tools.

Target length/skew: in the pattern's properties (Target Length / Target Delay; Target Skew / Target Delay Skew; Delay in picoseconds), or via custom rules `length` / `skew` constraints, which override pattern targets unless "override custom rules" is checked in the pattern properties. A rule with time units (e.g. `ps`) switches matching nets to time-domain mode; time and length units cannot be mixed in one constraint. **Edit → Update All Tuning Patterns** recalculates patterns after rule changes.

```
(rule "target length and skew"
      (condition "A.hasNetclass('high_speed')")
      (constraint length (min 95mm) (opt 100mm) (max 105mm))
      (constraint skew (max 0.1mm)))
```

Notes: only point-to-point nets are tuned (the tuner stops at a branch; leftover stubs can break tuning, `Tools → Cleanup Tracks & Vias…` helps); vias count by layer-to-layer height unless "Include stackup height in track length calculations" is off. Time-domain delay = track delay (length × per-layer unit delay from the tuning profile) + via delay + pad-to-die delay; per-layer values appear in the Net Inspector with **Show Time Domain Details**. A net class referencing a deleted tuning profile raises a "Missing tuning profile" DRC violation.

## Teardrops

Extra copper smoothing the transition from track to pad, via, or a track of different width. Added in bulk via **Edit → Edit Teardrops…** (Scope: PTH pads, SMD pads, vias, track-to-track; filters by net, net class, layer, round pads, existing teardrops, selection; Remove Teardrops / Remove All Teardrops; add with default or specified values) or per via/pad in their properties (pad: Connections tab). Specified values: Prefer zone connection, Allow teardrops to span 2 track segments, Maximum track width, Best length, Maximum length, Best width, Maximum width, Curved edges (`-- leave unchanged --` keeps existing values). Teardrops are small zones, refilled with other zones.

## Backdrills / Hole Post-Machining

Applied to vias (Via Properties) and through-hole pads (Backdrill tab of Pad Properties).

- Back-drill mode: No back-drill (default), Back-drill from bottom, from top, from both; per side: Back-drill must-cut layer and Back-drill size (must exceed the original hole diameter)
- Post-machining mode per side: Not post-machined (default), Counterbore (Size, Depth), Countersink (Size, Angle, e.g. 82, 90, 100 degrees)

## Graphics and Text

- Shapes: tools Lines (`Ctrl+Shift+L`), Arcs (`Ctrl+Shift+A`), Bezier (`Ctrl+Shift+B`), Rectangles / rounded rectangles, Circles (`Ctrl+Shift+C`), Polygons (`Ctrl+Shift+P`). Arcs take 3 points; lines, polygons, beziers take any number and need a double click. Copper shapes can have a net but keep no clearance (unlike zones) and are not handled by the router. Arc editing modes (right-click the arc button, Preferences → PCB Editor → Editing Options, or `Ctrl+Space`): keep center/adjust radius; keep endpoints/direction; keep radius and center/adjust angle
- Shape properties: Line width (outline extends both sides), Line style (solid, dashed, dotted, dash-dot, dash-dot-dot), Filled shape (closed shapes), Rounded rectangle + Corner radius, Layer, net (copper), Solder mask + Expansion (on outer copper layers), Locked
- Shape Modification submenu: Heal Shapes, Simplify Polygons, Fillet Lines, Chamfer Lines, Dogbone Corners, Extend Lines to Meet, Move Corner To, Move Midpoint To, Create Corner, Remove Corner, Chamfer Corner, Edit Corners, Merge / Subtract / Intersect Polygons
- Create From Selection submenu: Create Polygon, Create Zone, Create Rule Area, Create Lines, Create Outsets (Outset distance, Round corners, Round outwards to grid multiples, Copy item layers, Copy item thickness), Create Tracks, Create Arc; polygon-style conversions offer copy line width of first object / use centerlines / create bounding hull, and delete source objects
- Vector graphics: **File → Import → Graphics…** (`Ctrl+Shift+F`) or drag and drop (DXF, SVG); options Import Scale, DXF default line width, DXF default units, Place At, Layer, Group imported items, Fix discontinuities
- Text: tool `Ctrl+Shift+T`; textbox (two corners); options Layer (copper text has no net), bold/italic, alignment, reverse, Knockout (text only, not text boxes), Font (TTF or KiCad stroke font; fonts are not embedded unless embedded in Board Setup), Thickness auto-adjust (size/8, bold size/5), Orientation, border (textbox) with width and style; margins only in the Properties Manager. Markup: `text^{superscript}`, `text_{subscript}`, `~{overbar}`, `${variable}`, `${refdes:field}`
- Tables: table tool (two corners), Table Properties (`Ctrl+E` on a cell, or `E` on the whole table), per-cell Table Cell Properties, borders (External, Header, Row Lines, Column lines), row/column add/delete/resize, Merge Cells / Unmerge Cells, **Export Table to CSV…**
- Dimensions: aligned, orthogonal, center, radial, leader. Format: Override value, Prefix, Suffix, Layer, Units (Automatic follows display units), Units format, Precision, Suppress trailing zeroes. Text: Position mode, Keep aligned with dimension. Lines: Line thickness, Arrow length (negative reverses), Arrow direction (Switch Dimension Arrows while drawing), Extension line offset and overshoot. Leader: Value, Text frame (circle, rectangle, none)
- Barcodes: Code 39, Code 128, Data Matrix (ECC 200), QR Code, Micro QR Code; options Text, Show text, Locked, Knockout with Min margin X/Y, Layer, Position, Size, Orientation, Text size, Error Correction (QR and Micro QR only)
- Points: nonphysical snap targets on a layer with a size; not in outputs
- **Edit → Edit Text & Graphic Properties…** (scope, filters by layer / parent reference / parent footprint library link / selection; set to specified values or layer defaults; `-- leave unchanged --`); **Tools → Cleanup Graphics…** (Merge lines into rectangles, Delete redundant graphics, Fix discontinuities in board outlines; applied with Update PCB)
- Title block: Page Settings tool (or double-click the drawing sheet); the date does not update automatically; a custom drawing sheet can be embedded with Embed File
- Text objects support variable substitution using `${VARIABLENAME}` syntax
- Graphical objects (lines, arcs, rectangles, circles, polygons, text, tables, dimensions, barcodes, points) can exist on any layer
- Shapes can be filled or outline-only

## Rule Areas (Keepouts)

Add with `Ctrl+Shift+K`. Arbitrary polygons whose Rule Area Properties dialog has Layers (at least one), optional Area name, Locked, and a Keepouts tab that raises DRC errors for tracks, vias, pads, zone fills, and/or footprints inside the area (zone fills also avoid the area when zones are kept out). A Placement tab holds multichannel settings. With no keepout rule selected, rule areas still scope custom DRC rules (by name).

## Locking

Toggle with `L`, properties dialogs, or the context menu. Locked items cannot be selected unless **Locked items** is enabled in the selection filter, and cannot be moved unless **Override locks** is enabled in the top toolbar (both off by default). Locked items show a colored shadow.

## Groups

Treat multiple objects as one for moving/rotating; relative positions are kept. Groups can be named, locked, and nested. **Grouping → Group Items** / **Ungroup Items**; **Enter Group** (or double-click) to edit members, `Esc` or **Leave Group** to leave; **Grouping → Remove Items** removes members. The group properties dialog has a Library link field (`<library>:<block>`) used for design blocks.

## Aligning and Distributing Objects

Right-click → **Align/Distribute**: Align to Left / Right / Top / Bottom / center (horizontal, vertical), **Distribute Horizontally** / **Distribute Vertically** (outermost objects stay fixed).

## Arrays

Select items, then right-click → **Create from Selection → Array…** (`Ctrl+T`):
- **Grid**: horizontal/vertical count and spacing, horizontal/vertical offset, Stagger (rows or columns), Grid Position (source items remain in place / center on source items)
- **Circular**: Center pos X/Y, Item count, Angle between items, Full circle, Clockwise/Anti-clockwise, Rotate items
- Common: Item Source (Duplicate selection / Arrange selection) and, for duplicates, Footprint Annotation (keep existing reference designators / assign unique reference designators)

## Using Reference Images

Add with the right toolbar button and click to place. Reference images are background aids with an associated layer (shown/hidden with it), editable in properties (`E`): Position X/Y, Associated layer, Height/Width/Scale (proportional), Convert to Greyscale. They are never included in fabrication outputs.

## Pin and Gate Swapping

Exchange nets between pads of one footprint (right-click → **Swap Pad Nets**) or between units of a multi-unit symbol with the same pin count (**Swap Gate Nets**). Swaps are unconstrained: KiCad does not check that pins are equivalent. Tracks, vias, and connected pads keep following (connected zones keep their nets; a prompt asks about unselected connected pads). With three or more items, nets cycle in selection order. The schematic is updated only through Update Schematic from PCB (Net Names option required; options "Prefer symbol unit swaps over label swaps" and "Prefer symbol pin swaps over label swaps").

## Notes

- `B` fills all zones; `Ctrl+B` unfills all zones
- Locking does not affect whether an item is included in outputs

## Related

- [02-display-and-selection-controls.md](./02-display-and-selection-controls.md)
- [04-board-setup.md](./04-board-setup.md)
- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
