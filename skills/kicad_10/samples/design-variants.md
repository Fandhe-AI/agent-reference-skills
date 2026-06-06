# Design Variants

Manage multiple product configurations (value overrides, DNP, alternate packages) within a single schematic.

```
1. Define variants
   Schematic Editor → File → Schematic Setup → Variants tab
   → Add Variant: "Full"   (set as default)
   → Add Variant: "CostReduced"

2. Edit per-variant component data
   Tools → Edit Symbol Fields  (Symbol Fields Table)

   In the variant columns:
   | Ref | Value    | Full (default) | CostReduced          |
   |-----|----------|----------------|----------------------|
   | R5  | 10k      |                | 4.7k                 |
   | U2  | OLED_Drv | (populated)    | DNP ☑ (omit)        |
   | C3  | 100n     | C_0402         | C_0805 (alt package) |

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

- Variants change component attributes only (value, footprint, DNP); they do not alter electrical connectivity.
- DNP components appear greyed out in variant-aware plot outputs and are excluded from BOM when `--exclude-dnp` is used.
- The default variant represents the "no override" baseline; all components use their base schematic values.
- Variant data synchronizes to the PCB Editor via forward annotation (Tools → Update PCB from Schematic).
