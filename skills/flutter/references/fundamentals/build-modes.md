---
source: https://docs.flutter.dev/testing/build-modes
---

# Flutter's build modes

The Flutter tooling supports three modes when compiling your app, and a headless mode for testing. Choose a mode by where you are in the development cycle.

## Signature / Usage

```text
flutter run              # debug (default)
flutter run --profile    # profile
flutter run --release    # release
flutter build <target>   # release mode for a specific target; list targets with `flutter help build`
```

- Use debug mode during development, when you want hot reload.
- Use profile mode to analyze performance.
- Use release mode when ready to release your app.

For the headless testing mode, see the engine wiki's docs on Flutter's build modes (`docs/engine/Flutter's-modes.md` in the flutter/flutter repository).

### Debug

The app is set up for debugging on the physical device, emulator, or simulator. On mobile:

- Assertions are enabled.
- Service extensions are enabled.
- Compilation is optimized for fast development and run cycles (not for execution speed, binary size, or deployment).
- Debugging is enabled; tools supporting source level debugging (such as DevTools) can connect to the process.

On web: the build is not minified and tree shaking has not been performed; the app is compiled with the `dartdevc` compiler for easier debugging.

By default, `flutter run` compiles to debug mode. In Android Studio use **Run > Debug...**.

### Release

For deploying the app: maximum optimization and minimal footprint. On mobile (not supported on the simulator or emulator):

- Assertions are disabled.
- Debugging information is stripped out.
- Debugging is disabled.
- Compilation is optimized for fast startup, fast execution, and small package sizes.
- Service extensions are disabled.

On web: the build is minified and tree shaking has been performed; the app is compiled with the `dart2js` compiler for best performance.

`flutter run --release` compiles to release mode; compile for a specific target with `flutter build <target>`. In Android Studio use **Run > Run...**.

### Profile

Some debugging ability is maintained, enough to profile performance. Profile mode is disabled on the emulator and simulator because their behavior is not representative of real performance. On mobile it is similar to release mode, except:

- Some service extensions, such as the one that enables the performance overlay, are enabled.
- Tracing is enabled, and tools supporting source-level debugging (such as DevTools) can connect to the process.

On web: the build is not minified but tree shaking has been performed; the app is compiled with `dart2js`. DevTools cannot connect to a Flutter web app in profile mode; use Chrome DevTools to generate timeline events.

`flutter run --profile` compiles to profile mode; in Android Studio use **Run > Profile...**.

## Notes

- Hot reload works only in debug mode.
- The emulator and simulator execute only in debug mode.
- Application performance can be janky in debug mode. Measure performance in profile mode on an actual device.
- Use the DevTools suite to profile your app's performance.

## Related

- [Supported platforms](./supported-platforms.md)
- [Security](./security.md)
