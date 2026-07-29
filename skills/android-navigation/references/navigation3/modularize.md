# Modularize Navigation 3 Code

Pattern for splitting Navigation 3 code across Gradle feature modules: each feature exposes its `NavKey`s from a small `api` module and its `NavEntry` content from an `impl` module, and the app composes every feature's entries together through plain `EntryProviderScope<NavKey>` extension functions passed into a single `entryProvider { }` call.

## Signature / Usage

```kotlin
// 1. Per feature, define an "entry builder" as an extension function on EntryProviderScope.
//    Lives in the feature's impl module; registers that feature's NavKey -> content mappings.
fun EntryProviderScope<NavKey>.featureAEntryBuilder() {
    entry<KeyA> {
        ContentRed("Screen A") {
            // Content for screen A
        }
    }
    entry<KeyA2> {
        ContentGreen("Screen A2") {
            // Content for screen A2
        }
    }
}

// 2. Compose entry builders from every feature module in the app module via entryProvider { }.
NavDisplay(
    entryProvider = entryProvider {
        featureAEntryBuilder()
        featureBEntryBuilder()
    },
    // ...
)

// 3. To avoid the app module listing every feature builder by hand, provide each one as a
//    Dagger multibinding and let the app module inject the aggregated Set.
@Module
@InstallIn(ActivityRetainedComponent::class)
object FeatureAModule {
    @IntoSet
    @Provides
    fun provideFeatureAEntryBuilder(): EntryProviderScope<NavKey>.() -> Unit = {
        featureAEntryBuilder()
    }
}

class MainActivity : ComponentActivity() {
    @Inject
    lateinit var entryBuilders: Set<@JvmSuppressWildcards EntryProviderScope<NavKey>.() -> Unit>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NavDisplay(
                entryProvider = entryProvider {
                    entryBuilders.forEach { builder -> this.builder() }
                },
                // ...
            )
        }
    }
}
```

## Options / Props

| Module | Contains |
|------|-------------|
| `api` (per feature) | The feature's `NavKey` types only — the minimal surface other features' `impl` modules need to navigate to this feature. |
| `impl` (per feature) | The feature's `NavEntry` content and its `EntryProviderScope<NavKey>` extension-function entry builder (e.g. `featureAEntryBuilder()`). |
| App module | Depends on every feature's `impl`; composes all entry builders into one `entryProvider { }` passed to `NavDisplay`, either by calling each builder directly or by injecting a Dagger multibinding `Set`. |

## Notes

- The `api`/`impl` split lets a feature's `impl` module depend on other features' `api` modules (to navigate to them) without depending on those features' full implementations, avoiding module-graph cycles.
- The Dagger wiring shown uses `@IntoSet` to contribute each feature's `EntryProviderScope<NavKey>.() -> Unit` builder into a single injected `Set`, so the app module doesn't need to reference every feature builder function by name; this scales to many features without a growing manual list in the app module.
- This pattern is orthogonal to which `SceneStrategy`s or `NavEntryDecorator`s are configured on `NavDisplay` — it only concerns how `entryProvider { }`'s builder lambda is assembled from multiple modules.
- Runnable samples for this and other Navigation 3 architecture patterns live under the "Architecture" section of the [android/nav3-recipes](https://github.com/android/nav3-recipes/?tab=readme-ov-file#architecture) repository; a full-app example is [Now in Android's modularization](https://github.com/android/nowinandroid/blob/main/docs/ModularizationLearningJourney.md) and [Androidify](https://github.com/android/androidify).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) modularization pattern — distinct from the same-named concept in other skills.

## Related

- [entryProvider / entry](./entryprovider.md)
- [NavKey](./navkey.md)
- [NavDisplay](./navdisplay.md)
- [Migrate from Navigation 2 to Navigation 3](./migration-guide.md)
