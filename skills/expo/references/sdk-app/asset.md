---
source: https://docs.expo.dev/versions/v58.0.0/sdk/asset/
---

# Asset

`expo-asset` provides an interface to Expo's asset system: files that live alongside the app source and are needed at runtime (images, fonts, sounds), referenced with `require('path/to/file')`.

## Signature / Usage

```sh
npx expo install expo-asset
```

```tsx
import { Image } from 'react-native';
import { Asset, useAssets } from 'expo-asset';

export default function App() {
  const [assets, error] = useAssets([require('path/to/asset.jpg'), require('path/to/other.png')]);

  return assets ? <Image source={assets[0]} /> : null;
}
```

```ts
const [{ localUri }] = await Asset.loadAsync(require('./assets/snack-icon.png'));
```

## Options / Props

### Config plugin properties

```json
{
  "expo": {
    "plugins": [
      [
        "expo-asset",
        {
          "assets": ["path/to/file.png", "path/to/directory"]
        }
      ]
    ]
  }
}
```

| Name | Default | Description |
| --- | --- | --- |
| `assets` | `[]` | Asset files or directories to link to the native project, relative to the project root; file names become the resource names. Supported: images `.png` `.jpg` `.gif`; media `.mp4` `.mp3` `.lottie` `.riv`; SQLite database files `.db`; 3D models `.glb`. |

### Hook

| Name | Signature | Description |
| --- | --- | --- |
| `useAssets` | `useAssets(moduleIds: number \| number[]): [Asset[] \| undefined, Error \| undefined]` | Downloads and stores assets locally. First element: loaded assets (`undefined` until loaded); second: error. Assets are not reloaded when the list changes dynamically. |

### `Asset` class properties

| Name | Type | Description |
| --- | --- | --- |
| `downloaded` | `boolean` (default `false`) | Whether `downloadAsync()` has finished. |
| `hash` | `string \| null` (read only, default `null`) | MD5 hash of the asset data. |
| `height` | `number \| null` (default `null`) | Image height divided by the scale factor (number after `@` in filename, or `1`). |
| `localUri` | `string \| null` (default `null`) | `file://` URI of the local file after `downloadAsync()`. |
| `name` | `string` | File name without extension and without the `@` scale part. |
| `type` | `string` (read only) | Extension of the asset filename. |
| `uri` | `string` (read only) | URI of the asset data on the remote server (Expo asset server, or the Expo CLI server in development). |
| `width` | `number \| null` (default `null`) | Image width divided by the scale factor. |

### `Asset` methods

| Name | Signature | Description |
| --- | --- | --- |
| `downloadAsync()` | `Promise<Asset>` | Downloads data to the cache directory if no up-to-date local file exists; sets `localUri`. |
| `fromMetadata(meta)` | `(meta: AssetMetadata) => Asset` | Creates an `Asset` from metadata. |
| `fromModule(assetModule)` | `(string \| number \| VirtualAssetModule) => Asset` | Asset for `require('path/to/file')` or an external URL. |
| `fromURI(uri)` | `(uri: string) => Asset` | Creates an `Asset` from a URI. |
| `loadAsync(moduleId)` | `Promise<Asset[]>` | Wraps `Asset.fromModule(module).downloadAsync`; accepts one or an array of modules / URLs. |

### Types

| Name | Shape |
| --- | --- |
| `AssetDescriptor` | `{ hash?: string \| null; height?: number \| null; name: string; type: string; uri: string; width?: number \| null }` |
| `AssetMetadata` | `Pick<PackagerAsset, 'httpServerLocation' \| 'name' \| 'hash' \| 'type' \| 'scales' \| 'width' \| 'height'>` plus `fileHashes?: string[]`, `fileUris?: string[]`, `uri?: string` |

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- The useAssets snippet adds the Image import and a component wrapper not present in the official fragment.
- Files downloaded via `downloadAsync` are stored in the caches directory as `ExponentAsset-{cacheFileId}.{extension}`; persistence between sessions is not guaranteed. To clear manually use `expo-file-system`: `Paths.cache.delete()` (or legacy `deleteAsync(cacheDirectory)`).
- `uri`: if not using Classic Updates (legacy), ignore this field because assets are on device before app logic runs.
- For `.db` files see the SQLite API reference; for `.lottie` / `.riv` add the extension to `assetExts` in the Metro config.
- Source: `sdk-58` branch `packages/expo-asset`; modificationDate September 15, 2026.

## Related

- [Font](./font.md)
- [Expo](./expo.md)
