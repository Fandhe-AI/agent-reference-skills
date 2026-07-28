# Modifier.animateContentSize

Modifier that animates a composable's size whenever its content's measured size changes.

## Signature / Usage

```kotlin
fun Modifier.animateContentSize(
    animationSpec: FiniteAnimationSpec<IntSize> =
        spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold),
    alignment: Alignment = Alignment.TopStart,
    finishedListener: ((initialValue: IntSize, targetValue: IntSize) -> Unit)? = null,
): Modifier
```

```kotlin
var expanded by remember { mutableStateOf(false) }
Box(
    modifier = Modifier
        .background(Color.Blue)
        .animateContentSize() // must come before size modifiers
        .height(if (expanded) 400.dp else 200.dp)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `animationSpec` | `FiniteAnimationSpec<IntSize>` | `spring(...)` | Spec used for the size animation. |
| `alignment` | `Alignment` | `Alignment.TopStart` | Alignment used to anchor content while its size animates. |
| `finishedListener` | `((IntSize, IntSize) -> Unit)?` | `null` | Called with initial/target size when the animation finishes. |

## Notes

- Must be placed **before** size-affecting modifiers (`size`, `height`, `defaultMinSize`, etc.) in the modifier chain so animated intermediate sizes are reported correctly to layout.
- Package: `androidx.compose.animation`.

## Related

- [Transition](./transition.md)
