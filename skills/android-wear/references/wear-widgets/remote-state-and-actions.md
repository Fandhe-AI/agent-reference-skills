# Remote Compose state and actions (rememberMutableRemoteInt / valueChange / pendingIntentAction)

Declarative state and interaction primitives for Wear Widgets. In place of a tile's `LoadAction`, which triggers a full round-trip back to the service, a widget mutates `rememberMutableRemote*` state directly on the rendering side via `valueChange(...)`, or hands off to the app process via `pendingIntentAction(...)` — without service-side lambdas.

## Signature / Usage

Click counter entirely resolved by the renderer, no service round-trip (verified against the `androidx.compose.remote.creation.compose` source):

```kotlin
val clickCounter = rememberMutableRemoteInt(0)
val onClickAction = valueChange(clickCounter, clickCounter + 1)

RemoteBox(
    modifier = RemoteModifier
        .size(width = 200.rdp, height = 100.rdp)
        .clickable(onClickAction),
) {
    RemoteText("Clicks: ".rs + clickCounter.toRemoteString())
}
```

Handing off to the app process with a `PendingIntent`:

```kotlin
RemoteModifier.clickable(
    pendingIntentAction { context ->
        PendingIntent.getActivity(
            context,
            0,
            Intent(context, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE,
        )
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rememberMutableRemoteInt(initialValue: Int)` | `MutableRemoteInt` | — | Declares an `Int` piece of state that lives in the rendered document and can be updated without a service round-trip. Supports operators like `+` (`clickCounter + 1`). |
| `rememberMutableRemoteString(initialValue: String)` | `MutableRemoteString` | — | Same as above for `String` state. |
| `RemoteDp` | class | — | Deferred `Dp` value; construct via `RemoteDp(dp)` or the `.rdp` extension on `Int`/`Float`/`Dp`, resolved to pixels at display time rather than at compose time. |
| `valueChange(remoteState: MutableRemoteState<T>, updatedValue: RemoteState<T>): Action` | `Action` | — | Action that writes `updatedValue` into `remoteState` entirely on the renderer side, with no callback into `provideWidgetData()`. |
| `pendingIntentAction(pendingIntent: (Context) -> PendingIntent): Action` | `@Composable Action` | — | Action that resolves and fires an Android `PendingIntent`, handing control back to the app process (equivalent to tapping out of the remote-rendered surface). The `Context` is supplied by the composable to avoid holding a `PendingIntent` across serialization. |

## Notes

- Package: `androidx.compose.remote.creation.compose.state` (`rememberMutableRemoteInt`, `rememberMutableRemoteString`, `RemoteDp`), `androidx.compose.remote.creation.compose.action` (`valueChange`, `pendingIntentAction`). Verified directly against the `androidx/androidx` source tree (`compose/remote/remote-creation-compose/src/main/java/androidx/compose/remote/creation/compose/{state,action}/`), since the rendered `developer.android.com/reference/**` pages for this package are not fetchable and the official migration guide names these APIs only in prose/reference links without a full runnable snippet.
- Replaces the tiles model where every interaction (`LoadAction`) re-invokes `TileService.onTileRequest()` on the provider process; widget state changes via `valueChange` are resolved by the renderer without calling back into `provideWidgetData()`.
- Use `pendingIntentAction` only when the interaction must reach the app process (e.g. opening an Activity); prefer `valueChange` for purely visual/local state to avoid the round-trip.
- A `RemoteBox`/`RemoteButton`'s `clickable(action)` modifier or `onClick` parameter accepts the `Action` returned by either `valueChange(...)` or `pendingIntentAction { ... }`.
- `EdgeButton`/`bottomSlot`-style fixed action slots from tiles have no widget equivalent; redesign taps as an inline `RemoteButton`, a `RemoteModifier.clickable()` on the whole container, or by pivoting content so the primary tap opens the full app.

## Related

- [remote-compose-layout](./remote-compose-layout.md)
- [migrate-from-tiles](./migrate-from-tiles.md)
