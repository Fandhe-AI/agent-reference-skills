# ViewActions

Factory functions for `ViewAction`s passed to `ViewInteraction.perform()` to simulate user interaction with a located view.

## Signature / Usage

```kotlin
onView(withId(R.id.editText))
    .perform(scrollTo(), typeText("test@example.com"), closeSoftKeyboard())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `click()` | `ViewAction` | Single click on the view. |
| `doubleClick()` | `ViewAction` | Double click on the view. |
| `longClick()` | `ViewAction` | Long press on the view. |
| `typeText(text: String)` | `ViewAction` | Types text into an `EditText`, appending to existing content. |
| `replaceText(text: String)` | `ViewAction` | Clears and sets the text of an `EditText` directly (faster, no keyboard simulation). |
| `clearText()` | `ViewAction` | Clears the text of an `EditText`. |
| `scrollTo()` | `ViewAction` | Scrolls the view into the visible display area (only for views inside a `ScrollView`). |
| `swipeLeft()` / `swipeRight()` | `ViewAction` | Performs a swipe gesture across the view. |
| `pressBack()` | `ViewAction` | Simulates pressing the device Back button as a `ViewAction`. |
| `closeSoftKeyboard()` | `ViewAction` | Closes the soft keyboard if open. |

## Notes

- `perform()` accepts multiple actions executed in order: `.perform(typeText("Hello"), click())`.
- `scrollTo()` cannot be used on `RecyclerView`/`AdapterView` items since rows are recycled — use [RecyclerViewActions](./recyclerviewactions.md) or `onData` instead.
- `pressBack()` here is a `ViewAction` bound to a specific view via `perform()`; the standalone `Espresso.pressBack()` static method is a different, view-independent entry point — see [Global Actions](./global-actions.md).
- Custom actions can be created by implementing `ViewAction` — see [Custom Matchers and Actions](./custom-matchers-actions.md).
- Package: `androidx.test.espresso.action.ViewActions`. Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [ViewInteraction](./viewinteraction.md)
- [ViewAssertions](./viewassertions.md)
- [Global Actions](./global-actions.md)
