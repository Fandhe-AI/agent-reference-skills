# ProgressRing

Provides feedback that a long-running operation is underway, as a circular ring. Read-only; not interactive. The indeterminate state typically blocks user interaction, unlike `ProgressBar`.

## Signature / Usage

```xaml
<ProgressRing IsActive="True" Height="100" Width="100"/>
```

```csharp
progressRing.IsActive = true;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsActive | bool | Whether the ring is showing progress (visible and animating). Must be `true` for the ring to render/animate. |
| Value | double | Current magnitude in a determinate state (inherited from `RangeBase`). |
| Minimum | double | Minimum possible value (inherited from `RangeBase`). |
| Maximum | double | Maximum possible value (inherited from `RangeBase`). |
| IsIndeterminate | bool | Indeterminate state; blocks user interaction while the wait time is unknown. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Spinner`/`Progress` and Jetpack Compose `CircularProgressIndicator`.
- Minimum practical size is 20x20 epx. Set both `Height` and `Width` to the same value; if only one is set, the control assumes minimum sizing, and if set to different values, the smaller is used.
- Use `Foreground` to change the fill color of the ring.
- Use the indeterminate `ProgressRing` when the operation should halt further user interaction (e.g. "Signing in...", "Connecting...").

## Related

- [ProgressBar](./progressbar.md)
