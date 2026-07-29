# lifecycleScope

Built-in `CoroutineScope` attached to a `Lifecycle`; coroutines launched in it are canceled automatically once the `Lifecycle` reaches the `DESTROYED` state.

## Signature / Usage

```kotlin
val Lifecycle.coroutineScope: LifecycleCoroutineScope
val LifecycleOwner.lifecycleScope: LifecycleCoroutineScope
```

```kotlin
class MyFragment : Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewLifecycleOwner.lifecycleScope.launch {
            val precomputedText = withContext(Dispatchers.Default) {
                PrecomputedTextCompat.create(longTextContent, params)
            }
            TextViewCompat.setPrecomputedText(textView, precomputedText)
        }
    }
}
```

## Notes

- Accessed via `lifecycleOwner.lifecycleScope` (e.g. an `Activity`/`Fragment`) or the lower-level `lifecycle.coroutineScope`; in a `Fragment`, prefer `viewLifecycleOwner.lifecycleScope` over `lifecycleScope` for work tied to the view.
- `coroutineContext` runs on `Dispatchers.Main.immediate`; use `withContext(Dispatchers.IO)`/`Dispatchers.Default` inside for background work.
- Do not collect flows by launching them directly in `lifecycleScope` without gating — prefer `repeatOnLifecycle` (or `flowWithLifecycle`) so collection stops while the `Lifecycle` is below `STARTED` instead of continuing in the background.
- The older `lifecycle.whenCreated { }` / `whenStarted { }` / `whenResumed { }` suspend-until-state helpers and the `launchWhenX` launch builders are superseded by `repeatOnLifecycle`; official guidance now steers away from `launchWhenX` because it suspends rather than cancels the coroutine when the `Lifecycle` drops below the target state, keeping upstream flows active.
- Package: `androidx.lifecycle` (module `lifecycle-runtime-ktx`, requires `2.4.0`+).

## Related

- [LifecycleOwner](./lifecycleowner.md)
- [repeatOnLifecycle](./repeatonlifecycle.md)
- [flowWithLifecycle](./flowwithlifecycle.md)
- [viewModelScope](./viewmodelscope.md)
