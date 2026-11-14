# Start From a Help Menu

Make "Take the tour" in a help menu start at the step for the screen the user is on, not at step one.

```javascript
const steps = [
  {
    element: "#tab-inbox",
    data: { screen: "inbox" },
    popover: { title: "Inbox" },
  },
  {
    element: "#tab-reports",
    data: { screen: "reports" },
    popover: { title: "Reports" },
  },
  {
    element: "#tab-settings",
    data: { screen: "settings" },
    popover: { title: "Settings" },
  },
];

const driverObj = driver({
  showProgress: true,
  steps,
  onHighlighted: (element, step) => {
    showScreen(step.data.screen);
  },
});

document
  .querySelector("#help-take-tour")
  .addEventListener("click", () => {
    const index = steps.findIndex(
      step => step.data.screen === currentScreen()
    );
    driverObj.drive(Math.max(index, 0));
  });
```

## Notes

- A step's `data` (since 1.6.0) holds anything you want to keep with it, here the screen it belongs to
- `drive(index)` starts at that step; Previous still goes back to the earlier ones
- If the tour is already running, `driverObj.moveTo(index)` jumps to a step without starting over; since 1.12.0 `moveTo()` also starts the tour when it is not running
- Source: https://driverjs.com/docs/start-from-a-help-menu (driver.js 1.14.0 docs source, apps/docs/src/content/guides/start-from-a-help-menu.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
