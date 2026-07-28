# Application class and initialization

`Application` is the base class instantiated once per process before any other app component, used for process-wide state and initialization; the App Startup library (`androidx.startup`) provides a more efficient alternative to ad hoc `Application.onCreate()` initialization or multiple content providers.

## Signature / Usage

```kotlin
class ExampleLoggerInitializer : Initializer<ExampleLogger> {
    override fun create(context: Context): ExampleLogger {
        return ExampleLogger(WorkManager.getInstance(context))
    }
    override fun dependencies(): List<Class<out Initializer<*>>> {
        return listOf(WorkManagerInitializer::class.java)
    }
}
```

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <meta-data
        android:name="com.example.ExampleLoggerInitializer"
        android:value="androidx.startup" />
</provider>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Application` | base class | — | Declared via `<application android:name=".MyApplication">`; its `onCreate()` runs once per process before any activity/service/receiver. |
| `Initializer<T>.create(context)` | method (override) | — | Performs the initialization and returns the initialized instance of `T`. |
| `Initializer<T>.dependencies()` | method (override) | — | Returns other `Initializer` classes that must run first, letting App Startup order initialization automatically. |
| `androidx.startup.InitializationProvider` | manifest `<provider>` | — | Single shared content provider that discovers and runs all declared `Initializer`s, in place of one provider per library/component. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- App Startup exists because each separately-declared `ContentProvider` used purely for init has fixed startup cost and unpredictable ordering; consolidating into one `InitializationProvider` improves startup time and lets dependencies be declared explicitly instead of relying on manifest merge order.
- You only need to declare a `<meta-data>` entry for entry-point initializers in the manifest — transitive dependencies are discovered automatically via `dependencies()`.
- `Application` subclasses are still the right place for state that must be reachable from anywhere in the process (e.g. a manually-constructed DI graph) even when App Startup is used for library initialization.

## Related

- [App process priority and memory trimming](./app-process-priority.md)
- [App components overview](./app-components-overview.md)
