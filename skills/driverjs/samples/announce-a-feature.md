# Announce a Feature

Point out a new feature once with a highlight, or leave a hint beacon on it that stays dismissed.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const SEEN_KEY = "seen-pdf-export";

if (!localStorage.getItem(SEEN_KEY)) {
  const driverObj = driver({
    onDestroyed: () => localStorage.setItem(SEEN_KEY, "1"),
  });

  driverObj.highlight({
    element: "#export-pdf",
    popover: {
      title: "New: export to PDF",
      description: "Download any report as a PDF.",
      showButtons: ["close"],
    },
  });
}
```

```javascript
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const KEY = "dismissed-hints";
const dismissed = JSON.parse(localStorage.getItem(KEY) ?? "[]");

const newFeatures = [
  {
    id: "export-pdf",
    element: "#export-pdf",
    popover: {
      title: "New: export to PDF",
      description: "Download any report as a PDF.",
    },
  },
];

const productHints = hints({
  hints: newFeatures.filter(h => !dismissed.includes(h.id)),
  onDismiss: (element, hint) => {
    dismissed.push(hint.id);
    localStorage.setItem(KEY, JSON.stringify(dismissed));
  },
});

productHints.show();
```

## Notes

- First snippet: the page is dimmed until the user closes the popover; the highlighted button still works. Second snippet: a hint does not interrupt, the beacon pulses until the user clicks _Got it_, and `onDismiss` keeps it dismissed
- Hints (`driver.js/hints`, `dist/hints.css`) need 1.8.0+
- Add the next feature to `newFeatures` with its own `id`, and only users who have not seen it get a beacon
- Source: https://driverjs.com/docs/announce-a-feature (driver.js 1.14.0 docs source, apps/docs/src/content/guides/announce-a-feature.mdx at tag 1.14.0).

## Related

- [Examples](../references/examples/README.md)
- [Configuration](../references/api/configuration.md)
