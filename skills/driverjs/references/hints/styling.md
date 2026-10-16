# Styling Hints

Customize the beacon's position, color, size and animation, and the popover through the same theming that tours use.

## Signature / Usage

Beacon placement: a beacon sits on one of twelve anchor points of its element's box, a `side` (`top`, `right`, `bottom`, `left`) plus an `align` (`start`, `center`, `end`). The default is the top-right corner. Nudge with `offsetX` / `offsetY` in pixels (positive `offsetX` moves right, negative left; positive `offsetY` moves down, negative up).

```js
const hint = {
  element: "#dashboard",
  beacon: { side: "top", align: "end", offsetX: -12, offsetY: 8 },
};
```

Beacon color and size: beacons read two CSS variables. Set them globally on `.driver-hint`, or give individual beacons a `className` and scope the variables to it.

```css
/* All beacons */
.driver-hint {
  --driver-hint-color: #e11d48;
  --driver-hint-size: 28px;
}

/* Only beacons carrying a class */
.my-special-hint {
  --driver-hint-color: #059669;
}
```

```js
const productHints = hints({
  hints: [
    {
      element: "#export-btn",
      beacon: { className: "my-special-hint" },
      popover: { title: "A rose beacon", description: "..." },
    },
  ],
});
```

Static beacons: set `animate: false` on a hint, or on the instance-level `beacon` defaults, for a still dot without the pulse.

```js
const productHints = hints({
  // Applies to every hint; a hint's own beacon config wins.
  beacon: { animate: false },
  hints: [...],
});
```

Custom button text: the dismiss button says "Got it" by default. Change it for all hints with instance-level `buttonText`, per hint through the popover, or hide it with `showButton: false` for hints dismissed programmatically.

```js
const productHints = hints({
  buttonText: "Thanks, understood",
  hints: [
    {
      element: "#share-btn",
      popover: {
        title: "No button at all",
        description: "...",
        showButton: false,
      },
    },
  ],
});
```

Theming the popover: hint popovers are regular Driver.js popovers, so `popoverClass` and the popover styling techniques apply unchanged.

```js
const productHints = hints({
  popoverClass: "driverjs-theme",
  hints: [...],
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| --driver-hint-color | CSS variable | Beacon color; set on `.driver-hint` or a beacon `className` |
| --driver-hint-size | CSS variable | Beacon size; set on `.driver-hint` or a beacon `className` |
| beacon.side / align | string | Anchor point on the element's box |
| beacon.offsetX / offsetY | number | Pixel nudge from the anchor point |
| beacon.animate | boolean | Pulse on/off |
| beacon.className | string | Custom class for the beacon |
| buttonText / popover.buttonText | string | Dismiss button label |
| popover.showButton | boolean | Hide the dismiss button when false |
| popoverClass | string | Class for hint popovers |

## Notes

- Users who prefer reduced motion get the still dot automatically.
- Source: driver.js 1.10.1 docs (https://driverjs.com/docs/hints#styling).

## Related

- [Feature Hints](./overview.md)
- [Hints Configuration](./configuration.md)
- [Theming](../api/theming.md)
