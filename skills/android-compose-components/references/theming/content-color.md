# LocalContentColor / contentColorFor

`LocalContentColor` is the `CompositionLocal` holding the preferred content (text/icon) color at a given position in the hierarchy. `contentColorFor(backgroundColor)` resolves the matching "on" color for a `ColorScheme` background role.

## Signature / Usage

```kotlin
val LocalContentColor: ProvidableCompositionLocal<Color> = compositionLocalOf { Color.Black }

@Composable
@ReadOnlyComposable
fun contentColorFor(backgroundColor: Color): Color
```

```kotlin
// Read the ambient content color
val color = LocalContentColor.current

// Override content color for a subtree (M3 replacement for M2 ContentAlpha)
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurface) {
    Icon(imageVector = Icons.Default.Star, contentDescription = null)
}

// Resolve the "on" color that pairs with a given background
Surface(color = MaterialTheme.colorScheme.primary) {
    // contentColorFor(primary) == onPrimary; Surface sets this as LocalContentColor internally
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `Color` | — | A color expected to match one of the background roles in `MaterialTheme.colorScheme` (e.g. `primary`, `surface`). |

## Notes

- `contentColorFor` tries to match `backgroundColor` against a background role in the current `ColorScheme` and returns the corresponding "on" color; if no match is found it falls back to the current `LocalContentColor.current`.
- Components like `Surface`, `Card`, and `Button` set `LocalContentColor` automatically based on their background/`contentColor` parameter, so descendant `Text`/`Icon` inherit the correct color without explicit styling.
- M3 removes M2's `LocalContentAlpha` / `ContentAlpha` emphasis levels; use distinct color roles (e.g. `onSurfaceVariant` for medium emphasis, `onSurface.copy(alpha = 0.38f)` for disabled) or `CompositionLocalProvider(LocalContentColor provides ...)` instead.
- Package: `androidx.compose.material3`.

## Related

- [ColorScheme](./color-scheme.md)
- [MaterialTheme](./material-theme.md)
- [Migrating from Material 2 to Material 3](./material2-material3-migration.md)
