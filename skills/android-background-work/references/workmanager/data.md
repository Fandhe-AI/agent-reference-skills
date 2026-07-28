# Data / workDataOf / InputMerger

Persistable key-value container used for worker input/output, plus the strategies used to merge multiple parent outputs into one child input.

## Signature / Usage

```kotlin
public class Data {
    public fun getString(key: String): String?
    public fun getInt(key: String, defaultValue: Int): Int
    public fun getLong(key: String, defaultValue: Long): Long
    public fun getBoolean(key: String, defaultValue: Boolean): Boolean
    // ...and array variants for each supported type

    public class Builder {
        public fun putAll(values: Map<String, Any?>): Builder
        public fun putAll(data: Data): Builder
        public fun build(): Data
    }

    public companion object { public const val MAX_DATA_BYTES: Int = 10 * 1024 }
}

public abstract class InputMerger {
    public abstract fun merge(inputs: List<Data>): Data
}

public class OverwritingInputMerger : InputMerger()   // default; later keys overwrite earlier ones
public class ArrayCreatingInputMerger : InputMerger()  // groups conflicting keys into arrays

public abstract class InputMergerFactory {
    public abstract fun createInputMerger(className: String): InputMerger?
}
```

```kotlin
val myUploadWork = OneTimeWorkRequestBuilder<UploadWork>()
    .setInputData(workDataOf("IMAGE_URI" to "http://..."))
    .build()

override fun doWork(): Result {
    val imageUriInput = inputData.getString("IMAGE_URI") ?: return Result.failure()
    return Result.success(workDataOf("output_key" to "output_value"))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Data.Builder.putAll(values: Map<String, Any?>)` | `(Map) -> Builder` | — | Bulk-adds key/value pairs of supported types (String, primitives, and their arrays). |
| `getString(key)` / `getInt(key, default)` / etc. | `(String[, default]) -> T` | type default | Typed accessors for stored values. |
| `MAX_DATA_BYTES` | `Int` (const) | `10 * 1024` | Maximum serialized size (10 KB) for a `Data` instance; exceeding it throws at enqueue time. |
| `InputMerger.merge(inputs: List<Data>)` | `(List<Data>) -> Data` | — | Abstract; combines parent outputs (order unspecified) into one `Data` used as the child's input. |
| `OverwritingInputMerger` | class | default merger | On key conflicts the later value overwrites the earlier one. |
| `ArrayCreatingInputMerger` | class | — | Groups values under conflicting keys into arrays instead of overwriting; mismatched types throw `IllegalArgumentException`. |
| `OneTimeWorkRequest.Builder.setInputMerger(class)` | `(Class<out InputMerger>) -> Builder` | `OverwritingInputMerger` | Selects the merger used when this worker has multiple prerequisites. |
| `InputMergerFactory.createInputMerger(className)` | `(String) -> InputMerger?` | — | Override to construct custom `InputMerger`s from a class name (registered via `Configuration.Builder.setInputMergerFactory`); return `null` to delegate to the default factory. |

## Notes

- `workDataOf(vararg pairs: Pair<String, Any?>)` is the idiomatic Kotlin shortcut for building `Data` from key-value pairs.
- The list of inputs passed to `merge()` is in unspecified order — do not assume ordering.
- Package: `androidx.work`.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [Worker / ListenableWorker / Result](./worker.md)
- [WorkContinuation](./workcontinuation.md)
- [Configuration](./configuration.md)
