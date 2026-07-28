# ActivityScenarioRule

JUnit 4 rule that provides functional testing of a single activity by wrapping `ActivityScenario`. Launches the activity before each `@Test`/`@Before` method and terminates it after the test and any `@After` methods finish.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
@LargeTest
class MyClassTest {
    @get:Rule
    val activityRule = ActivityScenarioRule(MyClass::class.java)

    @Test
    fun myClassMethod_ReturnsTrue() {
        activityRule.scenario.onActivity { /* access the activity */ }
    }
}
```

```java
public class MyClassTest {
    @Rule
    public ActivityScenarioRule<MyClass> activityRule =
            new ActivityScenarioRule<>(MyClass.class);

    @Test
    public void myClassMethod_ReturnsTrue() { ... }
}
```

## Notes

- Access the activity via `activityRule.scenario.onActivity { }`.
- For fragments in isolation, use `FragmentScenario` from the fragment-testing library instead.
- Gradle dependency: `androidx.test:rules`.

## Related

- [ActivityScenario](./activityscenario.md)
- [FragmentScenario](./fragmentscenario.md)
- [ServiceTestRule](./servicetestrule.md)
