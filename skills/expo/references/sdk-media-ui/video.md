---
source: https://docs.expo.dev/versions/v58.0.0/sdk/video/
---

# Video (expo-video)

`expo-video`: a cross-platform, performant video component for React Native and Expo with Web support. Playback is driven by a `VideoPlayer` (created with `useVideoPlayer`) rendered by `VideoView`.

## Signature / Usage

```sh
npx expo install expo-video
```

```jsx
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: { width: 350, height: 275 },
  controlsContainer: { padding: 10 },
});
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-video",
        {
          "supportsBackgroundPlayback": true,
          "supportsPictureInPicture": true
        }
      ]
    ]
  }
}
```

Local media, events, direct player creation:

```tsx
import { VideoSource } from 'expo-video';

const assetId = require('./assets/bigbuckbunny.mp4');

const videoSource: VideoSource = {
  assetId,
  metadata: {
    title: 'Big Buck Bunny',
    artist: 'The Open Movie Project',
  },
};

const player1 = useVideoPlayer(assetId); // You can use the `asset` directly as a video source
const player2 = useVideoPlayer(videoSource);
```

```tsx
import { useEvent } from 'expo';
const { status, error } = useEvent(player, 'statusChange', { status: player.status });
```

```tsx
import { useEventListener } from 'expo';
useEventListener(player, 'statusChange', ({ status, error }) => {
  setPlayerStatus(status);
  setPlayerError(error);
  console.log('Player status changed: ', status);
});
```

```tsx
import { createVideoPlayer } from 'expo-video';
const player = createVideoPlayer(videoSource);
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| supportsBackgroundPlayback | `undefined` | `true`: iOS adds `audio` to `UIBackgroundModes` in Info.plist; Android adds foreground service permissions and an expo-video foreground service in AndroidManifest.xml. `false` removes the iOS key. `undefined` leaves it unchanged. |
| supportsPictureInPicture | `undefined` | `true`: enables `android:supportsPictureInPicture` on Android and adds `audio` to `UIBackgroundModes` on iOS. `false` removes the key. `undefined` leaves it unchanged. |

### VideoView props

Type: `React.PureComponent<VideoViewProps>`. Inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| player | `VideoPlayer \| null` | — | Player instance from `useVideoPlayer()`. |
| contentFit | `VideoContentFit` | `'contain'` | How the video scales: `'contain'`, `'cover'`, `'fill'`. |
| contentPosition (iOS) | `{ dx: number, dy: number }` | — | Position offset of the video inside the container. |
| nativeControls | `boolean` | `true` | Show native controls. Always enabled in fullscreen. |
| fullscreenOptions | `FullscreenOptions` | — | Fullscreen mode options (type not expanded in the page; the example uses `{ enable: true }`). |
| allowsPictureInPicture (Android, iOS, Web) | `boolean` | — | Allow PiP; the config plugin's `supportsPictureInPicture` must be configured. |
| startsPictureInPictureAutomatically (Android 12+, iOS) | `boolean` | `false` | Start PiP automatically when the app goes to background. Only one player can be in PiP at a time. |
| allowsVideoFrameAnalysis (iOS 16.0+) | `boolean` | `true` | Live Text in videos. |
| buttonOptions (Android) | `ButtonOptions` | — | Visibility of player control buttons. |
| controllerAutoShow (Android) | `boolean` | `true` | Show native controls automatically on play, pause, end. `false` still allows tapping to show. |
| surfaceType (Android) | `SurfaceType` | `'surfaceView'` | Surface for rendering. Do not change at runtime. |
| useExoShutter (Android) | `boolean` | `false` | Use the default ExoPlayer shutter before the first frame; `false` matches iOS behavior. |
| requiresLinearPlayback (Android, iOS) | `boolean` | `false` | Disallow skipping media content. |
| showsTimecodes (iOS) | `boolean` | `true` | Show timecodes. |
| crossOrigin (Web) | `'anonymous' \| 'use-credentials'` | `undefined` | Cross-origin policy. `undefined` does not use CORS; some videos may not play with CORS enabled depending on CDN settings. |
| playsInline (Web) | `boolean` | — | Play inline within the element's playback area. |
| useAudioNodePlayback (Web) | `boolean` | `false` | Experimental: use Audio Nodes so the same player in multiple views does not increase volume; known to break audio for some sources. Do not change at runtime. |
| onFirstFrameRender | `() => void` | — | The mounted player rendered the first frame into the view; may also fire during playback when the video track changes. |
| onFullscreenEnter / onFullscreenExit | `() => void` | — | Fullscreen enter / exit. |
| onPictureInPictureStart / onPictureInPictureStop (Android, iOS, Web) | `() => void` | — | PiP enter / exit. |

### VideoView methods

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `enterFullscreen()` | all | `Promise<void>` | Enters fullscreen. |
| `exitFullscreen()` | all | `Promise<void>` | Exits fullscreen. On Android the JS runtime is paused in fullscreen, so it only works from a native listener such as `useEventListener(player, 'playToEnd', ...)`. |
| `startPictureInPicture()` | Android, iOS, Web | `Promise<void>` | Enters PiP; throws if unsupported. |
| `stopPictureInPicture()` | Android, iOS, Web | `Promise<void>` | Exits PiP. |

### VideoAirPlayButton (iOS)

Displays an `AVRoutePickerView`. The player's `allowsExternalPlayback` must be `true`. Inherits `Omit<ViewProps, 'children'>`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| tint | `ColorValue` | `undefined` | Icon color while AirPlay is not active. |
| activeTint | `ColorValue` | `undefined` | Icon color while AirPlay is active. |
| prioritizeVideoDevices | `boolean` | `true` | Show video outputs first. |
| onBeginPresentingRoutes / onEndPresentingRoutes | `() => void` | — | Route selection popup about to show / has disappeared. |

### Hook and module functions

| Function | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `useVideoPlayer(source: VideoSource, setup?: (player: VideoPlayer) => void, playerBuilderOptions?: PlayerBuilderOptions)` | all | `VideoPlayer` | Creates a player, released when the component unmounts. |
| `createVideoPlayer(source, playerBuilderOptions?)` | all | `VideoPlayer` | Creates a player that is not released automatically; you must call `release()` or risk memory leaks. On Android, mounting multiple `VideoView`s with the same player does not work (platform limitation). |
| `clearVideoCacheAsync()` | Android, iOS | `Promise<void>` | Clears the video cache; only when no `VideoPlayer` instances exist. |
| `getCurrentVideoCacheSize()` | Android, iOS | `number` | Bytes used by the cache. |
| `setVideoCacheSizeAsync(sizeBytes: number)` | Android, iOS | `Promise<void>` | Preferred cache size (default 1GB, persistent, LRU eviction); only when no `VideoPlayer` instances exist. |
| `isPictureInPictureSupported()` | Android, iOS | `boolean` | Whether PiP is supported. |

### VideoPlayer (class extends SharedObject<VideoPlayerEvents>)

Properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| currentTime | `number` | — | Playback time in seconds; setting it seeks (see `seekTolerance`). |
| duration | `number` | — | Read only. Seconds. |
| playing | `boolean` | — | Read only. Use `play` / `pause`. |
| status | `VideoPlayerStatus` | — | Read only. |
| loop | `boolean` | `false` | Replay after the end. |
| muted | `boolean` | `false` | Mute (volume is unaffected). |
| volume | `number` | `1.0` | `0` to `1.0`. |
| playbackRate | `number` | `1.0` | `0` to `16.0`. |
| preservesPitch | `boolean` | `true` | Correct pitch when the rate changes. |
| bufferedPosition | `number` | — | Read only. Seconds buffered; `0` if not buffered up to the current time, `-1` if undeterminable. |
| bufferOptions (Android, iOS) | `BufferOptions` | — | Set the whole object, not individual properties. |
| isLive | `boolean` | — | Read only. |
| currentLiveTimestamp (Android, iOS) | `number \| null` | — | Read only. From the `EXT-X-PROGRAM-DATE-TIME` tag. |
| currentOffsetFromLive (Android, iOS) | `number \| null` | — | Read only. Live latency in seconds. |
| targetOffsetFromLive (iOS) | `number` | — | Time offset from live in seconds. |
| timeUpdateEventInterval | `number` | `0` | Seconds between `timeUpdate` events; `0` disables them. |
| seekTolerance (Android, iOS per type; page lists all platforms) | `SeekTolerance` | `0` before/after | Affects `currentTime`, `seekBy`, and on Android the native scrubber. |
| scrubbingModeOptions | `ScrubbingModeOptions` | — | Scrubbing mode and optimizations. |
| keepScreenOnWhilePlaying (Android, iOS) | `boolean` | `true` | On Android only effective while a `VideoView` is visible; use expo-keep-awake for always. |
| staysActiveInBackground (Android, iOS) | `boolean` | `false` | Needs plugin `supportsBackgroundPlayback: true`. |
| showNowPlayingNotification (Android, iOS) | `boolean` | `false` | On Android needs plugin `supportsBackgroundPlayback: true`. |
| audioMixingMode (Android, iOS) | `AudioMixingMode` | `'auto'` | Interaction with other audio. |
| allowsExternalPlayback (iOS) | `boolean` | `true` | Allow external playback (AirPlay). |
| isExternalPlaybackActive (iOS) | `boolean` | — | Read only. |
| maxResolution (Android, iOS) | `VideoSize \| null` | `null` | Maximum resolution for adaptive stream track selection. Android: hard constraint (lowest track if none satisfy). iOS: soft preferred maximum, HLS sources only. Non-positive dimensions equal `null`. |
| audioTrack / subtitleTrack (Android, iOS) | `AudioTrack \| null` / `SubtitleTrack \| null` | `null` | Current tracks; assign subtitle tracks from `availableSubtitleTracks`. |
| videoTrack (Android, iOS) | `VideoTrack \| null` | `null` | Read only. |
| availableAudioTracks / availableSubtitleTracks / availableVideoTracks (Android, iOS) | arrays | — | Read only. On iOS HLS the uri must contain `.m3u8` or `contentType` must be `'hls'` for video tracks. |

Methods:

| Method | Returns | Description |
| --- | --- | --- |
| `play()` / `pause()` | `void` | Resume / pause. |
| `replay()` | `void` | Seek to the beginning. |
| `seekBy(seconds: number)` | `void` | Seek by an amount; may differ from the request. Use `currentTime` for frame-accurate seeking. |
| `replace(source: VideoSource, disableWarning?: boolean)` | `void` | Replace the source. On iOS it loads synchronously on the UI thread. Will be deprecated. |
| `replaceAsync(source: VideoSource)` | `Promise<void>` | Replace the source off the UI thread. Equivalent to `replace` on Android and Web. |
| `generateThumbnailsAsync(times: number \| number[], options?: VideoThumbnailOptions)` (Android, iOS) | `Promise<VideoThumbnail[]>` | Thumbnails usable as an `expo-image` source. |

`VideoThumbnail` (class extends SharedRef<'image'>, Android, iOS): `actualTime` (iOS), `height`, `width`, `requestedTime`, `nativeRefType`.

### Types

| Type | Definition |
| --- | --- |
| `VideoSource` | `string \| number \| null \| VideoSourceObject` |
| `VideoSourceObject` | `{ uri?: string, assetId?: number (exclusive with uri; ignored when both), contentType?: ContentType (default 'auto'; Android, iOS), drm?: DRMOptions, headers?: Record<string, string> (Android, iOS), metadata?: VideoMetadata (Android, iOS), useCaching?: boolean (default false; Android, iOS) }`. iOS `PHAsset` URIs load only via `replaceAsync` or the default constructor. |
| `ContentType` | `'auto' \| 'progressive' \| 'hls' \| 'dash' \| 'smoothStreaming'` (`dash` and `smoothStreaming` are Android-only; `progressive` is the default when the uri has no extension) |
| `DRMOptions` | `{ type: DRMType, licenseServer: string, headers?: Record<string, string>, multiKey?: boolean (Android), base64CertificateData?: string (iOS; overrides certificateUrl), certificateUrl?: string (iOS), contentId?: string (iOS) }` |
| `DRMType` | `'clearkey' \| 'fairplay' \| 'playready' \| 'widevine'` (Android: ClearKey, PlayReady, Widevine; iOS: FairPlay) |
| `VideoMetadata` | `{ artist?: string, artwork?: string, title?: string }` for the now playing notification |
| `VideoContentFit` | `'contain' \| 'cover' \| 'fill'` |
| `SurfaceType` (Android) | `'surfaceView'` (default; lower power, better performance) \| `'textureView'` (use when SurfaceView causes issues, e.g. overlapping views) |
| `VideoPlayerStatus` | `'idle' \| 'loading' \| 'readyToPlay' \| 'error'` |
| `AudioMixingMode` | `'mixWithOthers' \| 'duckOthers' \| 'auto' \| 'doNotMix'`. Priority when several players differ: `doNotMix` > `auto` > `duckOthers` > `mixWithOthers`. `auto` lets other apps play only when muted; on iOS it always interrupts others when `showNowPlayingNotification` is `true`. Now Playing on iOS works only with `doNotMix` or `auto`. |
| `AudioTrack` | `{ label: string, language: string, autoSelect?: boolean, id?: string (Android), isDefault?: boolean, name?: string }` |
| `SubtitleTrack` | `{ label: string, language: string, autoSelect?: boolean, id?: string (Android), isDefault?: boolean, name?: string }` |
| `VideoTrack` | `{ id: string, size: VideoSize, frameRate: number \| null, mimeType: string \| null, url: string \| null (HLS only), videoRange: VideoRange, averageBitrate: number \| null, peakBitrate: number \| null, bitrate: number \| null (deprecated), isSupported: boolean (Android) }` |
| `VideoRange` | `'sdr' \| 'hlg' \| 'pq'` |
| `VideoSize` | `{ height: number, width: number }` (pixels) |
| `BufferOptions` | `{ preferredForwardBufferDuration?: number (default Android 20, iOS 0; Android, iOS), minBufferForPlayback?: number (default 2; Android), maxBufferBytes?: number \| null (default 0; Android), prioritizeTimeOverSizeThreshold?: boolean (default false; Android), waitsToMinimizeStalling?: boolean (default true; iOS) }` |
| `ButtonOptions` (Android) | `{ showBottomBar?: boolean (true), showNext?: boolean (false), showPlayPause?: boolean (true), showPrevious?: boolean (false), showSeekBackward?: boolean (true), showSeekForward?: boolean (true), showSettings?: boolean (true), showSubtitles?: boolean \| null (undefined = only when subtitles are available) }`. The fullscreen button is controlled by `fullscreenOptions.enable`. |
| `SeekTolerance` | `{ toleranceAfter?: number (default 0), toleranceBefore?: number (default 0) }` in seconds, non-negative |
| `ScrubbingModeOptions` | `{ scrubbingModeEnabled?: boolean (default false; Android, iOS), allowSkippingMediaCodecFlush?: boolean (true; Android), enableDynamicScheduling?: boolean (true; Android), increaseCodecOperatingRate?: boolean (true; Android), useDecodeOnlyFlag?: boolean (true; Android) }`. Enable only for many frequent seeks; on Android playback is suppressed while enabled. |
| `PlayerBuilderOptions` (Android) | `{ seekBackwardIncrement?: number, seekForwardIncrement?: number (clamped 0.001 to 999 s), videoChangeFrameRateStrategy?: VideoChangeFrameRateStrategy (default 'onlyIfSeamless') }` |
| `VideoChangeFrameRateStrategy` (Android) | `'off' \| 'onlyIfSeamless'`. Adaptive refresh rate devices may lower the whole app to 30 Hz for a 30 fps video; `'off'` keeps the UI at full refresh rate. |
| `VideoThumbnailOptions` | `{ maxHeight?: number, maxWidth?: number }` (Android, iOS) |
| `PlayerError` | `{ message: string }` |

`VideoPlayerEvents` handlers: `audioTrackChange`, `availableAudioTracksChange`, `availableSubtitleTracksChange`, `isExternalPlaybackActiveChange` (iOS; `{ isExternalPlaybackActive, oldIsExternalPlaybackActive? }`), `mutedChange` (`{ muted, oldMuted? }`), `playbackRateChange` (`{ playbackRate, oldPlaybackRate? }`), `playingChange` (`{ isPlaying, oldIsPlaying? }`), `playToEnd` (`() => void`), `sourceChange` (`{ source, oldSource? }`), `sourceLoad` (`{ availableAudioTracks, availableSubtitleTracks, availableVideoTracks, duration, videoSource }`), `statusChange` (`{ status, oldStatus?, error?: PlayerError }`), `subtitleTrackChange` (`{ subtitleTrack, oldSubtitleTrack? }`), `timeUpdate` (`{ currentTime, bufferedPosition, currentLiveTimestamp, currentOffsetFromLive }`), `videoTrackChange` (`{ videoTrack, oldVideoTrack? }`), `volumeChange` (`{ volume, oldVolume? }`).

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Package `expo-video`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-video`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- Known issue: two overlapping `VideoView`s with `contentFit="cover"` may draw one video out of bounds (upstream androidx/media issue 1107). Workaround: `surfaceType="textureView"`.
- Property changes on `VideoPlayer` do not update React state; listen to events with `useEvent`, `useEventListener` (both from `expo`), or `player.addListener` (manual cleanup via `subscription.remove()`).
- Preloading: a `VideoPlayer` fills buffers even when not attached to a `VideoView`; create one with a `null` source and call `replace()` later to start preloading.
- Caching: set `useCaching: true` on the `VideoSource`. The cache is persistent, LRU, works offline, and the system may clear it. It cannot be used with HLS on iOS, and DRM-protected videos cannot be cached on Android or iOS.
- Media library videos: the page uses `expo-media-library/legacy` (`getAssetsAsync`, `requestPermissionsAsync(false, ['video'])`) and the asset `uri`; on iOS do not use `localUri` (no read permission).
- iOS native extension `VideoAssetTransportProvider` / `VideoAssetTransportRegistry` (custom Expo module, registered in `OnCreate`, not available in Expo Go) lets you rewrite sources or attach resource loaders; see the official page for the full provider and `VideoAssetLoadPlan` field tables.
- This is `expo-video`. The older `expo-av` Video component is not covered by this page.

## Related

- [Audio](./audio.md)
- [VideoThumbnails](./video-thumbnails.md)
- [Image](./image.md)
- [MediaLibrary](./media-library.md)
