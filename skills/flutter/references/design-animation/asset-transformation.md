---
source: https://docs.flutter.dev/ui/assets/asset-transformation
---

# Transforming assets at build time

Configure a project to automatically transform assets at build time using compatible Dart packages.

## Signature / Usage

List the assets to be transformed and the associated transformer package in `pubspec.yaml`:

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
```

`assets/logo.svg` is transformed by `vector_graphics_compiler` as it is copied to the build output; the result can be displayed with the `vector_graphics` package:

```dart
import 'package:vector_graphics/vector_graphics.dart';

const Widget logo = VectorGraphic(loader: AssetBytesLoader('assets/logo.svg'));
```

Passing arguments to a transformer:

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
          args: ['--tessellate', '--font-size=14']
```

Chaining transformers (imaginary packages; applied in the order declared):

```yaml
flutter:
  assets:
    - path: assets/bird.png
      transformers:
        - package: grayscale_filter
        - package: png_optimizer
```

## Notes

- Writing a transformer package: an asset transformer is a Dart command-line app invoked with `dart run` with at least two arguments, `--input` (path to the file to transform) and `--output` (where the transformer must write its output).
- If the transformer finishes with a non-zero exit code, the build fails with an error message that includes anything written to `stderr` by the transformer.
- During invocation the `FLUTTER_BUILD_MODE` environment variable is set to the CLI name of the build mode (for example `flutter run -d macos --release` sets `release`).
- The page points to the `asset_transformers` sample project in the Flutter samples repository.

## Related

- [assets-and-images](./assets-and-images.md)
