---
source: https://kotlinlang.org/docs/multiplatform/compose-navigation-3.html
---

# Navigation 3 in Compose Multiplatform

Starting with version 1.10, Compose Multiplatform supports adopting Navigation 3 in multiplatform projects for Android, iOS, desktop, and web.

## Signature / Usage

```toml
[versions]
multiplatform-nav3-ui = "1.1.1"

[libraries]
jetbrains-navigation3-ui = { module = "org.jetbrains.androidx.navigation3:navigation3-ui", version.ref = "multiplatform-nav3-ui" }
```

Open polymorphism with a `SavedStateConfiguration` (required for non-JVM platforms):

```kotlin
@Serializable
private data object RouteA : NavKey

@Serializable
private data class RouteB(val id: String) : NavKey

// Creates the required serialization configuration for open polymorphism
private val config = SavedStateConfiguration {
    serializersModule = SerializersModule {
        polymorphic(NavKey::class) {
            subclass(RouteA::class, RouteA.serializer())
            subclass(RouteB::class, RouteB.serializer())
        }
    }
}

@Composable
fun BasicDslActivity() {
    // Consumes the serialization configuration
    val backStack = rememberNavBackStack(config, RouteA)

    NavDisplay(
        backStack = backStack,
        //...
    )
}
```

## Options / Props

Dependency artifacts shown on the page:

| Artifact | Version on page | Purpose |
| --- | --- | --- |
| `org.jetbrains.androidx.navigation3:navigation3-ui` | `1.1.1` | Multiplatform Navigation 3 UI |
| `org.jetbrains.compose.material3.adaptive:adaptive-navigation3` | `1.3.0-beta02` | Material 3 Adaptive navigation support |
| `org.jetbrains.androidx.lifecycle:lifecycle-viewmodel-navigation3` | `2.10.0` | ViewModel navigation support |
| `com.github.terrakok:navigation3-browser` | `1.1.0` | Proof-of-concept browser history integration |

## Notes

- Key changes: user-owned back stack (a `SnapshotStateList` of states the UI observes directly), low-level building blocks, and an adaptive layout system.
- Of the two artifacts `navigation3-ui` and `navigation3-common`, only `navigation3-ui` has a separate Compose Multiplatform implementation; `navigation3-common` is added transitively.
- Versions are exactly as written on the page (the adaptive artifact is a beta version). These are the examples on the source page; the artifact versions paired with Compose Multiplatform 1.12.2 (Navigation3 1.2.0-rc01, Lifecycle 2.11.0) are listed in whats-new-compose-1-12.
- Browser history navigation is not in the base library; planned for a future release (CMP-8924). `navigation3-browser` is a proof-of-concept library by a JetBrains engineer.
- On non-JVM platforms (web, iOS) reflection-based serialization is unavailable, so implement polymorphic serialization for destination keys. `rememberNavBackStack()` has two overloads: one takes only `NavKey` references (reflection-based serializer), the other also takes a `SavedStateConfiguration` with a `SerializersModule`.
- Recommended patterns: single module with a `sealed interface Route : NavKey` (use `rememberSerializable(serializer = SnapshotStateListSerializer()) { mutableStateListOf(RouteA) }` or `subclassesOfSealed<Route>()` inside `polymorphic(NavKey::class)`); multi-module with aggregated sealed types (`subclassesOfSealed<FeatureA>()` and `subclassesOfSealed<FeatureB>()` in the app module); multi-module with individual route registration (combine modules with `serializerModuleA + serializerModuleB`). DI can collect serializers dynamically.
- Distinct from Android-only coverage: the Navigation 3 API itself is covered by android-navigation; this page covers the `org.jetbrains.androidx.navigation3` multiplatform artifact and serialization differences.

## Related

- [Navigation in Compose](./navigation.md)
- [Multiplatform ViewModel](./viewmodel.md)
