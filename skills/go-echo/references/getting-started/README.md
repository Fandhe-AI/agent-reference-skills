# getting-started

| Name | Description | Path |
|------|-------------|------|
| Customization | Replace default behaviors (logging, validation, binding, serialization, rendering, error handling, IP resolution) by setting fields on the `Echo` instance. | [customization.md](./customization.md) |
| Installation | Echo is distributed as a Go module under `github.com/labstack/echo/v5`. | [installation.md](./installation.md) |
| IP Address Resolution | Resolves the client's real IP via `Context#RealIP()`, driven by the `Echo#IPExtractor` function; choose the extractor to match the network topology in front of the app. | [ip-address.md](./ip-address.md) |
| Quickstart | Echo is a high performance, minimalist Go web framework; this page walks through a minimal "Hello, World!" server. | [quickstart.md](./quickstart.md) |
| Request Scheme and Trusted Proxies | `Context#Scheme()` reports whether a request used HTTP or HTTPS; forwarded-scheme headers are honored only when the direct peer is trusted. | [request-scheme.md](./request-scheme.md) |
