---
source: https://docs.expo.dev/versions/v58.0.0/sdk/audio/
---

# Audio (expo-audio)

`expo-audio`: a cross-platform audio library for playing sounds, playlists, recording audio, and capturing live PCM microphone streams using the native audio capabilities of the device.

## Signature / Usage

```sh
npx expo install expo-audio
```

```jsx
import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const audioSource = require('./assets/Hello.mp3');

export default function App() {
  const player = useAudioPlayer(audioSource);

  return (
    <View style={styles.container}>
      <Button title="Play sound" onPress={() => player.play()} />
      <Button
        title="Replay sound"
        onPress={() => {
          player.seekTo(0);
          player.play();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
```

Recording:

```jsx
import { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from 'expo-audio';

export default function App() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        // To record in the background, also set allowsBackgroundRecording: true
        // and enable the enableBackgroundRecording config plugin option.
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={recorderState.isRecording ? 'Stop recording' : 'Start recording'}
        onPress={recorderState.isRecording ? stopRecording : record}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-audio",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone.",
          "enableBackgroundPlayback": true,
          "enableBackgroundRecording": false
        }
      ]
    ]
  }
}
```

Background playback with lock screen controls:

```jsx
import { View, Button } from 'react-native';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useEffect } from 'react';

export default function AudioPlayerScreen() {
  const audioSource = require('./assets/audio.mp3');
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    // Configure audio session for background playback
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
  }, []);

  const handlePlay = () => {
    // Enable lock screen controls with metadata
    player.setActiveForLockScreen(true, {
      title: 'My Audio Title',
      artist: 'Artist Name',
      albumTitle: 'Album Name',
      artworkUrl: 'https://example.com/artwork.jpg', // optional
    });

    // Start playback - this will continue in the background
    player.play();
  };

  const handleStop = () => {
    player.pause();
    // Optionally disable lock screen controls when done
    player.setActiveForLockScreen(false);
  };

  return (
    <View>
      <Button title="Play" onPress={handlePlay} />
      <Button title="Stop" onPress={handleStop} />
    </View>
  );
}
```

Preload at module scope and create a player directly:

```tsx
import { Button } from 'react-native';
import { preload, useAudioPlayer } from 'expo-audio';

const track1 = 'https://example.com/track1.mp3';
const track2 = 'https://example.com/track2.mp3';

// Preload at module scope — starts buffering immediately
preload(track1);
preload(track2, { preferredForwardBufferDuration: 20 });

export default function App() {
  const player = useAudioPlayer(track1);
  // Playback starts near-instantly because the source was preloaded
  return <Button title="Play" onPress={() => player.play()} />;
}
```

```tsx
// Fragment: `audioSource` stands for any `AudioSource` (for example a URL string).
import { createAudioPlayer } from 'expo-audio';
const player = createAudioPlayer(audioSource);
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| microphonePermission (iOS) | `"Allow $(PRODUCT_NAME) to access your microphone"` | `NSMicrophoneUsageDescription` message. `false` disables the permission: recording is unavailable and `getRecordingPermissionsAsync()` resolves with `denied`. |
| recordAudioAndroid (Android) | `true` | Enable the `RECORD_AUDIO` permission. |
| enableBackgroundRecording | `false` | Android: recording foreground service, permissions and a persistent notification. iOS: `audio` background mode. Significant battery impact. |
| enableBackgroundPlayback | `true` | Android: media playback foreground service and lock screen controls; required for sustained background playback. iOS: `audio` background mode. |

Background playback adds Android `FOREGROUND_SERVICE` and `FOREGROUND_SERVICE_MEDIA_PLAYBACK` plus an `AudioControlsService` media playback foreground service; background recording adds `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MICROPHONE`, `POST_NOTIFICATIONS` and a recording foreground service. Without CNG, declare them manually in AndroidManifest.xml (service `expo.modules.audio.service.AudioControlsService`, `android:foregroundServiceType="mediaPlayback"`, intent-filter action `androidx.media3.session.MediaSessionService`) and add `UIBackgroundModes` `audio` to Info.plist.

### Hooks and module functions

| Function | Returns | Description |
| --- | --- | --- |
| `useAudioPlayer(source?: AudioSource, options?: AudioPlayerOptions)` | `AudioPlayer` | Creates a player released on unmount; starts loading immediately. `source` defaults to `null`, `options` to `{}`. |
| `useAudioPlayerStatus(player: AudioPlayer)` | `AudioStatus` | Real-time playback status. |
| `useAudioPlaylist(options?: AudioPlaylistOptions)` | `AudioPlaylist` | Playlist with gapless playback, released on unmount. |
| `useAudioPlaylistStatus(playlist: AudioPlaylist)` | `AudioPlaylistStatus` | Real-time playlist status. |
| `useAudioRecorder(options: RecordingOptions, statusListener?: (status: RecordingStatus) => void)` | `AudioRecorder` | Recorder managed by the component lifecycle. |
| `useAudioRecorderState(recorder: AudioRecorder, interval?: number)` | `RecorderState` | Polls recorder state; `interval` defaults to `500` ms. |
| `useAudioSampleListener(player: AudioPlayer, listener: (data: AudioSample) => void)` | `void` | Enables sampling and subscribes to waveform data. Requires `RECORD_AUDIO` on Android; not supported on all platforms. |
| `useAudioStream(options?: AudioStreamOptions)` | `AudioStreamResult` | Native stream for real-time PCM microphone capture (call `stream.start()` / `stream.stop()`; needs microphone permission). |
| `createAudioPlayer(source?, options?)` | `AudioPlayer` | Player that does not release automatically; you must call `release()` or risk memory leaks. |
| `createAudioPlaylist(options?)` | `AudioPlaylist` | Playlist that does not release automatically. |
| `preload(source: AudioSource, options?: PreloadOptions)` | `Promise<void>` | Preloads for near-instant playback; call at module scope before components render. |
| `clearPreloadedSource(source)` / `clearAllPreloadedSources()` | `Promise<void>` | Release preloaded sources. |
| `getPreloadedSources()` | `Promise<string[]>` | URIs of preloaded sources. On iOS they are removed once consumed by `useAudioPlayer()`, `createAudioPlayer()` or `player.replace()`; on Android and web they remain until cleared. |
| `getRecordingPermissionsAsync()` | `Promise<PermissionResponse>` | Checks microphone permission without prompting. |
| `requestRecordingPermissionsAsync()` | `Promise<PermissionResponse>` | Requests microphone permission (`RECORD_AUDIO` on Android). |
| `requestNotificationPermissionsAsync()` | `Promise<PermissionResponse>` | Android-only; throws on other platforms. Needed to show media controls in the notification shade. |
| `setAudioModeAsync(mode: Partial<AudioMode>)` | `Promise<void>` | Configures global audio behavior; only the specified properties are updated. |
| `setIsAudioActiveAsync(active: boolean)` | `Promise<void>` | `false` pauses all audio and prevents new audio. |

### RecordingPresets

`RecordingPresets.HIGH_QUALITY`:

```ts
RecordingPresets.HIGH_QUALITY = {
 extension: '.m4a',
  sampleRate: 44100,
  numberOfChannels: 2,
  bitRate: 128000,
  android: {
    outputFormat: 'mpeg4',
    audioEncoder: 'aac',
  },
  ios: {
    outputFormat: IOSOutputFormat.MPEG4AAC,
    audioQuality: AudioQuality.MAX,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};
```

`RecordingPresets.LOW_QUALITY`:

```ts
RecordingPresets.LOW_QUALITY = {
  extension: '.m4a',
  sampleRate: 44100,
  numberOfChannels: 2,
  bitRate: 64000,
  android: {
    extension: '.3gp',
    outputFormat: '3gp',
    audioEncoder: 'amr_nb',
  },
  ios: {
    audioQuality: AudioQuality.MIN,
    outputFormat: IOSOutputFormat.MPEG4AAC,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};
```

### AudioPlayer (class extends SharedObject<AudioEvents>)

| Property | Type | Description |
| --- | --- | --- |
| id | `string` | Unique identifier. |
| currentTime | `number` | Position in seconds. |
| duration | `number` | Total duration in seconds. |
| playing / paused | `boolean` | Playback state. |
| loop | `boolean` | Looping. |
| muted | `boolean` | Muted. |
| volume | `number` | `0.0` to `1.0`. |
| playbackRate | `number` | Android `0.1` to `2.0`; iOS `0.0` to `2.0`; Web follows the browser. |
| shouldCorrectPitch | `boolean` | Whether pitch is corrected for a changed rate. |
| isLoaded / isBuffering | `boolean` | Loading and buffering state. |
| isAudioSamplingSupported | `boolean` | Whether audio sampling is supported on the platform. |

| Method | Returns | Description |
| --- | --- | --- |
| `play()` / `pause()` | `void` | Start / pause. |
| `remove()` | `void` | Remove the player from memory. |
| `replace(source: AudioSource)` | `void` | Replace the source. |
| `seekTo(seconds: number, toleranceMillisBefore?: number, toleranceMillisAfter?: number)` | `Promise<void>` | Tolerances are iOS only. |
| `setPlaybackRate(rate: number, pitchCorrectionQuality?: PitchCorrectionQuality)` | `void` | Sets the rate. |
| `setActiveForLockScreen(active: boolean, metadata?: AudioMetadata, options?: AudioLockScreenOptions)` | `void` | Only one player or playlist controls the lock screen at a time. `interruptionMode` must be `doNotMix` or `doNotMixPersistent`. |
| `updateLockScreenMetadata(metadata: AudioMetadata)` | `void` | Only effective when the player is active for lock screen. |
| `clearLockScreenControls()` | `void` | Removes the player from lock screen controls. |

### AudioPlaylist (class extends SharedObject<AudioPlaylistEvents>)

Properties: `currentIndex` (read only), `currentTime`, `duration` (current track), `id`, `isBuffering`, `isLoaded`, `loop: AudioPlaylistLoopMode`, `muted`, `playbackRate`, `playing`, `sources: AudioSourceInfo[]` (read only), `trackCount` (read only), `volume` (`0.0` to `1.0`).

| Method | Description |
| --- | --- |
| `add(source)` / `insert(source, index)` / `remove(index)` / `clear()` | Edit the track list. |
| `play()` / `pause()` / `next()` / `previous()` / `skipTo(index)` | Control playback. At the end with loop `'all'`, `next()` wraps to the first track; with `'none'` it does nothing (same for `previous()` at the beginning). |
| `seekTo(seconds): Promise<void>` | Seek. |
| `setActiveForLockScreen(active, metadata?, options?)` / `updateLockScreenMetadata(metadata)` / `clearLockScreenControls()` | Lock screen controls (same `interruptionMode` requirement). |
| `destroy()` | Free resources. |

### AudioRecorder (class extends SharedObject<RecordingEvents>)

Properties: `currentTime` (seconds), `id`, `isRecording`, `uri: string | null`.

| Method | Returns | Description |
| --- | --- | --- |
| `prepareToRecordAsync(options?: Partial<RecordingOptions>)` | `Promise<void>` | Prepares the recording. |
| `record(options?: RecordingStartOptions)` | `void` | Starts recording. |
| `pause()` | `void` | Pauses. |
| `stop()` | `Promise<void>` | Stops. |
| `getStatus()` | `RecorderState` | Current status. |
| `getAvailableInputs()` / `getCurrentInput()` | `RecordingInput[]` / `Promise<RecordingInput>` | Only after the recorder is prepared. |
| `setInput(inputUid: string)` | `void` | Sets the current input. |
| `recordForDuration(seconds)` | `void` | Deprecated: use `record({ forDuration: seconds })`. |
| `startRecordingAtTime(seconds)` | `void` | Deprecated: use `record({ atTime: seconds })`. |

### AudioStream (class extends SharedObject<AudioStreamEvents>)

Properties: `channels` and `sampleRate` (read only, actual values, available after `start()`), `id`, `isStreaming` (read only).

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `start()` | all | `Promise<void>` | Begins capturing; call `requestRecordingPermissionsAsync()` first. |
| `stop()` | all | `void` | Stops and releases native resources; finalizes any file recording. |
| `startFileRecordingAsync(options?: AudioStreamFileRecordingOptions)` | Android, iOS | `Promise<{ uri: string }>` | Writes captured audio to a file alongside live delivery. Stream must be running; one file recording at a time. Default: WAV in the cache directory. |
| `stopFileRecordingAsync()` | Android, iOS | `Promise<AudioStreamFileRecordingResult>` | Finalizes the file recording; throws if none is in progress. |

### Types

`AudioSource`: `string | number | null | { assetId?: number (exclusive with uri; ignored when both), headers?: Record<string, string>, name?: string, uri?: string }`. `AudioSourceInfo`: `{ name?: string, uri?: string }`.

`AudioPlayerOptions`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| updateInterval | `number` | `500` ms | Interval of playback status updates (Android, iOS, Web). |
| downloadFirst | `boolean` | `false` | Download to the device before loading (Android, iOS, Web). Android and iOS use the tmp directory; web uses memory (CORS applies to the blob URL, so `Access-Control-Allow-Origin` is needed). |
| keepAudioSessionActive | `boolean` | `false` | Keep the audio session (iOS) or audio focus (Android) active after pause or finish. Deactivate manually with `setIsAudioActiveAsync(false)`. |
| preferredForwardBufferDuration | `number` | `0` (system) | Seconds to buffer ahead (Android, iOS). |
| allowsExternalPlayback (iOS) | `boolean` | `true` | Switch to AirPlay external playback mode. |
| crossOrigin (Web) | `'anonymous' \| 'use-credentials'` | `undefined` | Cross-origin policy. |

`AudioMode` (use with `setAudioModeAsync`)

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| playsInSilentMode | `boolean` | `true` | Allow playback in silent mode. On Android, `false` suppresses playback when the ringer is silent or vibrate. |
| interruptionMode | `InterruptionMode` | `'mixWithOthers'` | Interaction with other audio sessions. |
| shouldPlayInBackground | `boolean` | `false` | Keep the session active in the background. On Android, enable lock screen controls via `setActiveForLockScreen` or audio stops after about 3 minutes (OS limitation); configure the plugin. |
| allowsRecording (iOS) | `boolean` | `false` | Allow recording in the audio session. |
| allowsBackgroundRecording (Android, iOS) | `boolean` | `false` | Continue recording in the background. |
| shouldRouteThroughEarpiece | `boolean` | `false` | Route through the earpiece. On iOS only effective when `allowsRecording` is `true`. |
| interruptionModeAndroid (Android) | `InterruptionModeAndroid` | — | Deprecated: use `interruptionMode`. |

`InterruptionMode`: `'mixWithOthers'` | `'doNotMix'` (transient exclusive focus) | `'doNotMixPersistent'` (persistent exclusive focus; set `keepAudioSessionActive` to keep the session active) | `'duckOthers'`. On Android `mixWithOthers` requests no audio focus, so no focus-loss callbacks (e.g. phone calls). `InterruptionModeAndroid` is a deprecated alias.

`AudioStatus`: `{ id, currentTime, duration, didJustFinish, error: string | null, isBuffering, isLive, isLoaded, loop, mute, playbackRate, playbackState: string, playing, reasonForWaitingToPlay: string, timeControlStatus: string, shouldCorrectPitch?: boolean, currentOffsetFromLive?: number | null (Android, iOS), mediaServicesDidReset?: boolean (iOS; the player auto-recovers) }`.

`AudioPlaylistStatus`: `{ id, currentIndex, currentTime, duration, didJustFinish, isBuffering, isLoaded, loop: AudioPlaylistLoopMode, muted, playbackRate, playing, trackCount, volume }`. `AudioPlaylistLoopMode`: `'none'` | `'single'` | `'all'`. `AudioPlaylistOptions`: `{ sources?: AudioSource[] (default []), loop?: AudioPlaylistLoopMode (default 'none'), updateInterval?: number (default 500), crossOrigin?: 'anonymous' | 'use-credentials' (Web) }`.

Events: `AudioEvents` = `{ audioSampleUpdate(data: AudioSample), playbackStatusUpdate(status: AudioStatus) }`; `AudioPlaylistEvents` = `{ playlistStatusUpdate(status: AudioPlaylistStatus), trackChanged({ currentIndex, previousIndex }) }`; `RecordingEvents` = `{ recordingStatusUpdate(status: RecordingStatus) }`; `AudioStreamEvents` = `{ audioStreamBuffer(buffer: AudioStreamBuffer), audioStreamStatus(status: AudioStreamStatus) }`. `AudioLoadOptions` is a deprecated alias of `AudioPlayerOptions`.

`AudioSample`: `{ channels: AudioSampleChannel[], timestamp: number }`; `AudioSampleChannel`: `{ frames: number[] }` (PCM values between -1.0 and 1.0).

`AudioMetadata`: `{ albumTitle?, artist?, artworkUrl?, title? }` (strings). `AudioLockScreenOptions`: `{ isLiveStream?, showNextTrack?, showPreviousTrack?, showSeekBackward?, showSeekForward? }` (booleans; `isLiveStream` hides duration and scrub bar and disables seek).

`PreloadOptions`: `{ preferredForwardBufferDuration?: number }` (default `10`; Android, iOS). `PitchCorrectionQuality` (iOS): `'low' | 'medium' | 'high'`.

`RecordingOptions`

| Property | Type | Description |
| --- | --- | --- |
| extension | `string` | File extension, e.g. `.caf`. |
| sampleRate | `number` | e.g. `44100`. |
| numberOfChannels | `number` | e.g. `2`. |
| bitRate | `number` | e.g. `128000`. |
| directory | `RecordingDirectory` | `'cache'` (default) or `'document'` (Android, iOS). |
| fileName | `string` | Basename without extension (Android, iOS). Written to `<directory>/Audio/<fileName><extension>` on Android and `<directory>/ExpoAudio/<fileName><extension>` on iOS; random UUID if omitted. Path separators and `..` are rejected. |
| isMeteringEnabled | `boolean` | Put audio levels under `metering` in the status. |
| android | `RecordingOptionsAndroid` | `{ outputFormat: AndroidOutputFormat, audioEncoder: AndroidAudioEncoder, audioSource?: RecordingSource, extension?: string, maxFileSize?: number, sampleRate?: number }` |
| ios | `RecordingOptionsIos` | `{ audioQuality: AudioQuality \| number, outputFormat?: string \| IOSOutputFormat \| number, extension?, sampleRate?, bitDepthHint?, bitRateStrategy?, linearPCMBitDepth?, linearPCMIsBigEndian?, linearPCMIsFloat? }` |
| web | `RecordingOptionsWeb` | `{ mimeType?: string, bitsPerSecond?: number }` (passed to `MediaRecorder`) |

`RecordingStartOptions`: `{ atTime?: number (iOS only; recorder is active but silent during the delay), forDuration?: number (seconds; pause time does not count) }`. `RecordingDirectory`: `'cache'` | `'document'` (Android, iOS). `RecordingSource` (Android): `'camcorder' | 'default' | 'mic' | 'remote_submix' | 'unprocessed' | 'voice_communication' | 'voice_performance' | 'voice_recognition'`. `AndroidAudioEncoder`: `'default' | 'amr_nb' | 'amr_wb' | 'aac' | 'he_aac' | 'aac_eld'`. `AndroidOutputFormat`: `'default' | '3gp' | 'mpeg4' | 'amrnb' | 'amrwb' | 'aac_adts' | 'mpeg2ts' | 'webm'`. `BitRateStrategy`: `'constant' | 'longTermAverage' | 'variableConstrained' | 'variable'`.

`RecorderState`: `{ canRecord, durationMillis, fileSize (bytes flushed to disk; on web updates when the browser delivers data), isRecording, mediaServicesDidReset, metering?: number, url: string | null }`. `RecordingStatus`: `{ id, error: string | null, hasError, isFinished, url: string | null, mediaServicesDidReset?: boolean (iOS; the recorder must be re-prepared) }`. `RecordingInput`: `{ name, type, uid }`.

`AudioStreamOptions`: `{ channels?: number (default 1), encoding?: AudioStreamEncoding (default 'float32'), onBuffer?: (buffer: AudioStreamBuffer) => void, sampleRate?: number (default 48000 Hz; actual rate may differ) }`. `AudioStreamEncoding`: `'float32'` (4 bytes per sample, -1.0 to 1.0) | `'int16'` (2 bytes, little-endian signed). `AudioStreamBuffer`: `{ channels, data: ArrayBuffer (interleaved for multi-channel), sampleRate, timestamp (seconds since start) }`. `AudioStreamStatus`: `{ isStreaming }`. `AudioStreamResult`: `{ isStreaming, stream: AudioStream }`. `AudioStreamFileRecordingOptions`: `{ directory?: RecordingDirectory (default 'cache'), format?: 'wav' | 'pcm' (default 'wav'), uri?: string }`. `AudioStreamFileRecordingResult`: `{ channels, duration, encoding, sampleRate, size (bytes; WAV includes the 44-byte header), uri }`.

`PermissionResponse`: `{ canAskAgain, expires: 'never' | number, granted, status: PermissionStatus }`; `PermissionStatus`: `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"`.

Enums:

- `AudioQuality`: `MIN = 0`, `LOW = 32`, `MEDIUM = 64`, `HIGH = 96`, `MAX = 127`.
- `IOSOutputFormat` (iOS): `MPEGLAYER1 = ".mp1"`, `MPEGLAYER2 = ".mp2"`, `MPEGLAYER3 = ".mp3"`, `MPEG4AAC = "aac "`, `MPEG4AAC_ELD = "aace"`, `MPEG4AAC_ELD_SBR = "aacf"`, `MPEG4AAC_ELD_V2 = "aacg"`, `MPEG4AAC_HE = "aach"`, `MPEG4AAC_LD = "aacl"`, `MPEG4AAC_HE_V2 = "aacp"`, `MPEG4AAC_SPATIAL = "aacs"`, `AC3 = "ac-3"`, `AES3 = "aes3"`, `APPLELOSSLESS = "alac"`, `ALAW = "alaw"`, `AUDIBLE = "AUDB"`, `60958AC3 = "cac3"`, `MPEG4CELP = "celp"`, `ENHANCEDAC3 = "ec-3"`, `MPEG4HVXC = "hvxc"`, `ILBC = "ilbc"`, `APPLEIMA4 = "ima4"`, `LINEARPCM = "lpcm"`, `MACE3 = "MAC3"`, `MACE6 = "MAC6"`, `AMR = "samr"`, `AMR_WB = "sawb"`, `DVIINTELIMA = 1836253201`, `MICROSOFTGSM = 1836253233`, `QUALCOMM = "Qclp"`, `QDESIGN2 = "QDM2"`, `QDESIGN = "QDMC"`, `MPEG4TWINVQ = "twvq"`, `ULAW = "ulaw"`.

## Notes

- The preload snippet adds the `Button` import, which the original omits; the `createAudioPlayer(audioSource)` snippet is a fragment (`audioSource` is not defined in the original).
- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Package `expo-audio`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-audio`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- Audio stops automatically if headphones or Bluetooth audio devices are disconnected. For advanced audio graphs (Web Audio API style), the page recommends React Native Audio API from Software Mansion.
- Recordings are saved to the app cache directory by default, which the system may purge. Pass `{ ...RecordingPresets.HIGH_QUALITY, directory: 'document' }` to keep them, or move them with `expo-file-system`.
- Android background playback needs `setActiveForLockScreen` for sustained playback; a media notification and foreground service keep it alive. Android background recording shows a non-dismissable "Recording audio" notification with a stop button and works without the notification permission (the notification then appears only in the Task Manager). iOS needs no extra indicators beyond the status bar.
- Web: Chrome MediaRecorder produces WebM files missing duration metadata; encoding options differ across browsers (polyfills such as opus-media-recorder or audio-recorder-polyfill help; options to `prepareToRecordAsync` are passed to MediaRecorder); the site must be served securely to access the microphone.
- This is `expo-audio`. The legacy `expo-av` Audio API is not covered by this page.

## Related

- [Video](./video.md)
- [Camera](./camera.md)
