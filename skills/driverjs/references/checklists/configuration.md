# Checklist Configuration

Options for the `checklist()` factory from the `driver.js/checklist` entry, and the shape of each item.

## Signature / Usage

```typescript
type ChecklistConfig = {
  // Identifies the checklist in events.
  id: string;

  // Array of items. See the Checklist Item
  // Configuration section below for the format.
  items: ChecklistItem[];

  // Text in the panel header, below the title, and on the
  // launcher button. (defaults: "Get started", none, the title)
  title?: string;
  description?: string;
  launcherText?: string;

  // Shown instead of the title, description and launcher
  // text once every item is done, and swapped back if an
  // item is unticked. An empty completeDescription hides
  // the description.
  completeTitle?: string;
  completeDescription?: string;
  completeLauncherText?: string;

  // Progress text next to the bar; {{done}}, {{total}},
  // {{remaining}} and {{percent}} are replaced.
  // (default: "{{done}} of {{total}}")
  progressText?: string;

  // The count on the launcher, with the same placeholders.
  // An empty string hides it. (default: "{{done}}/{{total}}")
  launcherProgressText?: string;

  // false hides the floating launcher, for pages that open the panel
  // from their own button with open() or toggle(). (default: true)
  launcher?: boolean;

  // Corner of the screen. In the top corners the panel
  // opens below the launcher. (default: "bottom-right")
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";

  // Distance in pixels from the screen edges.
  // (default: 20, or 12 on screens narrower than 480px)
  offset?: { x?: number; y?: number };

  // Extra class on the widget.
  className?: string;

  // Turns the check circle into a button, so users can tick
  // items off, or untick them, themselves. (default: false)
  allowManualComplete?: boolean;

  // Ids of the items that are already done, for progress
  // you saved earlier.
  completed?: string[];

  // Called on every change with the ids of the done items
  // (including ids no longer in `items`) and the count.
  onProgress?: (progress: { completed: string[]; done: number; total: number }) => void;

  // Called when an item is ticked, and once when every
  // item is done.
  onItemComplete?: (item: ChecklistItem, options: { checklist: Checklist }) => void;
  onComplete?: (options: { checklist: Checklist }) => void;

  // Called with every checklist event: shown, hidden, opened,
  // closed, item_started, item_completed, item_uncompleted,
  // tour_ended, completed and reset. tour_ended carries the
  // tour's destroy reason.
  onEvent?: (event: {
    kind: "checklist";
    id: string;
    type: string;
    itemId?: string;
    reason?: DestroyReason;
    timestamp: number;
  }) => void;
};
```

## Options / Props

Checklist item (`ChecklistItem`):

| Name | Type | Description |
|------|------|-------------|
| id | string | Stable identity, used for progress. Keep it the same when you reword or reorder items. |
| title | string | HTML is allowed, like in popovers. |
| description | string | Optional. |
| tour | DriveStep[] \| Config \| Driver | A tour to run: steps, a driver configuration or a `driver()` instance. Ticked when the user finishes the tour, not when they close it early. |
| href | string | A link to follow. Ticked on click. |
| action | (item, { checklist }) => void | Your own code to run. Ticked afterwards. |
| completeWhen | () => boolean | Ticks the item once it returns true. Checked on `show()`, `refresh()` and after the item's tour or action; replaces the default ticking. |
| allowManualComplete | boolean | Overrides the checklist's `allowManualComplete` for this item. |
| data | Record<string, any> | Your own data, available on the item in hooks. |

```typescript
type ChecklistItem = {
  id: string;
  title: string;
  description?: string;
  tour?: DriveStep[] | Config | Driver;
  href?: string;
  action?: (item: ChecklistItem, options: { checklist: Checklist }) => void;
  completeWhen?: () => boolean;
  allowManualComplete?: boolean;
  data?: Record<string, any>;
};
```

## Notes

- Source: https://driverjs.com/docs/configuration#checklist-configuration (driver.js 1.10.1 docs source, `apps/docs/src/content/guides/configuration.mdx`).
- `id` and `items` are required on the checklist; `id` and `title` are required on each item.
- The two type blocks are condensed (comments trimmed) for `ChecklistItem`; the full commented form is in the source above.

## Related

- [Checklists](./overview.md)
- [Checklist Methods](./methods.md)
- [Customizing Checklists](./customizing.md)
