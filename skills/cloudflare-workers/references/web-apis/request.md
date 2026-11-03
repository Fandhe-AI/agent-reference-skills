---
source: https://developers.cloudflare.com/workers/runtime-apis/request/
---

# Request

The `Request` interface represents an HTTP request and is part of the Fetch API.

## Signature / Usage

The incoming `request` parameter received from the `fetch()` handler is immutable. Construct a new `Request` to modify it:

```js
export default {
	async fetch(request, env, ctx) {
        const url = "https://example.com";
        const modifiedRequest = new Request(url, request);
		// ...
	},
};
```

Constructor:

```js
let request = new Request(input, options)
```

- `input` string | Request: either a string that contains a URL, or an existing `Request` object.
- `options` options (optional): settings to apply to the `Request`.

## Options / Props

### Constructor `options`

| Name | Type | Description |
|------|------|-------------|
| `cache` | `undefined \| 'no-store' \| 'no-cache'` | Standard HTTP `cache` header. Only `cache: 'no-store'` and `cache: 'no-cache'` are supported. Any other cache header will result in a `TypeError` with the message `Unsupported cache mode: <attempted-cache-mode>`. |
| `cf` | RequestInitCfProperties | Cloudflare-specific properties that control how Cloudflare's global network handles the request. |
| `method` | `string` | The HTTP request method. The default is `GET`. In Workers, all HTTP request methods are supported, except for `CONNECT`. |
| `headers` | Headers | A `Headers` object. |
| `body` | string \| ReadableStream \| FormData \| URLSearchParams | The request body, if any. A request using the GET or HEAD method cannot have a body. |
| `redirect` | `string` | The redirect mode to use: `follow` or `manual`. The default for a new `Request` object is `follow`. The incoming `Request` property of a `FetchEvent` will have redirect mode `manual`. Workers does not implement the `error` mode from the Fetch standard: passing `redirect: "error"` throws a `TypeError` as soon as the `Request` is constructed (including inside `fetch(url, init)`), before any request is sent. Use `manual` and check the status code of the returned response instead. |
| `signal` | AbortSignal | If provided, the request can be canceled by triggering an abort on the corresponding `AbortController`. |

### The `cf` property (`RequestInitCfProperties`)

Example:

Adapted (not in the official docs): `event.request` (Service Workers syntax) replaced with the module-syntax `request` parameter; see Notes.

```js
// Disable ScrapeShield for this request (inside a fetch handler).
fetch(request, { cf: { scrapeShield: false } })
```

Invalid or incorrectly-named keys in the `cf` object will be silently ignored. Consider using TypeScript and generating types by running `wrangler types`.

| Name | Type | Description |
|------|------|-------------|
| `apps` | `boolean` | Whether Cloudflare Apps should be enabled for this request. Defaults to `true`. |
| `cacheEverything` | `boolean` | Treats all content as static and caches all file types beyond the Cloudflare default cached content. Respects cache headers from the origin web server. This is equivalent to setting the Page Rule **Cache Level** (to **Cache Everything**). Defaults to `false`. This option applies to `GET` and `HEAD` request methods only. |
| `cacheKey` | `string` | A request's cache key is what determines if two requests are the same for caching purposes. If a request has the same cache key as some previous request, then Cloudflare can serve the same cached response for both. |
| `cacheTags` | Array\<string> | Appends additional **Cache-Tag** headers to the response from the origin server. This allows for purges of cached content based on tags provided by the Worker, without modifications to the origin server. This is performed using the **Purge by Tag** feature. |
| `cacheTtl` | `number` | Forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two Page Rules: **Edge Cache TTL** and **Cache Level** (to **Cache Everything**). The value must be zero or a positive number. A value of `0` indicates that the cache asset expires immediately. This option applies to `GET` and `HEAD` request methods only. |
| `cacheTtlByStatus` | `{ [key: string]: number }` | A version of `cacheTtl` which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time and override cache instructives sent by the origin. For example: `{ "200-299": 86400, "404": 1, "500-599": 0 }`. The value can be any integer, including zero and negative integers. A value of `0` indicates that the cache asset expires immediately. Any negative value instructs Cloudflare not to cache at all. This option applies to `GET` and `HEAD` request methods only. |
| `vary` | `RequestInitCfPropertiesVary` | Controls how Cloudflare caches origin responses with a `Vary` header for a single `fetch()` request. If both `cf.vary` and Cache Rules Vary apply, `cf.vary` takes precedence for this subrequest. |
| `image` | Object \| null | Enables Image Resizing for this request. The possible values are described in "Transform images via Workers" documentation. |
| `polish` | `string` | Sets Polish mode. The possible values are `lossy`, `lossless` or `off`. |
| `resolveOverride` | `string` | Directs the request to an alternate origin server by overriding the DNS lookup. The value specifies an alternate hostname which will be used when determining the origin IP address, instead of using the hostname specified in the URL. The `Host` header of the request will still match what is in the URL. `resolveOverride` will only take effect if both the URL host and the host specified by `resolveOverride` are within your zone; otherwise the option will be ignored for security reasons. To direct a request to a host outside your zone (while keeping the `Host` header pointing within your zone), first create a CNAME record within your zone pointing to the outside host, and then set `resolveOverride` to point at the CNAME record. For security reasons, it is not possible to set the `Host` header to specify a host outside of your zone unless the request is actually being sent to that host. |
| `scrapeShield` | `boolean` | Whether ScrapeShield should be enabled for this request, if otherwise configured for this zone. Defaults to `true`. |
| `webp` | `boolean` | Enables or disables WebP image format in Polish. |

### The `cf.vary` property

The `cf.vary` object controls how Cloudflare handles request headers named by the origin `Vary` response header for a single `fetch()` request. It uses the same `default` and `headers` shape as Cache Rules Vary, and the same actions and normalization behavior as Vary. If you omit `cf.vary`, Cloudflare uses other Vary behavior for the zone, including Cache Rules Vary if configured. The origin response must include a `Vary` header for this setting to affect the cache key. A response containing `Vary: *` always bypasses cache.

| Key | Required | Description |
| --- | --- | --- |
| `default` | Yes | Configuration for any header name in the origin `Vary` response that is not included in `headers`. |
| `headers` | No | A map of lowercase request header names to configuration objects. |

If the `vary` object is present, `default` is required. An empty `vary` object is invalid. Invalid `cf.vary` configurations are ignored for that request. Each header configuration object, and the `default` object, must include an `action` key set to one of `normalize`, `passthrough`, or `bypass`.

| Header | Additional key | Description |
| --- | --- | --- |
| `accept` | `media_types` | MIME types to keep when normalizing the `Accept` header. Maximum 10 items and 255 characters per item. |
| `accept-language` | `languages` | Languages to keep when normalizing the `Accept-Language` header. Maximum 20 items and 64 characters per item. |

The `default` object and `headers` entries other than `accept` and `accept-language` support only `action`. For most deployments, set `default.action` to `bypass`, add `headers` entries for expected origin `Vary` headers, and use `normalize` for `accept` and `accept-language` unless your origin requires raw header values.

Limits and validation rules:

- Header names in `headers` must be lowercase.
- Header names can contain lowercase letters, numbers, underscores, and hyphens.
- Header names cannot exceed 128 characters.
- Header names beginning with `cf-` or `cf_` are not allowed.
- Certain hop-by-hop, cache-control, or proxy-control headers are not allowed. Examples include `connection`, `content-length`, `cache-control`, `host`, `range`, `origin`, and `x-forwarded-for`.
- `headers` can contain up to 50 entries.
- `accept.media_types` can contain up to 10 entries.
- `accept-language.languages` can contain up to 20 entries.
- Values in `media_types` and `languages` must be non-empty printable ASCII strings.

Request init fragment that normalizes `Accept` and `Accept-Language`, and bypasses cache for any other header in the origin `Vary` response:

```json
{
	"cf": {
		"vary": {
			"default": {
				"action": "bypass"
			},
			"headers": {
				"accept": {
					"action": "normalize",
					"media_types": ["text/html", "application/json"]
				},
				"accept-language": {
					"action": "normalize",
					"languages": ["en", "fr", "de"]
				}
			}
		}
	}
}
```

### Properties

All properties of an incoming `Request` object are read-only. To modify them, create a new `Request` object and pass the options to modify to its constructor.

| Name | Type | Description |
|------|------|-------------|
| `body` | ReadableStream \| null | Stream of the body contents; `null` when the request has no body. |
| `bodyUsed` | Boolean | Declares whether the body has been used in a response yet. |
| `cf` | IncomingRequestCfProperties | Properties about the incoming request provided by Cloudflare's global network. Read-only (unless created from an existing `Request`); to modify, pass new values on the `cf` key of the `init` options when creating a new `Request`. |
| `headers` | Headers | A `Headers` object. Compared to browsers, Workers imposes very few restrictions on headers (for example, `Cookie` can be set; Workers has no special understanding of cookies). |
| `method` | string | The request's method, for example `GET`, `POST`. |
| `redirect` | string | The redirect mode: `follow` or `manual`. `fetch` automatically follows redirects if `follow`; if `manual`, the `3xx` response is returned as-is. The `error` mode is not implemented and throws a `TypeError` at construction. Default for a new `Request` is `follow`; the incoming `Request` of a `FetchEvent` has `manual`. |
| `signal` | AbortSignal | The `AbortSignal` corresponding to this request. For compatibility dates on or after November 17, 2026, the signal fires an `abort` event when the client disconnects. For earlier dates, add the `enable_request_signal` compatibility flag. Use `disable_request_signal` to opt out. |
| `url` | string | The URL of the request. |

Example for `request.signal`:

```js
export default {
	async fetch(request, env, ctx) {
		// This sets up an event listener that will be called if the client disconnects from your
		// worker.
		request.signal.addEventListener("abort", () => {
			console.log("The request was aborted!");
		});

		const { readable, writable } = new IdentityTransformStream();
		sendPing(writable);
		return new Response(readable, {
			headers: { "Content-Type": "text/plain" },
		});
	},
};

async function sendPing(writable) {
	const writer = writable.getWriter();
	const enc = new TextEncoder();

	for (;;) {
		// Send 'ping' every second to keep the connection alive
		await writer.write(enc.encode("ping\r\n"));
		await scheduler.wait(1000);
	}
}
```

### `IncomingRequestCfProperties`

In addition to the standard `Request` properties, `request.cf` on an inbound `Request` contains information provided by Cloudflare's global network. All plans have access to:

| Name | Type | Description |
|------|------|-------------|
| `asn` | Number | ASN of the incoming request, for example, `395747`. |
| `asOrganization` | string | The organization which owns the ASN of the incoming request, for example, `Google Cloud`. |
| `botManagement` | Object \| null | Only set when using Cloudflare Bot Management. Object with the following properties: `score`, `verifiedBot`, `signedAgent`, `staticResource`, `ja3Hash`, `ja4`, and `detectionIds`. |
| `clientAcceptEncoding` | string \| null | If Cloudflare replaces the value of the `Accept-Encoding` header, the original value is stored here, for example, `"gzip, deflate, br"`. |
| `clientQuicRtt` | number \| undefined | The smoothed round-trip time (RTT) between Cloudflare and the client for QUIC connections, in milliseconds. Only present when the client connected over QUIC (HTTP/3). For example, `42`. |
| `clientTcpRtt` | number \| undefined | The smoothed round-trip time (RTT) between the client and Cloudflare for TCP connections, in milliseconds. Only present when the client connected over TCP (HTTP/1 and HTTP/2). For example, `22`. |
| `colo` | string | The three-letter IATA airport code of the data center that the request hit, for example, `"DFW"`. |
| `country` | string \| null | Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header, for example, `"US"`. |
| `edgeL4` | Object \| undefined | Layer 4 transport statistics for the connection between the client and Cloudflare. Contains `deliveryRate` (number): the most recent data delivery rate estimate for the connection, in bytes per second. For example, `123456`. |
| `isEUCountry` | string \| null | If the country of the incoming request is in the EU, this will return `"1"`. Otherwise, this property is either omitted or `false`. |
| `httpProtocol` | string | HTTP Protocol, for example, `"HTTP/2"`. |
| `hostMetadata` | Object \| undefined | Only populated when the incoming request is from a zone with custom hostname metadata. |
| `requestPriority` | string \| null | The browser-requested prioritization information in the request object, for example, `"weight=192;exclusive=0;group=3;group-weight=127"`. |
| `tlsCipher` | string | The cipher for the connection to Cloudflare, for example, `"AEAD-AES128-GCM-SHA256"`. |
| `tlsClientAuth` | Object \| null | Various details about the client certificate (for mTLS connections). |
| `tlsClientCiphersSha1` | string | The SHA-1 hash (Base64-encoded) of the cipher suite sent by the client during the TLS handshake, encoded in big-endian format. For example, `"GXSPDLP4G3X+prK73a4wBuOaHRc="`. |
| `tlsClientExtensionsSha1` | string | The SHA-1 hash (Base64-encoded) of the TLS client extensions sent during the handshake, encoded in big-endian format. For example, `"OWFiM2I5ZDc0YWI0YWYzZmFkMGU0ZjhlYjhiYmVkMjgxNTU5YTU2Mg=="`. |
| `tlsClientExtensionsSha1Le` | string | The SHA-1 hash (Base64-encoded) of the TLS client extensions sent during the handshake, encoded in little-endian format. For example, `"7zIpdDU5pvFPPBI2/PCzqbaXnRA="`. |
| `tlsClientHelloLength` | string | The length of the client hello message sent in a TLS handshake. For example, `"508"`. Specifically, the length of the bytestring of the client hello. |
| `tlsClientRandom` | string | The value of the 32-byte random value provided by the client in a TLS handshake (RFC 8446). |
| `tlsVersion` | string | The TLS version of the connection to Cloudflare, for example, `TLSv1.3`. |
| `city` | string \| null | City of the incoming request, for example, `"Austin"`. |
| `continent` | string \| null | Continent of the incoming request, for example, `"NA"`. |
| `latitude` | string \| null | Latitude of the incoming request, for example, `"30.27130"`. |
| `longitude` | string \| null | Longitude of the incoming request, for example, `"-97.74260"`. |
| `postalCode` | string \| null | Postal code of the incoming request, for example, `"78701"`. |
| `metroCode` | string \| null | Metro code (DMA) of the incoming request, for example, `"635"`. |
| `region` | string \| null | If known, the ISO 3166-2 name for the first level region associated with the IP address of the incoming request, for example, `"Texas"`. |
| `regionCode` | string \| null | If known, the ISO 3166-2 code for the first-level region associated with the IP address of the incoming request, for example, `"TX"`. |
| `timezone` | string | Timezone of the incoming request, for example, `"America/Chicago"`. |

### Instance methods

| Name | Returns | Description |
|------|---------|-------------|
| `clone()` | Request | Creates a copy of the `Request` object. |
| `arrayBuffer()` | Promise\<ArrayBuffer> | Resolves with an `ArrayBuffer` representation of the request body. |
| `formData()` | Promise\<FormData> | Resolves with a `FormData` representation of the request body. |
| `json()` | Promise\<Object> | Resolves with a JSON representation of the request body. |
| `text()` | Promise\<string> | Resolves with a string (text) representation of the request body. |

## Notes

- Adapted from the official docs: the `cf` example used `event.request` from Service Workers syntax; with module Workers the request is the `request` handler parameter.
- If the response is a redirect and the redirect mode is `follow`, all headers (including sensitive ones such as `Cookie` and `Authorization`) are forwarded to the redirect destination, even if it is a different hostname or domain. To avoid this, set redirect mode to `manual` and implement your own redirect policy. Redirect mode defaults to `manual` for requests that originated from the Worker's client, so this warning only applies to `fetch()`es made by a Worker that are not proxying the original request.
- The `request.cf` object is not available in the Cloudflare Workers dashboard or Playground preview editor.
- The `Request` context starts when the `fetch()` handler is called; asynchronous tasks (such as a subrequest with `fetch()`) can only be run inside it. Using `fetch()` during script startup throws an exception.
- When passing a Response promise to the fetch event `.respondWith()` method (Service Workers syntax), the request context is active during asynchronous tasks which run before the promise has settled.
- The `Content-Length` header is set automatically by the runtime; any value manually set in `Headers` is ignored. To specify a value, the `body` must be a `FixedLengthStream` or a fixed-length value such as a string or `TypedArray`. Any other `ReadableStream` body results in Chunked-Encoding.
- Workers type definitions (`@cloudflare/workers-types` or `wrangler types`) define a `Request` type including `cf`, which is not directly compatible with the `lib.dom.d.ts` `Request`; type assertions or a new `Request` may be needed.
- Workers-specific differences: the `cf` property; `headers` returns a Workers `Headers` with `getAll()` for `Set-Cookie`; incoming `Request` objects are immutable.

`FixedLengthStream` example (from the same page):

Adapted (not in the official docs): `writer.end()` replaced with `writer.close()`; see Notes.

```js
  const { writable, readable } = new FixedLengthStream(11);

  const enc = new TextEncoder();
  const writer = writable.getWriter();
  writer.write(enc.encode("hello world"));
  writer.close();

  const req = new Request('https://example.org', { method: 'POST', body: readable });
```

- Corrected from the official docs: the official `FixedLengthStream` example calls `writer.end()`, but `WritableStreamDefaultWriter` has no `end()` method (it would throw a TypeError); changed to `writer.close()`.

## Related

- [Response](./response.md)
- [Headers](./headers.md)
- [Fetch](./fetch.md)
- [TransformStream (FixedLengthStream)](./transformstream.md)
