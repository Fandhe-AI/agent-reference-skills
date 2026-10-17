---
source: https://docs.flutter.dev/perf/deferred-components
---

# Deferred components for Android and web

Android and web apps can download deferred components (additional code and assets) while the app is already running, using Dart deferred imports.

## Signature / Usage

```dart
import 'package:material_ui/material_ui.dart';

import 'box.dart' deferred as box;

class SomeWidget extends StatefulWidget {
  const SomeWidget({super.key});

  @override
  State<SomeWidget> createState() => _SomeWidgetState();
}

class _SomeWidgetState extends State<SomeWidget> {
  late Future<void> _libraryFuture;

  @override
  void initState() {
    super.initState();
    _libraryFuture = box.loadLibrary();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _libraryFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          }
          return box.DeferredBox();
        }
        return const CircularProgressIndicator();
      },
    );
  }
}
```

While Flutter supports deferred loading on Android and the web, the implementations differ. Both require Dart's deferred imports.

- Android's dynamic feature modules deliver the deferred components packaged as Android modules. You must build the entire app and upload it as a single Android App Bundle (AAB); Flutter doesn't support dispatching partial updates without re-uploading new Android App Bundles for the entire application. Flutter performs deferred loading when you compile your Android app in release or profile mode, but debug mode treats all deferred components as regular imports.
- The web creates deferred components as separate `*.js` files.

## Android setup

### Step 1: Dependencies and initial project setup

1. Add Play Core to the Android app's build.gradle dependencies.

   Kotlin (`android/app/build.gradle.kts`):

   ```kotlin
   dependencies {
     implementation("com.google.android.play:core:1.8.0")
   }
   ```

   Groovy (`android/app/build.gradle`):

   ```groovy
   dependencies {
     implementation "com.google.android.play:core:1.8.0"
   }
   ```

2. If using the Google Play Store as the distribution model for dynamic features, the app must support `SplitCompat` and provide an instance of a `PlayStoreDeferredComponentManager`. Both can be accomplished by setting the `android:name` property on the application in `android/app/src/main/AndroidManifest.xml` to `io.flutter.embedding.android.FlutterPlayStoreSplitApplication`:

   ```xml
   <manifest ...
     <application
        android:name="io.flutter.embedding.android.FlutterPlayStoreSplitApplication"
           ...
     </application>
   </manifest>
   ```

   If your Android application is large or complex, you might want to separately support `SplitCompat` and provide the `PlayStoreDynamicFeatureManager` manually. To support `SplitCompat`, any of three methods are valid:

   ```java
   public class MyApplication extends SplitCompatApplication {
       ...
   }
   ```

   ```java
   @Override
   protected void attachBaseContext(Context base) {
       super.attachBaseContext(base);
       // Emulates installation of future on demand modules using SplitCompat.
       SplitCompat.install(this);
   }
   ```

   ```xml
   <application
       ...
       android:name="com.google.android.play.core.splitcompat.SplitCompatApplication">
   </application>
   ```

   (The third method also adds the Flutter compatibility code from `FlutterApplication` to your application class.) Provide a `PlayStoreDeferredComponentManager` into the Flutter embedder by adding the following to your app initialization:

   ```java
   import io.flutter.embedding.engine.dynamicfeatures.PlayStoreDeferredComponentManager;
   import io.flutter.FlutterInjector;
   ...
   PlayStoreDeferredComponentManager deferredComponentManager = new
     PlayStoreDeferredComponentManager(this, null);
   FlutterInjector.setInstance(new FlutterInjector.Builder()
       .setDeferredComponentManager(deferredComponentManager).build());
   ```

3. Opt into deferred components by adding the `deferred-components` entry to the app's `pubspec.yaml` under the `flutter` entry:

   ```yaml
   flutter:
     deferred-components:
   ```

   The `flutter` tool looks for this entry to determine whether the app should be built as deferred or not. It can be left empty until step 3.3.

### Step 2: Implementing deferred Dart libraries

Create a new Dart library, for example a simple blue box widget in `box.dart`:

```dart
import 'package:material_ui/material_ui.dart';

/// A simple blue 30x30 box.
class DeferredBox extends StatelessWidget {
  const DeferredBox({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(height: 30, width: 30, color: Colors.blue);
  }
}
```

Import it with the `deferred` keyword and call `loadLibrary()` (see the usage snippet above). `loadLibrary()` returns a `Future<void>` that completes successfully when the code in the library is available for use and completes with an error otherwise. All usage of symbols from the deferred library should be guarded behind a completed `loadLibrary()` call. All imports of the library must be marked as `deferred` for it to be compiled appropriately. If a component has already been loaded, additional calls complete quickly (but not synchronously). `loadLibrary()` can also be called early to trigger a pre-load to help mask the loading time.

### Step 3: Building the app

```console
$ flutter build appbundle
```

This command validates that your project is properly set up to build deferred components apps. By default, the build fails if the validator detects any issues and guides you through suggested changes.

- `--no-deferred-components`: opt out of building deferred components. All assets defined under deferred components are treated as if defined under the assets section of `pubspec.yaml`; all Dart code is compiled into a single shared library and `loadLibrary()` calls complete in the next event loop boundary. Equivalent to omitting the `deferred-components:` entry in `pubspec.yaml`.
- `--no-validate-deferred-components`: attempt to build without the validator. This can result in unexpected and confusing instructions to resolve failures; meant for custom implementations that don't rely on the default Play-store-based implementation.

3.1. The command runs the validator and attempts to build with `gen_snapshot` instructed to produce split AOT shared libraries as separate SO files. The validator is split into prebuild and post-gen_snapshot validation, since validation referencing loading units can't happen until `gen_snapshot` produces a final set of loading units. Current generated loading units are tracked in `<projectDirectory>/deferred_components_loading_units.yaml`, which should be checked into source control. The validator also checks in the `android` directory:

- `<projectDir>/android/app/src/main/res/values/strings.xml`: an entry for every deferred component mapping the key `${componentName}Name` to `${componentName}`, used by each feature module's `AndroidManifest.xml` for the `dist:title` property:

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
    ...
    <string name="boxComponentName">boxComponent</string>
  </resources>
  ```

- `<projectDir>/android/<componentName>`: an Android dynamic feature module for each deferred component, containing a `build.gradle` and `src/main/AndroidManifest.xml`. Only existence is checked; if missing, a default recommended one is generated.
- `<projectDir>/android/app/src/main/res/values/AndroidManifest.xml`: contains a meta-data entry that encodes the mapping between loading units and component name:

  ```xml
  ...
  <application
      android:label="MyApp"
      android:name="io.flutter.app.FlutterPlayStoreSplitApplication"
      android:icon="@mipmap/ic_launcher">
      ...
      <meta-data android:name="io.flutter.embedding.engine.deferredcomponents.DeferredComponentManager.loadingUnitMapping" android:value="2:boxComponent"/>
  </application>
  ...
  ```

The `gen_snapshot` validator won't run until the prebuild validator passes.

3.2. For each check, the tool produces the modified or new files needed to pass it, placed in `<projectDir>/build/android_deferred_components_setup_files`. It is recommended to copy and overwrite the same files in the project's `android` directory (commit the current state first and review the changes). The tool won't change your `android/` directory automatically.

3.3. Once the loading units are logged in `<projectDirectory>/deferred_components_loading_units.yaml`, configure the pubspec's `deferred-components` section. The generated file for the box example:

```yaml
loading-units:
  - id: 2
    libraries:
      - package:MyAppName/box.Dart
```

The loading unit id is used internally by Dart and can be ignored. The base loading unit (id '1') is not listed and contains everything not explicitly contained in another loading unit. Then add to `pubspec.yaml`:

```yaml
flutter:
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
```

Guidelines for assigning loading units:

- Loading units shouldn't be included in more than one component.
- Including one Dart library from a loading unit indicates that the entire loading unit is assigned to the deferred component.
- All loading units not assigned to a deferred component are included in the base component, which always exists implicitly.
- Loading units assigned to the same deferred component are downloaded, installed, and shipped together.
- The base component is implicit and need not be defined in the pubspec.

3.4. Assets can also be included by adding an `assets` section in the deferred component configuration:

```yaml
  deferred-components:
    - name: boxComponent
      libraries:
        - package:MyAppName/box.Dart
      assets:
        - assets/image.jpg
        - assets/picture.png
          # wildcard directory
        - assets/gallery/
```

An asset can be included in multiple deferred components, but installing both components results in a replicated asset. Assets-only components can be defined by omitting the libraries section; they must be installed with the `DeferredComponent` utility class in services rather than `loadLibrary()`. If a Dart library is loaded with `loadLibrary()`, any assets in the component are loaded as well; installing by component name with the services utility won't load any Dart libraries in the component.

3.5. Manually add all deferred components defined in `pubspec.yaml` into `android/settings.gradle` as includes.

Kotlin (`android/settings.gradle.kts`):

```kotlin
include(":app", ":boxComponent", ":circleComponent", ":assetComponent")
...
```

Groovy (`android/settings.gradle`):

```groovy
include ':app', ':boxComponent', ':circleComponent', ':assetComponent'
...
```

3.6. Repeat steps 3.1 through 3.6 until all validator recommendations are handled. When successful, the command outputs `app-release.aab` in `build/app/outputs/bundle/release`. A successful build doesn't always mean the app was built as intended: a common mistake is accidentally importing a Dart library without the `deferred` keyword, resulting in it being compiled as part of the base loading unit. Check `deferred_components_loading_units.yaml` to verify the generated loading units. When adjusting configurations, or making Dart changes that add, modify, or remove loading units, expect the validator to fail and repeat the steps.

### Running the app locally

Use Android's `bundletool` with the `--local-testing` flag. Download the bundletool jar from github.com/google/bundletool/releases and run:

```console
$ java -jar bundletool.jar build-apks --bundle=<your_app_project_dir>/build/app/outputs/bundle/release/app-release.aab --output=<your_temp_dir>/app.apks --local-testing

$ java -jar bundletool.jar install-apks --apks=<your_temp_dir>/app.apks
```

Before running `build-apks` again, remove the existing app APK file:

```console
$ rm <your_temp_dir>/app.apks
```

Changes to the Dart codebase require either incrementing the Android build ID or uninstalling and reinstalling the app, as Android won't update the feature modules unless it detects a new version number.

### Releasing to the Google Play Store

The built AAB file can be uploaded directly to the Play store as normal. When `loadLibrary()` is called, the needed Android module containing the Dart AOT library and assets is downloaded by the Flutter engine using the Play store's delivery feature.

## Notes

- `io.flutter.embedding.android.FlutterPlayStoreSplitApplication` is used in the manifest snippet in step 1.2, while the prose and the later meta-data sample mention `io.flutter.app.FlutterPlayStoreSplitApplication`; both spellings appear in the official page as written.
- The sample snippets import `package:material_ui/material_ui.dart` as written in the official page. Per the Flutter 3.47 notes, `material_ui` / `cupertino_ui` are standalone packages you can opt in to; the in-framework `package:flutter/material.dart` is not yet deprecated in 3.47.7.
- The official page title covers Android and web, but its step-by-step setup is Android-only; the web is covered by one sentence (deferred components become separate `*.js` files).
- Distance line: this page covers Flutter's deferred-component build flow. Gradle, Play Core, and Play Console details belong to android-build-gradle and android-platform-core.

## Related

- [Measuring your app's size](./app-size.md)
