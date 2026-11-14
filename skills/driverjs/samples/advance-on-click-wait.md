# Advance on Click and Wait for Element

Advance the tour by clicking the highlighted element, then wait for the next step's element that renders on demand.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    {
      element: '#open-modal-btn',
      advanceOn: 'click',
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

- `advanceOn: "click"` (since 1.11.0) and `waitForElement` (since 1.8.0) can be set for the whole tour or per step; `advanceOn` also takes other events such as `"change"` or `"dblclick"`
- Before 1.11.0 the option was `advanceOnClick: true`; it is deprecated since 1.11.0 but keeps working
- The element's own click behavior still runs; on the last step, clicking the element ends the tour like the done button
- `showButtons: ['close']` makes the highlighted element the only way forward; `advanceOn` has no effect where `disableActiveInteraction` blocks clicks (since 1.12.0 driver.js warns about this in the console); to drop the Next button and show an instruction row instead, see the action-step samples (`popover.instruction`, since 1.12.0)
- If the element never appears, the wait times out into the usual missing-element behavior: the centered fallback popover, or a skip when `skipMissingElement` is set

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
