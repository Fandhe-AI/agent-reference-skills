---
source: https://developers.cloudflare.com/workers/examples/rewrite-links/
---

# Rewrite links

Rewrite URLs in `href` and `src` attributes of an HTML response with HTMLRewriter.

```js
export default {
	async fetch(request) {
		const OLD_URL = "developer.mozilla.org";
		const NEW_URL = "mynewdomain.com";

		class AttributeRewriter {
			constructor(attributeName) {
				this.attributeName = attributeName;
			}
			element(element) {
				const attribute = element.getAttribute(this.attributeName);
				if (attribute) {
					element.setAttribute(
						this.attributeName,
						attribute.replace(OLD_URL, NEW_URL),
					);
				}
			}
		}

		const rewriter = new HTMLRewriter()
			.on("a", new AttributeRewriter("href"))
			.on("img", new AttributeRewriter("src"));

		const res = await fetch(request);
		const contentType = res.headers.get("Content-Type");

		// If the response is HTML, it can be transformed with
		// HTMLRewriter -- otherwise, it should pass through
		if (contentType.startsWith("text/html")) {
			return rewriter.transform(res);
		} else {
			return res;
		}
	},
};
```

## Notes

- HTMLRewriter streams the body; handlers are classes or objects with an `element` method. See `../references/web-apis/html-rewriter.md`.
- Check `Content-Type` first so non-HTML responses pass through untouched.
- `contentType` can be `null` for responses without the header; this sample does not guard against that.
