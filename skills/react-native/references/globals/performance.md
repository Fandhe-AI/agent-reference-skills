---
source: https://reactnative.dev/docs/0.87/global-performance
---

# performance / Performance* globals

The global `performance` object and the related Performance API classes, as defined in Web specifications, with React Native specific extensions and partial-support notes.

## Signature / Usage

```ts
const observer = new PerformanceObserver(
  (list, observer, options) => {
    for (const entry of list.getEntries()) {
      console.log(
        'Received entry with type',
        entry.entryType,
        'and name',
        entry.name,
        'that started at',
        entry.startTime,
        'and took',
        entry.duration,
        'ms',
      );
    }
  },
);

observer.observe({entryTypes: ['mark', 'measure']});
```

`rnStartupTiming` (non-standard, React Native specific):

```ts
get rnStartupTiming(): ReactNativeStartupTiming;
```

## Options / Props

`performance` instance properties and methods (details in MDN `https://developer.mozilla.org/en-US/docs/Web/API/Performance/<name>` unless noted):

| Name | Kind | Description |
| --- | --- | --- |
| `eventCounts` | property | See MDN. |
| `memory` | property | See MDN. |
| `rnStartupTiming` | property | Non-standard, React Native specific extension. Provides information about the startup time of the application. |
| `timeOrigin` | property | Partial support. Provides the number of milliseconds from the UNIX epoch until system boot, instead of the number of milliseconds from the UNIX epoch until app startup. |
| `clearMarks()` | method | See MDN. |
| `clearMeasures()` | method | See MDN. |
| `getEntries()` | method | See MDN. |
| `getEntriesByName()` | method | See MDN. |
| `getEntriesByType()` | method | See MDN. |
| `mark()` | method | See MDN. |
| `measure()` | method | See MDN. |
| `now()` | method | Partial support. Provides the number of milliseconds from system boot, instead of the number of milliseconds from app startup. |

The `ReactNativeStartupTiming` interface provides the following fields:

| Name | Type | Description |
| --- | --- | --- |
| `startTime` | number \| void | When the React Native runtime initialization was started. |
| `executeJavaScriptBundleEntryPointStart` | number \| void | When the execution of the application bundle was started. |
| `endTime` | number \| void | When the React Native runtime was fully initialized. |

Performance* classes (all "as defined in Web specifications"):

| Name | Description | Official page |
| --- | --- | --- |
| `PerformanceObserver` | Global class. Static property `supportedEntryTypes` returns `['mark', 'measure', 'event', 'longtask', 'resource']`. Constructor and instance methods `observe()` / `disconnect()` documented in MDN. | [global-PerformanceObserver](https://reactnative.dev/docs/0.87/global-PerformanceObserver) |
| `PerformanceObserverEntryList` | Global class. | [global-PerformanceObserverEntryList](https://reactnative.dev/docs/0.87/global-PerformanceObserverEntryList) |
| `PerformanceEntry` | Global class. | [global-PerformanceEntry](https://reactnative.dev/docs/0.87/global-PerformanceEntry) |
| `PerformanceMark` | Global class. | [global-PerformanceMark](https://reactnative.dev/docs/0.87/global-PerformanceMark) |
| `PerformanceMeasure` | Global class. | [global-PerformanceMeasure](https://reactnative.dev/docs/0.87/global-PerformanceMeasure) |
| `PerformanceEventTiming` | Global class. Partial support: the `cancelable` and `target` properties are not supported yet. | [global-PerformanceEventTiming](https://reactnative.dev/docs/0.87/global-PerformanceEventTiming) |
| `PerformanceLongTaskTiming` | Global class. Partial support: the value for the `attribution` property is always an empty array. | [global-PerformanceLongTaskTiming](https://reactnative.dev/docs/0.87/global-PerformanceLongTaskTiming) |
| `PerformanceResourceTiming` | Global class. Partial support, see Notes. | [global-PerformanceResourceTiming](https://reactnative.dev/docs/0.87/global-PerformanceResourceTiming) |
| `EventCounts` | Global class. | [global-EventCounts](https://reactnative.dev/docs/0.87/global-EventCounts) |

## Notes

- `rnStartupTiming` is Non-standard: "This is a React Native specific extension."
- `performance.timeOrigin` and `performance.now()` are Partial support (system boot based, not app startup based), as listed above.
- `PerformanceResourceTiming`: React Native implements the following properties only: `fetchStart`, `requestStart`, `connectStart`, `connectEnd`, `responseStart`, `responseEnd`, `responseStatus`, `contentType`, `encodedBodySize`, `decodedBodySize`.
- MDN base pages: `https://developer.mozilla.org/en-US/docs/Web/API/Window/performance` and `https://developer.mozilla.org/en-US/docs/Web/API/<ClassName>` for each class.

## Related

- [console](./console.md)
- [IntersectionObserver globals](./intersection-observer.md)
