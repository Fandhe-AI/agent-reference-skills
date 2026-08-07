# Diagnostic Signatures and Logs

List aggregate backtrace signatures for recurring crashes, hangs, and disk-write exceptions captured for a build, then download the anonymized logs behind a specific signature.

## Signature / Usage

```
GET /v1/builds/{id}/diagnosticSignatures
GET /v1/diagnosticSignatures/{id}/logs
```

## Options / Props

### List all diagnostic signatures for a build

`GET /v1/builds/{id}/diagnosticSignatures`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The build's resource ID (from `GET /v1/builds`) |
| `fields[diagnosticSignatures]` | No | [string] | `diagnosticType`, `signature`, `weight`, `insight`, `logs` |
| `filter[diagnosticType]` | No | [string] | `DISK_WRITES`, `HANGS`, `LAUNCHES` |
| `limit` | No | integer | Max results (max 200) |

### Download logs for a diagnostic signature

`GET /v1/diagnosticSignatures/{id}/logs`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `id` | Yes | string | The diagnostic signature's resource ID (from the signatures list response) |
| `limit` | No | integer | Max logs to return (max 200) |

### `DiagnosticSignature` Attributes

| Field | Type | Description |
|-------|------|-------------|
| `diagnosticType` | string | `DISK_WRITES`, `HANGS`, or `LAUNCHES` |
| `signature` | string | The aggregate backtrace signature string |
| `weight` | number | Share of occurrences this signature represents (0.0–1.0) |
| `insight` | string | AI-generated insight text, when available |

### `diagnosticLogs` Response

| Field | Type | Description |
|-------|------|-------------|
| `productData[].signatureId` | string | The diagnostic signature this log data belongs to |
| `productData[].diagnosticInsights` | [object] | `insightsURL`, `insightsCategory`, `insightsString` |
| `productData[].diagnosticLogs` | [object] | `diagnosticMetaData` (event, osVersion, appVersion, deviceType) + `callStackTree` |
| `version` | string | Version of the response format |

## Notes

- `GET /v1/diagnosticSignatures/{id}/logs` returns `200 OK` with MIME type `application/vnd.apple.diagnostic-logs+json`.
- Logs are anonymized backtraces, not raw crash logs.
- Obtain the diagnostic signature `id` from the `GET /v1/builds/{id}/diagnosticSignatures` response before requesting its logs.

## Related

- [Power and Performance Metrics](./power-performance-metrics.md)
