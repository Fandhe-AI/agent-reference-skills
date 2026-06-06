# Theming

Driver.js can be styled using plain CSS. All popover and overlay elements use stable CSS class names that can be targeted directly or scoped via the `popoverClass` option.

## CSS Classes

| Class | Description |
|-------|-------------|
| `.driver-popover` | Main popover wrapper |
| `.driver-popover-arrow` | Arrow element pointing to the highlighted element |
| `.driver-popover-title` | Title text |
| `.driver-popover-description` | Description text |
| `.driver-popover-close-btn` | Close button |
| `.driver-popover-footer` | Footer area containing buttons and progress |
| `.driver-popover-progress-text` | Progress text (e.g., "1 of 5") |
| `.driver-popover-prev-btn` | Previous button |
| `.driver-popover-next-btn` | Next button |
| `.driver-active` | Added to `<body>` when driver is active |
| `.driver-fade` | Added to `<body>` when animated mode is active |
| `.driver-simple` | Added to `<body>` when non-animated mode is active |
| `.driver-overlay` | Overlay element covering the page |
| `.driver-active-element` | Added to the currently highlighted element |

## Using popoverClass

Apply a custom CSS class to scope styles to specific driver instances or steps:

```javascript
// Driver-level — applies to all steps
const driverObj = driver({
  popoverClass: 'my-theme',
  steps: [/* ... */],
});

// Step-level — applies to a single step
const driverObj = driver({
  steps: [
    {
      element: '#step1',
      popover: {
        title: 'Styled Step',
        description: 'This step has a custom theme.',
        popoverClass: 'step-theme',
      },
    },
  ],
});
```

```css
.my-theme .driver-popover-title {
  color: #1a73e8;
}

.my-theme .driver-popover-description {
  font-size: 14px;
}
```

## Using onPopoverRender

For advanced customization, use the `onPopoverRender` callback to directly manipulate the popover DOM after rendering. The callback receives a `PopoverDOM` object:

| Property | Description |
|----------|-------------|
| `wrapper` | The popover wrapper element |
| `arrow` | The arrow element |
| `title` | The title element |
| `description` | The description element |
| `footer` | The footer element |
| `progress` | The progress text element |
| `previousButton` | The previous button element |
| `nextButton` | The next button element |
| `closeButton` | The close button element |
| `footerButtons` | The container wrapping the navigation buttons |

```javascript
const driverObj = driver({
  onPopoverRender: (popover, { config, state, driver }) => {
    // Add a custom button to the footer
    const customBtn = document.createElement('button');
    customBtn.innerText = 'Skip Tour';
    customBtn.addEventListener('click', () => driver.destroy());
    popover.footerButtons.appendChild(customBtn);
  },
});
```

## Notes

- For practical styling examples with full CSS snippets, see [Styling Examples](../examples/styling.md)
- Always import `driver.js/dist/driver.css` as the base stylesheet before applying custom themes
- The `popoverClass` approach is preferred for simple styling; `onPopoverRender` is for DOM-level customization
- Step-level `popoverClass` overrides the driver-level value (it does not merge)

## Related

- [Configuration](./configuration.md)
- [Methods](./methods.md)
