---
source: https://kotlinlang.org/docs/multiplatform/compose-viewmodel.html
---

# Multiplatform ViewModel

With Compose Multiplatform you can use the Android `ViewModel` in common code: set up dependencies, use `viewModel()` in common code, scope ViewModels to Navigation 3 entries, inject with Koin or Metro, and choose a level of code sharing.

## Signature / Usage

Gradle version catalog:

```toml
[versions]
androidx-viewmodel = "2.10.0"

[libraries]
androidx-lifecycle-viewmodel-compose = { module = "org.jetbrains.androidx.lifecycle:lifecycle-viewmodel-compose", version.ref = "androidx-viewmodel" }
androidx-lifecycle-viewmodel-navigation3 = { module = "androidx.lifecycle:lifecycle-viewmodel-navigation3", version.ref = "androidx-viewmodel" }
```

`commonMain` dependencies:

```kotlin
kotlin {
   // ...
   sourceSets {
       // ...
       commonMain.dependencies {
           implementation(libs.androidx.lifecycle.viewmodel.compose)
           implementation(libs.androidx.lifecycle.viewmodel.navigation3)
       }
       // ...
   }
}
```

Define and use a ViewModel in common code:

```kotlin
data class OrderUiState(val quantity: Int = 0, val price: String = "$0.00")

class OrderViewModel : ViewModel() {
   val uiState: StateFlow<OrderUiState>
       field = MutableStateFlow(OrderUiState())

   fun setQuantity(n: Int) {
       uiState.update { it.copy(quantity = n, price = "$${n * 2}.00") }
   }
}

@Composable
fun CupcakeApp(
   viewModel: OrderViewModel = viewModel { OrderViewModel() },
) {
   // ...
}
```

## Notes

- Compose Multiplatform provides a common `ViewModelStoreOwner`. On non-JVM platforms type reflection is unavailable, so `viewModel()` cannot be called without parameters in common code: always provide at least an initializer. With only an initializer, a default factory is created; you can implement your own factories and call the more explicit `viewModel()` overloads.
- The example uses explicit backing fields (stabilized in Kotlin 2.4.0). With earlier versions, add the `-Xexplicit-backing-fields` compiler option or use the old backing fields pattern with `.asStateFlow()`.
- The `2.10.0` value is as written on this page; dependencies may differ depending on your code-sharing approach.
- Desktop targets: add `kotlinx-coroutines-swing` (`jvmMain.dependencies { implementation(libs.kotlinx.coroutines.swing) }`, catalog `kotlinx-coroutines = "1.10.2"` on this page) because `ViewModel.viewModelScope` is tied to `Dispatchers.Main.immediate`.
- Navigation 3: ViewModels are not scoped to navigation entries by default (each would be tied to the `Activity`). Pass `rememberSaveableStateHolderNavEntryDecorator()` and `rememberViewModelStoreNavEntryDecorator()` to `NavDisplay(entryDecorators = listOf(...), backStack = backStack, entryProvider = entryProvider { })`. Imports: `androidx.lifecycle.viewmodel.navigation3.rememberViewModelStoreNavEntryDecorator`, `androidx.navigation3.runtime.rememberSaveableStateHolderNavEntryDecorator`.
- Dependency injection: Koin (runtime DI; add `koin-compose-viewmodel`, inject with `koinViewModel()`) or Metro (compile-time compiler plugin; add `metrox-viewmodel-compose`, inject with `metroViewModel()`), or any other DI framework that supports Kotlin Multiplatform.
- Levels of code sharing: (1) shared ViewModel and UI via Compose Multiplatform; (2) shared ViewModel with platform-specific UI: switch to `androidx.lifecycle:lifecycle-viewmodel`, declare it as `api(...)` and `export(libs.androidx.lifecycle.viewmodel)` in the iOS framework binaries; on iOS there is no built-in `ViewModelStoreOwner`, and the page recommends the KMP-ObservableViewModel library (`@NativeCoroutinesState`, `@StateViewModel`); (3) shared repository/data layer only, with platform-specific ViewModels (Android `ViewModel`, iOS `ObservableObject`).
- Distinct from Android-only coverage: the common `androidx.lifecycle` ViewModel API is covered by android-architecture; this page covers the `org.jetbrains.androidx.lifecycle` artifact and multiplatform differences.

## Related

- [Lifecycle](./lifecycle.md)
- [Navigation 3 in Compose Multiplatform](./navigation-3.md)
