# State Hoisting

A pattern for making a composable stateless by moving its state to the caller, replacing an internal `remember`ed variable with a `value` parameter and an `onValueChange` (or similarly named) callback parameter.

## Signature / Usage

```kotlin
@Composable
fun HelloScreen() {
    var name by rememberSaveable { mutableStateOf("") }

    HelloContent(name = name, onNameChange = { name = it })
}

@Composable
fun HelloContent(name: String, onNameChange: (String) -> Unit) {
    Column {
        Text("Hello, $name")
        OutlinedTextField(value = name, onValueChange = onNameChange, label = { Text("Name") })
    }
}
```

## Notes

- Hoist state to the **lowest common ancestor** of all composables that read or write it — no higher, no lower.
- Hoisted state should be a single source of truth, encapsulated (only the stateful owner mutates it), shareable, interceptable (callers can ignore/transform events), and decoupled (may live in a plain state holder class or a `ViewModel`).
- Three common hoisting destinations: composable-internal state (simple, single-composable UI state), a hoisted state holder shared between sibling composables (e.g. `rememberLazyListState()`), or a `ViewModel` for business logic and screen-level state (paired with `collectAsStateWithLifecycle`).
- Suspend APIs that require a Composition-scoped `CoroutineScope` (e.g. `DrawerState.close()`) still need that scope even when the state itself is hoisted into a `ViewModel`.
- This is a design pattern, not an API — no dedicated import.

## Related

- [remember](./remember.md)
- [rememberSaveable](./remembersaveable.md)
- collectAsStateWithLifecycle — owned by the `android-architecture` skill (`references/lifecycle-viewmodel/collectasstatewithlifecycle.md`)
