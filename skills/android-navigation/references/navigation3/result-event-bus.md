# Return results (ResultEventBus / ResultEffect)

In-memory event bus (Navigation 3 1.2.0+) for returning results from one destination to another, with queued event delivery (`ResultEffect`) and conflated state delivery (`conflateAsState`).

## Signature / Usage

```kotlin
@Composable public fun rememberResultEventBus(): ResultEventBus

public object LocalResultEventBus {
    public val current: ResultEventBus  // @Composable getter; errors if none provided
    public infix fun provides(eventBus: ResultEventBus): ProvidedValue<ResultEventBus?>
}

public class ResultEventBus {
    @Composable public inline fun <reified T> conflateAsState(defaultValue: T): State<T>
    @Composable public fun <T> conflateAsState(resultKey: String, defaultValue: T): State<T>
    public inline fun <reified T> sendResult(result: T)
    public fun <T> sendResult(resultKey: String, result: T)
    public inline fun <reified T> removeResult()
    public fun removeResult(resultKey: String)
}

@Composable
public inline fun <reified T> ResultEffect(
    resultEventBus: ResultEventBus = LocalResultEventBus.current,
    noinline onResult: suspend (T) -> Unit,
)

@Composable
public fun <T> ResultEffect(
    resultKey: String,
    resultEventBus: ResultEventBus = LocalResultEventBus.current,
    onResult: suspend (T) -> Unit,
)

@Composable
public fun <T : Any> rememberResultEventBusNavEntryDecorator(
    resultEventBus: ResultEventBus = rememberResultEventBus()
): ResultEventBusNavEntryDecorator<T>
```

Set up the bus:

```kotlin
NavDisplay(
    /* ... */
    entryDecorators = listOf(
        rememberSaveableStateHolderNavEntryDecorator(),
        rememberResultEventBusNavEntryDecorator()
    )
)
```

Send a result (explicit key) and receive it:

```kotlin
entry<AddressPickerRoute> {
    val resultBus = LocalResultEventBus.current

    AddressPickerScreen(
        onAddressSelected = { selectedAddress: Address ->
            resultBus.sendResult(
                resultKey = "pickup_address",
                result = selectedAddress
            )
            navigator.goBack()
        }
    )
}

ResultEffect<Address>(resultKey = "pickup_address") { address ->
    viewModel.onPickupAddressSelected(address)
}
```

Observe the latest result as state:

```kotlin
val resultBus = LocalResultEventBus.current
val primaryColor by resultBus.conflateAsState<Color>(
    resultKey = "primary_color",
    defaultValue = MaterialTheme.colorScheme.primary
)
```

Hoist the bus:

```kotlin
val resultEventBus = rememberResultEventBus()
val resultEventBusNavEntryDecorator =
    rememberResultEventBusNavEntryDecorator<NavKey>(
        resultEventBus = resultEventBus
    )
```

Clear a consumed result:

```kotlin
ResultEffect<ConfirmationResult>(resultKey = "confirm_permission") { confirmation ->
    viewModel.onPermissionConfirmed(confirmation)
    // Clear the result after consumption to prevent re-delivery
    resultBus.removeResult(resultKey = "confirm_permission")
}
```

## Options / Props

| API | Behavior | Recommended use |
|-----|----------|-----------------|
| `ResultEffect` | Queued: processes all results emitted for the key in order; runs in a coroutine scope so suspending calls are allowed in the body. | One-time events and side effects (snackbar, forwarding to a `ViewModel`). |
| `conflateAsState` | Conflated: drops intermediate results, keeps only the latest as Compose `State`. | Lightweight UI state modifiers (active filter tags, selection overrides). |

## Notes

- `ResultEventBus` is an in-memory bus: results are not saved across process death or activity recreation. Persist with `rememberSaveable`, a `SavedStateHandle` in a scoped `ViewModel`, or by embedding data in a `NavKey`.
- Keys: explicit (`resultKey = "pickup_address"`) or type-derived (`T::class.toString()` when no key is given). Type-derived receivers do not get events sent with explicit keys even for the same payload type; sender and receiver must both use explicit or both use type-derived keys.
- Keep screen composables reusable and testable: expose callbacks from the screen and call `sendResult` from the `entryProvider`, not from screen UI.
- `ResultEffect` lifecycle: sender emits and pops; receiver enters composition and starts listening; each result for the key is processed in order; the effect stops when the receiver leaves composition.
- Remove consumed one-time results with `removeResult` (by key or `removeResult<T>()`) to avoid re-delivery to new observers.
- Use `conflateAsState` for optional UI modifiers; for primary repository-backed data use `ResultEffect` to update a `ViewModel`.
- Hoist the bus (`rememberResultEventBus()` passed to the decorator) to use it from non-composable components, DI graphs, or top-level scaffolding.
- Recipes (android/nav3-recipes, pinned commit eab7ffd): [results/event](https://github.com/android/nav3-recipes/tree/eab7ffd907ef89975d01ab1e23671dbb38623940/app/src/main/java/com/example/nav3recipes/results/event), [results/state](https://github.com/android/nav3-recipes/tree/eab7ffd907ef89975d01ab1e23671dbb38623940/app/src/main/java/com/example/nav3recipes/results/state), [results/serializable](https://github.com/android/nav3-recipes/tree/eab7ffd907ef89975d01ab1e23671dbb38623940/app/src/main/java/com/example/nav3recipes/results/serializable). `results/serializable` is not in tag 1.1.0, hence the commit pin.
- Source: https://developer.android.com/guide/navigation/navigation-3/return-results (retrieved 2026-10-17; Navigation 3 1.2.0)
- Package: `androidx.navigation3.runtime.result`. Android Navigation 3 (Kotlin) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavEntryDecorator](./naventrydecorator.md)
- [NavDisplay](./navdisplay.md)
- [entryProvider / entry](./entryprovider.md)
- [Save and manage navigation state](./save-state.md)
