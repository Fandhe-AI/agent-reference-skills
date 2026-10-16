---
source: https://docs.flutter.dev/ui/assets/assets-and-images
---

# Adding assets and images

Flutter apps can include both code and assets: files bundled and deployed with the app and accessible at runtime (static data such as JSON, configuration files, icons, and images in JPEG, WebP, GIF, animated WebP/GIF, PNG, BMP, and WBMP).

## Signature / Usage

Declare assets in `pubspec.yaml`:

```yaml
flutter:
  assets:
    - assets/my_icon.png
    - assets/background.png
```

Include all files directly in a directory with a trailing `/`:

```yaml
flutter:
  assets:
    - directory/
    - directory/subdirectory/
```

Platform-specific assets (available starting from Flutter 3.41.0):

```yaml
flutter:
  assets:
    - path: assets/desktop_config.json
      platforms:
        - macos
        - windows
```

Load a text asset, and an image:

```dart
import 'package:flutter/services.dart' show rootBundle;
import 'package:material_ui/material_ui.dart';

Future<String> loadAsset() async {
  return await rootBundle.loadString('assets/config.json');
}
```

```dart
return const Image(image: AssetImage('assets/background.png'));
```

Asset from a package dependency (the `package` argument is required):

```dart
return const AssetImage('icons/heart.png', package: 'my_icons');
```

## Options / Props

Resolution-aware image variants. `AssetImage` maps a logical requested asset onto the variant that most closely matches the current device pixel ratio:

| Path | Resolution |
| --- | --- |
| `.../my_icon.png` | main asset (mdpi baseline, 1.0) |
| `.../1.5x/my_icon.png` | hdpi |
| `.../2.0x/my_icon.png` | xhdpi |
| `.../3.0x/my_icon.png` | xxhdpi |
| `.../4.0x/my_icon.png` | xxxhdpi |

## Notes

- Only files located directly in a listed directory are included; resolution-aware asset image variants are the only exception. To add files in subdirectories, create an entry per directory.
- Indentation matters in YAML. The `assets:` line must be indented by exactly two spaces below `flutter:`; otherwise you may see `Error: unable to find directory entry in pubspec.yaml`.
- Asset bundling: each asset is identified by an explicit path relative to `pubspec.yaml`; declaration order and the directory name do not matter. During a build, assets are placed into the asset bundle that apps read at runtime. Flutter can transform assets at build time with a Dart package (see asset-transformation).
- Platform-specific assets: useful for large assets only needed on a subset of platforms (for example high-resolution textures or platform-specific configuration files). See the `assets` field in the Flutter pubspec options reference.
- Loading: an `AssetBundle` loads a text asset (`loadString()`) or an image/binary asset (`load()`) by a logical key. Each app has a `rootBundle`. It is recommended to obtain the `AssetBundle` for the current `BuildContext` using `DefaultAssetBundle` (typically `DefaultAssetBundle.of()`), which lets a parent widget substitute a different bundle at run time (localization or testing). Outside a widget context, use `rootBundle` directly.
- Device pixel ratio depends on `MediaQueryData.size`, which requires `MaterialApp` or `CupertinoApp` as an ancestor of the `AssetImage`. If the rendered width and height are not specified on the `Image` widget, the nominal resolution scales the asset to occupy the same screen space as the main asset. Example: on a device pixel ratio of 1.8, `.../2.0x/my_icon.png` is chosen; for 2.7, `.../3.0x/my_icon.png`.
- Bundling variants: specify only the main asset or its parent directory in `pubspec.yaml`; Flutter bundles the variants. If the main asset entry doesn't correspond to a real file, the lowest-resolution asset is the fallback for devices with ratios below it (the entry must still be in the manifest).
- Package assets: assets specified in a package's `pubspec.yaml` are bundled automatically. Assets in a package's `lib/` that are not in its manifest must be listed by the app, with `lib/` implied:

  ```yaml
  flutter:
    assets:
      - packages/fancy_backgrounds/backgrounds/background1.png
  ```

  Within the package itself, load with `AssetImage('packages/fancy_backgrounds/backgrounds/background1.png')`.
- Sharing assets with the platform: on Android use `AssetManager` with the lookup key from `lookupKeyForAsset` (`PluginRegistry.Registrar`) or `getLookupKeyForAsset` (`FlutterView`); on iOS use `mainBundle` with `lookupKeyForAsset` / `lookupKeyForAsset:fromPackage:` on `FlutterPluginRegistrar` or `FlutterViewController`:

  ```java
  AssetManager assetManager = registrar.context().getAssets();
  String key = registrar.lookupKeyForAsset("icons/heart.png");
  AssetFileDescriptor fd = assetManager.openFd(key);
  ```

  ```objc
  NSString* key = [registrar lookupKeyForAsset:@"icons/heart.png"];
  NSString* path = [[NSBundle mainBundle] pathForResource:key ofType:nil];
  ```

  ```swift
  let key = controller.lookupKey(forAsset: "icons/heart.png")
  let mainBundle = Bundle.main
  let path = mainBundle.path(forResource: key, ofType: nil)
  ```

  To use images hosted in an existing iOS app (add-to-app), pass the image data to Dart through platform channels as `FlutterStandardTypedData`.
- App icon: Android — replace the placeholder `ic_launcher.png` files in `android/app/src/main/res/mipmap-*` (update `android:icon` in `AndroidManifest.xml` if you rename them). iOS — replace the images in `ios/Runner/Assets.xcassets/AppIcon.appiconset`, keeping the original file names.
- Launch screen: shown by the native platform until Flutter renders the first frame. If you don't call `runApp()` (or `FlutterView.render()` in response to `PlatformDispatcher.onDrawFrame`), it persists forever. Android — customize the layer-list drawable `res/drawable/launch_background.xml`. iOS — drop `LaunchImage.png`, `LaunchImage@2x.png`, `LaunchImage@3x.png` into `Assets.xcassets/LaunchImage.imageset` (update `Contents.json` if you use other file names), or edit `LaunchScreen.storyboard` in Xcode.
- The code sample imports `package:material_ui/material_ui.dart`, the opt-in standalone Material package available in Flutter 3.47.

## Related

- [asset-transformation](./asset-transformation.md)
- [typography](./typography.md)
- [fragment-shaders](./fragment-shaders.md)
