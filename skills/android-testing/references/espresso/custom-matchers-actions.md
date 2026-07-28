# Custom Matchers and Actions

How to extend Espresso with app-specific `ViewMatcher`s and `ViewAction`s when the built-in ones are not sufficient, keeping the core API small while remaining extensible.

## Signature / Usage

```kotlin
// Custom matcher: match an EditText's hint
fun withHint(hint: String): Matcher<View> {
    return object : TypeSafeMatcher<View>() {
        override fun matchesSafely(view: View) =
            view is EditText && view.hint == hint

        override fun describeTo(description: Description) {
            description.appendText("with hint: $hint")
        }
    }
}

onView(withHint("Enter email")).perform(typeText("user@example.com"))
```

```kotlin
// Custom action
fun myCustomAction(): ViewAction {
    return object : ViewAction {
        override fun getConstraints(): Matcher<View> = isDisplayed()
        override fun getDescription(): String = "my custom action"
        override fun perform(uiController: UiController, view: View) {
            // Perform custom interaction
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TypeSafeMatcher<View>` | class to implement | Base class for a simple custom `ViewMatcher`; implement `matchesSafely()` and `describeTo()`. |
| `BoundedMatcher<T, S>` | class to implement | Base class for a custom matcher restricted to a specific type `S`, commonly used for `onData()` data matchers. |
| `ViewAction` | interface to implement | Requires `getConstraints()` (a `Matcher<View>` gating when the action applies), `getDescription()`, and `perform(uiController, view)`. |

## Notes

- `getConstraints()` should return the minimal precondition (e.g. `isDisplayed()`) required before the action can safely run.
- Custom data matchers for `onData()` typically extend `BoundedMatcher<Object, Map>` or a custom model type — see [Espresso.onData](./ondata.md).
- Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [ViewMatchers](./viewmatchers.md)
- [ViewActions](./viewactions.md)
- [Espresso.onData](./ondata.md)
