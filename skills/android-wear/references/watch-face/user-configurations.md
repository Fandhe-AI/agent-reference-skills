# User Configurations (Boolean, List, Color, Flavors)

`<UserConfigurations>` declares user-adjustable style options edited through the Watch Face Editor: `<BooleanConfiguration>` (toggle), `<ListConfiguration>` (discrete choice), `<ColorConfiguration>` (color theme), and `<Flavors>` (presets bundling multiple configuration values).

## Signature / Usage

```xml
<UserConfigurations>
    <BooleanConfiguration id="show_date" displayName="show_date_label"
        screenReaderText="show_date_label" defaultValue="TRUE" />
    <ColorConfiguration id="myThemeColor" displayName="theme_label" defaultValue="0">
        <ColorOption id="0" displayName="relaxed_label" colors="#3083dc #f8ffe5 #7dde92" />
        <ColorOption id="1" displayName="urban_label" colors="#f4b393 #fc60a8 #7a28cb" />
    </ColorConfiguration>
</UserConfigurations>

<BooleanConfiguration id="show_date">
    <BooleanOption id="TRUE"><!-- content when shown --></BooleanOption>
    <BooleanOption id="FALSE"><!-- content when hidden --></BooleanOption>
</BooleanConfiguration>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `BooleanConfiguration.id` / `displayName` / `screenReaderText` / `defaultValue` | string | — | `defaultValue` is `"TRUE"` or `"FALSE"`. |
| `ListConfiguration.id` / `displayName` / `icon` / `defaultValue` | string | — | `defaultValue` is the default `ListOption.id`. |
| `ListOption.id` / `displayName` / `icon` / `screenReaderText` | string | — | One selectable entry in a `ListConfiguration`. |
| `ColorConfiguration.id` / `displayName` / `defaultValue` | string | — | `defaultValue` is the default `ColorOption.id`. |
| `ColorOption.id` / `displayName` / `colors` | string | — | `colors` is a space-separated list of hex values (theme palette). |
| `Flavors.defaultValue` | string | — | Default `Flavor.id`. Requires `FlavorsSupported=true` in `watch_face_info.xml`; WFF v2+. |
| `Flavor.id` / `displayName` / `screenReaderText` | string | — | A named preset; contains `<Configuration id optionId>` and optional `<ComplicationSlot>` overrides. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Reference a configuration value in expressions via `[CONFIGURATION.<id>]`, e.g. `[CONFIGURATION.show_date] == "TRUE"`; for `ColorConfiguration`, index a specific color with `[CONFIGURATION.myThemeColor.0]` or omit the index for a single-color use.
- `<Flavors>` lets a `Flavor` bundle multiple `<Configuration>` selections and `<ComplicationSlot>` default-provider overrides into one user-facing preset.
- Requires the watch face to be declared `Editable=true` in `watch_face_info.xml` for the Watch Face Editor to expose these options (see [setup](./setup.md)).

## Related

- [expressions](./expressions.md)
- [complications](./complications.md)
- [personalization-and-photos](./personalization-and-photos.md)
