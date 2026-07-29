# rememberLifecycleOwner

Composable function that creates a new `LifecycleOwner` scoped to the call site, letting a component build its own child lifecycle — capped by `maxLifecycle` and tracking an optional `parent` — directly within Compose UI, instead of relying only on the ambient `LocalLifecycleOwner`.

## Signature / Usage

```kotlin
// androidx.lifecycle.compose (module lifecycle-runtime-compose)
@Composable
public fun rememberLifecycleOwner(
    maxLifecycle: Lifecycle.State = Lifecycle.State.RESUMED,
    parent: LifecycleOwner? = LocalLifecycleOwner.current,
): LifecycleOwner
```

```kotlin
@Composable
fun MyComposable() {
    // Automatically moved to DESTROYED when it leaves composition; its maxLifecycle is
    // the minimum of the maxLifecycle you set and the parent LifecycleOwner's state.
    val lifecycleOwner = rememberLifecycleOwner(
        maxLifecycle = Lifecycle.State.RESUMED,
        parent = LocalLifecycleOwner.current,
    )
    CompositionLocalProvider(LocalLifecycleOwner provides lifecycleOwner) {
        val childLifecycleOwner = LocalLifecycleOwner.current
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxLifecycle` | `Lifecycle.State` | `Lifecycle.State.RESUMED` | Upper bound on the child lifecycle's state, even if `parent` is in a higher state. |
| `parent` | `LifecycleOwner?` | `LocalLifecycleOwner.current` | Owner the child lifecycle tracks; the child never exceeds `parent`'s state. Passing `null` **explicitly** creates an independent root lifecycle that runs on its own instead of following a host. |

## Notes

- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`). Added in Lifecycle 2.10.0 (November 2025); early 2.10.0 alphas shipped it as a differently-shaped `LifecycleOwner()` composable before it was refactored into `rememberLifecycleOwner` (returning the owner instead of implicitly providing it).
- The returned owner transitions to `DESTROYED` automatically once the call site leaves the composition.
- Unlike `LocalLifecycleOwner`'s own default, `rememberLifecycleOwner` does not provide its result implicitly — pass it on explicitly via `CompositionLocalProvider(LocalLifecycleOwner provides lifecycleOwner) { ... }`.
- Typical use: giving a `HorizontalPager` page (or other scoped UI element) its own lifecycle so lifecycle-aware work (`repeatOnLifecycle`, `collectAsStateWithLifecycle`) runs only while that element is actually active, independent of the host screen's lifecycle — the exact scenario `LocalLifecycleOwner`'s own docs point to `CompositionLocalProvider` overrides for.

## Related

- [LocalLifecycleOwner](./locallifecycleowner.md)
- [LifecycleOwner](./lifecycleowner.md)
- [Lifecycle](./lifecycle.md)
- [ViewModelStoreProvider](./viewmodelstoreprovider.md)
