# Android TV

D-pad navigation for Media3 playback on Android TV: delegating key events to `PlayerView`, requesting focus, and Compose handling. Source: https://developer.android.com/media/media3/ui/androidtv

## Signature / Usage

```kotlin
override fun dispatchKeyEvent(event: KeyEvent?): Boolean {
  return playerView.dispatchKeyEvent(event!!) || super.dispatchKeyEvent(event)
}

override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  // ...
  playerView.requestFocus()
  // ...
}
```

```kotlin
// Compose with AndroidView
AndroidView(
  modifier = modifier.focusable().onKeyEvent { playerView.dispatchKeyEvent(it.nativeKeyEvent) },
  factory = { playerView },
)
```

## Notes

- D-pad commands arrive as key events at the `Activity`'s `dispatchKeyEvent(KeyEvent)` and must be delegated to the `PlayerView`.
- Requesting focus for the `PlayerView` is important for navigating playback controls and skipping ads; consider doing it in `onCreate`.
- In Compose with `AndroidView`, make the view focusable and delegate the key event via the modifier as shown above.
- The `Player` composable from `media3-ui-compose-material3` supports D-pad navigation by default: `Player` and `PlayerDefaults` have an automatic `FocusRequester` that traverses components, so no additional code or `Modifier.focusRequester` is needed. `PlayerDefaults` are arranged in top, center and bottom slots; when overriding slots, provide a well-navigable component. Most Compose components, such as `Slider` or a `Row` containing buttons, manage focus out of the box.

## Related

- [PlayerView](./player-view.md)
- [Compose UI](./compose-ui.md)
- [Surface types](./surface-types.md)
