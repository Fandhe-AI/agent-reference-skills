---
source: https://fastify.dev/docs/latest/Guides/Recommendations/
---

# Recommendations

Target: Fastify v5.12.1. Production recommendations: reverse proxy usage, performance pitfalls, Kubernetes probes, capacity planning, and running multiple instances.

## Signature / Usage

```yaml
# Kubernetes readinessProbe — Fastify must listen on 0.0.0.0, not 127.0.0.1
readinessProbe:
    httpGet:
        path: /health
        port: 4000
    initialDelaySeconds: 30
    periodSeconds: 30
    timeoutSeconds: 3
    successThreshold: 1
    failureThreshold: 5
```

## Notes

- **Use a reverse proxy** (HAProxy, Nginx) in front of Fastify for TLS termination, multi-domain routing, static assets, and horizontal scaling; running Node.js directly exposed to the Internet is an anti-pattern
- **Performance pitfalls**: prefer static/simple parametric routes over RegExp routes on hot paths; avoid expensive version constraints and async custom constraints; prefer native Fastify plugins/hooks over generic middleware; define response schemas for faster JSON serialization; keep Ajv `allErrors` disabled by default (enabling it increases per-request work and DoS risk on untrusted input)
- **Kubernetes**: `readinessProbe` uses the pod IP by default; since Fastify listens on `127.0.0.1` by default, the app must listen on `0.0.0.0` (or a custom hostname matching the probe)
- **Capacity planning**: 2 vCPU per instance minimizes latency (second vCPU serves GC/libuv threadpool); fewer vCPU per instance (even 1, or fractional in k8s) optimizes for throughput per vCPU. Measure with `autocannon` or `k6`
- **Multiple instances**: running several Fastify instances in one Node.js process (e.g. a separate metrics port) is fine; each instance only costs the load/memory it actually uses

## Related

- [testing.md](./testing.md)
- [benchmarking.md](./benchmarking.md)
