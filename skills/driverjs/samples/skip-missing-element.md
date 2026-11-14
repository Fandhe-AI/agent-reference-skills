# Skip Missing Element

Skip steps whose target element is not on the page instead of showing the centered fallback popover.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

driver({
  showProgress: true,
  skipMissingElement: true,
  steps: [
    {
      element: ".page-header",
      popover: { title: "Present", description: "This element exists, so it is shown." },
    },
    {
      element: "#not-on-page-1",
      popover: { title: "Skipped", description: "You should never see this. Its element is missing." },
    },
    {
      popover: {
        title: "Element-less Step",
        description: "Steps without any element are intentional and never skipped.",
      },
    },
  ],
}).drive();
```

## Notes

- Steps without an `element` are intentional centered popovers and are never skipped
- `skipMissingElement` can also be set per step; only opted-in steps are skipped, others fall back to the centered popover
- Combined with `waitForElement`, a timed-out wait skips the step instead of showing the fallback
- Skipping goes in the direction of travel, so Previous skips missing steps backwards too
- For a highlighted element that disappears mid-step, use `onElementMissing` (since 1.11.0; the `"stay"`, `"previous"` and `"previousAction"` presets since 1.12.0) and `waitForRemovedElement` (since 1.14.0); see the walk-through-a-menu sample
