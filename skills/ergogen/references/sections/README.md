# Sections

| Name | Description | Path |
|------|-------------|------|
| Metadata | `meta` top-level fields: engine version constraint, KiCad version/author embedding, and arbitrary documentation fields. | [metadata.md](./metadata.md) |
| Units | Named numeric variables and built-in spacings (u, cx, cy) used as math formulas throughout the config. | [units.md](./units.md) |
| Points | 2D key position system: anchors, column/row zones with inheritance, and post-layout rotation/mirroring adjustments. | [points.md](./points.md) |
| Outlines | 2D shape assembly from rectangle/circle/polygon primitives placed at key points, combined via boolean operations. | [outlines.md](./outlines.md) |
| Cases | 3D solid generation by extruding outlines and composing them in space; produces JSCAD output. | [cases.md](./cases.md) |
| PCBs | Footprint placement, net assignment, and KiCad PCB file generation. | [pcbs.md](./pcbs.md) |
