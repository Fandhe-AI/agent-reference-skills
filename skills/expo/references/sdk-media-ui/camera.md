---
source: https://docs.expo.dev/versions/v58.0.0/sdk/camera/
---

# Camera

`expo-camera`: a React component (`CameraView`) that renders a preview of the device's front or back camera. Zoom, torch and flash mode are adjustable; photos and videos are saved to the app's cache; barcodes in the preview can be detected; system barcode and document scanners are available.

## Signature / Usage

```sh
npx expo install expo-camera
```

```tsx
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: { flex: 1, alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true,
          "barcodeScannerEnabled": true
        }
      ]
    ]
  }
}
```

Barcode settings and document scanning:

```tsx
<CameraView
  barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }}
/>
```

```ts
const result = await CameraView.scanDocumentAsync({ requestPdf: true });
if (result) {
  console.log(result.pages); // ['file:///.../DocumentScanner/<uuid>.jpg', ...]
  console.log(result.pdfUri); // 'file:///.../DocumentScanner/<uuid>.pdf'
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| cameraPermission (iOS) | `"Allow $(PRODUCT_NAME) to access your camera"` | `NSCameraUsageDescription` message. |
| microphonePermission (iOS) | `"Allow $(PRODUCT_NAME) to access your microphone"` | `NSMicrophoneUsageDescription` message. |
| recordAudioAndroid (Android) | `true` | Enable the `RECORD_AUDIO` permission. |
| barcodeScannerEnabled | `true` | Enable barcode scanning support; disabling reduces app size. On Android it only takes effect when `expo-camera` builds from source (prebuilt modules already include the libraries): add `expo-camera` to `buildFromSource` in package.json. |

To localize the iOS permission messages, add `NSCameraUsageDescription` / `NSMicrophoneUsageDescription` to the `ios` object in each locale file and keep `cameraPermission` / `microphonePermission` at their defaults.

Without CNG, add Android `android.permission.CAMERA` (and `RECORD_AUDIO` when recording with audio) and this maven block to android/build.gradle, plus iOS `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` in Info.plist:

```groovy
allprojects {
  repositories {
      // * Your other repositories here *
      // * Add a new maven block after other repositories / blocks *
      maven {
          // expo-camera bundles a custom com.google.android:cameraview
          url "$rootDir/../node_modules/expo-camera/android/maven"
      }
  }
}
```

### CameraView props

Type: `React.Component<CameraViewProps>`. Inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| facing | `CameraType` | `'back'` | `'front'` or `'back'` camera. |
| mode | `CameraMode` | `'picture'` | `'picture'` or `'video'` output. |
| flash | `FlashMode` | `'off'` | Flash mode. |
| enableTorch | `boolean` | `false` | Torch on/off. |
| zoom | `number` | `0` | `0` to `1`, percentage of the device's max zoom. |
| mirror | `boolean` | `false` | Mirror the image with the front camera. |
| mute | `boolean` | `false` | Record video without sound. |
| animateShutter | `boolean` | `true` | Shutter animation. |
| active (iOS) | `boolean` | `true` | Stops the camera session when `false` without unmounting. |
| autofocus (iOS) | `FocusMode` | `off` | Focus mode. |
| barcodeScannerSettings | `BarcodeSettings` | — | Barcode types to scan. |
| pictureSize | `string` | — | Size for `takePictureAsync`; from `getAvailablePictureSizesAsync`. Setting it makes `ratio` ignored. |
| ratio (Android) | `CameraRatio` | — | Preview aspect ratio (`4:3`, `16:9`, `1:1`). Changes the preview scaleType from `FILL` to `FIT`. Unsupported sizes use the closest supported ratio. |
| poster (Web) | `string` | — | Image URL shown while the camera loads. |
| videoBitrate | `number` | — | Bits per second, e.g. `10_000_000`. On iOS the video codec must be specified in `recordAsync`. |
| videoQuality | `VideoQuality` | — | `2160p`, `1080p`, `720p`, `480p` (16:9; Android only) or `4:3` (640x480). Falls back to the highest available. |
| videoStabilizationMode | `VideoStabilization` | `'auto'` | Stabilization mode for recording. |
| selectedLens (iOS) | `string` | — | `deviceType` of the lens (e.g. `"AVCaptureDeviceTypeBuiltInUltraWideCamera"`) from `getAvailableLensesAsync` / `onAvailableLensesChanged`. Falls back to the default camera for the position. |
| responsiveOrientationWhenOrientationLocked (iOS) | `boolean` | — | Allow responsive orientation when the screen orientation is locked. |
| onCameraReady | `() => void` | — | Preview has been set. |
| onMountError | `(event: CameraMountError) => void` | — | Preview could not start. |
| onBarcodeScanned | `(scanningResult: BarcodeScanningResult) => void` | — | A barcode was scanned. |
| onAvailableLensesChanged (iOS) | `(event: AvailableLenses) => void` | — | Available lenses changed. |
| onRecordingProgress (Android, iOS) | `(event: RecordingProgress) => void` | — | Called repeatedly during recording (about every 500 ms by default; configure with `progressUpdateInterval`). Not delivered while paused. |
| onResponsiveOrientationChanged (iOS) | `(event: ResponsiveOrientationChanged) => void` | — | Only applicable if `responsiveOrientationWhenOrientationLocked` is `true`. |

### Static methods

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `dismissScanner()` | iOS | `Promise<void>` | Dismisses the scanner from `launchScanner`. On Android it is dismissed automatically after a scan. |
| `getAvailableVideoCodecsAsync()` | iOS | `Promise<VideoCodec[]>` | Available video codecs. |
| `isAvailableAsync()` | Web | `Promise<boolean>` | Whether the device has a camera (not influenced by the Permissions API or HTTP usage). |
| `launchScanner(options?: ScanningOptions)` | Android, iOS | `Promise<void>` | Android: Google code scanner. iOS: modal `DataScannerViewController` (iOS 16+). |
| `onModernBarcodeScanned(listener: (event: ScanningResult) => void)` | Android, iOS | `EventSubscription` | Listener for scans from `launchScanner`. |
| `scanDocumentAsync(options?: DocumentScanningOptions)` | Android, iOS | `Promise<DocumentScanningResult \| null>` | System document scanner (iOS VisionKit `VNDocumentCameraViewController`; Android ML Kit document scanner). Pages and PDF are written to the cache directory; `null` if cancelled or unavailable. |
| `Camera.scanFromURLAsync(url: string, barcodeTypes?: BarcodeType[])` | Android, iOS, Web | `Promise<BarcodeScanningResult[]>` | Scans barcodes in the image at the URL. Only QR codes on iOS; on Android the barcode should fill most of the image. |

### Component methods

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getAvailableLensesAsync()` | iOS | `Promise<LensInfo[]>` | Lenses of the selected camera. |
| `getAvailablePictureSizesAsync()` | all | `Promise<string[]>` | Picture sizes for `pictureSize`. Varies across Android devices. |
| `getSupportedFeatures()` | all | `{ isModernBarcodeScannerAvailable: boolean, toggleRecordingAsyncAvailable: boolean }` | Supported camera features. |
| `pausePreview()` / `resumePreview()` | all | `Promise<void>` | Pause or resume the preview. Avoid `takePictureAsync` while paused. |
| `recordAsync(options?: CameraRecordingOptions)` | Android, iOS | `Promise<{ uri: string } \| undefined>` | Records video to the cache directory (rotated to device orientation). Flipping the camera stops the recording. Resolves when `stopRecording` is called, `maxDuration` / `maxFileSize` is reached, or the preview stops; includes `codec` on iOS. |
| `stopRecording()` | Android, iOS | `void` | Stops a recording. |
| `takePictureAsync(options: CameraPictureOptions & { pictureRef: true })` | all | `Promise<PictureRef>` | Returns a reference to the native image instance. |
| `takePictureAsync(options?: CameraPictureOptions)` | all | `Promise<CameraCapturedPicture>` | Saves the picture to the cache directory (rotated and scaled to match the preview unless `skipProcessing`). Wait for `onCameraReady` first. |
| `toggleRecordingAsync()` | all | `Promise<void \| undefined>` | Pauses or resumes a recording. iOS 18 only. |

On native platforms the local image URI is temporary; make a permanent copy with the `expo-file-system` `File` instance method `copy()` / `copySync()` (e.g. `new File(photo.uri).copy(new File(Paths.document, "photo.jpg"))`). On web `uri` is a base64 string.

### Hooks

| Hook | Returns |
| --- | --- |
| `useCameraPermissions(options?: PermissionHookOptions<object>)` | `[PermissionResponse \| null, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]` |
| `useMicrophonePermissions(options?: PermissionHookOptions<object>)` | same tuple, for the microphone |

```ts
const [status, requestPermission] = useCameraPermissions();
```

### CameraNativeModule (class extends NativeModule<CameraEvents>)

Read-only properties: `dismissScanner`, `FlashMode` (`Record<keyof FlashMode, ...>`), `getAvailableVideoCodecsAsync`, `getCameraPermissionsAsync`, `getMicrophonePermissionsAsync`, `isAvailableAsync`, `isDocumentScannerAvailable: boolean`, `isModernBarcodeScannerAvailable: boolean`, `launchScanner`, `requestCameraPermissionsAsync`, `requestMicrophonePermissionsAsync`, `scanDocumentAsync`, `scanFromURLAsync`, `toggleRecordingAsyncAvailable: boolean`, `Type` (`Record<keyof CameraType, ...>`).

### PictureRef (class extends SharedRef<'image'>)

| Member | Type | Description |
| --- | --- | --- |
| height / width | `number` | Image dimensions. |
| nativeRefType | `string` | Type of the native reference. |
| `savePictureAsync(options?: SavePictureOptions)` | `Promise<PhotoResult>` | Saves the image to the cache directory. |

### Types

| Type | Definition |
| --- | --- |
| `AvailableLenses` | `{ lenses: LensInfo[] }` |
| `LensInfo` | `{ deviceType: string, localizedName: string }` |
| `BarcodeBounds` | `{ origin: BarcodePoint, size: BarcodeSize }` |
| `BarcodePoint` | `Point` (`{ x: number, y: number }`) in camera source coordinates |
| `BarcodeSize` | `{ height: number, width: number }` |
| `BarcodeScanningResult` | `{ bounds: BarcodeBounds, cornerPoints: BarcodePoint[], data: string, extra?: AndroidBarcode (Android), type: string }`. `bounds` may be empty and does not always bound the whole barcode. `cornerPoints` may be empty (iOS: not for `code39` and `pdf417`). Corner order: Android `topLeft, topRight, bottomRight, bottomLeft`; iOS `bottomLeft, bottomRight, topLeft, topRight`; Web `topLeft, topRight, bottomRight, bottomLeft`. |
| `ScanningResult` | `Omit<BarcodeScanningResult, 'bounds' \| 'cornerPoints'>` |
| `BarcodeSettings` | `{ barcodeTypes: BarcodeType[] }` |
| `BarcodeType` | `'aztec' \| 'ean13' \| 'ean8' \| 'qr' \| 'pdf417' \| 'upc_e' \| 'datamatrix' \| 'code39' \| 'code93' \| 'itf14' \| 'codabar' \| 'code128' \| 'upc_a'` |
| `ScanningOptions` (iOS) | `{ barcodeTypes: BarcodeType[], isGuidanceEnabled?: boolean (default true), isHighlightingEnabled?: boolean (default false), isPinchToZoomEnabled?: boolean (default true) }` |
| `CameraCapturedPicture` | `{ base64?: string, exif?: Partial<MediaTrackSettings> \| any, format: 'jpg' \| 'png', height: number, uri: string, width: number }` |
| `CameraMode` | `'picture' \| 'video'` |
| `CameraType` | `'front' \| 'back'` |
| `CameraRatio` | `'4:3' \| '16:9' \| '1:1'` |
| `CameraOrientation` | `'portrait' \| 'portraitUpsideDown' \| 'landscapeLeft' \| 'landscapeRight'` |
| `CameraMountError` | `{ message: string }` |
| `CameraEvents` | `{ onModernBarcodeScanned: (event: ScanningResult) => void }` |
| `FlashMode` | `'off'` (disabled) \| `'on'` (fires on every capture) \| `'auto'` \| `'screen'` (screen flash for front camera selfies; Android uses CameraX screen flash, iOS maps to `'on'` which triggers Retina Flash) |
| `FocusMode` | `'on'` (autofocus once then lock) \| `'off'` (focus automatically when needed); default `off` |
| `ImageType` | `'png' \| 'jpg'` |
| `VideoCodec` (iOS) | `'avc1' \| 'hvc1' \| 'jpeg' \| 'apcn' \| 'ap4h'` |
| `VideoQuality` | `'2160p' \| '1080p' \| '720p' \| '480p' \| '4:3'` |
| `VideoStabilization` | `'off' \| 'standard' \| 'cinematic' \| 'auto'`. On Android all but `off` enable stabilization; the method is device-determined. |
| `RecordingProgress` | `{ duration: number (seconds), fileSize: number (bytes), maxDuration?: number (seconds) }` |
| `ResponsiveOrientationChanged` | `{ orientation: CameraOrientation }` |
| `PhotoResult` | `{ base64?: string, height: number, uri: string, width: number }` |
| `SavePictureOptions` | `{ base64?: boolean, metadata?: Record<string, any>, quality?: number }` (quality `0` to `1`) |
| `DocumentScanningOptions` | `{ quality?: number (0 to 1, default 1; no effect on Android), requestPdf?: boolean (default false) }` |
| `DocumentScanningResult` | `{ pages: string[] (file:// URIs), pdfUri?: string (only when requestPdf is true) }` |
| `PermissionResponse` | `{ canAskAgain: boolean, expires: 'never' \| number, granted: boolean, status: PermissionStatus }` |

`PermissionStatus`: `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"`.

`CameraPictureOptions`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| quality | `number` | `1` | Compression `0` (small) to `1` (max quality). |
| base64 | `boolean` | — | Also include Base64 data. |
| exif | `boolean` | — | Also include EXIF data. |
| additionalExif (Android, iOS) | `Record<string, any>` | — | Extra EXIF, only useful with `exif: true`. Keys are standard EXIF tag names (`UserComment`, `ImageDescription`, `GPSLatitude`); unknown keys are silently ignored. `GPSLatitude` / `GPSLongitude` accept signed decimal degrees. |
| onPictureSaved | `(picture: CameraCapturedPicture) => void` | — | If set, the promise resolves immediately with no data and the data is passed to this callback. |
| pictureRef | `boolean` | — | Return an image ref usable in the `Image` component. |
| shutterSound | `boolean` | `true` | Disable the shutter sound by setting `false`. |
| skipProcessing | `boolean` | — | Skip orientation adjustment and return the raw camera image; `quality` is discarded. May display in the wrong orientation because `Image` ignores EXIF orientation. |
| mirror (Android, iOS) | `boolean` | `false` | Deprecated: use the `mirror` prop on `CameraView`. |
| imageType / isImageMirror / scale (Web) | `ImageType` / `boolean` / `number` | — | Web-only. |

`CameraRecordingOptions`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| codec (iOS) | `VideoCodec` | — | Codec to record with. |
| maxDuration | `number` | — | Max duration in seconds. |
| maxFileSize | `number` | — | Max size in bytes. |
| mirror | `boolean` | — | Deprecated: use the `mirror` prop on `CameraView`. iOS flips front-camera videos by default; `true` reverses that. Android is handled in device settings. |
| progressUpdateInterval | `number` | `0.5` | Seconds between `onRecordingProgress` events; values below `0.1` clamp to `0.1`. |

### Permissions

| Platform | Permission / key | Description |
| --- | --- | --- |
| Android | `CAMERA` | Added automatically. |
| Android | `RECORD_AUDIO` | Add to `expo.android.permissions` in app.json to record video with audio. |
| iOS | `NSCameraUsageDescription` | Why the app requests camera access. |
| iOS | `NSMicrophoneUsageDescription` | Why the app requests microphone access. |

## Notes

- Platforms: Android (device only), iOS (device only), Web, included in Expo Go. Package `expo-camera`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-camera`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- The source text says `FileSystem.copy`, but its link targets the `File#copy(destination, options)` instance method of `expo-file-system`; there is no module-level `FileSystem.copy` function (the legacy `copyAsync` lives in `expo-file-system/legacy`).
- Only one camera preview can be active at a time; unmount `CameraView` when a screen is unfocused.
- Wait for `onCameraReady` before calling `takePictureAsync`. While the preview is paused, `takePictureAsync` throws on Android and captures the last frame on iOS.
- Web: image URIs are always base64 strings. In cross-origin iframes in Chrome 64+, add `allow="microphone; camera;"` to the iframe element.
- This is the `expo-camera` JS component (`CameraView`), unrelated to the native Android/iOS camera APIs. ImagePicker's `launchCameraAsync` is the system camera UI alternative.

## Related

- [ImagePicker](./image-picker.md)
- [MediaLibrary](./media-library.md)
- [GLView](./gl-view.md)
- [Video](./video.md)
