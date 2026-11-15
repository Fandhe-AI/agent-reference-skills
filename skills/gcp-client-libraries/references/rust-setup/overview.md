---
source: https://docs.cloud.google.com/rust/docs/overview
---

# Rust SDK overview

The Rust SDK for Google Cloud (Cloud Client Libraries for Rust) supports Cloud Storage, Vertex AI, Secret Manager and over 150 other services. Each service has its own crate, added with Cargo.

## Signature / Usage

### Add a service crate

```bash
cargo add google-cloud-secretmanager-v1
```

### Features of the SDK

- Rust efficiency: zero-cost abstractions and fine-grained memory management.
- Robustness: ownership model and type system help prevent common bugs like null pointer dereferences, data races and memory leaks at compile time.
- Scalability: `async` / `await` with the Tokio runtime.
- Tooling: Cargo, a collection of crates, community support.
- Idiomatic client libraries and tools supported by Google Cloud.

### Related products and tools

| Product | Use |
|---------|-----|
| Cloud Run | Deploy containerized Rust web applications and services |
| Google Kubernetes Engine (GKE) | Orchestrate containerized Rust applications |
| Compute Engine | Run Rust applications on virtual machines |
| Cargo | Add Google Cloud client libraries and other dependencies |
| Docker | Package Rust applications as container images |

### Community and support

- GitHub repository: `https://github.com/googleapis/google-cloud-rust`
- Google Cloud Discussion Community: `https://discuss.google.dev/c/google-cloud/14`

## Notes

- Snippet taken from https://docs.cloud.google.com/rust/docs/quickstart (the overview page itself has no code).
- This is the Google Cloud client library for Rust (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill). Product-specific usage lives in `gcp-run` and `gcp-storage`.
- Source: https://docs.cloud.google.com/rust/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [supported-rust-versions.md](./supported-rust-versions.md)
- [initialize-client.md](./initialize-client.md)
