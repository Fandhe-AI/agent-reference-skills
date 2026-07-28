# Modularization Patterns

Common module types and dependency-direction conventions for splitting an Android codebase, built on high cohesion / low coupling.

## Signature / Usage

```kotlin
// Feature module navigates by passing a primitive ID, not an object
navController.navigate("checkout/$bookId")

class CheckoutViewModel(savedStateHandle: SavedStateHandle, /* ... */) : ViewModel() {
    val uiState: StateFlow<CheckoutUiState> =
        savedStateHandle.getStateFlow("bookId", "").map { bookId ->
            // Fetch details from the shared data module
        }
}
```

## Notes

- Module types: data modules (encapsulate a domain's data/business logic, expose only a repository API), feature modules (one screen/destination's UI + ViewModel, depend on data modules), app modules (entry point, root navigation, one per platform/build variant), common/core modules (shared UI, analytics, network, utilities), test modules (shared test code/utilities).
- Avoid cyclic dependencies between feature modules by routing through a mediator (usually the app module) and exchanging primitive IDs via navigation instead of passing objects directly.
- Dependency inversion pattern: an abstraction module holds interfaces/models; implementation modules depend on the abstraction and are swapped per build variant (e.g. `releaseImplementation(project(":database:impl:firestore"))` vs `debugImplementation(project(":database:impl:room"))`).
- General practices: centralize dependency versions (version catalogs/convention plugins); expose as little as possible (`private`/`internal`, prefer `implementation` over `api`); prefer plain Kotlin/Java modules over Android modules when Android-specific APIs aren't needed.

## Related

- [modularization](./modularization.md)
