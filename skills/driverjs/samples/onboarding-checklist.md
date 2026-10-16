# Onboarding Checklist

Show a "Get started" checklist whose items start a tour, run code or follow a link, with progress saved to localStorage.

```javascript
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
    {
      id: "github",
      title: "Connect GitHub",
      completeWhen: () => user.githubConnected,
    },
    {
      id: "invite",
      title: "Invite a teammate",
      action: () => openInviteModal(),
    },
    {
      id: "docs",
      title: "Read about saving progress",
      href: "/docs/checklists#saving-progress",
    },
  ],
  completed: JSON.parse(localStorage.getItem("onboarding") ?? "[]"),
  onProgress: ({ completed, done, total }) => {
    localStorage.setItem("onboarding", JSON.stringify(completed));
  },
});

onboarding.show();

// After the user connects GitHub somewhere in your app
onboarding.refresh();
```

## Notes

- Checklists are their own entry (`driver.js/checklist`, `dist/checklist.css`); items that start tours use tour styles, so import `driver.css` too (1.10.0+)
- Every item needs a stable `id`; saved progress is a list of these ids
- `tour` items tick only when the user finishes the tour; `href` ticks on click; `action` runs then ticks; an item with `completeWhen` ticks only when it returns `true`
- The checklist stores nothing itself: restore with `completed`, persist with `onProgress`
- Use `complete(id)` / `refresh()` from your app; `launcher: false` (1.10.1) lets you open the panel yourself with `open()` / `toggle()`
