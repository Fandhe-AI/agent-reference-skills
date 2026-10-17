---
source: https://reactnative.dev/docs/0.87/the-new-architecture/pure-cxx-modules
---

# Cross-Platform Native Modules (C++)

Writing a module in C++ is the best way to share platform-agnostic code between Android and iOS. With pure C++ modules, the logic is written once and reused from all platforms without platform-specific code.

## Signature / Usage

Steps: (1) create the JS specs; (2) configure Codegen to generate the scaffolding; (3) implement the native logic; (4) register the module in the Android and iOS application; (5) test your changes in JS.

```bash
npx @react-native-community/cli@latest init SampleApp --version "<current React Native version>"
```

### 1. Create the JS specs

Inside the root folder create a `specs` folder and a file `NativeSampleModule.ts`.

**Flow**

```ts
// @flow
import type {TurboModule} from 'react-native'
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

**TypeScript**

```ts
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

### 2. Configure Codegen

`package.json`:

```json
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     }
   },
   // highlight-add-end
   "dependencies": {
```

### 3. Write the native code

Create a folder named `shared` at the same level as the `android` and `ios` folders.

`shared/NativeSampleModule.h`:

```cpp
#pragma once

#include <AppSpecsJSI.h>

#include <memory>
#include <string>

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
};

} // namespace facebook::react

```

`shared/NativeSampleModule.cpp`:

```cpp
#include "NativeSampleModule.h"

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

} // namespace facebook::react
```

### 4. Register the module in the platform

**Android.** Create `SampleApp/android/app/src/main/jni/CMakeLists.txt`:

```shell
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Define where the additional source code lives. We need to crawl back the jni, main, src, app, android folders
target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

# Define where CMake can find the additional header files. We need to crawl back the jni, main, src, app, android folders
target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)
```

Modify `SampleApp/android/app/build.gradle`, within the existing `android` block:

```diff
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

+   externalNativeBuild {
+       cmake {
+           path "src/main/jni/CMakeLists.txt"
+       }
+   }
}
```

From `SampleApp/android/app/src/main/jni`, download the original `OnLoad.cpp` (the official page interpolates the core branch name for the current version into the URL):

```sh
RN_CORE_BRANCH="0.87-stable"
curl -O "https://raw.githubusercontent.com/react/react-native/${RN_CORE_BRANCH}/packages/react-native/ReactAndroid/cmake-utils/default-app-setup/OnLoad.cpp"
```

Then modify `android/app/src/main/jni/OnLoad.cpp`:

```diff
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <autolinking.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncore.h>

+ // Include the NativeSampleModule header
+ #include <NativeSampleModule.h>

//...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string& name,
    const std::shared_ptr<CallInvoker>& jsInvoker) {
  // Here you can provide your CXX Turbo Modules coming from
  // either your application or from external libraries. The approach to follow
  // is similar to the following (for a module called `NativeCxxModuleExample`):
  //
  // if (name == NativeCxxModuleExample::kModuleName) {
  //   return std::make_shared<NativeCxxModuleExample>(jsInvoker);
  // }

+  // This code registers the module so that when the JS side asks for it, the app can return it
+  if (name == NativeSampleModule::kModuleName) {
+    return std::make_shared<NativeSampleModule>(jsInvoker);
+  }

  // And we fallback to the CXX module providers autolinked
  return autolinking_cxxModuleProvider(name, jsInvoker);
}

// leave the rest of the file
```

Run `yarn android` from the project root to build.

**iOS.** Install pods and run Codegen, then open the workspace and add the `shared` folder to the project (click the `SampleApp` project, select `Add files to "Sample App"...`, select the `shared` folder and click `Add`):

```bash
cd ios
bundle install
bundle exec pod install
```

```bash
cd ios
open SampleApp.xcworkspace
```

Create a `ModuleProvider` (Cocoa Touch Class named `NativeSampleModuleProvider`, `Subclass of: NSObject`, `Language: Objective-C`; rename `NativeSampleModuleProvider.m` to `NativeSampleModuleProvider.mm`).

`NativeSampleModuleProvider.h`:

```objc

#import <Foundation/Foundation.h>
#import <ReactCommon/RCTTurboModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeSampleModuleProvider : NSObject <RCTModuleProvider>

@end

NS_ASSUME_NONNULL_END
```

`NativeSampleModuleProvider.mm`:

```objc

#import "NativeSampleModuleProvider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "NativeSampleModule.h"

@implementation NativeSampleModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSampleModule>(params.jsInvoker);
}

@end
```

Update `package.json` to associate the JS module name with the ModuleProvider class:

```json
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     // highlight-add-start
     },
     "ios": {
        "modulesProvider": {
          "NativeSampleModule":  "NativeSampleModuleProvider"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

Re-install the pods:

```bash
# from the ios folder
bundle exec pod install
open SampleApp.xcworkspace
```

### 5. Testing your code

`App.tsx`:

```tsx
import {type JSX, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App(): JSX.Element {
  const [value, setValue] = useState('');
  const [reversedValue, setReversedValue] = useState('');

  const onPress = () => {
    const revString = SampleTurboModule.reverseString(value);
    setReversedValue(revString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to reverse</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default App;
```

## Notes

- The official page interpolates the core branch name for the current docs version at build time; here it is a quoted shell variable (`RN_CORE_BRANCH`) set to the 0.87 branch name.
- All Native Turbo Module spec files must have the prefix `Native`, otherwise Codegen will ignore them.
- The `codegenConfig` tells Codegen to look for spec files in the `specs` folder, to only generate code for `modules`, and to namespace the generated code as `AppSpecs`.
- `NativeSampleModule` lives in the `facebook::react` namespace to access all types in that namespace; it extends `NativeSampleModuleCxxSpec`, which contains glue and boilerplate code. The constructor accepts a pointer to the `CallInvoker` to communicate with JS if needed.
- The CMake file defines the `appmodules` library, loads the base React Native CMake file, adds the module C++ source with `target_sources` (React Native already populates `appmodules` with default sources), and specifies where CMake finds the header files. Paths crawl back from the `jni` folder to the `shared` folder.
- The `build.gradle` path is relative to the folder where `build.gradle` lives.
- Registering the module in `OnLoad.cpp` means that when JS requires the C++ Turbo Native Module the app knows where to find it. The downloaded `OnLoad.cpp` is the original from React Native, safely overridden to load the C++ module.
- iOS: the `ModuleProvider` is an Objective-C++ class that glues the pure C++ module with the rest of the iOS app. It implements `RCTModuleProvider` by creating the pure C++ `NativeSampleModule` when `getTurboModule:` is called. The `mm` extension denotes an Objective-C++ file.
- Best practice (the example imports the spec directly for brevity): create a separate file to wrap the specs and use that file in the application, so you can prepare the input for the specs and keep more control over them in JS.
- Cross-skill: Xcode / CocoaPods iOS integration and Android Gradle belong to apple-uikit / android-build-gradle; this page covers only the React Native C++ module boundary.

## Related

- [Advanced: Custom C++ Types](./custom-cxx-types.md)
- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Using Codegen](./using-codegen.md)
- [Native Platform](./native-platform.md)
