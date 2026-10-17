---
source: https://docs.flutter.dev/platform-integration/android/platform-views
---

# Hosting native Android views in your Flutter app with Platform Views

Platform views embed native views in a Flutter app so you can apply transforms, clips, and opacity to the native view from Dart. Android has several implementations with performance and fidelity trade-offs.

## Signature / Usage

Dart side, hybrid composition:

```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  const Map<String, dynamic> creationParams = <String, dynamic>{};

  return PlatformViewLink(
    viewType: viewType,
    surfaceFactory: (context, controller) {
      return AndroidViewSurface(
        controller: controller as AndroidViewController,
        gestureRecognizers: const <Factory<OneSequenceGestureRecognizer>>{},
        hitTestBehavior: PlatformViewHitTestBehavior.opaque,
      );
    },
    onCreatePlatformView: (params) {
      return PlatformViewsService.initSurfaceAndroidView(
          id: params.id,
          viewType: viewType,
          layoutDirection: TextDirection.ltr,
          creationParams: creationParams,
          creationParamsCodec: const StandardMessageCodec(),
          onFocus: () {
            params.onFocusChanged(true);
          },
        )
        ..addOnPlatformViewCreatedListener(params.onPlatformViewCreated)
        ..create();
    },
  );
}
```

Dart side, texture layer (TextureLayerHybridComposition):

```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return AndroidView(
    viewType: viewType,
    layoutDirection: TextDirection.ltr,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

Platform side (Kotlin): extend `io.flutter.plugin.platform.PlatformView`, add a factory, then register it.

```kotlin
internal class NativeView(context: Context, id: Int, creationParams: Map<String?, Any?>?) : PlatformView {
    private val textView: TextView

    override fun getView(): View {
        return textView
    }

    override fun dispose() {}

    init {
        textView = TextView(context)
        textView.textSize = 72f
        textView.setBackgroundColor(Color.rgb(255, 255, 255))
        textView.text = "Rendered on a native Android view (id: $id)"
    }
}

class NativeViewFactory : PlatformViewFactory(StandardMessageCodec.INSTANCE) {
    override fun create(context: Context, viewId: Int, args: Any?): PlatformView {
        val creationParams = args as Map<String?, Any?>?
        return NativeView(context, viewId, creationParams)
    }
}

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        flutterEngine
                .platformViewsController
                .registry
                .registerViewFactory("<platform-view-type>",
                                      NativeViewFactory())
    }
}
```

Plugin registration (in `onAttachedToEngine`):

```kotlin
binding
        .platformViewRegistry
        .registerViewFactory("<platform-view-type>", NativeViewFactory())
```

Enable HCPP locally or in the manifest:

```console
$ flutter run --enable-hcpp
```

```xml
<meta-data
    android:name="io.flutter.embedding.android.EnableHcpp"
    android:value="true" />
```

## Options / Props

| Mode | Benefits | Considerations | Enabler |
| --- | --- | --- | --- |
| Texture layer | Good Flutter performance; full widget transforms work | Janky during quick scrolling; SurfaceViews lose accessibility and text magnifier breaks; Platform View renders to texture, uploads to Impeller, Impeller composites | Default behavior or standard `AndroidView` |
| Hybrid composition | Full native fidelity; correct accessibility and SurfaceView support | Thread merging of raster and platform degrades Flutter FPS; Flutter content renders into `ImageReader`-backed `FlutterImageView`s (a background layer plus an overlay layer) composited by the Android view hierarchy | `PlatformViewLink` with `AndroidViewSurface`; `AndroidViewController` builds either a TLHC or an HC Platform View |
| HCPP (Experimental) | Full fidelity and performance; solves original sync overhead | Requires Android API 34+, Vulkan support, and the Impeller rendering engine; SurfaceFlinger composites the two Surfaces | `<meta-data>` in `AndroidManifest.xml`; `--enable-hcpp` local flag; `AndroidViewController` builds either a TLHC or an HC Platform View |

## Notes

- HCPP (Hybrid composition++) is experimental and available starting from Flutter 3.44. It is opt-in; if requirements (Android API 34+, Impeller with the Vulkan backend) are not met on the end-user device, Flutter automatically falls back to the existing platform view strategy configured for the app.
- `--enable-hcpp` is for local `flutter run` / `flutter test` only and cannot be passed to `flutter build` commands; for release builds use the manifest `<meta-data>`.
- HCPP limitation: transparent platform views do not display correctly in stacks structured as Flutter canvas -> Platform View -> Overlay -> Transparent Platform View when all four layers intersect.
- Texture layer: may cause jankiness on quick scrolling (such as a web view), broken accessibility for `SurfaceView`s, and broken text magnification unless Flutter is rendered into a `TextureView`.
- Hybrid composition: the main Flutter render surface is swapped for a background `FlutterImageView` once a platform view is added; Flutter content drawn above a platform view goes into an additional overlay `FlutterImageView` allocated from a pool and recycled between frames.
- Manual view invalidation: some Android Views (for example `SurfaceView` and `SurfaceTexture`) do not invalidate themselves when content changes; call `invalidate` on the view or one of its parents after the swap chain is flipped.
- Performance: with hybrid composition Flutter merges the raster thread into the platform thread, so rasterizing complex widgets competes with OS messages and plugin work, potentially lowering FPS. Before Android 10 each frame was copied from graphics memory to main memory and back to a GPU texture; on Android 10 or above it is copied only once. Virtual display adds intermediate graphic buffers that cost graphic memory and drawing performance. Mitigation noted in the source: use a placeholder texture (a screenshot of the native view rendered as a texture) while a Dart animation runs.
- The example imports `package:material_ui/material_ui.dart` as in the 3.47 docs source.
- Related guides: Hosting native iOS views and Hosting native macOS views.
- This page is the Flutter-side hosting mechanism (Dart widgets plus `io.flutter.plugin.platform`). The native Android View system and Jetpack Compose belong to the android-* skills (for example android-compose-ui, android-platform-core).

## Related

- [ios-platform-views](./ios-platform-views.md)
- [macos-platform-views](./macos-platform-views.md)
- [android-compose-activity](./android-compose-activity.md)
