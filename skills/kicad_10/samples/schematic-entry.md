# Schematic Entry

Draw a circuit schematic by placing symbols, wiring pins, and running ERC.

```
Schematic Editor workflow:

1. Page setup
   File → Page Settings  (title, revision, paper size)

2. Add symbols
   Press A  →  search "LED", select, place
   Press A  →  search "R", select, place resistor
   Press P  →  add power symbol (VCC, GND)

3. Wire connections
   Press W  →  click pin → click pin to complete wire
   Press L  →  place net label (e.g. "SIG_OUT") to connect without wire

4. Edit symbol properties
   Press E on a symbol → set Value, Reference (e.g. R1 = 10k)

5. Assign footprints
   Tools → Assign Footprints…
   Filter by symbol filters / pin count / library / text → double-click package → OK

6. Annotate
   Annotation tool (top toolbar; action "Annotate Schematic…")

7. Electrical Rules Check
   Inspect → Electrical Rules Checker → Run ERC
   Add PWR_FLAG symbol to VCC and GND nets if "Input Power pin not driven by any Output Power pins" errors appear

8. Export netlist (optional, for external tools)
   File → Export → Netlist…  (KiCad, OrcadPCB2, Allegro, PADS, CADSTAR, Spice, Spice Model)
```

## Notes

- Local net labels (L) with the same name connect only within the same sheet; global power symbols with the same Value connect anywhere in the schematic (local power symbols are the exception). Use global labels (Ctrl+L) for signals across sheets.
- `PWR_FLAG` (Power library) is required on nets supplied by battery/connector rather than a power-output pin.
- Getting Started (10.0) names the top-toolbar button "Fill in schematic symbol reference designators"; symbols are auto-annotated by default.
- ERC cannot verify circuit correctness — it only checks connection rules.
- Drag with G keeps attached wires; move with M detaches them.
