---
source: https://developers.cloudflare.com/workers/examples/rewrite-links/
---

# Rewrite links

Rewrite URLs in `href` and `src` attributes of an HTML response with HTMLRewriter.

Adapted (not in the official docs): `contentType?.startsWith(...)` guards a missing `Content-Type`; see Notes.

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
		if (contentType?.startsWith("text/html")) {
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
- Adapted from the official docs: the official code calls `contentType.startsWith(...)`, which throws a `TypeError` when the upstream response has no `Content-Type` header (`headers.get` returns `null`); optional chaining is used here.
- `String.prototype.replace` with a string pattern replaces only the first occurrence in each attribute.
