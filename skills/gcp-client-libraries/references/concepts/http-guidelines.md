---
source: https://docs.cloud.google.com/apis/docs/http
---

# Cloud APIs overview and HTTP guidelines

Google Cloud APIs are network APIs exposed on subdomains of `googleapis.com` (for example `pubsub.googleapis.com`) with both JSON HTTP and gRPC interfaces, reachable over the public internet and VPC networks. This page lists the facts to know before choosing a client, then how Google APIs work with HTTP versions and implementations, which matters when you write your own REST client (client libraries handle it for you): HTTP/1.1 vs HTTP/2 vs HTTP/3, request formats, streaming, cancellation, keep-alive and flow control.

## Signature / Usage

### Cloud APIs: facts to know before choosing a client

| Topic | Statement in the source |
| --- | --- |
| API kinds | Resource-based APIs use the project of the accessed resources for billing and quota; client-based APIs use the project of the accessing client |
| HTTP | All Cloud APIs provide a JSON HTTP interface (callable directly or via Google API Client Libraries) |
| gRPC | Most Cloud APIs also provide gRPC, callable via Google Cloud Client Libraries, which provide better performance and usability |
| TLS | All Cloud APIs accept only secure requests using TLS encryption; client libraries handle in-transit encryption |
| Private access | Private Service Connect sets up private access to Cloud APIs within VPC networks |
| Design | All Cloud APIs use resource-oriented design (API Design Guide); interface definitions live in the `googleapis/googleapis` GitHub repository |
| Quotas | All Cloud APIs enforce rate limits and resource quotas; lowering your own quota limits can also control spending; file quota increase requests if defaults are insufficient |
| Monitoring | Most Cloud APIs show per-project traffic levels, error rates and latencies in the API Dashboard; custom dashboards and alerts in Cloud Monitoring |

Besides client libraries, the overview lists Firebase SDKs (mobile apps), third-party clients, Google Cloud CLI, the Google Cloud console and Google Cloud MCP servers as access paths.

### Wire protocols

- Supported: HTTP/1.1, HTTP/2, HTTP/3 (QUIC). HTTP/1.0 is highly discouraged. HTTP/3 or HTTP/2 is recommended.
- By default, Google APIs only accept HTTPS traffic; TLS negotiation and TLS versions are transparent to client applications.
- HTTP/1.1: always reuse TCP connections (`Connection: Keep-Alive`); avoid HTTP pipelining.
- HTTP/2 uses one TCP connection per origin, HTTP/3 one QUIC connection over UDP per origin. Servers or the Google Front End (GFE) can limit concurrent streams per connection (for example 100).

### Long request URLs

URLs are practically limited to about 16KB. Over-long GET URLs are rejected by the GFE with `Your client has issued a malformed or illegal request.` Work around it with a POST using `Content-Type: application/x-www-form-urlencoded` plus the header `X-HTTP-Method-Override: GET` (also works for DELETE).

### HTTP verbs

| HTTP Verb | Safe | Idempotent |
| --- | --- | --- |
| `GET` | Yes | Yes |
| `PUT` |  | Yes |
| `DELETE` |  | Yes |
| `POST` |  |  |
| `PATCH` |  |  |

`DELETE` for non-existing resources should return `404 (Not Found)`.

### Payloads

- Request and response bodies use `application/json` (proto3 to JSON mapping); request and response should share the same Content-Type except for GET or form-encoded POST.
- Form parameters (`POST`, `application/x-www-form-urlencoded`) can replace URL query parameters.
- Streamed RPC methods use a JSON array body; the array may contain messages or an error-status message appended as the last element.

Stream encodings and the padding message as given in the source:

```text
Example client stream encoding:
1 <length> <message-bytes> 1 <length> <message-bytes>  ... EOF

Example server stream encoding:
1 <length> <message-bytes>  ... 2 <length> <status-bytes> EOF
```

```proto
message StreamBody {
  repeated bytes message = 1;
  google.rpc.Status status = 2;
  repeated bytes padding = 15;   // max one-byte tag-id: xxx01111
}
```

### Streaming

- HTTP-based cloud APIs are restricted to half-duplex streaming. Bidi streaming methods assume full-duplex by default, so it is not safe to invoke them over HTTP unless the API documents half-duplex behavior.
- Browsers support server-streaming (XHR or Fetch); APIs needing browser support must avoid client-streaming and full-duplex streaming or provide a separate browser API.
- Client-streaming over the internet is less useful than server-streaming (it tends to produce stateful services).

### Cancellation, keep-alive, flow control

- No reliable cancellation for HTTP/1.\*: a TCP FIN is not a cancellation. Explicit cancellation exists with SPDY, HTTP/2 and QUIC.
- Cancellation also matters for non-streaming APIs (long polling).
- No keep-alive in HTTP/1.1 (TCP keep-alive is not viable); HTTP/2 and QUIC have control messages for it. Reliable keep-alive and failure detection for long streams likely need a client library with server-side support.
- Flow control: HTTP/1.1 relies on TCP; HTTP/2 has stream-level flow control on top of TCP; QUIC manages flow control itself.

## Notes

- Use the Cloud Client Libraries instead of custom HTTP clients for most workloads; they handle the low-level communication described here. gRPC transport details are in `client-libraries-explained.md`.
- If you write your own gRPC client you must authenticate with Google (which requires TLS) following the gRPC authentication guide.
- The overview source lists step-by-step tutorials for Node.js and Python (Cloud Billing Budget API, Cloud Logging, Speech-to-Text); its Go and Java tutorials are out of scope here.
- Distinct from the `google-genai` Gemini SDK (`google-gemini-api` skill). Project creation and API enabling belong to `gcp-foundation`.
- Source: https://docs.cloud.google.com/apis/docs/overview (retrieved 2026-11-16; CC BY 4.0)
- Source: https://docs.cloud.google.com/apis/docs/http (retrieved 2026-11-16; CC BY 4.0)

## Related

- [client-libraries-explained.md](./client-libraries-explained.md)
- [system-parameters.md](./system-parameters.md)
