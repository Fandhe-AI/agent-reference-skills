# Component resource `_meta` fields

Keys set on the resource template that serves your component (`registerResource`). They help ChatGPT describe and frame the rendered iframe without leaking metadata to other clients.

## Options / Props

| Name | Placement | Type | Description |
|------|-----------|------|-------------|
| `_meta.ui.prefersBorder` | Resource contents | boolean | Hint that the component should render inside a bordered card when supported. |
| `_meta.ui.csp` | Resource contents | object | Preferred metadata surface for standard widget CSP fields: `connectDomains`, `resourceDomains`, and optional `frameDomains`. |
| `_meta.ui.domain` | Resource contents | string (origin) | Dedicated origin for hosted components (required when submitting a plugin with UI; must be unique per plugin). Defaults to `https://web-sandbox.oaiusercontent.com`. |
| `_meta["openai/widgetDescription"]` | Resource contents | string | Human-readable summary surfaced to the model when the component loads, reducing redundant assistant narration. |
| `_meta["openai/widgetPrefersBorder"]` | Resource contents | boolean | OpenAI-specific compatibility alias for `_meta.ui.prefersBorder` in ChatGPT. |
| `_meta["openai/widgetCSP"]` | Resource contents | object | Legacy ChatGPT compatibility key for widget CSP metadata. Standard CSP fields are superseded by `_meta.ui.csp`, but `redirect_domains` is still required for trusted `openExternal` destinations. |
| `_meta["openai/widgetDomain"]` | Resource contents | string (origin) | OpenAI-specific compatibility alias for `_meta.ui.domain` in ChatGPT. |

`_meta["openai/widgetCSP"]` (legacy, snake_case fields):

| Name | Type | Description |
|------|------|-------------|
| `connect_domains` | string[] | Domains the widget may contact. |
| `resource_domains` | string[] | Domains for static assets. |
| `frame_domains?` | string[] | Optional origins allowed for iframe embeds. |
| `redirect_domains?` | string[] | ChatGPT extension for `window.openai.openExternal` redirect targets. |

`_meta.ui.csp` (standard, preferred for new UI):

| Name | Type | Description |
|------|------|-------------|
| `connectDomains` | string[] | Domains the widget may contact via fetch/XHR. |
| `resourceDomains` | string[] | Domains for static assets (images, fonts, scripts, styles). |
| `frameDomains?` | string[] | Optional list of origins allowed for iframe embeds. By default, widgets can't render subframes; adding `frameDomains` opts in to iframe usage and triggers stricter plugin review. |

## Notes

- `_meta.ui.csp` does not support `redirect_domains` for `window.openai.openExternal(...)` links; to allowlist redirect targets you must still set `_meta["openai/widgetCSP"].redirect_domains`.

## Related

- [tool-descriptor-meta.md](./tool-descriptor-meta.md)
- [window-openai-bridge.md](./window-openai-bridge.md)
