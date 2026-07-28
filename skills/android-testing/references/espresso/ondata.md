# Espresso.onData

Entry point for interacting with items in an `AdapterView` (`ListView`, `GridView`, `Spinner`) that may not currently be in the view hierarchy because they are dynamically recycled/loaded. Espresso automatically scrolls the adapter view as needed to bring the matched data item into view.

## Signature / Usage

```kotlin
fun onData(dataMatcher: Matcher<Any>): DataInteraction
```

```kotlin
onData(allOf(is(instanceOf(Map::class.java)), hasEntry(equalTo("STR"), is("item: 50"))))
    .perform(click())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dataMatcher` | `Matcher<Any>` | — | Matches an item in the adapter's backing data (not the rendered `View`). |

## Notes

- Unlike `onView()`, `onData()` matches against the adapter's underlying data object, not a rendered `View` — write matchers against the data type used by the `Adapter` (e.g. `Map`, a custom model class).
- Chain `.onChildView(withId(R.id.item_size))` to act on a specific child view within the matched row.
- Custom data matchers can be created with `BoundedMatcher<Object, T>`.
- `onData()` cannot be used with `RecyclerView` (it has no `Adapter`/data-matcher concept in the same sense) — use [RecyclerViewActions](./recyclerviewactions.md) instead.
- Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [Espresso.onView](./onview.md)
- [RecyclerViewActions](./recyclerviewactions.md)
- [Custom Matchers and Actions](./custom-matchers-actions.md)
