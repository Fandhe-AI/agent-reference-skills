# Espresso Best Practices

Guidance for writing reliable, fast Espresso tests and avoiding common flakiness sources.

## Signature / Usage

```kotlin
// Prefer the least specific matcher that uniquely identifies the view
onView(withId(R.id.button)).check(matches(isDisplayed())) // OK

// Don't mix assertions into the matcher passed to onView()
onView(allOf(withId(R.id.button), isDisplayed())) // avoid
```

## Notes

- This is Espresso (Kotlin, Android View-system UI testing) — distinct from the same-named Playwright API.
- Prefer `withId()` alone when it uniquely identifies a view; add matchers only as needed to disambiguate.
- Keep assertions in `check()`, not folded into the `onView()` matcher — `onView()` is for locating, `check()` is for asserting.
- Ensure interactive views expose text or a content description for accessibility and for `withText()`/`withContentDescription()` matching.
- Disable system animations (window/transition/animator scale) on the test device/emulator to reduce Espresso synchronization flakiness.
- Use `onData()` (or scroll actions) even for items that are initially visible in an `AdapterView`, for consistency and safety.
- Use `IdlingResource` for background work instead of `Thread.sleep()`, retry loops, or `CountDownLatch`.
- Use Android Studio's Hierarchy Viewer / the `NoMatchingViewException` message to inspect the actual view hierarchy when a matcher fails.

## Related

- [ViewMatchers](./viewmatchers.md)
- [IdlingResource / IdlingRegistry / CountingIdlingResource](./idling-resource.md)
- [Recipes](./recipes.md)
