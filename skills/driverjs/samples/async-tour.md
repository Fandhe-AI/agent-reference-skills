# Async Tour

Perform async operations between tour steps by overriding the next-click hook and manually advancing navigation.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#element1',
      popover: { title: 'Step 1', description: 'Click next to load the next element.' },
      onNextClick: async () => {
        const data = await fetchData();
        document.body.appendChild(createDynamicElement(data));
        driverObj.moveNext();
      },
    },
    {
      element: '#dynamic-element',
      popover: { title: 'Dynamic Step', description: 'This element was added dynamically.' },
      onDeselected: () => {
        document.getElementById('dynamic-element')?.remove();
      },
    },
    { element: '#element3', popover: { title: 'Final Step', description: 'Done!' } },
  ],
});

driverObj.drive();
```

## Notes

- Overriding `onNextClick` disables automatic navigation — you must call `driverObj.moveNext()` explicitly
- Step-level hooks override only that step; driver-level hooks apply to all steps
- `onDeselected` is the right place to clean up DOM elements added for a specific step
- `onPrevClick` follows the same pattern: override requires a manual `driverObj.movePrevious()` call
