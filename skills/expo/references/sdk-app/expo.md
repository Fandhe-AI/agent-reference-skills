---
source: https://docs.expo.dev/versions/v58.0.0/sdk/expo/
---

# Expo

Set of common methods and types for Expo and related packages (`expo` package: `registerRootComponent`, `expo/fetch`, event emitters, shared objects, native module helpers, permission types).

## Signature / Usage

```sh
npx expo install expo
```

```tsx
import * as Expo from 'expo';
```

```ts
// expo/fetch: WinterCG-compliant Fetch API (streaming)
import { fetch } from 'expo/fetch';

const resp = await fetch('https://httpbin.org/drip?numbytes=512&duration=2', {
  headers: { Accept: 'text/event-stream' },
});
const reader = resp.body.getReader();
const chunks = [];
while (true) {
  const { done, value } = await reader.read();
  if (done) {
    break;
  }
  chunks.push(value);
}
const buffer = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
console.log(buffer.length); // 512
```

```jsx
// src/main.jsx (custom entry file; package.json "main": "src/main.jsx")
import { registerRootComponent } from 'expo';
import { View } from 'react-native';

function App() {
  return <View />;
}

registerRootComponent(App);
```

## Options / Props

### Global APIs provided by Expo

| Name | Description |
| --- | --- |
| `expo/fetch` `fetch` | WinterCG-compliant Fetch API that works across web and mobile. On Android and iOS it is also installed as the global `fetch`; set `EXPO_PUBLIC_USE_RN_FETCH=1` to keep React Native's built-in `fetch` as the global. Named imports from `expo/fetch` work regardless of this flag. |
| `TextEncoder` / `TextDecoder` | Available on all platforms. `TextEncoder` and, starting with SDK 58 and React Native 0.88, `TextDecoder` are provided by Hermes. `TextDecoder` supports UTF-8, UTF-16, and legacy single-byte encodings such as `windows-1252` (`latin1`). A custom JavaScript runtime must provide `TextDecoder` before Expo initializes. |
| `TextEncoderStream` / `TextDecoderStream` | Streaming equivalents, available on all platforms. |
| `ReadableStream` / `WritableStream` / `TransformStream` | Global standard web streams on native platforms. EAS Hosting server runtime also supports them. |
| `URL` / `URLSearchParams` | Built-in implementations replace the shims in `react-native`. Native platforms do not support non-ASCII characters in the hostname (`new URL('http://🥓').toString()` is `http://🥓/` on Android/iOS but `http://xn--pr9h/` on Web/Node.js). |
| `structuredClone` | Deep copy including `Map`, `Set`, `ArrayBuffer`. The `transfer` option for `ArrayBuffer` and `TypedArray`s is not implemented. Remove custom polyfills. |

### Constants

Supported platforms: Android, iOS, tvOS, Web.

| Name | Type |
| --- | --- |
| `Platform` | `{ canUseEventListeners: boolean, canUseViewport: boolean, isAsyncDebugging: boolean, isDOMAvailable: boolean, isQuest: boolean, OS: string, select: PlatformSelect }` |
| `SharedRef` | `SharedRef` |
| `uuid` | `UUID` |

### Hooks

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `useEvent(eventEmitter, eventName, initialValue)` | `eventEmitter: EventEmitter<TEventsMap>`, `eventName: TEventName`, `initialValue?: TInitialValue \| null` (default `null`) | `InferEventParameter<TEventListener, TInitialValue>` | Listens to events emitted by the given object; the returned value is the event parameter, updated whenever a new event is dispatched. |
| `useEventListener(eventEmitter, eventName, listener)` | `eventEmitter: EventEmitter<TEventsMap>`, `eventName: TEventName`, `listener: TEventListener` | `void` | Calls `listener` whenever the event is dispatched. Added during the first render and removed on unmount. |
| `useReleasingSharedObject(factory, dependencies)` | `factory: () => TSharedObject`, `dependencies: DependencyList` | `TSharedObject` | Returns a shared object, automatically cleaned up when the component unmounts. |
| `useReleasingSharedObjectWithLifecycle(lifecycle, dependencies)` | `lifecycle: ReleasingSharedObjectLifecycle<TSharedObject>`, `dependencies: DependencyList` | `TSharedObject` | Returns a shared object, delegating dependency changes to lifecycle callbacks. |

```tsx
import { Text } from 'react-native';
import { useEvent } from 'expo';
import { VideoPlayer } from 'expo-video';

export function PlayerStatus({ videoPlayer }: { videoPlayer: VideoPlayer }) {
  const { status } = useEvent(videoPlayer, 'statusChange', { status: videoPlayer.status });

  return <Text>{`Player status: ${status}`}</Text>;
}
```

### Methods

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `createPermissionHook(methods)` | `methods: PermissionHookMethods<Permission, Options>` | `(options: PermissionHookOptions<Options>) => [Permission \| null, RequestPermissionMethod<Permission>, GetPermissionMethod<Permission>]` | Creates a permission hook with the permission methods built in. |
| `createSnapshotFriendlyRef()` | — | `RefObject<T \| null>` | React ref object friendly for snapshots; represented as `[React.ref]`. |
| `installOnUIRuntime(uiRuntimeHolder)` | `uiRuntimeHolder: object` (from `getUIRuntimeHolder()` in `react-native-worklets`) | `void` | Installs Expo Modules on the UI worklet runtime so worklet callbacks and serializable SharedObjects work there. |
| `isRunningInExpoGo()` | — | `boolean` | Whether the app is running in Expo Go. |
| `registerRootComponent(component)` | `component: ComponentType<P>` | `void` | Sets the initial React component rendered in the app's root view on Android, iOS, tvOS and web. Invokes `AppRegistry.registerComponent` (and React Native web's `AppRegistry.runApplication` on web) and polyfills `process.nextTick`. Dev-only extras: Fast Refresh and bundle splitting indicator; asserts if `expo-updates` is misconfigured; asserts if `react-native` is not aliased to `react-native-web` in the browser. |
| `registerWebModule(moduleImplementation, moduleName)` | `moduleImplementation: ModuleType` (class extending `NativeModule`), `moduleName: string` | `InstanceType<ModuleType>` | Registers a web module under `globalThis.expo.modules[className]`; returns a singleton instance. |
| `reloadAppAsync(reason)` | `reason?: string` (default `'Reloaded from JS call'`) | `Promise<void>` | Reloads the app in release and debug builds. Unlike `Updates.reloadAsync()`, it does not use a new update even if one is available. |
| `requireNativeModule(moduleName)` | `moduleName: string` | `ModuleType` | Imports the native module with the given name. Tries the JSI host object first, then falls back to the bridge proxy module (which may not support synchronous functions). |
| `requireNativeView(moduleName, viewName)` | `moduleName: string`, `viewName?: string` | `ComponentType<P>` | Drop-in replacement for `requireNativeComponent`. |
| `requireOptionalNativeModule(moduleName)` | `moduleName: string` | `ModuleType \| null` | Same as `requireNativeModule`, but returns `null` instead of throwing when not found. |

### Classes

| Name | Description |
| --- | --- |
| `CodedError` (extends `Error`) | General error class for Expo modules. Guarantees a `code: string` field; optional `info: any`. |
| `UnavailabilityError` (extends `CodedError`) | Thrown when a property is unavailable, unsupported, or not implemented on the running platform. Has `code: string` and optional `info: any`. |
| `EventEmitter` (type `EventEmitterType`) | Consistent API for emitting and listening to events (C++ implementation common to all platforms). Listeners run synchronously; return values are ignored. |
| `NativeModule` (type `NativeModuleType`) | Class for all native modules; extends `EventEmitter`. |
| `SharedObject` (type `SharedObjectType`) | Base class for all shared objects; extends `EventEmitter`. C++ implementation installed through JSI, common for mobile platforms. |
| `SharedRef` (type `SharedRefType`) | A `SharedObject` holding a reference to any native object, allowing references to native instances to be passed among independent libraries (for example `ImageRef` from `expo-image` references a `Drawable` on Android and a `UIImage` on iOS). Property `nativeRefType: string`. |

`EventEmitter` methods:

| Method | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `addListener(eventName, listener)` | `eventName: EventName`, `listener: TEventsMap[EventName]` | `EventSubscription` | Adds a listener. |
| `emit(eventName, ...args)` | `eventName: EventName`, `...args: Parameters<TEventsMap[EventName]>` | `void` | Synchronously calls all listeners for the event. |
| `listenerCount(eventName)` | `eventName: EventName` | `number` | Number of listeners for the event. |
| `removeAllListeners(eventName)` | `eventName: keyof TEventsMap` | `void` | Removes all listeners for the event. |
| `removeListener(eventName, listener)` | `eventName: EventName`, `listener: TEventsMap[EventName]` | `void` | Removes a listener. |
| `startObserving(eventName)` | `eventName: EventName` | `void` | Invoked automatically when the first listener for the event is added; override in a subclass for setup. |
| `stopObserving(eventName)` | `eventName: EventName` | `void` | Invoked automatically when the last listener is removed; override for cleanup. |

`SharedObject.release()` (returns `void`) detaches the JS and native objects so the native object can deallocate before the JS garbage collector runs; later calls to native functions of the object throw. Rarely needed; shared objects created by hooks such as `useVideoPlayer()` (`expo-video`) and `useImage()` (`expo-image`) are usually released automatically in the effect cleanup.

`EventSubscription` interface: `remove(): void` removes the listener for which the subscription was created.

### Types

| Name | Definition |
| --- | --- |
| `EventEmitter` | `ExpoEventEmitter<TEventsMap>` |
| `FloatBasedTypedArray` | `Float32Array \| Float64Array` |
| `IntBasedTypedArray` | `Int8Array \| Int16Array \| Int32Array` |
| `UintBasedTypedArray` | `Uint8Array \| Uint8ClampedArray \| Uint16Array \| Uint32Array` |
| `TypedArray` | `IntBasedTypedArray \| UintBasedTypedArray \| FloatBasedTypedArray` |
| `PermissionExpiration` | `'never' \| number` (currently all permissions are granted permanently) |
| `PermissionHookOptions` | `PermissionHookBehavior \| Options` |
| `PermissionResponse` | Object returned by permission get/request functions: `canAskAgain: boolean`, `expires: PermissionExpiration`, `granted: boolean`, `status: PermissionStatus` |
| `ReleasingSharedObjectLifecycle` | `factory: () => TSharedObject`; optional `release: (object) => void` (defaults to the object's `release`); optional `shouldRecreate: (object, context) => boolean` (pure function; `false` keeps the object and uses `update`); optional `update: (object, context) => void \| Promise<void>` (runs after commit; only effective when `shouldRecreate` returns `false`; rejected promises are logged with `console.error`) |
| `ReleasingSharedObjectLifecycleContext` | `dependencies: DependencyList` (current render), `previousDependencies: DependencyList` (last committed decision) |

### Enums

`PermissionStatus`:

| Value | Description |
| --- | --- |
| `PermissionStatus.DENIED = "denied"` | User has denied the permission. |
| `PermissionStatus.GRANTED = "granted"` | User has granted the permission. |
| `PermissionStatus.UNDETERMINED = "undetermined"` | User hasn't granted or denied the permission yet. |

## Notes

- The useEvent example adds the missing Text import from react-native (omitted in the official docs).

- Platforms: android, ios, tvos, web, expo-go.
- `registerRootComponent` in an existing (bare) React Native project: on Android, update `MainActivity` `getMainComponentName()` to return `"main"`; on iOS, use the moduleName `main` in `createRootViewWithBridge:bridge moduleName:@"main" initialProperties:initProps` within `application:didFinishLaunchingWithOptions:`.
- Projects without Expo Router can set `"main"` in `package.json` to any entry file, but must then call `registerRootComponent`; `export default` does not make the component the root with a custom entry file. For Expo Router projects, see the Expo Router installation guide (custom entry point) and the src directory reference.
- Source: `sdk-58` branch `packages/expo`; modificationDate October 02, 2026.

## Related

- [Constants](./constants.md)
- [Asset](./asset.md)
- [DevClient](./dev-client.md)
