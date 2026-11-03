# samples

| Name | Description | Path |
| --- | --- | --- |
| Cache data with Workers KV | Read-through cache in a Worker: return JSON from Workers KV if present, otherwise fetch it and store it with an expiration TTL. | [kv-cache-data.md](./kv-cache-data.md) |
| Build a distributed configuration store | Sync per-user configuration from Postgres into Workers KV through the REST API (bulk update), then read it in a Worker. | [kv-distributed-config.md](./kv-distributed-config.md) |
| Route requests across various web servers | Look up a per-tenant origin URL in Workers KV and proxy the request to that origin. | [kv-request-routing.md](./kv-request-routing.md) |
| Store and retrieve static assets | Upload a file to Workers KV with Wrangler and serve any key as an HTTP path from a Worker. | [kv-serve-static-assets.md](./kv-serve-static-assets.md) |
| Generate dynamic responses from key-value pairs | Store a JSON translations file in Workers KV and return a localized HTML page based on the Accept-Language header. | [kv-translated-responses.md](./kv-translated-responses.md) |
| Query D1 from Hono | Query a D1 binding through c.env.DB in a Hono app, as a Worker and as a Pages Function. | [d1-hono-worker.md](./d1-hono-worker.md) |
| Query D1 from Python Workers | Bind a D1 database to a Python Worker and run a query via self.env.DB. | [d1-python-worker.md](./d1-python-worker.md) |
| Query D1 from Remix | Query D1 in a Remix loader through context.cloudflare.env.DB and render it with useLoaderData. | [d1-remix-loader.md](./d1-remix-loader.md) |
| Query D1 from SvelteKit | Query D1 from a SvelteKit server endpoint via platform.env.DB, with app types and the Cloudflare adapter configured. | [d1-sveltekit-endpoint.md](./d1-sveltekit-endpoint.md) |
| Build a Comments API | JSON API on Workers with Hono and D1: create the schema, then GET and POST comments per post slug. | [d1-comments-api.md](./d1-comments-api.md) |
| Build an API to access D1 using a proxy Worker | A bearer-authenticated Hono Worker that exposes D1 run, exec and batch over HTTP for clients outside Workers. | [d1-http-proxy-api.md](./d1-http-proxy-api.md) |
| Bulk import to D1 using REST API | Import SQL into D1 through the REST API import flow: init, upload to the returned URL, ingest, then poll. | [d1-rest-api-import.md](./d1-rest-api-import.md) |
| Use D1 read replication with sessions and bookmarks | Use db.withSession() and bookmarks stored in a cookie so reads from replicas stay consistent with earlier writes, with a retry helper. | [d1-read-replication-sessions.md](./d1-read-replication-sessions.md) |
| Query D1 using Prisma ORM | Query a D1 binding from a Worker with Prisma Client and the @prisma/adapter-d1 driver adapter. | [d1-prisma-orm.md](./d1-prisma-orm.md) |
| Use R2 with the AWS SDK for JavaScript v3 | Point @aws-sdk/client-s3 at the R2 endpoint, list buckets, and generate presigned GET and PUT URLs. | [r2-s3-aws-sdk-js-v3.md](./r2-s3-aws-sdk-js-v3.md) |
| Use R2 with Python boto3 | Configure a boto3 S3 client for R2, run common object operations, and generate presigned URLs. | [r2-s3-boto3.md](./r2-s3-boto3.md) |
| Use R2 with aws4fetch | Sign S3-compatible requests to R2 with the dependency-free aws4fetch package and produce presigned URLs from a Worker. | [r2-s3-aws4fetch.md](./r2-s3-aws4fetch.md) |
| Use R2 with the aws CLI | Configure an aws CLI profile for R2 and list buckets, list objects, and presign a URL. | [r2-s3-aws-cli.md](./r2-s3-aws-cli.md) |
| Use R2 with rclone | Add an R2 remote to rclone, then list, copy, and presign objects. | [r2-rclone.md](./r2-rclone.md) |
| Use the Cache API with R2 | Serve R2 objects from a Worker and store them in Cloudflare's cache with the Workers Cache API. | [r2-workers-cache-api.md](./r2-workers-cache-api.md) |
| Log and store upload events in R2 with event notifications | Consume R2 event notifications from a queue in a Worker and write each batch as a JSON log object to a second bucket. | [r2-event-notifications-log-sink.md](./r2-event-notifications-log-sink.md) |
| Authenticate against the R2 API using auth tokens | Read an object over the S3 API using credentials from environment variables, in JavaScript, Python, and Go. | [r2-s3-auth-tokens.md](./r2-s3-auth-tokens.md) |
| Manage an R2 bucket with Terraform | Create an R2 bucket with the Cloudflare Terraform provider. | [r2-terraform-bucket.md](./r2-terraform-bucket.md) |
| Serverless time-series API with Timescale and Hyperdrive | Worker that ingests and queries time-series readings in Timescale (PostgreSQL) through a Hyperdrive binding and the pg driver. | [hyperdrive-timescale-api.md](./hyperdrive-timescale-api.md) |
