---
source: https://reactnative.dev/docs/0.87/global-intersectionobserver
---

# IntersectionObserver globals

The global `IntersectionObserver` interface and `IntersectionObserverEntry`, as defined in Web specifications. `IntersectionObserver` provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

## Signature / Usage

```ts
new IntersectionObserver(callback, options?)
```

Creates a new `IntersectionObserver` object which will execute a specified callback function when it detects that a target element's visibility has crossed one or more `threshold` or `rnRootThreshold` values.

`callback` is called when the percentage of the target element that is visible crosses a threshold. It receives two parameters:

- `entries`: An array of `IntersectionObserverEntry` objects, each representing one threshold which was crossed, either becoming more or less visible than the percentage specified by that threshold.
- `observer`: The `IntersectionObserver` instance which invoked the callback.

React Native specific accessors:

```ts
get rnRootThresholds(): ReadonlyArray<number> | null;
get rnRootIntersectionRatio(): number;
```

## Options / Props

Constructor `options` (optional object):

| Name | Type | Description |
| --- | --- | --- |
| `root` | Element \| null | An element that is an ancestor of the target, whose bounding rectangle will be considered the viewport. Defaults to the root viewport if not specified or if `null`. |
| `rootMargin` | string | A string which specifies a set of offsets to add to the root's bounding box when calculating intersections. Defaults to `"0px 0px 0px 0px"`. |
| `threshold` | number \| number[] | Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area for the observed target. Defaults to `[0]` if `rnRootThreshold` is not set. |
| `rnRootThreshold` | number \| number[] | React Native specific. Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to the total root area. |

`IntersectionObserver` instance members:

| Name | Kind | Description |
| --- | --- | --- |
| `root` | property | The element or document whose bounds are used as the bounding box when testing for intersection. |
| `rootMargin` | property | An offset rectangle applied to the root's bounding box when calculating intersections. |
| `rnRootThresholds` | property | Non-standard. A list of root thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of the specified root view, which defaults to the viewport. |
| `thresholds` | property | A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. |
| `disconnect()` | method | Stops the `IntersectionObserver` object from observing any target. |
| `observe()` | method | Tells the `IntersectionObserver` to begin observing a target element. |
| `takeRecords()` | method | Returns an array of `IntersectionObserverEntry` objects for all observed targets. |
| `unobserve()` | method | Tells the `IntersectionObserver` to stop observing a particular target element. |

`IntersectionObserverEntry` instance properties (delivered to the callback's `entries` parameter):

| Name | Description |
| --- | --- |
| `boundingClientRect` | Returns the bounds rectangle of the target element as a `DOMRectReadOnly`. |
| `intersectionRatio` | Returns the ratio of the `intersectionRect` to the `boundingClientRect`. |
| `intersectionRect` | Returns a `DOMRectReadOnly` representing the target's visible area. |
| `isIntersecting` | A Boolean value which is `true` if the target element intersects with the intersection observer's root. If `true`, the entry describes a transition into a state of intersection; if `false`, the transition is from intersecting to not-intersecting. |
| `rnRootIntersectionRatio` | Non-standard. Returns the ratio of the `intersectionRect` to the `rootBounds`. Analogous to `intersectionRatio`, but computed relative to the root's bounding box instead of the target's bounding box; corresponds to the `rnRootThreshold` option. |
| `rootBounds` | Returns a `DOMRectReadOnly` for the intersection observer's root. |
| `target` | The `Element` whose intersection with the root changed. |
| `time` | A `DOMHighResTimeStamp` indicating the time at which the intersection was recorded, relative to the `IntersectionObserver`'s time origin. |

## Notes

- Experimental (Canary): "This API is currently only available in React Native's Canary and Experimental channels. If you want to try it out, please enable the Canary Channel in your app." Both official pages are titled with the experimental marker.
- `rnRootThreshold` (option), `rnRootThresholds` and `rnRootIntersectionRatio` are Non-standard: "This is a React Native specific extension."
- Notifications for a target are generated when any of the thresholds specified in `rnRootThresholds` or `thresholds` are crossed for that target.
- Page for `IntersectionObserverEntry`: https://reactnative.dev/docs/0.87/global-intersectionobserverentry

## Related

- [performance / Performance* globals](./performance.md)
