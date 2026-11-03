---
source: https://developers.cloudflare.com/pages/configuration/early-hints/
---

# Early Hints

Pages caches `preload` and `preconnect` `Link` headers and sends them as Early Hints to speed up page loads; always on for `pages.dev` and custom domains.

## Signature / Usage

Option 1: a `Link` header in the `_headers` file.

```txt
/blog/*
  Link: </styles.css>; rel=preload; as=style
```

Option 2: automatic generation from `<link>` elements.

```html
<html>
	<head>
		<link rel="preload" href="/style.css" as="style" />
		<link rel="stylesheet" href="/style.css" />
	</head>
</html>
```

Remove automatically generated `Link` headers:

```txt
/*
  ! Link
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `href` | attribute | — | Required on the `<link>` element for automatic `Link` generation. |
| `as` | attribute | — | Optional. |
| `rel` | attribute | — | One of `preconnect`, `preload`, `modulepreload`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- `<link>` elements with any other attribute (for example `fetchpriority`, `crossorigin`, `data-do-not-generate-a-link-header`) do not generate `Link` headers.
- Early Hints cannot be disabled on Pages and the zone-level Early Hints setting does not apply to Pages domains. Workers respects the zone-level setting, so migrate to Workers for full control. The Workers migration matrix lists Early Hints as Pages-only (Workers workaround: `Link` headers).
- Probe requests appear in logs with `ClientRequestSource: earlyHintsCache` and `ClientRequestUserAgent` `nginx-ssl early hints` or `bastion early hints`. A `504` means no hint cached yet; `200` means a cached hint was served. They do not reach your project or origin. Filter with `ClientRequestSource != "earlyHintsCache"`.
- To reduce `504` probe misses, configure `Link` headers via `_headers` or automatic generation.
- Automatic generation should not hurt performance; the source asks you to contact Cloudflare on Discord if you need it disabled.

## Related

- [Headers](./headers.md)
- [Serving Pages](./serving-pages.md)
