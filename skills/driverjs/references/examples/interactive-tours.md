# Interactive Tours

Build tours that react to the app: advance when users click the highlighted element, wait for elements that render on demand, skip optional steps, follow re-rendered elements, run async logic between steps, and continue across pages.

## Signature / Usage

A tour can follow what happens in your app instead of the Next button. For tours where every step waits for a specific action and wrong actions get feedback, see [Action-Driven Tours](./action-driven-tours.md).

### Advance on Click

`advanceOn: "click"` moves the tour on when the highlighted element is clicked, as if Next was pressed. The element's own click handler still runs. Set it for the whole tour or per step.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  advanceOn: "click",
  showProgress: true,
  steps: [
    { element: "#plan", popover: { title: "Pick a Plan" } },
    { element: "#billing", popover: { title: "Billing" } },
    { element: "#checkout", popover: { title: "Checkout" } },
  ],
});

driverObj.drive();
```

`advanceOn` takes any event, like `"change"` or `"dblclick"`. To remove the Next button so the click is the only way forward, make the step an action step (`popover.instruction`, see [Action-Driven Tours](./action-driven-tours.md)). `advanceOnClick: true` from earlier versions still works but is deprecated.

### Wait for Elements

A click often leads to something that doesn't exist yet, like a modal. Give the next step a `waitForElement` time in milliseconds: the tour stays on the current step, with its popover in a waiting state, until the element appears.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    {
      element: "#open-modal",
      advanceOn: "click",
      popover: { title: "Open", instruction: "Click <b>Open</b>." },
    },
    {
      element: "#modal-confirm",
      waitForElement: 5000,
      popover: { title: "Confirm", description: "Now it's here." },
    },
  ],
});

driverObj.drive();
```

If the element never appears, the step shows without it, centered on the screen. To keep the user on the current step instead, set `onElementMissing` (see [Action-Driven Tours](./action-driven-tours.md), "Recover From a Slow Load").

### Optional Steps

Some elements only exist for some users. With `skipMissingElement: true`, a step whose element is not on the page is skipped, forwards and backwards.

```js
const driverObj = driver({
  steps: [
    {
      element: "#stats",
      popover: {
        title: "Your numbers",
        description: "Updated every hour.",
      },
    },
    {
      element: "#trial-banner",
      skipMissingElement: true,
      popover: {
        title: "Trial banner",
        description: "Only trial accounts see this step.",
      },
    },
    {
      element: "#export",
      popover: {
        title: "Export",
        description: "Download the numbers as CSV.",
      },
    },
  ],
});

driverObj.drive();
```

Set it on the driver to apply it to every step. Steps without an `element` are never skipped. Combined with `waitForElement`, the step is skipped only after the wait runs out.

### Elements That Re-render

Frameworks often replace an element instead of updating it. When the highlighted element is replaced, the step moves to the new element that matches its selector. There is nothing to configure. A step that got an element object instead of a selector or function has nothing to look up, so prefer selectors.

```js
const driverObj = driver({
  steps: [
    {
      element: "#sync-row",
      popover: {
        title: "Sync status",
        description: "Click <b>Sync now</b> a few times.",
      },
    },
  ],
});

driverObj.drive();
```

When the element is removed and nothing replaces it, `onElementMissing` decides what happens (see the Missing Elements section of [Configuration](../api/configuration.md)).

### Async Steps

When a step needs to load data or render something before the tour can move on, and `waitForElement` isn't enough, override `onNextClick`, do the work, then call `moveNext()`.

```js
const driverObj = driver({
  showProgress: true,
  steps: [
    {
      popover: {
        title: 'First Step',
        description: 'This is the first step. Next element will be loaded dynamically.',
        // By passing onNextClick, you can override the default behavior of the next button.
        // This will prevent the driver from moving to the next step automatically.
        // You can then manually call driverObj.moveNext() to move to the next step.
        onNextClick: () => {
          // .. load element dynamically
          // .. and then call
          driverObj.moveNext();
        },
      },
    },
    {
      element: '.dynamic-el',
      popover: {
        title: 'Async Element',
        description: 'This element is loaded dynamically.'
      },
      // onDeselected is called when the element is deselected.
      // Here we are simply removing the element from the DOM.
      onDeselected: () => {
        // .. remove element
        document.querySelector(".dynamic-el")?.remove();
      }
    },
    { popover: { title: 'Last Step', description: 'This is the last step.' } }
  ]
});

driverObj.drive();
```

### Multi-Page Tours

A driver instance lives within a single page: a full page load destroys it, and even in single-page apps the next route's elements don't exist while the current route is showing. Treat the tour as resumable: persist the step to resume at, let the app navigate normally, and start a fresh tour from the saved step on the next page.

Saving progress before navigating: define the tour in a function so every page can create it. On the step whose click navigates away, use `advanceOn: "click"` together with an `onNextClick` override that saves where to resume and destroys the tour. The link's own click keeps working.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TOUR_KEY = "app-tour-step";

export function createTour() {
  let isNavigating = false;

  const driverObj = driver({
    steps: [
      {
        element: "#reports-nav",
        popover: { title: "Reports", description: "Your reports live here." },
      },
      {
        element: "#settings-link",
        // Clicking the highlighted link continues the tour and navigates.
        advanceOn: "click",
        popover: {
          title: "Open Settings",
          description: "Click this link to continue on the settings page.",
          showButtons: ["close"],
          onNextClick: () => {
            // The next step lives on another page: save where to resume
            // and let the click's navigation happen naturally.
            isNavigating = true;
            localStorage.setItem(TOUR_KEY, "2");
            driverObj.destroy();
          },
        },
      },
      // These steps target elements on the settings page. waitForElement
      // absorbs the rendering delay after a client-side route change.
      {
        element: "#profile-form",
        waitForElement: 5000,
        popover: { title: "Your Profile", description: "Update your details here." },
      },
      {
        element: "#save-settings",
        popover: { title: "Save", description: "Don't forget to save your changes." },
      },
    ],
    onDestroyed: () => {
      // Finished or exited: clear the saved progress so the tour does not
      // come back on the next visit. Skipped for the hand-off destroy above.
      if (!isNavigating) {
        localStorage.removeItem(TOUR_KEY);
      }
    },
  });

  return driverObj;
}
```

Resuming on the next page: on every page load (or in the router's mount hook), check for saved progress and resume from it.

```js
const savedStep = localStorage.getItem(TOUR_KEY);
if (savedStep !== null) {
  createTour().drive(Number(savedStep));
}
```

`drive()` accepts the step index to start from, so the tour picks up exactly where it left off.

## Notes

- For truly click-driven steps, make the step an action step (`popover.instruction`, since 1.12.0) or hide the next button with `showButtons: ['close']` on the step's popover so the highlighted element is the only way forward.
- `advanceOn` (since 1.11.0) replaces `advanceOnClick`, which is deprecated but still works. The Async Steps and Multi-Page Tours sections below are kept from the 1.10.1 page; in 1.14.0 they moved to separate recipe pages (Wait for a Save, Multi-Page Tours). The Multi-Page snippet uses `advanceOn: "click"` as the 1.14.0 recipe does (the 1.10.1 text had `advanceOnClick: true`).
- `advanceOn` has no effect on steps where `disableActiveInteraction` blocks clicks on the element (1.12.0+ prints a console warning for this).
- Optional Steps and Elements That Re-render are shown on the official page as live samples; the code above is the code shown beside them.
- By overriding `onNextClick` and `onPrevClick`, you control navigation: users can't navigate with the buttons, and you must call `driverObj.moveNext()` or `driverObj.movePrevious()` yourself. Both hooks can be configured at driver level (all steps) or step level (that step only).
- Multi-page pattern works the same for full page loads and client-side routing. On a full load the browser tears everything down anyway; the explicit `destroy()` in the hand-off matters for single-page apps, where the old page's tour would otherwise stay on screen.
- The saved value above is a hardcoded index for clarity. In a larger tour, compute it with `driverObj.getActiveIndex() + 1`, or store a step id and look up its index when resuming, so reordering steps doesn't break saved progress.
- If the destination page renders asynchronously, put `waitForElement` on the first resumed step so the tour doesn't fall back to the centered popover while the page hydrates.
- The upstream 1.10.1 Async Steps example was missing the comma after the first step's `description`; it was added here so the snippet is valid JavaScript.
- Source: https://driverjs.com/docs/interactive-tours (driver.js 1.14.0 docs source, apps/docs/src/content/guides/interactive-tours.mdx at tag 1.14.0).

## Related

- [Async Tour & Lifecycle Control](./async-and-lifecycle.md)
- [Tours](./tours.md)
- [Action-Driven Tours](./action-driven-tours.md)
- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
