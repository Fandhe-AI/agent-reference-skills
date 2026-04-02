# Async Tour & Lifecycle Control

Patterns for controlling tour flow with async operations, exit confirmation, and forced completion.

## Async Tour

Override `onNextClick` to perform async operations before advancing. When overriding navigation hooks, you must manually call `moveNext()` or `movePrevious()`.

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

Use `onDestroyStarted` to intercept tour exit and show a confirmation dialog.

```javascript
const driverObj = driver({
  showProgress: true,
  steps: [/* ... */],
  onDestroyStarted: () => {
    if (!driverObj.hasNextStep() || confirm("Are you sure?")) {
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

## Notes

- `onNextClick` / `onPrevClick` at step level override only that step; at driver level they override all steps
- When overriding `onDestroyStarted`, the tour will not close unless you call `destroy()` explicitly
- `allowClose: false` disables closing via backdrop click and the close button

## Related

- [Configuration — Hooks](../api/configuration.md)
- [Methods](../api/methods.md)
