---
source: https://docs.expo.dev/modules/module-api/
---

# Module API Reference

The Expo Modules API is an abstraction layer on top of JSI and other low-level primitives that React Native is built upon. It is built with Swift and Kotlin and provides a convenient API that is consistent across platforms where possible. Each module class implements `definition`, which returns a DSL made of definition components.

## Signature / Usage

```swift
// Swift
public class MyModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyFirstExpoModule")

    Function("hello") { (name: String) in
      return "Hello \(name)!"
    }
  }
}
```

```kotlin
// Kotlin
class MyModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MyFirstExpoModule")

    Function("hello") { name: String ->
      return@Function "Hello $name!"
    }
  }
}
```

Calling a function from JavaScript (module named "MyModule"), with the native `Function("mySyncFunction")` definitions:

```swift
// Swift
Function("mySyncFunction") { (message: String) in
  return message
}
```

```kotlin
// Kotlin
Function("mySyncFunction") { message: String ->
  return@Function message
}
```

```js
import { requireNativeModule } from 'expo-modules-core';

// Assume that we have named the module "MyModule"
const MyModule = requireNativeModule('MyModule');

function getMessage() {
  return MyModule.mySyncFunction('bar');
}
```

## Options / Props

### Definition components (module level)

| Component | Platforms | Description |
| --- | --- | --- |
| `Name("X")` | both | Sets the module name used from JavaScript. Can be inferred from the class name, but setting it explicitly is recommended. |
| `Constant("PI") { ... }` | both | Constant property on the JavaScript object; computed once on first access, then cached. |
| `Constants(...)` | both | Deprecated: use `Constant` instead. Takes a dictionary (`[String: Any]` / `"PI" to ...`) or a closure returning one. |
| `Function("name") { args -> ... }` | both | Synchronous native function exported to JavaScript; runs on the same thread and blocks the script until it returns. Up to 8 arguments (limitation of generics in Swift and Kotlin). |
| `AsyncFunction("name") { args -> ... }` | both | Always returns a `Promise`; native code by default is dispatched on a different thread than the JavaScript runtime. If the last argument type is `Promise`, the function waits until it is resolved or rejected; otherwise it resolves with the returned value or rejects if it throws. Up to 8 arguments (including the promise). Change the queue with `.runOnQueue(.main)` (Swift) / `.runOnQueue(Queues.MAIN)` (Kotlin). |
| `AsyncFunction("name") Coroutine { ... }` | Android | Suspendable body (infix after `Coroutine`); cannot receive `Promise`. Dispatched on the module's coroutine scope, bound to the module lifecycle (unfinished suspend functions are canceled when the module is deallocated). |
| `Property("foo") { getter }` / `Property("foo").get { }.set { newValue -> }` | both | Defines a property on the module object (like `Object.defineProperty`). Read-only shorthand takes name and getter; mutable needs getter and setter; setter-only is possible with the second syntax. |
| `View(ViewType) { ... }` | both | Exports the module as a native view. Accepts `Prop`, `Events`, `GroupView`, `AsyncFunction`. On Android the class must inherit from `ExpoView`; on iOS it is optional. View `AsyncFunction`s attach to the React ref and receive the view instance as first argument; they run on the UI thread by default. Rendering SwiftUI views is planned; for now use `UIHostingController`. |
| `Events("a", "b")` | both | Event names the module can send to JavaScript. Inside `View`, defines callback names. |
| `OnStartObserving("event") { }` | both | Invoked when the first listener for the given event is added. |
| `OnStopObserving("event") { }` | both | Invoked when all listeners for the given event are removed. |

Async function examples:

```swift
AsyncFunction("myAsyncFunction") { (message: String) in
  return message
}.runOnQueue(.main)
```

```kotlin
AsyncFunction("myAsyncFunction") { message: String, promise: Promise ->
  promise.resolve(message)
}

AsyncFunction("suspendFunction") Coroutine { message: String ->
  delay(5000)
  return@Coroutine message
}
```

Prefer `AsyncFunction` over `Function` when the function does I/O-bound work, must run on another thread (for example the main UI thread), or is long-running.

### Lifecycle listeners (module level)

| Component | Platforms | When it is called |
| --- | --- | --- |
| `OnCreate` | both | Right after module initialization (use instead of the class initializer). |
| `OnDestroy` | both | When the module is about to be deallocated (use instead of the destructor). |
| `OnAppContextDestroys` | both | When the app context owning the module is about to be deallocated. |
| `OnAppEntersForeground` | iOS | App is about to enter the foreground. Android equivalent: `OnActivityEntersForeground`. |
| `OnAppEntersBackground` | iOS | App enters the background. Android equivalent: `OnActivityEntersBackground`. |
| `OnAppBecomesActive` | iOS | App becomes active again (after `OnAppEntersForeground`). |
| `OnActivityEntersForeground` | Android | Right after the activity is resumed. |
| `OnActivityEntersBackground` | Android | Right after the activity is paused. |
| `OnActivityDestroys` | Android | Activity owning the JavaScript context is about to be destroyed. |
| `OnActivityResult { activity, payload -> }` | Android | Activity launched with `startActivityForResult` returns a result. `payload` has `requestCode: Int`, `resultCode: Int`, and an optional `data` intent. |
| `OnNewIntent { intent -> }` | Android | Activity receives a new intent (for example from a deep link). |
| `OnUserLeavesActivity { }` | Android | Activity is about to go to the background because of user choice (for example Home key), not for an incoming phone call. |
| `RegisterActivityContracts { }` | Android | Registers Android activity result contracts via `registerForActivityResult`; modern replacement for `startActivityForResult`. |

```kotlin
class ImagePickerModule : Module() {
  private lateinit var cameraLauncher: ActivityResultLauncher<CameraContractOptions>

  override fun definition() = ModuleDefinition {
    Name("ImagePicker")

    RegisterActivityContracts {
      cameraLauncher = registerForActivityResult(
        CameraContract(this@ImagePickerModule)
      ) { input, result ->
        handleResult(result, input.options)
      }
    }

    AsyncFunction("launchCameraAsync") { options: PickerOptions ->
      cameraLauncher.launch(CameraContractOptions(options))
    }
  }
}
```

### View definition components

Usable only within a `View` closure.

| Component | Platforms | Description |
| --- | --- | --- |
| `Name("MyViewName")` | both | Name of the view used from JavaScript (inferred from the class name if omitted). |
| `Prop("name", default?) { view, value -> }` | both | Setter for the view prop; optional `defaultValue` is used when the setter is called with `null`; the closure is invoked when the view rerenders. Props of function type (callbacks) are not supported; use `Events`. |
| `PropGroup(...) { view, key, value -> }` | Android | Batch-registers props sharing one setter pattern. Pair-based (`"borderTopColor" to LogicalEdge.TOP`, handler gets view, mapped value, prop value) or string-based (handler gets view, positional index, prop value). Used internally by CSS prop decorators; most modules should use individual `Prop`. |
| `OnViewDidUpdateProps { view -> }` | both | Called when the view finished updating all props. |
| `OnViewDestroys { view -> }` | Android | Called right after the view is no longer used by React Native. On iOS use the view's destructor. |
| `AsyncFunction("name") { view, args -> }` | both | Function attached to the view ref; always dispatched on the main queue and receives the view as first argument. |
| `Events("onX")` | both | View callback names (see View callbacks below). |

```swift
Prop("background", UIColor.black) { (view: UIView, color: UIColor) in
  view.backgroundColor = color
}
```

```kotlin
Prop("background", Color.BLACK) { view: View, @ColorInt color: Int ->
  view.setBackgroundColor(color)
}
```

#### View groups (Android)

`GroupView<ViewGroup> { ... }` makes the view usable as a view group (class must inherit from Android `ViewGroup`; only inside `View`). It accepts:

| Component | Action signature |
| --- | --- |
| `AddChildView` | `(parent, child, index: Int) -> ()` |
| `GetChildCount` | `(parent) -> Int` |
| `GetChildViewAt` | `(parent, index: Int) -> ChildType` |
| `RemoveChildView` | `(parent, child) -> ()` |
| `RemoveChildViewAt` | Removes a child view at a specific index (the source page lists `(parent: ParentType, child: ChildType) -> ()` but its example is `RemoveChildViewAt { parent, index -> parent.removeViewAt(child) }`) |

```kotlin
GroupView<ViewGroup> {
  AddChildView { parent, child: View, index ->
    parent.addView(child, index)
  }
  GetChildCount { parent -> return@GetChildCount parent.childCount }
  GetChildViewAt { parent, index -> parent.getChildAt(index) }
  RemoveChildView { parent, child: View -> parent.removeView(child) }
}
```

### Argument types

Only primitive and serializable data can be passed between runtimes; the API provides typed conversion with automatic validation.

| Kind | Description |
| --- | --- |
| Primitives | Swift: `Bool`, `Int`, `Int8`-`Int64`, `UInt`, `UInt8`-`UInt64`, `Float32`, `Double`, `String`. Kotlin: `Boolean`, `Int`, `Long`, `Float`, `Double`, `String`, `Pair`. Arrays, dictionaries/maps and optionals of these are accepted. |
| Convertibles | Native types initializable from data received from JavaScript, allowed as argument types. iOS: conform to the `Convertible` protocol (static `convert(from: Any?, appContext: AppContext) throws -> Self`; throw when the value is invalid). Android: override `converters()` in the `Module` and use `ModuleConverters { TypeConverter(Type::class).from { x: Int -> ... } }`; registered converters are tried until one matches. |
| Records | `Record` structs/classes with `@Field` properties, each with a type and default value; the native-type-safe equivalent of a JavaScript object. |
| Enums | Must represent a primitive value (`String`, `Int`) and conform to `Enumerable`. Kotlin: the constructor must have an argument called `value`. |
| Eithers | `Either<A, B>`, `EitherOfThree<A, B, C>`, `EitherOfFour<A, B, C, D>`; read with `get()` (Swift) / `get(Type::class)` (Kotlin). |
| `ValueOrUndefined<T>` | Experimental. Distinguishes JavaScript `undefined` from `null`. Properties: `isUndefined: Bool`, `optional: InnerType?`. With `ValueOrUndefined<String?>` Swift can switch over `.undefined` / `.value(...)`. |
| `JavaScriptValue`, `JavaScriptObject`, `JavaScriptFunction<ReturnType>` | Hold raw JavaScript values for mutation or to skip validation. Restricted to synchronous functions; accessing from another thread crashes. |
| `Formatter` | Experimental. Customizes how a Record is serialized when returned: `map` transforms a property's value, `skip` (optionally conditional) excludes it; operations can be chained. Swift: `record.format { formatter in formatter.property("password", keyPath: \.password).skip() }`; Kotlin: `formatter { property(UserInfo::password).skip() }.format(user)`. |

```swift
struct FileReadOptions: Record {
  @Field
  var encoding: String = "utf8"

  @Field
  var position: Int = 0

  @Field
  var length: Int?
}

Function("readFile") { (path: String, options: FileReadOptions) -> String in
  // Read the file using given `options`
}
```

```kotlin
enum class FileEncoding(val value: String) : Enumerable {
  utf8("utf8"),
  base64("base64")
}
```

#### Built-in Convertibles

iOS (CoreGraphics / UIKit):

| Native iOS type | TypeScript |
| --- | --- |
| `URL` | `string` with a URL; when a scheme is not provided, a file URL is assumed |
| `CGFloat` | `number` |
| `CGPoint` | `{ x, y }` or `number[]` |
| `CGSize` | `{ width, height }` or `number[]` |
| `CGVector` | `{ dx, dy }` or `number[]` |
| `CGRect` | `{ x, y, width, height }` or `number[]` |
| `CGColor`, `UIColor` | Color hex strings (`#RRGGBB`, `#RRGGBBAA`, `#RGB`, `#RGBA`), CSS3/SVG named colors, or `"transparent"` |
| `Data` | `Uint8Array` (SDK 50+) |

Android:

| Native Android type | TypeScript |
| --- | --- |
| `java.net.URL` | `string` with a URL; the scheme has to be provided (no unencoded `%`) |
| `android.net.Uri`, `java.net.URI` | `string` with a URI; the scheme has to be provided (no unencoded `%`) |
| `java.io.File`, `java.nio.file.Path` (Android API 26 only) | `string` with a path to the file |
| `android.graphics.Color` | Color hex strings, CSS3/SVG named colors, or `"transparent"` |
| `kotlin.Pair<A, B>` | Array with two values of types A and B |
| `kotlin.ByteArray` | `Uint8Array` (SDK 50+) |
| `kotlin.BooleanArray` | `boolean[]` |
| `kotlin.IntArray`, `FloatArray`, `LongArray`, `DoubleArray` | `number[]` |
| `kotlin.time.Duration` | `number` (seconds) (SDK 52+) |

On Android, primitive arrays should be used whenever possible.

### Native classes

| Class | Members |
| --- | --- |
| `Module` | Base class for a native module. Property `appContext: AppContext`. Method `sendEvent(eventName, payload)` (payload: Android `Map<String, Any?>` / `Bundle`, iOS `[String: Any?]`). |
| `AppContext` | Interface to a single Expo app. Properties: `constants` (Android `ConstantsInterface?` / iOS `EXConstantsInterface?`), `permissions` (Android `Permissions?` / iOS `EXPermissionsInterface?`), `activityProvider: ActivityProvider?`, `reactContext: Context?`, `hasActiveReactInstance: Boolean`, `utilities: EXUtilitiesInterface?` (legacy module registry accessors). |
| `ExpoView` | Base class for all exported views. On iOS it extends `RCTView` (handles some styles such as borders, and accessibility). Property `appContext`. A view exported with `View` must inherit from it; constructor parameters cannot be changed because the view is initialized by `expo-modules-core`. |

```kotlin
class LinearGradientView(
  context: Context,
  appContext: AppContext,
) : ExpoView(context, appContext)

class LinearGradientModule : Module() {
  override fun definition() = ModuleDefinition {
    View(LinearGradientView::class) {
      // ...
    }
  }
}
```

### Sending events

Declare names with `Events`, then call `sendEvent(eventName, payload)` on the module instance.

```kotlin
const val CLIPBOARD_CHANGED_EVENT_NAME = "onClipboardChanged"

class ClipboardModule : Module() {
  override fun definition() = ModuleDefinition {
    Events(CLIPBOARD_CHANGED_EVENT_NAME)

    OnStartObserving {
      clipboardManager?.addPrimaryClipChangedListener(listener)
    }

    OnStopObserving {
      clipboardManager?.removePrimaryClipChangedListener(listener)
    }
  }
  // ...
}
```

```ts
import { requireNativeModule, NativeModule } from 'expo';

type ClipboardChangeEvent = {
  contentTypes: string[];
};

type ClipboardModuleEvents = {
  onClipboardChanged(event: ClipboardChangeEvent): void;
};

declare class ClipboardModule extends NativeModule<ClipboardModuleEvents> {}

const Clipboard = requireNativeModule<ClipboardModule>('Clipboard');

Clipboard.addListener('onClipboardChanged', (event: ClipboardChangeEvent) => {
  alert('Clipboard has changed');
});
```

Native modules extend the built-in `EventEmitter` class; the `useEvent` and `useEventListener` hooks (documented in the Expo SDK `expo` package page) are alternatives to `addListener`.

### View callbacks

View-bound events (for example a touch on one specific view) cannot use `sendEvent`. Declare the event name with `Events` inside `View`, then declare a property of type `EventDispatcher` in the view class with the same name as the exported event, and call it with a payload (`[String: Any?]` on iOS, `Map<String, Any?>` on Android).

```swift
class CameraViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CameraView")

    View(CameraView.self) {
      Events(
        "onCameraReady"
      )
    }
  }
}

class CameraView: ExpoView {
  let onCameraReady = EventDispatcher()

  func callOnCameraReady() {
    onCameraReady([
      "message": "Camera was mounted"
    ]);
  }
}
```

```tsx
import { requireNativeViewManager } from 'expo-modules-core';

const CameraView = requireNativeViewManager('CameraView');

export default function MainView() {
  const onCameraReady = event => {
    console.log(event.nativeEvent);
  };

  return <CameraView onCameraReady={onCameraReady} />;
}
```

## Notes

- `Constants` is deprecated; use `Constant`.
- The official Kotlin example uses a bare `return` inside the `Function` lambda, which does not compile; this page uses `return@Function` as in the official tutorials.
- In the view-callback example, `Name("CameraView")` is added so the module name matches `requireNativeViewManager('CameraView')`; without it the name is inferred from the class name (`CameraViewModule`).
- `Formatter` and `ValueOrUndefined` are marked experimental in the source page.
- On Android, for `Promise` import the class from `expo.modules.kotlin` instead of `expo.modules.core`.
- On Android the view-callback payload type can be specified; for types that do not convert into objects the payload is wrapped as `{ payload: <provided value> }`. The payload is available under the `nativeEvent` key in JavaScript.
- Real-world modules using this API (Swift and/or Kotlin sources in the expo repo): expo-battery, expo-cellular, expo-clipboard, expo-crypto, expo-device, expo-haptics, expo-image-manipulator, expo-image-picker, expo-linear-gradient, expo-localization, expo-store-review, expo-system-ui, expo-video-thumbnails, expo-web-browser.
- Distinct from the apple-swift skill (Swift language and Apple SDKs) and the android-architecture skill (Android app architecture); this page only covers the Expo Modules DSL built on them.
- Source modificationDate: September 25, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Expo Modules API: Get started](./get-started.md)
- [Inline modules reference](./inline-modules-reference.md)
- [Android lifecycle listeners](./android-lifecycle-listeners.md)
- [iOS AppDelegate subscribers](./appdelegate-subscribers.md)
- [Using shared objects](./shared-objects.md)
- [expo-module.config.json](./module-config.md)
- [Mocking native calls in Expo modules](./mocking.md)
- [Wrap third-party native libraries](./third-party-library.md)
