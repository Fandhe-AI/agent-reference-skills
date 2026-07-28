# Espresso Recipes

Common Espresso testing patterns for scenarios not covered by the basic matcher/action/assertion APIs directly.

## Signature / Usage

```kotlin
// Match a view next to another view, using hasSibling()
onView(allOf(withText("7"), hasSibling(withText("item: 0"))))
    .perform(click())

// Target a non-default window (e.g. a dialog)
onView(withText("South China Sea"))
    .inRoot(withDecorView(not(`is`(activity.window.decorView))))
    .perform(click())
```

## Options / Props

| Recipe | Description |
|--------|-------------|
| Match a view next to another view | Use `hasSibling(matcher)` to disambiguate repeated layouts (e.g. list rows) by a neighboring view. |
| Match a view inside the action bar | Click visible action bar items directly; use `openActionBarOverflowOrOptionsMenu()` for hidden/overflow items. |
| Assert a view is not displayed | `.check(matches(not(isDisplayed())))` — view is present in the hierarchy but invisible. |
| Assert a view is not present | `.check(doesNotExist())` — view is absent from the hierarchy entirely. |
| Assert a data item is not in an adapter | Combine a custom `onData()` matcher with `not(...)`, e.g. `not(withAdaptedData(withItemContent(...)))`. |
| Use a custom failure handler | Implement `FailureHandler` and register with `Espresso.setFailureHandler(handler)` to customize failure diagnostics. |
| Target non-default windows | Use `.inRoot(withDecorView(matcher))` to act on views in a different window (e.g. `AlertDialog`) than the host activity. |
| Match a header/footer in a ListView | Pass data to `addHeaderView()`/`addFooterView()`, then match via a custom `onData()` matcher. |

## Notes

- `inRoot()` is called on the `ViewInteraction` before `perform()`/`check()` — see [ViewInteraction](./viewinteraction.md).
- Custom failure handlers implement `androidx.test.espresso.FailureHandler`.

## Related

- [ViewInteraction](./viewinteraction.md)
- [ViewMatchers](./viewmatchers.md)
- [Espresso.onData](./ondata.md)
- [Espresso Best Practices](./best-practices.md)
