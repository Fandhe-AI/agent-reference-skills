# ProcessLifecycleOwner

Singleton `LifecycleOwner` representing the lifecycle of the entire application process, useful for foreground/background detection independent of any single Activity.

## Signature / Usage

```kotlin
class ProcessLifecycleOwner private constructor() : LifecycleOwner {
    companion object {
        fun get(): LifecycleOwner
    }
    override val lifecycle: Lifecycle
}
```

```kotlin
ProcessLifecycleOwner.get().lifecycle.addObserver(object : DefaultLifecycleObserver {
    override fun onStart(owner: LifecycleOwner) {
        // app entered foreground
    }
    override fun onStop(owner: LifecycleOwner) {
        // app entered background
    }
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get()` | `companion fun get(): LifecycleOwner` | — | Returns the process-wide singleton `LifecycleOwner`. |
| `lifecycle` | `Lifecycle` | — | Dispatches `ON_CREATE` once and never `ON_DESTROY`. |

## Notes

- `ON_START`/`ON_RESUME` fire immediately when the first activity transitions through them; `ON_PAUSE`/`ON_STOP` are deliberately delayed to avoid spurious events during configuration changes.
- Not millisecond-precise — intended for coarse foreground/background detection, not exact timing.
- Package: `androidx.lifecycle` (module `lifecycle-process`).

## Related

- [LifecycleOwner](./lifecycleowner.md)
- [Lifecycle](./lifecycle.md)
