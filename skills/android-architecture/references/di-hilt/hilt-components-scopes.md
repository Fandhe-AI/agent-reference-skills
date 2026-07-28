# Hilt components and scopes

Hilt generates a component for each Android class that supports injection; each component has a defined lifetime and, optionally, a scope annotation for binding reuse within that lifetime.

## Signature / Usage

```kotlin
@Singleton
class AnalyticsRepository @Inject constructor() { ... }

@Module
@InstallIn(SingletonComponent::class)
abstract class AnalyticsModule {

  @Singleton
  @Binds
  abstract fun bindAnalyticsService(
    analyticsServiceImpl: AnalyticsServiceImpl
  ): AnalyticsService
}
```

## Components and scopes

| Component | Injector for | Created at | Destroyed at | Scope |
|-----------|---------------|------------|---------------|-------|
| `SingletonComponent` | `Application` | `Application#onCreate()` | `Application` destroyed | `@Singleton` |
| `ActivityRetainedComponent` | (retained across config changes) | `Activity#onCreate()` | `Activity#onDestroy()` (survives config changes) | `@ActivityRetainedScoped` |
| `ViewModelComponent` | `ViewModel` | `ViewModel` created | `ViewModel` destroyed | `@ViewModelScoped` |
| `ActivityComponent` | `Activity` | `Activity#onCreate()` | `Activity#onDestroy()` | `@ActivityScoped` |
| `FragmentComponent` | `Fragment` | `Fragment#onAttach()` | `Fragment#onDestroy()` | `@FragmentScoped` |
| `ViewComponent` | `View` | `View#super()` | `View` destroyed | `@ViewScoped` |
| `ServiceComponent` | `Service` | `Service#onCreate()` | `Service#onDestroy()` | `@ServiceScoped` |

## Component hierarchy

```
SingletonComponent
└── ActivityRetainedComponent
    ├── ViewModelComponent
    └── ActivityComponent
        └── FragmentComponent
            └── ViewComponent
```

(`ServiceComponent` is a direct child of `SingletonComponent`, not shown in the tree above.)

## Notes

- A component's default bindings: `SingletonComponent` and `ActivityRetainedComponent` provide `Application`; `ViewModelComponent` provides `SavedStateHandle`; `ActivityComponent` provides `Application` and `Activity`; `ServiceComponent` provides `Application` and `Service`.
- Bindings installed in a component are visible to that component and all components below it in the hierarchy.
- An unscoped binding provides a new instance every time it is requested; a scoped binding provides a single instance reused within that component's lifetime.

## Related

- [Module / InstallIn](./module-install-in.md)
- [HiltViewModel / hiltViewModel()](./hilt-view-model.md)
- [EntryPoint / EntryPointAccessors](./entry-point.md)
