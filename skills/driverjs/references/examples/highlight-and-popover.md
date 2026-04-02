# Highlight & Popover

Popover positioning, button customization, and single-element highlight patterns.

## Popover Position

Control placement with `side` and `align` options:

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

The popover automatically repositions to fit within the viewport if the specified position doesn't fit.

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

### Custom Buttons via onPopoverRender

```javascript
const driverObj = driver({
  onPopoverRender: (popover, { config, state }) => {
    const btn = document.createElement("button");
    btn.innerText = "Custom Action";
    popover.footerButtons.appendChild(btn);
    btn.addEventListener("click", () => { /* ... */ });
  },
  steps: [/* ... */]
});
```

When using `highlight()` for a single element, only the close button is shown by default.

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
