# Hierarchical Schematics

Organize large designs across multiple sheets using hierarchical subsheets and cross-sheet net connections.

```
1. Add a subsheet to the parent sheet
   Schematic Editor → right toolbar: Add Hierarchical Subsheet
   Click to place rectangle → enter filename: power.kicad_sch

2. Define hierarchical labels inside the subsheet (power.kicad_sch)
   Press L for net label → change type to "Hierarchical Label"
   Place: PWR_EN  (type: Input), VOUT  (type: Output)

3. Sync pins on the parent sheet
   Select the subsheet rectangle → right-click
   → Sync Hierarchical Sheet Pins and Hierarchical Labels
   → imported pins appear on the subsheet symbol

4. Connect wires to the subsheet pins on the parent sheet

5. Cross-sheet connections (alternative: global labels)
   Press L → type: Global Label → name: GND
   Same global label name anywhere in the design connects electrically.

6. Navigate between sheets
   View → Hierarchy Navigator panel
   Double-click a sheet to open it; breadcrumb trail at top navigates upward.

Hierarchy types:
  Flat:     multiple root sheets, no parent-child (global labels / power symbols connect them)
  Simple:   each subsheet used exactly once
  Complex:  one subsheet instantiated from multiple parent sheets (reuse)
             → each instance generates separate net names; use global labels for shared nets
```

## Notes

- Hierarchical labels (child) pair with hierarchical sheet pins (parent); use "Sync Sheet Pins" to keep them in sync.
- Global labels take priority in net naming and span the entire design — prefer hierarchical labels for signals local to a hierarchy.
- In complex hierarchies (sheet reuse), each instance is electrically independent unless connected via global labels or power symbols.
- Multichannel PCB layout (Tools → Multi-Channel Layout) requires a hierarchical schematic structure; flat designs do not support automatic channel detection.
