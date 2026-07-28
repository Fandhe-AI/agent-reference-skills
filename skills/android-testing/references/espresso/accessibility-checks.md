# AccessibilityChecks

Enables automatic accessibility validation on every view action performed during an Espresso test, testing the app from the perspective of users relying on accessibility services.

## Signature / Usage

```kotlin
object AccessibilityChecks {
    fun enable(): AccessibilityValidator
}
```

```kotlin
@RunWith(AndroidJUnit4::class)
@LargeTest
class MyWelcomeWorkflowIntegrationTest {
    init {
        AccessibilityChecks.enable()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AccessibilityChecks.enable()` | `() -> AccessibilityValidator` | — | Enables accessibility checks; every subsequent `ViewAction` triggers a check on the acted-upon view and its descendants. |
| `setRunChecksFromRootView(enabled: Boolean)` | method | `false` | When `true`, evaluates the entire view hierarchy of the screen on each check, not just the acted-upon view. |
| `setSuppressingResultMatcher(matcher: Matcher<AccessibilityViewCheckResult>)` | method | none | Suppresses specific known findings, e.g. combine `matchesCheck(CheckClass::class.java)` with `matchesViews(withId(...))` via `allOf`. |

## Notes

- By default, checks run automatically whenever any `ViewAction` (from `ViewActions`) is performed.
- Use narrowly-scoped suppression matchers (specific check type AND specific view) rather than broadly disabling checks.
- Backed by the external Accessibility Test Framework (ATF) for Android.
- Artifact: `androidx.test.espresso:espresso-accessibility`.

## Related

- [ViewActions](./viewactions.md)
