# ViewAssertions

Factory functions for `ViewAssertion`s passed to `ViewInteraction.check()` to verify the state of a located view.

## Signature / Usage

```kotlin
onView(withId(R.id.textview))
    .check(matches(withText("Hello Espresso!")))

onView(withId(R.id.missing_view))
    .check(doesNotExist())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `matches(matcher: Matcher<View>)` | `ViewAssertion` | Asserts the located view matches the given `Matcher<View>` (e.g. `isDisplayed()`, `withText(...)`). |
| `doesNotExist()` | `ViewAssertion` | Asserts that no view in the hierarchy matches the matcher passed to `onView()`. |
| `selectedDescendantsMatch(selector, matcher)` | `ViewAssertion` | Asserts that every descendant matching `selector` also matches `matcher`. |

## Notes

- To assert a view is present but invisible (still in the hierarchy), use `.check(matches(not(isDisplayed())))`; to assert it was removed entirely, use `.check(doesNotExist())`.
- Custom assertions can be created by implementing `ViewAssertion` directly.
- Package: `androidx.test.espresso.assertion.ViewAssertions`. Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [ViewInteraction](./viewinteraction.md)
- [ViewMatchers](./viewmatchers.md)
