---
source: https://docs.expo.dev/versions/v58.0.0/sdk/imagepicker/
---

# ImagePicker

`expo-image-picker`: access to the system UI for selecting images and videos from the phone's library or taking a photo with the camera.

## Signature / Usage

```sh
npx expo install expo-image-picker
```

```tsx
import { useState } from 'react';
import { Alert, Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Camera access always requires the user's permission.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the camera is required.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 200, height: 200 },
});
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends.",
          "colors": {
            "cropToolbarColor": "#000000"
          },
          "dark": {
            "colors": {
              "cropToolbarColor": "#000000"
            }
          }
        }
      ]
    ]
  }
}
```

Without CNG, add these keys to **ios/[app]/Info.plist**:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Give $(PRODUCT_NAME) permission to save photos</string>
<key>NSCameraUsageDescription</key>
<string>Give $(PRODUCT_NAME) permission to access your camera</string>
<key>NSMicrophoneUsageDescription</key>
<string>Give $(PRODUCT_NAME) permission to use your microphone</string>
```

## Options / Props

### Config plugin properties

By default the plugin adds the `RECORD_AUDIO` permission on Android; set `microphonePermission` to `false` to remove it.

| Name | Default | Description |
| --- | --- | --- |
| photosPermission (iOS) | `"Allow $(PRODUCT_NAME) to access your photos"` | `NSPhotoLibraryUsageDescription` message. |
| cameraPermission | `"Allow $(PRODUCT_NAME) to access your camera"` | `NSCameraUsageDescription` message. `false` blocks the `CAMERA` permission on Android. |
| microphonePermission | `"Allow $(PRODUCT_NAME) to access your microphone"` | `NSMicrophoneUsageDescription` message. `false` blocks `RECORD_AUDIO` on Android. |
| colors (Android) | `undefined` | Colors for the crop UI in light mode. |
| colors.cropToolbarColor (Android) | `#00000000` | Crop toolbar background. |
| colors.cropToolbarIconColor (Android) | `#000000` | Crop toolbar icon color. |
| colors.cropToolbarActionTextColor (Android) | `#000000` | Crop toolbar action text color. |
| colors.cropBackButtonIconColor (Android) | `#000000` | Crop toolbar back button icon color. |
| colors.cropBackgroundColor (Android) | `#ffffff` | Crop screen background. |
| dark.colors (Android) | `{ cropToolbarColor: "#00000000", cropToolbarIconColor: "#ffffff", cropToolbarActionTextColor: "#ffffff", cropBackButtonIconColor: "#ffffff", cropBackgroundColor: "#000000" }` | Crop UI colors in dark mode. |

### Hooks

| Hook | Returns | Description |
| --- | --- | --- |
| `ImagePicker.useCameraPermissions(options?: PermissionHookOptions<object>)` | `[PermissionResponse \| null, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]` | Check or request camera permissions. |
| `ImagePicker.useMediaLibraryPermissions(options?: PermissionHookOptions<{ writeOnly: boolean }>)` | `[MediaLibraryPermissionResponse \| null, RequestPermissionMethod<MediaLibraryPermissionResponse>, GetPermissionMethod<MediaLibraryPermissionResponse>]` | Check or request media library permissions. |

```ts
const [status, requestPermission] = ImagePicker.useCameraPermissions();
```

### Methods (Android, iOS, Web)

| Method | Returns | Description |
| --- | --- | --- |
| `getCameraPermissionsAsync()` | `Promise<PermissionResponse>` | Checks camera permissions. |
| `getMediaLibraryPermissionsAsync(writeOnly?: boolean)` | `Promise<MediaLibraryPermissionResponse>` | Checks photo permissions. `writeOnly` defaults to `false`. |
| `getPendingResultAsync()` | `Promise<ImagePickerErrorResult \| ImagePickerResult \| null>` | Android may kill `MainActivity` after the picker finishes; retrieves the lost data. On other platforms `null`. Test with "Don't keep activities". |
| `launchCameraAsync(options?: ImagePickerOptions)` | `Promise<ImagePickerResult>` | System UI for taking a photo. Requires camera permission. On mobile web it must be called directly from a user interaction. |
| `launchImageLibraryAsync(options?: ImagePickerOptions)` | `Promise<ImagePickerResult>` | System UI for choosing an image or video. On mobile web it must be called directly from a user interaction. |
| `requestCameraPermissionsAsync()` | `Promise<PermissionResponse>` | Asks for camera permission. Does nothing on web. |
| `requestMediaLibraryPermissionsAsync(writeOnly?: boolean)` | `Promise<MediaLibraryPermissionResponse>` | Asks for photo permission. Does nothing on web. |

### ImagePickerOptions

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| mediaTypes | `MediaType \| MediaType[] \| MediaTypeOptions` | `'images'` | Type of media to pick. |
| allowsEditing (Android, iOS) | `boolean` | `false` | Show edit UI after pick (Android crop and rotate, iOS crop). Mutually exclusive with `allowsMultipleSelection`; ignored on iOS if multiple selection is enabled. Cropping a .bmp on iOS converts it to .png. |
| allowsMultipleSelection (Android, iOS 14+, Web) | `boolean` | `false` | Select multiple files. If enabled, `allowsEditing` is ignored. |
| selectionLimit (Android, iOS 14+) | `number` | `0` | Max selectable items with `allowsMultipleSelection`. `0` = system maximum. |
| aspect | `[number, number]` | — | Aspect ratio for editing; Android only (on iOS the crop rectangle is always square). |
| quality (Android, iOS) | `number` | `1.0` | Compression quality `0` to `1`. Ignored on iOS for selected .bmp or .png. Output can be bigger than the original if it was compressed before. |
| base64 | `boolean` | — | Also include Base64 data. |
| exif (Android, iOS) | `boolean` | — | Include EXIF data. On iOS camera case it has no GPS tags. |
| cameraType | `CameraType` | `CameraType.back` | `front` or `back` camera. Android behavior depends on the installed camera app. On Web, if not provided the internal input uses "camera". |
| defaultTab (Android) | `DefaultTab` | `'photos'` | `'photos'` or `'albums'`. |
| legacy (Android) | `boolean` | `false` | Uses the legacy picker, allowing media from outside the photo library. |
| orderedSelection (iOS 15+) | `boolean` | `false` | Number badges in selection order; assets returned in that order. |
| preferredAssetRepresentationMode (iOS 14+) | `UIImagePickerPreferredAssetRepresentationMode` | `Automatic` | Maps to `PHPickerConfigurationAssetRepresentationMode`. |
| presentationStyle (iOS) | `UIImagePickerPresentationStyle` | `Automatic` | Maps to `UIModalPresentationStyle`. |
| shape (Android) | `CropShape` | `rectangle` | `'rectangle'` or `'oval'` crop area. |
| shouldDownloadFromNetwork (iOS) | `boolean` | `false` | Allows downloading from iCloud for the direct resource read used for Live Photos and for videos when `videoExportPreset` is `Passthrough`. For videos a slower fallback fetches from iCloud when disabled; Live Photos have no fallback, so enable it for them. |
| videoExportPreset (iOS 11+) | `VideoExportPreset` | `Passthrough` | Deprecated (see Apple's `videoExportPreset`). Compression preset for selected videos. |
| videoMaxDuration | `number` | `0` | Max seconds for video recording; `0` disables the limit. iOS: limited to 10 minutes when `allowsEditing` is `true`. Android depends on the camera app. No effect on Web. |
| videoQuality (iOS) | `UIImagePickerControllerQualityType` | `High` | Quality of recorded videos. |

### Result types

`ImagePickerResult` = `ImagePickerSuccessResult` (`{ assets: ImagePickerAsset[], canceled: false }`) | `ImagePickerCanceledResult` (`{ assets: null, canceled: true }`). `ImagePickerErrorResult`: `{ code: string, exception?: string, message: string }`.

`ImagePickerAsset`

| Property | Type | Description |
| --- | --- | --- |
| uri | `string` | URI to the local image or video file. |
| width / height | `number` | Dimensions; can be `0` if the system did not provide them. |
| assetId (Android, iOS) | `string \| null` | Unique ID if picked from the library; usable with expo-media-library. May be `null` (e.g. limited permission, or file-system browsing on Android). |
| base64 | `string \| null` | Base64 JPEG data when the `base64` option is truthy. |
| duration | `number \| null` | Video length in milliseconds, `null` if not a video. |
| exif (Android, iOS) | `Record<string, any> \| null` | EXIF data when the `exif` option is truthy. |
| file (Web) | `File` | Web `File` object for upload with `FormData`. |
| fileName | `string \| null` | Preferred filename. |
| fileSize | `number` | Size in bytes. |
| mimeType | `string` | MIME type. |
| pairedVideoAsset (iOS) | `ImagePickerAsset \| null` | Video paired with the image; set only when `livePhotos` was in `mediaTypes` and a live photo was selected. |
| type | `'image' \| 'video' \| 'livePhoto' \| 'pairedVideo' \| null` | `livePhoto` and `pairedVideo` are iOS only; `null` is rare (some Android ContentProviders). |

`MediaType`: `'images'` | `'videos'` | `'livePhotos'` (iOS only; ignored on Android and Web, ignored when `allowsEditing` is enabled, returned at original quality regardless of `quality`).

`MediaTypeOptions` (deprecated; use `MediaType[]`): `All`, `Images`, `Videos`.

`MediaLibraryPermissionResponse`: `PermissionResponse` plus `accessPrivileges?: 'all' | 'limited' | 'none'` (`'limited'` only on Android API 34+ and iOS 14.0+).

`PermissionResponse`: `canAskAgain: boolean`, `expires: 'never' | number`, `granted: boolean`, `status: PermissionStatus` (`DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"`). `CameraPermissionResponse` is an alias.

Enums:

- `CameraType`: `back = "back"`, `front = "front"`.
- `UIImagePickerControllerQualityType`: `High = 0`, `Medium = 1`, `Low = 2`, `VGA640x480 = 3`, `IFrame1280x720 = 4`, `IFrame960x540 = 5`.
- `UIImagePickerPreferredAssetRepresentationMode`: `Automatic = "automatic"`, `Compatible = "compatible"`, `Current = "current"` (avoids transcoding if possible).
- `UIImagePickerPresentationStyle`: `AUTOMATIC = "automatic"`, `CURRENT_CONTEXT = "currentContext"`, `FORM_SHEET = "formSheet"`, `FULL_SCREEN = "fullScreen"`, `OVER_CURRENT_CONTEXT = "overCurrentContext"`, `OVER_FULL_SCREEN = "overFullScreen"`, `PAGE_SHEET = "pageSheet"`, `POPOVER = "popover"`.
- `VideoExportPreset`: `Passthrough = 0` (unchanged, no compression), `LowQuality = 1`, `MediumQuality = 2`, `HighestQuality = 3` (device-dependent, H.264 / AAC), `H264_640x480 = 4`, `H264_960x540 = 5`, `H264_1280x720 = 6`, `H264_1920x1080 = 7`, `H264_3840x2160 = 8`, `HEVC_1920x1080 = 9`, `HEVC_3840x2160 = 10`.

### Permissions

| Platform | Permission / key | Description |
| --- | --- | --- |
| Android | `CAMERA` | Access the camera device. |
| Android | `READ_EXTERNAL_STORAGE` | Read from external storage. |
| Android | `WRITE_EXTERNAL_STORAGE` | Write to external storage. |
| iOS | `NSMicrophoneUsageDescription` | Why the app requests microphone access. |
| iOS | `NSPhotoLibraryUsageDescription` | Why the app requests photo library access. |
| iOS | `NSCameraUsageDescription` | Why the app requests camera access. |

## Notes

- Platforms: Android, iOS, Web, included in Expo Go. Package `expo-image-picker`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-image-picker`. Pinned to Expo SDK 58 docs (modificationDate in the source applies to the whole page).
- Known issue: on iOS, picking a higher-resolution image from the camera roll can give a wrong cropped rectangle in some cases (bug in the underlying `UIImagePickerController`).
- SDK 54 and later: defaults are `allowsEditing: false` and `videoExportPreset: 'Passthrough'`, which return the original asset (including HEIC and AVIF) instantly, but iOS then needs media library permission and shows a permission dialog right after a video is selected. Request media library permission before opening the picker (`requestMediaLibraryPermissionsAsync` or `useMediaLibraryPermissions`).
- Animated GIFs on Android: the result stays animated only if `quality` is explicitly `1.0` and `allowsEditing` is `false`; otherwise the first frame is returned as PNG. On iOS both quality and cropping are supported.
- On Web, the picker UI can only be shown after user activation (such as a button press); calling it from `componentDidMount` does not work, and the `cancelled` event is not returned in the browser.
- The official example also calls `requestMediaLibraryPermissionsAsync()` before `launchImageLibraryAsync`; it is omitted here because launching the library needs no permission (request it only for iOS videos with `allowsEditing: false` and the `Passthrough` preset).
- Handle `MainActivity` destruction on Android with `getPendingResultAsync`.
- Official examples exist for AWS S3 (`expo/examples` with-aws-storage-upload) and Firebase (with-firebase-storage-upload).

## Related

- [MediaLibrary](./media-library.md)
- [Camera](./camera.md)
- [ImageManipulator](./image-manipulator.md)
