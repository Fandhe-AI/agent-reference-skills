---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-tooltips.html
---

# Tooltips

You can add a tooltip to any component using the `TooltipArea` composable. `TooltipArea` is similar to the `Box` component and can show a tooltip.

## Signature / Usage

```kotlin
@OptIn(ExperimentalFoundationApi::class)
fun main() = singleWindowApplication(
    WindowState(width = 300.dp, height = 350.dp),
    title = "Tooltip Example"
) {
    val buttons = listOf("Button A", "Button B", "Button C", "Button D", "Button E", "Button F")
    Column(Modifier.fillMaxSize(), Arrangement.spacedBy(5.dp)) {
        buttons.forEachIndexed { index, name ->
            // Wrap the button in TooltipArea
            TooltipArea(
                tooltip = {
                    // Composable tooltip content:
                    Surface(
                        modifier = Modifier.shadow(4.dp),
                        color = Color(255, 255, 210),
                        shape = RoundedCornerShape(4.dp)
                    ) {
                        Text(
                            text = "Tooltip for $name",
                            modifier = Modifier.padding(10.dp)
                        )
                    }
                },
                modifier = Modifier.padding(start = 40.dp),
                delayMillis = 600, // In milliseconds
                tooltipPlacement = TooltipPlacement.CursorPoint(
                    alignment = Alignment.BottomEnd,
                    offset = if (index % 2 == 0) DpOffset(
                        (-16).dp,
                        0.dp
                    ) else DpOffset.Zero // Tooltip offset
                )
            ) {
                Button(onClick = {}) { Text(text = name) }
            }
        }
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `tooltip` | composable content | Composable content of the tooltip. |
| `tooltipPlacement` | `TooltipPlacement` | Tooltip position. You can specify an anchor (the mouse cursor or the component), an offset, and an alignment. |
| `delayMillis` | milliseconds | Time after which the tooltip is shown. The default value is 500 ms. |

## Notes

- The example requires `@OptIn(ExperimentalFoundationApi::class)`.
- Hovering over a button shows a tooltip with the button's name.
- Distance line: `Box`, `Button`, `Surface`, and `Modifier` are common androidx.compose APIs covered by android-compose-ui / android-compose-components; `TooltipArea` here is the desktop-specific composable.

## Related

- [Context menus](./context-menus.md)
- [Scrollbars](./scrollbars.md)
