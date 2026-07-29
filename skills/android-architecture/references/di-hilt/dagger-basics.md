# Dagger basics (@Component, @Subcomponent, custom scopes)

Dagger is the annotation-processing DI framework Hilt is built on top of. `@Inject`, `@Module`, `@Provides`, and `@Binds` are Dagger annotations that Hilt reuses as-is; what Hilt automates away is hand-writing `@Component` interfaces, wiring their hierarchy with `@Subcomponent`, and defining custom `@Scope` annotations for each Android lifecycle.

## Signature / Usage

```kotlin
@Scope
@Retention(AnnotationRetention.RUNTIME)
annotation class ApplicationScope

@ApplicationScope
@Component(modules = [NetworkModule::class])
interface ApplicationGraph {
  fun repository(): UserRepository

  @Component.Builder
  interface Builder {
    fun build(): ApplicationGraph
  }
}

@ApplicationScope
class UserRepository @Inject constructor(
  private val localDataSource: UserLocalDataSource,
  private val remoteDataSource: UserRemoteDataSource
) { ... }
```

```kotlin
// Manually building and reading the graph, e.g. in Application.onCreate()
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.builder().build()
val userRepository: UserRepository = applicationGraph.repository()
```

```kotlin
// Subcomponent for a shorter-lived flow (e.g. a login screen)
@LoginScope
@Subcomponent(modules = [LoginModule::class])
interface LoginComponent {
  fun inject(activity: LoginActivity)

  @Subcomponent.Builder
  interface Builder {
    fun build(): LoginComponent
  }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@Component.modules` | `Array<KClass<*>>` | `[]` | `@Module` classes whose bindings are included in this component's graph. |
| `@Component.dependencies` | `Array<KClass<*>>` | `[]` | Other components this one depends on, for component-dependency style graphs (as opposed to subcomponents). |
| `@Scope` (meta-annotation) | annotation | — | Declares a new custom scope annotation; applying it to both a `@Component`/`@Subcomponent` and a class ties that class's instance lifetime to the component's lifetime. |
| `@Subcomponent.modules` | `Array<KClass<*>>` | `[]` | Modules for a child graph that inherits all bindings from its parent component. |

## Notes

- Dagger validates the dependency graph and generates factory code (`DaggerApplicationGraph`, etc.) at compile time; an unsatisfied dependency or a circular reference is a compile error, not a runtime crash.
- A component (or subcomponent) can carry at most one scope annotation; a class scoped to a component gets exactly one shared instance per instance of that component, while unscoped bindings create a new instance on every request.
- Subcomponents inherit every binding visible to their parent and add their own; this is the mechanism Hilt's generated component hierarchy (`SingletonComponent` → `ActivityRetainedComponent` → ... ) is built from, but in plain Dagger every component/subcomponent, its scope annotation, and its builder must be written by hand.
- Hilt exists specifically to remove this boilerplate for the standard Android component lifecycle; reach for plain Dagger `@Component`/`@Subcomponent` only where Hilt cannot apply directly (see Hilt in multi-module apps), or to understand what Hilt's generated components correspond to.
- `@Module`, `@Provides`, and `@Binds` behave identically whether used under plain Dagger `@Component` or under a Hilt `@InstallIn` module; only the annotation that hosts the graph (`@Component` vs. Hilt's generated components) differs.

## Related

- [Hilt in multi-module apps](./hilt-multi-module.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
- [Manual dependency injection](./manual-di.md)
- [Module / InstallIn](./module-install-in.md)
