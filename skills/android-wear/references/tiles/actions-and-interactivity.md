# ActionBuilders (LaunchAction / LoadAction) and tap handling

`Clickable` modifiers reference an `Action` — either `LaunchAction` (open an activity directly) or `LoadAction` (re-invoke `onTileRequest`, optionally updating state). The system enforces a minimum 48dp x 48dp tappable area per clickable element.

## Signature / Usage

```kotlin
// 1. Launch an activity directly
textButton(
    labelContent = { text("Open".layoutString) },
    onClick = clickable(
        action = launchAction(
            ComponentName("com.example.wear", "com.example.wear.TileActivity"),
            mapOf(
                "name" to ActionBuilders.stringExtra("Bartholomew"),
                "age" to ActionBuilders.intExtra(21),
            ),
        )
    ),
)

// 2. Refresh tile content via onTileRequest
textButton(
    labelContent = { text("Refresh".layoutString) },
    onClick = clickable(loadAction()),
)

// 3. Update persistent state without an activity launch
textButton(
    labelContent = { text("Add".layoutString) },
    onClick = clickable(
        action = loadAction(
            dynamicDataMapOf(
                stringAppDataKey("name") mapTo "Javier",
                intAppDataKey("age") mapTo 37,
            )
        )
    ),
)
```

Reading the click result back in the service:

```kotlin
override fun onTileRequest(
    requestParams: RequestBuilders.TileRequest
): ListenableFuture<TileBuilders.Tile> {
    val lastClickableId = requestParams.currentState.lastClickableId
    with(requestParams.currentState.stateMap) {
        val name = this[stringAppDataKey("name")]
        val age = this[intAppDataKey("age")]
    }
    // ...
}
```

## Options / Props

### `ActionBuilders.LaunchAction.Builder`

| Name | Type | Description |
|------|------|-------------|
| `setAndroidActivity` | `AndroidActivity` | The exported activity to launch, plus any `Intent` extras. Cannot set custom `Intent` flags. |

### `ActionBuilders.LoadAction.Builder`

| Name | Type | Description |
|------|------|-------------|
| `setRequestState` | `StateBuilders.State` | State to merge and pass through to the next `onTileRequest` call. |

### Helper factories

| Name | Type | Description |
|------|------|-------------|
| `ActionBuilders.stringExtra(value: String): AndroidStringExtra` | factory | Wraps a string as an `Intent` extra for `launchAction`. |
| `ActionBuilders.intExtra(value: Int): AndroidIntExtra` | factory | Wraps an int as an `Intent` extra for `launchAction`. |
| `ModifiersBuilders.Clickable.Builder().setId(id).setOnClick(action)` | builder | Attaches the action to an element; `id` is read back via `currentState.lastClickableId` to distinguish multiple clickable elements. |

## Notes

- `launchAction()` requires the target activity to be `android:exported="true"`.
- `loadAction()` with no arguments simply signals "re-run `onTileRequest`"; with a `dynamicDataMapOf(...)` payload it also merges new state before re-running, ideal for counters/toggles handled entirely within the tile.
- To avoid visual flicker on reload, keep the layout structure and animations consistent between `onTileRequest` invocations — only change the parts of content that actually changed.
- Package: `androidx.wear.tiles.ActionBuilders` (Java builders) with the `material3` Kotlin DSL exposing `clickable()`, `launchAction()`, `loadAction()` helpers.

## Related

- [modifiers](./modifiers.md)
- [tile-builders](./tile-builders.md)
- [updating-tiles](./updating-tiles.md)
