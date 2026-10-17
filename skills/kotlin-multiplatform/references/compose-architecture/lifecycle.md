---
source: https://kotlinlang.org/docs/multiplatform/compose-lifecycle.html
---

# Lifecycle

Lifecycle of components in Compose Multiplatform is adopted from the Jetpack Compose lifecycle concept. A common `LifecycleOwner` implementation extends the original functionality to other platforms and lets you observe lifecycle states in common code.

## Signature / Usage

Add the dependency to the `commonMain` source set:

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            // ...
            implementation("org.jetbrains.androidx.lifecycle:lifecycle-runtime-compose:2.11.0")
        }
        // ...
    }
}
```

## Notes

- The flow of lifecycle states and events is the same as for the Jetpack lifecycle.
- By default, all composables created by Compose Multiplatform share the same lifecycle. The `LifecycleOwner` object is provided as a `CompositionLocal`; to manage a lifecycle separately for a particular composable subtree, create your own `LifecycleOwner` implementation.
- `Lifecycle.coroutineScope` is tied to `Dispatchers.Main.immediate`, which might be unavailable on desktop targets by default. Add the `kotlinx-coroutines-swing` dependency so coroutines and flows in lifecycles work correctly.
- Each back stack entry in Navigation implements `LifecycleOwner`; see [navigation-routing.md](./navigation-routing.md).
- Web: the official page says lifecycles skip `CREATED`, yet its own event table lists `visibilitychange` transitions to and from `CREATED`; both are reproduced as published. Do not rely on `CREATED` being observable (or on reaching `DESTROYED`) on Web; release resources on `ON_STOP` instead.
- Distinct from Android-only coverage: the common `androidx.lifecycle` API is covered by android-architecture; this page covers the `org.jetbrains.androidx.lifecycle` artifact and platform event mapping.

### Mapping Android lifecycle to other platforms

iOS:

| Native events and notifications | Lifecycle event | Lifecycle state change |
| --- | --- | --- |
| `viewDidDisappear` | `ON_STOP` | `STARTED` → `CREATED` |
| `viewWillAppear` | `ON_START` | `CREATED` → `STARTED` |
| `willResignActive` | `ON_PAUSE` | `RESUMED` → `STARTED` |
| `didBecomeActive` | `ON_RESUME` | `STARTED` → `RESUMED` |
| `didEnterBackground` | `ON_STOP` | `STARTED` → `CREATED` |
| `willEnterForeground` | `ON_START` | `CREATED` → `STARTED` |
| `viewControllerDidLeaveWindowHierarchy` | `ON_DESTROY` | `CREATED` → `DESTROYED` |

Web: due to limitations of the Wasm target, lifecycles skip the `CREATED` state (the application is always attached to the page) and never reach the `DESTROYED` state (web pages are usually terminated only when the user closes the tab).

| Native event | Lifecycle event | Lifecycle state change |
| --- | --- | --- |
| `visibilitychange` (becomes visible) | `ON_START` | `CREATED` → `STARTED` |
| `focus` | `ON_RESUME` | `STARTED` → `RESUMED` |
| `blur` | `ON_PAUSE` | `RESUMED` → `STARTED` |
| `visibilitychange` (stops being visible) | `ON_STOP` | `STARTED` → `CREATED` |

Desktop:

| Swing listener callbacks | Lifecycle event | Lifecycle state change |
| --- | --- | --- |
| `windowIconified` | `ON_STOP` | `STARTED` → `CREATED` |
| `windowDeiconified` | `ON_START` | `CREATED` → `STARTED` |
| `windowLostFocus` | `ON_PAUSE` | `RESUMED` → `STARTED` |
| `windowGainedFocus` | `ON_RESUME` | `STARTED` → `RESUMED` |
| `dispose` | `ON_DESTROY` | `CREATED` → `DESTROYED` |

## Related

- [Navigation and routing](./navigation-routing.md)
- [Multiplatform ViewModel](./viewmodel.md)
