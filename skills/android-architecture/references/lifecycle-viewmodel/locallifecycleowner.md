# LocalLifecycleOwner

`CompositionLocal` exposing the current `LifecycleOwner` inside a composable tree.

## Signature / Usage

```kotlin
val LocalLifecycleOwner: ProvidableCompositionLocal<LifecycleOwner>
```

```kotlin
@Composable
fun MyComposable() {
    val lifecycleOwner = LocalLifecycleOwner.current
    val state = lifecycleOwner.lifecycle.currentStateAsState()
}
```

## Notes

- Throws if read without a value having been provided in the composition hierarchy (Compose UI provides a default at the root).
- Can be overridden locally with `CompositionLocalProvider(LocalLifecycleOwner provides customOwner) { ... }`, e.g. to scope a `HorizontalPager` page's lifecycle to its visibility.
- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`).

## Related

- [LifecycleOwner](./lifecycleowner.md)
- [viewModel() (Compose)](./viewmodel-compose.md)
