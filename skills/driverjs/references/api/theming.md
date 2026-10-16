# Theming

Driver.js can be styled using plain CSS. All popover and overlay elements use stable CSS class names that can be targeted directly or scoped via the `popoverClass` option.

## Signature / Usage

```javascript
const driverObj = driver({ popoverClass: 'my-theme', steps: [/* ... */] });
```

```css
.my-theme .driver-popover-title { color: #1a73e8; }
```

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
| `.driver-popover-side-{top,right,bottom,left}` | Rendered side of the popover. Reflects the actual position after Driver.js flips the popover to fit the viewport, so it may differ from the configured `side` (1.6.0) |
| `.driver-popover-align-{start,center,end}` | Rendered alignment of the popover, same flipping caveat (1.6.0) |
| `.driver-popover-footer-btn` | Shared style for footer buttons. Built-in prev/next carry it; add it to custom buttons created in `onPopoverRender` for the default look (1.6.0) |
| `.driver-popover-next-btn.driver-popover-done-btn` | The next button on the last step, when it acts as the "Done" button (1.5.0) |
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

## Custom Font

The popover text uses the following font stack by default:

```css
"Helvetica Neue", Inter, ui-sans-serif, "Apple Color Emoji", Helvetica, Arial, sans-serif;
```

To use your own font, override the `--driver-popover-font-family` CSS variable (1.7.0). It's inherited, so you can set it anywhere above the popover (on `:root`, `body`, or a `popoverClass`) and it applies to the title, description, buttons, and progress text at once. Checklists read the same variable.

```css
:root {
  --driver-popover-font-family: "Inter", sans-serif;
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

## Styling Hints

Hint popovers are regular Driver.js popovers, so everything above applies to them unchanged. The beacons read two CSS variables, settable globally or scoped to a class you pass through a hint's `beacon.className`:

```css
.driver-hint {
  --driver-hint-size: 32px;
  --driver-hint-color: #e11d48;
}
```

See the hints category: [Hints](../hints/README.md).

## Styling Checklists

The checklist widget has its own stylesheet and classes. Set `--driver-checklist-color` to recolor the progress bar, the ticks and the focus rings, or pass `className` to the checklist and style its parts:

```js
checklist({
  id: "onboarding",
  className: "my-checklist",
  items,
});
```

```css
/* Accent color, globally or scoped to your class */
.my-checklist {
  --driver-checklist-color: #16a34a;
}
```

See the checklists category: [Checklists](../checklists/README.md).

## Notes

- Breaking (1.6.0): popover footer buttons are styled through the `driver-popover-footer-btn` class instead of the `.driver-popover-footer button` selector. Buttons added via `onPopoverRender` no longer inherit the default style; add the `driver-popover-footer-btn` class to opt in, or leave it off to apply your own styles.
- The close button darkens only on `:focus-visible` (1.10.0), so it no longer opens dark after a tour is started with a mouse click.
- For practical styling examples with full CSS snippets, see [Styling Examples](../examples/styling.md)
- Always import `driver.js/dist/driver.css` as the base stylesheet before applying custom themes
- The `popoverClass` approach is preferred for simple styling; `onPopoverRender` is for DOM-level customization
- Step-level `popoverClass` overrides the driver-level value (it does not merge)

## Related

- [Configuration](./configuration.md)
- [Methods](./methods.md)
