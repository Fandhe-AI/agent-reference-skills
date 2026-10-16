# Interactive Tours

Build tours that react to the app: advance when users click the highlighted element, wait for elements that render on demand, run async logic between steps, and continue across pages.

## Signature / Usage

`advanceOnClick` advances the tour when the highlighted element is clicked, exactly as if the next button was pressed. The element's own click behavior still runs. `waitForElement` makes a step wait up to the given number of milliseconds for its element to appear, staying on the current step with its popover hidden in the meantime. Both can be set for the whole tour or per step.

### Advance on Click

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  advanceOnClick: true,
  showProgress: true,
  steps: [
    { element: '#pick-plan', popover: { title: 'Pick a Plan', description: 'Click the highlighted card to continue.' } },
    { element: '#billing-toggle', popover: { title: 'Billing', description: 'Clicking advances the tour; the toggle still flips.' } },
    { element: '#checkout-btn', popover: { title: 'Checkout', description: 'Clicking the last element ends the tour.' } },
  ],
});

driverObj.drive();
```

On the last step, clicking the highlighted element ends the tour, like the done button.

### Wait for Elements

Give the next step a `waitForElement` timeout and the tour waits for the element instead of falling back.

```js
const driverObj = driver({
  steps: [
    {
      element: '#open-modal-btn',
      advanceOnClick: true,
      popover: {
        title: 'Open the Modal',
        description: 'Clicking this button opens the modal and moves the tour on.',
        showButtons: ['close'],
      },
    },
    {
      // Rendered on demand: the tour waits up to 5 seconds for it,
      // staying on the previous step in the meantime.
      element: '#modal-confirm',
      waitForElement: 5000,
      popover: {
        title: 'Confirm',
        description: 'This step appeared once the modal rendered.',
      },
    },
  ],
});

driverObj.drive();
```

If the element never appears, the wait times out into the usual missing-element behavior: the centered fallback popover, or a skip when `skipMissingElement` is set.

### Async Steps

When a step needs to load data or render something before the tour can move on, and `waitForElement` isn't enough, override `onNextClick`, do the work, then call `moveNext()`.

```js
const driverObj = driver({
  showProgress: true,
  steps: [
    {
      popover: {
        title: 'First Step',
        description: 'This is the first step. Next element will be loaded dynamically.'
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

Saving progress before navigating: define the tour in a function so every page can create it. On the step whose click navigates away, use `advanceOnClick` together with an `onNextClick` override that saves where to resume and destroys the tour. The link's own click keeps working.

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
        advanceOnClick: true,
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

- For truly click-driven steps, hide the next button with `showButtons: ['close']` on the step's popover so the highlighted element is the only way forward.
- `advanceOnClick` has no effect on steps where `disableActiveInteraction` blocks clicks on the element.
- By overriding `onNextClick` and `onPrevClick`, you control navigation: users can't navigate with the buttons, and you must call `driverObj.moveNext()` or `driverObj.movePrevious()` yourself. Both hooks can be configured at driver level (all steps) or step level (that step only).
- Multi-page pattern works the same for full page loads and client-side routing. On a full load the browser tears everything down anyway; the explicit `destroy()` in the hand-off matters for single-page apps, where the old page's tour would otherwise stay on screen.
- The saved value above is a hardcoded index for clarity. In a larger tour, compute it with `driverObj.getActiveIndex() + 1`, or store a step id and look up its index when resuming, so reordering steps doesn't break saved progress.
- If the destination page renders asynchronously, put `waitForElement` on the first resumed step so the tour doesn't fall back to the centered popover while the page hydrates.

## Related

- [Async Tour & Lifecycle Control](./async-and-lifecycle.md)
- [Tours](./tours.md)
- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
