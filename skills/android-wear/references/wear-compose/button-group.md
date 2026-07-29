# ButtonGroup

Material3 Expressive layout composable that arranges buttons in a row and grows the pressed button's width (shrinking its neighbors to keep the group's total width constant), for a shape-morphing multi-action row.

## Signature / Usage

```kotlin
@Composable
public fun ButtonGroup(
    modifier: Modifier = Modifier,
    spacing: Dp = ButtonGroupDefaults.Spacing,
    expansionWidth: Dp = ButtonGroupDefaults.ExpansionWidth,
    contentPadding: PaddingValues = ButtonGroupDefaults.fullWidthPaddings(),
    verticalAlignment: Alignment.Vertical = Alignment.CenterVertically,
    transformation: SurfaceTransformation? = null,
    content: @Composable ButtonGroupScope.() -> Unit,
)
```

```kotlin
val interactionSource1 = remember { MutableInteractionSource() }
val interactionSource2 = remember { MutableInteractionSource() }

ButtonGroup {
    Button(
        onClick = { /* action 1 */ },
        interactionSource = interactionSource1,
        modifier = Modifier.animateWidth(interactionSource1),
    ) {
        Text("A")
    }
    Button(
        onClick = { /* action 2 */ },
        interactionSource = interactionSource2,
        modifier = Modifier.animateWidth(interactionSource2),
    ) {
        Text("B")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the group. Width must be bounded (`ButtonGroup width cannot be unbounded`). |
| `spacing` | `Dp` | `ButtonGroupDefaults.Spacing` | Space between adjacent buttons. |
| `expansionWidth` | `Dp` | `ButtonGroupDefaults.ExpansionWidth` | How much the pressed button grows (neighbors shrink to compensate). |
| `contentPadding` | `PaddingValues` | `ButtonGroupDefaults.fullWidthPaddings()` | Padding between the group container and its buttons. |
| `verticalAlignment` | `Alignment.Vertical` | `Alignment.CenterVertically` | Vertical alignment of children when heights differ. |
| `transformation` | `SurfaceTransformation?` | `null` | Container transformation when the group sits inside a `TransformingLazyColumn`; when set, child buttons must disable their own container transformation and transform only their content. |
| `content` | `@Composable ButtonGroupScope.() -> Unit` | — | Buttons to arrange; recommended max of 3. Runs in `ButtonGroupScope`, which adds `Modifier.weight`, `Modifier.minWidth`, and `Modifier.animateWidth(interactionSource)`. |

## Notes

- `Modifier.animateWidth(interactionSource)` (from `ButtonGroupScope`) is what makes a child button grow/shrink on press; wire it with the same `MutableInteractionSource` passed to that button's `interactionSource`.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`). Distinct from the mobile Jetpack Compose `androidx.compose.material3.ButtonGroup` (overflow-menu row layout, in android-compose-components).

## Related

- [Button (Wear)](./button.md)
- [Card (Wear)](./card.md)
