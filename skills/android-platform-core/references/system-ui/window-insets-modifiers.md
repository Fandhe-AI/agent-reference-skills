# Modifier.windowInsetsPadding and friends

Modifiers and `WindowInsets` operators for applying, consuming, and combining window insets as padding or sizing in Compose layouts.

## Signature / Usage

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
        Box(Modifier.safeDrawingPadding()) {
            // the rest of the app
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Modifier.windowInsetsPadding(insets: WindowInsets)` | `Modifier` | — | Applies given `WindowInsets` as padding on all 4 sides, like `Modifier.padding()`. |
| `Modifier.safeDrawingPadding()` | `Modifier` | — | Shorthand for `windowInsetsPadding(WindowInsets.safeDrawing)`. |
| `Modifier.systemBarsPadding()` | `Modifier` | — | Shorthand for `windowInsetsPadding(WindowInsets.systemBars)`. |
| `Modifier.imePadding()` | `Modifier` | — | Shorthand for `windowInsetsPadding(WindowInsets.ime)`. Animates with IME show/hide. |
| `Modifier.navigationBarsPadding()` | `Modifier` | — | Shorthand for `windowInsetsPadding(WindowInsets.navigationBars)`. |
| `Modifier.windowInsetsStartWidth/EndWidth/TopHeight/BottomHeight(insets)` | `Modifier` | — | Sets width/height of a component (e.g. `Spacer`) to the given side's inset dimension. |
| `Modifier.consumeWindowInsets(insets: WindowInsets \| PaddingValues)` | `Modifier` | — | Consumes insets without applying padding, to mark them as already handled by an ancestor/sibling. |
| `WindowInsets.asPaddingValues()` | `PaddingValues` | — | Converts insets (unaffected by consumption) into `PaddingValues`. |
| `WindowInsets.only(sides: WindowInsetsSides)` | `WindowInsets` | — | Selects a subset of sides (`Top`, `Bottom`, `Start`, `End`). |
| `WindowInsets.add(other)` / `.union(other)` / `.exclude(other)` | `WindowInsets` | — | Combines, unions, or removes overlapping insets. |

```kotlin
Column(Modifier.verticalScroll(rememberScrollState())) {
    Spacer(Modifier.windowInsetsTopHeight(WindowInsets.systemBars))
    Column(
        Modifier.consumeWindowInsets(
            WindowInsets.systemBars.only(WindowInsetsSides.Vertical)
        )
    ) {
        // content
        Spacer(Modifier.windowInsetsBottomHeight(WindowInsets.ime))
    }
    Spacer(Modifier.windowInsetsBottomHeight(WindowInsets.systemBars))
}
```

## Notes

- All inset padding modifiers automatically animate with IME animations (backported to API 21).
- Padding modifiers automatically consume the insets they apply, preventing double-spacing in nested layouts.
- Insets update after composition but before the layout phase.
- Package: `androidx.compose.foundation.layout`.

## Related

- [WindowInsets](./window-insets.md)
- [Material3 insets](./material3-insets.md)
