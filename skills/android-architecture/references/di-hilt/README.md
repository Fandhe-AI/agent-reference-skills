# di-hilt

| Name | Description | Path |
|------|-------------|------|
| @HiltAndroidApp | Triggers Hilt's code generation on the `Application` class, creating the app-level dependency container. | [hilt-android-app.md](./hilt-android-app.md) |
| @AndroidEntryPoint | Enables field injection and generates a Hilt component for the annotated Android framework class. | [android-entry-point.md](./android-entry-point.md) |
| @Inject | Requests a dependency via constructor injection or field injection. | [inject.md](./inject.md) |
| @Module / @InstallIn | Declares a Hilt module and binds it to a component in the hierarchy. | [module-install-in.md](./module-install-in.md) |
| @Provides | Provides an instance of a type that can't use constructor injection, from a module function. | [provides.md](./provides.md) |
| @Binds | Maps an interface to its implementation via an abstract module function. | [binds.md](./binds.md) |
| Hilt components and scopes | Reference table of generated components, their lifetimes, and matching scope annotations. | [hilt-components-scopes.md](./hilt-components-scopes.md) |
| @Qualifier / @Named | Distinguishes multiple bindings of the same type. | [qualifier-named.md](./qualifier-named.md) |
| @HiltViewModel / hiltViewModel() | Injects and retrieves a Hilt-managed `ViewModel`, including Compose and assisted injection. | [hilt-view-model.md](./hilt-view-model.md) |
| @EntryPoint / EntryPointAccessors | Accesses Hilt dependencies from code Hilt can't inject directly. | [entry-point.md](./entry-point.md) |
| Hilt testing | `@HiltAndroidTest`, `HiltAndroidRule`, `@TestInstallIn`, `@UninstallModules`, `@BindValue`. | [hilt-testing.md](./hilt-testing.md) |
| Manual dependency injection | Hand-written DI via container classes, for comparison with Hilt. | [manual-di.md](./manual-di.md) |
