# Hints Methods

Methods on the instance returned by `hints()`.

## Signature / Usage

```javascript
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const productHints = hints({
  /* ... */
});

// Mount the beacons. Calling it again picks up hints
// whose elements have appeared since.
productHints.show();
// Remove the beacons and listeners; show() brings them back
productHints.hide();

// Hints are addressed by their `id`, or by their
// index in the array when no id is set.
productHints.open("export"); // Open a hint's popover
productHints.close(); // Close the open popover, keeping its beacon
productHints.dismiss("export"); // Remove the hint's beacon and fire onDismiss
productHints.restore("export"); // Bring a dismissed hint back
productHints.restoreAll(); // Bring every dismissed hint back

productHints.setHints([
  /* ... */
]); // Replace the hints; resets dismissals
productHints.getHints(); // The configured hints
productHints.getActive(); // The hint whose popover is open, if any

productHints.isVisible(); // Whether the beacons are currently shown

// Reposition the beacons, the open popover and the
// overlay after layout changes
productHints.refresh();
```

## Options / Props

| Method | Description |
| --- | --- |
| show() | Mount the beacons; calling again picks up hints whose elements have appeared |
| hide() | Remove beacons and listeners; `show()` brings them back |
| open(id) | Open a hint's popover |
| close() | Close the open popover, keeping its beacon |
| dismiss(id) | Remove the hint's beacon and fire `onDismiss` |
| restore(id) | Bring a dismissed hint back |
| restoreAll() | Bring every dismissed hint back |
| setHints(hints) | Replace the hints; resets dismissals |
| getHints() | The configured hints |
| getActive() | The hint whose popover is open, if any |
| isVisible() | Whether the beacons are currently shown |
| refresh() | Reposition beacons, open popover and overlay after layout changes |

## Notes

- `hints()` returns its own object, independent of other `hints()` instances.
- Hints inside an open `<dialog>` render inside it (since 1.10.1).
- Source: https://driverjs.com/docs/api#hints (driver.js 1.14.0 docs source, `apps/docs/src/content/guides/api.mdx` at tag 1.14.0).

## Related

- [Feature Hints](./overview.md)
- [Hints Configuration](./configuration.md)
- [Driver methods](../api/methods.md)
