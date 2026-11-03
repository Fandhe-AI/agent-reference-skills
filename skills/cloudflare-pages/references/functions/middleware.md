---
source: https://developers.cloudflare.com/pages/functions/middleware/
---

# Middleware

Middleware is reusable logic that runs before your `onRequest` function, defined in a `_middleware.js` file under `/functions`. Typical uses are error handling, authentication and logging.

## Signature / Usage

`functions/_middleware.js` exports `onRequest` (or a method-specific variant) and calls `context.next()`. Adapted (not in the official docs): the error handler logs server-side and returns a generic 500 instead of the exception message and stack; see Notes.

```js
export async function onRequest(context) {
	try {
		return await context.next();
	} catch (err) {
		console.error(err);
		return new Response("Internal Server Error", { status: 500 });
	}
}
```

Chain middleware by exporting an array. Adapted (not in the official docs): the authentication step checks a secret bearer token from `env` and fails closed, and the error handler logs instead of returning the stack to the client; see Notes.

```js
async function errorHandling(context) {
	try {
		return await context.next();
	} catch (err) {
		console.error(err);
		return new Response("Internal Server Error", { status: 500 });
	}
}

function authentication(context) {
	const expected = context.env.AUTH_TOKEN;
	const provided = context.request.headers.get("authorization");
	if (!expected || provided !== `Bearer ${expected}`) {
		return new Response("Unauthorized", { status: 403 });
	}

	return context.next();
}

export const onRequest = [errorHandling, authentication];
```

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- A `_middleware.js` runs for requests matching any Function in the same directory, including subdirectories. `functions/users/_middleware.js` covers `/users`, `/users/nevi`, `/users/nevi/123`. To run in front of the entire application including static files, create `functions/_middleware.js`.
- In the chain, `errorHandling` runs first and captures errors from `authentication` and every later Function.
- Adapted from the official docs: the official chained example authenticates by comparing the client-supplied `x-email` header to `admin@example.com`, which any client can forge, and its error handlers (including the first, single-function example) return `err.message` and `err.stack` to the caller. The examples above log the error server-side and return a generic 500; the chained example uses a secret `AUTH_TOKEN` binding (set as a secret; rejects when unset) and a generic 500. The exact-match comparison is not constant-time; for production use a vetted auth scheme.
- Middleware can also export method-specific handlers such as `onRequestGet`.

## Related

- [api-reference.md](./api-reference.md)
- [event-context.md](./event-context.md)
- [routing.md](./routing.md)
- [plugins.md](./plugins.md)
