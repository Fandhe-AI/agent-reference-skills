# LocalOnBackPressedDispatcherOwner

Compose `CompositionLocal` object that provides the `OnBackPressedDispatcherOwner` used by `BackHandler` / `PredictiveBackHandler` to reach the current `OnBackPressedDispatcher`.

## Signature / Usage

```kotlin
public object LocalOnBackPressedDispatcherOwner {
    public val current: OnBackPressedDispatcherOwner?
        @Composable get

    public infix fun provides(
        dispatcherOwner: OnBackPressedDispatcherOwner
    ): ProvidedValue<OnBackPressedDispatcherOwner?>
}
```

```kotlin
CompositionLocalProvider(LocalOnBackPressedDispatcherOwner provides customOwner) {
    // BackHandler / PredictiveBackHandler within this subtree use customOwner
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `OnBackPressedDispatcherOwner?` | resolved automatically | Resolution order: an explicitly provided composition local value, then `LocalView.current.findViewTreeOnBackPressedDispatcherOwner()`, then a matching owner found by walking up `LocalContext.current`. `null` if none is found. |
| `provides(dispatcherOwner)` | `infix fun` | — | Associates a `LocalOnBackPressedDispatcherOwner` value for use with `CompositionLocalProvider`, e.g. to inject a fake/custom dispatcher owner in tests or previews. |

## Notes

- Package: `androidx.activity.compose`.
- `BackHandler` and `PredictiveBackHandler` both resolve their dispatcher through `LocalOnBackPressedDispatcherOwner.current` (falling back to `LocalNavigationEventDispatcherOwner`); overriding it via `provides` is mainly useful for tests, previews, or custom hosting scenarios.
- Throws (via the composable's own `error(...)`) if neither a `NavigationEventDispatcherOwner` nor an `OnBackPressedDispatcherOwner` can be resolved.

## Related

- [BackHandler](./back-handler.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
