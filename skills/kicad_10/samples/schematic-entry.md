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
   Tools → Assign Footprints
   Filter by library / pin count / text → select package → OK

6. Annotate
   Tools → Fill in Schematic Symbol Reference Designators

7. Electrical Rules Check
   Inspect → Electrical Rules Checker → Run ERC
   Add PWR_FLAG symbol to VCC and GND nets if "power pin undriven" errors appear

8. Export netlist (optional, for external tools)
   File → Export → Netlist → KiCad format
```

## Notes

- Net labels (L) and power symbols with the same name are electrically connected even without a visible wire.
- `PWR_FLAG` (Power library) is required on nets supplied by battery/connector rather than a power-output pin.
- ERC cannot verify circuit correctness — it only checks connection rules.
- Drag with G keeps attached wires; move with M detaches them.
