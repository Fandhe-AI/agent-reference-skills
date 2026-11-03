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

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    switch (request.method) {
      case "PUT": {
        await env.MY_BUCKET.put(key, request.body, {
          onlyIf: request.headers,
          httpMetadata: request.headers,
        });
        return new Response(`Put ${key} successfully!`);
      }
      case "GET": {
        const object = await env.MY_BUCKET.get(key, {
          onlyIf: request.headers,
          range: request.headers,
        });

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        // When no body is present, preconditions have failed
        return new Response("body" in object ? object.body : undefined, {
          status: "body" in object ? 200 : 412,
          headers,
        });
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
