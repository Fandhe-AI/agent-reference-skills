# Finished or Closed

Tell a finished tour apart from one that was closed early using the `reason` passed to `onDestroyed`.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'First step.' } },
    { popover: { title: 'Last Step', description: 'Press done to finish, or close it now.' } },
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

## Notes

- `reason` (1.10.0+) is `"done"`, `"close"`, `"escape"`, `"overlay"`, `"replaced"` or `"api"`; `index` is the step the user was on
- `"replaced"` means another tour or highlight started; `"api"` means your own code called `destroy()`
- A `destroy()` called from a hook keeps the original user-action reason
- `onDestroyStarted` receives the same `reason`, so it can also gate the exit (see confirm-on-exit)
