# AndroidViewModel

A `ViewModel` subclass that carries an `Application` reference, for cases that genuinely need application context (e.g. resources, system services).

## Signature / Usage

```kotlin
open class AndroidViewModel(application: Application) : ViewModel() {
    open fun <T : Application> getApplication(): T
}
```

```kotlin
class MyAndroidViewModel(application: Application) : AndroidViewModel(application) {
    fun readAsset() {
        getApplication<MyApplication>().resources
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getApplication()` | `<T : Application> () -> T` | — | Returns the `Application` passed to the constructor, cast to `T`. |

## Notes

- Prefer a plain `ViewModel` with injected dependencies over `AndroidViewModel`; holding `Application` couples the ViewModel to the Android framework and complicates testing.
- Requires a public constructor taking a single `Application` parameter to be instantiated by the default `AndroidViewModelFactory`.
- Package: `androidx.lifecycle` (module `lifecycle-viewmodel-android`).

## Related

- [ViewModel](./viewmodel.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
