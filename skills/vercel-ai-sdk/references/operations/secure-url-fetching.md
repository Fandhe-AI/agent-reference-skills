---
source: https://ai-sdk.dev/docs/advanced/secure-url-fetching
---

# Secure URL Fetching

How the AI SDK protects server-side fetches of URLs returned by model providers (generated media, polling URLs), the `fetchUntrustedUrl` helper from `@ai-sdk/provider-utils`, and how to harden your deployment further.

## Signature / Usage

For custom integrations using `@ai-sdk/provider-utils`, use `fetchUntrustedUrl` when the URL comes from a response or other untrusted input:

```ts
import { fetchUntrustedUrl } from '@ai-sdk/provider-utils';

const response = await fetchUntrustedUrl({
  url: result.downloadUrl,
  headers: {
    authorization: `Bearer ${apiKey}`,
    accept: 'image/*',
  },
  credentialedOrigin: providerBaseURL,
});
```

Hardening an injected `fetch` with an `undici` `Agent` whose `connect.lookup` validates the resolved IP:

```ts
import { Agent, fetch as undiciFetch } from 'undici';
import { lookup } from 'node:dns';

// Your own check that returns true for private/loopback/link-local addresses.
declare function isUnsafeAddress(ip: string): boolean;

const safeLookup: typeof lookup = (hostname, options, callback) => {
  lookup(hostname, options as any, (err, address, family) => {
    if (err) {
      (callback as any)(err);
      return;
    }
    // `address` is a string, or an array of { address, family } when `all: true`
    // (e.g. autoSelectFamily) is in effect; validate every resolved address.
    const list: string[] = Array.isArray(address)
      ? address.map((a: any) => a.address)
      : [address as unknown as string];
    const bad = list.find(isUnsafeAddress);
    if (bad !== undefined) {
      (callback as any)(new Error(`Refusing to connect to ${bad}`));
      return;
    }
    (callback as any)(null, address, family);
  });
};

const safeDispatcher = new Agent({ connect: { lookup: safeLookup } });

const safeFetch: typeof fetch = (input, init) =>
  undiciFetch(input, { ...init, dispatcher: safeDispatcher }) as any;
```

```ts
import { createFal } from '@ai-sdk/fal';

const fal = createFal({ fetch: safeFetch });
```

## Options / Props

`fetchUntrustedUrl` options named on the page:

| Name | Type | Description |
| --- | --- | --- |
| `url` | string | The URL taken from a response or other untrusted input. |
| `headers` | object | Request headers. Credentials and unknown custom headers are withheld on the first request unless the URL matches a configured origin. |
| `credentialedOrigin` | string | Origin allowed to receive credentials (e.g. the provider base URL). Must come from your configuration, never from the response URL. Does not disable URL validation. |
| `trustedOrigin` | string | For a configured private endpoint; if `credentialedOrigin` is omitted, it is used as the origin allowed to receive credentials. |
| `untrustedFirstHopHeaders` | string[] | Extra protocol metadata headers allowed on the first request, e.g. `['x-protocol-version']`. Only list headers that are safe to disclose to any destination. |

## Notes

- The SDK validates every response-supplied URL before fetching it, automatically inside provider packages; no configuration is needed. A blocked URL surfaces as a `DownloadError`.
- It rejects private, loopback, and link-local targets (IPv4 `10/8`, `172.16/12`, `192.168/16`, `127/8`, `169.254/16`, CGNAT, multicast, and equivalent IPv6 ranges, plus `localhost` and `.local`) and non-`http(s)` schemes.
- It re-validates every redirect hop; the redirect is never followed blindly.
- On Node.js it validates DNS at connection time: every resolved address is checked and the socket is pinned to the validated DNS result, so DNS rebinding cannot introduce a different address.
- It strips proxy-forwarding, cloud-metadata, and cookie headers, and drops credentials across origins (`Authorization`, `Cookie`, provider-specific API-key headers are not sent to a different origin; a cross-origin redirect drops all caller headers except `User-Agent`).
- For authenticated task-status polling, providers can construct the first URL from the configured API endpoint; the SDK trusts that configured origin for the initial request but manually follows and validates every redirect away from it (MiniMax, Kling AI, and ByteDance video polling use this path).
- `Authorization` is sent only when the initial URL has the same origin as `credentialedOrigin`; otherwise only allowlisted metadata such as `Accept`, `Range`, and `User-Agent` is sent. Credentials are never reattached on later hops.
- `fetchWithValidatedRedirects` preserves its first-request behavior (sanitizes risky headers but still forwards authentication and custom headers); switch to `fetchUntrustedUrl` for first-request credential isolation. Existing `getFromApi` calls retain their behavior; pass `credentialedOrigin` when fetching response-supplied URLs with credentials.
- URLs same-origin with the provider endpoint you configured (e.g. a custom `baseURL` for a self-hosted or `localhost` deployment) are exempt from these checks; any redirect off that origin is still validated.
- Node.js default validated download fetch uses `node:dns` and an `undici` connector hook; wrapping or replacing global `fetch` does not disable it. Bun, Deno, Cloudflare Workers, and framework edge runtimes use their platform fetch even when they expose a Node-compatible `process`. If you explicitly inject a custom `fetch`, it is responsible for equivalent DNS validation and connection pinning; on other runtimes restrict network egress to private, loopback, link-local, and cloud-metadata ranges.
- Hardening: (1) restrict outbound egress at the network layer (deny `169.254.0.0/16`, RFC-1918 ranges, and loopback); (2) harden an injected `fetch` as shown. The SDK's URL validation and custom fetch connect-time pinning are complementary; keep both.
- Modified from the official example: the official `safeLookup` validates `address` only when it is a string, so the array returned with `all: true` (autoSelectFamily) would reach the socket unchecked; this version validates every address in both shapes.

## Related

- [AI SDK Errors](./errors.md)
