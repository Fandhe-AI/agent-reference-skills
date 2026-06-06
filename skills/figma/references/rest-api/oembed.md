# oEmbed

Endpoint for generating embeddable rich previews of Figma files and published Makes.

## Signature / Usage

```http
GET /v1/oembed?url=https%3A%2F%2Fwww.figma.com%2Ffile%2F...
X-Figma-Token: <token>
```

## Options / Props

### GET oEmbed

`GET /v1/oembed` — Returns oEmbed data for a Figma file or published Make.

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | String (query, required) | URL of the Figma file or published Make to embed |
| `maxwidth` | Number (query, optional) | Maximum embed width in pixels (default: 800) |
| `maxheight` | Number (query, optional) | Maximum embed height in pixels (default: 450) |

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `version` | String | Always `"1.0"` |
| `type` | String | Always `"rich"` |
| `title` | String | Resource name |
| `key` | String | File identifier (omitted for published Makes) |
| `url` | String | Canonical resource URL |
| `provider_name` | String | `"Figma"` or `"Make"` |
| `html` | String | `<iframe>` pointing to the Figma embed URL |
| `width` | Number | Computed embed width |
| `height` | Number | Computed embed height |
| `thumbnail_url` | String | Optional preview image URL |
| `is_published_site` | Boolean | `true` for published Makes |

**Scope:** `file_metadata:read` | **Rate Limit:** Tier 3  
**Error Codes:** 400 (invalid/missing URL), 404 (not found or no public access), 429 (rate limited), 501 (server unavailable)

## Notes

- Not supported with plan access tokens
- The `html` field contains a ready-to-embed `<iframe>` element
- The resource must have public access enabled for the oEmbed to succeed

## Related

- [Authentication](./authentication.md)
- [Files](./files.md)
