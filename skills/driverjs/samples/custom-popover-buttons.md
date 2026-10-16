# Custom Popover Buttons

Add a custom button to the popover footer using the `onPopoverRender` hook.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  onPopoverRender: (popover, { config, state }) => {
    const skipBtn = document.createElement('button');
    skipBtn.className = 'driver-popover-footer-btn';
    skipBtn.innerText = 'Skip Tour';
    skipBtn.addEventListener('click', () => driverObj.destroy());
    popover.footerButtons.appendChild(skipBtn);
  },
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'First step.' } },
    { element: '#step2', popover: { title: 'Step 2', description: 'Second step.' } },
    { element: '#step3', popover: { title: 'Step 3', description: 'Jump back to step 1 anytime.' } },
  ],
});

driverObj.drive();
```

## Notes

- `popover.footerButtons` is the container wrapping the navigation buttons — append custom elements there
- Breaking change in 1.6.0: footer buttons are styled through the `driver-popover-footer-btn` class, so buttons added in `onPopoverRender` no longer inherit the default style. Add the class to opt in, or leave it off to apply your own styles
- Since 1.6.0, custom buttons receive their own click events; only the built-in next, previous and close buttons have their default action intercepted
- Other `PopoverDOM` properties: `wrapper`, `arrow`, `title`, `description`, `footer`, `progress`, `previousButton`, `nextButton`, `closeButton`
- Use `showButtons` / `disableButtons` arrays to show or hide the built-in `'next'`, `'previous'`, `'close'` buttons
