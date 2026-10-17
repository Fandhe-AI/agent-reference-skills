---
source: https://docs.flutter.dev/platform-integration/platform-channels
---

# Writing custom platform-specific code

How to use custom platform-specific code with Flutter: platform channels (`MethodChannel`) and the `Pigeon` package.

## Signature / Usage

Client (Dart) side of the battery-level example. Channel names must be unique per app; prefix with a domain, e.g. `samples.flutter.dev/battery`.

```dart
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';

class _MyHomePageState extends State<MyHomePage> {
  static const platform = MethodChannel('samples.flutter.dev/battery');
  // Get battery level.
  String _batteryLevel = 'Unknown battery level.';

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final result = await platform.invokeMethod<int>('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
}
```

Host side, Android (Kotlin, `MainActivity.kt`):

```kotlin
class MainActivity: FlutterActivity() {
  private val CHANNEL = "samples.flutter.dev/battery"

  override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
    super.configureFlutterEngine(flutterEngine)
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
      // This method is invoked on the main thread.
      call, result ->
      if (call.method == "getBatteryLevel") {
        val batteryLevel = getBatteryLevel()

        if (batteryLevel != -1) {
          result.success(batteryLevel)
        } else {
          result.error("UNAVAILABLE", "Battery level not available.", null)
        }
      } else {
        result.notImplemented()
      }
    }
  }
}
```

Host side, iOS (Swift, `AppDelegate.swift`, with `FlutterImplicitEngineDelegate`):

```swift
@main
@objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {

  func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
    GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

    let batteryChannel = FlutterMethodChannel(
      name: "samples.flutter.dev/battery",
      binaryMessenger: engineBridge.applicationRegistrar.messenger()
    )

    batteryChannel.setMethodCallHandler({
      [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
      // This method is invoked on the UI thread.
      guard call.method == "getBatteryLevel" else {
        result(FlutterMethodNotImplemented)
        return
      }
      self?.receiveBatteryLevel(result: result)
    })
  }
}
```

Host side, Windows (C++, `flutter_window.cpp`, inside `FlutterWindow::OnCreate`):

```cpp
flutter::MethodChannel<> channel(
    flutter_controller_->engine()->messenger(), "samples.flutter.dev/battery",
    &flutter::StandardMethodCodec::GetInstance());
channel.SetMethodCallHandler(
    [](const flutter::MethodCall<>& call,
       std::unique_ptr<flutter::MethodResult<>> result) {
      if (call.method_name() == "getBatteryLevel") {
        int battery_level = GetBatteryLevel();
        if (battery_level != -1) {
          result->Success(battery_level);
        } else {
          result->Error("UNAVAILABLE", "Battery level not available.");
        }
      } else {
        result->NotImplemented();
      }
    });
```

Host side, macOS (Swift, `MainFlutterWindow.swift`, in `awakeFromNib`):

```swift
let batteryChannel = FlutterMethodChannel(
  name: "samples.flutter.dev/battery",
  binaryMessenger: flutterViewController.engine.binaryMessenger)
batteryChannel.setMethodCallHandler { (call, result) in
  switch call.method {
  case "getBatteryLevel":
    guard let level = getBatteryLevel() else {
      result(
        FlutterError(
          code: "UNAVAILABLE",
          message: "Battery level not available",
          details: nil))
     return
    }
    result(level)
  default:
    result(FlutterMethodNotImplemented)
  }
}
```

Host side, Linux (C, `runner/my_application.cc`):

```c
g_autoptr(FlStandardMethodCodec) codec = fl_standard_method_codec_new();
self->battery_channel = fl_method_channel_new(
    fl_engine_get_binary_messenger(fl_view_get_engine(view)),
    "samples.flutter.dev/battery", FL_METHOD_CODEC(codec));
fl_method_channel_set_method_call_handler(
    self->battery_channel, battery_method_call_handler, self, nullptr);
```

Create the project (Kotlin/Swift by default; `-i` / `-a` select Objective-C / Java):

```console
flutter create batterylevel
flutter create -i objc -a java batterylevel
```

Pigeon alternative: the protocol is defined in a subset of Dart that generates messaging code for Android, iOS, macOS, or Windows.

```dart
import 'package:pigeon/pigeon.dart';

class SearchRequest {
  final String query;

  SearchRequest({required this.query});
}

class SearchReply {
  final String result;

  SearchReply({required this.result});
}

@HostApi()
abstract class Api {
  @async
  SearchReply search(SearchRequest request);
}
```

Use a background isolate with plugins/channels:

```dart
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

void _isolateMain(RootIsolateToken rootIsolateToken) async {
  BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  print(sharedPreferences.getBool('isDebug'));
}

void main() {
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;
  Isolate.spawn(_isolateMain, rootIsolateToken);
}
```

Run a channel handler on a background thread (Android Kotlin; iOS Swift equivalent uses `registrar.messenger().makeBackgroundTaskQueue?()` and the `taskQueue:` parameter):

```kotlin
override fun onAttachedToEngine(@NonNull flutterPluginBinding: FlutterPlugin.FlutterPluginBinding) {
  val taskQueue =
      flutterPluginBinding.binaryMessenger.makeBackgroundTaskQueue()
  channel = MethodChannel(flutterPluginBinding.binaryMessenger,
                          "com.example.foo",
                          StandardMethodCodec.INSTANCE,
                          taskQueue)
  channel.setMethodCallHandler(this)
}
```

Jump back to the UI/main thread:

```kotlin
Handler(Looper.getMainLooper()).post {
  // Call the desired channel message here.
}
```

```swift
DispatchQueue.main.async {
  // Call the desired channel message here.
}
```

## Options / Props

Supported platform languages: Android: Kotlin, Java; iOS: Swift, Objective-C; Windows: C++; macOS: Objective-C; Linux: C.

`StandardMessageCodec` type mapping (Dart to platform), used by the standard channel APIs and Pigeon:

| Dart | Kotlin | Java | Swift |
| --- | --- | --- | --- |
| `null` | `null` | `null` | `nil` (`NSNull` when nested) |
| `bool` | `Boolean` | `java.lang.Boolean` | `NSNumber(value: Bool)` |
| `int` (<=32 bits) | `Int` | `java.lang.Integer` | `NSNumber(value: Int32)` |
| `int` (>32 bits) | `Long` | `java.lang.Long` | `NSNumber(value: Int)` |
| `double` | `Double` | `java.lang.Double` | `NSNumber(value: Double)` |
| `String` | `String` | `java.lang.String` | `String` |
| `Uint8List` | `ByteArray` | `byte[]` | `FlutterStandardTypedData(bytes: Data)` |
| `Int32List` | `IntArray` | `int[]` | `FlutterStandardTypedData(int32: Data)` |
| `Int64List` | `LongArray` | `long[]` | `FlutterStandardTypedData(int64: Data)` |
| `Float32List` | `FloatArray` | `float[]` | `FlutterStandardTypedData(float32: Data)` |
| `Float64List` | `DoubleArray` | `double[]` | `FlutterStandardTypedData(float64: Data)` |
| `List` | `List` | `java.util.ArrayList` | `Array` |
| `Map` | `HashMap` | `java.util.HashMap` | `Dictionary` |

| Dart | Objective-C | C++ | C (GObject) |
| --- | --- | --- | --- |
| `null` | `nil` (`NSNull` when nested) | `EncodableValue()` | `FlValue()` |
| `bool` | `NSNumber numberWithBool:` | `EncodableValue(bool)` | `FlValue(bool)` |
| `int` (<=32 bits) | `NSNumber numberWithInt:` | `EncodableValue(int32_t)` | `FlValue(int64_t)` (single `int` row) |
| `int` (>32 bits) | `NSNumber numberWithLong:` | `EncodableValue(int64_t)` | `FlValue(int64_t)` (single `int` row) |
| `double` | `NSNumber numberWithDouble:` | `EncodableValue(double)` | `FlValue(double)` |
| `String` | `NSString` | `EncodableValue(std::string)` | `FlValue(gchar*)` |
| `Uint8List` | `FlutterStandardTypedData typedDataWithBytes:` | `EncodableValue(std::vector<uint8_t>)` | `FlValue(uint8_t*)` |
| `Int32List` | `FlutterStandardTypedData typedDataWithInt32:` | `EncodableValue(std::vector<int32_t>)` | `FlValue(int32_t*)` |
| `Int64List` | `FlutterStandardTypedData typedDataWithInt64:` | `EncodableValue(std::vector<int64_t>)` | `FlValue(int64_t*)` |
| `Float32List` | `FlutterStandardTypedData typedDataWithFloat32:` | `EncodableValue(std::vector<float>)` | `FlValue(float*)` |
| `Float64List` | `FlutterStandardTypedData typedDataWithFloat64:` | `EncodableValue(std::vector<double>)` | `FlValue(double*)` |
| `List` | `NSArray` | `EncodableValue(std::vector<EncodableValue>)` | `FlValue(FlValue)` |
| `Map` | `NSDictionary` | `EncodableValue(std::map<EncodableValue, EncodableValue>)` | `FlValue(FlValue, FlValue)` |

Common channels and codecs:

| Name | Description |
| --- | --- |
| `MethodChannel` | Named channel for asynchronous method calls with platform plugins; default codec `StandardMessageCodec`. Not type safe. |
| `BasicMessageChannel` | Named channel for basic asynchronous message passing with a supported message codec. Not type safe. |
| `StandardMessageCodec` | Encodes and decodes a wide range of data types into a platform-agnostic binary format. |
| `BinaryCodec` | Passes raw binary data between Dart and the native side without higher-level encoding. |
| `StringCodec` | Encodes and decodes strings using UTF-8. |
| `JSONMessageCodec` | Encodes and decodes JSON-formatted data using UTF-8. |
| `FirestoreMessageCodec` | Handles messages between the app and the native Firebase Firestore SDKs (Android and iOS). |

## Notes

- Messages and responses are passed asynchronously through channels so the UI stays responsive. Whenever you invoke a channel method, you must invoke it on the platform's main thread.
- Method calls can also be sent in the reverse direction (platform as client, Dart implements the method); the source points to the `quick_actions` plugin.
- The page is valid for most platforms, but platform-specific code for the web generally uses JS interoperability instead. You can also write platform-specific Dart code by inspecting `defaultTargetPlatform`.
- When invoking channels in Flutter destined for the platform side, invoke them from any `Isolate` that is the root `Isolate` or is registered as a background `Isolate`. Platform-side handlers run on the main thread, or on a background thread when using a Task Queue.
- On Android the main thread is technically the UI thread; annotate methods that need it with `@UiThread`. On iOS it is referred to as the main thread.
- If your app adopts the `UISceneDelegate` lifecycle (default in Flutter 3.41+), `window` is `nil` during `application(_:didFinishLaunchingWithOptions:)`. Use the `FlutterImplicitEngineDelegate` protocol and create the `FlutterMethodChannel` in `didInitializeImplicitFlutterEngine`.
- iOS Simulator does not support battery APIs (the example shows "Battery level not available"); likewise on Windows/macOS/Linux devices without a battery.
- Windows: run `flutter build windows` once to generate the Visual Studio solution file. Linux: the example needs `libupower-glib-dev` (`sudo apt install libupower-glib-dev`).
- To reuse platform code across apps, separate it into a platform plugin (see developing packages); to share it, see publishing packages.
- The example's Dart import is `package:material_ui/material_ui.dart` as written in the 3.47 docs source.
- This is the Flutter-side channel mechanism (Dart plus Kotlin/Swift/C++/C hosts). The native APIs used in the host code belong to the android-*, apple-uikit / apple-appkit, and windows-app-sdk skills.

## Related

- [bind-native-code](./bind-native-code.md)
- [android-platform-views](./android-platform-views.md)
- [ios-platform-views](./ios-platform-views.md)
