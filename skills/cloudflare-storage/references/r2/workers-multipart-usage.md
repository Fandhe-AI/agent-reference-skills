---
source: https://developers.cloudflare.com/r2/api/workers/workers-multipart-usage/
---

# Use the R2 multipart API from Workers

A Worker that exposes an HTTP API (actions `mpu-create`, `mpu-uploadpart`, `mpu-complete`, `mpu-abort`, `get`, `delete`) so applications can perform multipart uploads through it. Assumes an R2 binding is configured.

## Signature / Usage

Adapted (not in the official docs): added a pre-shared-secret authorization check (403 before any bucket operation) and the `AUTH_KEY_SECRET` binding, and `await` was added to `multipartUpload.abort()` in the `mpu-abort` branch; see Notes.

```ts
interface Env {
  MY_BUCKET: R2Bucket;
  AUTH_KEY_SECRET: string; // set with `npx wrangler secret put AUTH_KEY_SECRET`
}

export default {
  async fetch(
    request,
    env,
    ctx
  ): Promise<Response> {
    // Reject unauthorized callers before touching the bucket
    if (
      !env.AUTH_KEY_SECRET ||
      request.headers.get("X-Custom-Auth-Key") !== env.AUTH_KEY_SECRET
    ) {
      return new Response("Forbidden", { status: 403 });
    }

    const bucket = env.MY_BUCKET;

    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    const action = url.searchParams.get("action");

    if (action === null) {
      return new Response("Missing action type", { status: 400 });
    }

    // Route the request based on the HTTP method and action type
    switch (request.method) {
      case "POST":
        switch (action) {
          case "mpu-create": {
            const multipartUpload = await bucket.createMultipartUpload(key);
            return new Response(
              JSON.stringify({
                key: multipartUpload.key,
                uploadId: multipartUpload.uploadId,
              })
            );
          }
          case "mpu-complete": {
            const uploadId = url.searchParams.get("uploadId");
            if (uploadId === null) {
              return new Response("Missing uploadId", { status: 400 });
            }

            const multipartUpload = env.MY_BUCKET.resumeMultipartUpload(
              key,
              uploadId
            );

            interface completeBody {
              parts: R2UploadedPart[];
            }
            const completeBody: completeBody = await request.json();
            if (completeBody === null) {
              return new Response("Missing or incomplete body", {
                status: 400,
              });
            }

            // Error handling in case the multipart upload does not exist anymore
            try {
              const object = await multipartUpload.complete(completeBody.parts);
              return new Response(null, {
                headers: {
                  etag: object.httpEtag,
                },
              });
            } catch (error: any) {
              return new Response(error.message, { status: 400 });
            }
          }
          default:
            return new Response(`Unknown action ${action} for POST`, {
              status: 400,
            });
        }
      case "PUT":
        switch (action) {
          case "mpu-uploadpart": {
            const uploadId = url.searchParams.get("uploadId");
            const partNumberString = url.searchParams.get("partNumber");
            if (partNumberString === null || uploadId === null) {
              return new Response("Missing partNumber or uploadId", {
                status: 400,
              });
            }
            if (request.body === null) {
              return new Response("Missing request body", { status: 400 });
            }

            const partNumber = parseInt(partNumberString);
            const multipartUpload = env.MY_BUCKET.resumeMultipartUpload(
              key,
              uploadId
            );
            try {
              const uploadedPart: R2UploadedPart =
                await multipartUpload.uploadPart(partNumber, request.body);
              return new Response(JSON.stringify(uploadedPart));
            } catch (error: any) {
              return new Response(error.message, { status: 400 });
            }
          }
          default:
            return new Response(`Unknown action ${action} for PUT`, {
              status: 400,
            });
        }
      case "GET":
        if (action !== "get") {
          return new Response(`Unknown action ${action} for GET`, {
            status: 400,
          });
        }
        const object = await env.MY_BUCKET.get(key);
        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        return new Response(object.body, { headers });
      case "DELETE":
        switch (action) {
          case "mpu-abort": {
            const uploadId = url.searchParams.get("uploadId");
            if (uploadId === null) {
              return new Response("Missing uploadId", { status: 400 });
            }
            const multipartUpload = env.MY_BUCKET.resumeMultipartUpload(
              key,
              uploadId
            );

            try {
              await multipartUpload.abort();
            } catch (error: any) {
              return new Response(error.message, { status: 400 });
            }
            return new Response(null, { status: 204 });
          }
          case "delete": {
            await env.MY_BUCKET.delete(key);
            return new Response(null, { status: 204 });
          }
          default:
            return new Response(`Unknown action ${action} for DELETE`, {
              status: 400,
            });
        }
      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { Allow: "PUT, POST, GET, DELETE" },
        });
    }
  },
} satisfies ExportedHandler<Env>;
```

Deploy with `npx wrangler deploy`. Client script (Python) uploading parts through the Worker:

```python
def upload_file(worker_endpoint, filename, partsize):
    url = f"{worker_endpoint}{filename}"

    # Create the multipart upload
    uploadId = requests.post(url, params={"action": "mpu-create"}).json()["uploadId"]

    part_count = math.ceil(os.stat(filename).st_size / partsize)
    # Create an executor for up to 25 concurrent uploads.
    executor = concurrent.futures.ThreadPoolExecutor(25)
    # Submit a task to the executor to upload each part
    futures = [
        executor.submit(upload_part, filename, partsize, url, uploadId, index)
        for index in range(part_count)
    ]
    concurrent.futures.wait(futures)
    # get the parts from the futures
    uploaded_parts = [future.result() for future in futures]

    # complete the multipart upload
    response = requests.post(
        url,
        params={"action": "mpu-complete", "uploadId": uploadId},
        json={"parts": uploaded_parts},
    )
```

## Notes

- State management: Workers are stateless, so multipart state (`uploadId` and uploaded parts) must be tracked outside the Worker. The example keeps it in the client, enabling parallel and unordered part uploads. Alternatively track it in a Durable Object or other database.
- Responses carry state: `mpu-create` returns `uploadId`; `mpu-uploadpart` returns the part number and `etag`; the client sends them back when completing.
- Using multipart through a Worker allows files larger than the Workers request body size limit; each part is still subject to that limit.
- Minimum part size 5 MB except the last part; the example script uses 10 MB parts and a retry policy.
- Corrected from the official docs: the `mpu-abort` branch calls `multipartUpload.abort()` without `await`, so the surrounding `try`/`catch` cannot catch a rejected promise (`abort()` returns `Promise<void>`); `await` was added.
- Adapted from the official docs: added an authorization check; the official example is unauthenticated and must not be deployed as is. Clients must then send `X-Custom-Auth-Key` on every request (add it as `headers=` in the Python `requests` calls).
- The Python snippet is an excerpt of `upload_file`; the official page also defines the `upload_part` helper it calls.
- Consider a framework such as Hono for routing as complexity grows.

## Related

- [Use R2 from Workers](./workers-api-usage.md)
- [Workers API reference](./workers-api-reference.md)
- [Upload objects](./objects-upload.md)
