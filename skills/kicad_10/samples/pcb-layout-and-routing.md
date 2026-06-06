# PCB Layout and Routing

Import schematic data, place footprints, route tracks, and verify the board.

```
PCB Editor workflow:

1. Board setup
   File → Board Setup
     Stackup: select layer count (default 2-layer)
     Constraints: set min track width, clearances per fab capability

2. Import schematic
   Tools → Update PCB from Schematic  (or F8)
   Review proposed changes → Apply

3. Draw board outline
   Select Edge.Cuts layer
   Use rectangle / line / arc tools to draw a closed outline

4. Place footprints
   - Connectors: place at board edges
   - Decoupling caps: place close to IC power pins
   - Check: no courtyard overlaps (Inspect → Design Rules Checker)

5. Route tracks
   Route Tracks tool (X)
   Click source pad → click destination pad to complete
   Press V during routing to insert a via (layer change)

6. Add copper zones (GND pour)
   Add a Filled Zone → net: GND → draw boundary
   Edit → Fill All Zones  (or B)

7. Design Rule Check
   Inspect → Design Rules Checker → Run DRC
   Fix violations; refill zones (B) before final DRC run

8. 3D preview
   View → 3D Viewer
```

## Notes

- Press B to refill all copper zones; always refill before DRC to avoid false clearance violations.
- Ratsnest lines (thin flylines) show unrouted connections — minimizing crossings before routing simplifies the task.
- Through-hole pads connect to all copper layers; SMD pads connect only to their layer.
- DRC can also check schematic-to-PCB parity: enable "Test for parity between PCB and schematic" option.
