<!-- source: https://platform.claude.com/docs/en/manage-claude/opentelemetry/api / last verified: 2026-10-17 -->

# Set up OpenTelemetry with the Claude API

Add a destination in the Claude Console (or via the Admin API) so the API sends spans for Messages API requests and Managed Agents sessions to your OTLP/HTTP endpoint, without code changes.

## Signature / Usage

Create a destination with the Admin API (beta header `telemetry-destinations-2026-08-11`):

```bash
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/telemetry_destinations" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: telemetry-destinations-2026-08-11" \
  -H "content-type: application/json" \
  -d '{
    "endpoint_url": "https://gateway.example.com/otlp",
    "headers": {"authorization": "Bearer YOUR_OBSERVABILITY_API_KEY"},
    "traces": {"content_mode": "metadata_only"},
    "workspaces": {"type": "all"}
  }'
```

CLI equivalent:

```bash
ant auth login --profile admin --scope "org:admin"
ant --profile admin beta:organization:telemetry-destinations create \
  --endpoint-url https://gateway.example.com/otlp \
  --headers '{authorization: "Bearer YOUR_OBSERVABILITY_API_KEY"}' \
  --traces.content-mode metadata_only \
  --workspaces.type all
```

## Options / Props

Console destination fields:

| Name | Type | Description |
|------|------|-------------|
| Provider | select | Your platform, or **Custom**. A listed platform asks for its own details instead of OTLP endpoint URL / Request headers / OTLP traces endpoint URL |
| Name | string | Optional |
| OTLP endpoint URL | string | Base HTTPS URL with a hostname (not an IP); may have a path prefix; do not add `/v1/traces` (the API adds it) |
| Request headers | map | Headers sent with each request; credentials only in values; values are not shown again after saving |
| Content mode | select | Metadata only or Full content |
| Workspaces | select | **All**, **Selected**, or **All except** |
| OTLP traces endpoint URL | string | Optional (Advanced). Full traces URL when not `<endpoint>/v1/traces`; must have the same host as the OTLP endpoint URL |
| Maximum content size in MB | number | Optional (Advanced, Full content only). Empty sends as much as the API allows |

Limits:

| Limit | Value |
|-------|-------|
| Destinations per organization (disabled included) | 10 |
| Workspaces selected per destination | 1,000 |
| Request headers per destination | 20 |
| Header name length | 128 bytes |
| Header value length | 4,096 bytes |
| All header names and values together | 16,384 bytes |
| Endpoint URL length | 2,048 characters |

Delivery states: **Healthy** (last delivery succeeded), **Failing** (last failed), **No data** (no attempt yet), **Disabled** (no spans delivered).

Delivery errors:

| Error | Likely cause |
|-------|--------------|
| HTTP 401 / 403 | Wrong authentication header |
| HTTP 404 | Wrong path in OTLP endpoint URL or OTLP traces endpoint URL |
| DNS resolution failure | Hostname does not resolve |
| TLS failure | Certificate or TLS problem |
| Timeout | Endpoint did not respond in time |
| Connection failure | API could not connect |

## Notes

- Requires the admin role in the Console organization to add or change destinations (developer role can view). On Claude Platform on AWS, requests go to `https://aws-external-anthropic.{region}.api.aws` signed with AWS credentials, and the IAM policy decides who manages destinations.
- Requires an OTLP/HTTP endpoint accepting protobuf at an HTTPS URL on port 443 (an OpenTelemetry Collector listens on 4318 by default; front it with HTTPS on 443 or a proxy).
- After delivery the data is held by the chosen service, outside Anthropic, under that service's retention and access controls.
- Test a destination with **Test** in **More actions**; confirm the `anthropic.test` span arrives. Filter on `service.name` = `claude-platform` to find API spans.
- Delivery rules: at least once (deduplicate by trace ID + span ID); best effort (lost spans are not resent); first request of each delivery is gzip-compressed (`Content-Encoding: gzip`) and resent uncompressed on `400` / `415`; retried a limited number of times on timeout, connection / TLS / DNS failure, or `408` / `429` / `5xx`; TLS handshake and response headers each within 5 seconds, 10 seconds total per delivery; `User-Agent: Claude-Platform`.
- The API disables a destination when the endpoint sends a `3xx` redirect, the hostname resolves to a non-public IP, or all deliveries fail for 24 hours. Fix the cause, then **Enable** from **More actions** with the **Workspace** filter on **All**. If you change the host of the OTLP endpoint URL, re-enter header values and align or clear the traces endpoint URL.
- Spans go to every enabled destination covering the workspace where the request or session runs.
- The API reads trace context from the W3C `traceparent` header; if its sampled flag is off, the API emits no spans for that request. With the SDK, call it inside your own span; with other clients, inject `traceparent` into request headers.
- With the MCP connector, the API passes a W3C `traceparent` in `params._meta` of each request to your MCP server (in `tools/call`, it references the `anthropic.mcp_tool_use` span; otherwise `anthropic.messages.create`). No `traceparent` is sent for untraced requests.
- Troubleshooting: no API spans means no enabled destination covers the workspace (can take up to a minute after a change); no prompts or responses under Full content may mean a HIPAA / FERPA / K-12 restriction.

## Related

- [opentelemetry.md](./opentelemetry.md)
- [opentelemetry-sdk.md](./opentelemetry-sdk.md)
- [spans.md](./spans.md)
- [workspaces](../admin-api/workspaces.md)
