# Remote Compose layout (RemoteBox / RemoteColumn / RemoteText / RemoteButton)

`@RemoteComposable` functions from `androidx.compose.remote.creation.compose.layout` that describe a Wear Widget's UI declaratively, in place of the imperative ProtoLayout `LayoutElementBuilders` used by tiles. Values passed to them are converted to deferred Remote Compose values with the `.rc` / `.rs` / `.rdp` extensions.

## Signature / Usage

```kotlin
@RemoteComposable @Composable
fun HelloWidgetContent() {
    RemoteBox(
        modifier = RemoteModifier.fillMaxSize(),
        contentAlignment = RemoteAlignment.Center,
    ) {
        RemoteText(
            text = "Hello World".rs,
            color = Color.White.rc,
        )
    }
}
```

`RemoteColumn` / `RemoteRow` with a click counter (verified against the `androidx.compose.remote.creation.compose` source — see Notes):

```kotlin
@RemoteComposable
@Composable
private fun ClickableDemoContent() {
    val clickCounter = rememberMutableRemoteInt(0)
    val onClickAction = valueChange(clickCounter, clickCounter + 1)

    RemoteColumn(modifier = RemoteModifier.fillMaxSize()) {
        RemoteRow {
            RemoteText("Clicks: ".rs + clickCounter.toRemoteString(), color = Color.Black.rc)
        }
        RemoteBox(
            modifier =
                RemoteModifier.size(width = 200.rdp, height = 100.rdp)
                    .background(RemoteColor(Color.LightGray))
                    .clickable(onClickAction)
                    .padding(RemoteDp(16.dp)),
            contentAlignment = RemoteAlignment.Center,
        ) {
            RemoteText("Tap me!".rs)
        }
    }
}
```

Standard Kotlin → Remote Compose value conversion:

```kotlin
val remoteColor = Color.Blue.rc   // Color -> deferred RemoteColor
val remoteText = "Hello".rs       // String -> deferred RemoteString
val remoteInt = 1.ri              // Int -> deferred RemoteInt
val remoteDp = 200.rdp            // Int/Float/Dp -> deferred RemoteDp, resolved at display time
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `RemoteBox(modifier, contentAlignment, content)` | `@RemoteComposable` | — | Single-child container mapping to ProtoLayout `Box`; positions `content` per `contentAlignment` (e.g. `RemoteAlignment.Center`). |
| `RemoteColumn(modifier, content)` | `@RemoteComposable` | — | Vertical layout container; maps to ProtoLayout `Column`. |
| `RemoteText(text, color, style)` | `@RemoteComposable` | — | Text element; `text` takes a `.rs`-converted `RemoteString`, `color` a `.rc`-converted `RemoteColor`. |
| `RemoteButton(text, onClick)` | `@RemoteComposable` | — | Tappable Material3 button; `onClick` takes a Remote Compose action, typically `valueChange(...)` or `pendingIntentAction { ... }` (see remote-state-and-actions). |
| `RemoteModifier` | modifier chain | — | Remote Compose counterpart of `Modifier`, from `androidx.compose.remote.creation.compose.modifier` (`fillMaxSize()`, `size()`, `padding()`, `background()`, `clickable()`); applies to Remote composables only. |
| `.rc` | extension on e.g. `Color` | — | Converts a standard Kotlin value to its deferred Remote Compose equivalent (`RemoteColor`). |
| `.rs` | extension on `String` | — | Converts a `String` to a deferred `RemoteString`. |
| `.ri` | extension on `Int` | — | Converts an `Int` to a deferred `RemoteInt`. |
| `.rdp` | extension on `Int` / `Float` / `Dp` | — | Converts a numeric value or `Dp` to a deferred `RemoteDp`, resolved at display time (for dynamic layout calculations). |

## Notes

- Package: `androidx.compose.remote.creation.compose.layout` (`RemoteBox`, `RemoteColumn`, `RemoteRow`, `RemoteText`), `androidx.compose.remote.creation.compose.modifier` (`RemoteModifier` and its extensions), `androidx.compose.remote.creation.compose.state` (`.rc`/`.rs`/`.ri`/`.rdp`, `RemoteColor`, `RemoteDp`), `androidx.wear.compose.remote.material3` (`RemoteButton`); artifacts `androidx.compose.remote:remote-creation-compose`, `androidx.wear.compose.remote:remote-material3`. Verified against the `androidx/androidx` source tree (`compose/remote/remote-creation-compose/...`) since `developer.android.com/reference/**` pages for this package are not fetchable.
- Remote Compose functions render remotely (compiled to a document the system renderer replays), unlike regular `androidx.compose.*` composables which execute in-process — do not mix plain `Modifier`/`Box`/`Text` with `RemoteModifier`/`RemoteBox`/`RemoteText` inside `provideWidgetData`.
- API mapping from ProtoLayout tiles: `Box` builder → `RemoteBox`, `Column` builder → `RemoteColumn`, `Text` builder → `RemoteText`, `Button` builder → `RemoteButton`; tiles' fixed `EdgeButton`/`bottomSlot` has no widget equivalent — see migrate-from-tiles for redesign options (inline actions, whole-container tap).
- This is a distinct API from mobile Jetpack Compose (`androidx.compose.foundation.layout.Box/Column`) and from Wear Compose (`androidx.wear.compose.material3`, covered under wear-compose) — `Remote*` composables run inside a widget's `provideWidgetData`, not inside an app's own Activity composition.

## Related

- [glance-wear-widget-service](./glance-wear-widget-service.md)
- [remote-state-and-actions](./remote-state-and-actions.md)
