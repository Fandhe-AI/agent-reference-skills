# ViewInteraction

The object returned by `onView()` / `onData()`. Exposes `perform()` to execute `ViewAction`s and `check()` to run `ViewAssertion`s against the located view, and can be chained.

## Signature / Usage

```kotlin
interface ViewInteraction {
    fun perform(vararg actions: ViewAction): ViewInteraction
    fun check(viewAssert: ViewAssertion): ViewInteraction
    fun inRoot(rootMatcher: Matcher<Root>): ViewInteraction
}
```

```kotlin
onView(withId(R.id.editText))
    .perform(typeText("Hello"), closeSoftKeyboard())
    .check(matches(withText("Hello")))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ViewAction...` | — | One or more actions executed in sequence on the view. |
| `viewAssert` | `ViewAssertion` | — | Assertion evaluated against the view (and any error). |
| `rootMatcher` | `Matcher<Root>` | current activity's decor view | Targets a non-default window (e.g. a dialog) for subsequent `perform`/`check` calls. |

## Notes

- `perform()` and `check()` both return the same `ViewInteraction`, so calls can be chained fluently.
- Assertions belong in `check()`, not folded into the matcher passed to `onView()` — use the least specific matcher needed to find the view, then assert separately.
- Use `inRoot()` to target views in a different window (e.g. an `AlertDialog`'s decor view) than the host activity.

## Related

- [Espresso.onView](./onview.md)
- [ViewActions](./viewactions.md)
- [ViewAssertions](./viewassertions.md)
