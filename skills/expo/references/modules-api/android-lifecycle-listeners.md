---
source: https://docs.expo.dev/modules/android-lifecycle-listeners/
---

# Android lifecycle listeners

A mechanism that lets a library hook into Android `Activity` and `Application` functions through the Expo Modules API, instead of asking users to copy code into **MainActivity** / **MainApplication**.

## Signature / Usage

Create a concrete class that implements the `Package` interface (`expo.modules.core.interfaces.Package`). For most cases only `createReactActivityLifecycleListeners` or `createApplicationLifecycleListeners` needs to be implemented.

```kotlin
// android/src/main/java/expo/modules/mylib/MyLibPackage.kt
package expo.modules.mylib

import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class MyLibPackage : Package {
  override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> {
    return listOf(MyLibReactActivityLifecycleListener())
  }
}
```

```kotlin
// android/src/main/java/expo/modules/mylib/MyLibReactActivityLifecycleListener.kt
package expo.modules.mylib

import android.app.Activity
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class MyLibReactActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
    // Your setup code in `Activity.onCreate`.
    doSomeSetupInActivityOnCreate(activity)
  }
}
```

`Application` listeners:

```kotlin
// android/src/main/java/expo/modules/mylib/MyLibPackage.kt
package expo.modules.mylib

import android.content.Context
import expo.modules.core.interfaces.ApplicationLifecycleListener
import expo.modules.core.interfaces.Package

class MyLibPackage : Package {
  override fun createApplicationLifecycleListeners(context: Context): List<ApplicationLifecycleListener> {
    return listOf(MyLibApplicationLifecycleListener())
  }
}
```

```kotlin
// android/src/main/java/expo/modules/mylib/MyLibApplicationLifecycleListener.kt
package expo.modules.mylib

import android.app.Application
import expo.modules.core.interfaces.ApplicationLifecycleListener

class MyLibApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    // Your setup code in `Application.onCreate`.
    doSomeSetupInApplicationOnCreate(application)
  }
}
```

Java equivalent of the package class:

```java
// android/src/main/java/expo/modules/mylib/MyLibPackage.java
package expo.modules.mylib;

import android.content.Context;
import expo.modules.core.interfaces.Package;
import expo.modules.core.interfaces.ReactActivityLifecycleListener;

import java.util.Collections;
import java.util.List;

public class MyLibPackage implements Package {
  @Override
  public List<? extends ReactActivityLifecycleListener> createReactActivityLifecycleListeners(Context activityContext) {
    return Collections.singletonList(new MyLibReactActivityLifecycleListener());
  }
}
```

### Lifecycle listeners to JavaScript event flow

Lifecycle listeners are singleton classes that exist independently of module instances. To forward a system event (for example an inbound deep link) to JavaScript, the module observes events and the listener notifies the observers. The official example (based on `expo-linking`) uses a listener that stores the URL and notifies observers, a module that registers/removes an observer in `OnStartObserving` / `OnStopObserving` and sends an event, and a weak reference to avoid memory leaks.

```kotlin
// android/src/main/java/expo/modules/deeplinkhandler/DeepLinkHandlerActivityLifecycleListener.kt
class DeepLinkHandlerActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
    handleIntent(activity?.intent)
  }

  override fun onNewIntent(intent: Intent?): Boolean {
    handleIntent(intent)
    return true
  }

  private fun handleIntent(intent: Intent?) {
    val url = intent?.data
    if (url != null) {
      // Store the initial URL for later retrieval
      DeepLinkHandlerModule.initialUrl = url

      // Notify all observers about the new deep link
      DeepLinkHandlerModule.urlReceivedObservers.forEach { observer ->
        observer(url)
      }
    }
  }
}
```

```kotlin
// android/src/main/java/expo/modules/deeplinkhandler/DeepLinkHandlerModule.kt
class DeepLinkHandlerModule : Module() {
  companion object {
    var initialUrl: Uri? = null
    var urlReceivedObservers: MutableSet<((Uri) -> Unit)> = mutableSetOf()
  }

  private var urlReceivedObserver: ((Uri) -> Unit)? = null

  override fun definition() = ModuleDefinition {
    Name("DeepLinkHandler")

    Events("onUrlReceived")

    Function("getInitialUrl") {
      initialUrl?.toString()
    }

    OnStartObserving("onUrlReceived") {
      val weakModule = WeakReference(this@DeepLinkHandlerModule)
      val observer: (Uri) -> Unit = { uri ->
        weakModule.get()?.sendEvent(
          "onUrlReceived",
          bundleOf(
            "url" to uri.toString(),
            "scheme" to uri.scheme,
            "host" to uri.host,
            "path" to uri.path
          )
        )
      }
      urlReceivedObservers.add(observer)
      urlReceivedObserver = observer
    }

    OnStopObserving("onUrlReceived") {
      urlReceivedObservers.remove(urlReceivedObserver)
    }
  }
}
```

```ts
// DeepLinkHandler.ts
import { requireNativeModule, NativeModule } from 'expo-modules-core';

export type DeepLinkEvent = {
  url: string;
  scheme?: string;
  host?: string;
  path?: string;
};

type DeepLinkHandlerModuleEvents = {
  onUrlReceived(event: DeepLinkEvent): void;
};

declare class DeepLinkHandlerNativeModule extends NativeModule<DeepLinkHandlerModuleEvents> {
  getInitialUrl(): string | null;
}

const DeepLinkHandler = requireNativeModule<DeepLinkHandlerNativeModule>('DeepLinkHandler');
export default DeepLinkHandler;
```

```json
{
  "platforms": ["android"],
  "android": {
    "modules": ["expo.modules.deeplinkhandler.DeepLinkHandlerModule"]
  }
}
```

## Options / Props

### Supported callbacks

| Listener | Factory method on `Package` | Supported callbacks |
| --- | --- | --- |
| `ReactActivityLifecycleListener` | `createReactActivityLifecycleListeners` | `onCreate`, `onResume`, `onPause`, `onDestroy`, `onNewIntent`, `onBackPressed` |
| `ApplicationLifecycleListener` | `createApplicationLifecycleListeners` | `onCreate`, `onConfigurationChanged` |

## Notes

- The `Package` class does not need to be registered in **MainApplication.java** / **MainApplication.kt**. Expo Autolinking scans each linked module's Android sources for classes in files ending in **Package.java** or **Package.kt** that implement `Package`, and adds them to the generated `ExpoModulesPackageList` during the Android build. If the module already supports Android, the `Package` class does not need to be added to expo-module.config.json.
- `ReactActivityLifecycleListener` hooks into React Native's `ReactActivity` lifecycle via its `ReactActivityDelegate`, not `MainActivity`. `ReactActivityDelegate` has no `onStart` / `onStop`, so those are not supported.
- Interface stability: listener interfaces may change between Expo SDK releases. New interfaces are added and interfaces planned for removal get `@Deprecated`. All interfaces are based on Java 8 interface default methods; override only the methods you need.
- Listeners are singletons independent of module instances; use the observer pattern with weak references to bridge events to JavaScript.
- Distinct from the android-architecture and android-platform-core skills (Android `Activity` / `Application` themselves are Android platform APIs).
- Source modificationDate: August 23, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [iOS AppDelegate subscribers](./appdelegate-subscribers.md)
- [Autolinking](./autolinking.md)
- [expo-module.config.json](./module-config.md)
- [Module API Reference](./module-api.md)
