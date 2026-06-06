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

.driver-popover.my-theme button {
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

## Overlay Styling

Customize the overlay with `overlayColor` and `overlayOpacity`:

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
| overlayOpacity | number | 0.7 | Opacity of the overlay (0-1) |

These options apply to both `highlight()` and tour steps.

## Related

- [Theming](../api/theming.md)
- [Configuration](../api/configuration.md)
