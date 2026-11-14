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

```javascript
async function saveProfile(profile) {
  await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });
  window.dispatchEvent(new Event("profile-saved"));
}
```

When Next does the work, take over the Next button with `onNextClick` and call `moveNext()` when ready:

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
          await loadReport();
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
- Source: https://driverjs.com/docs/wait-for-a-save (driver.js 1.14.0 docs source, apps/docs/src/content/guides/wait-for-a-save.mdx at tag 1.14.0).
