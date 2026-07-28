# MutableLiveData

`LiveData` subclass that publicly exposes `setValue(T)` and `postValue(T)`, letting callers push new values.

## Signature / Usage

```kotlin
class MutableLiveData<T> : LiveData<T> {
    constructor(value: T)
    constructor()
    public override fun setValue(value: T)
    public override fun postValue(value: T)
}
```

```kotlin
button.setOnClickListener {
    model.currentName.value = "John Doe" // setValue on main thread
}

// From a worker thread:
model.currentName.postValue("John Doe")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setValue(value)` | function | — | Synchronous write; must be called from the main thread. |
| `postValue(value)` | function | — | Asynchronous write; safe from any thread, posts to the main thread. |

## Notes

- `setValue` throws if called off the main thread; use `postValue` from background work.
- Multiple rapid `postValue` calls before the main thread processes them may coalesce, dispatching only the last value.
- Package: `androidx.lifecycle` (module `lifecycle-livedata-core`).

## Related

- [LiveData](./livedata.md)
