# LiveData

Lifecycle-aware observable data holder. Only notifies observers that are in an active state (`STARTED` or `RESUMED`), automatically stops notifying destroyed observers, and delivers the latest value when an inactive observer becomes active again.

## Signature / Usage

```kotlin
inline fun <T> LiveData<T>.observe(owner: LifecycleOwner, crossinline onChanged: (T) -> Unit): Observer<T>
```

```kotlin
class NameViewModel : ViewModel() {
    val currentName: MutableLiveData<String> by lazy { MutableLiveData<String>() }
}

class NameActivity : AppCompatActivity() {
    private val model: NameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        model.currentName.observe(this) { newName -> nameTextView.text = newName }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `observe(owner, onChanged)` | function | — | Registers a callback active only while `owner` is `STARTED`/`RESUMED`; auto-removed at `DESTROYED`. |
| `observeForever(observer)` | function | — | Registers an always-active observer with no `LifecycleOwner`; must be removed manually via `removeObserver`. |
| `removeObserver(observer)` | function | — | Unregisters a previously added `Observer`. |
| `value` | `T?` | `null` | Current value (protected setter on `LiveData`; use `MutableLiveData` to write it). |
| `hasActiveObservers()` / `hasObservers()` | function | — | Whether there is at least one active / any observer. |

## Notes

- Store `LiveData` in a `ViewModel`, exposing `LiveData` publicly while keeping `MutableLiveData` private.
- `Transformations.map` / `Transformations.switchMap` derive new `LiveData` lazily, only recomputed while observed.
- `MediatorLiveData` merges multiple `LiveData` sources into one.
- Room DAO methods can return `LiveData<T>` directly, auto-updated on database changes.
- For continuous data streams, prefer Kotlin `Flow` in the data layer and convert with `asLiveData()` if `LiveData` is needed at the boundary.
- Package: `androidx.lifecycle` (module `lifecycle-livedata-core`).

## Related

- [MutableLiveData](./mutablelivedata.md)
- [observeAsState](./observeasstate.md)
- [collectAsStateWithLifecycle](./collectasstatewithlifecycle.md)
