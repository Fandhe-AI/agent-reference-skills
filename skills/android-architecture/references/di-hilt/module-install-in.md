# @Module / @InstallIn

Declares a Hilt module and binds it to a generated component so its dependencies become available to that component and its children.

## Signature / Usage

```kotlin
@Module
@InstallIn(ActivityComponent::class)
abstract class AnalyticsModule { ... }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `InstallIn.value` | `KClass<*>` (Hilt component) | — | The Hilt component(s) the module's bindings are installed into, e.g. `SingletonComponent::class`, `ActivityComponent::class`. |

## Notes

- `@Module` classes provide bindings through `@Provides` (concrete instances) or `@Binds` (interface-to-implementation mappings) functions.
- Every Hilt module must be annotated with `@InstallIn`; omitting it is a compile error.
- Bindings installed in a component are visible to that component and every component below it in the hierarchy.
- For test-only replacements, use `@TestInstallIn` instead of `@InstallIn`.

## Related

- [Provides](./provides.md)
- [Binds](./binds.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
- [Hilt testing](./hilt-testing.md)
