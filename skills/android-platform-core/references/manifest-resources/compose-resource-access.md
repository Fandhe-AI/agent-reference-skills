# Accessing resources from Compose

Typed Compose functions for reading `res/` resources, and dynamic lookup caveats.

## Signature / Usage

```kotlin
Text(text = stringResource(R.string.compose))
Text(text = stringResource(R.string.congratulate, "New Year", 2021))
Text(text = pluralStringResource(R.plurals.runtime_format, quantity, quantity))

val padding = dimensionResource(R.dimen.padding_small)
val divider = colorResource(R.color.purple_200)

Icon(painter = painterResource(id = R.drawable.ic_logo), contentDescription = null)

val fontFamily = FontFamily(Font(R.font.raleway_regular, FontWeight.W400))
```

## Options / Props

| Function | Signature | Description |
|----------|-----------|--------------|
| `stringResource` | `(id: Int, vararg formatArgs: Any): String` | Reads a `<string>`, with optional `%1$s`-style formatting. |
| `pluralStringResource` | `(id: Int, quantity: Int, vararg formatArgs: Any): String` | Reads a `<plurals>` entry selected by `quantity` (experimental API). |
| `dimensionResource` | `(id: Int): Dp` | Reads a `<dimen>`. |
| `colorResource` | `(id: Int): Color` | Reads a `<color>`; flattens color state lists. Prefer `MaterialTheme.colorScheme.*` for theme-consistent colors over hard-coded resource colors. |
| `painterResource` | `(id: Int): Painter` | Loads a bitmap or vector drawable; decodes on the main thread, cannot load custom `Drawable` subclasses. |
| `stringArrayResource` | `(id: Int): Array<String>` | Reads a `<string-array>`. |
| `Font(resourceId, weight)` | — | Loads a font from `res/font/` for use in a `FontFamily`. |

## Notes

- Dynamic lookup via `Resources.getIdentifier(name, type, package)` (resolving a resource by string name at runtime) is discouraged — retrieving resources by compile-time `R` identifier is more efficient and type-safe; reserve `getIdentifier` for cases where the resource name is only known at runtime.
- For animated vector drawables, use `AnimatedImageVector.animatedVectorResource(id)` with `rememberAnimatedVectorPainter(image, atEnd)`.
- Material icon set is available via `Icons.<Theme>.<Name>` (Filled/Outlined/Rounded/TwoTone/Sharp); the extended set requires the `material-icons-extended` artifact.

## Related

- [string resources](./string-resources.md)
- [drawable resources](./drawable-resources.md)
- [value resources](./value-resources.md)
