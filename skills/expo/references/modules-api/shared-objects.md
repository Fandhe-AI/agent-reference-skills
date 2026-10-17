---
source: https://docs.expo.dev/modules/shared-objects/
---

# Using shared objects

Shared objects expose long-lived native instances from Android and iOS to JavaScript/TypeScript without handing over their lifecycle. On the native side you inherit from `SharedObject` and expose it in the module definition with `Class()`. A shared object is deallocated automatically once neither JavaScript nor native holds a reference.

## Signature / Usage

Android (Kotlin), from the official example:

```kotlin
class ImageRef : SharedRef<Bitmap>()

class SimpleImageContext(
  runtimeContext: RuntimeContext,
  bitmap: Bitmap
) : SharedObject(runtimeContext) {
  private var current: Bitmap = bitmap

  fun rotate(degrees: Float) = apply {
    val matrix = Matrix().apply { postRotate(degrees) }
    current = Bitmap.createBitmap(current, 0, 0, current.width, current.height, matrix, true)
  }

  fun flipX() = apply {
    val matrix = Matrix().apply { preScale(-1f, 1f) }
    current = Bitmap.createBitmap(current, 0, 0, current.width, current.height, matrix, true)
  }

  fun render(): ImageRef = ImageRef(current, runtimeContext)

  override fun sharedObjectDidRelease() {
    if (!current.isRecycled) current.recycle()
  }
}
```

```kotlin
class SimpleImageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SimpleImageModule")

    AsyncFunction("createContextAsync") { path: String ->
      val bitmap = BitmapFactory.decodeFile(path)
        ?: throw Exceptions.IllegalArgument("Unable to decode image at $path")
      SimpleImageContext(runtimeContext, bitmap)
    }

    Class<SimpleImageContext>("Context") {
      Function("rotate") { ctx: SimpleImageContext, degrees: Float -> ctx.rotate(degrees) }
      Function("flipX") { ctx: SimpleImageContext -> ctx.flipX() }
      AsyncFunction("renderAsync") Coroutine { ctx: SimpleImageContext -> ctx.render() }
    }
  }
}
```

iOS (Swift):

```swift
import ExpoModulesCore
import UIKit

final class ImageRef: SharedRef<UIImage> {}

final class SimpleImageContext: SharedObject {
  private var current: UIImage

  init(path: String) throws {
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: path)),
          let image = UIImage(data: data) else {
      throw Exceptions.InvalidArgument()
    }
    self.current = image
    super.init()
  }

  func rotate(by degrees: Double) {
    current = current.rotated(degrees: degrees)
  }

  func flipX() {
    current = current.withHorizontallyFlippedOrientation()
  }

  func render() -> ImageRef {
    return ImageRef(current)
  }
}
```

```swift
public final class SimpleImageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SimpleImageModule")

    AsyncFunction("createContextAsync") { (path: String) -> SimpleImageContext in
      return try SimpleImageContext(path: path)
    }

    Class("Context", SimpleImageContext.self) {
      Function("rotate") { (ctx, degrees: Double) -> SimpleImageContext in
        ctx.rotate(by: degrees)
        return ctx
      }

      Function("flipX") { (ctx: SimpleImageContext) -> SimpleImageContext in
        ctx.flipX()
        return ctx
      }

      AsyncFunction("renderAsync") { (ctx: SimpleImageContext) -> ImageRef in
        return ctx.render()
      }
    }
  }
}
```

JavaScript usage:

```tsx
import { useState } from 'react';
import { Button } from 'react-native';
import { Image } from 'expo-image';
import type { SharedRef } from 'expo';
import SimpleImageModule from 'simple-image-module'; // The native custom module

import { pickImageAsync } from './pickImage'; // The custom TypeScript function

export function SharedImageExample() {
  const [context, setContext] = useState(null);
  const [result, setResult] = useState<SharedRef<'image'> | null>(null);

  const load = async () => {
    const uri = await pickImageAsync();
    if (!uri) {
      return;
    }

    const ctx = await SimpleImageModule.createContextAsync(uri);

    setContext(ctx);
    setResult(await ctx.renderAsync());
  };

  const rotateAndFlip = async () => {
    if (!context) {
      return;
    }

    setResult(await context.rotate(90).flipX().renderAsync());
  };

  return (
    <>
      <Button title="Pick image" onPress={load} />
      <Button title="Rotate 90° + flip X" onPress={rotateAndFlip} disabled={!context} />
      {result && <Image source={result} style={{ width: 200, height: 200 }} />}
    </>
  );
}
```

## Options / Props

Class definition DSL components inside a `Class()` block (beyond `Function` and `AsyncFunction`):

| Name | Description |
| --- | --- |
| `Constructor` | Lets JavaScript create instances with `new ClassName(args)`. Receives JS arguments and must return an instance of the shared object class. Without it, instances can only be created by native functions that return the shared object. |
| `StaticFunction` | Synchronous function on the class, callable as `ClassName.functionName()`. Unlike `Function`, does not receive the instance. |
| `StaticAsyncFunction` | Asynchronous function on the class, callable as `await ClassName.functionName()`; returns a `Promise`. On Kotlin the `Coroutine` modifier can be used. |
| `Property` | Inside `Class()`, receives the class instance as a parameter (like `Function`); supports `.get { }` / `.set { }` for computed read-write properties. |

```swift
Class(VideoPlayer.self) {
  Property("isPlaying") { (player: VideoPlayer) -> Bool in
    return player.isPlaying
  }

  Property("volume")
    .get { (player: VideoPlayer) -> Float in
      return player.volume
    }
    .set { (player: VideoPlayer, volume: Float) in
      player.volume = volume
    }
}
```

```kotlin
Class(VideoPlayer::class) {
  Property("isPlaying") { player: VideoPlayer ->
    return@Property player.isPlaying
  }

  Property("volume")
    .get { player: VideoPlayer ->
      return@get player.volume
    }
    .set { player: VideoPlayer, volume: Float ->
      player.volume = volume
    }
}
```

```js
const player = new VideoPlayer(source);

// Read-only property
console.log(player.isPlaying); // false

// Read-write property
player.volume = 0.5;
console.log(player.volume); // 0.5
```

```swift
Class(MySharedObject.self) {
  Constructor { (date: Date) in
    ... 
  }
}
```

```kotlin
Class(MySharedObject::class) {
  Constructor { date: Date ->
    ... 
  }
}
```

## Notes

- Purpose: keep heavy state (for example a decoded bitmap) alive across components instead of reloading and re-decoding from disk each time. Benefits: reduced disk I/O, fewer decode operations, lower memory pressure, faster in-memory transforms, fewer dropped frames. They also enable an object-oriented API shape (methods on a long-lived instance, chaining).
- `sharedObjectDidRelease()` (Android in the example) is invoked when JavaScript releases all references, to clean up native resources.
- `ImageRef` is a specialized `SharedRef<Bitmap>` (Android) / `SharedRef<UIImage>` (iOS) that `expo-image` and other image-aware modules understand.
- `createContextAsync` and `renderAsync` are async because of I/O / possible copying; `rotate` and `flipX` run synchronously because they only manipulate memory. Writing to a file requires an explicit save function (for example `saveAsync` in an image manipulator).
- In the JS example, `ImagePicker` (`expo-image-picker`) returns a plain file URI; the native module lifts it into a shared object.
- Expo libraries using shared objects: `expo-image`, `expo-image-manipulator`, `expo-sqlite` (database, session and statement handles), and `expo/fetch` (request/response lifecycles).
- Kotlin snippet note: the official Android example code is reproduced as published; its first snippet declares `ImageRef` with `SharedRef` while importing only `SharedObject`.
- The upstream Kotlin example is abbreviated: `class ImageRef : SharedRef<Bitmap>()` declares no constructor, yet `render()` calls `ImageRef(current, runtimeContext)`; a real implementation must declare a constructor taking the `Bitmap` and `RuntimeContext` and pass them to `SharedRef`.
- `UIImage.rotated(degrees:)` is not a UIKit API; the upstream Swift example assumes a custom helper extension that is not shown and must be implemented separately.
- In the upstream example `pickImageAsync` returns a `file://` URI, while the native `createContextAsync` treats its argument as a filesystem path (`BitmapFactory.decodeFile` / `URL(fileURLWithPath:)`); strip the `file://` scheme or resolve the URI natively before decoding.
- The upstream Kotlin example passes the same `current` Bitmap to `ImageRef` that `sharedObjectDidRelease()` later recycles, so an `ImageRef` kept after its context is released points at a recycled Bitmap (expo-image may fail to draw it or crash); in a real implementation either hand `ImageRef` an independent copy (for example `current.copy(current.config, false)`) or skip `recycle()` while any `ImageRef` still references the bitmap.
- Distinct from apple-swift / android-architecture.
- Source modificationDate: March 03, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Module API Reference](./module-api.md)
- [Design considerations](./design.md)
- [Type generation reference](./type-generation-reference.md)
