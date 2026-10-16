# Highlight & Popover

Popover positioning, button customization, and single-element highlight patterns.

## Popover Position

Control placement with `side` and `align` options. The `side` option controls which side of the element the popover is shown on (`top`, `right`, `bottom`, or `left`, defaulting to `bottom`). The `align` option controls how the popover is aligned along that side: `start` lines its leading edge up with the element, `center` centers it, and `end` lines up the trailing edges (defaults to `start`).

```javascript
driverObj.highlight({
  element: '#element',
  popover: {
    title: 'Title',
    description: 'Description',
    side: 'left',
    align: 'start'
  }
});
```

| side | align | Position |
|------|-------|----------|
| left | start / center / end | Left side, top / center / bottom aligned |
| right | start / center / end | Right side, top / center / bottom aligned |
| top | start / center / end | Top side, left / center / right aligned |
| bottom | start / center / end | Bottom side, left / center / right aligned |

The popover is intelligent enough to adjust itself to fit in the viewport. If you set `side` to `left` and `align` to `start`, but the popover doesn't fit in the viewport, it automatically adjusts itself to fit.

Driver.js 1.10.1 `Side` is `top | right | bottom | left`; there is no `over` side (see the configuration page Notes).

## Popover Buttons

### Show / Hide Buttons

```javascript
const driverObj = driver({
  showButtons: ['next', 'previous', 'close'],
  disableButtons: ['previous'],
  steps: [/* ... */]
});
```

### Custom Button Text

```javascript
const driverObj = driver({
  nextBtnText: '-->',
  prevBtnText: '<--',
  doneBtnText: 'x',
  steps: [/* ... */]
});
```

### Event Handlers

Use the `onNextClick`, `onPrevClick`, `onCloseClick` and `onDoneClick` callbacks to implement custom functionality when the user clicks on the buttons. When you configure these callbacks, the default functionality of the buttons is disabled; you have to implement it yourself. `onDoneClick` runs instead of `onNextClick` on the last step, and Driver.js won't tear down the tour for you; call `driverObj.destroy()` yourself.

```javascript
const driverObj = driver({
  onNextClick: () => {
    console.log('Next Button Clicked');
    // Implement your own functionality here
    driverObj.moveNext();
  },
  onPrevClick: () => {
    console.log('Previous Button Clicked');
    driverObj.movePrevious();
  },
  onCloseClick: () => {
    console.log('Close Button Clicked');
    driverObj.destroy();
  },
  onDoneClick: () => {
    console.log('Done Button Clicked');
    // Runs on the last step instead of onNextClick
    driverObj.destroy();
  },
  steps: [/* ... */]
});
```

### Custom Buttons via onPopoverRender

Add the `driver-popover-footer-btn` class to give a custom button the default driver.js styling; leave it out to apply your own styles (1.6.0).

```javascript
const driverObj = driver({
  onPopoverRender: (popover, { config, state, driver }) => {
    const btn = document.createElement("button");
    btn.className = "driver-popover-footer-btn";
    btn.innerText = "Custom Action";
    popover.footerButtons.appendChild(btn);
    btn.addEventListener("click", () => { /* ... */ });
  },
  steps: [/* ... */]
});
```

When using `highlight()` for a single element, only the close button is shown by default. Since 1.6.0, custom buttons receive their own click events; only the built-in next, previous and close buttons have their default action intercepted by the library.

## Simple Highlight

Use `highlight()` for single-element highlighting without a full tour:

```javascript
const driverObj = driver({
  popoverClass: 'my-theme',
  stagePadding: 4,
});

driverObj.highlight({
  element: '#highlight-me',
  popover: {
    side: 'bottom',
    title: 'Feature Name',
    description: 'This is an important feature.'
  }
});
```

Since 1.6.0, the close button on a single `highlight()` popover closes the popover, respecting `allowClose` and any custom `onCloseClick`.

### Modal Without Element

Omit `element` to show a centered modal popover:

```javascript
driverObj.highlight({
  popover: {
    title: 'Welcome',
    description: '<img src="welcome.png" /><p>Welcome to our app!</p>'
  }
});
```

### Form Field Contextual Help

Attach highlights to focus events for contextual form assistance:

```javascript
const driverObj = driver({
  stagePadding: 0,
  onDestroyed: () => { document?.activeElement?.blur(); }
});

document.getElementById('name').addEventListener('focus', () => {
  driverObj.highlight({
    element: '#name',
    popover: { title: 'Name', description: 'Enter your full name' }
  });
});
```

## Related

- [Configuration](../api/configuration.md)
- [Theming](../api/theming.md)
