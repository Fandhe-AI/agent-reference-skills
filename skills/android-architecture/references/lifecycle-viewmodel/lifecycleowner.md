# LifecycleOwner

Interface for a component that has a `Lifecycle`, letting other components observe it without coupling to the owner's concrete type. Implemented by `ComponentActivity`, `Fragment`, `ProcessLifecycleOwner`, `NavBackStackEntry`, etc.

## Signature / Usage

```kotlin
interface LifecycleOwner {
    val lifecycle: Lifecycle
}

val LifecycleOwner.lifecycleScope: LifecycleCoroutineScope
```

```kotlin
class MyActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(myObserver)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `lifecycle` | `Lifecycle` | — | The `Lifecycle` object owned by this component. |
| `lifecycleScope` | `LifecycleCoroutineScope` | — | Extension property; a `CoroutineScope` bound to `Dispatchers.Main.immediate`, canceled when the `Lifecycle` is destroyed. |

## Notes

- In Compose, the current `LifecycleOwner` is exposed via `LocalLifecycleOwner.current`, not through an explicit parameter.
- Package: `androidx.lifecycle` (module `lifecycle-common` / `lifecycle-runtime-ktx` for `lifecycleScope`).

## Related

- [Lifecycle](./lifecycle.md)
- [LocalLifecycleOwner](./locallifecycleowner.md)
- [ProcessLifecycleOwner](./processlifecycleowner.md)
