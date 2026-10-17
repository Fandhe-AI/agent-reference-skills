---
source: https://docs.flutter.dev/deployment/flavors-windows
---

# Set up Flutter flavors for Windows

How to create Flutter flavors for Windows desktop apps. A flavor can determine the window title, application icon, API endpoint, asset set and logging configuration for a build. Built-in support for flavors on Windows requires Flutter 3.47 or later.

## Signature / Usage

```console
$ flutter run -d windows --flavor <flavor_name>
$ flutter build windows --flavor <flavor_name>
$ flutter test --flavor <flavor_name>
```

Passing `--flavor` works on Windows without any CMake configuration: Flutter isolates the build directory, populates `appFlavor`, and filters flavor-specific assets automatically. The `--flavor` option also works with `flutter test` and `flutter drive`.

| Flavor | Build mode | Output directory |
|--------|------------|------------------|
| staging | debug | `build/windows/<arch>/staging/runner/Debug/` |
| production | debug | `build/windows/<arch>/production/runner/Debug/` |
| staging | release | `build/windows/<arch>/staging/runner/Release/` |
| production | release | `build/windows/<arch>/production/runner/Release/` |

### How it works

On Windows, Flutter uses CMake to configure and build the native desktop runner. With `--flavor`, Flutter writes the flavor name into `windows/flutter/ephemeral/generated_config.cmake` as the `FLUTTER_APP_FLAVOR` variable.

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

In `windows/runner/CMakeLists.txt`, add this block before the `add_executable(${BINARY_NAME} ...)` line:

```cmake
# Defaults, so unknown or missing flavors still get a valid icon and title.
set(RUNNER_APP_ICON "app_icon.ico")
set(WINDOW_TITLE "${BINARY_NAME}")

# Configure flavor-specific settings.
if(DEFINED FLUTTER_APP_FLAVOR)
  if(FLUTTER_APP_FLAVOR STREQUAL "staging")
    set(RUNNER_APP_ICON "staging.ico")
    set(WINDOW_TITLE "Staging App")
  elseif(FLUTTER_APP_FLAVOR STREQUAL "production")
    set(RUNNER_APP_ICON "production.ico")
    set(WINDOW_TITLE "Production App")
  endif()
endif()

configure_file(
  "${CMAKE_CURRENT_SOURCE_DIR}/main.cpp.in"
  "${CMAKE_CURRENT_SOURCE_DIR}/main.cpp"
  @ONLY
)

configure_file(
  "${CMAKE_CURRENT_SOURCE_DIR}/Runner.rc.in"
  "${CMAKE_CURRENT_SOURCE_DIR}/Runner.rc"
  @ONLY
)
```

Add the generated files to `.gitignore` and commit the `.in` templates instead:

```gitignore
windows/runner/main.cpp
windows/runner/Runner.rc
```

Distinct window titles: rename `windows/runner/main.cpp` to `main.cpp.in` and replace the hardcoded title:

```cpp
  if (!window.Create(L"@WINDOW_TITLE@", origin, size)) {
    return EXIT_FAILURE;
  }
```

Distinct app icons: put `staging.ico` / `production.ico` in `windows/runner/resources/` next to `app_icon.ico`, rename `Runner.rc` to `Runner.rc.in`, and update:

```rc
IDI_APP_ICON            ICON                    "resources\\@RUNNER_APP_ICON@"
VALUE "FileDescription", "@WINDOW_TITLE@" "\0"
VALUE "ProductName",     "@WINDOW_TITLE@" "\0"
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

- `generated_config.cmake` is included from `windows/flutter/CMakeLists.txt`, so `FLUTTER_APP_FLAVOR` only becomes visible in your top-level `CMakeLists.txt` **after** the `add_subdirectory(${FLUTTER_MANAGED_DIR})` line. Any `if(DEFINED FLUTTER_APP_FLAVOR)` block placed before that line is silently skipped. `windows/runner/CMakeLists.txt` is evaluated after the variable is defined.
- `appFlavor` matches the string passed to `--flavor`; if omitted it matches the `default-flavor` in `pubspec.yaml`; if neither is specified it is `null`.
- Because `configure_file` generates `main.cpp` and `Runner.rc` in the source directory at build time, add both to `.gitignore`.
- The CMake snippet is adapted from the source: defaults are set before the flavor check so unknown flavors (e.g. qa) still get a valid icon and title. The source example sets them only for `staging` and `production`.
- Flutter build configuration only; MSIX and Microsoft Store packaging is covered by windows-packaging-publish.

## Related

- [Set up Flutter flavors for Android](./flavors.md)
- [Set up Flutter flavors for iOS and macOS](./flavors-ios.md)
- [Set up Flutter flavors for Linux](./flavors-linux.md)
- [Build and release a Windows desktop app](./deploy-windows.md)
