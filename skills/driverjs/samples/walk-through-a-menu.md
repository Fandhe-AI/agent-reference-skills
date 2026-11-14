# Walk Through a Menu

Guide users through a tour that opens a dropdown and picks an item, keeps the menu usable, and goes back a step when the menu closes.

```javascript
const driverObj = driver({
  showButtons: ["next", "close"],
  onElementMissing: "previousAction",
  steps: [
    {
      element: "#account",
      advanceOn: "click",
      allowedElements: ".account-menu",
      popover: {
        title: "Your account",
        instruction: "Click <b>Account</b>.",
      },
    },
    {
      element: ".account-menu [data-item=settings]",
      waitForElement: 500,
      advanceOn: "click",
      allowedElements: [".account-menu", "#account"],
      popover: {
        title: "Open settings",
        instruction: "Choose <b>Settings</b>.",
      },
    },
    {
      element: "#settings-title",
      waitForElement: 1000,
      popover: { title: "Settings", showButtons: ["next"] },
    },
  ],
});

driverObj.drive();
```

## Notes

- Needs 1.12.0+ for `onElementMissing: "previousAction"` and `popover.instruction`; `advanceOn`, `allowedElements` and `onElementMissing` (function form) arrived in 1.11.0, `waitForElement` in 1.8.0
- `allowedElements` lets clicks reach the menu, which sits outside the highlighted element; everything else on the page stays blocked
- The open menu sits above the overlay so it stays usable, and the item to pick gets a ring instead of a cutout (since 1.12.0); restyle it with the raised highlight CSS variables (see Theming)
- `waitForElement` covers the time the menu takes to open
- When the highlighted item leaves the page, because the user picked another item or pressed Escape, `"previousAction"` goes back to the step that opens the menu
- To block one item with a message, like Delete, see "Let the User Use a Menu" in the Action-Driven Tours guide
- Source: https://driverjs.com/docs/walk-through-a-menu (driver.js 1.14.0 docs source, apps/docs/src/content/guides/walk-through-a-menu.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
