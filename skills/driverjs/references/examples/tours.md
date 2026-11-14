# Tours

Examples of multi-step tour configurations in Driver.js: animated and static tours, animation speed and the step counter.

## Signature / Usage

A tour is a list of steps. Each step highlights an element and describes it in a popover. Pass the steps to `driver()` and call `drive()`.

### Animated Tour

The highlight glides from one step to the next by default. Users move with the buttons or the arrow keys, and close with `Escape`.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: ".page-header",
      popover: {
        title: "Header",
        description: "Search lives here.",
        side: "bottom",
      },
    },
    {
      element: ".sidebar",
      popover: { title: "Sidebar", side: "right" },
    },
    { popover: { title: "Happy Coding" } },
  ],
});

driverObj.drive();
```

A step without an `element` is centered on the screen. `drive()` starts at the first step; pass an index to start elsewhere.

### Animation Duration

`duration` sets how long the move between steps and the fade-in take, in milliseconds. The default is `400`. It only applies when `animate` is `true`.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  duration: 150,
  steps: [
    // ...
  ],
});

driverObj.drive();
```

### Static Tour

`animate: false` turns the animation off. The highlight jumps straight to each step, with no gliding and no fade-in.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  animate: false,
  steps: [
    // ...
  ],
});

driverObj.drive();
```

### Tour Progress

`showProgress: true` shows the step count in the popover's bottom left corner, as `{{current}} of {{total}}`. Change the text with `progressText`. Both can be set per step in its `popover` as well.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  progressText: "Step {{current}} of {{total}}",
  steps: [
    // ...
  ],
});

driverObj.drive();
```

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| animate | boolean | true | Glide between steps and fade the popover in |
| duration | number | 400 | Animation time in milliseconds; only used when `animate` is `true` |
| showProgress | boolean | false | Show progress text in the popover |
| progressText | string | `'{{current}} of {{total}}'` | Template with `{{current}}` and `{{total}}` placeholders |

## Notes

- Since 1.14.0 the official page is `/docs/tour-basics` (group "Tours"); the 1.10.1 page put the same examples in the "Examples" group. The default tour is `animate: true`, and the page's live demos pass `animate: true` explicitly.
- The 1.14.0 page also demonstrates a 1200 ms (slow) tour next to the 150 ms one; both are the same `duration` option and the page shows no separate code for the slow one.
- Source: https://driverjs.com/docs/tour-basics (driver.js 1.14.0 docs source, apps/docs/src/content/guides/tour-basics.mdx at tag 1.14.0).

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
