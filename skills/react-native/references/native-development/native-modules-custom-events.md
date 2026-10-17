---
source: https://reactnative.dev/docs/0.87/the-new-architecture/native-modules-custom-events
---

# Emitting Events in Native Modules

How a Native Module can listen to events in the platform layer and emit them to the JavaScript layer, or emit events from long-running operations so the UI can update. The example emits an event when a new key is added to the storage, building on the Native Modules `NativeLocalStorage` guide.

## Signature / Usage

Step 1: update the spec so React Native knows the module can emit events.

**TypeScript** (`NativeLocalStorage.ts`)

```diff
-import type {TurboModule} from 'react-native';
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;

+ readonly onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

**Flow** (`NativeLocalStorage.js`)

```diff
// @flow
-import type {TurboModule} from 'react-native';
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
+ onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>
}
export default (TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
): Spec);
```

Step 2: rerun Codegen. Android:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema
```

Output:

```text
BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

iOS:

```bash
cd ios
bundle install
bundle exec pod install
```

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for Codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for Codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

Step 3: update the app code (`App.tsx`).

```diff
-import {useEffect, useState, type JSX} from 'react';
+import {useEffect, useRef, useState, type JSX} from 'react';
import {
+ Alert,
+ EventSubscription,
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
+ const [key, setKey] = useState<string | null>(null);
+ const listenerSubscription = useRef<null | EventSubscription>(null);

+ useEffect(() => {
+   listenerSubscription.current = NativeLocalStorage?.onKeyAdded((pair) => Alert.alert(`New key added: ${pair.key} with value: ${pair.value}`));

+   return  () => {
+     listenerSubscription.current?.remove();
+     listenerSubscription.current = null;
+   }
+ }, [])

  const [editingValue, setEditingValue] = useState<string | null>(
    null,
  );

- useEffect(() => {
-   const storedValue = NativeLocalStorage?.getItem('myKey');
-   setValue(storedValue ?? '');
- }, []);

  function saveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
-   NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
+   NativeLocalStorage?.setItem(editingValue ?? EMPTY, key);
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
-   NativeLocalStorage?.removeItem('myKey');
+   NativeLocalStorage?.removeItem(key);
    setValue('');
  }

+ function retrieveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
+   const val = NativeLocalStorage?.getItem(key);
+   setValue(val);
+ }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
+     <Text>Key:</Text>
+      <TextInput
+       placeholder="Enter the key you want to store"
+       style={styles.textInput}
+       onChangeText={setKey}
+     />
+     <Text>Value:</Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
+     <Button title="Retrieve" onPress={retrieveValue} />
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

Step 4: native code. **Android** (`android/app/src/main/java/com/nativelocalstorage/NativeLocalStorageModule.kt`):

```diff
package com.nativelocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.nativelocalstorage.NativeLocalStorageSpec
+import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
+import com.facebook.react.bridge.WritableMap

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  override fun getName() = NAME

  override fun setItem(value: String, key: String) {
+   var shouldEmit = false
+   if (getItem(key) == null) {
+       shouldEmit = true
+   }
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()

+   if (shouldEmit == true) {
+       val eventData = Arguments.createMap().apply {
+           putString("key", key)
+           putString("value", value)
+       }
+       emitOnKeyAdded(eventData)
+   }
  }

  override fun getItem(key: String): String? {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username
  }
```

**iOS** `RCTNativeLocalStorage.h` (change the base class from `NSObject` to `NativeLocalStorageSpecBase`):

```diff
#import <Foundation/Foundation.h>
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

-@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>
+@interface RCTNativeLocalStorage : NativeLocalStorageSpecBase <NativeLocalStorageSpec>

@end

NS_ASSUME_NONNULL_END
```

`RCTNativeLocalStorage.mm`:

```diff
 - (void)setItem:(NSString *)value key:(NSString *)key {
+  BOOL shouldEmitEvent = NO;
+  if (![self getItem:key]) {
+    shouldEmitEvent = YES;
+  }
   [self.localStorage setObject:value forKey:key];

+  if (shouldEmitEvent) {
+    [self emitOnKeyAdded:@{@"key": key, @"value": value}];
+  }
}
```

## Notes

- `SafeAreaView` from react-native used in this sample is deprecated in the 0.87 docs; use react-native-safe-area-context in real apps.
- The official Android diff is titled "NativeLocalStorage"; the file name follows the Turbo Native Modules Android guide (NativeLocalStorageModule.kt).
- Deviation: command output shown in the same block on the official page is split into a separate text block.
- Deviation from the official page: the official diff does not match the App.tsx from the Native Modules introduction (named React hook imports, 'myKey' literals); the diff here is rebased onto that file.
- Changing the value of an existing key does not emit the event, adding a new key does (as described on the page).
- Corrected: the official Android snippet emitted when getItem(key) != null (existing key); the condition is inverted here to match the described new-key behavior and the iOS code.
- Corrected: the official Android snippet returned username.toString(), which yields the string "null" for missing keys.
- Corrected: the official Flow diff added a type import of TurboModule but kept the original TurboModule import, declaring it twice; the original import line is now replaced in the diff.
- Flow diff aligned with the corrected Turbo Native Modules introduction spec (separate type import, getEnforcing); the official diff removes a combined import and uses get/?Spec.
- Corrected: the official TypeScript diff added `import type {TurboModule, CodegenTypes}` without removing the existing `import type {TurboModule}` from the Native Modules guide spec; the diff now replaces that line.
- `CodegenTypes.EventEmitter<KeyValuePair>` is imported from `react-native`; the property `onKeyAdded` emits a payload of type `KeyValuePair`.
- App code: import the `EventSubscription` type from `react-native`; use a `useRef` to keep the `EventSubscription` reference; register the listener in a `useEffect` (`onKeyAdded` takes a callback receiving an object of type `KeyValuePair`, executed every time the event is emitted from native to JS); in the cleanup function `remove` the subscription and set the ref to `null`.
- Android: for complex types such as `KeyValuePair`, Codegen generates a function (`emitOnKeyAdded`) that expects a `ReadableMap`. Create it with `Arguments.createMap()` and populate it with `apply`. It is your responsibility that the keys in the map match the properties of the spec type in JS. The imports needed are `com.facebook.react.bridge.Arguments` and `com.facebook.react.bridge.WritableMap`.
- iOS: `NativeLocalStorageSpecBase` is a base class that provides the `emitOnKeyAdded` method and its boilerplate, so you do not handle the Objective-C to JSI conversion. For complex types Codegen generates a generic dictionary populated on the native side; the keys must match the properties of the spec type in JS.

## Related

- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Native Modules Lifecycle](./native-modules-lifecycle.md)
- [Advanced Topics (Modules)](./advanced-topics-modules.md)
- [Appendix](./appendix.md)
