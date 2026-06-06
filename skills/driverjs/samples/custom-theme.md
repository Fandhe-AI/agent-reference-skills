# Custom Theme

Apply a custom visual theme to popovers using `popoverClass` and CSS targeting Driver.js class names.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  popoverClass: 'my-theme',
  steps: [
    { element: '#step1', popover: { title: 'Styled Step', description: 'This popover uses a custom theme.' } },
    { element: '#step2', popover: { title: 'Per-Step Override', description: 'Different theme just for this step.', popoverClass: 'alt-theme' } },
  ],
});

driverObj.drive();
```

```css
/* Base theme applied to all steps via popoverClass: 'my-theme' */
.driver-popover.my-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.my-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.my-theme button {
  background-color: #000;
  color: #fde047;
  border-radius: 4px;
  padding: 5px 10px;
}

/* Alternate theme for a single step */
.driver-popover.alt-theme {
  background-color: #1a73e8;
  color: #fff;
}
```

## Notes

- Always import `driver.js/dist/driver.css` as the base stylesheet before adding custom CSS
- Step-level `popoverClass` replaces (does not merge with) the driver-level value
- Use `overlayColor` and `overlayOpacity` to style the backdrop overlay
- The `.driver-active` class is added to `<body>` while the driver is running — useful for page-level overrides
