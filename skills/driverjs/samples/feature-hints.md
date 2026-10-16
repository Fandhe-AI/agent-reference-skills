# Feature Hints

Show pulsing hint beacons that open a popover on click, and keep dismissals across reloads with localStorage.

```javascript
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const allHints = [
  {
    element: "#export-btn",
    id: "export",
    popover: {
      title: "Export your data",
      description: "Download this report as CSV or PDF.",
    },
  },
  {
    element: "#summary",
    id: "summary",
    beacon: { side: "left", align: "center" },
    popover: {
      title: "Auto-generated summary",
      description: "This paragraph is written for you from the quarter's numbers.",
      side: "bottom",
    },
  },
];

const dismissed = new Set(JSON.parse(localStorage.getItem("hints") ?? "[]"));

const productHints = hints({
  hints: allHints.filter(hint => !dismissed.has(hint.id)),
  onDismiss: (element, hint) => {
    dismissed.add(hint.id);
    localStorage.setItem("hints", JSON.stringify([...dismissed]));
  },
});

productHints.show();
```

## Notes

- Hints ship as their own entry (`driver.js/hints`, `dist/hints.css`); `driver.css` is needed only if you also use tours
- Closing (click the beacon again, click outside, Escape) keeps the beacon; clicking _Got it_ dismisses it and fires `onDismiss`
- Driver.js keeps dismissals in memory only; give every hint a stable `id` and store the dismissed ids yourself
- A hint whose element is missing is skipped and picked up again on the next `show()`
- `overlay: true` dims the page while a hint is open; `hide()` removes the beacons and `show()` brings them back
