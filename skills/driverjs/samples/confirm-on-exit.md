# Confirm on Exit

Intercept tour exit to show a confirmation dialog before allowing the user to leave mid-tour.

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
  onDestroyStarted: () => {
    if (!driverObj.hasNextStep() || confirm('Are you sure you want to exit the tour?')) {
      driverObj.destroy();
    }
  },
});

driverObj.drive();
```

## Notes

- Overriding `onDestroyStarted` prevents automatic exit — you must call `driverObj.destroy()` to actually close
- `hasNextStep()` lets you skip the confirmation on the final step where exit is expected
- Set `allowClose: false` instead to completely prevent closing until the tour is done
- The hook fires when the user clicks the close button, the overlay, or presses Escape
