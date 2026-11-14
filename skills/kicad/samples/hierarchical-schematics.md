# Hierarchical Schematics

Organize large designs across multiple sheets using hierarchical subsheets and cross-sheet net connections.

```
1. Add a subsheet to the parent sheet
   Schematic Editor → right toolbar: Draw Hierarchical Sheets (S)
   Click twice (or drag) for the rectangle → Sheet Properties: name + filename power.kicad_sch

2. Define hierarchical labels inside the subsheet (power.kicad_sch)
   Press H for hierarchical label (or L, then convert with Change To)
   Place: PWR_EN  (shape: Input), VOUT  (shape: Output)

3. Sync pins on the parent sheet
   Select the subsheet rectangle → right-click
   → Sync Sheet Pins   (or Place Sheet Pin)
   → imported pins appear on the subsheet symbol

4. Connect wires to the subsheet pins on the parent sheet

5. Cross-sheet connections (alternative: global labels)
   Press Ctrl+L → Global Label → name: GND
   Same global label name anywhere in the design connects electrically.

6. Navigate between sheets
   View → Panels → Hierarchy Navigator
   Click a sheet to open it; right-click empty space → Leave Sheet returns to the parent.

Hierarchy types:
  Flat:     multiple root sheets, no parent-child (global labels / power symbols connect them)
  Simple:   each subsheet used exactly once
  Complex:  the same sheet file used by multiple sheet symbols (reuse; e.g. 4 symbols in one root sheet referencing channel_strip.kicad_sch)
             → each instance has its own nets; connect them through sheet pins in the parent, or global labels/power symbols
```

## Notes

- Hierarchical labels (child) pair with hierarchical sheet pins (parent); use "Sync Sheet Pins" to keep them in sync.
- Global labels take priority in net naming and span the entire design — prefer hierarchical labels for signals local to a hierarchy.
- In complex hierarchies (sheet reuse), each instance is electrically independent unless connected via hierarchical sheet pins in the parent, global labels, or power symbols.
- Multichannel PCB layout (Tools → Multi-Channel Layout) requires a hierarchical schematic structure; flat designs do not support automatic channel detection. Not found in the Schematic Editor manual (the multichannel tool is described in the PCB Editor manual; it only mentions that components can be grouped into channels with a Component Class field or rule areas).
- Not found in the 10.0 manual: a breadcrumb trail for navigating upward.
