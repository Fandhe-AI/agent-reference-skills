# Track Tour Analytics

Send an analytics event for every step viewed and for how the tour ended, to measure completion and the step where people quit.

```javascript
const driverObj = driver({
  showProgress: true,
  steps: [
    // ...
  ],
  onHighlighted: (element, step, { index }) => {
    analytics.track("tour_step_viewed", { step: index + 1 });
  },
  onDestroyed: (element, step, { reason, index }) => {
    analytics.track("tour_ended", { reason, step: index + 1 });
  },
});

driverObj.drive();
```

## Notes

- `reason` (since 1.10.0) is `"done"` (moved past the last step), `"close"` / `"escape"` / `"overlay"` (left early), `"replaced"` (another tour or highlight started) or `"api"` (your code called `destroy()`)
- A `destroy()` called from a hook keeps the reason of the user action that started it, so a confirm-on-exit hook still reports `"close"`, not `"api"`
- `index` in hook options is available since 1.7.0
- Count `tour_ended` events with `reason: "done"` for your completion rate, and the `step` of the others to see where people leave
- Source: https://driverjs.com/docs/track-tour-analytics (driver.js 1.14.0 docs source, apps/docs/src/content/guides/track-tour-analytics.mdx at tag 1.14.0).
