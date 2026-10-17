---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#performance-monitoring
---

# Performance monitoring

Drei has a component `PerformanceMonitor` that allows you to monitor, and adapt to, device performance. It collects the average fps over time. If after a couple of iterations the averages are below or above a threshold it triggers `onIncline` and `onDecline` callbacks. Typically you would reduce the quality of your scene (resolution, effects, amount of stuff to render), or increase it if you have enough framerate to fill.

Since this would normally cause ping-ponging between the two callbacks, you define upper and lower framerate bounds; as long as you stay within that margin nothing will trigger.

## Signature / Usage

A simple example for regulating the resolution. It starts out with 1.5, if the system falls below the bounds it goes to 1, if it's fast enough it goes to 2.

```jsx
function App() {
  const [dpr, setDpr] = useState(1.5)
  return (
    <Canvas dpr={dpr}>
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
```

The `onChange` callback is notified when the average changes in whichever direction. It gives you a factor between 0 and 1, which is increased by incline and decreased by decline. The factor is initially 0.5 by default.

```jsx
import round from 'lodash/round'

const [dpr, setDpr] = useState(1)
return (
 <Canvas dpr={dpr}>
  <PerformanceMonitor onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}>
```

If you still experience flip flops despite the bounds you can define a limit of flipflops. If it is met `onFallback` will be triggered, which typically sets a lowest possible baseline for the app. After the fallback has been called PerformanceMonitor will shut down.

```jsx
<PerformanceMonitor flipflops={3} onFallback={() => setDpr(1)}>
```

PerformanceMonitor can also have children; if you wrap your app in it, `usePerformanceMonitor` lets individual components down the nested tree respond to performance changes on their own.

```jsx
;<PerformanceMonitor>
  <Effects />
</PerformanceMonitor>

function Effects() {
  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
  // ...
}
```

## Notes

- `PerformanceMonitor` and `usePerformanceMonitor` are from `@react-three/drei`, a separate package not covered by this skill. The in-package mechanism is the `performance` state described in movement-regression.

## Related

- [movement-regression](./movement-regression.md)
