# Gerber and Drill Output

Generate fabrication files (Gerbers + drill) from the PCB Editor for manufacturing submission.

```
PCB Editor → File → Plot

  Format: Gerber
  Layers to plot (typical 2-layer board):
    ☑ F.Cu          (front copper)
    ☑ B.Cu          (back copper)
    ☑ F.Paste       (front solder paste)
    ☑ B.Paste       (back solder paste)
    ☑ F.Silkscreen  (front silkscreen)
    ☑ B.Silkscreen  (back silkscreen)
    ☑ F.Mask        (front solder mask)
    ☑ B.Mask        (back solder mask)
    ☑ Edge.Cuts     (board outline)

  Options:
    ☑ Use Gerber X2 format (recommended)
    ☑ Include netlist attributes

  → Plot  (generates one .gbr file per layer)

  → Generate Drill Files
      Format: Excellon
      Drill origin: Absolute
      Units: mm
      ☑ Generate separate through-hole / blind via files
    → Generate Drill File

Submit the output directory (all .gbr + .drl files) to the fabricator.
```

## Notes

- Always run DRC and refill zones (B) before plotting to avoid false clearance errors in the output.
- `Edge.Cuts` must contain a single, closed, non-self-intersecting outline; open contours cause fabrication rejections.
- IPC-2581 (`File → Export → IPC-2581`) and ODB++ (`File → Export → ODB++`) are richer alternatives accepted by many modern fabricators.
- Verify fab house layer name conventions; some require Protel extensions (`.GTL`, `.GBL`, etc.) — disable "Use Protel filename extensions" if `.gbr` is required.
