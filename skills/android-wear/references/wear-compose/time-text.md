# TimeText

Layout that shows the current time (and an optional leading label), drawn along the curved top edge of the screen (straight on rectangular screens).

## Signature / Usage

```kotlin
@Composable
public fun TimeText(
    modifier: Modifier = Modifier,
    curvedModifier: CurvedModifier = CurvedModifier,
    maxSweepAngle: Float = TimeTextDefaults.MaxSweepAngle,
    backgroundColor: Color = TimeTextDefaults.backgroundColor(),
    timeSource: TimeSource = TimeTextDefaults.rememberTimeSource(timeFormat()),
    contentPadding: PaddingValues = TimeTextDefaults.ContentPadding,
    content: CurvedScope.(String) -> Unit = { time -> timeTextCurvedText(time) },
)
```

```kotlin
AppScaffold(timeText = { TimeText() }) { /* ... */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the component. |
| `curvedModifier` | `CurvedModifier` | `CurvedModifier` | Modifier for the curved content. |
| `maxSweepAngle` | `Float` | `TimeTextDefaults.MaxSweepAngle` (70f) | Maximum arc angle the text may occupy; Wear UX guidance caps time text to this sweep. |
| `backgroundColor` | `Color` | `TimeTextDefaults.backgroundColor()` | Background color. |
| `timeSource` | `TimeSource` | `TimeTextDefaults.rememberTimeSource(timeFormat())` | Supplies the formatted time string. |
| `contentPadding` | `PaddingValues` | `TimeTextDefaults.ContentPadding` | Padding around content. |
| `content` | `CurvedScope.(String) -> Unit` | draws time via `timeTextCurvedText` | Curved content lambda receiving the formatted time string. |

## Notes

- Normally supplied via `AppScaffold(timeText = { TimeText() })` / `ScreenScaffold(timeText = ...)` rather than placed manually, so it coordinates show/hide with scroll state.
- Combine with `Modifier.scrollAway()` on scrollable content to fade `TimeText` while the user scrolls.
- `TimeTextDefaults` exposes `TimeFormat24Hours` ("HH:mm"), `TimeFormat12Hours` ("h:mm"), `MaxSweepAngle`, and helpers for device time format / default text style.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
- [Curved layout (curvedText)](./curved-layout.md)
