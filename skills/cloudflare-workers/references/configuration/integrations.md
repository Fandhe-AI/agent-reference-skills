---
source: https://developers.cloudflare.com/workers/configuration/integrations/
---

# Integrations

Workers integrate with databases, external APIs, and third-party services. This page aggregates the Integrations overview, the APIs page, and the External Services page.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/configuration/integrations/apis/.

```js
async function handleRequest(request) {
	// Make the fetch request to the third party API endpoint
	const response = await fetch("https://weather-api.com/endpoint", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	// Retrieve the data from the response
	const data = await response.json();

	// Use the data to modify or manipulate your content as needed
	return new Response(data);
}
```

Authentication with a Wrangler secret:

```sh
wrangler secret put SECRET_NAME
```

```js
const secretValue = env.SECRET_NAME;
```

## Notes

- Types of integrations: databases (https://developers.cloudflare.com/workers/databases/), APIs, and third-party services (payment gateways, authentication providers, and so on).
- How to use: pick an integration and have its accounts and credentials; import the needed libraries or modules in the Worker; use the provided APIs to connect; store secrets with `wrangler secret put <KEY>`.
- APIs: use the `fetch` API to call the endpoint and use the response data. Use the secret value to authenticate (for example an API key in request headers). For mTLS authentication use mTLS certificates to present a client certificate.
- External services: many Node-compatible libraries work on Workers out of the box, but some that implement `fs`, `http/net`, or access the browser `window` do not translate directly to the V8-based Workers runtime. For authentication, include the secret in the library's configuration.
- Tips: secure integrations and verify the libraries you import; use caching (the Cache API for third-party API data) to improve performance and reduce load on external services; split Workers into a service-oriented architecture with service bindings; use Custom Domains when communicating with external APIs and services (they create a DNS record and treat the Worker as an application rather than a proxy).
- The source snippet passes the parsed JSON object (`data`) to `new Response(...)` unchanged; serialize it (for example with `Response.json(data)`) in real code.

## Related

- [Custom Domains](./custom-domains.md)
- [Bindings, secrets and environment variables](../bindings-rpc/README.md)
- [Web APIs (fetch, Cache)](../web-apis/README.md)
