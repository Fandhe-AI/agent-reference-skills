# kotlinx.serialization Retrofit Converter

A Retrofit `Converter.Factory` that (de)serializes request/response bodies using `kotlinx.serialization`'s `Json` (or any `TextFormat`/`BinaryFormat`), for use with `@Serializable` data classes.

## Signature / Usage

```kotlin
@Serializable
data class User(val id: String, val name: String)

val retrofit = Retrofit.Builder()
    .baseUrl("https://example.com/")
    .addConverterFactory(
        Json.asConverterFactory("application/json; charset=utf-8".toMediaType())
    )
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Json.asConverterFactory(mediaType)` | function | — | Builds a `Converter.Factory` from a kotlinx.serialization `Json` instance and a `MediaType` used as the request `Content-Type`. |
| `@Serializable` | class annotation | — | Marks a data class as serializable by kotlinx.serialization. |

## Notes

- Third-party library (Square), not part of the Android SDK or Jetpack. Ships from the `retrofit-converters/kotlinx-serialization` module in the Retrofit project.
- If mixing with another converter factory, add this one **last** so other converters get first chance to handle their types.
- Requires model classes to be annotated `@Serializable`; plain data classes without the annotation will fail to convert.

## Related

- [Retrofit](./retrofit.md)
