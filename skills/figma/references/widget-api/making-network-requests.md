# Making Network Requests

How a widget makes network requests with the Fetch API (provided by the Plugin API), tests the effect of limiting network access, and restricts domains with `networkAccess` in `manifest.json`.

## Signature / Usage

Adapted (not in the official docs): the official `code.tsx` example with line breaks and indentation restored from the rendered page; the code itself is unchanged.

```tsx
const { widget } = figma;
const { Text } = widget;

// This widget fetches a resource and renders the text response in a rectangle.
function Widget() {
  return (
    <Text
      fontSize={24}
      onClick={
        () =>
          (async () => {
            const response = await fetch('https://httpbin.org/get?success=true')
            const json = await response.json()
            const textNode = figma.createText()
            // Make sure the new text node is visible where we're currently looking
            textNode.x = figma.viewport.center.x
            textNode.y = figma.viewport.center.y
            await figma.loadFontAsync(textNode.fontName as FontName)
            // success=true!
            textNode.characters = JSON.stringify(json.args, null, 2)
            figma.closePlugin()
          })()
      }
    >
      Show fetch response
    </Text>
  );
}
widget.register(Widget);
```

## Options / Props

### networkAccess in manifest.json

`networkAccess` has the properties `allowedDomains`, `reasoning`, and `devAllowedDomains`.

```json
{
  "name": "MyWidget",
  "id": "737805260747778093",
  "api": "1.0.0",
  "widgetApi": "1.0.0",
  "editorType": ["figma", "figjam"],
  "containsWidget": true,
  "main": "code.js",
  "ui": "ui.html",
  "networkAccess": {
    "allowedDomains": ["httpbin.org/get"],
    "reasoning": "MyPlugin queries httpbin.org/get for example responses.",
    "devAllowedDomains": []
  }
}
```

| Value | Meaning |
|-------|---------|
| `allowedDomains` entries | Domains the widget requests (including external resources such as images); can be as granular as `httpbin.org/get` |
| `["none"]` | Special keyword that prevents all network access |
| `["*"]` | Permits any domain; `reasoning` is then required |
| `reasoning` | Short explanation of the access scope; shown on the widget's Community page with the allowed domains |
| `devAllowedDomains` | Local or development servers (e.g. `http://localhost:3000`); listing a local or development server in `allowedDomains` instead requires `reasoning` |

### Test network access

1. In `manifest.json`, add `networkAccess` with `allowedDomains` set to `["none"]`.
2. Use the widget in Figma and note any content-security policy (CSP) errors in the developer console.
3. Replace `"none"` with the domains the widget needs, until no CSP errors remain.

## Notes

- Widgets run in a browser environment, so CORS applies. Widget iframes have a null origin, so only APIs that respond with `Access-Control-Allow-Origin: *` can be called from the iframe.
- Previously a widget had to implement an iframe to send requests; those widgets keep working, but the official guide recommends the simpler Fetch API approach through the Plugin API.
- After `networkAccess` is set, requests to domains not in `allowedDomains` are blocked with a CSP error.
- Complete list of domain patterns: see [Widget manifest](./manifest.md).
- Source: https://developers.figma.com/docs/widgets/making-network-requests/ (fetched 2026-11-14)

## Related

- [Widget manifest](./manifest.md)
- [How Widgets Run](./how-widgets-run.md)
- [Using the Plugin API](./using-the-plugin-api.md)
