# Use Hilt with other Jetpack libraries

Hilt ships dedicated `androidx.hilt` artifacts that extend its dependency injection to `ViewModel`, `WorkManager`, and both the Compose and Fragment-based Navigation libraries, beyond the core `@HiltAndroidApp` / `@AndroidEntryPoint` setup.

## Signature / Usage

```kotlin
// hilt-work: inject a Worker
@HiltWorker
class ExampleWorker @AssistedInject constructor(
  @Assisted appContext: Context,
  @Assisted workerParams: WorkerParameters,
  workerDependency: WorkerDependency
) : Worker(appContext, workerParams) { ... }
```

```kotlin
// Application implements Configuration.Provider to register HiltWorkerFactory
@HiltAndroidApp
class ExampleApplication : Application(), Configuration.Provider {

  @Inject lateinit var workerFactory: HiltWorkerFactory

  override fun getWorkManagerConfiguration() =
      Configuration.Builder()
            .setWorkerFactory(workerFactory)
            .build()
}
```

```kotlin
// hilt-navigation-fragment: scope a Hilt ViewModel to a Fragment's navigation graph
val viewModel: ExampleViewModel by navGraphViewModels(R.id.example_graph) {
  defaultViewModelProviderFactory
}
// or, with the KTX helper:
val viewModel: ExampleViewModel by hiltNavGraphViewModels(R.id.example_graph)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `androidx.hilt:hilt-work` | Gradle artifact | — | Adds `@HiltWorker` and `HiltWorkerFactory` for injecting `Worker` classes. Requires `androidx.hilt:hilt-compiler` on the `ksp`/`kapt` configuration. |
| `androidx.hilt:hilt-navigation-fragment` | Gradle artifact | — | Adds `hiltNavGraphViewModels()`, a Kotlin extension retrieving a `@HiltViewModel` scoped to a Fragment `NavBackStackEntry`/nav graph. |
| `hiltNavGraphViewModels(navGraphId)` | `(Int) -> Lazy<VM>` | — | Retrieves (creating if absent) the Hilt-managed `ViewModel` scoped to the given navigation graph. An overload taking a `creationCallback: (VMF) -> VM` also exists for assisted injection. |

## Notes

- **WorkManager**: annotate the `Worker` constructor with `@AssistedInject`, mark `Context` and `WorkerParameters` with `@Assisted`, and inject `HiltWorkerFactory` into an `Application` implementing `Configuration.Provider`; remove the default `WorkManagerInitializer` entry from the manifest when doing so. Only `@Singleton` or unscoped bindings are supported inside a `Worker`.
- **Navigation Compose**: `hiltViewModel()` automatically scopes a `@HiltViewModel` to the current navigation destination; with Navigation 3, combine `rememberViewModelStoreNavEntryDecorator()` with `hiltViewModel()` inside the entry provider (see `@HiltViewModel` / `hiltViewModel()`).
- **Navigation (Fragment-based, View system)**: `hiltNavGraphViewModels()` from `androidx.hilt:hilt-navigation-fragment` is the Fragment-side equivalent of `hiltViewModel()` — it scopes a `@HiltViewModel` to a navigation graph's `NavBackStackEntry` rather than to the destination `Fragment` itself, so the same instance is shared across every destination in that graph.
- Assisted injection (`@AssistedInject` / `@Assisted` / `@AssistedFactory` combined with `@HiltViewModel(assistedFactory = ...)`) applies uniformly across Compose and Fragment navigation for passing runtime arguments alongside Hilt-managed dependencies.
- WorkManager itself (`Worker`, `WorkerFactory`, `Configuration`) is documented in the android-background-work skill; this page covers only the Hilt-specific wiring on top of it.

## Related

- [HiltViewModel / hiltViewModel()](./hilt-view-model.md)
- [HiltAndroidApp](./hilt-android-app.md)
- [EntryPoint / EntryPointAccessors](./entry-point.md)
