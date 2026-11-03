---
source: https://developers.cloudflare.com/r2/api/workers/workers-api-reference/
---

# Workers API reference

The in-Worker R2 API, accessed by binding an R2 bucket to a Worker. It includes extensions and semantic differences from the S3 API.

## Signature / Usage

```jsonc
{
	"r2_buckets": [
		{
			"binding": "MY_BUCKET", // <~ valid JavaScript variable name
			"bucket_name": "<YOUR_BUCKET_NAME>"
		}
	]
}
```

Adapted (not in the official docs): added a pre-shared-secret authorization check (403 before any bucket operation); see Notes.

```js
export default {
	async fetch(request, env) {
		if (
			!env.AUTH_KEY_SECRET ||
			request.headers.get("X-Custom-Auth-Key") !== env.AUTH_KEY_SECRET
		) {
			return new Response("Forbidden", { status: 403 });
		}

		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		switch (request.method) {
			case "PUT":
				await env.MY_BUCKET.put(key, request.body);
				return new Response(`Put ${key} successfully!`);

			default:
				return new Response(`${request.method} is not allowed.`, {
					status: 405,
					headers: {
						Allow: "PUT",
					},
				});
		}
	},
};
```

Bucket methods:

```ts
head(key: string): Promise<R2Object | null>
get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | R2Object | null>
put(key: string, value: ReadableStream | ArrayBuffer | ArrayBufferView | string | null | Blob, options?: R2PutOptions): Promise<R2Object | null>
delete(key: string | string[]): Promise<void>
list(options?: R2ListOptions): Promise<R2Objects>
createMultipartUpload(key: string, options?: R2MultipartOptions): Promise<R2MultipartUpload>
resumeMultipartUpload(key: string, uploadId: string): R2MultipartUpload
```

`R2MultipartUpload` methods:

```ts
uploadPart(partNumber: number, value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob, options?: R2MultipartOptions): Promise<R2UploadedPart>
abort(): Promise<void>
complete(uploadedParts: R2UploadedPart[]): Promise<R2Object>
```

`R2ObjectBody` methods: `arrayBuffer(): Promise<ArrayBuffer>`, `text(): Promise<string>`, `json<T>(): Promise<T>`, `blob(): Promise<Blob>`; `R2Object.writeHttpMetadata(headers: Headers): void`.

Correct pagination (use `truncated`, not the count against `limit`):

```js
const options = {
	limit: 500,
	include: ["customMetadata"],
};

const listed = await env.MY_BUCKET.list(options);

let truncated = listed.truncated;
let cursor = truncated ? listed.cursor : undefined;

while (truncated) {
	const next = await env.MY_BUCKET.list({
		...options,
		cursor: cursor,
	});
	listed.objects.push(...next.objects);

	truncated = next.truncated;
	cursor = next.cursor;
}
```

## Options / Props

`R2Object` fields:

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string` | The object's key. |
| `version` | `string` | Random unique string associated with a specific upload of a key. |
| `size` | `number` | Size of the object in bytes. |
| `etag` | `string` | The etag associated with the object upload. |
| `httpEtag` | `string` | The object's etag, in quotes so as to be returned as a header. |
| `uploaded` | `Date` | Time the object was uploaded. |
| `httpMetadata` | `R2HTTPMetadata` | Various HTTP headers associated with the object. |
| `customMetadata` | `Record<string, string>` | A map of custom, user-defined metadata. |
| `range` | `R2Range` (optional) | The returned range of the object. |
| `checksums` | `R2Checksums` | The stored checksums of the object. |
| `storageClass` | `'Standard' \| 'InfrequentAccess'` | The storage class associated with the object. |
| `ssecKeyMd5` | `string` (optional) | Hex-encoded MD5 hash of the SSE-C key used for encryption. |

`R2ObjectBody` adds: `body` (`ReadableStream`), `bodyUsed` (`boolean`).

`R2GetOptions`:

| Name | Type | Description |
| --- | --- | --- |
| `onlyIf` | `R2Conditional \| Headers` | Return the object only if conditions are satisfied. |
| `range` | `R2Range \| Headers` (optional) | Restrict returned bytes: `offset`, `length`, or `suffix`. |
| `ssecKey` | `ArrayBuffer \| string` | SSE-C key; 32 bytes, hex-encoded string or ArrayBuffer. |

`R2Range`:

| Name | Type | Description |
| --- | --- | --- |
| `offset` | `number` | The byte to begin returning data from, inclusive. |
| `length` | `number` | Number of bytes to return; fewer may be returned if more are requested than exist. |
| `suffix` | `number` | Number of bytes to return from the end of the file. |

`R2PutOptions`:

| Name | Type | Description |
| --- | --- | --- |
| `onlyIf` | `R2Conditional \| Headers` | Store only if conditions are satisfied. |
| `httpMetadata` | `R2HTTPMetadata \| Headers` (optional) | HTTP headers associated with the object. |
| `customMetadata` | `Record<string, string>` (optional) | Custom user-defined metadata. |
| `md5` / `sha1` / `sha256` / `sha384` / `sha512` | `ArrayBuffer \| string` (optional) | Hash to check integrity of the received object. Only one algorithm at a time. |
| `storageClass` | `'Standard' \| 'InfrequentAccess'` | Storage class; defaults to bucket default. |
| `ssecKey` | `ArrayBuffer \| string` | SSE-C key. |

`R2MultipartOptions`: `httpMetadata`, `customMetadata`, `storageClass` (`string`), `ssecKey`.

`R2ListOptions`:

| Name | Type | Description |
| --- | --- | --- |
| `limit` | `number` (optional) | Number of results; default and maximum `1000`. May return fewer when `include` is set. |
| `prefix` | `string` (optional) | Only keys starting with the prefix are returned. |
| `cursor` | `string` (optional) | Opaque token to continue listing from a previous list. |
| `delimiter` | `string` (optional) | Character used when grouping keys. |
| `include` | `Array<string>` (optional) | `httpMetadata` and/or `customMetadata`. |

`R2Objects`:

| Name | Type | Description |
| --- | --- | --- |
| `objects` | `Array<R2Object>` | Objects matching the list request. |
| `truncated` | `boolean` | True if more results remain. |
| `cursor` | `string` (optional) | Resume token; only present if truncated is true. |
| `delimitedPrefixes` | `Array<string>` | With a delimiter, prefixes between the prefix and the next delimiter occurrence. |

`R2Conditional`: `etagMatches`, `etagDoesNotMatch` (`string`), `uploadedBefore`, `uploadedAfter` (`Date`), all optional.

`R2HTTPMetadata`: `contentType`, `contentLanguage`, `contentDisposition`, `contentEncoding`, `cacheControl` (`string`), `cacheExpiry` (`Date`), all optional.

`R2Checksums`: `md5`, `sha1`, `sha256`, `sha384`, `sha512` (`ArrayBuffer`, optional).

`R2UploadedPart`: `partNumber` (`number`), `etag` (`string`).

## Notes

- Adapted from the official docs: added an authorization check (secret binding `AUTH_KEY_SECRET` compared to the `X-Custom-Auth-Key` header); the official example is unauthenticated and must not be deployed as is.
- `get()` returns an `R2Object` with `body` undefined if a precondition fails; `put()` returns `null` if a precondition fails and the object is not stored.
- R2 writes and deletes are strongly consistent. `delete` accepts up to 1000 keys per call. `list` is lexicographically ordered and returns up to 1000 entries, possibly fewer.
- Use `httpEtag` (quoted, RFC 9110) when returning an etag in a response header.
- `include` in `list` requires compatibility date `2022-08-04` or later, or the `r2_list_honor_include` flag; otherwise it is treated as `include: ['httpMetadata', 'customMetadata']`.
- Conditional `Headers`: all conditional headers except `If-Range` are supported. A failed `get()` condition skips the body (lower latency). HTTP metadata can be overridden on GET and is echoed in the response.
- `resumeMultipartUpload` does no validation of `uploadId`. Uncompleted multipart uploads are aborted after 7 days; an `R2MultipartUpload` does not guarantee an active underlying upload, so add error handling. Parts must be uniform in size except the last.
- MD5 checksum is included by default for non-multipart objects.
- Bindings are covered by the cloudflare-workers skill and Wrangler configuration by the cloudflare-wrangler skill. R2 is Cloudflare's S3-compatible object storage; for Supabase Storage see the supabase skill, for Vercel Blob see the vercel skill.

## Related

- [Use R2 from Workers](./workers-api-usage.md)
- [Use the R2 multipart API from Workers](./workers-multipart-usage.md)
- [S3 API extensions](./s3-extensions.md)
- [Storage classes](./buckets-storage-classes.md)
