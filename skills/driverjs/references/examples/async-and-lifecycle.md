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

Use `onDestroyStarted` to intercept tour exit and show a confirmation dialog. The example below asks for confirmation only when the user leaves before finishing the tour.

```javascript
const driverObj = driver({
  showProgress: true,
  steps: [/* ... */],
  // onDestroyStarted is called when the user tries to exit the tour
  onDestroyStarted: (element, step, { reason }) => {
    if (reason === "done" || confirm("Are you sure?")) {
      driverObj.destroy();
    }
  },
});

driverObj.drive();
```

When overriding `onDestroyStarted`, you are responsible for calling `driverObj.destroy()` to actually exit the tour.

## Prevent Tour Exit

Set `allowClose` to `false` to prevent users from closing the tour before completing all steps.

```javascript
const driverObj = driver({
  allowClose: false,
  showProgress: true,
  steps: [/* ... */]
});

driverObj.drive();
```

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
- `allowClose: false` disables closing via backdrop click and the close button

## Related

- [Configuration — Hooks](../api/configuration.md)
- [Methods](../api/methods.md)
