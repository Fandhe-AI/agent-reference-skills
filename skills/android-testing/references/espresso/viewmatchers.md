# ViewMatchers

Hamcrest `Matcher<View>` factory functions used to locate a view in the hierarchy via `onView()`, or to combine/negate other matchers.

## Signature / Usage

```kotlin
onView(allOf(withId(R.id.my_view), withText("Hello!")))
onView(allOf(withId(R.id.my_view), not(withText("Unwanted"))))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `withId(id: Int)` | `Matcher<View>` | Finds a view by resource ID. Most views should be identifiable by ID alone. |
| `withText(text: String)` | `Matcher<View>` | Matches a `TextView`-like view by its displayed text. |
| `withContentDescription(text: String)` | `Matcher<View>` | Matches a view by its content description. |
| `isDisplayed()` | `Matcher<View>` | Matches a view that is currently visible on screen. |
| `hasFocus()` | `Matcher<View>` | Matches a view that currently has focus. |
| `isChecked()` | `Matcher<View>` | Matches a checked `Checkable` (checkbox, radio button, switch). |
| `withParent(matcher: Matcher<View>)` | `Matcher<View>` | Matches a view whose parent matches the given matcher. |
| `hasDescendant(matcher: Matcher<View>)` | `Matcher<View>` | Matches a view containing a descendant that matches the given matcher. |
| `allOf(vararg matchers)` | `Matcher<View>` | Combines matchers with AND logic (from Hamcrest). |
| `anyOf(vararg matchers)` | `Matcher<View>` | Combines matchers with OR logic (from Hamcrest). |
| `not(matcher)` | `Matcher<View>` | Negates a matcher (from Hamcrest). |
| `instanceOf(clazz: Class<*>)` | `Matcher<View>` | Matches a view of the given type (from Hamcrest). |
| `containsString(text: String)` | `Matcher<String>` | Partial text match, usually combined with `withText()` (from Hamcrest). |
| `hasSibling(matcher: Matcher<View>)` | `Matcher<View>` | Matches a view that has a sibling matching the given matcher — useful for disambiguating repeated layouts (e.g. list rows). |

## Notes

- `ViewMatchers` implement `org.hamcrest.Matcher<? super View>`; combinators like `allOf` / `anyOf` / `not` come from Hamcrest, not from Espresso itself.
- When a matcher is ambiguous (matches multiple views), `onView()` throws `AmbiguousViewMatcherException` listing all matches — narrow with additional matchers rather than adding assertions to the matcher.
- Custom matchers can be written by implementing `TypeSafeMatcher<View>` or `BoundedMatcher` — see [Custom Matchers and Actions](./custom-matchers-actions.md).
- Package: `androidx.test.espresso.matcher.ViewMatchers`. Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [Espresso.onView](./onview.md)
- [ViewActions](./viewactions.md)
- [Custom Matchers and Actions](./custom-matchers-actions.md)
