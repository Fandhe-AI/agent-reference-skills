# WFF Versions

Each Watch Face Format version aligns with a minimum Wear OS release and unlocks new elements/attributes. Declare the version in the manifest (see [setup](./setup.md)).

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Version 1 | int | — | Minimum Wear OS 4 / API 33. Baseline: style editing, groups, complications, tag expressions. |
| Version 2 | int | — | Minimum Wear OS 5 / API 34. Adds `<Flavors>`, `GOAL_PROGRESS` and `WEIGHTED_ELEMENTS` complication types, weather data sources, heart-rate complication data source. |
| Version 3 | int | — | Minimum Wear OS 5.1 / API 35. Adds auto-sizing text, `blendMode`, weighted constraints on line elements, additional (mostly time-zone) data sources. |
| Version 4 | int | — | Minimum Wear OS 6 / API 36. Adds user-selected photos (`<Photos>`), ambient-mode transitions, color transformations on most elements and grouped tinting, `<Reference>` for single-sourcing transform configuration. |
| Version 5 | int | — | Adds `blendMode` on `Group`/`ComplicationSlot`, line spacing/vertical alignment on `Text`, auto-sizing/vertical alignment on `TextCircular`, `minSize` on `Font`, `join` (corner rendering) on `Stroke`/`WeightedStroke`, nested settings and dynamic complications on `ListOption`. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Set the manifest version to the lowest value that supports the features actually used, to maximize device compatibility (see [setup](./setup.md)).
- Each version's exact element/attribute availability can be inspected in the XML schema reference by selecting the version at `/reference/wear-os/wff/watch-face`.

## Related

- [overview](./overview.md)
- [setup](./setup.md)
