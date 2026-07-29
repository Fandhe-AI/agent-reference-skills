# espresso

| Name | Description | Path |
|------|-------------|------|
| AccessibilityChecks | Enables automatic accessibility validation on every view action performed during an Espresso test. | [accessibility-checks.md](./accessibility-checks.md) |
| Espresso Best Practices | Guidance for writing reliable, fast Espresso tests and avoiding common flakiness sources. | [best-practices.md](./best-practices.md) |
| DrawerActions / PickerActions / NavigationViewActions | `espresso-contrib` `ViewAction`s for opening/closing `DrawerLayout`, setting `DatePicker`/`TimePicker`, navigating `NavigationView`. | [contrib-actions.md](./contrib-actions.md) |
| Custom Matchers and Actions | How to extend Espresso with app-specific `ViewMatcher`s and `ViewAction`s when built-ins are insufficient. | [custom-matchers-actions.md](./custom-matchers-actions.md) |
| Espresso Device API | `androidx.test.espresso:espresso-device` API for controlling screen configuration of virtual devices during tests. | [espresso-device.md](./espresso-device.md) |
| Espresso.pressBack / openActionBarOverflowOrOptionsMenu | Static utility methods on the `Espresso` class for device Back button and action bar overflow menu. | [global-actions.md](./global-actions.md) |
| IdlingResource / IdlingRegistry / CountingIdlingResource | Mechanism for synchronizing Espresso with asynchronous work that framework's built-in synchronization doesn't cover. | [idling-resource.md](./idling-resource.md) |
| Espresso-Intents (intended / intending) | Extension to Espresso that validates and stubs `Intent`s sent by the app under test. | [intents.md](./intents.md) |
| Multiprocess Espresso | `androidx.test.espresso:espresso-remote` extends Espresso's synchronization across process boundaries. | [multiprocess.md](./multiprocess.md) |
| Espresso.onData | Entry point for interacting with items in an `AdapterView` (ListView, GridView, Spinner). | [ondata.md](./ondata.md) |
| Espresso.onView | Locates a single view in the current view hierarchy and returns a `ViewInteraction` for chaining actions/assertions. | [onview.md](./onview.md) |
| Espresso Recipes | Common Espresso testing patterns for scenarios not covered by basic matcher/action/assertion APIs. | [recipes.md](./recipes.md) |
| RecyclerViewActions | `ViewAction`s for scrolling and acting on items inside a `RecyclerView`. | [recyclerviewactions.md](./recyclerviewactions.md) |
| ViewActions | Factory functions for `ViewAction`s passed to `perform()` to simulate user interaction. | [viewactions.md](./viewactions.md) |
| ViewAssertions | Factory functions for `ViewAssertion`s passed to `check()` to verify the state of a located view. | [viewassertions.md](./viewassertions.md) |
| ViewInteraction | The object returned by `onView()` / `onData()` exposing `perform()` and `check()` for chaining. | [viewinteraction.md](./viewinteraction.md) |
| ViewMatchers | Hamcrest `Matcher<View>` factory functions used to locate a view or combine/negate other matchers. | [viewmatchers.md](./viewmatchers.md) |
| Espresso-Web (onWebView / withElement) | Entry point for testing `WebView` UI content with Espresso using WebDriver "Atoms". | [web.md](./web.md) |
