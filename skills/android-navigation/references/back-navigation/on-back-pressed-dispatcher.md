# OnBackPressedDispatcher

Dispatcher used to register `OnBackPressedCallback` instances for handling back navigation in `ComponentActivity` (and its subclasses `FragmentActivity`, `AppCompatActivity`), View-based apps, and Fragments.

## Signature / Usage

```kotlin
public class OnBackPressedDispatcher {
    @JvmOverloads
    public constructor(fallbackOnBackPressed: Runnable? = null)

    public fun asNavigationEventDispatcher(): NavigationEventDispatcher

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    public fun setOnBackInvokedDispatcher(invoker: OnBackInvokedDispatcher)

    @MainThread
    public fun addCallback(onBackPressedCallback: OnBackPressedCallback)

    @MainThread
    public fun addCallback(owner: LifecycleOwner, onBackPressedCallback: OnBackPressedCallback)

    @MainThread
    public fun hasEnabledCallbacks(): Boolean

    @MainThread
    public fun onBackPressed()
}
```

```kotlin
class MyFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Callback is only active while the fragment is at least Started
        val callback = requireActivity().onBackPressedDispatcher.addCallback(this) {
            // Handle the back button event
        }
        callback.isEnabled = true
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fallbackOnBackPressed` | `Runnable?` | `null` | Invoked when `onBackPressed()` is called but no enabled callback is registered. |
| `addCallback(onBackPressedCallback)` | method | — | Registers a callback without lifecycle binding. Newly added callbacks are the first to receive `onBackPressed()`. |
| `addCallback(owner, onBackPressedCallback)` | method | — | Registers a callback bound to a `LifecycleOwner`; recommended to avoid manual `remove()` calls and leaks. |
| `hasEnabledCallbacks()` | method | — | Returns whether at least one enabled callback is currently registered. |
| `onBackPressed()` | method | — | Triggers the currently added callbacks in reverse order of registration. |

## Notes

- Package: `androidx.activity`. Retrieved via `ComponentActivity.onBackPressedDispatcher` / `requireActivity().onBackPressedDispatcher`, both of which implement `OnBackPressedDispatcherOwner` (a `LifecycleOwner` exposing a single `val onBackPressedDispatcher: OnBackPressedDispatcher` property). `ComponentDialog` implements it too, for dialog back handling.
- Callbacks follow a Chain of Responsibility: invoked in **reverse** order of registration (last added, first invoked); each callback is only invoked if the previous one is not enabled.
- With `addCallback(LifecycleOwner, ...)`, the callback is not added to the chain until the owner reaches `Lifecycle.State.STARTED`, and is automatically removed at `ON_DESTROY`.
- Prefer `OnBackPressedCallback.isEnabled` toggling over `remove()`/re-`addCallback()` for temporary changes.
- On API 33+ (Tiramisu), `setOnBackInvokedDispatcher()` bridges this dispatcher to the platform `OnBackInvokedDispatcher` for predictive back support.

## Related

- [OnBackPressedCallback](./on-back-pressed-callback.md)
- [BackHandler](./back-handler.md)
- [LocalOnBackPressedDispatcherOwner](./local-on-back-pressed-dispatcher-owner.md)
- [OnBackInvokedDispatcher](./on-back-invoked-dispatcher.md)
