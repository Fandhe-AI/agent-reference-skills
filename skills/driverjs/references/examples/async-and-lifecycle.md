# Async Tour & Lifecycle Control

Patterns for controlling tour flow with async operations, exit confirmation, and forced completion.

## Async Tour

When a step needs to load data or render something before the tour can move on, and `waitForElement` isn't enough, take over navigation yourself. Override `onNextClick` to perform async operations before advancing. When overriding navigation hooks, you must manually call `moveNext()` or `movePrevious()`.

```javascript
const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#element1',
      popover: { title: 'Step 1', description: 'First step' },
      onNextClick: async () => {
        // Fetch data or perform async operations
        const data = await fetchData();
        // Dynamically add element to DOM
        document.body.appendChild(createDynamicElement(data));
        driverObj.moveNext();
      }
    },
    {
      element: '#dynamic-element',
      popover: { title: 'Dynamic Step', description: 'This element was added dynamically' },
      onDeselected: () => {
        // Clean up dynamic element when leaving step
        document.getElementById('dynamic-element')?.remove();
      }
    },
    { element: '#element3', popover: { title: 'Final Step', description: 'Done' }}
  ]
});

driverObj.drive();
```

Hooks can be set at driver level (all steps) or step level (individual step only).

## Confirm on Exit

Use this when leaving halfway would lose something, like a setup the user has to finish. `onDestroyStarted` runs when the tour is about to end. Once you set it, the tour only ends when you call `destroy()`. The example only asks when the user leaves early.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    { element: "#search", popover: { title: "Search" } },
    { element: "#export", popover: { title: "Export" } },
  ],
  onDestroyStarted: (element, step, { reason }) => {
    if (reason === "done" || confirm("Are you sure?")) {
      driverObj.destroy();
    }
  },
});

driverObj.drive();
```

`reason` tells a finished tour (`"done"`) apart from one the user is leaving. Use your own modal instead of `confirm()` the same way: call `destroy()` when the user agrees.

## Prevent Tour Exit

`allowClose: false` removes the close button and turns off Escape and overlay clicks, so the only way out is to finish the tour.

```js
const driverObj = driver({
  allowClose: false,
  showProgress: true,
  steps: [
    { element: "#search", popover: { title: "Search" } },
    { element: "#export", popover: { title: "Export" } },
  ],
});

driverObj.drive();
```

To keep the close button and only ignore clicks on the overlay, use `overlayClickBehavior: "none"` instead.

## Finished or Closed

`onDestroyStarted` and `onDestroyed` receive `reason` in their options, telling you why the tour ended:

- `"done"`: the user moved past the last step
- `"close"`, `"escape"` or `"overlay"`: the user left early with the close button, the Escape key or a click on the overlay
- `"replaced"`: another tour or highlight started
- `"api"`: your own code called `destroy()`

Use it to mark onboarding as complete only when the user actually finished it, or to log the step where users drop off.

```javascript
const driverObj = driver({
  steps: [
    // ...
  ],
  onDestroyed: (element, step, { reason, index }) => {
    if (reason === "done") {
      markOnboardingComplete();
    } else {
      trackDropOff({ reason, step: index });
    }
  },
});

driverObj.drive();
```

A `destroy()` you call from a hook keeps the reason of the user action that started it. In the Confirm on Exit example above, `onDestroyed` gets `"close"`, not `"api"`.

## Notes

- The popover is hidden while `waitForElement` waits for the next step's element (1.9.0)
- `onNextClick` / `onPrevClick` at step level override only that step; at driver level they override all steps
- When overriding `onDestroyStarted`, the tour will not close unless you call `destroy()` explicitly
- `allowClose: false` disables closing via backdrop click, Escape and the close button
- `advance()`, `advanceDelay` and `popover.instruction` are available since 1.12.0; `updatePopover()` since 1.11.0.
- In 1.14.0 these patterns live on the Confirm Before Closing and Wait for a Save recipe pages; the Async Tour section above is kept from the 1.10.1 page.
- Adapted: the `saveProfile` example checks `response.ok` before firing the event, and the `onNextClick` example restores the Next button when `loadReport()` rejects; the official examples do neither.
- Source: https://driverjs.com/docs/confirm-before-closing and https://driverjs.com/docs/wait-for-a-save (driver.js 1.14.0 docs source, apps/docs/src/content/guides/confirm-before-closing.mdx and wait-for-a-save.mdx at tag 1.14.0).

### When Next Does the Work

To load something before the next step, take over the Next button with `onNextClick` and call `moveNext()` when you're ready. `updatePopover()` shows that it's loading in the meantime. `onNextClick` replaces the button's default action, so the tour only moves when you call `moveNext()`. `onPrevClick` works the same way for going back.

Adapted (not in the official docs): wraps `loadReport()` in `try`/`catch` and restores the Next button on failure, and ignores the result when the step was left or a newer load started while `loadReport()` was pending (a `loadRun` counter is bumped in `onDeselected` and on each Next click).

```js
let loadRun = 0;

const driverObj = driver({
  steps: [
    {
      element: "#reports",
      onDeselected: () => {
        loadRun++;
      },
      popover: {
        title: "Your weekly report",
        description: "Next loads the report first.",
        onNextClick: async () => {
          driverObj.updatePopover({
            nextBtnText: "Loading…",
            disableButtons: ["next"],
          });
          const run = ++loadRun;
          try {
            await loadReport();
          } catch (error) {
            // Ignore a result from an earlier load or from a step that was left.
            if (run !== loadRun) {
              return;
            }
            // Restore the button so the user can retry or close the tour.
            driverObj.updatePopover({
              nextBtnText: "Next",
              disableButtons: [],
            });
            return;
          }
          if (run !== loadRun) {
            return;
          }
          driverObj.moveNext();
        },
      },
    },
    {
      element: "#report",
      popover: { title: "Here it is" },
      onDeselected: () => unloadReport(),
    },
  ],
});
```

To keep a step open until your app finishes a save or request, call `driverObj.advance()` from the app's event. `onHighlighted` gets a `signal` that aborts when the step is left, so the listener removes itself. With `advanceDelay`, the instruction turns green for the pause first.

```js
const driverObj = driver({
  showButtons: ["next", "close"],
  steps: [
    {
      element: "#save",
      advanceDelay: 600,
      onHighlighted: (element, step, { signal, driver }) => {
        window.addEventListener(
          "profile-saved",
          () => driver.advance(),
          { signal }
        );
      },
      popover: {
        title: "Save your profile",
        instruction: "Click <b>Save</b>.",
      },
    },
    {
      element: "#saved",
      popover: { title: "Saved", showButtons: ["next"] },
    },
  ],
});

driverObj.drive();
```

Your app fires the event when the request comes back:

Adapted (not in the official docs): checks `response.ok` so the event only fires when the save succeeded, since `fetch` resolves on HTTP 4xx/5xx.

```javascript
async function saveProfile(profile) {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    // Keep the step open and let the user retry.
    return;
  }
  window.dispatchEvent(new Event("profile-saved"));
}
```

## Related

- [Configuration — Hooks](../api/configuration.md)
- [Methods](../api/methods.md)
