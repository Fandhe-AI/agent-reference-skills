# Gerber and Drill Output

Generate fabrication files (Gerbers + drill) from the PCB Editor for manufacturing submission.

```
PCB Editor → File → Plot

  Plot format: Gerber
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
    ☑ Use extended X2 format   (check that your fab's CAM accepts X2)
    ☑ Include netlist attributes
    ☐ Use Protel filename extensions

  → Plot  (one Gerber file per layer: .gbr, or Protel extensions such as .GTL/.GBL when "Use Protel filename extensions" is enabled)

  → Generate Drill Files
      Drill file format: Excellon
      Origin: Absolute
      Drill units: mm
      ☐ PTH and NPTH in single file   (leave unchecked: PTH and NPTH go to separate files by default)
    → Generate Drill File

Submit the output directory (all Gerber + drill (.drl) files) to the fabricator.
```

## Notes

- Run DRC before plotting, and make sure zone fills are current: either keep "Check zone fills before plotting" enabled in the Plot dialog or refill manually with B (plot output may be incorrect with stale zones).
- `Edge.Cuts` shapes must be closed (endpoints coincide exactly) and must not self-intersect or overlap each other; multiple closed shapes are allowed (shapes inside the outer outline become interior cutouts). Otherwise DRC reports "Board has malformed outline".
- IPC-2581 (`File → Fabrication Outputs → IPC-2581 File (.xml)…`) and ODB++ (`File → Fabrication Outputs → ODB++ Output File…`) are richer alternatives accepted by many modern fabricators.
- Verify fab house layer name conventions; some require Protel extensions (`.GTL`, `.GBL`, etc.) — disable "Use Protel filename extensions" if `.gbr` is required.
- The manual warns that X2 may not be compatible with older CAM software.
- Not found in the 10.0 manual: a "Generate separate through-hole / blind via files" option; the drill dialog only has "PTH and NPTH in single file".
