# Single Element Highlight

Draw attention to one element with a popover, without launching a full tour.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver();

driverObj.highlight({
  element: '#some-element',
  popover: {
    title: 'Important Feature',
    description: 'This is an important feature you should know about.',
    side: 'bottom',
    align: 'start',
  },
});
```

## Notes

- `highlight()` accepts the same step definition as tour steps but applies to one element only
- Only the close button is shown by default (no next/previous navigation)
- Omit `element` to show the popover as a centered modal with no backdrop cutout
- Use `stagePadding` to control the space between the element edge and the cutout border
