# Compose UI (PlayerSurface, ContentFrame, State Holders)

Jetpack Compose building blocks for Media3, offered at two levels: `media3-ui-compose` (foundational `PlayerSurface` / `ContentFrame` and state holders for a fully custom design) and `media3-ui-compose-material3` (ready-made Material 3 composables like `Player`, `MiniController`, `PlayPauseButton`).

## Signature / Usage

```kotlin
// media3-ui-compose: custom UI built on primitives + state holders.
val playPauseButtonState = rememberPlayPauseButtonState(player)

Box {
  ContentFrame(player = player)
  IconButton(onClick = { playPauseButtonState.onClick() }) {
    Icon(if (playPauseButtonState.showPlay) Icons.Default.PlayArrow else Icons.Default.Pause, null)
  }
}
```

```kotlin
// media3-ui-compose-material3: ready-made composable.
Player(player = player)
```

```kotlin
@Composable
fun PlayerSurface(
  player: Player?,
  modifier: Modifier = Modifier,
  surfaceType: @SurfaceType Int = SURFACE_TYPE_SURFACE_VIEW,
)

@Composable
fun ContentFrame(
  player: Player?,
  modifier: Modifier = Modifier,
  surfaceType: @SurfaceType Int = SURFACE_TYPE_SURFACE_VIEW,
  contentScale: ContentScale = ContentScale.Fit,
  keepContentOnReset: Boolean = false,
  shutter: @Composable () -> Unit = { /* black box */ },
)

@Composable
fun rememberPlayPauseButtonState(player: Player?): PlayPauseButtonState
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PlayerSurface(player, modifier, surfaceType)` | composable | `surfaceType = SURFACE_TYPE_SURFACE_VIEW` | Renders the player's raw video output surface (analogous to `PlayerView`'s surface). |
| `ContentFrame(player, modifier, surfaceType, contentScale, keepContentOnReset, shutter)` | composable | `contentScale = ContentScale.Fit` | Sibling composable to `PlayerSurface` that wraps it with content scaling and a shutter (placeholder) while no frame is available; internally invokes `PlayerSurface`. |
| `PlayPauseButtonState` / `rememberPlayPauseButtonState(player)` | state holder | — | Exposes `showPlay` / `isEnabled` (`mutableStateOf`) and an `onClick()` action, updated via `observe()` on `Player.Events`. |
| `CurrentMediaItemState` | state holder | — | Tracks the current `MediaItem`/metadata for UI display. |
| `PlaylistState` | state holder | — | Tracks the current playlist for UI display. |
| `ErrorState` | state holder | — | Tracks the current `PlaybackException`, if any. |
| `Player`, `MiniController`, `PlayPauseButton`, `SeekBackButton`, `PositionAndDurationText`, `ErrorText` | composables (`media3-ui-compose-material3`) | — | Pre-built Material 3 components with internal state management. |

## Notes

- `media3-ui-compose` depends only on `androidx.compose.foundation` and provides the business-logic-to-UI-logic connection (state holders); `media3-ui-compose-material3` adds the full business-logic-to-UI pipeline with Material 3 styling.
- Include exactly one of `media3-ui-compose` or `media3-ui-compose-material3` depending on whether a custom design system or Material 3 is desired.
- Google recommends building new Media3 UI Compose-first, or migrating existing `PlayerView` usage.
- Artifact: `androidx.media3:media3-ui-compose` / `androidx.media3:media3-ui-compose-material3`.

## Related

- [PlayerView](./player-view.md)
- [Player](./player.md)
