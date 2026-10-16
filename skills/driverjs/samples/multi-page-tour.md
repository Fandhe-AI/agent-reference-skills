# Multi-Page Tour

Save progress before navigating away, then resume the tour on the next page with `drive(index)`.

```javascript
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

// On every page load (or in your router's mount hook)
const savedStep = localStorage.getItem(TOUR_KEY);
if (savedStep !== null) {
  createTour().drive(Number(savedStep));
}
```

## Notes

- A driver instance lives within one page, so treat the tour as resumable: persist the step, navigate, start a fresh tour from the saved step
- The explicit `destroy()` in the hand-off matters for single-page apps, where the old page's tour would otherwise stay on screen
- The saved index is hardcoded for clarity; compute it with `driverObj.getActiveIndex() + 1` or store a step id and look up its index
- Put `waitForElement` on the first resumed step so the tour does not fall back to the centered popover while the page hydrates
