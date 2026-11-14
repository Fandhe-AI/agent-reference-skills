# Steps Inside a Dialog

Run tour steps inside a modal dialog: wait for it to open, dim the dialog like the page, and move back to the page when it closes.

```javascript
const driverObj = driver({
  showButtons: ["close"],
  steps: [
    {
      element: "#new-project",
      advanceOn: "click",
      popover: {
        title: "Start a project",
        instruction: "Click <b>New project</b>.",
      },
    },
    {
      element: "dialog #project-name",
      waitForElement: 1000,
      popover: {
        title: "Name it",
        showButtons: ["next", "close"],
        side: "top",
      },
    },
    {
      element: "dialog #create",
      advanceOn: "click",
      popover: {
        title: "Create it",
        instruction: "Click <b>Create</b>.",
      },
    },
    {
      element: "#created",
      waitForElement: 1000,
      popover: { title: "Created", showButtons: ["next"] },
    },
  ],
});

driverObj.drive();
```

## Notes

- The overlay and the popover render inside the dialog, including one opened with `showModal()`, so the rest of the dialog is dimmed like the page and the popover shows above it. Popovers inside an open `<dialog>` since 1.10.1; dimming the dialog and cutting out the highlighted element since 1.12.0; a popover above a dialog that opens mid-step since 1.12.1
- `waitForElement` on the first step inside covers the time the dialog takes to open
- `allowedElements` inside the dialog get their own cutout in the overlay
- When the dialog closes mid-step, the overlay and the popover move back to the page
- `advanceOn` needs 1.11.0+, `popover.instruction` 1.12.0+
- Source: https://driverjs.com/docs/steps-inside-a-dialog (driver.js 1.14.0 docs source, apps/docs/src/content/guides/steps-inside-a-dialog.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
