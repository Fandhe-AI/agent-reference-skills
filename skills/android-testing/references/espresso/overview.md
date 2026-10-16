# Espresso (overview, synchronization, packages)

Espresso is the Android UI testing framework for writing concise and reliable tests. Its core API is small and predictable, and it waits for the UI to be at rest before acting, so tests avoid waits, syncs, sleeps, and polls.

## Signature / Usage

```kotlin
@Test
fun greeterSaysHello() {
    onView(withId(R.id.name_field)).perform(typeText("Steve"))
    onView(withId(R.id.greet_button)).perform(click())
    onView(withText("Hello Steve!")).check(matches(isDisplayed()))
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `espresso-core` | Core and basic `View` matchers, actions, and assertions. |
| `espresso-web` | Resources for `WebView` support. |
| `espresso-idling-resource` | Espresso's mechanism for synchronization with background jobs. Provides `CountingIdlingResource` (`androidx.test.espresso.idling.CountingIdlingResource`). |
| `espresso-contrib` | External contributions: `DatePicker`, `RecyclerView` and `Drawer` actions, and accessibility checks. |
| `espresso-intents` | Extension to validate and stub intents for hermetic testing. |
| `espresso-remote` | Espresso's multi-process functionality. |

## Notes

- Target audience: developers who treat automated testing as part of the development lifecycle. It can be used for black-box testing, but its full power comes from familiarity with the codebase under test.
- Synchronization: each time a test invokes `onView()`, Espresso waits to perform the UI action or assertion until all of these hold:
  - The message queue has no messages that Espresso needs to immediately process.
  - No `AsyncTask` instance is currently executing a task.
  - All developer-defined idling resources are idle.
- These checks substantially increase the likelihood that only one UI action or assertion occurs at a time.
- The official page lists `CountingIdlingResource` under `espresso-contrib`; in AndroidX it ships in `androidx.test.espresso:espresso-idling-resource` (see idling-resource.md).
- Source: https://developer.android.com/training/testing/espresso

## Related

- [Espresso basics](./basics.md)
- [Espresso setup instructions](./setup.md)
- [Espresso cheat sheet](./cheat-sheet.md)
- [IdlingResource](./idling-resource.md)
- [Espresso web](./web.md)
- [Espresso intents](./intents.md)
- [Multi-process](./multiprocess.md)
- [Recipes](./recipes.md)
