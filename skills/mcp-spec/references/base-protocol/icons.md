---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic#icons
---

# icons

The `icons` property provides a standardized way for servers to expose visual identifiers for their resources, tools, prompts, and implementations. Icons are represented as an array of `Icon` objects.

## Signature / Usage

Icons can be attached to `Implementation`, `Tool`, `Prompt`, and `Resource`. Shape per the source description:

```text
Icon {
  src: string        // HTTP/HTTPS URL or data URI with base64-encoded image data (required); per schema, Security considerations require HTTPS or data: (see Notes)
  mimeType?: string  // if the server's type is missing or generic
  sizes?: string[]   // e.g. ["48x48"], ["any"] for scalable formats, ["48x48", "96x96"]
  theme?: "light" | "dark"  // icon background preference
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `src` | URI string (required) | HTTP/HTTPS URL pointing to an image file, or a data URI with base64-encoded image data (per schema; Security considerations require HTTPS or `data:` — see Notes) |
| `mimeType` | string | Optional MIME type if the server's type is missing or generic |
| `sizes` | string[] | Optional size specifications (e.g., `["48x48"]`, `["any"]`, `["48x48", "96x96"]`) |
| `theme` | `light` \| `dark` | Optional theme preference for the icon background |

## Notes

- Clients that support rendering icons **MUST** support `image/png` and `image/jpeg` (and `image/jpg`); they **SHOULD** also support `image/svg+xml` and `image/webp`.
- Consumers **MUST** treat icon metadata and icon bytes as untrusted inputs.
- Ensure that the icon URI is either a HTTPS or `data:` URI. Clients **MUST** reject icon URIs that use unsafe schemes and redirects, such as `javascript:`, `file:`, `ftp:`, `ws:`, or local app URI schemes. Disallow scheme changes and redirects to hosts on different origins.
- The schema (`Icon.src`) and the Icons section describe `src` as an HTTP/HTTPS URL, while the Security considerations of the same spec require HTTPS or `data:` URIs; implementations should accept only HTTPS or `data:` icon URIs.
- Be resilient against resource exhaustion (oversized images, large dimensions, excessive frames); consumers **MAY** set limits.
- Fetch icons without credentials (no cookies, `Authorization` headers, or client credentials).
- Verify that icon URIs are from the same origin as the server.
- Exercise caution when rendering: SVG may contain executable content. Consumers **MAY** disallow specific file types or sanitize before rendering.
- Validate MIME types and file contents before rendering; treat MIME type as advisory, detect content type via magic bytes, reject on mismatch or unknown types, and maintain a strict allowlist of image types.
- Multiple icons can be provided for different display contexts; clients should select the most appropriate icon for their UI.

## Related

- [Messages](./messages.md)
