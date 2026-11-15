---
source: https://docs.cloud.google.com/apis/docs/client-libraries-explained
---

# Client libraries explained, best practices and troubleshooting

Overview of the four ways to call Google Cloud APIs programmatically (Cloud Client Libraries, Google API Client Libraries, Firebase, your own client code), where each language's Cloud Client Libraries live, best practices for using them in production, and how to troubleshoot failed API requests.

## Signature / Usage

### Choosing an approach

| Approach | Status | Transport | Notes |
| --- | --- | --- | --- |
| Cloud Client Libraries | Recommended | gRPC in some cases (source: "in some cases, give you performance benefits by using gRPC") | Idiomatic per language, consistent style, handle authentication and low-level communication, installed with `npm` / `pip` |
| Google API Client Libraries | Earlier type of client library | REST only; gRPC is not supported | Auto-generated interface code, may be less idiomatic; use when no Cloud Client Library exists for the language or the API, or when upgrading a project that already uses them |
| Firebase | Cross-platform SDKs | n/a | Apple platforms, Android, web, Flutter, Unity, C++; see the Firebase documentation |
| Your own client code | For experienced developers | JSON/REST or gRPC | See `http-guidelines.md` for REST; generate gRPC clients from the API's protocol buffers service definition (typically the `googleapis/googleapis` repository on GitHub) |

### gRPC under the hood

- gRPC-enabled Google Cloud APIs generally have both REST and RPC interfaces. Check the API's "APIs and Reference" section to see whether it is gRPC-enabled.
- A growing number of Cloud Client Libraries for gRPC-enabled APIs use gRPC internally. The source states accessing an API using gRPC can increase throughput per CPU by as much as a factor of 10 compared to the JSON REST API.
- Google plans to upgrade as many Cloud Client Libraries as possible to gRPC.

### Cloud Client Libraries by language and by service

Two contiguous rows of the source's "Cloud Client Libraries by language" table, copied verbatim:

```markdown
| Node.js | - [GitHub repo](https://github.com/googleapis/google-cloud-node) - [Library reference](https://docs.cloud.google.com/nodejs/docs/reference) |
| Python | - [GitHub repo](https://github.com/googleapis/google-cloud-python) - [Library reference](https://docs.cloud.google.com/python/docs/reference) |
```

- Rust: GitHub repo https://github.com/googleapis/google-cloud-rust, library reference https://docs.cloud.google.com/rust/docs/reference.
- The GitHub repo page of each language lists the Cloud Platform services/APIs that language's library supports, plus installation instructions.
- Libraries can also be installed per Google Cloud service; each product has a "Client Libraries" page (for example Pub/Sub: https://docs.cloud.google.com/pubsub/docs/reference/libraries). If a Cloud Client Library for a language does not support a service, use the Google API Client Library for that language.

### Best practices: reuse client objects and sessions

- Reuse the same client object for many requests instead of creating one per request; requests from one instance share authentication credential instances.
- The first request of a session client performs authentication, authorization and access token generation, which can take multiple seconds because it happens over the network.
- Later calls reuse the same access token while valid (typically one hour); after it expires the client refreshes it automatically.
- Each client instance has its own credential cache, and some authentication strategies are rate limited, so creating many clients in a short period may cause authentication failures.

### Best practices: pin dependencies, stay up to date

- Pin versions with the package manager (`npm`, `pip`) so builds use the same versions consistently. This matters most for beta clients, whose API surface can change.
- Many libraries see daily updates and releases; many support semantic versioning so you can judge the upgrade effort.
- If you see degraded performance or an issue on an older version, consider upgrading.

### Troubleshooting API requests

- Getting started: before application code, the source recommends sending test requests to the API with the `curl -v` command.
- Metrics: free API metrics cover request counts, errors, latencies and request/response sizes, with application and location dimensions. For example, higher 400 errors can mean a recently updated application has logic bugs; larger payloads can slow the application.
- Logs: Google APIs generally do not provide API logs to developers for security and privacy reasons; log API errors on the client side, locally or to a remote logging API such as Cloud Logging.
- Cloud Audit Logs cover security-sensitive activity (for example the VPC Service Controls dry run feature).

Each API error has three parts:

| Part | Use |
| --- | --- |
| Error code | Higher-level handling, such as retry after `503` or re-authenticate after `401` |
| Error message | For developers to fix application logic; do not code against messages, they change without notice |
| Error details | Extra information for programmatic handling |

## Notes

- This is the Google Cloud client library family (`@google-cloud/*`, `google-cloud-*`, `google-cloud-*` crates). It is distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill) and from `googleapis` (the Node.js "Google API Client Library" for REST discovery APIs), which is the REST-only "Google API Client Libraries" family above.
- The fenced block is copied verbatim from the `cloud-client-libraries` source table. That source table also lists Dart, Go, Java, Ruby, PHP, C# and C++; those rows are dropped here (out of scope).
- Cloud Code (VS Code, IntelliJ, Cloud Shell) can browse and enable Cloud APIs and add Cloud Client Libraries to a project without leaving the IDE.
- Per-product installation and reference live in each product's "Client Libraries" documentation (see `gcp-run` / `gcp-storage` for product-specific usage).
- Other ways to access the same APIs: Google Cloud CLI (`gcp-cli`) and the Google Cloud console.
- The best-practices source applies to both the Cloud Client Libraries and the Google API Client Libraries.
- The troubleshooting source mentions `curl -v` only inline and gives no command; no command is shown here.
- The troubleshooting source links to the API Design Guide "Errors" page (https://docs.cloud.google.com/apis/design/errors); it was not retrieved.
- Client-library-side logging is covered in the `nodejs`, `python` and `rust-setup` categories.
- Source: https://docs.cloud.google.com/apis/docs/client-libraries-explained (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/apis/docs/cloud-client-libraries (retrieved 2026-11-16; CC BY 4.0)
- Source: https://docs.cloud.google.com/apis/docs/client-libraries-best-practices (retrieved 2026-11-16; CC BY 4.0)
- Source: https://docs.cloud.google.com/apis/docs/troubleshooting (retrieved 2026-11-16; CC BY 4.0)

## Related

- [http-guidelines.md](./http-guidelines.md)
- [system-parameters.md](./system-parameters.md)
- [nodejs-packages.md](./nodejs-packages.md)
- [python-packages.md](./python-packages.md)
- [rust-packages.md](./rust-packages.md)
