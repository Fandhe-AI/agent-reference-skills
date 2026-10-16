# Styling

Customizing the appearance of popovers and overlays in Driver.js.

## Popover Styling with CSS

Apply a custom class via `popoverClass` and target Driver.js CSS classes. For the complete list of CSS class names, see [Theming](../api/theming.md).

```javascript
const driverObj = driver({
  popoverClass: 'my-theme'
});
```

Per-step styling:

```javascript
{
  element: '#element',
  popover: {
    title: 'Title',
    description: 'Description',
    popoverClass: 'step-specific-theme'
  }
}
```

Example CSS:

```css
.driver-popover.my-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.my-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.my-theme .driver-popover-description {
  font-size: 14px;
}

.driver-popover.my-theme .driver-popover-footer-btn {
  background-color: #000;
  color: #fde047;
  border-radius: 4px;
  padding: 5px 10px;
}

.driver-popover.my-theme .driver-popover-close-btn {
  color: #000;
}
```

## Popover Styling with onPopoverRender

For advanced DOM manipulation, use the `onPopoverRender` callback:

```javascript
const driverObj = driver({
  onPopoverRender: (popover, { config, state, driver }) => {
    const customButton = document.createElement("button");
    customButton.className = "driver-popover-footer-btn";
    customButton.innerText = "Go to First";
    popover.footerButtons.appendChild(customButton);
    customButton.addEventListener("click", () => {
      driver.drive(0);
    });
  },
  steps: [/* ... */]
});
```

PopoverDOM properties: `wrapper`, `arrow`, `title`, `description`, `footer`, `progress`, `previousButton`, `nextButton`, `closeButton`, `footerButtons`.

Since 1.6.0, buttons added here no longer inherit the default button style. Add the `driver-popover-footer-btn` class to opt in, or leave it off to apply your own styles.

## Overlay Styling

You can customize the overlay opacity and color using `overlayOpacity` and `overlayColor`. The same configuration applies to `highlight()` and to tour steps.

### Overlay Color

Pass any CSS color to `overlayColor`:

```javascript
const driverObj = driver({
  overlayColor: 'red',
  overlayOpacity: 0.7
});

driverObj.highlight({
  element: '#element',
  popover: {
    title: 'Custom Overlay',
    description: 'Red overlay with 70% opacity'
  }
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| overlayColor | string | 'black' | Any valid CSS color value |
| overlayOpacity | number | 0.5 | Opacity of the overlay (0-1) |

These options apply to both `highlight()` and tour steps.

## Checklist

Checklists are styled with plain CSS: an accent color for the quick win, or your own class for a full theme.

### Accent Color

Set the `--driver-checklist-color` variable to recolor the progress bar, the ticks and the focus rings while keeping the default look:

```css
:root {
  --driver-checklist-color: #16a34a;
}
```

### Custom Theme

Pass `className` to add your own class to the widget, then style its parts:

```js
checklist({
  id: "onboarding",
  className: "checklist-brutalist",
  items,
});
```

### Class Names

```css
.driver-checklist {}                  /* The widget, positioned in a corner */
.driver-checklist-bottom-right {}     /* or -bottom-left, -top-right, -top-left */
.driver-checklist-complete {}         /* Added once every item is done */

.driver-checklist-launcher {}         /* The button that opens the panel */
.driver-checklist-launcher-text {}
.driver-checklist-launcher-count {}   /* "1/4" */

.driver-checklist-panel {}
.driver-checklist-header {}
.driver-checklist-title {}
.driver-checklist-description {}
.driver-checklist-close-btn {}

.driver-checklist-progress {}
.driver-checklist-progress-bar {}
.driver-checklist-progress-fill {}
.driver-checklist-progress-text {}    /* "1 of 4" */

.driver-checklist-items {}
.driver-checklist-item {}
.driver-checklist-item-done {}        /* Added to an item once it is done */
.driver-checklist-check {}            /* The circle; a button with allowManualComplete */
.driver-checklist-item-trigger {}     /* The item's link, button or plain row */
.driver-checklist-item-title {}
.driver-checklist-item-description {}
```

The widget also sets `--driver-checklist-progress` to the progress as a percentage, for progress designs drawn in CSS. The font follows the popover's `--driver-popover-font-family` variable.

## Related

- [Theming](../api/theming.md)
- [Configuration](../api/configuration.md)
- [Checklist themes](../checklists/themes.md)
