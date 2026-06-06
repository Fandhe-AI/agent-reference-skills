# Custom Popover Buttons

Add a custom button to the popover footer using the `onPopoverRender` hook.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  onPopoverRender: (popover, { config, state }) => {
    const skipBtn = document.createElement('button');
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
- Other `PopoverDOM` properties: `wrapper`, `arrow`, `title`, `description`, `footer`, `progress`, `previousButton`, `nextButton`, `closeButton`
- Built-in button labels can be customized via `nextBtnText`, `prevBtnText`, `doneBtnText` config options
- Use `showButtons` / `disableButtons` arrays to show or hide the built-in `'next'`, `'previous'`, `'close'` buttons
