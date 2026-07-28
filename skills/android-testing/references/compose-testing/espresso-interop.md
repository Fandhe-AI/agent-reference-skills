# Espresso / UiAutomator interoperability

Hybrid apps mixing Compose and Views need no special setup: match Views with Espresso's `onView()` and Compose elements with `ComposeTestRule` in the same test. `onRootWithViewInteraction` scopes a Compose search to a specific Android `View` when identical Compose content is duplicated across multiple Views (e.g. `RecyclerView` rows).

## Signature / Usage

```kotlin
@ExperimentalTestApi
fun onRootWithViewInteraction(viewInteraction: ViewInteraction): SemanticsNodeInteraction
```

```kotlin
@Test
fun androidViewInteropTest() {
    Espresso.onView(withText("Hello Views")).check(matches(isDisplayed()))

    composeTestRule.onNodeWithText("Click here").performClick()

    Espresso.onView(withText("Hello Compose")).check(matches(isDisplayed()))
}

// Scope a Compose search to one RecyclerView row
val rowView = Espresso.onView(
    allOf(withId(rootViewId), hasDescendant(withText("Item #3")))
)
onRootWithViewInteraction(rowView)
    .onNode(hasText("Like"))
    .performClick()
```

```kotlin
// UiAutomator: expose Modifier.testTag as a resource id
Scaffold(modifier = Modifier.semantics { testTagsAsResourceId = true }) {
    LazyColumn(modifier = Modifier.testTag("myLazyColumn")) { /* ... */ }
}

val device = UiDevice.getInstance(getInstrumentation())
val lazyColumn: UiObject2 = device.findObject(By.res("myLazyColumn"))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `viewInteraction` | `ViewInteraction` | — | Espresso `ViewInteraction` uniquely identifying the Android `View` to scope the Compose search to. |
| `testTagsAsResourceId` | `Boolean` (semantics property) | `false` | When `true` on an ancestor, exposes descendant `Modifier.testTag` values as UiAutomator resource ids. |

## Notes

- `AndroidView` embeds Views inside Compose; `ComposeView` / `createAndroidComposeRule<YourActivity>()` embeds Compose inside an Activity's View hierarchy — both directions require no extra test wiring beyond mixing `onView()` and `ComposeTestRule` finders in the same test.
- `onRootWithViewInteraction` is available from `androidx.compose.ui:ui-test-junit4:1.12.0-alpha01+` / `androidx.compose.ui:ui-test:1.12.0-alpha01+` and is `@ExperimentalTestApi`.
- Use `By.res(resourceName)` (not `By.res(resourcePackage, resourceId)`) with the same string passed to `Modifier.testTag`.
- Espresso's `onView` matcher/action/assertion API itself is documented in the `espresso` category of this skill.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [test-tag-usage](./test-tag-usage.md)
- [../espresso/onview.md](../espresso/onview.md)
