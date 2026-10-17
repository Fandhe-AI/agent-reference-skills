---
source: https://reactnative.dev/docs/0.87/images
---

# Images

React Native provides a unified way of managing images and other media assets in your Android and iOS apps: static resources, hybrid app resources, network images, `data:` URIs and local filesystem images.

## Signature / Usage

```tsx
<Image source={require('./my-icon.png')} />
```

The image name is resolved the same way JS modules are resolved. The bundler looks for `my-icon.png` in the same folder as the component that requires it. Use the `@2x` and `@3x` suffixes to provide images for different screen densities:

```tsx
// GOOD
<Image source={require('./my-icon.png')} />;

// BAD
const icon = this.props.active
  ? 'my-icon-active'
  : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />;

// GOOD
const icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />;
```

Network image with request options:

```tsx
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```

Cache control:

```tsx
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    cache: 'only-if-cached',
  }}
  style={{width: 400, height: 400}}
/>
```

Hybrid app resources (Xcode asset catalogs / Android drawable folder, no extension; Android assets folder uses `asset:/`):

```tsx
<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
<Image source={{uri: 'asset:/app_icon.png'}} style={{width: 40, height: 40}} />
```

Background image via nesting:

```tsx
return (
  <View style={{width: '100%', height: '100%'}}>
    <Image source={require('./background.png')} style={StyleSheet.absoluteFill} />
    <Text>Inside</Text>
  </View>
);
```

iOS asset catalog opt-in (`Info.plist`):

```xml
<key>RCTUseAssetCatalog</key>
<true/>
```

iOS image cache limits (call from native AppDelegate code, e.g. in `didFinishLaunchingWithOptions`):

```objectivec
RCTSetImageCacheLimits(4*1024*1024, 200*1024*1024);
```

## Options / Props

`cache` source property:

| Value | Description |
|-------|-------------|
| `default` | Use the native platforms default strategy. |
| `reload` | The data for the URL will be loaded from the originating source. No existing cache data should be used to satisfy a URL load request. |
| `force-cache` | The existing cached data will be used to satisfy the request, regardless of its age or expiration date. If there is no existing data in the cache corresponding the request, the data is loaded from the originating source. |
| `only-if-cached` | The existing cache data will be used to satisfy a request, regardless of its age or expiration date. If there is no existing data in the cache corresponding to a URL load request, no attempt is made to load the data from the originating source, and the load is considered to have failed. |

`RCTSetImageCacheLimits` parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| imageSizeLimit | number | Yes | Image cache size limit. |
| totalCostLimit | number | Yes | Total cache cost limit. |

## Notes

- Benefits of static images: same system on Android and iOS; images live next to JavaScript code; no global namespace; only used images are packaged; adding or changing images doesn't require app recompilation; the bundler knows the image dimensions; images can be distributed via npm packages.
- In order for static resources to work, the image name in `require` has to be known statically.
- Image sources required this way include size (width, height) info. If you need to scale the image dynamically (i.e. via flex), you may need to manually set `{width: undefined, height: undefined}` on the style attribute.
- If there is no image matching the screen density, the closest best option will be selected. On Windows, you might need to restart the bundler if you add new images to your project.
- Asset catalog (iOS): by default the bundler copies each required image, along with every `@2x` and `@3x` variant, into your iOS app as a loose file next to the JavaScript bundle. With `RCTUseAssetCatalog` set to `true`, the iOS build script compiles bundled images into an `RNAssets.bundle` asset catalog at build time; `require` calls stay the same. After changing this setting, make sure to do a clean build.
- Static non-image resources: `require` can include audio, video or document files (`.mp3`, `.wav`, `.mp4`, `.mov`, `.html`, `.pdf` and more; see Metro bundler defaults). Add other types via the Metro `assetExts` resolver option. Videos must use absolute positioning instead of `flexGrow`, since size info is not currently passed for non-image assets.
- Hybrid and network resources provide no safety checks and you must specify image dimensions manually. Use https for network images to satisfy App Transport Security requirements on iOS.
- `data:` URIs are recommended for very small and dynamic images only, like icons in a list from a DB. Include at least width and height.
- Android drawable resources: `xml` drawables (vector or shape drawables) can be loaded via `require`/`import` (static, alongside JS code) or by resource name without extension (from `res/drawable`). The asset must be referenced at compile-time of the Android application because AAPT must package it; binary XML cannot be loaded over the network by Metro. If you change the directory or name of an asset, you will need to rebuild the Android application. Avoid referencing other resources in an XML file you treat as a static image resource.
- Camera Roll: iOS saves multiple sizes for the same image. If there's an exact match, React Native will pick it, otherwise it uses the first one that's at least 50% bigger to avoid blur.
- Images are not automatically sized (to avoid Cumulative Layout Shift); static images from `require` can be automatically sized because their dimensions are available at mount, e.g. `{"__packager_asset":true,"uri":"my-icon.png","width":591,"height":573}`.
- `source` is an object with a `uri` attribute rather than a string, so metadata can be attached (for example `require` adds location and size; don't rely on this, it might change in the future).
- iOS may ignore the corner specific border radius styles `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius` on images.
- Image decoding is done in a different thread, not the main thread.
- 0.88: iOS SceneDelegate lifecycle support is added (Apple requires the UIScene lifecycle with the iOS 27 SDK); for UIScene apps the next docs call `RCTSetImageCacheLimits` from `scene:willConnectToSession:options:` instead of `didFinishLaunchingWithOptions`. The `Image` JS API is unchanged. See the 0.88 release blog.
- Deviation from official docs: the background-image snippet uses `require('./background.png')` in place of the official placeholder `source={...}`, which is not valid JSX.
- The 0.88 release blog lists `RCTUseAssetCatalog` as a 0.88 change although the 0.87 docs snapshot already documents it; confirm that your react-native version supports it before relying on it.

## Related

- [Style](./style.md)
- [Networking](./network.md)
