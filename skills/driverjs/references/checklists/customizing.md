# Customizing Checklists

Theme class, accent color, position and text of the checklist widget.

## Signature / Usage

```js
checklist({
  id: "onboarding",
  className: "checklist-brutalist",
  position: "bottom-right",
  offset: { x: 20, y: 90 },
  title: "Welcome aboard 👋",
  description: "Finish these to unlock your workspace.",
  launcherText: "Setup guide",
  progressText: "{{done}}/{{total}} complete",
  launcherProgressText: "{{done}} of {{total}}",
  items,
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| className | string | Adds your own class to the widget, then style its parts |
| position | "bottom-right" \| "bottom-left" \| "top-right" \| "top-left" | Corner of the screen; default bottom-right. In the top corners the panel opens below the launcher |
| offset | { x, y } | Distance in pixels from the screen edges; default 20, or 12 on phones |
| title / description / launcherText | string | Widget text |
| progressText / launcherProgressText | string | Placeholders `{{done}}`, `{{total}}`, `{{remaining}}`, `{{percent}}` |

## Styling parts

CSS classes: `driver-checklist-launcher`, `-launcher-text`, `-launcher-count`, `-panel`, `-header`, `-title`, `-description`, `-close-btn`, `-progress`, `-progress-text`, `-progress-bar`, `-progress-fill`, `-items`, `-item`, `-item-trigger`, `-item-title`, `-item-description` and `-check`. Done items get `driver-checklist-item-done`; the widget gets `driver-checklist-complete` once every item is done.

Accent color: set `--driver-checklist-color` to recolor the progress bar, ticks and focus rings.

```css
:root {
  --driver-checklist-color: #16a34a;
}
```

Offset can also be set in CSS with `--driver-checklist-offset-x` and `--driver-checklist-offset-y`.

## Notes

- Source: https://driverjs.com/docs/checklists#customizing (driver.js 1.10.1 docs source, `apps/docs/src/content/guides/checklists.mdx`).
- The font comes from the popover's `--driver-popover-font-family` variable.
- On screens narrower than 480 pixels, the panel spans the width of the screen with even margins and the launcher stays in its corner. The widget keeps clear of the notch and home bar on phones.
- A launcher label too long for the screen is cut off with an ellipsis; the full text shows as a tooltip.
- An empty `launcherProgressText` hides the launcher count.

## Related

- [Checklist Themes](./themes.md)
- [Checklist Configuration](./configuration.md)
- [Checklists](./overview.md)
