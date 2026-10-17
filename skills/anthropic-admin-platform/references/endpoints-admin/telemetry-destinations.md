<!-- source: https://platform.claude.com/docs/en/api/beta/organization/telemetry_destinations / last verified: 2026-10-17 -->

# Telemetry Destinations Admin API (Beta)

Register OpenTelemetry (OTLP/HTTP) destinations for the organization, choose which workspaces they cover, and test delivery. Beta header: `telemetry-destinations-2026-08-11`.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/organizations/telemetry_destinations` | Create a Telemetry Destination |
| GET | `/v1/organizations/telemetry_destinations` | List Telemetry Destinations (newest first) |
| GET | `/v1/organizations/telemetry_destinations/{destination_id}` | Retrieve a Telemetry Destination |
| POST | `/v1/organizations/telemetry_destinations/{destination_id}` | Update a Telemetry Destination |
| DELETE | `/v1/organizations/telemetry_destinations/{destination_id}` | Delete a Telemetry Destination |
| POST | `/v1/organizations/telemetry_destinations/{destination_id}/test` | Test a Telemetry Destination |
| GET | `/v1/organizations/telemetry_destinations/{destination_id}/workspaces` | List Telemetry Destination Workspaces |
| POST | `/v1/organizations/telemetry_destinations/{destination_id}/workspaces/{workspace_id}` | Add a Telemetry Destination Workspace |
| DELETE | `/v1/organizations/telemetry_destinations/{destination_id}/workspaces/{workspace_id}` | Remove a Telemetry Destination Workspace |

```bash
curl https://api.anthropic.com/v1/organizations/telemetry_destinations \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: telemetry-destinations-2026-08-11' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "endpoint_url": "https://gateway.example.com/otlp",
          "workspaces": {
            "type": "all"
          }
        }'
```

## Options / Props

### Header (required for all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-beta | array containing `"telemetry-destinations-2026-08-11"` | Required beta header |
| anthropic-version | optional string | Claude API version |

### Body Parameters (Create; Update takes the same fields, all optional)

| Name | Type | Description |
|------|------|-------------|
| endpoint_url | string (create: required) | Base URL of the collector's OTLP/HTTP endpoint, e.g. `https://gateway.example.com`. `https`, hostname (not an IP), port if given must be 443, no query / fragment / credentials, max 2048 chars. A path prefix such as `/otlp` is allowed; do not include `/v1/traces` (appended on delivery) |
| workspaces | object (create: required) | `{ type: "all" }`, `{ type: "include", workspace_ids? }`, or `{ type: "exclude", workspace_ids? }`. `workspace_ids`: `wrkspc_...`, at most 100 per request |
| display_name | optional string or null | 1 to 255 characters |
| headers | optional map[string] | Sent with every delivery (e.g. `authorization`); stored encrypted and never returned (reads show only `header_names`). At most 20; names up to 128 chars, no case-only duplicates; values printable ASCII up to 4,096 chars; total at most 16,384 bytes. Reserved names rejected (`host`, `cookie`, `user-agent`, prefixes `content-`, `proxy-`, `x-forwarded-`, `anthropic-`; `_` counts as `-`) |
| traces.content_mode | optional `"metadata_only"` / `"content"` / null | Default `metadata_only`; on update `null` sets `metadata_only` |
| traces.enabled | optional boolean | Default true on create; cannot be null |
| traces.endpoint_url | optional string or null | Full traces URL for a collector using a path other than `/v1/traces`; same scheme, host and port as `endpoint_url`; max 2048 chars |
| traces.max_content_bytes | optional number (int32) or null | Max content bytes per exported span; `null` leaves only the API's maximum |
| state (update only) | `{ type: "enabled" }` or `{ type: "disabled" }` | Cannot be null |

### Query Parameters (List)

| Name | Type | Description |
|------|------|-------------|
| limit | optional number | 1 to 1,000; default 20 |
| page | optional string | Opaque `next_page` cursor |
| workspace_ids | optional array of string | At most 100, sent as `workspace_ids[]`; only destinations covering at least one of them |

List Workspaces takes `limit` (1 to 1,000, default 20) and `page`.

### BetaTelemetryDestination object

| Name | Type | Description |
|------|------|-------------|
| type | `"telemetry_destination"` | Object type |
| id | string | `tdst_...` |
| created_at / updated_at | string | `updated_at` is not moved by `delivery_health` changes; adding or removing a single list workspace does not move it, an update that changes the list does |
| display_name | string or null | |
| endpoint_url | string | Base URL as registered |
| header_names | array of string | Header values are write-only |
| state | `{ type: "enabled" }` or `{ type: "disabled", reason }` | `reason.type`: `caller`, `sustained_failure`, `invalid_address`, `redirect` (read-only) |
| traces | object | `content_mode`, `enabled`, `endpoint_url`, `max_content_bytes` |
| workspaces | `{ type: "all" / "include" / "exclude" }` | Coverage |
| delivery_health | object | `last_error`, `last_error_at`, `last_success_at` (nullable) |

Other objects: Test returns `{ type: "telemetry_destination_test", result: { type: "success" } | { type: "failure", error } }`; Delete returns `{ type: "telemetry_destination_deleted", id }`; workspace entry is `{ type: "telemetry_destination_workspace", telemetry_destination_id, workspace_id, created_at }`; remove returns `{ type: "telemetry_destination_workspace_deleted", telemetry_destination_id, workspace_id }`.

## Notes

- The API reference example uses a placeholder `endpoint_url`; replaced with an illustrative https URL that satisfies the documented constraints.
- Create: the destination starts `enabled`; an organization can have at most 10 destinations, including disabled ones. A workspace's spans go to every enabled destination that covers it.
- `content` mode: an organization with a data-handling restriction such as HIPAA cannot choose it; the API exports only metadata for such an organization, even to a destination already set to `content`.
- Update: send at least one field. Omitted fields keep their values, except registered headers, which a change of the endpoint hostname or port removes (send the new headers in the same request; if `traces.endpoint_url` is set, also set it to a URL with the new host and port, or `null`). A request that sets a header value must also include `endpoint_url`. A concurrent change returns 409 `conflict_error`: read again, then retry. Only `display_name`, `traces`, `traces.endpoint_url`, `traces.content_mode`, `traces.max_content_bytes` and individual `headers` values accept `null`.
- `workspace_ids` on update replaces the whole list. Setting `all` empties the list. After a change to `include` without IDs the destination covers no workspace; after a change to `exclude` without IDs it covers every workspace. An archived workspace cannot be added, but an update can keep one already on the list. An update that changes the type or sends `workspace_ids` is refused while the list has more than 750 workspaces (remove workspaces one at a time first). A list holds at most 1,000 workspaces.
- Add / Remove Workspace: for a destination whose `workspaces.type` is `all` (no list) the API returns 400. Adding an existing entry is a no-op returning it; removing an absent one returns 404. Under `include` adding starts delivery for that workspace, under `exclude` it stops (and vice versa for remove).
- Delivery: redirects (3xx) are never followed, and one disables the destination at once. Spans produced while disabled are not delivered later. Re-enabling does not reset `delivery_health`.
- Test sends one `anthropic.test` span once without retries; the response is 200 whether or not the destination answered 2xx. Configuration, state and `delivery_health` do not change; disabled destinations can be tested. Wait 10 seconds between tests of one destination (429 otherwise).
- Deleting removes the destination and its list; it cannot be read, listed or restored.

## Related

- [workspaces.md](./workspaces.md)
