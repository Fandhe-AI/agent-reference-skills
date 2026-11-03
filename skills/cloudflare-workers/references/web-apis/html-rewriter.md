---
source: https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
---

# HTMLRewriter

`HTMLRewriter` lets you build HTML parsers inside a Worker, a jQuery-like experience for parsing and transforming HTML. Instantiate it once in your script, with handlers attached using `on` and `onDocument`.

## Signature / Usage

```js
new HTMLRewriter()
	.on("*", new ElementHandler())
	.onDocument(new DocumentHandler());
```

Element handler:

```js
class ElementHandler {
	element(element) {
		// An incoming element, such as `div`
		console.log(`Incoming element: ${element.tagName}`);
	}

	comments(comment) {
		// An incoming comment
	}

	text(text) {
		// An incoming piece of text
	}
}

async function handleRequest(req) {
	const res = await fetch(req);

	return new HTMLRewriter().on("div", new ElementHandler()).transform(res);
}
```

Document handler:

```js
class DocumentHandler {
	doctype(doctype) {
		// An incoming doctype, such as <!DOCTYPE html>
	}

	comments(comment) {
		// An incoming comment
	}

	text(text) {
		// An incoming piece of text
	}

	end(end) {
		// The end of the document
	}
}
```

Async handler:

```js
class UserElementHandler {
	async element(element) {
		let response = await fetch(new Request("https://example.com/user"));

		// fill in user info using response
	}
}

async function handleRequest(req) {
	const res = await fetch(req);

	// run the user element handler via HTMLRewriter on a div with ID `user_info`
	return new HTMLRewriter()
		.on("div#user_info", new UserElementHandler())
		.transform(res);
}
```

## Options / Props

### Global types

| Name | Type | Description |
|------|------|-------------|
| `Content` | string \| Response \| ReadableStream | Content inserted in the output stream. |
| `ContentOptions` | Object | `{ html: Boolean }`: if `true`, content is treated as raw HTML; if `false` or not provided, content is treated as text and HTML-escaped. |

### Element (element handlers only)

Properties:

| Name | Type | Description |
|------|------|-------------|
| `tagName` | string | Tag name, such as `"h1"`. Assignable to modify the tag. |
| `attributes` | Iterator (read-only) | `[name, value]` pairs of the tag's attributes. |
| `removed` | boolean | Whether the element has been removed or replaced by a previous handler. |
| `namespaceURI` | string | The namespace URI of the element. |

Methods:

| Name | Returns | Description |
|------|---------|-------------|
| `getAttribute(name string)` | `string \| null` | Value of the attribute, or `null`. |
| `hasAttribute(name string)` | `boolean` | Whether the attribute exists. |
| `setAttribute(name string, value string)` | `Element` | Sets an attribute, creating it if absent. |
| `removeAttribute(name string)` | `Element` | Removes the attribute. |
| `before(content Content, contentOptions ContentOptions optional)` | `Element` | Inserts content before the element. |
| `after(content, contentOptions)` | `Element` | Inserts content right after the element. |
| `prepend(content, contentOptions)` | `Element` | Inserts content right after the start tag. |
| `append(content, contentOptions)` | `Element` | Inserts content right before the end tag. |
| `replace(content, contentOptions)` | `Element` | Removes the element and inserts content in its place. |
| `setInnerContent(content, contentOptions)` | `Element` | Replaces the content of the element. |
| `remove()` | `Element` | Removes the element with all its content. |
| `removeAndKeepContent()` | `Element` | Removes the start and end tags but keeps inner content. |
| `onEndTag(handler Function<void>)` | `void` | Registers a handler invoked when the end tag is reached. |

### EndTag (handlers registered with `element.onEndTag`)

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Tag name. Assignable. |
| `before(content, contentOptions)` | `EndTag` | Inserts content right before the end tag. |
| `after(content, contentOptions)` | `EndTag` | Inserts content right after the end tag. |
| `remove()` | `EndTag` | Removes the element with all its content. |

### Text chunks

| Name | Type | Description |
|------|------|-------------|
| `removed` | boolean | Whether removed or replaced by a previous handler. |
| `text` | string (read-only) | Text content of the chunk; may be empty if it is the last chunk. |
| `lastInTextNode` | boolean (read-only) | Whether the chunk is the last of the text node. |
| `before` / `after` / `replace` / `remove` | `Element` | Same signatures as the Element methods of the same name. |

### Comments

| Name | Type | Description |
|------|------|-------------|
| `comment.removed` | boolean | Whether removed or replaced by a previous handler. |
| `comment.text` | string | Text of the comment. Assignable. |
| `before` / `after` / `replace` / `remove` | `Element` | Same signatures as the Element methods of the same name. |

### Doctype (document handlers)

| Name | Type | Description |
|------|------|-------------|
| `doctype.name` | string \| null (read-only) | The doctype name. |
| `doctype.publicId` | string \| null (read-only) | Quoted string after the PUBLIC atom. |
| `doctype.systemId` | string \| null (read-only) | Quoted string after the SYSTEM atom or immediately after `publicId`. |

### End (document handlers)

| Name | Returns | Description |
|------|---------|-------------|
| `append(content Content, contentOptions ContentOptions optional)` | `DocumentEnd` | Inserts content after the end of the document. |

### Selectors

| Selector | Matches |
|----------|---------|
| `*` | Any element. |
| `E` | Any element of type E. |
| `E:nth-child(n)` | An E element, the n-th child of its parent. |
| `E:first-child` | An E element, first child of its parent. |
| `E:nth-of-type(n)` | An E element, the n-th sibling of its type. |
| `E:first-of-type` | An E element, first sibling of its type. |
| `E:not(s)` | An E element that does not match either compound selectors. |
| `E.warning` | An E element belonging to the class warning. |
| `E#myid` | An E element with ID equal to myid. |
| `E[foo]` | An E element with a foo attribute. |
| `E[foo="bar"]` | foo attribute value exactly equal to bar. |
| `E[foo="bar" i]` | foo exactly equal to any (ASCII-range) case-permutation of bar. |
| `E[foo="bar" s]` | foo exactly and case-sensitively equal to bar. |
| `E[foo~="bar"]` | foo is a whitespace-separated list, one of which is exactly bar. |
| `E[foo^="bar"]` | foo begins exactly with bar. |
| `E[foo$="bar"]` | foo ends exactly with bar. |
| `E[foo*="bar"]` | foo contains the substring bar. |
| `E[foo\|="en"]` | foo is a hyphen-separated list of values beginning with en. |
| `E F` | An F element descendant of an E element. |
| `E > F` | An F element child of an E element. |

## Notes

- Adapted from the official docs: the official async handler example calls `new Request("/user")`, but the Workers `Request` constructor has no implicit base URL, so a relative URL throws; the example uses an absolute URL (`https://example.com/user` is a placeholder; alternatively resolve with `new URL("/user", request.url)`).
- Element handlers are attached with `.on`; they respond to `element`, `comments`, and `text`. Document handler `doctype`, `comments`, `text`, and `end` functions are not scoped by a selector and are called for all content on the page, including content outside the top-level HTML tag.
- All handler functions can return `void` or `Promise<void>`; async handlers can access external resources such as fetch, Workers KV, Durable Objects, or the cache.
- Text chunks: Cloudflare performs zero-copy streaming parsing, so a text node can arrive in multiple chunks (for example `"Hey. How "` then `"are you?"`). The last chunk has `lastInTextNode` set to `true`; concatenate chunks yourself.
- Errors: if a handler throws, parsing halts, the transformed response body is errored with the thrown exception, and the untransformed body is canceled. If the transformed body was already partially streamed, the client sees a truncated response.

Error example:

```js
async function handle(request) {
	let oldResponse = await fetch(request);
	let newResponse = new HTMLRewriter()
		.on("*", {
			element(element) {
				throw new Error("A really bad error.");
			},
		})
		.transform(oldResponse);

	// At this point, an expression like `await newResponse.text()`
	// will throw `new Error("A really bad error.")`.
	// Thereafter, any use of `newResponse.body` will throw the same error,
	// and `oldResponse.body` will be closed.

	// Alternatively, this will produce a truncated response to the client:
	return newResponse;
}
```

## Related

- [Response](./response.md)
- [Streams](./streams.md)
- [Fetch](./fetch.md)
