# ComponentActivity and setContent

`ComponentActivity` is the base `Activity` subclass used as the entry point for Jetpack Compose apps; its `setContent` extension function sets a composable function tree as the activity's root view.

## Signature / Usage

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Text("Hello world!")
        }
    }
}
```

## Notes

- This is the Android platform / androidx entry-point API (Kotlin, `androidx.activity.ComponentActivity` + `androidx.activity.compose.setContent`) — distinct from the same-named concept in other skills.
- `setContent { ... }` replaces the traditional `setContentView(layoutRes)` used with XML layouts; composable functions can only be called from within `setContent` or from other composable functions.
- To render composables, an activity must extend `ComponentActivity` (or a class that extends it, directly or indirectly).
- `ComponentActivity` (from `androidx.activity`) also provides `registerForActivityResult()` and the `OnBackPressedDispatcher`; see [Activity Result contracts](./activity-result-contracts.md).

## Related

- [Activity](./activity.md)
- [Activity lifecycle](./activity-lifecycle.md)
- [Activity Result contracts](./activity-result-contracts.md)
