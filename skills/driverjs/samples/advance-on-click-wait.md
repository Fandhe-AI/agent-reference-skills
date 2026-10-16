# Advance on Click and Wait for Element

Advance the tour by clicking the highlighted element, then wait for the next step's element that renders on demand.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

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

## Notes

- `advanceOnClick` and `waitForElement` (both 1.8.0+) can be set for the whole tour or per step
- The element's own click behavior still runs; on the last step, clicking the element ends the tour like the done button
- `showButtons: ['close']` makes the highlighted element the only way forward; `advanceOnClick` has no effect where `disableActiveInteraction` blocks clicks
- If the element never appears, the wait times out into the usual missing-element behavior: the centered fallback popover, or a skip when `skipMissingElement` is set
