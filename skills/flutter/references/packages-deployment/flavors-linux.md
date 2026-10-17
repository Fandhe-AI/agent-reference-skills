---
source: https://docs.flutter.dev/deployment/flavors-linux
---

# Set up Flutter flavors for Linux

How to create Flutter flavors for Linux desktop apps. A flavor can determine the window title, application ID, API endpoint, asset set and logging configuration for a build. Built-in support for flavors on Linux requires Flutter 3.47 or later.

## Signature / Usage

```console
$ flutter run -d linux --flavor <flavor_name>
$ flutter build linux --flavor <flavor_name>
$ flutter test --flavor <flavor_name>
```

Passing `--flavor` works on Linux without any project configuration: Flutter isolates the build directory, populates `appFlavor`, and filters flavor-specific assets automatically. `--flavor` also works with `flutter test` and `flutter drive`.

| Flavor | Build mode | Output directory |
|--------|------------|------------------|
| staging | debug | `build/linux/<arch>/staging/debug/bundle/` |
| production | debug | `build/linux/<arch>/production/debug/bundle/` |
| staging | release | `build/linux/<arch>/staging/release/bundle/` |
| production | release | `build/linux/<arch>/production/release/bundle/` |

### How it works

On Linux, Flutter uses CMake. With `--flavor`, Flutter writes the flavor name into `linux/flutter/ephemeral/generated_config.cmake` as the `FLUTTER_APP_FLAVOR` variable.

### Configure CMake for flavors (optional)

In `linux/CMakeLists.txt`, set `APPLICATION_ID` per flavor immediately after the `add_subdirectory(${FLUTTER_MANAGED_DIR})` line:

```cmake
# Flutter library and tool build rules.
set(FLUTTER_MANAGED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/flutter")
add_subdirectory(${FLUTTER_MANAGED_DIR})

if(DEFINED FLUTTER_APP_FLAVOR)
  if(FLUTTER_APP_FLAVOR STREQUAL "staging")
    set(APPLICATION_ID "com.example.staging")
  elseif(FLUTTER_APP_FLAVOR STREQUAL "production")
    set(APPLICATION_ID "com.example.production")
  endif()
endif()
```

`APPLICATION_ID` must be configured after `add_subdirectory(${FLUTTER_MANAGED_DIR})` (where `FLUTTER_APP_FLAVOR` becomes available) and before `add_subdirectory("runner")` where `APPLICATION_ID` is consumed.

### Use flavors in Flutter code

```dart
import 'package:flutter/services.dart';

void main() {
  if (appFlavor == 'production') {
    Config.apiUrl = 'https://api.example.com';
  } else if (appFlavor == 'staging') {
    Config.apiUrl = 'https://staging.api.example.com';
  }

  runApp(const MyApp());
}
```

### Customize configurations

Distinct window titles. In `linux/runner/CMakeLists.txt`, directly after the existing `APPLICATION_ID` definition:

```cmake
# Add preprocessor definitions for the application ID.
add_definitions(-DAPPLICATION_ID="${APPLICATION_ID}")

if(DEFINED FLUTTER_APP_FLAVOR AND NOT FLUTTER_APP_FLAVOR STREQUAL "")
  add_definitions(-DFLUTTER_APP_FLAVOR="${FLUTTER_APP_FLAVOR}")
endif()
```

In `linux/runner/my_application.cc`, in `my_application_activate`:

```c
  const gchar* window_title = "flavors_example";
#ifdef FLUTTER_APP_FLAVOR
  if (g_strcmp0(FLUTTER_APP_FLAVOR, "staging") == 0) {
    window_title = "Staging App";
  } else if (g_strcmp0(FLUTTER_APP_FLAVOR, "production") == 0) {
    window_title = "Production App";
  }
#endif
```

```c
    gtk_header_bar_set_title(header_bar, window_title);
    // ...
    gtk_window_set_title(window, window_title);
```

Bundle assets by flavor and set a default flavor in `pubspec.yaml`:

```yaml
flutter:
  assets:
    - assets/common/
    - path: assets/staging/
      flavors:
        - staging
    - path: assets/production/
      flavors:
        - production
  default-flavor: staging
```

## Notes

- `FLUTTER_APP_FLAVOR` only becomes visible in your top-level `CMakeLists.txt` **after** the `add_subdirectory(${FLUTTER_MANAGED_DIR})` line; an `if(DEFINED FLUTTER_APP_FLAVOR)` block before it is silently skipped.
- Leave `set(BINARY_NAME ...)` unchanged. The Flutter CLI resolves the executable path by parsing that line literally, so renaming the binary per flavor prevents `flutter run` from launching the app.
- `appFlavor` matches the string passed to `--flavor`; if omitted it matches the `default-flavor` in `pubspec.yaml`; if neither is specified it is `null`.
- On Linux, application icons are not embedded in the executable; the desktop environment resolves icons through `.desktop` launcher files and installed icon themes. For per-flavor icons, configure your Linux package format (Snap, Flatpak, Debian) to install distinct desktop entries and icon assets.
- Flutter build configuration only; CMake and Snap packaging themselves are outside this skill.

## Related

- [Set up Flutter flavors for Android](./flavors.md)
- [Set up Flutter flavors for iOS and macOS](./flavors-ios.md)
- [Set up Flutter flavors for Windows](./flavors-windows.md)
- [Build and release a Linux app to the Snap Store](./deploy-linux.md)
