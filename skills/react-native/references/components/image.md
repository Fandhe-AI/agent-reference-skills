---
source: https://reactnative.dev/docs/0.87/image
---

# Image

A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

## Signature / Usage

For network and data images, you will need to manually specify the dimensions of your image.

```tsx
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImage;
```

Styled image:

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

<Image
  style={styles.stretch}
  source={require('@expo/snack-static/react-native-logo.png')}
/>
```

### GIF and WebP support on Android

When building your own native code, GIF and WebP are not supported by default on Android. Add optional modules in `android/app/build.gradle`, depending on the needs of your app.

```groovy
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:3.6.0'

  // For WebP support, including animated WebP
  implementation 'com.facebook.fresco:animated-webp:3.6.0'
  implementation 'com.facebook.fresco:webpsupport:3.6.0'

  // For WebP support, without animations
  implementation 'com.facebook.fresco:webpsupport:3.6.0'
}
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| accessible | bool | `false` | | When true, indicates the image is an accessibility element. |
| accessibilityLabel | string | | | The text that's read by the screen reader when the user interacts with the image. |
| alt | string | | | Alternative text description of the image, read by the screen reader. Using this automatically marks the element as accessible. |
| blurRadius | number | | | The blur radius of the blur filter added to the image. On iOS, you will need to increase `blurRadius` by more than `5`. |
| capInsets | Rect | | iOS | When the image is resized, the corners of the size specified by `capInsets` stay a fixed size, but the center content and borders are stretched. |
| crossOrigin | enum(`'anonymous'`, `'use-credentials'`) | `'anonymous'` | | CORS mode to use when fetching the image resource, similar to the HTML crossorigin attribute. `anonymous`: no exchange of user credentials. `use-credentials`: sets `Access-Control-Allow-Credentials` to `true`. |
| defaultSource | ImageSource | | | A static image to display while loading the image source. On Android, the default source prop is ignored on debug builds. |
| fadeDuration | number | `300` | Android | Fade animation duration in milliseconds. |
| height | number | | | Height of the image component. |
| loadingIndicatorSource | ImageSource (`uri` only), number | | | Resource used to render the loading indicator, displayed until the image is ready (typically after download). |
| onError | `({nativeEvent: {error}}) => void` | | | Invoked on load error. |
| onLayout | `({nativeEvent: LayoutEvent}) => void` | | | Invoked on mount and on layout changes. |
| onLoad | `({nativeEvent: ImageLoadEvent}) => void` | | | Invoked when load completes successfully. Example: `onLoad={({nativeEvent: {source: {width, height}}}) => setImageRealSize({width, height})}`. |
| onLoadEnd | `() => void` | | | Invoked when load either succeeds or fails. |
| onLoadStart | `() => void` | | | Invoked on load start. |
| onPartialLoad | `() => void` | | iOS | Invoked when a partial load of the image is complete; meant for progressive JPEG loads. |
| onProgress | `({nativeEvent: {loaded, total}}) => void` | | | Invoked on download progress. |
| progressiveRenderingEnabled | bool | `false` | Android | When `true`, enables progressive jpeg streaming. |
| referrerPolicy | enum(`'no-referrer'`, `'no-referrer-when-downgrade'`, `'origin'`, `'origin-when-cross-origin'`, `'same-origin'`, `'strict-origin'`, `'strict-origin-when-cross-origin'`, `'unsafe-url'`) | `'strict-origin-when-cross-origin'` | | Sets the value for the `Referrer-Policy` header in the image request. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| resizeMethod | enum(`'auto'`, `'resize'`, `'scale'`, `'none'`) | `'auto'` | Android | Mechanism used to resize the image when dimensions differ. `auto`: heuristics to pick between `resize` and `scale`. `resize`: software operation that changes the encoded image in memory before decoding (use when the image is much larger than the view). `scale`: image is drawn downscaled or upscaled (faster, higher quality; use if smaller than, or slightly bigger than, the view). `none`: no sampling, full resolution; considered unsafe because Android throws a runtime exception for images that consume too much memory. |
| resizeMode | enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` | | How to resize the image when the frame doesn't match the raw image dimensions. `cover`: scale uniformly so both dimensions are equal to or larger than the view's (minus padding) and at least one equals it. `contain`: scale uniformly so both dimensions are equal to or less than the view's. `stretch`: scale width and height independently (may change aspect ratio). `repeat`: repeat the image to cover the frame. `center`: center the image; scale down uniformly if larger than the view. |
| resizeMultiplier | number | `1.0` | Android | When `resizeMethod` is `resize`, the destination dimensions are multiplied by this value and `scale` performs the remainder. Most useful when destination dimensions are small and the source image is significantly larger. |
| source | ImageSource | | | The image source (either a remote URL or a local file resource). May contain several remote URLs with width, height and scale/other URI arguments; the native side picks the best `uri` for the measured container size. A `cache` property controls how networked requests interact with the local cache. Supported formats: `png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp`, `psd` (iOS only); iOS also supports several RAW formats. `webp` is supported on iOS only when bundled with the JavaScript code. |
| src | string | | | The remote URL of the image. Has precedence over `source`. Example: `src={'https://reactnative.dev/img/tiny_logo.png'}`. |
| srcSet | string | | | Comma separated list of candidate image sources, each a URL with a pixel density descriptor (defaults to `1x`). If it has no `1x` descriptor, `src` is used as the `1x` source. Has precedence over both `src` and `source`. |
| style | Image Style Props, Layout Props, Shadow Props, Transforms | | | Image style. |
| testID | string | | | A unique identifier for this element to be used in UI Automation testing scripts. |
| tintColor | color | | | Changes the color of all non-transparent pixels to the `tintColor`. |
| width | number | | | Width of the image component. |

### Methods

```tsx
static abortPrefetch(requestId: number);                       // Android
static getSize(uri: string): Promise<{width: number, height: number}>;
static getSizeWithHeaders(
  uri: string,
  headers: {[index: string]: string}
): Promise<{width: number, height: number}>;
await Image.prefetch(url);
static queryCache(
  urls: string[],
): Promise<Record<string, 'memory' | 'disk' | 'disk/memory'>>;
static resolveAssetSource(source: ImageSourcePropType): {
  height: number;
  width: number;
  scale: number;
  uri: string;
};
```

| Method | Parameters | Description |
| --- | --- | --- |
| abortPrefetch() (Android) | `requestId` (number, required): request id as returned by `prefetch()` | Abort prefetch request. |
| getSize() | `uri` (string, required) | Retrieve the width and height (in pixels) of an image prior to displaying it. Can fail if the image cannot be found or fails to download. May need to load/download the image first, after which it is cached; not optimized for preloading. |
| getSizeWithHeaders() | `uri` (string, required); `headers` (object, required) | Same as `getSize()` with the ability to provide request headers. Does not work for static image resources. |
| prefetch() | `url` (string, required); `callback` (function, Android): called with the `requestId` | Prefetches a remote image for later use by downloading it to the disk cache. Returns a promise which resolves to a boolean. |
| queryCache() | `urls` (array, required) | Perform cache interrogation. Resolves to a mapping from URL to cache status ("disk", "memory" or "disk/memory"); a URL missing from the mapping is not in the cache. |
| resolveAssetSource() | `source` (ImageSource or number, required): a number (opaque type returned by `require('./foo.png')`) or an ImageSource | Resolves an asset reference into an object with `uri`, `scale`, `width`, and `height`. |

### Type Definitions

#### ImageCacheEnum (iOS)

Enum for the cache handling or strategy for potentially cached responses: `'default'` (default), `'reload'`, `'force-cache'`, `'only-if-cached'`.

- `default`: Use the native platforms default strategy.
- `reload`: The data for the URL will be loaded from the originating source. No existing cache data should be used.
- `force-cache`: The existing cached data will be used regardless of its age or expiration date. If none exists, the data is loaded from the originating source.
- `only-if-cached`: The existing cache data will be used regardless of its age or expiration date. If none exists, no attempt is made to load the data and the load is considered to have failed.

#### ImageLoadEvent

Object returned in the `onLoad` callback, with a `source` object.

| Name | Type | Description |
| --- | --- | --- |
| width | number | The width of loaded image. |
| height | number | The height of loaded image. |
| uri | string | A string representing the resource identifier for the image. |

#### ImageSource

Type: object, array of objects, or number (opaque type returned by something like `require('./image.jpg')`).

| Name | Type | Description |
| --- | --- | --- |
| uri | string | The resource identifier for the image: an http address, a local file path, or the name of a static image resource. |
| width | number | Can be specified if known at build time; used to set the default `<Image/>` component dimension. |
| height | number | Can be specified if known at build time; used to set the default `<Image/>` component dimension. |
| scale | number | Scale factor of the image. Defaults to `1.0` (one image pixel equates to one display point / DIP). |
| bundle (iOS) | string | The iOS asset bundle which the image is included in. Defaults to `[NSBundle mainBundle]` if not set. |
| method | string | The HTTP Method to use. Defaults to `'GET'`. |
| headers | object | HTTP headers to send along with the request for a remote image. |
| body | string | The HTTP body to send with the request; a valid UTF-8 string sent exactly as specified. |
| cache (iOS) | ImageCacheEnum | Determines how the request handles potentially cached responses. |

## Notes

- The Fresco versions listed in the Gradle snippet may not be updated in time; check `packages/react-native/gradle/libs.versions.toml` in the main repo to see which fresco version is used in a specific tagged version.
- This is the React Native core `Image` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [ImageBackground](./imagebackground.md)
- [Image Style Props](../props-types/image-style-props.md)
- [Rect](../props-types/rect.md)
- [LayoutEvent](../props-types/layoutevent.md)
- [Images](../ui-interaction/images.md)
