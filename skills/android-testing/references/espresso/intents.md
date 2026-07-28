# Espresso-Intents (intended / intending)

Extension to Espresso that validates and stubs `Intent`s sent by the app under test, enabling hermetic tests that don't depend on external apps actually being present/functional.

## Signature / Usage

```kotlin
fun intended(matcher: Matcher<Intent>)
fun intending(matcher: Matcher<Intent>): OngoingStubbing
```

```kotlin
@get:Rule
val intentsTestRule = IntentsTestRule(MyActivity::class.java)

@Test
fun validateIntentSentToPackage() {
    onView(withId(R.id.callButton)).perform(click())
    intended(toPackage("com.android.phone"))
}

@Test
fun activityResult_DisplaysContactsPhoneNumber() {
    val resultData = Intent().putExtra("phone", "123-345-6789")
    val result = Instrumentation.ActivityResult(Activity.RESULT_OK, resultData)
    intending(toPackage("com.android.contacts")).respondWith(result)

    onView(withId(R.id.pickButton)).perform(click())
    onView(withId(R.id.phoneNumber)).check(matches(withText("123-345-6789")))
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `intended(matcher)` | `(Matcher<Intent>) -> Unit` | Verifies that a matching intent was sent, similar to `Mockito.verify()`. |
| `intending(matcher)` | `(Matcher<Intent>) -> OngoingStubbing` | Stubs the result for intents started via `startActivityForResult()`, similar to `Mockito.when()`. `.respondWith(result)` provides the stub `ActivityResult`. |
| `hasComponent(...)` | `Matcher<Intent>` | Matches an intent's target component. |
| `hasExtra(key, value)` | `Matcher<Intent>` | Matches an intent extra by key/value. |
| `toPackage(packageName)` | `Matcher<Intent>` | Matches an intent's target package. |

## Notes

- Initialize with `IntentsTestRule` (deprecated in favor of `Intents.init()`/`Intents.release()` combined with `ActivityScenarioRule`), which automatically records/releases intents around each test.
- Intent matchers are Hamcrest `Matcher<Intent>`s and can be combined with `allOf`/`anyOf` like `ViewMatchers`.
- `Intent` construction itself belongs to `android-platform-core`; this page covers only the Espresso-Intents validation/stubbing API.
- Artifact: `androidx.test.espresso:espresso-intents`.

## Related

- [Espresso.onView](./onview.md)
