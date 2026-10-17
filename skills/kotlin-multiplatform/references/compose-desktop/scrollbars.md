---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-scrollbars.html
---

# Scrollbars

You can apply scrollbars to scrollable components. The scrollbar and scrollable components share a common state to synchronize with each other.

## Signature / Usage

Attach `VerticalScrollbar` to a component with the `verticalScroll` modifier and `HorizontalScrollbar` to one with the `horizontalScroll` modifier:

```kotlin
fun main() = singleWindowApplication(
    title = "Scrollbars",
    state = WindowState(width = 300.dp, height = 310.dp)
) {
    Box(
        modifier = Modifier.fillMaxSize()
            .background(color = Color(180, 180, 180))
            .padding(10.dp)
    ) {
        val stateVertical = rememberScrollState(0)
        val stateHorizontal = rememberScrollState(0)

        Box(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(stateVertical)
                .padding(end = 12.dp, bottom = 12.dp)
                .horizontalScroll(stateHorizontal)
        ) {
            Column {
                for (item in 0..30) {
                    TextBox("Item #$item")
                    if (item < 30) {
                        Spacer(modifier = Modifier.height(5.dp))
                    }
                }
            }
        }
        VerticalScrollbar(
            modifier = Modifier.align(Alignment.CenterEnd)
                .fillMaxHeight(),
            adapter = rememberScrollbarAdapter(stateVertical)
        )
        HorizontalScrollbar(
            modifier = Modifier.align(Alignment.BottomStart)
                .fillMaxWidth()
                .padding(end = 12.dp),
            adapter = rememberScrollbarAdapter(stateHorizontal)
        )
    }
}
```

Lazy scrollable components (`LazyColumn`, `LazyRow`) use the lazy list state:

```kotlin
val state = rememberLazyListState()

LazyColumn(Modifier.fillMaxSize().padding(end = 12.dp), state) {
    items(1000) { x ->
        TextBox("Item #$x")
        Spacer(modifier = Modifier.height(5.dp))
    }
}
VerticalScrollbar(
    modifier = Modifier.align(Alignment.CenterEnd).fillMaxHeight(),
    adapter = rememberScrollbarAdapter(
        scrollState = state
    )
)
```

## Notes

- Scrollbars are moved by dragging, the mouse wheel, or the touchpad. To move horizontal scrollbars with the mouse, side-click the wheel or hold Shift.
- Lazy components are much more efficient for long lists since they only compose items as needed.
- Known limitations: scrolling with touchscreens, touchpads, and trackpads is treated as mouse events, which can cause glitches and limitations such as no pinch-to-zoom. Planned: native touch screen support (CMP-1609) and native touchpad/trackpad support (CMP-1610).
- The `TextBox` helper used in the source examples is a `Box` with a `Text` inside, defined on the page.
- The runnable examples on the desktop pages are meant to replace the contents of the desktop entry-point file (for example `desktopApp/src/main/kotlin/com/example/my_desktop_app/main.kt`) of a project created with the Kotlin Multiplatform IDE plugin or the online wizard.
- Distance line: `verticalScroll`, `LazyColumn`, and `rememberScrollState` are common androidx.compose APIs covered by android-compose-ui / android-compose-components; this skill covers the desktop scrollbar composables.

## Related

- [Tooltips](./tooltips.md)
- [Context menus](./context-menus.md)
- [Mouse event listeners](./mouse-events.md)
