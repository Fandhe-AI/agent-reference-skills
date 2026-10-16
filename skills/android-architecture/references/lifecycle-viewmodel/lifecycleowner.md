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
| `LifecycleOwner(lifecycle)` | `public fun LifecycleOwner(lifecycle: Lifecycle): LifecycleOwner` | — | Factory function (Lifecycle 2.11.0+, module `lifecycle-common`, `@JvmName("create")`); creates a `LifecycleOwner` directly backed by the provided `Lifecycle`. |

## Notes

- In Compose, the current `LifecycleOwner` is exposed via `LocalLifecycleOwner.current`, not through an explicit parameter.
- The `LifecycleOwner(lifecycle)` factory was added in Lifecycle 2.11.0-alpha02 to reduce boilerplate when composing custom owner components.
- Package: `androidx.lifecycle` (module `lifecycle-common` / `lifecycle-runtime-ktx` for `lifecycleScope`).
- Source (primary, signatures and KDoc): Google Maven sources jar https://dl.google.com/android/maven2/androidx/lifecycle/lifecycle-common/2.11.0/lifecycle-common-2.11.0-sources.jar (`commonMain/androidx/lifecycle/LifecycleOwnerFactory.kt`).
- Release notes: https://developer.android.com/jetpack/androidx/releases/lifecycle (2.11.0-alpha02). The API reference pages on developer.android.com are not fetchable, so the sources jar above is the basis for this page.

## Related

- [Lifecycle](./lifecycle.md)
- [LocalLifecycleOwner](./locallifecycleowner.md)
- [ProcessLifecycleOwner](./processlifecycleowner.md)
