---
source: https://docs.expo.dev/versions/v58.0.0/sdk/media-library/
---

# MediaLibrary

`expo-media-library`: access to the user's media library, to read existing images and videos and save new ones. The SDK 58 API is class-based (`Asset`, `Album`, `Query`); the old function API is deprecated.

## Signature / Usage

```sh
npx expo install expo-media-library
```

```tsx
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { File, Paths } from 'expo-file-system';
import { Asset, requestPermissionsAsync } from 'expo-media-library';

export default function SaveToMediaLibraryExample() {
  const [asset, setAsset] = useState<Asset | null>(null);

  const downloadFile = async () => {
    const url = 'https://picsum.photos/200/300';
    const destinationFile = new File(Paths.cache, 'test_image.jpg');
    if (destinationFile.exists) {
      return destinationFile;
    } else {
      return File.downloadFileAsync(url, destinationFile);
    }
  };

  useEffect(() => {
    const downloadAndSaveAsset = async () => {
      const file = await downloadFile();
      const { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const asset = await Asset.create(file.uri);
      setAsset(asset);
    };

    downloadAndSaveAsset();
  }, []);

  return (
    <View>
      {asset ? (
        <>
          <Text>{asset.id}</Text>
          <Image source={{ uri: asset.id }} style={{ width: 200, height: 300 }} />
        </>
      ) : (
        <Text>Downloading and creating asset...</Text>
      )}
    </View>
  );
}
```

Query example:

```ts
const assets = await new Query()
 .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
 .lte(AssetField.HEIGHT, 1080)
 .orderBy(AssetField.CREATION_TIME)
 .limit(20)
 .exe();
```

Album example:

```ts
const album = await Album.create("My Album", [asset]);
console.log(await album.getTitle()); // "My Album"
```

## Options / Props

### Hook

| Hook | Returns | Description |
| --- | --- | --- |
| `usePermissions(options?: PermissionHookOptions<{ granularPermissions: GranularPermission[], writeOnly: boolean }>)` | `[PermissionResponse \| null, RequestPermissionMethod<PermissionResponse>, GetPermissionMethod<PermissionResponse>]` | Checks or requests media library permissions. |

```ts
const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
  writeOnly: true,
  granularPermissions: ['photo'],
});
```

### Album class

`id` (read only `string`): identifier that can re-instantiate an `Album`. Albums group images, videos or audio files.

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `add(assets: Asset \| Asset[])` | Android, iOS, tvOS | `Promise<void>` | Adds assets to the album. |
| `static create(name: string, assetsRefs: string[] \| Asset[], moveAssets?: boolean)` | Android, iOS, tvOS | `Promise<Album>` | Creates an album. `assetsRefs` are `Asset` objects or `file:///` paths. On Android `moveAssets` (default `true`) moves assets, else they are copied. |
| `delete()` | Android, iOS, tvOS | `Promise<void>` | Android: deletes the album and all its assets. iOS: deletes the album, keeps the assets. |
| `static delete(albums: Album[], deleteAssets?: boolean)` | Android, iOS, tvOS | `Promise<void>` | Deletes several albums. iOS `deleteAssets` defaults to `false`; on Android assets are always deleted. |
| `static get(title: string)` | Android, iOS, tvOS | `Promise<Album \| null>` | Album by title. |
| `static getAlbumsMetadata()` | Android, iOS, tvOS | `Promise<AlbumMetadata[]>` | Lightweight metadata for all albums in one call. |
| `static getAll()` | Android, iOS, tvOS | `Promise<Album[]>` | All albums. |
| `getAssetCount()` | Android, iOS, tvOS | `Promise<number>` | Asset count without materializing assets. |
| `getAssets()` | Android, iOS, tvOS | `Promise<Asset[]>` | All assets in the album. |
| `static getSmartAlbums()` | iOS | `Promise<Album[]>` | System smart albums (Favorites, Videos, Screenshots, ...). |
| `getTitle()` | Android, iOS, tvOS | `Promise<string>` | Display title; not guaranteed unique. |
| `getType()` | iOS | `Promise<AlbumType>` | Regular or smart album. |
| `removeAssets(assets: Asset[])` | iOS | `Promise<void>` | Removes assets from the album without deleting them. On Android an asset belongs to only one album: delete it or add it to another album. |

### Asset class

`id` (read only `string`): identifier that can re-instantiate an `Asset`.

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `static create(filePath: string, album?: Album)` | Android, iOS, tvOS | `Promise<Asset>` | Creates an asset from a local file URI, optionally in an album. |
| `delete()` | Android, iOS, tvOS | `Promise<void>` | Deletes the asset. |
| `static delete(assets: Asset[])` | Android, iOS, tvOS | `Promise<void>` | Deletes multiple assets. |
| `getAlbums()` | Android, iOS, tvOS | `Promise<Album[]>` | Albums containing the asset. |
| `getCreationTime()` | Android, iOS, tvOS | `Promise<number \| null>` | Timestamp in seconds. |
| `getDuration()` | Android, iOS, tvOS | `Promise<number \| null>` | Duration in seconds. |
| `getExif()` | Android, iOS, tvOS | `Promise<undefined>` | Map of EXIF tags. |
| `getFavorite()` | Android, iOS, tvOS | `Promise<boolean>` | iOS: member of the system "Favorites" smart album. Android: reads MediaStore `IS_FAVORITE` (Android 10+; always `false` on older). |
| `getFilename()` | Android, iOS, tvOS | `Promise<string>` | Filename. |
| `getHeight()` / `getWidth()` | Android, iOS, tvOS | `Promise<number>` | Pixels. |
| `getInfo()` | Android, iOS, tvOS | `Promise<AssetInfo>` | Complete information. On Android `isFavorite` reflects MediaStore `IS_FAVORITE`, which some third-party gallery apps do not use. |
| `getIsInCloud()` | iOS | `Promise<boolean>` | In iCloud and not available locally; does not trigger a download. |
| `getLivePhotoVideoUri()` | iOS | `Promise<string \| null>` | Paired video URI of a Live Photo, extracted to a temporary file. |
| `getLocation()` | Android, iOS, tvOS | `Promise<Location \| null>` | Location. |
| `getMediaSubtypes()` | iOS | `Promise<MediaSubtype[]>` | Variations such as Live Photo, panorama, HDR. |
| `getMediaType()` | Android, iOS, tvOS | `Promise<MediaType>` | Media type. |
| `getModificationTime()` | Android, iOS, tvOS | `Promise<number \| null>` | Timestamp in seconds. |
| `getOrientation()` | iOS | `Promise<number \| null>` | EXIF display orientation; only for `MediaType.IMAGE`. |
| `getShape()` | Android, iOS, tvOS | `Promise<Shape \| null>` | Dimensions. |
| `getUri(options?: AssetUriOptions)` | Android, iOS, tvOS | `Promise<string>` | iOS resolves to the asset as it currently appears in Photos; pass `version: AssetUriVersion.ORIGINAL` for the pre-edit file (ignored on Android). Resolving the current version of a slow-motion or trimmed video exports a file and is slower. |
| `setFavorite(isFavorite: boolean)` | Android, iOS, tvOS | `Promise<void>` | iOS: add/remove from "Favorites". Android 10+: updates `IS_FAVORITE`; no-op on older. Some third-party gallery apps keep their own favorites. |

### Query class (builder; all methods Android, iOS, tvOS)

| Method | Returns | Description |
| --- | --- | --- |
| `album(album: Album)` | `Query` | Only assets in the album. |
| `eq(field: T, value: AssetFieldValueMap[T])` | `Query` | Field equals value. |
| `gt` / `gte` / `lt` / `lte (field: AssetField, value: number)` | `Query` | Greater than / or equal / less than / or equal. |
| `within(field: T, value: array)` | `Query` | Field value is in the given array. |
| `limit(limit: number)` | `Query` | Maximum results. |
| `offset(offset: number)` | `Query` | Results to skip. |
| `orderBy(sortDescriptors: AssetField \| SortDescriptor)` | `Query` | Sort; an `AssetField` sorts ascending. |
| `exe()` | `Promise<Asset[]>` | Executes the query. |
| `exeForMetadata()` | `Promise<AssetMetadata[]>` | Lightweight metadata read cheaply from the media store, without resolving file paths or decoding files. |

### Module functions (not deprecated)

| Function | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getPermissionsAsync(writeOnly?: boolean, granularPermissions?: GranularPermission[])` | Android, iOS, tvOS | `Promise<PermissionResponse>` | Checks permissions. `writeOnly` default `false`; `granularPermissions` only affects Android 13+. |
| `requestPermissionsAsync(writeOnly?: boolean, granularPermissions?: GranularPermission[])` | Android, iOS, tvOS | `Promise<PermissionResponse>` | Requests permissions. By default asks for all possible permissions; with a custom config plugin configuration, all requested granular permissions must be included in the plugin. |
| `presentPermissionsPicker(mediaTypes?: MediaTypeFilter[])` | Android 14+, iOS | `Promise<void>` | Lets the user update which assets the app can access. Shown only if access was `limited`, otherwise a no-op. Does not report changes; subscribe with `addListener()` (`hasIncrementalChanges: false` means permissions changed). |
| `addListener(listener: (event: MediaLibraryAssetsChangeEvent) => void)` | Android, iOS, tvOS | `EventSubscription` | Fires when assets are inserted or deleted. Android invokes it with an empty object. |
| `removeAllListeners()` | Android, iOS, tvOS | `void` | Removes all listeners. |

`EventSubscription.remove()` removes the listener.

### Deprecated function API

These throw at runtime from `expo-media-library`; import them from `expo-media-library/legacy` or use the replacement.

| Function | Replacement |
| --- | --- |
| `addAssetsToAlbumAsync(assets, album, copy?)` | `album.add()` |
| `albumNeedsMigrationAsync(album)` | `expo-media-library/legacy` |
| `createAlbumAsync(albumName, asset?, copyAsset?, initialAssetLocalUri?)` | `Album.create()` |
| `createAssetAsync(localUri, album?)` | `Asset.create()` |
| `deleteAlbumsAsync(albums, assetRemove?)` | `album.delete()` or `Album.delete()` |
| `deleteAssetsAsync(assets)` | `asset.delete()` or `Asset.delete()` |
| `getAlbumAsync(title)` | `Album.get(title)` |
| `getAlbumsAsync(options?)` | `Album.getAll()` |
| `getAssetContentUriAsync(asset)` | `expo-media-library/legacy` |
| `getAssetInfoAsync(asset, options?)` | `asset.getInfo()` |
| `getAssetsAsync(assetsOptions?)` | `Query` class |
| `getMomentsAsync()` | `expo-media-library/legacy` |
| `isAvailableAsync()` | `expo-media-library/legacy` |
| `migrateAlbumIfNeededAsync(album)` | `expo-media-library/legacy` |
| `presentPermissionsPickerAsync(mediaTypes?)` | `presentPermissionsPicker()` |
| `removeAssetsFromAlbumAsync(assets, album)` | `album.removeAssets()` |
| `removeSubscription(subscription)` | `subscription.remove()` |
| `saveToLibraryAsync(localUri)` | `Asset.create()` |
| `setAssetFavoriteAsync(asset, isFavorite)` | `asset.setFavorite()` |

### Types

| Type | Definition |
| --- | --- |
| `AlbumMetadata` | `{ id: string, title: string, type: AlbumType \| null }`. `type` is iOS only (`null` on Android). |
| `AssetFieldValueMap` | `{ creationTime: number, duration: number, height: number, isFavorite: boolean, mediaType: MediaType, modificationTime: number, width: number }` |
| `AssetInfo` | `{ creationTime: number \| null, duration: number \| null, filename: string, height: number, id: string, isFavorite?: boolean, mediaType: MediaType, modificationTime: number \| null, uri: string, width: number }` |
| `AssetUriOptions` (iOS) | `{ version?: AssetUriVersion }`, default `AssetUriVersion.CURRENT`. |
| `GranularPermission` | `'audio' \| 'photo' \| 'video'` |
| `Location` | `{ latitude: number, longitude: number }` |
| `MediaLibraryAssetsChangeEvent` | `hasIncrementalChanges: boolean` (always `false` on Android; `false` means too large, do a full reload); iOS-only optional `insertedAssets`, `deletedAssets`, `updatedAssets: string[]` (`ph://` URIs, only when `hasIncrementalChanges` is `true`). |
| `MediaTypeFilter` | `'photo' \| 'video'` |
| `PermissionResponse` | `EXPermissionResponse` (`canAskAgain`, `expires: 'never' \| number`, `granted`, `status: PermissionStatus`) plus `accessPrivileges?: 'all' \| 'limited' \| 'none'`. |
| `Shape` | `{ height: number, width: number }` |
| `SortDescriptor` | `{ ascending?: boolean, key: AssetField }` |

### Enums

| Enum | Members |
| --- | --- |
| `AlbumType` (iOS; maps to `PHAssetCollectionType`) | `ALBUM = "album"`, `SMART_ALBUM = "smartAlbum"` |
| `AssetField` | `CREATION_TIME = "creationTime"`, `DURATION = "duration"`, `HEIGHT = "height"`, `IS_FAVORITE = "isFavorite"`, `MEDIA_TYPE = "mediaType"`, `MODIFICATION_TIME = "modificationTime"`, `WIDTH = "width"` |
| `AssetUriVersion` (iOS) | `CURRENT = "current"` (as in Photos, with edits), `ORIGINAL = "original"` (pre-edit file; same as `CURRENT` if never edited) |
| `MediaSubtype` (iOS; maps to `PHAssetMediaSubtype`) | `ANIMATION = "animation"`, `DEPTH_EFFECT = "depthEffect"`, `HDR = "hdr"`, `HIGH_FRAME_RATE = "highFrameRate"`, `LIVE_PHOTO = "livePhoto"`, `PANORAMA = "panorama"`, `SCREEN_RECORDING = "screenRecording"`, `SCREENSHOT = "screenshot"`, `SPATIAL_MEDIA = "spatialMedia"`, `STREAM = "stream"`, `TIME_LAPSE = "timelapse"`, `VIDEO_CINEMATIC = "videoCinematic"` |
| `MediaType` | `AUDIO = "audio"`, `IMAGE = "image"`, `UNKNOWN = "unknown"`, `VIDEO = "video"` |
| `PermissionStatus` | `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"` |

## Notes

- Platforms: Android, iOS, tvOS, included in Expo Go. Package `expo-media-library`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-media-library/src`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- On Android, full access to the media library is allowed only for apps that require broad access to photos (Google Play Photo and Video Permissions policy).
- The old function-based API (`createAssetAsync`, `getAssetsAsync`, ...) now lives in `expo-media-library/legacy`; the source says the deprecated entries on the main import throw at runtime. The page for the legacy module is `media-library-legacy` in the official docs (not collected here).
- In the source API listing the "Deprecated" blockquote precedes the heading it applies to; the mapping in the table above follows that placement. `getPermissionsAsync` and `requestPermissionsAsync` carry no deprecation notice in the source.
- `PermissionResponse.accessPrivileges` `'limited'` is documented as "only available on Android API 14+ and iOS 14.0+" in the type table (the ImagePicker page states Android API 34+).
- Event/assets note: use `ImagePicker`'s `assetId` with this module to manage a picked asset.

## Related

- [ImagePicker](./image-picker.md)
- [VideoThumbnails](./video-thumbnails.md)
- [Camera](./camera.md)
