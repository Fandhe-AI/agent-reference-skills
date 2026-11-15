---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-layout
---

# Layout directives

Walkthrough directives for footnotes, inline icons, and tutorial duration.

## Signature / Usage

### Footnotes

Renders the inner text in a footnote style. Insert this directive at the bottom of the relevant step.

```text
<walkthrough-footnote>FOOTNOTE_TEXT</walkthrough-footnote>
```

### Icons

Shows an icon.

```text
<walkthrough-ICON_NAME></walkthrough-ICON_NAME>
```

Icons that can be inserted into a line of text:

| Inline icon name | Rendered icon |
| --- | --- |
| `cloud-shell-icon` | Cloud Shell icon |
| `web-preview-icon` | Web preview icon |
| `cloud-shell-editor-icon` | Cloud Shell Editor icon |
| `nav-menu-icon` | Nav menu icon |
| `notification-menu-icon` | Notification menu icon |
| `pin-section-icon` | Pin menu section icon |

Icons best shown as a standalone image:

| Icon name | Rendered icon |
| --- | --- |
| `conclusion-trophy` | Conclusion trophy |

### Tutorial duration

Shows a clock icon and an estimate of how long the tutorial will take. For multi-step tutorials, add this directive immediately after the title.

```text
<walkthrough-tutorial-duration duration="DURATION"></walkthrough-tutorial-duration>
```

## Options / Props

`walkthrough-tutorial-duration` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `duration` | Float | The estimated tutorial duration in minutes. |

## Notes

- For multi-step tutorials, make the conclusion trophy the first element in the final step.
- The rendered icon images in the source (hosted under `walkthroughs.googleusercontent.com/tutorial/resources/`) are described by name only here.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-layout (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [writing-tutorials.md](./writing-tutorials.md)
- [style-guide.md](./style-guide.md)
- [directives-spotlights.md](./directives-spotlights.md)
