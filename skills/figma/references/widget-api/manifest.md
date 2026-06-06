# Widget Manifest

The `manifest.json` file is required for every widget. It defines the widget's identity, entry point, permissions, and target editors.

## Signature / Usage

```json
{
  "name": "My Widget",
  "id": "1234567890",
  "api": "1.0.0",
  "widgetApi": "1.0.0",
  "containsWidget": true,
  "main": "dist/code.js",
  "documentAccess": "dynamic-page",
  "editorType": ["figma", "figjam"],
  "ui": "dist/ui.html",
  "networkAccess": {
    "allowedDomains": ["https://api.example.com"]
  },
  "permissions": ["currentuser"]
}
```

## Options / Props

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name shown in menus |
| `containsWidget` | Yes | Must be `true` |
| `widgetApi` | Yes | Widget API version — current is `"1.0.0"` |
| `main` | Yes | Path to the compiled JavaScript entry point |
| `documentAccess` | Yes | Must be `"dynamic-page"` for new widgets |
| `id` | No | Assigned by Figma when the widget is created or published |
| `api` | No | Plugin API version (recommend latest) |
| `editorType` | No | `["figma"]`, `["figjam"]`, or both; omit to target both |
| `ui` | No | Path to HTML file(s) for modal/iframe UI |
| `networkAccess.allowedDomains` | No | Domains the widget may fetch from; supports wildcards (`*.example.com`) and `localhost` |
| `permissions` | No | `"currentuser"` and/or `"activeusers"` |
| `build` | No | Shell command to compile before loading in development |
| `enableProposedApi` | No | Development-only flag for proposed API features |
| `enablePrivatePluginApi` | No | Enables private widget-specific APIs |

## Notes

- `documentAccess: "dynamic-page"` is required for all new widgets; pages load on-demand to keep large files performant.
- Patterns in `networkAccess.allowedDomains` support wildcards (`*.example.com`), specific paths (`example.com/api/`), schemes (`https://`, `wss://`), and `localhost`.
- FigJam-only features (e.g., `useStickable`) require `"figjam"` in `editorType`.
- The `id` field is omitted during local development; Figma assigns it upon publishing.

## Related

- [overview](./overview.md)
- [setup-guide](./setup-guide.md)
