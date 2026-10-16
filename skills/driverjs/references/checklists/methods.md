# Checklist Methods

Methods on the object returned by `checklist()`. Items are addressed by their `id`.

## Signature / Usage

```javascript
import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css";
import "driver.js/dist/checklist.css";

const onboarding = checklist({
  /* ... */
});

// Add the launcher to the page; hide() removes the widget
onboarding.show();
onboarding.hide();

onboarding.open(); // Open the panel
onboarding.close(); // Close the panel, keeping the launcher
onboarding.toggle(); // Open or close the panel

// Items are addressed by their `id`.
onboarding.start("tour"); // Run the item's tour, link or action
onboarding.complete("github"); // Tick an item
onboarding.uncomplete("github"); // Untick an item
onboarding.reset(); // Untick every item

// Check every item's completeWhen again
onboarding.refresh();

onboarding.getProgress(); // { completed: ["tour"], done: 1, total: 4 }
onboarding.getItems(); // The configured items

onboarding.isVisible(); // Whether the widget is on the page
onboarding.isOpen(); // Whether the panel is open
```

## Options / Props

| Method | Description |
|--------|-------------|
| `show()` / `hide()` | Add the launcher to the page / remove the widget |
| `open()` / `close()` / `toggle()` | Open the panel / close it keeping the launcher / toggle |
| `start(id)` | Run the item's tour, link or action |
| `complete(id)` / `uncomplete(id)` | Tick / untick an item |
| `reset()` | Untick every item |
| `refresh()` | Check every item's `completeWhen` again |
| `getProgress()` | `{ completed, done, total }` |
| `getItems()` | The configured items |
| `isVisible()` | Whether the widget is on the page |
| `isOpen()` | Whether the panel is open |

## Notes

- Source: https://driverjs.com/docs/api#checklists (driver.js 1.10.1 docs source, `apps/docs/src/content/guides/api.mdx`).
- Tours started from a checklist run like any other tour, so starting one closes whichever tour is currently active. Items that are done can still be clicked to run their tour again.
- With `launcher: false`, open the panel from your own button with `open()` or `toggle()`.

## Related

- [Checklists](./overview.md)
- [Checklist Configuration](./configuration.md)
