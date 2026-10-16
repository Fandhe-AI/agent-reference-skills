# Confirm on Exit

Intercept tour exit to show a confirmation dialog only when the user leaves before finishing the tour.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'First step.' } },
    { element: '#step2', popover: { title: 'Step 2', description: 'Second step.' } },
    { element: '#step3', popover: { title: 'Step 3', description: 'Final step.' } },
  ],
  // onDestroyStarted is called when the user tries to exit the tour
  onDestroyStarted: (element, step, { reason }) => {
    if (reason === "done" || confirm("Are you sure?")) {
      driverObj.destroy();
    }
  },
});

driverObj.drive();
```

## Notes

- Overriding `onDestroyStarted` prevents automatic exit — you must call `driverObj.destroy()` to actually close
- `reason` (since 1.10.0) is one of `"done"` (moved past the last step), `"close"` / `"escape"` / `"overlay"` (left early), `"replaced"` (another tour or highlight started), `"api"` (your code called `destroy()`)
- A `destroy()` called from a hook keeps the reason of the user action that started it (1.10.0), so `onDestroyed` receives `"close"` here, not `"api"`
- Set `allowClose: false` instead to completely prevent closing until the tour is done
