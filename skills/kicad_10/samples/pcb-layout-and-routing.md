# PCB Layout and Routing

Import schematic data, place footprints, route tracks, and verify the board.

```
PCB Editor workflow:

1. Board setup
   File → Board Setup
     Physical Stackup: set number of copper layers (even numbers only)
     Constraints: set min track width, clearances per fab capability

2. Import schematic
   Tools → Update PCB from Schematic  (or F8)
   Review the Changes To Be Applied list → Update PCB

3. Draw board outline
   Select Edge.Cuts layer
   Use rectangle / line / arc tools to draw a closed outline
   (endpoints must coincide exactly; otherwise DRC reports "Board has malformed outline")

4. Place footprints
   - Connectors: place at board edges
   - Decoupling caps: place close to IC power pins
   - Check: no courtyard overlaps (Inspect → Design Rules Checker)

5. Route tracks
   Route Tracks tool (X)
   Click source pad → click destination pad to complete
   Press V during routing to insert a via (layer change)

6. Add copper zones (GND pour)
   Add Filled Zone tool (Ctrl+Shift+Z) → click first corner
   → Zone Properties: layer(s), net: GND → OK → click remaining corners, double-click to finish
   Edit → Fill All Zones  (or B)

7. Design Rule Check
   Inspect → Design Rules Checker → Run DRC
   Fix violations; refill zones (B) before final DRC run
   (or keep "Refill all zones before performing DRC" enabled)

8. 3D preview
   View → 3D Viewer
```

## Notes

- Zone filling is manual by default: press B to refill all copper zones before DRC (disabling "Refill all zones before performing DRC" can give incorrect results if zones are stale). Ctrl+B unfills.
- Ratsnest lines (thin flylines) show unrouted connections — minimizing crossings before routing simplifies the task.
- Through-hole pads have a hole on every layer and copper on multiple layers (can be limited to connected layers in pad properties); SMD pads exist on a single copper layer.
- A default stackup layer count (2-layer): not found in the 10.0 manual.
- DRC can also check schematic-to-PCB parity: enable "Test for parity between PCB and schematic" option.
