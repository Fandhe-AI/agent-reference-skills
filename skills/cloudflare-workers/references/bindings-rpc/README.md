# bindings-rpc

| Name | Description | Path |
| --- | --- | --- |
| Bindings (env) | Bindings concept, available bindings list, accessing and overriding `env` | [bindings-overview.md](./bindings-overview.md) |
| Service bindings | Worker-to-Worker calls: configuration, lifecycle, deployment, limits | [service-bindings.md](./service-bindings.md) |
| Service bindings: HTTP | Forward `Request` objects through a service binding `fetch()` | [service-bindings-http.md](./service-bindings-http.md) |
| RPC (WorkerEntrypoint) | Expose RPC methods via `WorkerEntrypoint`, named entrypoints, `env` / `ctx` | [service-bindings-rpc.md](./service-bindings-rpc.md) |
| mTLS | Present a client certificate to mTLS-enforcing services | [mtls.md](./mtls.md) |
| Rate Limiting | `limit()` binding, configuration, accuracy and locality | [rate-limit.md](./rate-limit.md) |
| Analytics SQL binding | Query analytics datasets with `query()` | [analytics-sql.md](./analytics-sql.md) |
| Version metadata | Worker version id, tag and timestamp binding | [version-metadata.md](./version-metadata.md) |
| Remote-procedure call (RPC) | Types, stubs, `RpcTarget`, promise pipelining, limitations, error handling, reserved methods | [rpc.md](./rpc.md) |
| RPC lifecycle | `using`, disposal rules, `dup()`, disposers | [rpc-lifecycle.md](./rpc-lifecycle.md) |
| RPC TypeScript | Generate `Service` / `DurableObjectNamespace` types with `wrangler types` | [rpc-typescript.md](./rpc-typescript.md) |
| RPC visibility and security model | What is exposed over RPC, capability-based security | [rpc-visibility.md](./rpc-visibility.md) |
| Secrets | Encrypted per-Worker secrets, local dev files, Wrangler and dashboard | [secrets.md](./secrets.md) |
| Environment variables | `vars` text/JSON values, environments, `process.env` | [environment-variables.md](./environment-variables.md) |
