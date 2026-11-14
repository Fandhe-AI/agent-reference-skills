# Right-Click and Double-Click Steps

Teach a feature hidden behind a gesture, like a context menu or double-click to open, and accept only that gesture.

```javascript
const driverObj = driver({
  showButtons: ["close"],
  onElementMissing: "previousAction",
  steps: [
    {
      element: "#file",
      advanceOn: { event: "contextmenu", strict: true },
      allowedElements: ".file-menu",
      popover: {
        title: "Copy the file",
        instruction: "Right-click <b>report.pdf</b>.",
      },
    },
    {
      element: ".file-menu [data-action=duplicate]",
      waitForElement: 500,
      advanceOn: "click",
      allowedElements: ".file-menu",
      popover: {
        title: "Duplicate it",
        instruction: "Choose <b>Duplicate</b>.",
      },
    },
    {
      element: "#file-copy",
      waitForElement: 1000,
      advanceOn: { event: "dblclick", strict: true },
      popover: {
        title: "Open the copy",
        instruction: "Double-click <b>report copy.pdf</b>.",
      },
    },
  ],
});

driverObj.drive();
```

## Notes

- Needs 1.12.0+: `advanceOn: { event, strict: true }`, `popover.instruction` and the `onElementMissing` presets are all since 1.12.0 (`advanceOn` itself and `allowedElements` since 1.11.0)
- With `strict: true` the step takes only that gesture: a plain click on the file is blocked and shakes the popover
- Your app's own `contextmenu` and `dblclick` handlers run as usual; the step completes after them
- `strict` blocks the other clicks on the element only. Clicks in `allowedElements`, like the menu, still work
- iOS Safari never fires `contextmenu`. On touch devices, accept another event too, like `["contextmenu", "dblclick"]`, or offer a button that opens the same menu
- Source: https://driverjs.com/docs/right-click-and-double-click (driver.js 1.14.0 docs source, apps/docs/src/content/guides/right-click-and-double-click.mdx at tag 1.14.0).
