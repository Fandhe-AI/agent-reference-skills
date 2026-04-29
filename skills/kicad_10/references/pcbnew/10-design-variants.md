# Design Variants

Manage multiple board configurations (e.g., different component populations) from a single PCB design file.

## Overview

Design variants allow producing different board versions from one base design. Common use cases:
- Optional feature components (populated or DNP)
- Regional or regulatory variants
- Cost-reduced vs. full-featured product versions

Variants are defined in the schematic (via component attributes) and reflected in the PCB editor.

## Selecting a Variant in the PCB Editor

Switch the active variant via the variant selector in the PCB editor interface. The selected variant determines which components are shown as populated and which are marked DNP (Do Not Populate).

## Viewing Variant Effects

When a variant is active:
- **DNP components** are visually distinguished on the canvas
- The board reflects the specific component loading for that variant
- Useful for visual verification before generating variant-specific outputs

## Generating Variant-Aware Outputs

Fabrication files and documentation can be generated per variant:

| Output | Variant Behavior |
|--------|-----------------|
| BOM | Includes only populated components for the selected variant |
| Component placement files | Excludes DNP components |
| Gerbers/plots | Copper and silkscreen reflect DNP status |
| 3D export | DNP components can be hidden |

Generate outputs with the desired variant selected to produce variant-specific files.

## Command-Line Variant Support

KiCad supports batch generation of variant-specific outputs via command-line tools, enabling:
- CI/CD integration for automated output generation
- Scripted multi-variant export without manual PCB editor interaction
- Build systems that produce all variant outputs in one pass

## Notes

- DNP status is set on schematic symbols; it propagates to the PCB via forward annotation
- All variants share the same board layout; placement and routing are common across variants
- Variant-aware BOM generation requires the variant to be selected before export

## Related

- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
