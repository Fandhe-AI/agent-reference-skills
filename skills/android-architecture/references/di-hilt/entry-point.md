# @EntryPoint / EntryPointAccessors

Provides a boundary for accessing Hilt dependencies from code that Hilt does not directly support (e.g. `ContentProvider`, or third-party libraries that instantiate classes themselves).

## Signature / Usage

```kotlin
class ExampleContentProvider : ContentProvider() {

  @EntryPoint
  @InstallIn(SingletonComponent::class)
  interface ExampleContentProviderEntryPoint {
    fun analyticsService(): AnalyticsService
  }

  override fun query(...): Cursor {
    val appContext = context?.applicationContext ?: throw IllegalStateException()
    val hiltEntryPoint =
      EntryPointAccessors.fromApplication(appContext, ExampleContentProviderEntryPoint::class.java)

    val analyticsService = hiltEntryPoint.analyticsService()
    ...
  }
}
```

## Notes

- The annotated interface must also be annotated with `@InstallIn` to specify which component it is bound to.
- Use `EntryPointAccessors` static methods (e.g. `fromApplication`, `fromActivity`) matching the component the entry point is installed in, instead of calling `EntryPoints` directly.
- Intended only for classes Hilt cannot inject directly; prefer `@AndroidEntryPoint` or constructor injection wherever possible.

## Related

- [Hilt components and scopes](./hilt-components-scopes.md)
- [Module / InstallIn](./module-install-in.md)
