# RecyclerViewActions

`ViewAction`s (from `espresso-contrib`) for scrolling and acting on items inside a `RecyclerView`. Required because `RecyclerView` recycles rows and has no `Adapter` data-matcher support like `AdapterView`, so `onData()` cannot be used with it.

## Signature / Usage

```kotlin
onView(withId(R.id.recyclerView))
    .perform(RecyclerViewActions.actionOnItemAtPosition<RecyclerView.ViewHolder>(
        ITEM_BELOW_THE_FOLD,
        click()
    ))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scrollTo(matcher)` | `ViewAction` | Scrolls to the first item whose root view matches the given matcher. |
| `scrollToHolder(holderMatcher)` | `ViewAction` | Scrolls to the first item whose `ViewHolder` matches the given matcher. |
| `scrollToPosition(position: Int)` | `ViewAction` | Scrolls to the item at the given adapter position. |
| `actionOnItem(itemMatcher, viewAction)` | `ViewAction` | Scrolls to and performs `viewAction` on the item matching `itemMatcher`. |
| `actionOnHolderItem(holderMatcher, viewAction)` | `ViewAction` | Scrolls to and performs `viewAction` on the item whose `ViewHolder` matches `holderMatcher`. |
| `actionOnItemAtPosition(position, viewAction)` | `ViewAction` | Scrolls to and performs `viewAction` on the item at the given position. |

## Notes

- Requires the `espresso-contrib` artifact (`androidx.test.espresso:espresso-contrib`), unlike core `ViewMatchers`/`ViewActions`/`ViewAssertions`.
- Applied to the `onView(withId(R.id.recyclerView))` interaction itself, not to individual row views.
- Scrolling to a non-matching item throws `PerformException`.

## Related

- [Espresso.onData](./ondata.md)
- [ViewActions](./viewactions.md)
