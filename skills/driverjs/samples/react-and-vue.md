# React and Vue

Set up and clean up a tour in React, Vue and Next.js.

```jsx
import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function Dashboard() {
  const driverRef = useRef(null);

  useEffect(() => {
    driverRef.current = driver({
      steps: [
        { element: "#new-project", popover: { title: "New" } },
        { element: "#invite", popover: { title: "Invite" } },
      ],
    });

    return () => driverRef.current.destroy();
  }, []);

  return (
    <header>
      <button id="new-project">New project</button>
      <button id="invite">Invite</button>
      <button onClick={() => driverRef.current.drive()}>
        Take the tour
      </button>
    </header>
  );
}
```

```vue
<script setup>
import { onBeforeUnmount } from "vue";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    { element: "#new-project", popover: { title: "New" } },
    { element: "#invite", popover: { title: "Invite" } },
  ],
});

onBeforeUnmount(() => driverObj.destroy());
</script>

<template>
  <header>
    <button id="new-project">New project</button>
    <button id="invite">Invite</button>
    <button @click="driverObj.drive()">Take the tour</button>
  </header>
</template>
```

```tsx
"use client";

import { useEffect, useRef } from "react";
import type { Driver } from "driver.js";
import "driver.js/dist/driver.css";

export function TourButton() {
  const driverRef = useRef<Driver | null>(null);

  useEffect(() => {
    return () => driverRef.current?.destroy();
  }, []);

  async function startTour() {
    const { driver } = await import("driver.js");

    driverRef.current = driver({
      steps: [
        { element: "#new-project", popover: { title: "New" } },
        { element: "#invite", popover: { title: "Invite" } },
      ],
    });
    driverRef.current.drive();
  }

  return <button onClick={startTour}>Take the tour</button>;
}
```

## Notes

- Driver.js works on plain DOM elements, so it needs no wrapper: create the driver once the elements are on the page, and destroy it when the component goes away
- Next.js: a tour runs in the browser, so put it in a client component. Importing `driver.js` when the tour starts keeps it out of the server render and the first load. With the Pages Router the same component works as is; to start on load instead of on a click, call `startTour()` from the `useEffect`
- A step's `element` is looked up when the step starts, so selectors can point at elements that render later
- When your framework replaces a highlighted element, the step follows the new one (automatic since 1.12.0; `onElementReplaced` since 1.13.0)
- Prefer selectors over refs in steps: a selector finds the new element after a re-render, a stored element does not
- Source: https://driverjs.com/docs/react-and-vue (driver.js 1.14.0 docs source, apps/docs/src/content/guides/react-and-vue.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
