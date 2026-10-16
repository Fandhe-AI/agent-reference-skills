# Checklists

A checklist is a small "Get started" widget in the corner of the app. Each item can start a tour, open a link or run your own code, and ticks itself off once done.

## Signature / Usage

Checklists ship as their own entry. Items that start tours use the tour styles, so import `driver.css` as well:

```js
import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css";
import "driver.js/dist/checklist.css";

const onboarding = checklist({
  id: "onboarding",
  title: "Get started",
  description: "Four steps to your first project.",
  items: [
    {
      id: "tour",
      title: "Take the tour",
      tour: [
        { element: "#new-project", popover: { title: "New Project", description: "..." } },
        { element: "#connect-github", popover: { title: "Connect GitHub", description: "..." } },
      ],
    },
    { id: "github", title: "Connect GitHub", completeWhen: () => user.githubConnected },
    { id: "invite", title: "Invite a teammate", action: () => openInviteModal() },
    { id: "docs", title: "Read about saving progress", href: "/docs/checklists#saving-progress" },
  ],
});

onboarding.show();
```

## Items

Every item needs an `id`. Saved progress is a list of these ids, so pick ids that stay the same when you reword, translate or reorder items. A warning is logged for missing or duplicate ids.

| Item has | On click |
|----------|----------|
| `tour` | The checklist closes and the tour starts. Ticked only when the user finishes the tour; closing early leaves it open. The checklist opens again when the tour ends either way. Accepts an array of steps, a full driver configuration, or a `driver()` instance (its own hooks keep working). |
| `href` | Rendered as a link. Ticked on click; the link navigates as usual. |
| `action` | Runs `(item, { checklist })` and the item is ticked. |
| none of these | Plain row, ticked by `completeWhen` or by calling `complete(id)`. |

### Completing items from your app

Give the item a `completeWhen` function; the checklist ticks it as soon as it returns `true`. It is checked on `show()`, after the item's tour or action, and whenever you call `refresh()`.

```js
const onboarding = checklist({
  id: "onboarding",
  items: [{ id: "github", title: "Connect GitHub", completeWhen: () => user.githubConnected }],
});

// After the user connects GitHub somewhere in your app
onboarding.refresh();
```

`completeWhen` also takes over from the default for tours, links and actions: the item is ticked only when it returns `true`. You can also tick directly with `onboarding.complete("github")`.

### Letting users tick items off

Set `allowManualComplete` and the check circle becomes a button: users tick an item off themselves, or untick it. Clicking the item's text still runs its tour, link or action; on an item with none of these, it ticks the item too. It can be set per item, and an item's own value wins. From code, use `complete(id)` and `uncomplete(id)`.

```js
checklist({
  id: "onboarding",
  allowManualComplete: true,
  items: [
    { id: "video", title: "Watch the intro video", href: "/intro" },
    // Only ticked by finishing the tour, even with manual completion on.
    { id: "tour", title: "Take the tour", tour: steps, allowManualComplete: false },
  ],
});
```

## Saving progress

The checklist stores nothing itself. Progress comes in through `completed` (ids already done) and goes out through `onProgress` on every change. Keep it in localStorage, your API or the user record. Your backend can tick items too by passing ids in `completed`.

```js
const onboarding = checklist({
  id: "onboarding",
  items,
  completed: JSON.parse(localStorage.getItem("onboarding") ?? "[]"),
  onProgress: ({ completed, done, total }) => {
    localStorage.setItem("onboarding", JSON.stringify(completed));
  },
});

onboarding.show();
```

## When everything is done

Once every item is done, the checklist can show a different title, description and launcher text. If an item is unticked, it switches back.

```js
checklist({
  id: "onboarding",
  completeTitle: "You're all set! 🎉",
  completeDescription: "Nice work. You're ready to go.",
  completeLauncherText: "All done",
  items,
});
```

The checklist does not hide itself when done. Call `hide()` from `onComplete` to hide it right away; on later visits, check saved progress and do not show it at all:

```js
const onboarding = checklist({
  id: "onboarding",
  items,
  completed: savedProgress,
  onComplete: () => setTimeout(() => onboarding.hide(), 3000),
});

const { done, total } = onboarding.getProgress();
if (done < total) {
  onboarding.show();
}
```

## Tracking events

`onEvent` receives everything that happens in the checklist.

```js
checklist({
  id: "onboarding",
  items,
  onEvent: event => {
    // { kind: "checklist", id: "onboarding", type: "item_completed", itemId: "github", timestamp: 1760000000000 }
    analytics.track(`checklist_${event.type}`, event);
  },
});
```

Event types: `shown`, `hidden`, `opened`, `closed`, `item_started`, `item_completed`, `item_uncompleted`, `tour_ended` (with the tour's `reason`), `completed` and `reset`.

## Notes

- Source: https://driverjs.com/docs/checklists (driver.js 1.10.1 docs source, `apps/docs/src/content/guides/checklists.mdx`).
- While a tour runs, the checklist is hidden, and it opens again when the tour ends.
- Appearance options (theme, accent color, position, text) are in [Customizing Checklists](./customizing.md).

## Related

- [Checklist Configuration](./configuration.md)
- [Checklist Methods](./methods.md)
- [Customizing Checklists](./customizing.md)
- [Checklist Themes](./themes.md)
