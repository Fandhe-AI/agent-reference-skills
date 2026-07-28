# Manual dependency injection

Passing dependencies through constructors by hand, typically centralized in a dependency "container" class, without relying on a DI library such as Hilt or Dagger.

## Signature / Usage

```kotlin
// Container of objects shared across the whole app
class AppContainer {
    val apiService = ApiService()
    val userRepository = UserRepository(apiService)
}

class MyApplication : Application() {
    val appContainer = AppContainer()
}

class LoginActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val appContainer = (application as MyApplication).appContainer
        setContent {
            LoginScreen(appContainer.userRepository)
        }
    }
}
```

## Notes

- Dependencies are declared as constructor parameters; an `AppContainer` instantiates and holds shared objects, and screens/activities pull what they need from it.
- Flow-scoped containers (e.g. `LoginContainer`) can be created and released on demand for dependencies that should live only as long as a particular flow.
- Manual DI requires hand-written boilerplate (factories, ordering, lifecycle-aware teardown) that Hilt automates through code generation, scoping, and generated factories.
- The official guidance is to use Hilt when possible; manual DI is documented mainly to explain the underlying principles that Dagger/Hilt automate.

## Related

- [HiltAndroidApp](./hilt-android-app.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
