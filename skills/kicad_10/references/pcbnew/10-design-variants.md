# Design Variants

A single PCB can represent multiple product configurations. Variants are defined in the Schematic Editor (see the Schematic Editor manual's Design variants chapter) and transferred to the board through Update PCB from Schematic. The PCB Editor can view variant effects, select the active variant, and generate variant-specific output.

Common use cases: optional-feature components (populated or DNP), regional or regulatory variants, cost-reduced vs. full-featured versions.

## Selecting a Variant in the PCB Editor

The main toolbar contains a variant selector dropdown, identical in behavior to the Schematic Editor's. When a variant is active:

- Components marked DNP in that variant display an X on the fabrication layers
- Field text (Value, Footprint, custom fields) reflects the variant's overrides
- Text items using `${VARIANT}` or `${VARIANT_DESC}` resolve to the active variant's name and description
- Selecting `<Default>` returns to the base design with no overrides

## Viewing Variant Effects

| Area | Behavior |
|------|----------|
| Component visibility and DNP | DNP components for the variant are drawn with an X on F.Fab and B.Fab; the view updates in real time when switching variants |
| 3D viewer | Components marked DNP in the current variant are hidden; select the variant in the toolbar before or while viewing |
| Footprint properties | With a non-default variant active, the Properties panel and Footprint Properties dialog show the variant's overrides (field values, DNP attribute, exclusion flags) and edit them |

## Generating Variant-Aware Outputs

Several output dialogs include a variant selector; choose the variant before generating.

| Output | Variant Behavior |
|--------|-----------------|
| Gerber (File → Plot…) | Variant dropdown; with **Indicate DNP on fabrication layers** enabled, DNP components get an X on F.Fab and B.Fab |
| Component placement (File → Fabrication Outputs → Component Placement (.pos, .gbr)…) | Variant selector; components marked DNP or excluded from position files in the variant are omitted |
| 3D model export (File → Export → STEP/GLB/BREP/XAO/PLY/STL…) | Variant selector; DNP components are excluded from the model |
| ODB++ and IPC-2581 | Variant selection through the command line (`--variant` with `pcb export odb` / `pcb export ipc2581`); whether the GUI dialogs offer a variant selector is not stated in the 10.0 manual |

## Command-Line Variant Support

All PCB export commands in `kicad-cli` support `--variant`. Specify it more than once with `${VARIANT}` in the output path (single-quoted in shells) to produce separate files per variant. Works with `pcb export step`, `pcb export pos`, `pcb export dxf`, `sch export bom`, and others. Without `--variant`, the default variant is used.

```bash
kicad-cli pcb export gerbers \
    --variant "WiFi-only" \
    --variant "WiFi-BT" \
    -o 'gerbers_${VARIANT}/' \
    my_board.kicad_pcb
```

Adapted (not in the official docs): the output path is single-quoted so the shell does not expand `${VARIANT}`; see Notes.

## Notes

- `${VARIANT}` in output paths is expanded at export time and is independent of the `${VARIANT}` text variable used in schematic and board text items
- Corrected from the official docs (deviation from source): the manual's multi-variant example double-quotes the output path (`-o "gerbers_${VARIANT}/"`); POSIX shells and PowerShell expand `${VARIANT}` inside double quotes to an empty string, so single-quote the path so that kicad-cli receives the literal `${VARIANT}`
- The PCB Editor manual says all PCB export commands support `--variant`, but the 10.0 CLI manual's option tables list it only for gerbers, dxf, pdf, ps, svg, pos, step, vrml, 3dpdf, odb, ipc2581 and render (not drill, gencad, ipcd356, stats, glb, brep, ply, stl, stpz, u3d, xao); verify with `kicad-cli pcb export <fmt> -h`. `sch export bom` named in the body sentence is a schematic command, not a PCB one
- Per-variant behavior of BOM, plots other than Gerber, and "all variants share the same layout": not found in the 10.0 PCB Editor manual

## Related

- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
