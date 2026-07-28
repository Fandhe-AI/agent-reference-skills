# ProgressBar

Provides feedback that a long-running operation is underway, as a horizontal bar. Read-only; not interactive.

## Signature / Usage

```xaml
<ProgressBar Width="200" Value="50"/>
<ProgressBar Width="200" IsIndeterminate="True"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Value | double | Current value in a determinate state (inherited from `RangeBase`). |
| Minimum | double | Minimum possible value (inherited from `RangeBase`, default 0). |
| Maximum | double | Maximum possible value (inherited from `RangeBase`, default 100). |
| IsIndeterminate | bool | `true` shows a repeating pattern instead of a percentage; completion time is unknown. Doesn't block user interaction. |
| ShowError | bool | Whether to use the visual state that communicates an error state. |
| ShowPaused | bool | Whether to use the visual state that communicates a paused state. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Progress` and Jetpack Compose `LinearProgressIndicator`.
- Use the determinate state when duration is known and progress shouldn't block user interaction (e.g. "Loading...", "Retrieving").
- Use `Foreground` to color the filled portion and `Background` for the unfilled portion.
- For virtualized list loading, place a single indeterminate `ProgressBar` at the top of the collection instead of a progress indicator per item.

## Related

- [ProgressRing](./progressring.md)
- [Slider](./slider.md)
