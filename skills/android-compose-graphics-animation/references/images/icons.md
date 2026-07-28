# Icons (Material icon set)

Predefined set of `ImageVector` constants (`Icons.Filled.*`, `Icons.Outlined.*`, etc.) drawable with `Image` or `Icon`, without manually importing SVG/XML assets.

## Signature / Usage

```kotlin
Icon(
    imageVector = Icons.Filled.Mail,
    contentDescription = "Email",
)
```

## Notes

- Package: `androidx.compose.material.icons` (`Icons` object, e.g. `Icons.Filled`, `Icons.Outlined`, `Icons.Rounded`).
- The `androidx.compose.material.icons` extended `Icons` library is no longer maintained, has an older visual style, and can significantly increase build time; avoid adding it to new apps.
- Recommended replacement: download individual Material Symbols XML files from Google Fonts Icons (`fonts.google.com/icons`, Android tab) and load them with `painterResource()` instead.
- The `Icon` composable itself (tinted, `24.dp` default, accepts `ImageVector`/`ImageBitmap`/`Painter`) is documented in the `android-compose-components` skill's `feedback` category, not here.

## Related

- [ImageVector](./imagevector.md)
- [rememberVectorPainter](./remembervectorpainter.md)
