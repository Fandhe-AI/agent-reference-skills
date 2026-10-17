# Design Variants

Design variants allow multiple product configurations to be managed within a single schematic, eliminating the need for duplicate project files.

## Understanding Design Variants

A variant is a named configuration that overrides specific component properties. A single schematic can produce variant-specific BOMs, position files, and plots for each configuration (connectivity and netlist stay shared; `sch export netlist` accepts `--variant`).

Common use cases: different resistor values for regional variants, optional feature components (DNP for cost-reduced versions), different package sizes for alternate manufacturing.

## Types of Variation

| Variation type | Description |
|----------------|-------------|
| Value / Footprint / other fields | Any symbol field except Reference can be overridden per variant (e.g., R1 = 10kΩ in Variant A, 20kΩ in Variant B) |
| DNP (Do Not Populate) | Component is assembled in some variants but omitted in others; drawn with an X |
| Exclusion flags | Exclude from BOM, Exclude from position files, Exclude from simulation, independent of each other and of DNP |
| Sheet-level | DNP and exclusion flags can be set on a hierarchical sheet and apply to all nested components |

## Creating and Managing Variants

- Toolbar: open the variant selector dropdown in the main toolbar and choose **Add New Design Variant…** (name plus optional description)
- Symbol Fields Table (**Tools** → **Bulk Edit Symbol Fields…**): click **Add** in the variant list on the left; **Delete**, **Rename**, and **Copy** are also available
- Names must be unique (case-insensitive) and cannot be `<Default>`; the default variant cannot be deleted, renamed, or copied
- Switch variants from the toolbar dropdown; `<Default>` returns to the base design

## Editing Variant Data

In the **Symbol Fields Table** (**Tools** → **Bulk Edit Symbol Fields…**), pick a variant in the left list and edit the grid. For each symbol row, you can specify:

- An alternative value or any other field for the selected variant (overridden cells are highlighted: yellow in light themes, gold in dark themes)
- DNP, Exclude from BOM, Exclude from Position Files, Exclude from Simulation (checkbox columns)

Clearing a cell or matching the default value removes the override. While a non-default variant is active, edits in the canvas, Properties panel, and Symbol Properties dialog update that variant only; the base design is unchanged.

## Generating Variant-Aware Outputs

### BOM

Open the BOM tool via **Tools** → **Generate Bill of Materials…**. The exported BOM reflects the active variant's field values and respects its DNP and BOM exclusion flags. Use `${VARIANT}` in the output path (e.g. `bom_${VARIANT}.csv`) to write one file per variant.

### Schematic Plot

The Plot Schematic dialog (**File** → **Plot…**) has a variant selector; the default variant plots the base design.

## Command-Line Variant Support

`--variant` is supported by `sch export bom`, `pdf`, `svg`, `dxf`, `ps`, and `netlist`. Repeat `--variant` for several variants and use `${VARIANT}` in the `-o` path. Without `--variant`, the default variant is used.

Example (KiCad CLI):
```
kicad-cli sch export pdf --variant "WiFi-only" my_project.kicad_sch
```

Multiple variants (single-quote the output path so the shell does not expand `${VARIANT}`):
```
kicad-cli sch export pdf --variant "WiFi-only" --variant "WiFi-BT" -o 'schematic_${VARIANT}.pdf' my_project.kicad_sch
```

## Text Variables for Variants

`${VARIANT}` resolves to the active variant name (empty string for the default variant); `${VARIANT_DESC}` resolves to its description. Both update when switching variants and appear in plotted output.

## Transferring Variants to the PCB Editor

Variant data is transferred by **Tools** → **Update PCB from Schematic…** (DNP flags, exclusion flags, field overrides, for every variant); removed overrides reset the footprint to the base value. Data flows schematic to PCB only. The PCB Editor toolbar variant selector is then populated.

## Notes

- The default variant represents the "no override" state — all components use their base schematic values.
- Netlist: `sch export netlist` accepts `--variant`; the 10.0 manual does not describe variant behavior in the GUI netlist export dialog (not found).
- Variants are an assembly-level feature: all variants share the same copper, netlist, and board outline.
- Menu label: the 10.0 manual calls the Symbol Fields Table entry both **Edit Symbol Fields…** (footprint and import chapters) and **Bulk Edit Symbol Fields…** (this chapter and the actions reference). The Symbol Fields Table also opens from a top-toolbar button.
- Not found in the 10.0 manual: a **Schematic Setup** → **Variants** tab, an **Add Variant** button in Schematic Setup, and the claim that DNP components appear greyed out or struck through in plots (the manual says drawn with an X).

- Deviation from source: the manual's multi-variant example double-quotes the output path (`-o "schematic_${VARIANT}.pdf"`); POSIX shells and PowerShell expand `${VARIANT}` inside double quotes to an empty string (output becomes `schematic_.pdf`), so single-quote the path (`-o 'schematic_${VARIANT}.pdf'`) so that kicad-cli receives the literal `${VARIANT}`.
- The CLI manual shows `--variant VAR` once per command, while the Schematic Editor manual's design-variants chapter repeats `--variant` to export several variants in one call; verify with `kicad-cli sch export <fmt> -h`.

## Related

- [Generating Outputs](./07-generating-outputs.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Advanced Topics](./14-advanced-topics.md)
