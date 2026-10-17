---
source: https://reactnative.dev/docs/0.87/performance
---

# Performance Overview

Frame-rate fundamentals (JS thread vs UI thread) and common sources of performance problems with suggested fixes.

## Signature / Usage

Remove `console.*` calls in production with the Babel plugin (`npm i babel-plugin-transform-remove-console --save-dev`), then in `.babelrc`:

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

Defer expensive work out of an `onPress` handler:

```tsx
function handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

## Notes

- iOS and Android devices display at least 60 frames per second, leaving at most 16.67ms per frame; missing the slot drops a frame.
- Toggle `Show Perf Monitor` in the Dev Menu to see two frame rates: JS frame rate (JavaScript thread: React app, API calls, touch events) and UI frame rate (main thread).
- Native-driven work (native stack navigators, `ScrollView` scrolling) is not interrupted by JS thread frame drops.
- Development mode (`dev=true`) greatly hurts JS thread performance; always test performance in release builds.
- `console.log` statements (including libraries such as redux-logger) can bottleneck the JS thread in bundled apps; the plugin above is recommended even if your project makes no `console.*` calls, since third-party libraries may.
- Slow `FlatList`: implement `getItemLayout`. Third-party list libraries named: FlashList and Legend List.
- Dropping JS FPS from heavy work: defer work (e.g. `requestIdleCallback`) or use `LayoutAnimation`. `Animated` calculates each keyframe on the JS thread unless `useNativeDriver: true`; `LayoutAnimation` leverages Core Animation and is unaffected by JS and main thread frame drops, but only suits fire-and-forget (non-interruptible) animations.
- Moving views on Android (e.g. text with a transparent background over an image) can benefit from `renderToHardwareTextureAndroid`; on iOS the corresponding prop is `shouldRasterizeIOS` (the Performance page states it is already enabled by default, but the View reference documents it as an opt-in bool that incurs an off-screen drawing pass and bitmap memory — test and measure when using it). Do not overuse (memory) and turn it off when the view no longer moves.
- On iOS, changing an `Image` width or height re-crops and scales the original image; animate size with `transform: [{scale}]` instead.
- Unresponsive `TouchableX`: wrap actions in `onPress` in `requestAnimationFrame`.
- Distinct from web virtualization (tanstack-virtual) and Compose LazyColumn (android-compose-ui) for list performance.

## Related

- [Profiling](./profiling.md)
- [Optimizing FlatList Configuration](./optimizing-flatlist-configuration.md)
- [Optimizing JavaScript loading](./optimizing-javascript-loading.md)
- [Debugging Basics](./debugging.md)
