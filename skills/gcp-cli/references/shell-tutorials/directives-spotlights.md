---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-spotlights
---

# Spotlight directives

Walkthrough directive that creates a link highlighting a UI element in Google Cloud console when clicked.

## Signature / Usage

```text
<walkthrough-spotlight-pointer spotlightId="SPOTLIGHT_ID">LINK_TEXT</walkthrough-spotlight-pointer>

<walkthrough-spotlight-pointer cssSelector="CSS_SELECTOR">LINK_TEXT</walkthrough-spotlight-pointer>
```

You can spotlight an element in one of two ways:

- Spotlight/instrumentation ID: using the `spotlightId` parameter, specify a DOM element's `instrumentation-id` or `spotlight-id` property value.
- CSS selector: for elements without a spotlight or instrumentation ID, use the `cssSelector` parameter with a CSS selector.

Only one of these parameters is required. If both are provided, `spotlightId` is used.

Multiple elements can be selected using a comma as a delimiter. All matching elements are highlighted, with the first focused and scrolled into view.

## Options / Props

| Parameter | Type | Description |
| --- | --- | --- |
| `spotlightId` | List | Spotlight/instrumentation IDs to spotlight, separated by comma. |
| `cssSelector` | List | CSS selectors to spotlight, separated by comma. |
| `title` | String | *(Optional)* The tooltip to show when the user hovers their mouse cursor over the spotlight link. |

Spotlight/instrumentation IDs:

| Spotlight/instrumentation ID | Highlighted element |
| --- | --- |
| `console-nav-menu` | The console navigation menu. |
| `devshell-activate-button` | The button to open Cloud Shell. |

## Notes

- For spotlights in Cloud Shell Editor, use `walkthrough-editor-spotlight` (see the Cloud Shell Editor directives page).
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/directives-spotlights (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [directives-cloud-shell-editor.md](./directives-cloud-shell-editor.md)
- [directives-layout.md](./directives-layout.md)
- [writing-tutorials.md](./writing-tutorials.md)
