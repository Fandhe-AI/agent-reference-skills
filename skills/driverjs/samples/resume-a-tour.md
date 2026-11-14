# Resume a Tour

Save the step a user was on when they closed a tour, and pick up from there the next time.

```javascript
const STEP_KEY = "tour-step";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: "#overview", popover: { title: "Overview" } },
    { element: "#reports", popover: { title: "Reports" } },
    { element: "#team", popover: { title: "Team" } },
    { element: "#settings", popover: { title: "Settings" } },
  ],
  onDestroyed: (element, step, { reason, index }) => {
    if (reason === "done") {
      localStorage.removeItem(STEP_KEY);
    } else {
      localStorage.setItem(STEP_KEY, String(index));
    }
  },
});

driverObj.drive(Number(localStorage.getItem(STEP_KEY) ?? 0));
```

## Notes

- `onDestroyed` gets the `index` of the step the user was on (`index` in hook options since 1.7.0) and the `reason` the tour ended (since 1.10.0)
- A finished tour clears the saved step, so it starts from the beginning next time
- For a tour that continues on another page, see the multi-page-tour sample
- Source: https://driverjs.com/docs/resume-a-tour (driver.js 1.14.0 docs source, apps/docs/src/content/guides/resume-a-tour.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
