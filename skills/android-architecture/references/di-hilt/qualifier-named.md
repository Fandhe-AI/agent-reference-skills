# @Qualifier / @Named

Distinguishes multiple bindings of the same type by attaching a custom (or the built-in `@Named`) qualifier annotation to both the binding and the injection site.

## Signature / Usage

```kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class AuthInterceptorOkHttpClient

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

  @AuthInterceptorOkHttpClient
  @Provides
  fun provideAuthInterceptorOkHttpClient(
    authInterceptor: AuthInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(authInterceptor)
               .build()
  }
}

@AndroidEntryPoint
class ExampleActivity: ComponentActivity() {
  @AuthInterceptorOkHttpClient
  @Inject lateinit var okHttpClient: OkHttpClient
}
```

## Notes

- `@Qualifier` is a meta-annotation used to create a new custom qualifier annotation (must have `@Retention(AnnotationRetention.BINARY)`).
- The qualifier must be applied consistently at both the binding site (`@Provides`/`@Binds`) and every injection site for that binding.
- Without a qualifier, Hilt cannot resolve two bindings of the same type and the build fails.
- Predefined qualifiers `@ApplicationContext` and `@ActivityContext` are provided by Hilt for injecting the corresponding `Context`.

## Related

- [Provides](./provides.md)
- [Binds](./binds.md)
- [Inject](./inject.md)
