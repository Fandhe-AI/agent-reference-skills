# espresso

| Name | Description | Path |
|------|-------------|------|
| AccessibilityChecks | Enables automatic accessibility validation on every view action performed during an Espresso test | [accessibility-checks.md](./accessibility-checks.md) |
| Espresso basics | Common automated testing tasks with the Espresso API: find a view, perform an action, check an assertion, handle adapter views, and debug failures | [basics.md](./basics.md) |
| Espresso Best Practices | Guidance for writing reliable, fast Espresso tests and avoiding common flakiness sources | [best-practices.md](./best-practices.md) |
| Espresso cheat sheet | One-page summary of Espresso matchers, actions, assertions, data options, and intent matchers (official cheat sheet v2.1.0) | [cheat-sheet.md](./cheat-sheet.md) |
| DrawerActions / PickerActions / NavigationViewActions | `espresso-contrib` `ViewAction`s for `DrawerLayout`, `DatePicker` / `TimePicker`, and `NavigationView` menu items that the core ViewActions cannot drive | [contrib-actions.md](./contrib-actions.md) |
| Custom Matchers and Actions | How to extend Espresso with app-specific `ViewMatcher`s and `ViewAction`s when the built-in ones are not sufficient | [custom-matchers-actions.md](./custom-matchers-actions.md) |
| Espresso Device API | `androidx.test.espresso:espresso-device` API for controlling screen rotation, window size class, and foldable posture of a virtual device during an instrumented test | [espresso-device.md](./espresso-device.md) |
| Espresso.pressBack / openActionBarOverflowOrOptionsMenu | Static utility methods on the `Espresso` class for actions not scoped to a located view, such as the device Back button and the action bar overflow menu | [global-actions.md](./global-actions.md) |
| IdlingResource / IdlingRegistry / CountingIdlingResource | Mechanism for synchronizing Espresso with asynchronous work (background threads, network, database) that built-in synchronization does not cover | [idling-resource.md](./idling-resource.md) |
| Espresso-Intents (intended / intending) | Extension to Espresso that validates and stubs `Intent`s sent by the app under test, enabling hermetic tests | [intents.md](./intents.md) |
| Multiprocess Espresso | `androidx.test.espresso:espresso-remote` extends Espresso's synchronization guarantees across process boundaries for components placed in non-default processes | [multiprocess.md](./multiprocess.md) |
| Espresso.onData | Entry point for interacting with items in an `AdapterView` (`ListView`, `GridView`, `Spinner`) that may be dynamically recycled or loaded | [ondata.md](./ondata.md) |
| Espresso.onView | Locates a single view in the current view hierarchy and returns a `ViewInteraction` for chaining actions and assertions | [onview.md](./onview.md) |
| Espresso (overview, synchronization, packages) | Espresso is the Android UI testing framework for writing concise and reliable tests; it waits for the UI to be at rest before acting | [overview.md](./overview.md) |
| Espresso Recipes | Common Espresso testing patterns for scenarios not covered directly by the basic matcher, action, and assertion APIs | [recipes.md](./recipes.md) |
| RecyclerViewActions | `ViewAction`s (from `espresso-contrib`) for scrolling and acting on items inside a `RecyclerView`, which `onData()` cannot drive | [recyclerviewactions.md](./recyclerviewactions.md) |
| Espresso setup instructions | Add Espresso via Gradle dependencies (Android Studio recommended), covering dependencies, instrumentation runner, and first test | [setup.md](./setup.md) |
| ViewActions | Factory functions for `ViewAction`s passed to `ViewInteraction.perform()` to simulate user interaction with a located view | [viewactions.md](./viewactions.md) |
| ViewAssertions | Factory functions for `ViewAssertion`s passed to `ViewInteraction.check()` to verify the state of a located view | [viewassertions.md](./viewassertions.md) |
| ViewInteraction | The object returned by `onView()` / `onData()`, which exposes `perform()` for `ViewAction`s and `check()` for `ViewAssertion`s | [viewinteraction.md](./viewinteraction.md) |
| ViewMatchers | Hamcrest `Matcher<View>` factory functions used to locate a view via `onView()` or to combine and negate other matchers | [viewmatchers.md](./viewmatchers.md) |
| Espresso-Web (onWebView / withElement) | Entry point for testing `WebView` UI content with Espresso, reusing WebDriver Atoms to examine and control the DOM | [web.md](./web.md) |
