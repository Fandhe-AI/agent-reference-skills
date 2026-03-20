# Suspense (Streaming)

Defer non-critical data by returning unawaited promises from loaders, unblocking the initial render and streaming results to the client as they resolve.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Return an unawaited `Promise` as a value inside the loader's return object (do NOT return a bare promise)
2. Await critical data inline; leave non-critical data as a promise
3. Wrap the consuming component in `<React.Suspense fallback={...}>` with `<Await resolve={promise}>`
4. With React 19, use `React.use(promise)` inside a separate child component instead of `<Await>`

## コード例

```tsx
// loader — return promise without awaiting
export async function loader({}: Route.LoaderArgs) {
  const nonCriticalData = new Promise<string>((res) =>
    setTimeout(() => res("non-critical"), 5000),
  );
  const criticalData = await new Promise<string>((res) =>
    setTimeout(() => res("critical"), 300),
  );
  return { nonCriticalData, criticalData };
}

// component — use Await + Suspense
import * as React from "react";
import { Await } from "react-router";

export default function MyComponent({ loaderData }: Route.ComponentProps) {
  const { criticalData, nonCriticalData } = loaderData;
  return (
    <div>
      <h2>Critical: {criticalData}</h2>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={nonCriticalData}>
          {(value) => <h3>Non-critical: {value}</h3>}
        </Await>
      </React.Suspense>
    </div>
  );
}
```

## 注意点

- You cannot return a bare promise from a loader — it must be wrapped in an object
- Default stream timeout is **4950 ms**; configure via `export const streamTimeout = 10_000` in `entry.server.tsx`
- With React 19, place `React.use(promise)` in a child component so the `Suspense` boundary is above it

## 関連

- [./client-data.md](./client-data.md)
- [./error-boundary.md](./error-boundary.md)
