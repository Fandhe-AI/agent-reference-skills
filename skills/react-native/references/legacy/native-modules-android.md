---
source: https://reactnative.dev/docs/0.87/legacy/native-modules-android
---

# Android Native Modules

Legacy Architecture guide: build a `CalendarModule` that exposes Android calendar APIs to JavaScript via `ReactContextBaseJavaModule`, `@ReactMethod`, and a `ReactPackage`.

## Signature / Usage

Create `CalendarModule.java` / `CalendarModule.kt` in `android/app/src/main/java/com/your-app-name/`, extend `ReactContextBaseJavaModule`, implement `getName()`, and export methods with `@ReactMethod`.

**Java**

```java
package com.your-apps-package-name; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
   CalendarModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
      return "CalendarModule";
   }

   @ReactMethod
   public void createCalendarEvent(String name, String location) {
   }
}
```

**Kotlin**

```kotlin
class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "CalendarModule"

  @ReactMethod fun createCalendarEvent(name: String, location: String) {}
}
```

Access from JS:

```tsx
const {CalendarModule} = NativeModules;
CalendarModule.createCalendarEvent('testName', 'testLocation');
```

### Register the module

Add the module to a `ReactPackage` (`createNativeModules()`), then add the package to `getPackages()` in `MainApplication`.

**Java**

```java
public class MyAppPackage implements ReactPackage {
   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();
       modules.add(new CalendarModule(reactContext));
       return modules;
   }
}

// MainApplication.java
@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    packages.add(new MyAppPackage());
    return packages;
}
```

**Kotlin**

```kotlin
class MyAppPackage : ReactPackage {
    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(CalendarModule(reactContext)).toMutableList()
}

// MainApplication.kt
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        add(MyAppPackage())
    }
```

Rebuild native code after changes (`npm run android` / `yarn android`); Metro does not rebuild native code.

### Better JS export with types

```tsx
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

### Argument types

| Java | Kotlin | JavaScript |
| --- | --- | --- |
| Boolean | Boolean | ?boolean |
| boolean |  | boolean |
| Double | Double | ?number |
| double |  | number |
| String | String | string |
| Callback | Callback | Function |
| Promise | Promise | Promise |
| ReadableMap | ReadableMap | Object |
| ReadableArray | ReadableArray | Array |

For types not listed (e.g. `Date`), convert inside the native method yourself.

### Constants

```java
@Override
public Map<String, Object> getConstants() {
   final Map<String, Object> constants = new HashMap<>();
   constants.put("DEFAULT_EVENT_NAME", "New Event");
   return constants;
}
```

```kotlin
override fun getConstants(): MutableMap<String, Any> =
    hashMapOf("DEFAULT_EVENT_NAME" to "New Event")
```

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
```

### Callbacks

```java
@ReactMethod
public void createCalendarEvent(String name, String location, Callback callBack) {
    Integer eventId = ...
    callBack.invoke(null, eventId);   // Node-style: first argument is the error
}
```

```kotlin
@ReactMethod
fun createCalendarEvent(name: String, location: String, callback: Callback) {
    val eventId = ...
    callback.invoke(null, eventId)
}
```

Alternatively use separate failure/success callbacks (the last function argument is the success callback, the second to last the failure callback):

```java
@ReactMethod
public void createCalendarEvent(String name, String location, Callback myFailureCallback, Callback mySuccessCallback) {
}
```

### Promises

```java
@ReactMethod
public void createCalendarEvent(String name, String location, Promise promise) {
    try {
        Integer eventId = ...
        promise.resolve(eventId);
    } catch(Exception e) {
        promise.reject("Create Event Error", e);
    }
}
```

```kotlin
@ReactMethod
fun createCalendarEvent(name: String, location: String, promise: Promise) {
    try {
        val eventId = ...
        promise.resolve(eventId)
    } catch (e: Throwable) {
        promise.reject("Create Event Error", e)
    }
}
```

```tsx
const eventId = await CalendarModule.createCalendarEvent('Party', 'My House');
```

`reject` takes combinations of `code: String, message: String, userInfo: WritableMap, throwable: Throwable`.

### Sending events to JavaScript

```java
private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
 reactContext
     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit(eventName, params);
}

private int listenerCount = 0;

@ReactMethod
public void addListener(String eventName) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }
  listenerCount += 1;
}

@ReactMethod
public void removeListeners(Integer count) {
  listenerCount -= count;
  if (listenerCount == 0) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
```

```tsx
import {NativeEventEmitter, NativeModules} from 'react-native';

useEffect(() => {
  const eventEmitter = new NativeEventEmitter(NativeModules.CalendarModule);
  let eventListener = eventEmitter.addListener('EventReminder', event => {
    console.log(event.eventProperty); // "someValue"
  });
  return () => {
    eventListener.remove();
  };
}, []);
```

### Activity result and lifecycle events

Register `reactContext.addActivityEventListener(mActivityResultListener)` (extend `BaseActivityEventListener`, preferred, or implement `ActivityEventListener`) to receive `onActivityResult`. For `onResume` / `onPause` / `onDestroy`, implement `LifecycleEventListener` and call `reactContext.addLifecycleEventListener(this)`:

```java
@Override
public void onHostResume() {
   // Activity `onResume`
}
@Override
public void onHostPause() {
   // Activity `onPause`
}
@Override
public void onHostDestroy() {
   // Activity `onDestroy`
}
```

## Notes

- Deprecation notice (verbatim): "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable. The New Architecture uses Turbo Native Module and Fabric Native Components to achieve similar results."
- Technically Java/Kotlin classes only need to extend `BaseJavaModule` or implement `NativeModule`; `ReactContextBaseJavaModule` is recommended because it gives access to the `ReactApplicationContext` (activity lifecycle hooks) and eases future type-safety.
- `@ReactMethod(isBlockingSynchronousMethod = true)` marks a synchronous method. Not recommended: strong performance penalties and threading bugs; also the app can no longer use the Google Chrome debugger.
- Registering via `createNativeModules` initializes all native modules eagerly at startup. `TurboReactPackage` (`getModule(String name, ReactApplicationContext rac)` plus `getReactModuleInfoProvider()`) is a lazier alternative but more complex.
- These types are supported today but will not be supported in TurboModules: Integer/Float (Java/Kotlin -> ?number), int/float (Java -> number).
- Constants exported through `getConstants()` are read at initialization only; accessing them directly off the module object will not be supported with TurboModules (use `getConstants()`).
- A callback or promise can be invoked/settled at most once; a module may store it and invoke it later. Callbacks currently allow at most two function arguments (success and failure).
- Threading: all native module async methods run on one thread on Android; do not assume a thread. Dispatch blocking work to an internally managed worker thread.
- Android-side platform APIs (Fragments, Gradle, Kotlin/Java): see android-architecture and android-build-gradle. This page covers only the React Native bridge surface.
- The official event-subscription example passes `NativeModules.ToastExample` to `NativeEventEmitter`; this page changes it to `CalendarModule` to match the module it implements.
- Intended New Architecture replacement: `native-development/turbo-native-modules-android.md`.

## Related

- [native-modules-intro.md](./native-modules-intro.md)
- [native-modules-ios.md](./native-modules-ios.md)
- [native-components-android.md](./native-components-android.md)
- [Turbo Native Modules (Android)](../native-development/turbo-native-modules-android.md)
