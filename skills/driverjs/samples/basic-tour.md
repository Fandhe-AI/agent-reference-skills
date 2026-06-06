# Basic Tour

Start a multi-step guided tour that walks users through page elements sequentially.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '.page-header', popover: { title: 'Header', description: 'This is the page header.' } },
    { element: '.top-nav',     popover: { title: 'Navigation', description: 'Use the nav to move between sections.' } },
    { element: '.sidebar',     popover: { title: 'Sidebar', description: 'Quick links live here.' } },
    { element: '.footer',      popover: { title: 'Footer', description: 'Find help and legal info here.' } },
  ],
});

driverObj.drive();
```

## Notes

- `drive()` starts at step 0; pass an index (`drive(2)`) to start at a specific step
- `showProgress: true` displays "1 of 4" style text inside the popover
- `title` and `description` both accept HTML strings
- Omitting `element` from a step shows the popover as a centered modal (no highlight)
