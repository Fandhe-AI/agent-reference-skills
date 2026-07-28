# espresso

> This is Espresso (Kotlin, Android View-system UI testing) — distinct from the same-named Playwright / Vitest API. Not applicable to Jetpack Compose UIs; see the `compose-testing` category for that.

| Name | Description | Path |
|------|-------------|------|
| Espresso.onView | Locates a single view and returns a ViewInteraction, the main test entry point. | [onview.md](./onview.md) |
| ViewInteraction | Chains ViewActions via perform() and ViewAssertions via check() on a located view. | [viewinteraction.md](./viewinteraction.md) |
| ViewMatchers | Hamcrest matchers (withId, withText, isDisplayed, etc.) for locating views. | [viewmatchers.md](./viewmatchers.md) |
| ViewActions | Actions (click, typeText, scrollTo, swipeLeft, etc.) executed via perform(). | [viewactions.md](./viewactions.md) |
| ViewAssertions | Assertions (matches, doesNotExist, selectedDescendantsMatch) executed via check(). | [viewassertions.md](./viewassertions.md) |
| Espresso.onData | Entry point for AdapterView (ListView/GridView/Spinner) items not currently in the hierarchy. | [ondata.md](./ondata.md) |
| RecyclerViewActions | espresso-contrib actions for scrolling and acting on RecyclerView items. | [recyclerviewactions.md](./recyclerviewactions.md) |
| Espresso.pressBack / openActionBarOverflowOrOptionsMenu | Static Espresso methods for Back button and action bar overflow/options menu. | [global-actions.md](./global-actions.md) |
| IdlingResource / IdlingRegistry / CountingIdlingResource | Synchronizes Espresso with asynchronous work outside the message queue. | [idling-resource.md](./idling-resource.md) |
| Espresso-Intents (intended / intending) | Validates and stubs Intents sent by the app under test. | [intents.md](./intents.md) |
| Espresso-Web (onWebView / withElement) | Tests WebView DOM content via WebDriver Atoms. | [web.md](./web.md) |
| AccessibilityChecks | Enables automatic accessibility validation during view actions. | [accessibility-checks.md](./accessibility-checks.md) |
| Custom Matchers and Actions | How to implement custom ViewMatcher / ViewAction / data matchers. | [custom-matchers-actions.md](./custom-matchers-actions.md) |
| Espresso Best Practices | Guidance for reliable, fast Espresso tests. | [best-practices.md](./best-practices.md) |
| Espresso Recipes | Common patterns: hasSibling, action bar overflow, inRoot, custom failure handler, list header/footer. | [recipes.md](./recipes.md) |
