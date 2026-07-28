# @Provides

Annotates a function inside a Hilt module to tell Hilt how to provide a type that cannot use constructor injection (e.g. an interface, or a class from an external library).

## Signature / Usage

```kotlin
@Module
@InstallIn(ActivityComponent::class)
object AnalyticsModule {

  @Provides
  fun provideAnalyticsService(): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .build()
               .create(AnalyticsService::class.java)
  }
}
```

## Notes

- The function body executes every time Hilt needs to provide an instance of that type.
- The return type of the function determines the binding type; the function name has no effect on injection.
- Function parameters are themselves treated as dependencies and must be resolvable by Hilt.
- Add a scope annotation (e.g. `@Singleton`) on the function to make the provided instance scoped to the installed component.

## Related

- [Module / InstallIn](./module-install-in.md)
- [Binds](./binds.md)
- [Qualifier / @Named](./qualifier-named.md)
