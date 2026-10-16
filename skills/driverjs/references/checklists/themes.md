# Checklist Themes

Ready-made plain-CSS themes for checklists, applied by passing their class name via `className`.

## Signature / Usage

Copy a theme's CSS into your stylesheet, then pass its class name:

```js
import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css";
import "driver.js/dist/checklist.css";
import "./checklist-theme.css"; // The CSS you copied

checklist({
  id: "onboarding",
  className: "checklist-gradient",
  items,
}).show();
```

## Themes

| Theme | className | Notes |
|-------|-----------|-------|
| Gradient Header | `checklist-gradient` | Colored header; launcher becomes a gradient pill |
| Cards | `checklist-cards` | Each item in its own card with a chevron on actionable items; done items turn green |
| Numbered Steps | `checklist-numbered` | CSS counters number the items; nothing to add to items |
| Progress Ring | `checklist-ring` | Ring around the launcher filled by `--driver-checklist-progress` (percentage) |
| Compact | `checklist-compact` | Small, for items without descriptions |
| GIF Banner | `checklist-media` | Image in `description` (HTML allowed), CSS moves it above the title |
| Midnight | `checklist-midnight` | Dark theme, violet accent |
| Celebration | `checklist-celebration` | Finished state via `completeTitle` / `completeDescription` / `completeLauncherText`, turns green |
| Brutalist | `checklist-brutalist` | Driver.js homepage theme: thick borders, hard shadows, yellow header |

Representative theme CSS (`checklist-ring`; the other 8 themes: copy from https://driverjs.com/docs/checklist-themes):

```css
/* --driver-checklist-progress holds the progress as a percentage, so a
   conic gradient can draw it as a ring around the launcher's count. */
.driver-checklist.checklist-ring {
  --driver-checklist-color: #22c55e;
}

.driver-checklist.checklist-ring .driver-checklist-launcher {
  gap: 10px;
  padding: 6px 6px 6px 14px;
  border-radius: 999px;
}

.driver-checklist.checklist-ring .driver-checklist-launcher-count {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background:
    radial-gradient(closest-side, #2d2d2d 78%, transparent 80% 100%),
    conic-gradient(#22c55e var(--driver-checklist-progress), rgba(255, 255, 255, 0.2) 0);
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.driver-checklist.checklist-ring .driver-checklist-progress-bar {
  height: 8px;
  border-radius: 4px;
}

.driver-checklist.checklist-ring .driver-checklist-progress-text {
  order: -1;
  font-weight: 600;
  color: #16a34a;
}
```

Progress ring example:

```js
checklist({
  id: "onboarding",
  className: "checklist-ring",
  progressText: "{{percent}}% complete",
  launcherProgressText: "{{remaining}}",
  items,
});
```

For confetti or a modal on completion, use `onComplete`, which fires once when the last item is done:

```js
checklist({
  id: "onboarding",
  items,
  onComplete: () => confetti(),
});
```

## Notes

- Source: https://driverjs.com/docs/checklist-themes (driver.js 1.10.1 docs source, `apps/docs/src/content/guides/checklist-themes.mdx`).
- The theme CSS bodies live in separate stylesheet files (`apps/docs/src/styles/checklist-themes/*.css`); only the `checklist-ring` CSS is reproduced above. Copy the other themes from the official page.
- Themes only change appearance, so rules can be mixed or used as a starting point. For every targetable class name see the Styling docs (`/docs/styling#class-names`).
- Compact example uses `title: "Setup"`, `launcherProgressText: "{{remaining}} left"`; the GIF Banner example passes `description: '<img src="/welcome.gif" alt="" /><p>Four quick steps to get you going.</p>'`.

## Related

- [Customizing Checklists](./customizing.md)
- [Checklists](./overview.md)
- [Theming](../api/theming.md)
