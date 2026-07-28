# Espresso.onView

Locates a single view in the current view hierarchy and returns a `ViewInteraction` for chaining actions and assertions. The main entry point for Espresso UI tests targeting the View system.

## Signature / Usage

```kotlin
fun onView(viewMatcher: Matcher<View>): ViewInteraction
```

```kotlin
onView(withId(R.id.my_view))
    .perform(click())
    .check(matches(isDisplayed()))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `viewMatcher` | `Matcher<View>` | — | A Hamcrest `Matcher` (typically from `ViewMatchers`) that uniquely identifies the target view. |

## Notes

- If the matcher matches zero views, throws `NoMatchingViewException`. If it matches more than one, throws `AmbiguousViewMatcherException` — combine matchers (e.g. `allOf(withId(...), withText(...))`) to disambiguate.
- `onView()` waits until the message queue is empty, no `AsyncTask` is running, and all registered `IdlingResource`s are idle before locating the view.
- Cannot be used for items inside `AdapterView` (ListView/GridView/Spinner) that are not currently in the hierarchy — use `onData` instead.
- Not applicable to Jetpack Compose UIs; use Compose Testing's `onNodeWithText` / `SemanticsNodeInteraction` for that.
- Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [ViewInteraction](./viewinteraction.md)
- [ViewMatchers](./viewmatchers.md)
- [onData](./ondata.md)
