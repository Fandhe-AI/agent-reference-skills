---
source: https://developers.cloudflare.com/r2/api/workers/workers-api-usage/
---

# Use R2 from Workers

Bind an R2 bucket to a Worker and perform read, write, list, and delete operations, with authorization logic inside the Worker.

## Signature / Usage

```sh
npm create cloudflare@latest -- r2-worker
npx wrangler r2 bucket create <YOUR_BUCKET_NAME>
npx wrangler r2 bucket list
```

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

Adapted (not in the official docs): calls `authorizeRequest` (defined in the authorization block below) before the `switch`, returns 412 when a conditional `put()` returns `null`, and returns 206 with `Content-Range` / 304 / 412 for range and conditional GETs (`failedPreconditionStatus` evaluates conditions in RFC 9110 order), and ignores `Range` when `If-Range` is present; see Notes.

```js
// Decide 412 vs 304 for a GET whose R2 preconditions failed (RFC 9110 order):
// If-Match / If-Unmodified-Since failures -> 412 (take precedence);
// only If-None-Match / If-Modified-Since failures -> 304.
function failedPreconditionStatus(headers, object) {
  const tags = (value) => value.split(",").map((t) => t.trim());
  const weak = (tag) => tag.replace(/^W\//, "");
  const uploadedSec = Math.floor(object.uploaded.getTime() / 1000);

  const ifMatch = headers.get("If-Match");
  if (ifMatch !== null) {
    // strong comparison
    if (ifMatch.trim() !== "*" && !tags(ifMatch).includes(object.httpEtag)) {
      return 412;
    }
  } else if (headers.has("If-Unmodified-Since")) {
    if (uploadedSec > Date.parse(headers.get("If-Unmodified-Since")) / 1000) {
      return 412;
    }
  }

  const ifNoneMatch = headers.get("If-None-Match");
  if (ifNoneMatch !== null) {
    // weak comparison
    if (
      ifNoneMatch.trim() === "*" ||
      tags(ifNoneMatch).map(weak).includes(weak(object.httpEtag))
    ) {
      return 304;
    }
  } else if (headers.has("If-Modified-Since")) {
    if (uploadedSec <= Date.parse(headers.get("If-Modified-Since")) / 1000) {
      return 304;
    }
  }

  return 412;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (!authorizeRequest(request, env, key)) {
      return new Response("Forbidden", { status: 403 });
    }

    switch (request.method) {
      case "PUT": {
        const stored = await env.MY_BUCKET.put(key, request.body, {
          onlyIf: request.headers,
          httpMetadata: request.headers,
        });
        // put() returns null when the precondition fails (nothing is stored)
        if (stored === null) {
          return new Response("Precondition Failed", { status: 412 });
        }
        return new Response(`Put ${key} successfully!`);
      }
      case "GET": {
        // R2 does not evaluate If-Range; when it is present, ignore Range
        // (RFC 9110 allows this) and serve the full object with 200
        const object = await env.MY_BUCKET.get(key, {
          onlyIf: request.headers,
          range: request.headers.has("If-Range") ? undefined : request.headers,
        });

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        // When no body is present, preconditions have failed:
        // pick 412 or 304 by evaluating the conditions in RFC 9110 order
        if (!("body" in object) || object.body === undefined) {
          return new Response(null, {
            status: failedPreconditionStatus(request.headers, object),
            headers,
          });
        }

        // Range request: 206 with Content-Range
        let status = 200;
        if (
          request.headers.has("Range") &&
          !request.headers.has("If-Range") &&
          object.range
        ) {
          const r = object.range;
          const start =
            "suffix" in r ? object.size - r.suffix : (r.offset ?? 0);
          const length =
            "suffix" in r ? r.suffix : (r.length ?? object.size - start);
          headers.set(
            "Content-Range",
            `bytes ${start}-${start + length - 1}/${object.size}`,
          );
          status = 206;
        }
        return new Response(object.body, { status, headers });
      }
      case "DELETE": {
        await env.MY_BUCKET.delete(key);
        return new Response("Deleted!");
      }
      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  }
}
```

Authorization (pre-shared header for writes, allow-list for reads):

```js
const ALLOW_LIST = ["cat-pic.jpg"];

// Check requests for a pre-shared secret
const hasValidHeader = (request, env) => {
	return request.headers.get("X-Custom-Auth-Key") === env.AUTH_KEY_SECRET;
};

function authorizeRequest(request, env, key) {
	switch (request.method) {
		case "PUT":
		case "DELETE":
			return hasValidHeader(request, env);
		case "GET":
			return ALLOW_LIST.includes(key);
		default:
			return false;
	}
}
```

```sh
npx wrangler secret put AUTH_KEY_SECRET
npx wrangler deploy
curl https://your-worker.dev/cat-pic.jpg -X PUT --header "X-Custom-Auth-Key: *********" --data-binary 'test'
```

## Notes

- Adapted from the official docs: the official Worker example never calls `authorizeRequest`, so it serves the bucket unauthenticated. The `fetch` handler above calls it before the `switch` and returns 403 on denial (the authorization block must be included in the same Worker).
- Corrected from the official docs: the official example returns "Put successfully" even when a conditional `put()` returned `null` (precondition failed, nothing stored); it now returns 412.
- Corrected from the official docs: the official example returns 200 for range requests and 412 for every bodyless `get()` result. Range requests now return 206 with `Content-Range`. The 304/412 choice follows RFC 9110 evaluation order: failed `If-Match` / `If-Unmodified-Since` return 412 and take precedence; only failed `If-None-Match` / `If-Modified-Since` (GET/HEAD) return 304; any other bodyless result falls back to 412. A missing object is still 404.
- Adapted from the official docs: R2 does not evaluate `If-Range`, so honouring `Range` with it present could return a 206 for a representation the client no longer holds. The handler ignores `Range` when `If-Range` is present (RFC 9110 lets a server ignore `Range`) and returns the full object with 200.
- `wrangler dev` runs against local storage by default; set `"remote": true` on the R2 binding to use a real bucket.
- A request body can only be read once; use `request.clone()` if `request.formData()` was already used. Workers have a 128 MB memory limit per Worker; prefer Streams for large files.
- Adding the unauthenticated example code exposes the bucket publicly; define authorization in the Worker.
- Use `curl --data-binary` (not `--data` / `-d`) for uploads, otherwise files are truncated.
- For jurisdictional buckets see the Wrangler configuration documentation (cloudflare-wrangler skill); bindings in general are covered by the cloudflare-workers skill.

## Related

- [Workers API reference](./workers-api-reference.md)
- [Use the R2 multipart API from Workers](./workers-multipart-usage.md)
- [Get started: Workers API](./get-started-workers-api.md)
- [Data location](./reference-data-location.md)
