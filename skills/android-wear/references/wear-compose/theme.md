# MaterialTheme (Wear)

Wear Material3 theming root. Defines `colorScheme`, `typography`, `shapes`, and `motionScheme` consumed by all Wear Compose Material3 components. Includes `ColorScheme` (named color roles) and `MotionScheme` (animation specs).

## Signature / Usage

```kotlin
@Composable
public fun MaterialTheme(
    colorScheme: ColorScheme = MaterialTheme.colorScheme,
    typography: Typography = MaterialTheme.typography,
    shapes: Shapes = MaterialTheme.shapes,
    motionScheme: MotionScheme = MaterialTheme.motionScheme,
    content: @Composable () -> Unit,
)
```

```kotlin
MaterialTheme(colorScheme = MaterialTheme.colorScheme.copy(primary = Color.Cyan)) {
    // app content
}
```

`ColorScheme` constructor (all named color roles, defaults to Wear Material tokens):

```kotlin
public class ColorScheme(
    public val primary: Color = ColorTokens.Primary,
    public val primaryDim: Color = ColorTokens.PrimaryDim,
    public val primaryContainer: Color = ColorTokens.PrimaryContainer,
    public val onPrimary: Color = ColorTokens.OnPrimary,
    public val onPrimaryContainer: Color = ColorTokens.OnPrimaryContainer,
    public val secondary: Color = ColorTokens.Secondary,
    public val secondaryDim: Color = ColorTokens.SecondaryDim,
    public val secondaryContainer: Color = ColorTokens.SecondaryContainer,
    public val onSecondary: Color = ColorTokens.OnSecondary,
    public val onSecondaryContainer: Color = ColorTokens.OnSecondaryContainer,
    public val tertiary: Color = ColorTokens.Tertiary,
    public val tertiaryDim: Color = ColorTokens.TertiaryDim,
    public val tertiaryContainer: Color = ColorTokens.TertiaryContainer,
    public val onTertiary: Color = ColorTokens.OnTertiary,
    public val onTertiaryContainer: Color = ColorTokens.OnTertiaryContainer,
    public val surfaceContainerLow: Color = ColorTokens.SurfaceContainerLow,
    public val surfaceContainer: Color = ColorTokens.SurfaceContainer,
    public val surfaceContainerHigh: Color = ColorTokens.SurfaceContainerHigh,
    public val onSurface: Color = ColorTokens.OnSurface,
    public val onSurfaceVariant: Color = ColorTokens.OnSurfaceVariant,
    public val outline: Color = ColorTokens.Outline,
    public val outlineVariant: Color = ColorTokens.OutlineVariant,
    public val background: Color = ColorTokens.Background,
    public val onBackground: Color = ColorTokens.OnBackground,
    public val error: Color = ColorTokens.Error,
    public val errorDim: Color = ColorTokens.ErrorDim,
    public val errorContainer: Color = ColorTokens.ErrorContainer,
    public val onError: Color = ColorTokens.OnError,
    public val onErrorContainer: Color = ColorTokens.OnErrorContainer,
)
```

`MotionScheme` interface (provides `FiniteAnimationSpec`s consumed by components):

```kotlin
@Immutable
public interface MotionScheme {
    public fun <T> defaultSpatialSpec(): FiniteAnimationSpec<T>
    public fun <T> fastSpatialSpec(): FiniteAnimationSpec<T>
    public fun <T> slowSpatialSpec(): FiniteAnimationSpec<T>
    public fun <T> defaultEffectsSpec(): FiniteAnimationSpec<T>
    public fun <T> fastEffectsSpec(): FiniteAnimationSpec<T>
    public fun <T> slowEffectsSpec(): FiniteAnimationSpec<T>
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `colorScheme` | `ColorScheme` | `MaterialTheme.colorScheme` | Named color roles (primary/secondary/tertiary/surface/error groups, each with `Dim`/`Container`/`on*` variants). |
| `typography` | `Typography` | `MaterialTheme.typography` | Wear Material3 type scale. |
| `shapes` | `Shapes` | `MaterialTheme.shapes` | Wear Material3 shape scale. |
| `motionScheme` | `MotionScheme` | `MaterialTheme.motionScheme` | Spatial/effects animation specs; see `MotionScheme.standard()` and `MotionScheme.expressive()`. |
| `content` | `@Composable () -> Unit` | — | Themed content. |

## Notes

- Wear Material3 extends Material design; components read defaults from `MaterialTheme.colorScheme` / `.typography` / `.shapes` / `.motionScheme` via composition locals, same pattern as mobile `MaterialTheme` but with a distinct `ColorScheme` shape (`primaryDim`, `surfaceContainerLow/…/High`, no `surfaceTint`).
- `MotionScheme.standard()` gives linear/utilitarian motion; `MotionScheme.expressive()` gives more pronounced motion for hero interactions. Spatial specs are for animations that may overshoot target bounds (shape/position); effects specs are for constrained animations (color/alpha).
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`). Distinct from mobile `androidx.compose.material3.MaterialTheme` / `androidx.compose.material3.ColorScheme`.

## Related

- [AppScaffold](./scaffold.md)
- [dynamicColorScheme](./dynamic-color-scheme.md)
