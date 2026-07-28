# Shapes

Holds the Material 3 shape scale (five `CornerBasedShape` roles, plus expressive size variants) used to define component corner rounding. Provided to `MaterialTheme` and read via `MaterialTheme.shapes`.

## Signature / Usage

```kotlin
class Shapes(
    val extraSmall: CornerBasedShape = ShapeDefaults.ExtraSmall,
    val small: CornerBasedShape = ShapeDefaults.Small,
    val medium: CornerBasedShape = ShapeDefaults.Medium,
    val large: CornerBasedShape = ShapeDefaults.Large,
    val extraLarge: CornerBasedShape = ShapeDefaults.ExtraLarge,
    // + largeIncreased, extraLargeIncreased, extraExtraLarge (public val, no experimental gating)
)
```

```kotlin
val replyShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
    extraLarge = RoundedCornerShape(24.dp)
)

MaterialTheme(shapes = replyShapes) { /* app content */ }

Card(shape = MaterialTheme.shapes.medium) { /* content */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `extraSmall` | `CornerBasedShape` | `ShapeDefaults.ExtraSmall` (4.dp rounded corners) | Smallest components, e.g. small buttons. |
| `small` | `CornerBasedShape` | `ShapeDefaults.Small` (8.dp rounded corners) | Small components. |
| `medium` | `CornerBasedShape` | `ShapeDefaults.Medium` (12.dp rounded corners) | Medium-sized components, e.g. Card. |
| `large` | `CornerBasedShape` | `ShapeDefaults.Large` (16.dp rounded corners) | Large components, e.g. FloatingActionButton. |
| `extraLarge` | `CornerBasedShape` | `ShapeDefaults.ExtraLarge` (24.dp rounded corners) | Largest components (bottom sheets, large dialogs). |
| `largeIncreased` / `extraLargeIncreased` / `extraExtraLarge` | `CornerBasedShape` | `ShapeDefaults.LargeIncreased` / `ExtraLargeIncreased` / `ExtraExtraLarge` | Additional size steps between/above `large`/`extraLarge`. Public `val` properties, no experimental annotation. |

## Notes

- Use `RectangleShape` for a "none" shape and `CircleShape` for a "full" round shape — neither is exposed as a named `Shapes` role.
- `MaterialShapes` (35+ predefined `RoundedPolygon` shapes for expressive shape-morphing, e.g. Cookie, Heart, Clover) is a separate, fully `@ExperimentalMaterial3ExpressiveApi`-gated API in the same package; not documented here since it requires `@OptIn`.
- Package: `androidx.compose.material3`.

## Related

- [MaterialTheme](./material-theme.md)
- [Migrating from Material 2 to Material 3](./material2-material3-migration.md)
