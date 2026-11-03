---
source: https://developers.cloudflare.com/pages/how-to/web-analytics/
---

# Enable Web Analytics

One-click Cloudflare Web Analytics for a Pages project; the JavaScript snippet is added on the next deployment.

## Signature / Usage

Dashboard: **Workers & Pages** > Pages project > **Metrics** > **Enable** under Web Analytics. View results under **Web Analytics**.

The snippet can only be inserted into valid HTML, such as:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Title</title>
	</head>
	<body>

		<p>Hello world.</p>

	</body>
</html>
```

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Web Analytics is free and privacy-first and does not require changing DNS or using the proxy; a beacon collects metrics with the Performance API.
- A page containing only the text `Hello world.` is not valid HTML, so Cloudflare cannot add the snippet.

## Related

- [Enable Zaraz](./enable-zaraz.md)
- [Get started with Git integration](./get-started-git-integration.md)
