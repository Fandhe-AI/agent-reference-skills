# NavKey

Marker interface for navigation destination keys. Types used on a Navigation 3 back stack should implement `NavKey` and be annotated `@Serializable` so they can be saved by `rememberNavBackStack`.

## Signature / Usage

```kotlin
public interface NavKey
```

```kotlin
@Serializable
data object Home : NavKey

@Serializable
data class Product(val id: String) : NavKey
```

## Notes

- `@Serializable` alone cannot link unrelated classes into one polymorphic hierarchy; `NavKey` provides that common supertype so `rememberNavBackStack` can serialize/deserialize a mixed list of destination types.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavBackStack](./navbackstack.md)
- [NavEntry](./naventry.md)
