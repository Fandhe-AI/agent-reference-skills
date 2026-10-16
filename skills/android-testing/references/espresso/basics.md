# Espresso basics

Common automated testing tasks with the Espresso API: find a view, perform an action, check an assertion, handle adapter views, and debug failures.

## Signature / Usage

```kotlin
// withId(R.id.my_view) is a ViewMatcher
// click() is a ViewAction
// matches(isDisplayed()) is a ViewAssertion
onView(withId(R.id.my_view))
    .perform(click())
    .check(matches(isDisplayed()))
```

## Options / Props

API components:

| Name | Description |
|------|-------------|
| Espresso | Entry point to interactions with views (via `onView()` and `onData()`). Also exposes APIs not tied to a view, such as `pressBack()`. |
| ViewMatchers | Objects implementing `Matcher<? super View>`; pass to `onView()` to locate a view in the current hierarchy. |
| ViewActions | `ViewAction` objects passed to `ViewInteraction.perform()`, such as `click()`. |
| ViewAssertions | `ViewAssertion` objects passed to `ViewInteraction.check()`. Most often `matches`, which uses a view matcher to assert the state of the selected view. |

## Notes

- The API prevents direct access to activities and views (no `getView()` / `getCurrentActivity()`), since holding them and operating off the UI thread is a major source of flakiness. Implement custom `ViewAction` / `ViewAssertion` subclasses to operate on views safely.

### Find a view

```kotlin
onView(withId(R.id.my_view))
onView(allOf(withId(R.id.my_view), withText("Hello!")))
onView(allOf(withId(R.id.my_view), not(withText("Unwanted"))))
```

- `onView()` takes a hamcrest matcher expected to match one and only one view.
- If an `R.id` is shared by multiple views, an `AmbiguousViewMatcherException` is thrown; its message contains the view hierarchy with matches marked `****MATCHES****`. Narrow with combination matchers such as `allOf`.
- Every interactive view should have descriptive text or a content description. If a search cannot be narrowed using `withText()` or `withContentDescription()`, treat it as an accessibility bug.
- Use the least descriptive matcher that finds the one view; do not over-specify.
- If the target view is inside an `AdapterView` (`ListView`, `GridView`, `Spinner`), `onView()` might not work; use `onData()`.

### Perform an action

```kotlin
onView(...).perform(click())
onView(...).perform(typeText("Hello"), click())
onView(...).perform(scrollTo(), click())
```

- Multiple actions can be passed to one `perform` call.
- Precede actions that need the view displayed (`click()`, `typeText()`) with `scrollTo()` inside a `ScrollView`. `scrollTo()` has no effect if the view is already displayed.

### Check view assertions

```kotlin
onView(...).check(matches(withText("Hello!")))
onView(withId(R.id.text_simple)).check(matches(withText("Hello Espresso!")))
```

- Do not put assertions into the `onView()` argument. Bad practice: `onView(allOf(withId(...), withText("Hello!"))).check(matches(isDisplayed()))` when you mean to assert the content. Asserting that a view with text `"Hello!"` is visible (for example after a visibility change) is fine.
- Distinguish "not displayed" from "not present in the view hierarchy".

### Adapter views (onData)

```kotlin
onView(withId(R.id.spinner_simple)).perform(click())
onData(allOf(`is`(instanceOf(String::class.java)),
        `is`("Americano"))).perform(click())
onView(withId(R.id.spinnertext_simple))
    .check(matches(withText(containsString("Americano"))))
```

- `onData()` first loads the adapter item, bringing it into focus before operating on it or its children. Only a subset of `AdapterView` children is in the hierarchy, so `onView()` cannot find unloaded items.
- Bypassing `onData()` for initially displayed items is possible, but always using `onData()` is safer.
- Custom `AdapterView` implementations that break inheritance contracts (particularly `getItem()`) can fail with `onData()`. Refactor the app code, or implement a custom `AdapterViewProtocol` (see the default `AdapterViewProtocols`).

### Debugging

- Logging: Espresso logs view actions to logcat, for example `ViewInteraction: Performing 'single click' action on view with text: Espresso`.
- `NoMatchingViewException` is thrown when no view matches; the view hierarchy is in the exception message.
- `AmbiguousViewMatcherException` is thrown when multiple views match; matched views are marked `****MATCHES****`.
- When `onView()` fails with `NoMatchingViewException` and `AdapterView` widgets are present, the message includes a warning listing the adapter views; the common fix is `onData()`.
- Use Hierarchy Viewer in Android Studio for complicated hierarchies.

## Related

- [Espresso overview](./overview.md)
- [Espresso.onView](./onview.md)
- [onData](./ondata.md)
- [ViewMatchers](./viewmatchers.md)
- [ViewActions](./viewactions.md)
- [ViewAssertions](./viewassertions.md)
- [Espresso cheat sheet](./cheat-sheet.md)
