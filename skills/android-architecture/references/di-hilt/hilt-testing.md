# Hilt testing (@HiltAndroidTest / HiltAndroidRule / @UninstallModules)

Annotations and rules for using Hilt-injected dependencies in instrumented and Robolectric tests, and for swapping production bindings with fakes.

## Signature / Usage

```kotlin
@HiltAndroidTest
class SettingsScreenTest {
    @get:Rule(order = 0)
    val hiltRule = HiltAndroidRule(this)

    @get:Rule(order = 1)
    val composeRule = createAndroidComposeRule<HiltTestActivity>()

    @Inject
    lateinit var analyticsAdapter: AnalyticsAdapter

    @Before
    fun init() {
        hiltRule.inject()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `HiltAndroidRule(testInstance)` | constructor param | — | The enclosing `@HiltAndroidTest` instance; manages Hilt component state and performs field injection. |
| `@TestInstallIn.components` | `Array<KClass<*>>` | — | Components the replacement test module is installed into. |
| `@TestInstallIn.replaces` | `Array<KClass<*>>` | — | Production module(s) this test module replaces, across all tests. |
| `@UninstallModules` | `Array<KClass<*>>` | — | Production modules to remove for a single test class, so they can be redefined locally. |

## Notes

- Every test using Hilt must be annotated with `@HiltAndroidTest`, which generates the individual Hilt components for that test.
- `HiltAndroidRule` must run before any other rule that depends on injection (use `order = 0`, or `RuleChain.outerRule`).
- Prefer `@TestInstallIn` over `@UninstallModules` for replacing bindings across many tests; it has a lower build-time cost. `@UninstallModules` cannot remove a `@TestInstallIn` module.
- `@BindValue` binds an annotated test field directly into the dependency graph (supports qualifiers and Mockito `@Mock`); `@BindValueIntoSet` / `@BindValueIntoMap` add to multibindings.
- Instrumented tests require the default `HiltTestApplication` (set via a custom `AndroidJUnitRunner`) or a `@CustomTestApplication`-generated one if the app has a custom base `Application`.
- Robolectric tests configure the test application via `robolectric.properties` or `@Config(application = HiltTestApplication::class)`.
- Plain unit tests for constructor-injected classes do not need Hilt at all — pass fakes directly to the constructor.

## Related

- [Module / InstallIn](./module-install-in.md)
- [Inject](./inject.md)
