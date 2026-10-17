---
source: https://reactnative.dev/docs/0.87/profiling
---

# Profiling

Analyzing app performance: Android UI profiling with System Tracing in Android Studio Profiler, reading traces, and resolving JS and native UI issues.

## Signature / Usage

```text
Android Studio Profiler > "Capture System Activities" (run the project as profileable)
Stop recording > inspect in Android Studio, or "Past Recordings" > "Export recording" > open in Perfetto
CPU hotspots: "Find CPU Hotspots (Java/Kotlin Recording)"  (not "Callstack Sample")
```

## Notes

- For iOS, Instruments is the recommended tool; on Android use the Android Studio Profiler. First make sure Development Mode is OFF.
- The standalone `systrace` tool has been removed from Android platform-tools; use the Android Studio Profiler instead.
- Collecting a trace: connect a device via USB, open the project's `android` folder in Android Studio, run it as profileable, start "Capture System Activities", perform the interaction, then press "Stop recording".
- Reading the trace: enable VSync highlighting to see 16ms frame boundaries (zebra stripes; Samsung devices have been known to have issues displaying vsyncs, Nexus series is generally reliable). WASD keys strafe and zoom.
- Threads of interest: UI Thread (package name or UI Thread; `Choreographer`, `traversals`, `DispatchUI`), JS Thread (`mqt_js` or `<...>`; `JSCall`, `Bridge.executeJSCall`), Native Modules Thread (`mqt_native_modules` or `<...>`; `NativeCall`, `callJavaModuleMethod`, `onBatchComplete`), and Render Thread on Android 5+ (`RenderThread`; `DrawFrame`, `queueBuffer`).
- A smooth 60 FPS trace has no thread working close to the frame boundary. If the JS thread executes across frame boundaries the problem lies in JS; if UI and render threads cross frame boundaries the problem lies in the native views being rendered.
- JS issues: look for repeated work such as `RCTEventEmitter` being called multiple times per frame; consider `shouldComponentUpdate`.
- Too much GPU work (long `DrawFrame`): investigate `renderToHardwareTextureAndroid` for complex static content being animated; make sure `needsOffscreenAlphaCompositing` (disabled by default) is not used.
- Creating new views on the UI thread has no quick mitigation: postpone creating new UI until after the interaction or simplify it.
- CPU hotspot profiling is slow and not accurate for timings but shows proportionally which native methods are called; keep the interaction short. The trace can be exported to an online tool such as Firefox Profiler.
- Native Android profiling tools are covered by android-architecture / android-testing; this page covers the React Native workflow.

## Related

- [Performance Overview](./performance.md)
- [Systrace](./systrace.md)
- [React Native DevTools](./react-native-devtools.md)
