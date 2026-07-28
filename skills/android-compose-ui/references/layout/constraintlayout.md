# ConstraintLayout

A layout that lets composables be placed relative to other composables using constraints, similar to the View-system `ConstraintLayout`. Provided by a separate `constraintlayout-compose` artifact, not `androidx.compose.foundation`.

## Signature / Usage

```kotlin
implementation("androidx.constraintlayout:constraintlayout-compose:<version>")
```

```kotlin
@Composable
fun ConstraintLayoutContent() {
    ConstraintLayout {
        val (button, text) = createRefs()

        Button(
            onClick = { /* ... */ },
            modifier = Modifier.constrainAs(button) {
                top.linkTo(parent.top, margin = 16.dp)
            }
        ) { Text("Button") }

        Text(
            "Text",
            Modifier.constrainAs(text) {
                top.linkTo(button.bottom, margin = 16.dp)
            }
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createRefs()` / `createRefFor(id)` | function | — | Creates `ConstrainedLayoutReference`s used to identify composables inside `constrainAs`. |
| `Modifier.constrainAs(ref) { ... }` | function | — | Applies a constraint block (a `ConstrainScope`) to the composable, linking edges via `linkTo`. |
| `createGuidelineFromStart/End/Top/Bottom(offsetOrFraction)` | function | — | Virtual guideline for positioning at a fixed `Dp` or fraction (0f-1f). |
| `createTopBarrier` / `createBottomBarrier` / `createStartBarrier` / `createEndBarrier` | function | — | Virtual guideline positioned at the extreme edge of the given references. |
| `createVerticalChain` / `createHorizontalChain(..., chainStyle)` | function | `ChainStyle.Spread` | Groups references with controlled spacing along one axis. `ChainStyle`: `Spread`, `SpreadInside`, `Packed`. |

## Notes

- Official guidance: prefer `Row`/`Column`/`Box` where possible; Compose handles deep hierarchies efficiently, so `ConstraintLayout`'s flattening benefit (significant in the View system) is smaller here.
- A decoupled API separates constraint definitions (`ConstraintSet { ... }`) from the composables (tagged with `Modifier.layoutId("id")`), useful for swapping layouts (e.g. by screen width via `BoxWithConstraints`).
- Package: `androidx.constraintlayout.compose`.

## Related

- [Box](./box.md)
- [BoxWithConstraints](./boxwithconstraints.md)
