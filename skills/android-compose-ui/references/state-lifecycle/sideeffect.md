# SideEffect

Schedules `effect` to run after every successful recomposition, used to publish Compose state to non-Compose code (e.g. an analytics SDK).

## Signature / Usage

```kotlin
@Composable
fun SideEffect(effect: () -> Unit)
```

```kotlin
@Composable
fun rememberFirebaseAnalytics(user: User): FirebaseAnalytics {
    val analytics: FirebaseAnalytics = remember { FirebaseAnalytics() }

    SideEffect {
        analytics.setUserProperty("userType", user.userType)
    }
    return analytics
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `effect` | `() -> Unit` | — | Non-suspend block run after every recomposition that successfully applies to the Composition. |

## Notes

- Unlike [LaunchedEffect](./launchedeffect.md), `effect` is not a coroutine and cannot suspend; it runs synchronously after each successful recomposition.
- Package: `androidx.compose.runtime`.

## Related

- [LaunchedEffect](./launchedeffect.md)
- [DisposableEffect](./disposableeffect.md)
