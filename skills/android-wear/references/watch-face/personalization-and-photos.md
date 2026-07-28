# Personalization and Photo Support

Personalization spans user configurations (appearance customization) and `<PhotosConfiguration>`/`<Photos>` (letting the user pick their own images for display).

## Signature / Usage

```xml
<UserConfigurations>
    <PhotosConfiguration id="photoConfig" configType="SINGLE"/>
</UserConfigurations>

<PartImage x="100" y="50" width="100" height="100">
    <Photos source="[CONFIGURATION.photoConfig]" defaultImageResource="default_image"/>
</PartImage>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PhotosConfiguration.id` | string | — | Unique identifier; only one `PhotosConfiguration` is allowed per watch face. |
| `PhotosConfiguration.configType` | enum | — | `SINGLE` (one image) or `MULTIPLE` (a cyclable collection). |
| `Photos.source` | expression | — | References the `PhotosConfiguration` id, e.g. `[CONFIGURATION.photoConfig]`. |
| `Photos.defaultImageResource` | string | required | Drawable shown before the user selects a photo. |
| `Photos.change` | enum | — | For `MULTIPLE`: cycling trigger, `TAP` and/or `ON_VISIBLE`. |
| `Photos.changeAfterEvery` | int | `3` | For `ON_VISIBLE`: number of visibility events before the photo cycles. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Requires WFF version 4 or higher, and `Editable=true` / user selections configured through the companion app.
- `<Photos>` is placed inside `<PartImage>`, alongside/instead of `<Image>` (see [images](./images.md)).

## Related

- [user-configurations](./user-configurations.md)
- [images](./images.md)
- [setup](./setup.md)
