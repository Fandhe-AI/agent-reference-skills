# Match Your Brand

Make tours look like part of your product with a popover class, CSS variables and an overlay colour.

```javascript
const driverObj = driver({
  popoverClass: "brand-theme",
  overlayColor: "#1e1b4b",
  steps: [
    // ...
  ],
});

driverObj.drive();
```

```css
.driver-popover.brand-theme {
  background: #4f46e5;
  color: #e0e7ff;
  border-radius: 12px;
  --driver-instruction-background: #4338ca;
  --driver-instruction-indicator-color: #fde047;
}

.brand-theme .driver-popover-title {
  color: #fff;
}

/* The arrow is a border: color the side it points from */
.brand-theme .driver-popover-arrow-side-top {
  border-top-color: #4f46e5;
}

.brand-theme .driver-popover-arrow-side-bottom {
  border-bottom-color: #4f46e5;
}

.brand-theme .driver-popover-arrow-side-left {
  border-left-color: #4f46e5;
}

.brand-theme .driver-popover-arrow-side-right {
  border-right-color: #4f46e5;
}

.brand-theme .driver-popover-footer-btn {
  background: #fff;
  color: #4338ca;
  border: 0;
  border-radius: 999px;
  text-shadow: none;
}
```

## Notes

- A class on the popover scopes the CSS, and the CSS variables cover the action-step parts; `--driver-instruction-background` and `--driver-instruction-indicator-color` style the instruction row, which only exists on steps with `popover.instruction` (since 1.12.0)
- For a dark theme, use the same rules with dark colours: `#18181b` for the popover and arrow, `#27272a` for the buttons and the instruction row, and white text
- Hints and checklists take the same approach with `--driver-hint-color` and `--driver-checklist-color`
- See also the custom-theme sample for a minimal `popoverClass` example
- Source: https://driverjs.com/docs/match-your-brand (driver.js 1.14.0 docs source, apps/docs/src/content/guides/match-your-brand.mdx at tag 1.14.0).
