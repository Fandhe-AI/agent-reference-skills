# Wait for a Save

Keep a tour on a step until your app finishes a save or a request, show a done state, then move on; or load data before the next step.

```javascript
const driverObj = driver({
  showButtons: ["next", "close"],
  steps: [
    {
      element: "#save",
      advanceDelay: 600,
      onHighlighted: (element, step, { signal, driver }) => {
        window.addEventListener(
          "profile-saved",
          () => driver.advance(),
          { signal }
        );
      },
      popover: {
        title: "Save your profile",
        instruction: "Click <b>Save</b>.",
      },
    },
    {
      element: "#saved",
      popover: { title: "Saved", showButtons: ["next"] },
    },
  ],
});

driverObj.drive();
```

Your app fires the event when the request comes back:

Adapted (not in the official docs): checks `response.ok` so the event only fires when the save succeeded, since `fetch` resolves on HTTP 4xx/5xx.

```javascript
async function saveProfile(profile) {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    // Keep the step open and let the user retry.
    return;
  }
  window.dispatchEvent(new Event("profile-saved"));
}
```

When Next does the work, take over the Next button with `onNextClick` and call `moveNext()` when ready:

Adapted (not in the official docs): wraps `loadReport()` in `try`/`catch` and restores the Next button on failure, and ignores the result when the tour was closed or moved on while `loadReport()` was pending (`getActiveIndex()` no longer matches).

```javascript
const driverObj = driver({
  steps: [
    {
      element: "#reports",
      popover: {
        title: "Your weekly report",
        description: "Next loads the report first.",
        onNextClick: async () => {
          driverObj.updatePopover({
            nextBtnText: "Loading…",
            disableButtons: ["next"],
          });
          const stepIndex = driverObj.getActiveIndex();
          try {
            await loadReport();
          } catch (error) {
            // Ignore a result that arrives after the tour was closed or moved on.
            if (driverObj.getActiveIndex() !== stepIndex) {
              return;
            }
            // Restore the button so the user can retry or close the tour.
            driverObj.updatePopover({
              nextBtnText: "Next",
              disableButtons: [],
            });
            return;
          }
          if (driverObj.getActiveIndex() !== stepIndex) {
            return;
          }
          driverObj.moveNext();
        },
      },
    },
    {
      element: "#report",
      popover: { title: "Here it is" },
      onDeselected: () => unloadReport(),
    },
  ],
});
```

## Notes

- `advance()` (since 1.12.0) completes the step as if the user did it. With `advanceDelay` (since 1.12.0), the instruction turns green for the pause first; `popover.instruction` is also since 1.12.0
- `onHighlighted` gets a `signal` (since 1.11.0) that aborts when the step is left, so the listener removes itself
- `updatePopover()` changes the popover text in place (since 1.11.0)
- `onNextClick` replaces the button's default action, so the tour only moves when you call `moveNext()`; `onPrevClick` works the same way for going back
- Adapted: the `saveProfile` example checks `response.ok` before firing the event, and the `onNextClick` example restores the Next button when `loadReport()` rejects; the official examples do neither.
- Source: https://driverjs.com/docs/wait-for-a-save (driver.js 1.14.0 docs source, apps/docs/src/content/guides/wait-for-a-save.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
