# Activity

Provides the window in which the app draws its UI; a crucial entry point for non-deterministic user journeys where the user can enter the app at different points depending on context.

## Signature / Usage

```xml
<manifest ... >
    <application ... >
        <activity android:name=".ExampleActivity" />
    </application>
</manifest>
```

```kotlin
fun composeEmail(addresses: Array<String>, subject: String) {
    val intent = Intent(Intent.ACTION_SENDTO).apply {
        data = Uri.parse("mailto:")
        putExtra(Intent.EXTRA_EMAIL, addresses)
        putExtra(Intent.EXTRA_SUBJECT, subject)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
```

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- You implement an activity as a subclass of `Activity` (in practice, `ComponentActivity` for Compose apps). Modern Compose apps typically use a single-activity architecture where composables host multiple navigation destinations instead of multiple activities managing different screens.
- Every activity must be declared in `AndroidManifest.xml` via `<activity android:name=...>`. Don't rename an activity class after publishing — it can break functionality like app shortcuts and deep links that reference it explicitly.
- When one app invokes another, the calling app starts a specific activity in the target app (not the app as a whole), which enables cross-app navigation. Activities are organized into a task's back stack; see [Tasks and back stack](./tasks-and-back-stack.md).
- Handle incoming intents (including redelivery to an already-running instance) in both `onCreate()` and `onNewIntent()`:

```kotlin
class ExampleActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        handleIntent(intent)
    }
}
```

## Related

- [Activity lifecycle](./activity-lifecycle.md)
- [ComponentActivity and setContent](./component-activity-compose.md)
- [Tasks and back stack](./tasks-and-back-stack.md)
- [Intent](./intent.md)
