---
source: https://docs.flutter.dev/perf/impeller
---

# Impeller rendering engine

What Impeller is and how to enable or disable it per platform.

## Signature / Usage

```console
flutter run --no-enable-impeller
```

Impeller provides a new rendering runtime for Flutter. It precompiles a smaller, simpler set of shaders at engine-build time so they don't compile at runtime.

Impeller has the following objectives:

- **Predictable performance**: Impeller compiles all shaders and reflection offline at build time. It builds all pipeline state objects upfront. The engine controls caching and caches explicitly.
- **Instrumentable**: Impeller tags and labels all graphics resources, such as textures and buffers. It can capture and persist animations to disk without affecting per-frame rendering performance.
- **Portable**: Flutter doesn't tie Impeller to a specific client-rendering API. You can author shaders once and convert them to backend-specific formats, as necessary.
- **Leverages modern graphics APIs**: Impeller uses, but doesn't depend on, features available in modern APIs like Metal and Vulkan.
- **Leverages concurrency**: Impeller can distribute single-frame workloads across multiple threads, if necessary.

## Availability

| Platform | Status | Disable when deploying |
|----------|--------|------------------------|
| iOS | The **only supported** rendering engine, with no ability to switch to Skia | Not possible |
| Android | **Available and enabled by default on Android API 29+**. On lower Android versions or devices without Vulkan, falls back to the legacy OpenGL renderer (no action necessary) | `AndroidManifest.xml` meta-data (below) |
| Web | Currently uses Skia for rendering. It might use Impeller in the future | n/a |
| macOS | **Available and enabled by default as of Flutter 3.47** | `Info.plist` key (below) |
| Linux | **Available and enabled by default as of Flutter 3.47** | `linux/runner/my_application.cc` (below) |
| Windows | **Available and enabled by default as of Flutter 3.47** | `windows\runner\main.cpp` (below) |

To disable Impeller when debugging on Android, macOS, Linux, or Windows, pass `--no-enable-impeller` to `flutter run`.

### Android

Add the following setting to your project's `AndroidManifest.xml` file under the `<application>` tag:

```xml
<meta-data
    android:name="io.flutter.embedding.android.EnableImpeller"
    android:value="false" />
```

### macOS

Add the following tags under the top-level `<dict>` tag in your app's `Info.plist` file:

```xml
  <key>FLTEnableImpeller</key>
  <false />
```

### Linux

Add the following setup to your project in `linux/runner/my_application.cc`:

```c diff
  g_autoptr(FlDartProject) project = fl_dart_project_new();
+ fl_dart_project_set_enable_impeller(project, FALSE);
```

### Windows

Add the following setup to your project in `windows\runner\main.cpp`:

```cpp diff
  flutter::DartProject project(L"data");
+ project.set_impeller_switch(flutter::ImpellerSwitch::Disabled);
```

## Bugs and issues

If you encounter performance or fidelity issues with Impeller on any platform, file an issue in the GitHub tracker. Prefix the issue title with `[Impeller]` and include a small reproducible test case. Please include the device you are running on (including the chip information), screenshots or recordings of any visible issues, and an export of the performance trace (zipped and attached to the GitHub issue).

## Notes

- As of the 3.27 release, Impeller is the default rendering engine for both iOS and Android API 29+. For detailed info on where Impeller is currently supported, see the "Can I use Impeller?" page.
- Flutter 3.47: Impeller is available and enabled by default on macOS, Linux, and Windows. In a future release, the ability to opt out of using Impeller will be removed on those three platforms.
- Distance line: Impeller is Flutter's own rendering engine; it uses Metal and Vulkan but the Metal / Vulkan APIs themselves are covered by apple-graphics, apple-silicon, and windows-graphics-media, not by this skill.
- For design and architecture details, see the `README.md` in the Flutter engine source tree (`engine/src/flutter/impeller/README.md`).

## Related

- [Impeller anti-aliasing](./antialiasing.md)
- [Improving rendering performance](./rendering-performance.md)
