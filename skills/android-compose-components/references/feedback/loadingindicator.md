# LoadingIndicator

Material 3 Expressive loading indicator that morphs between polygon shapes, either driven by a determinate `progress` value or animating continuously while indeterminate. `ContainedLoadingIndicator` is the same behavior wrapped in a colored container shape.

## Signature / Usage

```kotlin
@ExperimentalMaterial3ExpressiveApi
@Composable
fun LoadingIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    color: Color = LoadingIndicatorDefaults.indicatorColor,
    polygons: List<RoundedPolygon> = LoadingIndicatorDefaults.DeterminateIndicatorPolygons,
)

@ExperimentalMaterial3ExpressiveApi
@Composable
fun LoadingIndicator(
    modifier: Modifier = Modifier,
    color: Color = LoadingIndicatorDefaults.indicatorColor,
    polygons: List<RoundedPolygon> = LoadingIndicatorDefaults.IndeterminateIndicatorPolygons,
)

@ExperimentalMaterial3ExpressiveApi
@Composable
fun ContainedLoadingIndicator(
    progress: () -> Float,
    modifier: Modifier = Modifier,
    containerColor: Color = LoadingIndicatorDefaults.containedContainerColor,
    indicatorColor: Color = LoadingIndicatorDefaults.containedIndicatorColor,
    containerShape: Shape = LoadingIndicatorDefaults.containerShape,
    polygons: List<RoundedPolygon> = LoadingIndicatorDefaults.DeterminateIndicatorPolygons,
)

@ExperimentalMaterial3ExpressiveApi
@Composable
fun ContainedLoadingIndicator(
    modifier: Modifier = Modifier,
    containerColor: Color = LoadingIndicatorDefaults.containedContainerColor,
    indicatorColor: Color = LoadingIndicatorDefaults.containedIndicatorColor,
    containerShape: Shape = LoadingIndicatorDefaults.containerShape,
    polygons: List<RoundedPolygon> = LoadingIndicatorDefaults.IndeterminateIndicatorPolygons,
)
```

```kotlin
LoadingIndicator()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `() -> Float` | — | Progress value; morphs shapes by this value. Omit to get the indeterminate overload. |
| `modifier` | `Modifier` | `Modifier` | Applied to this indicator. |
| `color` | `Color` | `LoadingIndicatorDefaults.indicatorColor` | Indicator color (`LoadingIndicator` only). |
| `containerColor` | `Color` | `LoadingIndicatorDefaults.containedContainerColor` | Container background color (`ContainedLoadingIndicator` only). |
| `indicatorColor` | `Color` | `LoadingIndicatorDefaults.containedIndicatorColor` | Indicator color (`ContainedLoadingIndicator` only). |
| `containerShape` | `Shape` | `LoadingIndicatorDefaults.containerShape` | Shape of the container (`ContainedLoadingIndicator` only). |
| `polygons` | `List<RoundedPolygon>` | determinate/indeterminate polygon set default | Shapes the indicator morphs between. |

## Notes

- Experimental: requires `@OptIn(ExperimentalMaterial3ExpressiveApi::class)`.
- Omitting `progress` selects the indeterminate overload, which animates and morphs continuously while visible.
- Package: `androidx.compose.material3`.

## Related

- [CircularProgressIndicator](./circularprogressindicator.md)
- [LinearProgressIndicator](./linearprogressindicator.md)
