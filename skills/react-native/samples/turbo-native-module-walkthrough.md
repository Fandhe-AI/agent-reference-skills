---
source: https://reactnative.dev/docs/0.87/turbo-native-modules-introduction
---

# Turbo Native Module Walkthrough

Build a `localStorage` Turbo Native Module: TypeScript spec, Codegen config, JS usage, then Android (Kotlin) and iOS (Objective-C++) implementations.

Create the app and enter the project root (all later commands run from `TurboModuleExample/`):

```bash
npx @react-native-community/cli@latest init TurboModuleExample --version "<react-native version>"
cd TurboModuleExample
```

1. Spec (`specs/NativeLocalStorage.ts`):

```typescript
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

2. `package.json` Codegen config (final form, with the iOS provider added in the iOS step):

```json
"codegenConfig": {
  "name": "NativeLocalStorageSpec",
  "type": "modules",
  "jsSrcsDir": "specs",
  "android": {
    "javaPackageName": "com.nativelocalstorage"
  },
  "ios": {
    "modulesProvider": {
      "NativeLocalStorage": "RCTNativeLocalStorage"
    }
  }
},
```

Run Codegen from the project root (`TurboModuleExample/`):

```bash
(cd android && ./gradlew generateCodegenArtifactsFromSchema)
```

```bash
(cd ios && bundle install && bundle exec pod install)
```

3. Use it in `App.tsx`:

```tsx
import {useEffect, useState, type JSX} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): JSX.Element {
  const [value, setValue] = useState<string | null>(null);

  const [editingValue, setEditingValue] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
```

4a. Android: `android/app/src/main/java/com/nativelocalstorage/NativeLocalStorageModule.kt`:

```kotlin
package com.nativelocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.nativelocalstorage.NativeLocalStorageSpec
import com.facebook.react.bridge.ReactApplicationContext

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  override fun getName() = NAME

  override fun setItem(value: String, key: String) {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()
  }

  override fun getItem(key: String): String? {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username
  }

  override fun removeItem(key: String) {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.remove(key)
    editor.apply()
  }

  override fun clear() {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.clear()
    editor.apply()
  }

  companion object {
    const val NAME = "NativeLocalStorage"
  }
}
```

`NativeLocalStoragePackage.kt`:

```kotlin
package com.nativelocalstorage

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeLocalStoragePackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == NativeLocalStorageModule.NAME) {
      NativeLocalStorageModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativeLocalStorageModule.NAME to ReactModuleInfo(
        name = NativeLocalStorageModule.NAME,
        className = NativeLocalStorageModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }
}
```

`android/app/src/main/java/com/turbomoduleexample/MainApplication.kt` (register the package with `add(NativeLocalStoragePackage())` and `import com.nativelocalstorage.NativeLocalStoragePackage`):

```kotlin
package com.turbomoduleexample

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.nativelocalstorage.NativeLocalStoragePackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(NativeLocalStoragePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}
```

4b. iOS. Prepare the Xcode project:

1. Open the CocoaPods generated Xcode Workspace.

```bash
cd ios
open TurboModuleExample.xcworkspace
```

2. Right click on app and select `New Group`, call the new group `NativeLocalStorage`.
3. In the `NativeLocalStorage` group, create `New` -> `File from Template`.
4. Use the `Cocoa Touch Class`.
5. Name the Cocoa Touch Class `RCTNativeLocalStorage` with the `Objective-C` language.
6. Rename `RCTNativeLocalStorage.m` -> `RCTNativeLocalStorage.mm` making it an Objective-C++ file.

Then write `NativeLocalStorage/RCTNativeLocalStorage.h`:

```objc
//  RCTNativeLocalStorage.h
//  TurboModuleExample

#import <Foundation/Foundation.h>
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>

@end

NS_ASSUME_NONNULL_END
```

`NativeLocalStorage/RCTNativeLocalStorage.mm` (the file renamed from `.m` in step 6):

```objc
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}

- (void)setItem:(NSString *)value
          key:(NSString *)key {
  [self.localStorage setObject:value forKey:key];
}

- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

+ (NSString *)moduleName
{
  return @"NativeLocalStorage";
}

@end
```

Run from the project root (`TurboModuleExample/`):

```bash
npm run android
npm run ios
```

## Notes

- Create the .h/.mm files through Xcode (File from Template) so they are members of the app target; files only written to disk are not compiled.
- Spec files must be prefixed `Native` (for example `NativeLocalStorage.ts`); `TurboModuleRegistry.getEnforcing` throws if the module is missing, `get` returns `null`.
- Re-run `bundle exec pod install` (from `ios/`) after changing `codegenConfig` so Codegen regenerates.
- This guide targets the New Architecture only. The source page also gives Java variants for the Android classes and the spec in Flow.
- 0.88: Java TurboModules gain `ArrayBuffer` support (per the 0.88 release blog); not used here.
- This is the JS-to-native boundary; the Kotlin/Swift platform APIs themselves belong to the Android and Apple skills.
- The source shows the Android and iOS Codegen commands as alternative platform tabs run from the project root; here they are wrapped in subshells (and `cd TurboModuleExample` added) so they can run in sequence.
- Corrected: the official snippet returned username.toString(), which yields the string "null" for missing keys; the nullable value is returned as-is.
- Deviation from the official page: package com.inappmodule is aligned with the TurboModuleExample app (com.turbomoduleexample).
- The official page initializes SoLoader with (this, false); updated to OpenSourceMergedSoMapping as required since RN 0.76 merged native libraries.
- The 0.87 app template's MainApplication uses getDefaultReactHost(applicationContext, packageList = PackageList(this).packages.apply { add(...) }) and loadReactNative(this); the DefaultReactNativeHost form shown is the official page's older shape (isHermesEnabled is deprecated and ignored, isNewArchEnabled=false is unsupported since 0.82).
- NS_ASSUME_NONNULL_END added; the official header snippet leaves the nonnull region open.
- SafeAreaView from react-native used in this sample is deprecated in the 0.87 docs; use react-native-safe-area-context in real apps.
