# guides

対象 Fastify v5.12.1

| Name | Description | Path |
| --- | --- | --- |
| Testing | Application/plugin testing with `fastify.inject()`, node:test, and real HTTP clients | [testing.md](./testing.md) |
| Serverless | Deploying Fastify apps to AWS Lambda, Google Cloud Functions/Run, Firebase Functions, Netlify, Vercel | [serverless.md](./serverless.md) |
| Recommendations | Reverse proxy, performance pitfalls, Kubernetes probes, capacity planning, multiple instances | [recommendations.md](./recommendations.md) |
| Database | Official DB plugins (MySQL/Postgres/Redis/Mongo), writing custom DB plugins, migrations | [database.md](./database.md) |
| Benchmarking | Measuring performance with autocannon, branch-comparer, concurrently | [benchmarking.md](./benchmarking.md) |
| Delay Accepting Requests | Rejecting requests fast with a 503 until the server is ready (OAuth-handshake style pattern) | [delay-accepting-requests.md](./delay-accepting-requests.md) |
| Detecting When Clients Abort | Detecting intentional client request aborts via `request.raw` close/aborted | [detecting-client-abort.md](./detecting-client-abort.md) |
| Prototype Poisoning | Background on `__proto__` JSON prototype-poisoning vulnerabilities | [prototype-poisoning.md](./prototype-poisoning.md) |
| Migration Guide V5 | v4 -> v5 breaking changes, new features (Diagnostics Channel) | [migration-v5.md](./migration-v5.md) |
| Migration Guide V4 | v3 -> v4 breaking changes, codemods | [migration-v4.md](./migration-v4.md) |
| Migration Guide V3 | v2 -> v3 breaking changes | [migration-v3.md](./migration-v3.md) |
