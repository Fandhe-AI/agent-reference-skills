# Design Variants

Manage multiple product configurations (value overrides, DNP, alternate packages) within a single schematic.

```
1. Define variants
   Main toolbar variant dropdown → Add New Design Variant…
   (or Tools → Bulk Edit Symbol Fields… → Add in the variant list)
   → "CostReduced"   (the default variant always exists as <Default>)

2. Edit per-variant component data
   Tools → Bulk Edit Symbol Fields…  (Symbol Fields Table)

   Select CostReduced in the variant list on the left; the grid then shows
   that variant's data. Edit cells directly (overridden cells are highlighted):
   | Ref | Field     | <Default> | CostReduced |
   |-----|-----------|-----------|-------------|
   | R5  | Value     | 10k       | 4.7k        |
   | U2  | DNP       | ☐         | ☑           |
   | C3  | Footprint | C_0402    | C_0805      |
   (illustrative; the real grid shows one variant at a time, and DNP /
   Exclude from BOM / Position Files / Simulation are checkbox columns)

3. Generate variant-specific BOM via CLI
   kicad-cli sch export bom \
     --variant "CostReduced" \
     --output bom-cost-reduced.csv \
     --exclude-dnp \
     my-board.kicad_sch

4. Generate variant-specific netlist
   kicad-cli sch export netlist \
     --variant "CostReduced" \
     --output netlist-cost-reduced.net \
     my-board.kicad_sch

5. Use ${VARIANT} text variable in title block
   File → Page Settings → Title field: "My Board - ${VARIANT}"
   (renders as "My Board - CostReduced" when that variant is active)
```

## Notes

- Variants override symbol fields (any field except Reference), DNP, and the Exclude from BOM / Position Files / Simulation flags, per symbol instance or per sheet. All variants share the same netlist, copper, and board outline.
- DNP components are drawn with an X; `--exclude-dnp` is a CLI option not covered by the Schematic Editor manual (not found in the 10.0 manual's variants chapter).
- The 10.0 manual labels the Symbol Fields Table menu entry both `Edit Symbol Fields…` and `Bulk Edit Symbol Fields…`; the table also opens from a top-toolbar button.
- The default variant represents the "no override" baseline; all components use their base schematic values.
- Variant data synchronizes to the PCB Editor via forward annotation (Tools → Update PCB from Schematic).
- PCB Editor side: pick the variant in the main toolbar dropdown (DNP parts get an X on F.Fab/B.Fab; the 3D viewer hides them); the Plot, Component Placement, and 3D model export dialogs have variant selectors; `kicad-cli pcb export ... --variant "CostReduced"` produces per-variant files; `${VARIANT}` can be used in `-o`, e.g. `-o 'gerbers_${VARIANT}/'`. ODB++ and IPC-2581 take the variant through the command line only.
- Corrected from the official docs: the 10.0 Schematic/PCB Editor manuals double-quote `${VARIANT}` in `-o`, which POSIX shells and PowerShell expand to an empty string; single-quote it.
- The Schematic/PCB Editor manuals show `--variant` repeated in one call, while the CLI manual lists it once per command; verify with `kicad-cli ... -h`.
