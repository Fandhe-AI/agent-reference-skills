# @Binds

Annotates an abstract function inside a Hilt module to tell Hilt which implementation to use for an interface.

## Signature / Usage

```kotlin
interface AnalyticsService {
  fun analyticsMethods()
}

class AnalyticsServiceImpl @Inject constructor(
  ...
) : AnalyticsService { ... }

@Module
@InstallIn(ActivityComponent::class)
abstract class AnalyticsModule {

  @Binds
  abstract fun bindAnalyticsService(
    analyticsServiceImpl: AnalyticsServiceImpl
  ): AnalyticsService
}
```

## Notes

- The enclosing module must be `abstract`; the annotated function itself must be `abstract` with no body.
- The single function parameter is the implementation type, and the return type is the interface (or supertype) that Hilt should bind it to.
- The implementation type must itself be constructor-injectable (`@Inject constructor`).
- Add a scope annotation (e.g. `@Singleton`) on the function to make the binding scoped.
- Prefer `@Binds` over `@Provides` when simply mapping an interface to an implementation, since it generates less code.

## Related

- [Module / InstallIn](./module-install-in.md)
- [Provides](./provides.md)
- [Hilt testing](./hilt-testing.md)
