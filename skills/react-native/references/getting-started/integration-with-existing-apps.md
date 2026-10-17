---
source: https://reactnative.dev/docs/0.87/integration-with-existing-apps
---

# Integration with Existing Apps

Add a single view or user flow built with React Native to an existing native Android or iOS application. Steps differ by platform.

## Signature / Usage

Root `index.js` (both platforms):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### Android (Java & Kotlin)

Key steps: 1) set up directory structure, 2) install NPM dependencies, 3) add React Native to your Gradle configuration, 4) write the TypeScript code for your first screen, 5) integrate with your Android code using a `ReactActivity`, 6) test by running the bundler.

Use the React Native Community Template (https://github.com/react-native-community/template/) as reference; it contains a minimal Android app. Prerequisites: `set-up-your-environment` and `getting-started-without-a-framework`; familiarity with Activities and `AndroidManifest.xml`.

#### 1. Set up directory structure

Create a new folder for the integrated project, then **move your existing Android project** to the `/android` subfolder.

#### 2. Install NPM dependencies

In the root directory, copy the template `package.json` (the template branch matches the docs version):

```shell
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.87-stable/template/package.json
```

Then:

**npm**

```shell
npm install
```

**Yarn**

```shell
yarn install
```

This creates a `node_modules` folder. Add `node_modules/` to your `.gitignore`.

#### 3. Adding React Native to your app

`settings.gradle`:

```groovy
// Configures the React Native Gradle Settings plugin used for autolinking
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
// If using .gradle.kts files:
// extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")

// Include your existing Gradle modules here.
// include(":app")
```

Top level `build.gradle`:

```diff
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
+       classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

This makes the React Native Gradle Plugin (RNGP) available. The app module `build.gradle`:

```diff
apply plugin: "com.android.application"
+apply plugin: "com.facebook.react"

repositories {
    mavenCentral()
}

dependencies {
    // Other dependencies here
+   // Note: we intentionally don't specify the version number here as RNGP will take care of it.
+   // If you don't use the RNGP, you'll have to specify version manually.
+   implementation("com.facebook.react:react-android")
+   implementation("com.facebook.react:hermes-android")
}

+react {
+   // Needed to enable Autolinking - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
+   autolinkLibrariesWithApp()
+}
```

`gradle.properties`:

```diff
+reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
+newArchEnabled=true
+hermesEnabled=true
```

Manifest: ensure the Internet permission in `AndroidManifest.xml`:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

+   <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">
    </application>
</manifest>
```

Enable cleartext traffic (https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted) in your **debug** `AndroidManifest.xml` only, because the app talks to Metro over HTTP:

```diff
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
+       android:usesCleartextTraffic="true"
+       tools:targetApi="28"
    />
</manifest>
```

#### 4. Writing the TypeScript code

`index.js` is the starting point for React Native applications and is always required; it can import other files or contain all the code. Create it in the project root (see snippet above). Then create `App.tsx`, the root component:

```tsx
import {type JSX} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222222' : '#F3F3F3',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

#### 5. Integrating with your Android code

Update your `Application` class.

**Java**

```diff
package <your-package-here>;

import android.app.Application;
+import com.facebook.react.PackageList;
+import com.facebook.react.ReactApplication;
+import com.facebook.react.ReactHost;
+import com.facebook.react.ReactNativeHost;
+import com.facebook.react.ReactPackage;
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
+import com.facebook.react.defaults.DefaultReactHost;
+import com.facebook.react.defaults.DefaultReactNativeHost;
+import com.facebook.soloader.SoLoader;
+import com.facebook.react.soloader.OpenSourceMergedSoMapping;
+import java.util.List;

-class MainApplication extends Application {
+class MainApplication extends Application implements ReactApplication {
+ @Override
+ public ReactNativeHost getReactNativeHost() {
+   return new DefaultReactNativeHost(this) {
+     @Override
+     protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
+     @Override
+     protected String getJSMainModuleName() { return "index"; }
+     @Override
+     public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
+     @Override
+     protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
+     @Override
+     protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
+   };
+ }

+ @Override
+ public ReactHost getReactHost() {
+   return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
+ }

  @Override
  public void onCreate() {
    super.onCreate();
+   SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     DefaultNewArchitectureEntryPoint.load();
+   }
  }
}
```

**Kotlin**

```diff
// package <your-package-here>

import android.app.Application
+import com.facebook.react.PackageList
+import com.facebook.react.ReactApplication
+import com.facebook.react.ReactHost
+import com.facebook.react.ReactNativeHost
+import com.facebook.react.ReactPackage
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
+import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
+import com.facebook.react.defaults.DefaultReactNativeHost
+import com.facebook.soloader.SoLoader
+import com.facebook.react.soloader.OpenSourceMergedSoMapping

-class MainApplication : Application() {
+class MainApplication : Application(), ReactApplication {

+ override val reactNativeHost: ReactNativeHost =
+      object : DefaultReactNativeHost(this) {
+        override fun getPackages(): List<ReactPackage> = PackageList(this).packages
+        override fun getJSMainModuleName(): String = "index"
+        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
+        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
+        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+      }

+ override val reactHost: ReactHost
+   get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
+   SoLoader.init(this, OpenSourceMergedSoMapping)
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     load()
+   }
  }
}
```

Create an Activity extending `ReactActivity`.

**Java**

```java
// package <your-package-here>;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(this, getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
```

**Kotlin**

```kotlin
// package <your-package-here>

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MyReactActivity : ReactActivity() {

    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

Register the Activity in `AndroidManifest.xml` and set its theme to `Theme.AppCompat.Light.NoActionBar` (or any non-ActionBar theme), otherwise an ActionBar renders on top of your React Native screen:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">

+     <activity
+       android:name=".MyReactActivity"
+       android:label="@string/app_name"
+       android:theme="@style/Theme.AppCompat.Light.NoActionBar">
+     </activity>
    </application>
</manifest>
```

#### 6. Test your integration

Create `metro.config.js` in the project root:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

Start the bundler (Metro, https://metrobundler.dev/) from the root directory, then build and run your Android app as normal.

**npm**

```shell
npm start
```

**Yarn**

```shell
yarn start
```

Release build: the React Native Gradle Plugin bundles the JS code inside your APK/App Bundle. Without Android Studio:

```text
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

### iOS (Objective-C and Swift)

Key steps: 1) set up directory structure, 2) install NPM dependencies, 3) add React Native to your Podfile configuration, 4) write the TypeScript code, 5) integrate with your iOS code using a `RCTRootView`, 6) test by running the bundler. Use the React Native Community Template as reference (minimal iOS app). Prerequisites: `set-up-your-environment`, `getting-started-without-a-framework`, and basics of iOS development such as creating a `UIViewController` and editing the `Podfile`.

#### 1. Set up directory structure

Create a new folder for the integrated project and **move your existing iOS project** to the `/ios` subfolder.

#### 2. Install NPM dependencies

Same as Android: copy the template `package.json` with `curl -O` (see above, template `package.json`), run `npm install` or `yarn install`, add `node_modules/` to `.gitignore`.

#### 3. Install development tools

Command Line Tools for Xcode: choose **Settings... (or Preferences...)** in the Xcode menu, go to the Locations panel and select the most recent version in the Command Line Tools dropdown.

CocoaPods (https://cocoapods.org) adds the React Native framework code locally into your project. Recommended install:

```shell
brew install cocoapods
```

#### 4. Adding React Native to your app

Two files are needed: a **Gemfile** (Ruby dependencies) and a **Podfile**. From the project root download the Gemfile; from the `ios` folder download the Podfile (template branch matches the docs version):

```shell
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.87-stable/template/Gemfile
```

```shell
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.87-stable/template/ios/Podfile
```

If you created your project with Xcode 16, update the Gemfile:

```diff
-gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
+gem 'cocoapods', '1.16.2'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
-gem 'xcodeproj', '< 1.26.0'
+gem 'xcodeproj', '1.27.0'
```

Xcode 16 generates a project slightly differently from previous versions, so the latest CocoaPods and Xcodeproj gems are needed. Remember to change the line referenced in the template Podfile (`template/ios/Podfile#L17`). In the `ios` folder run:

```sh
bundle install
bundle exec pod install
```

The first command installs the Ruby dependencies; the second integrates the React Native code so your iOS files can import the React Native headers.

#### 5. Writing the TypeScript code

Create `index.js` and `App.tsx` exactly as in the Android section above.

#### 5. Integrating with your iOS code

React Native initialization is not bound to any specific part of an iOS app. It can be initialized using `RCTReactNativeFactory`, which handles the React Native lifecycle. Once initialized, you can either start a React Native view providing a `UIWindow` object, or ask the factory to generate a `UIView` to load in any `UIViewController`. The example creates a `ReactViewController` whose `view` is the React Native view. Create a new Cocoa Touch Class file with `UIViewController` as "Subclass of".

**Objective-C** (`ReactViewController.m`)

```diff
#import "ReactViewController.h"
+#import <React/RCTBundleURLProvider.h>
+#import <RCTReactNativeFactory.h>
+#import <RCTDefaultReactNativeFactoryDelegate.h>
+#import <RCTAppDependencyProvider.h>


@interface ReactViewController ()

@end

+@interface ReactNativeFactoryDelegate: RCTDefaultReactNativeFactoryDelegate
+@end

-@implementation ReactViewController
+@implementation ReactViewController {
+  RCTReactNativeFactory *_factory;
+  id<RCTReactNativeFactoryDelegate> _factoryDelegate;
+}

 - (void)viewDidLoad {
     [super viewDidLoad];
     // Do any additional setup after loading the view.
+    _factoryDelegate = [ReactNativeFactoryDelegate new];
+    _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
+    _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
+    self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
 }

@end

+@implementation ReactNativeFactoryDelegate
+
+- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
+{
+  return [self bundleURL];
+}
+
+- (NSURL *)bundleURL
+{
+#if DEBUG
+  return [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:@"index"];
+#else
+  return [NSBundle.mainBundle URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
+}

@end
```

**Swift** (`ReactViewController.swift`)

```diff
import UIKit
+import React
+import React_RCTAppDelegate
+import ReactAppDependencyProvider

class ReactViewController: UIViewController {
+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeFactoryDelegate: RCTReactNativeFactoryDelegate?

  override func viewDidLoad() {
    super.viewDidLoad()
+    reactNativeFactoryDelegate = ReactNativeDelegate()
+    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
+    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
+    view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")

  }
}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
+    override func sourceURL(for bridge: RCTBridge) -> URL? {
+      self.bundleURL()
+    }
+
+    override func bundleURL() -> URL? {
+      #if DEBUG
+      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+      #else
+      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+      #endif
+    }
+
+}
```

Present it from the initial `ViewController` (the example assumes a button that presents React Native modally).

**Swift** (`ViewController.swift`)

```diff
import UIKit

class ViewController: UIViewController {

+  var reactViewController: ReactViewController?

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    self.view.backgroundColor = .systemBackground

+    let button = UIButton()
+    button.setTitle("Open React Native", for: .normal)
+    button.setTitleColor(.systemBlue, for: .normal)
+    button.setTitleColor(.blue, for: .highlighted)
+    button.addAction(UIAction { [weak self] _ in
+      guard let self else { return }
+      if reactViewController == nil {
+       reactViewController = ReactViewController()
+      }
+      present(reactViewController!, animated: true)
+    }, for: .touchUpInside)
+    self.view.addSubview(button)
+
+    button.translatesAutoresizingMaskIntoConstraints = false
+    NSLayoutConstraint.activate([
+      button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
+      button.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
+      button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
+      button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
+    ])
  }
}
```

**Objective-C** (`ViewController.m`)

```diff
#import "ViewController.h"
+#import "ReactViewController.h"

@interface ViewController ()

@end

- @implementation ViewController
+@implementation ViewController {
+  ReactViewController *reactViewController;
+}

 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.
   self.view.backgroundColor = UIColor.systemBackgroundColor;
+  UIButton *button = [UIButton new];
+  [button setTitle:@"Open React Native" forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.systemBlueColor forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.blueColor forState:UIControlStateHighlighted];
+  [button addTarget:self action:@selector(presentReactNative) forControlEvents:UIControlEventTouchUpInside];
+  [self.view addSubview:button];

+  button.translatesAutoresizingMaskIntoConstraints = NO;
+  [NSLayoutConstraint activateConstraints:@[
+    [button.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
+    [button.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
+    [button.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
+    [button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
+  ]];
 }

+- (void)presentReactNative
+{
+  if (reactViewController == NULL) {
+    reactViewController = [ReactViewController new];
+  }
+  [self presentViewController:reactViewController animated:YES completion:nil];
+}

@end
```

Disable Sandbox scripting: in Xcode click your app > build settings, filter for `script`, and set `User Script Sandboxing` to `NO`. This is needed to switch between the Debug and Release version of the Hermes engine (https://github.com/facebook/hermes/blob/main/README.md). Also add the `UIViewControllerBasedStatusBarAppearance` key to `Info.plist` with value `NO`.

#### 6. Test your integration

Create `metro.config.js` (same content as Android), and a `.watchmanconfig` containing an empty JSON object:

```sh
echo {} > .watchmanconfig
```

Run `npm start` (or `yarn start`) in the project root, then build and run your iOS app as normal.

##### Creating a release build in Xcode

Add a script that packages your JS and images into the iOS app: select your application > `Build Phases` > `+` > `New Run Script Phase`, rename it `Bundle React Native code and images`, paste the script below, and drag it before `[CP] Embed Pods Frameworks`.

```sh
set -e

WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"

/bin/sh "$WITH_ENVIRONMENT" "$REACT_NATIVE_XCODE"
```

#### 7. Passing initial props to the React Native view

Use the `initialProperties` parameter of the `view(withModuleName:initialProperty)` overload of `RCTReactNativeFactory`. In `App.tsx` change `function App(): React.JSX.Element` to `function App(props): React.JSX.Element` and render `props.userID` and `props.token`; `RCTReactNativeFactory` passes them to the component when it is rendered.

**Objective-C**

```diff
-  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
+  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld" initialProperties:@{
+    @"userID": @"12345678",
+    @"token": @"secretToken"
+  }];
```

**Swift**

```diff
-   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")
+   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld", initialProperties: [
+     "userID": "12345678",
+     "token": "secretToken"
+])
```

## Notes

- The official 0.87 docs still import from `react-native/Libraries/NewAppScreen`, but that path is not shipped in react-native 0.87.0 (moved to the separate `@react-native/new-app-screen` package); the App.tsx snippet here avoids it.
- Adapted (not in the official docs): (1) the Java `MainApplication` diff gained the missing semicolon on `import com.facebook.react.soloader.OpenSourceMergedSoMapping;`; (2) the Objective-C call is `presentViewController:animated:completion:` with `completion:nil` added (the official text omits `completion:`); (3) the Swift initial-props example gained the missing comma after `withModuleName: "HelloWorld"`; (4) the release-build script passes each path as a separately quoted argument, `/bin/sh "$WITH_ENVIRONMENT" "$REACT_NATIVE_XCODE"`, so paths containing spaces work; the official script uses `/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"`.
- Corrected (differs from the official docs): the official top-level build.gradle diff shows AGP 7.3.1 as unchanged context; it is aligned with the React Native Community Template (`classpath("com.android.tools.build:gradle")` with no version number, from the template's `0.87-stable` android/build.gradle) because 7.3.1 does not support compileSdk 35.
- Corrected (differs from the official docs): the official Java snippet passes `OpenSourceMergedSoMapping` directly; because it is a Kotlin `object`, Java must use `OpenSourceMergedSoMapping.INSTANCE`.
- Adapted (not in the official docs): the official docs compute the template branch at render time (getTemplateBranchNameForCurrentVersion()); it is written out as `0.87-stable` for this version in the curl commands.
- Requirements: React Native can be added as a single view or user flow to an existing app; the template `package.json` / `Gemfile` / `Podfile` are fetched from the React Native Community Template branch matching the docs version.
- The userID / token above are placeholders from the docs; never ship real secrets in initial properties.
- 0.88: the iOS SceneDelegate lifecycle is supported (additive; the `AppDelegate` path stays compatible). Starting with the iOS 27 SDK, Apple requires the UIScene lifecycle (UIKit apps built with Xcode 27 fail to launch). `RCTReactNativeFactory` gains `startReactNativeWithModuleName:inWindow:connectionOptions:` and `startReactNativeWithModuleName:inWindow:initialProperties:connectionOptions:`. Support is limited to a single scene (keep `UIApplicationSupportsMultipleScenes` set to `false`). Migration: move the React Native entry point from `AppDelegate` to a `SceneDelegate`, forward the scene's URL and user-activity callbacks to `RCTLinkingManager`, and add a `UIApplicationSceneManifest` key to `Info.plist`. Source: React Native 0.88 release blog.
- Distance: the Android side (Activity, Gradle, manifests) is native Android development, see android-architecture and android-build-gradle; the iOS side (UIViewController, SceneDelegate, CocoaPods, Xcode build phases) is native iOS development, see apple-uikit, apple-swift, and apple-distribution. The React Native specifics (RNGP, `RCTReactNativeFactory`, `ReactActivity`) belong to this skill.

## Related

- [Integration with an Android Fragment](./integration-with-android-fragment.md)
- [Set Up Your Environment](./set-up-your-environment.md)
- [Get Started Without a Framework](./getting-started-without-a-framework.md)
