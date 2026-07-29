# Hilt in multi-module apps

Hilt code generation requires every Hilt module and constructor-injected class used by the `Application` class to be in the app module's transitive Gradle dependencies. Feature modules whose dependency direction is inverted (e.g. Dynamic Feature Modules) cannot use Hilt annotations directly and must bridge to the app-level Hilt graph through a Dagger `@Component` plus an `@EntryPoint`.

## Signature / Usage

```kotlin
// LoginModuleDependencies.kt — declared in the app module
@EntryPoint
@InstallIn(SingletonComponent::class)
interface LoginModuleDependencies {
  @AuthInterceptorOkHttpClient
  fun okHttpClient(): OkHttpClient
}
```

```kotlin
// LoginComponent.kt — declared in the feature module
@Component(dependencies = [LoginModuleDependencies::class])
interface LoginComponent {
  fun inject(activity: LoginActivity)

  @Component.Builder
  interface Builder {
    fun context(@BindsInstance context: Context): Builder
    fun appDependencies(loginModuleDependencies: LoginModuleDependencies): Builder
    fun build(): LoginComponent
  }
}
```

```kotlin
// LoginActivity.kt — declared in the feature module
class LoginActivity : AppCompatActivity() {
  @Inject
  lateinit var loginAnalyticsAdapter: LoginAnalyticsAdapter

  override fun onCreate(savedInstanceState: Bundle?) {
    DaggerLoginComponent.builder()
        .context(this)
        .appDependencies(
          EntryPointAccessors.fromApplication(
            applicationContext,
            LoginModuleDependencies::class.java
          )
        )
        .build()
        .inject(this)

    super.onCreate(savedInstanceState)
  }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableExperimentalClasspathAggregation` | `Boolean` (Gradle property) | `false` | Lets Hilt process `@InstallIn` modules and `@Inject` classes that are not in the app module's direct transitive dependency chain, avoiding the standard module-placement constraint in deep multi-module graphs. |

## Notes

- Regular (non-dynamic-feature) Gradle modules use Hilt as usual; the dependency direction toward the app module is what matters, not module boundaries by themselves.
- Feature modules with an inverted dependency direction (they aren't in the app module's transitive dependencies) cannot use `@HiltViewModel`, `@HiltAndroidApp`, or `@InstallIn`-annotated Hilt modules; only plain Dagger (`@Component`, `@Inject`, `@BindsInstance`) works there.
- The bridge pattern: declare an `@EntryPoint` interface in the app module bound to `SingletonComponent` (or another Hilt component), then have the feature module's Dagger `@Component` depend on it and retrieve it at runtime via `EntryPointAccessors.fromApplication()`.
- Avoid duplicate component definitions by keeping a single `@EntryPoint` interface per feature module and treating the app module as the sole source of truth for the bindings it exposes.
- For test-only or release-only source sets within a module, prefer `@TestInstallIn` (see Hilt testing) over hand-rolled multi-module bridging; the `@EntryPoint` pattern above is specifically for modules Hilt cannot reach, not for swapping bindings between build variants.

## Related

- [EntryPoint / EntryPointAccessors](./entry-point.md)
- [Module / InstallIn](./module-install-in.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
- [Hilt testing](./hilt-testing.md)
