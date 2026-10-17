---
source: https://docs.expo.dev/versions/v58.0.0/sdk/image/
---

# Image

`expo-image`: a cross-platform React component that loads and renders images. Supports disk and memory caching, BlurHash / ThumbHash placeholders, source-change transitions, and the CSS `object-fit` / `object-position` semantics (`contentFit`, `contentPosition`). Uses SDWebImage and Glide under the hood.

## Signature / Usage

```sh
npx expo install expo-image
```

```jsx
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
```

Native resources (Xcode asset catalogs / Android drawables) load by name; omit the extension and set dimensions manually:

```tsx
import { Image } from 'expo-image';

export default function AppIcon() {
  return <Image source={{ uri: 'app_icon' }} style={{ width: 40, height: 40 }} />;
}
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image",
        {
          "disableLibdav1d": true
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| disableLibdav1d (iOS) | `false` | When `true`, skips adding the bundled `libavif/libdav1d` Pod. Use when another dependency (such as `FFmpegKit`) already links `libdav1d`. Removes AVIF support on iOS unless another decoder is available. |

Without CNG, set `EXPO_IMAGE_DISABLE_LIBDAV1D=1` before `pod install`, or add `ENV['EXPO_IMAGE_DISABLE_LIBDAV1D'] ||= '0'` to the top of the `Podfile`.

### Image props

Type: `React.PureComponent<ImageProps>`. Inherits `Omit<ViewProps, 'style' | 'children'>`. Some props come from React Native Image for easier migration; all of those are deprecated and might be removed.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| source | `number \| string[] \| string & undefined \| ImageSource \| SharedRef<'image'> \| ImageSource[] \| sf:<symbol>` | — | Remote URL, local file resource, or `require()` result. With an array, the source that best fits the container size and is closest to the screen scale is chosen (provide `width`, `height`, `scale`). iOS SF Symbols use the `sf:` prefix, e.g. `sf:star.fill`. |
| placeholder | `string \| number \| string[] \| ImageSource \| SharedRef<'image'> \| ImageSource[] \| null` | — | Image shown while loading and when no image has been displayed yet or the source is unset. |
| placeholderContentFit | `ImageContentFit` | `'scale-down'` | How the placeholder is resized. Set it to match `contentFit` to avoid flicker with low-resolution placeholders. |
| contentFit | `ImageContentFit` | `'cover'` | Mirrors CSS `object-fit`: `'cover'` \| `'contain'` \| `'fill'` \| `'none'` \| `'scale-down'`. |
| contentPosition | `ImageContentPosition` | `'center'` | Mirrors CSS `object-position`; used with `contentFit`. |
| cachePolicy | `'none' \| 'disk' \| 'memory' \| 'memory-disk' \| null` | `'disk'` | Whether and where to cache the image. Memory cache may be purged quickly. |
| transition | `number \| ImageTransition \| null` | — | How to transition when the source changes. A number is the duration (ms) of `'cross-dissolve'`. |
| priority | `'normal' \| 'low' \| 'high' \| null` | `'normal'` | Load priority; best effort. |
| recyclingKey (Android, iOS) | `string \| null` | `null` | Changing it resets the view to blank/placeholder before loading; useful for recycling lists such as FlashList. |
| allowDownscaling | `boolean` | `true` | Downscale to the container size. Never used when `contentFit` is `none` or `fill`. |
| blurRadius | `number` | `0` | Blur radius in points. Not applied to placeholders. |
| tintColor | `string \| null` | `null` | Tints template images. Not applied to placeholders. When a `useImage` result is the source, use `useImage`'s `tintColor` option instead. |
| svgVariables (Android, iOS) | `Record<string, string \| number> \| null` | — | Values for CSS custom properties an SVG refers to with `var()`; substituted before parsing so the image stays a vector. Keys include the leading `--`. No effect on non-SVG sources. |
| autoplay (Android, iOS) | `boolean` | `true` | Auto-play animated images. |
| decodeFormat (Android) | `ImageDecodeFormat` | `'argb'` | `'argb'` (32-bit with alpha) or `'rgb'` (16-bit no alpha). Not guaranteed. |
| enableLiveTextInteraction (iOS 16.0+) | `boolean` | `false` | Enables Live Text interaction. |
| enforceEarlyResizing (iOS) | `boolean` | `false` | Force early resizing to the container size to reduce memory; may affect `resizeType` and `contentPosition` on dynamic resize. |
| preferHighDynamicRange (iOS 17.0+, tvOS 17.0+) | `boolean` | `false` | Allow extended dynamic range (HDR); otherwise SDR. |
| useAppleWebpCodec (iOS) | `boolean` | `true` | Use Apple's default WebP codec. Set `false` to use libwebp (more standard-compliant; Apple's codec is faster but may blend or time animated WebP incorrectly). |
| sfEffect (iOS 17.0+) | `SFSymbolEffect \| null` | — | SF Symbol effect animation: string, object, or array of both. |
| responsivePolicy (Web) | `'static' \| 'live' \| 'initial'` | `'static'` | Source selection based on container/viewport size. `static` uses generated `srcset`/`sizes` (works with static rendering); `initial` selects on mount; `live` on every resize (these two do not work with static rendering). |
| loading (Web) | `'lazy' \| 'eager'` | `'lazy'` when `responsivePolicy` is `'static'`, else `'eager'` | Sets the HTML `loading` attribute. No effect on native. |
| draggable (Web) | `boolean` | `undefined` | Whether the `img` element is draggable. |
| accessibilityLabel | `string` | `undefined` | Text read by screen reader; sets `alt` on web. |
| alt | `string` | `undefined` | Alias for `accessibilityLabel`. |
| accessible (Android, iOS) | `boolean` | `false` | Marks the view as an accessibility element. On Android maps to `isScreenReaderFocusable`. |
| accessibilityElementsHidden (iOS) | `boolean` | `false` | Hides contained accessibility elements from the screen reader. |
| focusable (Android) | `boolean` | `false` | Focusable with non-touch input / hardware keyboard. |
| onDisplay | `() => void` | — | Called when the source image was successfully rendered. |
| onError | `(event: ImageErrorEventData) => void` | — | Called on image fetching error. |
| onLoad | `(event: ImageLoadEventData) => void` | — | Called when load completes successfully. |
| onLoadEnd | `() => void` | — | Called when load succeeds or fails. |
| onLoadStart | `() => void` | — | Called when load starts. |
| onProgress | `(event: ImageProgressEventData) => void` | — | Called possibly multiple times while loading with loaded/total bytes. |
| defaultSource (deprecated) | `ImageSource \| null` | — | Deprecated; use `placeholder`. |
| loadingIndicatorSource (deprecated) | `ImageSource \| null` | — | Deprecated; use `placeholder`. |
| fadeDuration (deprecated) | `number` | — | Deprecated; use `transition` with a duration. |
| resizeMode (deprecated) | `'center' \| 'cover' \| 'contain' \| 'repeat' \| 'stretch'` | — | Deprecated; `"repeat"` is not supported at all. Use `contentFit` and `contentPosition`. |

`sfEffect` examples:

```tsx
// Single effect as string
sfEffect="bounce"

// Single effect as object with options
sfEffect={{ effect: "bounce", repeat: -1, scope: "by-layer" }}

// Array of mixed strings and objects
sfEffect={["bounce", { effect: "pulse", repeat: -1 }]}
```

`svgVariables` example:

```tsx
// house.svg contains fill="var(--roof, #888)" and fill="var(--wall, #ccc)"
<Image
  source={require('./house.svg')}
  svgVariables={{ '--roof': '#ee3333', '--wall': '#3399ff', '--stroke-width': 2 }}
/>
```

### ImageBackground

Extends all `Image` props (`Omit<ImageProps, 'style'>`) with separate styling for container and image.

| Name | Type | Description |
| --- | --- | --- |
| style | `StyleProp<ViewStyle>` | Style of the image container. |
| imageStyle | `StyleProp<ImageStyle>` | Style of the image. |

### Static methods

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `clearDiskCache()` | Android, iOS | `Promise<boolean>` | Clears the disk cache. May resolve `false` on Android when the activity is no longer available; `false` on Web. |
| `clearMemoryCache()` | Android, iOS | `Promise<boolean>` | Clears the memory cache. Same resolution notes. |
| `configureCache(config: ImageCacheConfig)` | iOS | `void` | Configures the cache eviction policy. |
| `generateBlurhashAsync(source: string \| ImageRef, numberOfComponents: [number, number] \| { height: number, width: number })` | Android, iOS | `Promise<string \| null>` | Generates a Blurhash. Components must be 1 to 9, default `[4, 3]`. |
| `generateThumbhashAsync(source: string \| ImageRef)` | Android, iOS | `Promise<string>` | Generates a Thumbhash. |
| `getCachePathAsync(cacheKey: string)` | Android, iOS | `Promise<string \| null>` | Path of the cached image, or `null`. Default cache key is the source URL. |
| `loadAsync(source: string \| number \| ImageSource, options?: ImageLoadOptions)` | Android, iOS, Web | `Promise<ImageRef>` | Loads an image into memory. On Android without `maxWidth`/`maxHeight`, large images may be downsampled to the platform bitmap limit, so `ImageRef.width`/`height` may differ. |
| `prefetch(urls: string \| string[], cachePolicy?: 'disk' \| 'memory' \| 'memory-disk')` | all | `Promise<boolean>` | Preloads images. Use `disk` (default) or `memory-disk`. Resolves `false` immediately if any image fails. |
| `prefetch(urls: string \| string[], options?: ImagePrefetchOptions)` | all | `Promise<boolean>` | Overload with options. |
| `readFromCacheAsync(cacheKey: string)` | Android, iOS | `Promise<ImageRef \| null>` | Reads a cached image as an `ImageRef`. |
| `writeToCacheAsync(source: string \| ImageRef, cacheKey: string)` | Android, iOS | `Promise<void>` | Writes a local image to the disk cache under a key, without network. Caching an animated image from an `ImageRef` flattens it to a single frame; pass a local file URI to keep animation. |

### Component methods

| Method | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getAnimatableRef()` | all | `View \| Image \| null` | — |
| `lockResourceAsync()` | Android, iOS | `Promise<void>` | Prevents the resource from being reloaded. |
| `reloadAsync()` | Android, iOS | `Promise<void>` | Reloads the resource, ignoring lock. |
| `startAnimating()` | Android, iOS | `Promise<void>` | Starts playback of an animated image. |
| `stopAnimating()` | Android, iOS | `Promise<void>` | Stops playback of an animated image. |
| `unlockResourceAsync()` | Android, iOS | `Promise<void>` | Releases the lock. |

### useImage

```ts
import { useImage, Image } from 'expo-image';
import { Text } from 'react-native';

export default function MyImage() {
  const image = useImage('https://picsum.photos/1000/800', {
    maxWidth: 800,
    onError(error, retry) {
      console.error('Loading failed:', error.message);
    }
  });

  if (!image) {
    return <Text>Image is loading...</Text>;
  }

  return <Image source={image} style={{ width: image.width / 2, height: image.height / 2 }} />;
}
```

`useImage(source: string | number | ImageSource, options?: ImageLoadOptions, dependencies?: DependencyList): ImageRef | null` (Android, iOS, Web). Loads a new image whenever the source `uri` changes; returns `null` until the first image loads. Avoid it for large images without `maxWidth` or `maxHeight`; excessive memory use may crash.

### ImageRef (class extends SharedRef<'image'>)

Reference to a native image instance (`Drawable` on Android, `UIImage` on iOS); passable as `source` and rendered immediately.

| Property | Type | Description |
| --- | --- | --- |
| height | `number` | Read only. Logical height; multiply by `scale` for pixels. |
| width | `number` | Read only. Logical width; multiply by `scale` for pixels. |
| scale | `number` | Read only. iOS: `2.0` for `@2x` file names, else `1.0`. Android: bitmap density divided by screen density. |
| isAnimated | `boolean` | Optional, read only. Whether the image is animated. |
| mediaType (iOS) | `string \| null` | Read only. MIME type, `null` if unknown. |
| nativeRefType | `string` | The type of the native reference. |

### Types

`ImageCacheConfig` (iOS; see `SDImageCacheConfig`)

| Property | Type | Description |
| --- | --- | --- |
| maxDiskSize | `number` | Max disk cache size in bytes. `0` = no limit. |
| maxMemoryCost | `number` | Max total cost (bytes held) of the in-memory cache. `0` = no limit. |
| maxMemoryCount | `number` | Max number of objects in the in-memory cache. `0` = no limit. |

`ImageContentPosition`: an `ImageContentPositionString` (`'center'`, `'top'`, `'right'`, `'bottom'`, `'left'`, `'top center'`, `'top right'`, `'top left'`, `'right center'`, `'right top'`, `'right bottom'`, `'bottom center'`, `'bottom right'`, `'bottom left'`, `'left center'`, `'left top'`, `'left bottom'`) or an object with two edges (`{ right?, top? }`, `{ left?, top? }`, `{ bottom?, right? }`, `{ bottom?, left? }`) of `ImageContentPositionValue`. With one keyword the other axis is `'center'` (`'50%'`); `'top right'` equals `{ top: 0, right: 0 }`.

`ImageContentPositionValue`: `number` (points from the edge) | percentage string (`'100%'` = size difference between container and image) | `'center'` (alias for `'50%'`, default).

`ImageErrorEventData`: `{ error: string }`. `ImageProgressEventData`: `{ loaded: number, total: number }`.

`ImageLoadEventData`

| Property | Type |
| --- | --- |
| cacheType | `'none' \| 'disk' \| 'memory'` |
| source | `{ height: number, isAnimated: boolean, mediaType: string \| null, url: string, width: number }` |

`ImageLoadOptions` (for `useImage` / `loadAsync`)

| Property | Type | Description |
| --- | --- | --- |
| maxHeight | `number` | Resize so the image does not exceed this height in pixels, preserving aspect ratio. |
| maxWidth | `number` | Resize so the image does not exceed this width in pixels. |
| tintColor | `ColorValue \| number` | Tint for template images. Default `null`. |
| onError | `(error: Error, retry: () => void) => void` | Called on load failure; `retry` retries loading. |

`ImagePrefetchOptions`

| Property | Type | Description |
| --- | --- | --- |
| cachePolicy | `'disk' \| 'memory-disk' \| 'memory'` | Default `'memory-disk'`. |
| headers | `Record<string, string>` | Headers for prefetch requests. |

`ImageSource`

| Property | Type | Description |
| --- | --- | --- |
| uri | `string` | HTTPS address, local file path, or static image resource name. |
| blurhash | `string` | Placeholder generated from a blurhash; ignored if `uri` is set. Provide `width` and `height` (default `16`). |
| thumbhash | `string` | Placeholder generated from a thumbhash; ignored if `uri` is set. |
| cacheKey | `string` | Cache key for this image; defaults to `uri`. |
| headers | `Record<string, string>` | HTTP headers for remote images. On web the server's `Access-Control-Allow-Origin` must include the current domain. |
| width / height | `number \| null` | If known at build time, used as default `<Image/>` dimensions. |
| isAnimated (Android, iOS) | `boolean` | Whether the image is animated. |
| webMaxViewportWidth (Web) | `number` | Max viewport width for which this source is selected; only with an array source and `responsivePolicy: 'static'`. Ignored with `blurhash` / `thumbhash`. |

`ImageTransition`

| Property | Type | Description |
| --- | --- | --- |
| duration | `number` | Milliseconds. Default `0`. |
| effect | `'cross-dissolve' \| 'flip-from-top' \| 'flip-from-right' \| 'flip-from-bottom' \| 'flip-from-left' \| 'curl-up' \| 'curl-down' \| 'sf:replace' \| 'sf:down-up' \| 'sf:up-up' \| 'sf:off-up' \| null` | Default `'cross-dissolve'`. Android supports only `'cross-dissolve'`; Web does not support `'curl-up'` / `'curl-down'`. `sf:` effects animate SF Symbol source changes (iOS 17+); for bounce / pulse / scale use `sfEffect`. |
| timing | `'ease-in-out' \| 'ease-in' \| 'ease-out' \| 'linear'` | Default `'ease-in-out'`. |
| skipOnCacheHit (Android, iOS) | `'none' \| 'memory' \| 'all' \| null` | Skips the transition when the image first appears from a cache hit. `'none'` (default) always plays; `'memory'` skips for memory-cache hits; `'all'` skips for any cache hit. Locally bundled assets count as memory hits. |

```tsx
// Fade a list item in the first time it loads, but show it instantly
// when it scrolls back into view.
<Image
  source={item.uri}
  recyclingKey={item.id}
  transition={{ duration: 300, skipOnCacheHit: 'all' }}
/>
```

`SFSymbolEffectObject` (iOS 17.0+): `effect: SFSymbolEffectType`, `repeat?: number` (`-1` indefinitely, `0` play once, default `0`; `1+` repeat count), `scope?: 'by-layer' | 'whole-symbol' | null` (default system).

`SFSymbolEffectType`: `'bounce'` | `'bounce/up'` | `'bounce/down'` | `'pulse'` | `'variable-color'` | `'variable-color/iterative'` | `'variable-color/cumulative'` | `'scale'` | `'scale/up'` | `'scale/down'` | `'appear'` | `'disappear'` | `'wiggle'` | `'rotate'` | `'breathe'` | `'draw/on'` | `'draw/off'`. `wiggle` / `rotate` / `breathe` need iOS 18+; `draw/on` / `draw/off` need iOS 26+.

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Package `expo-image`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-image`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- Supported formats: WebP, PNG / APNG, AVIF, JPEG, GIF, SVG, ICO on Android, iOS and Web; HEIC on Android and iOS (not on Web); ICNS and PSD (composite preview) on iOS only.
- iOS SVG caveat: the system SVG decoder can render distorted or not render elliptical arc commands (`A` / `a`) when `large-arc-flag` and `sweep-flag` are packed (common in minified SVG, e.g. `a6 6 0 0111.573-2.226`). Separate the flags with spaces or give each arc its own command; `react-native-svg` renders these correctly.
- This is `expo-image`'s `Image`, distinct from React Native core `Image` and from `ImageManipulator` / `ImagePicker`. Core React Native components are out of scope for this skill.
- The official page also has a "Generating a blurhash on a server" guide (multer + sharp + the `blurhash` package with Express.js); it is not reproduced here.

## Related

- [ImageManipulator](./image-manipulator.md)
- [ImagePicker](./image-picker.md)
- [Symbols](./symbols.md)
