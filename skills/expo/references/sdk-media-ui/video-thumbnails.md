---
source: https://docs.expo.dev/versions/v58.0.0/sdk/video-thumbnails/
---

# VideoThumbnails

`expo-video-thumbnails`: generates an image to serve as a thumbnail from a video file. Deprecated.

## Signature / Usage

```sh
npx expo install expo-video-thumbnails
```

```jsx
import * as VideoThumbnails from 'expo-video-thumbnails';

const { uri } = await VideoThumbnails.getThumbnailAsync(
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  {
    time: 15000,
  }
);
```

`VideoThumbnails.getThumbnailAsync(sourceFilename: string, options?: VideoThumbnailsOptions): Promise<VideoThumbnailsResult>` (Android, iOS, tvOS). `sourceFilename` is a local or remote URI of the video; `options` defaults to `{}`.

## Options / Props

`VideoThumbnailsOptions`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| headers | `Record<string, string>` | — | Passed in the network request when `sourceFilename` is a remote URI. |
| quality | `number` | — | `0.0` - `1.0`. `1` means no compression (highest quality), `0` the highest compression. |
| time | `number` | — | Time position (ms) where the image is retrieved. |

`VideoThumbnailsResult`:

| Name | Type | Description |
| --- | --- | --- |
| height | `number` | Height of the created image. |
| uri | `string` | URI of the created image (usable as source for an Image/Video element). |
| width | `number` | Width of the created image. |

## Notes

- Deprecated: the library is deprecated in favor of `generateThumbnailsAsync` from `expo-video`. `expo-video-thumbnails` is not receiving patches and, per the original text, "will be removed in SDK 56" (text as it appears on the v58.0.0 page).
- Platforms: Android, iOS, tvOS, included in Expo Go. Source `https://github.com/expo/expo/tree/sdk-58/packages/expo-video-thumbnails`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).

## Related

- [Video (expo-video)](./video.md)
