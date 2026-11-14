---
source: https://ai-sdk.dev/docs/advanced/secure-url-fetching
---

# Secure URL Fetching

How the AI SDK protects server-side fetches of URLs returned by model providers (generated media, polling URLs), the `fetchUntrustedUrl` helper from `@ai-sdk/provider-utils`, `guarded-fetch` opt-in DNS protection on Node.js, and network egress restrictions.

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

Opt-in DNS protection on Node.js (install `guarded-fetch@^0.3.0` with `npm install guarded-fetch@^0.3.0`), passed to a provider that fetches untrusted URLs:

```ts
import { createFal } from '@ai-sdk/fal';
import { createGuardedFetch } from 'guarded-fetch';
import { generateImage } from 'ai';

const fetch = createGuardedFetch();
const fal = createFal({ fetch });

try {
  const result = await generateImage({
    model: fal.image('fal-ai/flux/schnell'),
    prompt: 'A blue cat in Kyoto',
  });
  console.log(result.images);
} finally {
  await fetch.close();
}
```

Trusted private endpoint (exact origins only):

```ts
const baseURL = 'http://127.0.0.1:8000';
const fetch = createGuardedFetch({ trustedOrigins: [baseURL] });
```

Core file downloads with `createDownload({ fetch })`:

```ts
import { createOpenAI } from '@ai-sdk/openai';
import { createGuardedFetch } from 'guarded-fetch';
import { createDownload, generateText } from 'ai';

const fetch = createGuardedFetch();
const openai = createOpenAI({ fetch });
const download = createDownload({ fetch, maxBytes: 20 * 1024 * 1024 });

try {
  const result = await generateText({
    model: openai('gpt-4.1'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: new URL('https://example.com/report.pdf'),
            mediaType: 'application/pdf',
          },
        ],
      },
    ],
    experimental_download: download,
  });
  console.log(result.text);
} finally {
  await fetch.close();
}
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

`createGuardedFetch` (package `guarded-fetch`) options named on the page:

| Name | Type | Description |
| --- | --- | --- |
| `trustedOrigins` | string[] | Exact origins (scheme, hostname, port; paths ignored) that bypass both URL target and DNS validation on every path. Does not allow other subdomains, ports, or redirect destinations. Never derive it from provider responses, model output, or user input. |

## Notes

- The SDK validates response-supplied URLs before fetching them, automatically inside provider packages; a blocked URL surfaces as a `DownloadError`. These automatic checks inspect the URL and literal IP addresses; they do not resolve DNS.
- DNS protection is opt-in (changed from the 7.0.142 page, which described default connection-time DNS validation on Node.js). The SDK uses your configured `fetch` or the runtime's global `fetch`, including on Node.js; a public-looking hostname can still resolve to a private address, and DNS rebinding is not blocked by the default transport. For applications that fetch untrusted URLs, use `guarded-fetch` on Node.js and/or restrict outbound traffic at the network layer. The core SDK does not depend on Undici.
- When to use a guarded transport: on Node.js whenever your server fetches URLs supplied by users, models, tools, or external services (prompt image and file URLs, remote chat attachments, tool-result files, generated media downloads, user-configured remote MCP servers), unless the destinations are controlled by your application or your fetch implementation or network egress policy already provides equivalent SSRF protection. Authentication alone does not make a user-supplied URL trusted; a URL selected by a model or extracted from a document is still untrusted. A URL syntax check or a separate DNS lookup before calling fetch does not provide connection-time DNS protection.
- Configure the transport at the actual download point: provider `fetch` settings apply to provider requests, core file downloads use separate hooks, built-in MCP transports use `transport.fetch`, and custom tools and transports need their own fetch configuration. URLs passed directly to a model provider are fetched by that service, outside your server's transport.
- The SDK rejects private, loopback, and link-local IP literals (IPv4 `10/8`, `172.16/12`, `192.168/16`, `127/8`, `169.254/16`, CGNAT, multicast, and equivalent IPv6 ranges), plus `localhost`, `.local`, `.localhost`, and `.internal` hostnames, and non-`http(s)` schemes.
- It re-validates every redirect hop; the redirect is never followed blindly. On server-side downloads a redirect from HTTPS to HTTP is blocked before requesting the insecure target, even when that target matches `trustedOrigin`; initial HTTP URLs and HTTP-to-HTTPS upgrades remain supported.
- It strips proxy-forwarding, cloud-metadata, and cookie headers, and drops credentials across origins (`Authorization`, `Cookie`, provider-specific API-key headers are not sent to a different origin; a cross-origin redirect drops all caller headers except `User-Agent`).
- For authenticated task-status polling, providers can construct the first URL from the configured API endpoint; the SDK trusts that configured origin for the initial request but manually follows and validates every redirect away from it (MiniMax, Kling AI, and ByteDance video polling use this path).
- `Authorization` is sent only when the initial URL has the same origin as `credentialedOrigin`; otherwise only allowlisted metadata such as `Accept`, `Range`, and `User-Agent` is sent. Credentials are never reattached on later hops.
- `fetchWithValidatedRedirects` preserves its first-request behavior (sanitizes risky headers but still forwards authentication and custom headers); switch to `fetchUntrustedUrl` for first-request credential isolation. Existing `getFromApi` calls retain their behavior; pass `credentialedOrigin` when fetching response-supplied URLs with credentials.
- URLs same-origin with the provider endpoint you configured (e.g. a custom `baseURL` for a self-hosted or `localhost` deployment) are exempt from the SDK's URL checks; any redirect off that origin is still validated. When using `createGuardedFetch`, also add that origin to its `trustedOrigins` option to allow private addresses; the provider's `baseURL` alone does not configure the transport's trusted origins.
- `guarded-fetch` transport: checks every IPv4 and IPv6 address returned by DNS inside the connector and rejects the request if any falls in a range the SDK's URL validator rejects; the connector uses those same checked results to open the socket (no second DNS resolution) and also validates literal-IP URLs. It resolves A and AAAA records directly (not `/etc/hosts` or DNS search domains); explicitly trusted origins use the runtime's normal resolver. `createGuardedFetch()` returns a fetch function with `close(): Promise<void>`; reuse one instance across requests and close it at shutdown after consuming or cancelling all response bodies. It uses its own Undici fetch and agents, so global fetch wrappers, framework fetch caching and global dispatcher configuration do not apply.
- Automatic redirects are disabled in the guarded transport: `redirect: 'follow'` (including the fetch default) is treated as `'error'`. The SDK's download helpers use `'manual'` and validate each hop. When calling the transport directly, use `fetchUntrustedUrl({ url, fetch })` for the SDK's redirect handling and header sanitization. The transport alone does not isolate credentials or limit response sizes.
- Requires Node.js 20.19 or later; not intended for browsers, Bun, Deno, Cloudflare Workers, or framework edge runtimes (use a transport supported by your runtime or enforce network egress restrictions there).
- Core file downloads: a provider's `fetch` option applies only to that provider's requests. The hooks that accept `createDownload({ fetch })` are the `download` option of `transcribe` and `experimental_generateVideo`, and the `experimental_download` option of `generateText`, `streamText`, `experimental_decide`, and `experimental_extract`. `experimental_decide` and `experimental_extract` reject remote file URLs in `state` with `DownloadError` unless `experimental_download` is supplied; inline bytes, base64 content and data URLs need no hook. For untrusted URLs supply `createDownload({ fetch })` with a transport that validates DNS and pins the connection (such as `createGuardedFetch()` on Node.js); a model's guarded `fetch` does not protect core state downloads, and `createDownload()` without a custom `fetch` opts into the runtime's global fetch with no DNS protection. Batch download requests include the call's `abortSignal`; `createDownload` forwards it and custom download functions should too. `experimental_download` also handles generated file URLs returned by the model; without it those downloads use the runtime's global fetch.
- Do not replace `globalThis.fetch` with the guarded transport: it rejects automatic redirects and private addresses for every library in the process, including framework-internal requests. Custom tools and other application fetches need their own transport configuration.
- MCP OAuth discovery is stricter: on server runtimes, including Node.js, it blocks untrusted authorization-server hosts, redirects, token endpoints and registration endpoints unless you explicitly supply a custom fetch with connect-time DNS validation, such as `createGuardedFetch()` passed through `transport.fetch`. The runtime's global fetch does not satisfy this, even when passed explicitly. The configured MCP server origin and browser window discovery remain supported; Browser Web Workers and Service Workers without a DOM also require an explicit custom fetch. Direct callers of `fetchWithValidatedEndpoint` can opt in with `requireDnsValidation: true`; other download helpers retain their existing runtime behavior.
- Restrict outbound egress at the network layer (outbound proxy, firewall, container/network policy): block private, loopback, link-local, and cloud-metadata destinations over IPv4 and IPv6 except explicitly required internal services. This covers all libraries and runtimes; an inbound web application firewall does not control outbound requests. The SDK's URL checks and an optional guarded transport are additional application-level controls.
- Removed from this page at ai@7.0.173: the hand-rolled `undici` `Agent` with `connect.lookup` hardening example for an injected `fetch` (the official page now recommends `guarded-fetch`).
- Source: https://ai-sdk.dev/docs/advanced/secure-url-fetching (ai@7.0.173)

## Related

- [AI SDK Errors](./errors.md)
