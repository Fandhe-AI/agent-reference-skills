# Composition and Recomposition

A **Composition** is the tree describing the app's UI produced by running composables. **Recomposition** re-runs the composables affected when a `State<T>` they read changes, and Compose intelligently skips composables whose inputs did not change.

## Signature / Usage

```kotlin
@Composable
fun NamePicker(header: String, names: List<String>, onNameClicked: (String) -> Unit) {
    Column {
        // Recomposes only when `header` changes.
        Text(header, style = MaterialTheme.typography.bodyLarge)
        LazyColumn {
            items(names) { name ->
                // Recomposes only when this item's `name` changes.
                NamePickerItem(name, onNameClicked)
            }
        }
    }
}
```

## Notes

- A composable enters the Composition, is recomposed zero or more times, then leaves it. Its identity in the tree is derived from its **call site** (source code location) plus execution order — calling the same composable from multiple call sites creates distinct instances.
- Use `key(value) { ... }` to give a composable an explicit identity (e.g. inside a manual loop that renders a list), so reordering the underlying data does not force unrelated recompositions or restart side effects. `LazyColumn`/`LazyRow`'s `items(list, key = { it.id }) { ... }` provide this automatically.
- A composable is eligible to be **skipped** during recomposition unless: it has a non-`Unit` return type, it is annotated `@NonRestartableComposable` / `@NonSkippableComposable`, or one of its parameters has a non-stable type.
- A type is **stable** if `equals()` is forever consistent between two instances, all public property changes notify the Composition, and all public property types are themselves stable. Primitives, `String`, function types, and `MutableState<T>` are stable by default. Annotate a type with `@Stable` when Compose cannot infer stability but the contract holds.
- Composables are **restartable** by default (can be re-invoked from scratch when a dependency changes); `@NonRestartableComposable` opts out.
- Package: `androidx.compose.runtime`.

## Related

- [Composable Functions](./composable-functions.md)
- [Phases of Compose](./phases.md)
- [derivedStateOf](../state-lifecycle/derivedstateof.md)
- [remember](../state-lifecycle/remember.md)
- [mutableStateOf](../state-lifecycle/mutablestateof.md)
