# Accessibility testing (Compose)

Automated accessibility checks for Compose UI, built on the Accessibility Test Framework (the same engine behind Accessibility Scanner and Espresso's accessibility checks). Enabling checks on a `ComposeTestRule` makes subsequent actions/assertions also validate accessibility properties.

## Signature / Usage

```kotlin
fun AndroidComposeTestRule<*, *>.enableAccessibilityChecks(validator: AccessibilityValidator = AccessibilityValidator())
fun SemanticsNodeInteraction.tryPerformAccessibilityChecks(): SemanticsNodeInteraction
```

```kotlin
@get:Rule
val composeTestRule = createAndroidComposeRule<ComponentActivity>()

@Test
fun noAccessibilityLabel() {
    composeTestRule.setContent {
        Box(
            modifier = Modifier
                .size(50.dp, 50.dp)
                .clickable { }
                .semantics { contentDescription = "" },
        )
    }

    composeTestRule.enableAccessibilityChecks()

    // Any subsequent action (e.g. performClick) also runs accessibility checks:
    composeTestRule.onRoot().tryPerformAccessibilityChecks()
}
```

```kotlin
// Custom validator, e.g. to only fail on errors (not warnings)
val accessibilityValidator = AccessibilityValidator()
    .setThrowExceptionFor(AccessibilityCheckResult.AccessibilityCheckResultType.WARNING)

composeTestRule.enableAccessibilityChecks(accessibilityValidator)
composeTestRule.onRoot().tryPerformAccessibilityChecks()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `validator` | `AccessibilityValidator` | `AccessibilityValidator()` | Configures which check results (errors/warnings) throw, for mixed View/Compose setups. |

## Notes

- Requires Compose 1.8.0+ and the `androidx.compose.ui:ui-test-junit4-accessibility` dependency.
- Checks cover missing accessibility labels, low color contrast, small touch targets, and traversal order problems.
- Complements manual testing with TalkBack / Switch Access; automated checks catch a subset of issues only.
- This is Jetpack Compose UI testing (Kotlin, `androidx.compose.ui.test`) — distinct from the same-named Playwright / Vitest / Storybook API.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [assertions](./assertions.md)
