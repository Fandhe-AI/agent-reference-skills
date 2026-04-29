# Design Variants

Design variants allow multiple product configurations to be managed within a single schematic, eliminating the need for duplicate project files.

## Understanding Design Variants

A variant is a named configuration that overrides specific component properties. A single schematic can produce variant-specific BOMs, netlists, and other outputs for each configuration.

Common use cases: different resistor values for regional variants, optional feature components (DNP for cost-reduced versions), different package sizes for alternate manufacturing.

## Types of Variation

| Variation type | Description |
|----------------|-------------|
| Value | Different component value per variant (e.g., R1 = 10kΩ in Variant A, 20kΩ in Variant B) |
| Footprint | Different PCB footprint per variant (e.g., alternate package) |
| DNP (Do Not Populate) | Component is assembled in some variants but omitted in others |

## Creating and Managing Variants

Variants are configured in **File** → **Schematic Setup** → **Variants** tab.

- Click **Add Variant** to create a new named variant
- Set a **default variant** representing the baseline design
- Variants are stored within the schematic project

## Editing Variant Data

The **Symbol Fields Table** (**Tools** → **Edit Symbol Fields**) includes a variant column for each defined variant. For each symbol row, you can specify:

- An alternative value for a specific variant
- An alternative footprint for a specific variant
- DNP status (checked = do not populate for that variant)

Changes apply only to the selected variant and do not affect the default design data.

## Generating Variant-Aware Outputs

### BOM

When generating a BOM, select the target variant. The output will:
- Exclude components marked DNP for that variant
- Use the variant-specific values and footprints

### Netlist

Generate a variant-specific netlist with only the components active in the selected variant.

## Command-Line Variant Support

The KiCad CLI supports variant selection flags for batch processing, enabling automated build pipelines to generate outputs for all variants without manual UI interaction.

Example (KiCad CLI):
```
kicad-cli sch export bom --variant "Variant_A" design.kicad_sch
```

## Text Variables for Variants

The `${VARIANT}` text variable exposes the current variant name for use in labels, title blocks, and symbol fields, enabling dynamic annotation based on the active variant.

## Transferring Variants to the PCB Editor

Variant data synchronizes to the PCB Editor via forward annotation. The PCB Editor reflects the active variant's component population, enabling variant-specific assembly drawings and fabrication outputs.

## Notes

- The default variant represents the "no override" state — all components use their base schematic values.
- DNP components appear greyed out or struck through in variant-aware plot outputs.
- Variants are independent of net connectivity; they only change component attributes, not the electrical topology.

## Related

- [Generating Outputs](./07-generating-outputs.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
- [Advanced Topics](./14-advanced-topics.md)
