# AVAudioSession

Singleton that communicates to the system how your app intends to use audio. Controls category, mode, routing, and interruption handling.

## Signature / Usage

```swift
let session = AVAudioSession.sharedInstance()
do {
    try session.setCategory(.playback, mode: .moviePlayback)
    try session.setActive(true)
} catch {
    print("Audio session configuration failed: \(error)")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `category` | `AVAudioSession.Category` | Current session category (read-only) |
| `mode` | `AVAudioSession.Mode` | Current session mode (read-only) |
| `categoryOptions` | `CategoryOptions` | Active options for the current category (read-only) |
| `isOtherAudioPlaying` | `Bool` | Whether another app is currently playing audio (read-only) |
| `isOutputMuted` | `Bool` | Whether output is muted (read-only) |
| `renderingMode` | `RenderingMode` | Current rendering mode: mono, stereo, or spatial (read-only) |

### Common Categories

| Category | Use Case |
|----------|----------|
| `.playback` | Music or audio central to the app |
| `.record` | Recording only; silences playback |
| `.playAndRecord` | Simultaneous recording and playback (VoIP) |
| `.ambient` | Mixes with other audio; silenced by lock screen |
| `.soloAmbient` | Default; silences others |

### Common Options

| Option | Effect |
|--------|--------|
| `duckOthers` | Lowers other audio volume |
| `allowBluetooth` | Enables Bluetooth HFP devices |
| `allowBluetoothA2DP` | Enables Bluetooth A2DP devices |
| `defaultToSpeaker` | Routes to speaker when no headset connected |

## Notes

- iOS 3.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ (not available on macOS without Catalyst)
- Activate the session when playback begins, not at app launch, to avoid interrupting background audio
- Observe `AVAudioSession.interruptionNotification` and `routeChangeNotification` to respond to system events
- For background audio on iOS, enable the "Audio, AirPlay, and Picture in Picture" capability in Xcode

## Related

- [AVAudioPlayer](./avaudioplayer.md)
- [AVAudioRecorder](./avaudiorecorder.md)
- [AVAudioEngine](./avaudioengine.md)
