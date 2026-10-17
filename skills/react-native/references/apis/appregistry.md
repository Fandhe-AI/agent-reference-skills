---
source: https://reactnative.dev/docs/0.87/appregistry
---

# AppRegistry

`AppRegistry` is the JS entry point to running all React Native apps. App root components register themselves with `AppRegistry.registerComponent`; the native system then loads the bundle and runs the app by invoking `AppRegistry.runApplication`.

## Signature / Usage

```tsx
import {View, Text, AppRegistry} from 'react-native';

const App = () => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `getAppKeys()` | `static getAppKeys(): string[];` | Returns an array of strings. |
| `getRegistry()` | `static getRegistry(): {sections: string[]; runnables: Runnable[]};` | Returns a Registry object. |
| `getRunnable()` | `static getRunnable(appKey: string): : Runnable \| undefined;` | Returns a Runnable object. `appKey` (string) required. |
| `getSectionKeys()` | `static getSectionKeys(): string[];` | Returns an array of strings. |
| `getSections()` | `static getSections(): Record<string, Runnable>;` | Returns a Runnables object. |
| `registerCancellableHeadlessTask()` | `static registerCancellableHeadlessTask(taskKey: string, taskProvider: TaskProvider, taskCancelProvider: TaskCancelProvider);` | Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI. `taskKey` (required): the native id for this task instance used when `startHeadlessTask` was called. `taskProvider` (required): a promise-returning function that takes data passed from the native side; when resolved or rejected the native side is notified and may destroy the JS context. `taskCancelProvider` (required): a void-returning function with no arguments; on cancellation the function executed by `taskProvider` should wrap up and return ASAP. |
| `registerComponent()` | `static registerComponent(appKey: string, getComponentFunc: ComponentProvider, section?: boolean): string;` | Register an app component. `appKey` (required), `componentProvider` (required), `section` (boolean). |
| `registerConfig()` | `static registerConfig(config: AppConfig[]);` | `config` (required): array of AppConfig. |
| `registerHeadlessTask()` | `static registerHeadlessTask(taskKey: string, taskProvider: TaskProvider);` | Register a headless task: run JavaScript while the app is in the background, e.g. to sync fresh data, handle push notifications, or play music. |
| `registerRunnable()` | `static registerRunnable(appKey: string, func: Runnable): string;` | `appKey` (required, string), `run` (required, function). |
| `registerSection()` | `static registerSection(appKey: string, component: ComponentProvider);` | `appKey` and `component` required. |
| `runApplication()` | `static runApplication(appKey: string, appParameters: any): void;` | Loads the JavaScript bundle and runs the app. Both parameters required. |
| `setComponentProviderInstrumentationHook()` | `static setComponentProviderInstrumentationHook(hook: ComponentProviderInstrumentationHook);` | `hook` (required function) accepts `component` (ComponentProvider) and `scopedPerformanceLogger` (IPerformanceLogger), and must return a React Component. |
| `setWrapperComponentProvider()` | `static setWrapperComponentProvider(provider: WrapperComponentProvider);` | `provider` (required, ComponentProvider). |
| `startHeadlessTask()` | `static startHeadlessTask(taskId: number, taskKey: string, data: any);` | Only called from native code. Starts a headless task. `taskId`: native id to track execution; `taskKey`: key of the task; `data`: data to pass. |
| `unmountApplicationComponentAtRootTag()` | `static unmountApplicationComponentAtRootTag(rootTag: number);` | Stops an application when a view should be destroyed. `rootTag` required. |

### Type Definitions

| Type | Definition |
| --- | --- |
| `AppConfig` | Object for `registerConfig`: `appKey` (string, required), `component` (ComponentProvider), `run` (function), `section` (boolean). Every config is expected to set either `component` or `run`. |
| `Registry` | Object: `runnables` (array of Runnable), `sections` (array of strings). |
| `Runnable` | Object: `component` (ComponentProvider), `run` (function). |
| `Runnables` | Object with key `appKey` and value of type `Runnable`. |
| `Task` | A function that accepts any data as argument and returns a Promise that resolves to `undefined`. |
| `TaskCanceller` | A function that accepts no argument and returns void. |
| `TaskCancelProvider` | A function that returns a `TaskCanceller`. |
| `TaskProvider` | A function that returns a `Task`. |

## Notes

- The official example omits `View` from the import; it is added here so the snippet runs as-is.
- Project with native code required. With the managed Expo workflow there is only one entry component registered with `AppRegistry`, handled automatically (or through Expo's `registerRootComponent`); you do not need this API.
- To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag` with the tag passed into `runApplication`. These should always be used as a pair.
- `AppRegistry` should be required early in the `require` sequence to make sure the JS execution environment is set up before other modules are required.

## Related

- [RootTag](./roottag.md)
