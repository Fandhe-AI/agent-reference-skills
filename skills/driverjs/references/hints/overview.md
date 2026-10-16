# Feature Hints

Hints are pulsing beacons placed on the page. The user clicks one to open a popover, in any order, with no overlay and nothing blocked, so the page stays interactive.

## Signature / Usage

Hints ship as their own entry with a self-contained stylesheet, so tour-only users never load them and `driver.css` is not needed unless tours are also used.

```js
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const productHints = hints({
  overlay: true,
  overlayOpacity: 0.5,
  hints: [
    {
      element: "#export-btn",
      id: "export",
      popover: {
        title: "Export your data",
        description: "Download this report as CSV or PDF.",
      },
    },
    {
      element: "#summary",
      id: "summary",
      beacon: { side: "left", align: "center" },
      popover: {
        title: "Auto-generated summary",
        description: "This paragraph is written for you from the quarter's numbers.",
        side: "bottom",
      },
    },
  ],
});

productHints.show();
```

## Closing vs. dismissing

- Closing: clicking the beacon again, clicking anywhere outside, or pressing Escape closes the popover. The beacon stays, and the hint can be opened again.
- Dismissing: clicking the "Got it" button removes the beacon entirely and fires `onDismiss`. The hint is gone for the session. Provide `onButtonClick` to take over the button, the same way `onNextClick` takes over a tour's next button.
- Only one hint popover is open at a time; opening another swaps it.

## Remembering dismissals

Driver.js keeps dismissals in memory for the session and does not handle storage. `onDismiss` with stable `id`s is the hook; storage is up to the caller.

```js
const dismissed = new Set(JSON.parse(localStorage.getItem("hints") ?? "[]"));

const productHints = hints({
  hints: allHints.filter(hint => !dismissed.has(hint.id)),
  onDismiss: (element, hint) => {
    dismissed.add(hint.id);
    localStorage.setItem("hints", JSON.stringify([...dismissed]));
  },
});

productHints.show();
```

## Dimming the page

Pass `overlay: true` to dim the page while a hint is open. The hint reads like a tour step: the element is cut out of the dim and stays interactive, the popover anchors to the element rather than the beacon, and the beacon steps aside while its popover is up. Everything else, including the other beacons, sits under the overlay; clicking the dimmed page closes the hint like any outside click.

```js
const productHints = hints({
  overlay: true,
  overlayColor: "#000",
  overlayOpacity: 0.5,
  hints: [...],
});
```

## Using hints alongside a tour

Hints and tours coexist without wiring: while a tour is running, the beacons hide and any open hint closes; when the tour ends, the beacons return on their own. A common pattern is a hint whose button launches the tour, using `onButtonClick` to take over the button.

```js
const tour = driver({ steps: [...] });

const productHints = hints({
  hints: [
    {
      element: "#whats-new",
      id: "whats-new",
      popover: {
        title: "New dashboard",
        description: "Want a quick walkthrough?",
        buttonText: "Take the tour",
        onButtonClick: (element, hint, { hints: instance }) => {
          instance.close();
          tour.drive();
        },
      },
    },
  ],
});
```

## Notes

- Hint popovers are regular Driver.js popovers, so `onPopoverRender` works too for additional buttons or custom markup, exactly like in tours.
- Source: driver.js 1.10.1 docs (https://driverjs.com/docs/hints).

## Related

- [Hints Configuration](./configuration.md)
- [Hints Methods](./methods.md)
- [Styling Hints](./styling.md)
