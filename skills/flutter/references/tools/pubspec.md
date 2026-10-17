---
source: https://docs.flutter.dev/tools/pubspec
---

# Flutter pubspec options

Every Dart project, including all Flutter apps and libraries, includes a `pubspec.yaml` file. This page lists the fields that are only valid for a Flutter project. Fields common to both Dart and Flutter projects are described in "The pubspec file" on dart.dev.

## Signature / Usage

```yaml
name: <project name>
description: A new Flutter project.

publish_to: 'none'  # Remove this line if you wish to publish to pub.dev
version: 1.0.0+1

environment:
  sdk: ^3.13.0

dependencies:
  flutter:       # Required for every Flutter project
    sdk: flutter # Required for every Flutter project
  flutter_localizations: # Required to enable localization
    sdk: flutter         # Required to enable localization

  material_ui    # Required for projects that use the Material components pkg
  cupertino_ui   # Required for projects that use the Cupertino components pkg
  cupertino_icons: ^1.0.8 # Only required if you use Cupertino (iOS style) icons

dev_dependencies:
  flutter_test:
    sdk: flutter # Required for a Flutter project that includes tests
  integration_test:
    sdk: flutter # Required for integration tests

  flutter_lints: ^6.0.0 # Contains a set of recommended lints for Flutter code

flutter:

  uses-material-design: true # Required if you use the Material icon font

  generate: true # Enables generation of localized strings from arb files

  config: # App-specific configuration flags that mirror `flutter config`
    enable-swift-package-manager: true

  assets:  # Lists assets, such as image files
    - images/a_dot_burr.jpeg
    - images/a_dot_ham.jpeg

  licenses: # Lists additional license files to be bundled with the app
    - assets/my_license.txt

  fonts:              # Required if your app uses custom fonts
    - family: Schyler
      fonts:
        - asset: fonts/Schyler-Regular.ttf
        - asset: fonts/Schyler-Italic.ttf
          style: italic
    - family: Trajan Pro
      fonts:
        - asset: fonts/TrajanPro.ttf
        - asset: fonts/TrajanPro_Bold.ttf
          weight: 700
```

Creating a project with `flutter create` generates a pubspec for a basic Flutter app. The first build also creates a `pubspec.lock` with specific versions of the included packages.

## Fields (under `flutter:`)

| Field | Description |
| --- | --- |
| `assets` | A list of asset paths bundled with the app: static data (for example `JSON`), configuration files, icons, and images (`JPEG`, `WebP`, `GIF`, animated `WebP/GIF`, `PNG`, `BMP`, `WBMP`). |
| `config` | A map of keys to flags (`true` or `false`) that influences how the `flutter` CLI is executed. Keys mirror `flutter config --list`. |
| `config.enable-swift-package-manager` | Whether Flutter uses Swift Package Manager for native iOS and macOS dependencies in this project. Set `false` to disable. |
| `default-flavor` | A default Flutter flavor; its name need not be included in the launch command. |
| `deferred-components` | Defer downloading components to reduce the initial download size of an Android app. |
| `flutter` | Contains Flutter-specific settings for the app. |
| `fonts` | Configure and include custom fonts. |
| `generate` | Enables generation of Dart files with localized strings from `.arb` files. |
| `licenses` | A list of additional license file paths bundled with the application. |
| `module` | Settings for a Flutter module project (Add-to-App). |
| `plugin` | Settings specifically for Flutter plugins. |
| `shaders` | GLSL shaders with the `.frag` extension, compiled by the Flutter tool. |
| `uses-material-design` | Use Material Design components and icon font. |

### assets

```yaml
flutter:
  assets:
    - [ path_to_file | path_to_directory ]
      [ flavor_path_field | platform_path_field | transformer_path_field ]
    [...]
```

Subfields: `path_to_file` (path to a file), `path_to_directory` (path to a directory), `flavor_path_field`, `platform_path_field`, `transformer_path_field`, `path` (path to an asset file or directory), `flavors` (a list of flutter flavors for assets at a path), `platforms` (valid values: `android`, `ios`, `web`, `linux`, `macos`, `windows`), `transformers` (a list of transformer packages run at build time).

```yaml
flutter:
  assets:
    - assets/images/my_image_a.png
    - assets/images/my_image_b.png
```

```yaml
flutter:
  assets:
    - assets/images/
    - assets/icons/
```

```yaml
flutter:
  assets:
    - path: assets/flavor_a_and_b/images
      flavors:
        - flavor_a
        - flavor_b
    - path: assets/flavor_c/images
      flavors:
        - flavor_c
```

```yaml
flutter:
  assets:
    - path: assets/web_worker.js
      platforms:
        - web
    - path: assets/desktop_icon.png
      platforms:
        - windows
        - linux
        - macos
```

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
          args: ['--tessellate']
```

An image asset can also refer to resolution-specific "variants" (see the Assets and images page).

### config

```yaml
flutter:
  config:
    cli-animations: false
```

Use `flutter config --help` for a description of each flag. Flags are only read from the current application package, and have no effect in the context of a package or dependency.

```yaml
flutter:
  config:
    enable-swift-package-manager: false
```

### default-flavor

```yaml
flutter:
  default-flavor: production
```

```console
# Use this command to run the default flavor (production).
$ flutter run

# Use this command to run non-default flavors (staging).
$ flutter run --flavor staging
```

### deferred-components

```yaml
flutter:
  deferred-components:
    - name: component_name
      libraries:
        - string_expression
        [...]
      assets:
        - string_expression
        [...]
    [...]
```

Subfields: `name` (unique identifier for the deferred component), `libraries` (Dart libraries that are part of the component), `assets` (asset paths associated with the component).

```yaml
flutter:
  deferred-components:
    - name: box_component
      libraries:
        - package:testdeferredcomponents/box.dart
    - name: gallery_feature
      libraries:
        - package:testdeferredcomponents/gallery_feature.dart
      assets:
        - assets/gallery_images/gallery_feature.png
```

### fonts

```yaml
flutter:
  fonts:
    -  { font_family_field | font_asset_field }
    [...]
```

```yaml
# font_family_field structure
- family: font_name
  fonts:
    - font_asset_field
    [...]
```

```yaml
# font_asset_field structure
- asset: path/to/directory/font_name
  weight: int_expression # Optional
  style: string_expression # Optional
```

Subfields: `family` (optional font family name; can have multiple font assets), `asset` (the font to use), `weight` (optional; `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800` or `900`), `style` (optional; can be `italic`).

```yaml
flutter:
  fonts:
    - family: Roboto # Optional
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700 # Optional
          style: italic # Optional
```

A font with no family, weight or style requirements can be declared as a simple asset: `assets:` with `- fonts/Roboto-Regular.ttf`.

### generate

```yaml
flutter:
  generate: true
```

### licenses

```yaml
flutter:
  licenses:
    - [path_to_file]
```

### module

```yaml
flutter:
  module:
    androidPackage: com.example.my_module # Optional
    iosBundleIdentifier: com.example.myModule # Optional
```

Subfields: `androidX` (optional; whether the module uses AndroidX), `androidPackage` (optional; package name for generated Android code), `iosBundleIdentifier` (optional; bundle identifier for generated iOS code).

### plugin

```yaml
flutter:
  plugin:
    platforms:
      android: # Optional
        package: com.example.my_plugin
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      ios: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      macos: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
        sharedDarwinSource: true
      windows: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      linux: # Optional
        pluginClass: MyPlugin
        dartPluginClass: MyPluginClassName
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
      web: # Optional
        ffiPlugin: true
        default_package: my_plugin_name
        fileName: my_file.dart
    implements: # Optional
      - example_platform_interface
```

| Subfield | Description |
| --- | --- |
| `platforms` | A list of platforms that will have configuration settings. |
| `package` | The Android package name of the plugin. Used with the Android platform and required. |
| `pluginClass` | The name of the plugin class. Optional if `dartPluginClass` is used for the same platform. Usable with Android, iOS, Linux, macOS, and Windows. |
| `default_package` | Optional. The package used as the default implementation of a platform interface. Only applicable to federated plugins. |
| `dartPluginClass` | Optional. The Dart class that serves as the entry point for a Flutter plugin. Usable with Android, iOS, Linux, macOS, and Windows. |
| `sharedDarwinSource` | Optional. The plugin shares native code between iOS and macOS. |
| `fileName` | Optional. The file that contains the plugin class. |
| `ffiPlugin` | Optional. True if the plugin uses a Foreign Function Interface (FFI). |
| `implements` | Optional. The platform interfaces that a Flutter plugin implements. |

### shaders

GLSL shaders with the `.frag` extension must be declared in the `shaders` section. The Flutter command-line tool compiles the shader to its appropriate backend format and generates its necessary runtime metadata. The field accepts a list of individual file paths; directory paths aren't supported.

```yaml
flutter:
  shaders:
    - assets/shaders/shader_a.frag
    - assets/shaders/shader_b.frag
```

### uses-material-design

```yaml
flutter:
  uses-material-design: true
```

## Packages

Flutter-specific packages that can be added to the pubspec; after adding one, run `flutter pub get`.

| Package | Section | Description |
| --- | --- | --- |
| `flutter` | `dependencies` | Represents the Flutter SDK itself (`sdk: flutter`). |
| `flutter_localizations` | `dependencies` | Provided by the Flutter SDK; enables localization of `ARB` files. Often used with the `intl` package. |
| `flutter_test` | `dev_dependencies` | Testing utilities for unit and widget tests. |
| `integration_test` | `dev_dependencies` | Running integration tests on target devices or emulators. |
| `flutter_lints` | `dev_dependencies` | A set of recommended lints for Flutter projects (`^6.0.0` in the example). |
| `cupertino_icons` | `dependencies` | Apple's Cupertino icons (`^1.0.8` in the example). |

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  intl: any
```

## Notes

- The pubspec can have additional auto-generated Flutter fields that aren't listed here.
- Version note: in Flutter versions earlier than 3.44, Swift Package Manager isn't enabled by default. Support for disabling Swift Package Manager will be removed in a future Flutter release.
- Don't list shader files under the `assets` field, either directly or through a directory that contains them; the Flutter tool reports an error if a shader is declared in both places. Like other assets, shaders also support `flavors`, `platforms`, and `transformers`.
- The example pubspec lists `material_ui` and `cupertino_ui` as the Material / Cupertino components packages, matching the opt-in described for Flutter 3.47.
- Dependency resolution and the other dart.dev fields: see "The pubspec file" and "Package dependency management".

## Related

- [flutter: The Flutter command-line tool](./flutter-cli.md)
- [Create a new Flutter app](./create-new-app.md)
