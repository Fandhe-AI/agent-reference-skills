# Custom WorkManager Configuration and Initialization

How-to guide for replacing WorkManager's default automatic initialization with on-demand or manual initialization.

## Signature / Usage

```kotlin
// Step 1: disable the default initializer in AndroidManifest.xml
// <provider
//     android:name="androidx.startup.InitializationProvider"
//     android:authorities="${applicationId}.androidx-startup"
//     android:exported="false"
//     tools:node="merge">
//     <meta-data
//         android:name="androidx.work.WorkManagerInitializer"
//         android:value="androidx.startup"
//         tools:node="remove" />
// </provider>

// Step 2: implement Configuration.Provider on Application
class MyApplication : Application(), Configuration.Provider {
    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder()
            .setMinimumLoggingLevel(android.util.Log.INFO)
            .build()
}

// Step 3: always access the singleton this way
WorkManager.getInstance(context)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| On-demand initialization | strategy | Recommended, available since WorkManager 2.1.0. Removes `WorkManagerInitializer` from the App Startup manifest entry and lets WorkManager call `Configuration.Provider.workManagerConfiguration` lazily on first `WorkManager.getInstance(context)` access, moving init off the app-startup critical path. |
| Manual initialization | strategy | Legacy approach for WorkManager < 2.1.0: call `WorkManager.initialize(context, configuration)` explicitly from `Application.onCreate()` or `ContentProvider.onCreate()`. |

## Notes

- For WorkManager 2.6+, the default initializer is `androidx.startup.InitializationProvider` (App Startup); for versions before 2.6 it is `androidx.work.impl.WorkManagerInitializer`. Both are removed via `tools:node="remove"` on the manifest `<provider>` entry.
- Never call the deprecated no-argument `WorkManager.getInstance()` — it throws if WorkManager has not been initialized yet.
- This page documents the initialization *how-to*; the full set of `Configuration.Builder` options (executors, worker factory, scheduler limits, etc.) is documented on the [Configuration / Configuration.Provider](./configuration.md) page.
- Package: `androidx.work`.

## Related

- [Configuration / Configuration.Provider](./configuration.md)
- [WorkerFactory / DelegatingWorkerFactory](./worker-factory.md)
