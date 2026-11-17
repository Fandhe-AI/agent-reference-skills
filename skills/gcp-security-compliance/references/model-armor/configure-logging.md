---
source: https://docs.cloud.google.com/model-armor/configure-logging
---

# Configure logging

Model Armor can log template create / update / read / delete operations and sanitize operations (user prompts and model responses). Logging is configured in template metadata (`logTemplateOperations`, `logSanitizeOperations`) and in floor settings (per integration: Agent Platform and Google and Google Cloud MCP servers). Cloud Audit Logs and platform logs are different log types.

## Signature / Usage

### Prerequisites

Ask your administrator to grant the Model Armor Admin role (`roles/modelarmor.admin`) on the template. Enable the API (needs `serviceusage.services.enable`, for example via Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

```bash
gcloud services enable modelarmor.googleapis.com
```

Set the API endpoint override if you use a region or multi-region other than the default `us` multi-region:

```bash
gcloud config set api_endpoint_overrides/modelarmor "https://modelarmor.LOCATION.rep.googleapis.com/"
```

### Log operations in a template (REST)

```bash
curl -X POST \
    -d '{ "filterConfig": {}, "templateMetadata": { "logTemplateOperations": true, "logSanitizeOperations": true } }' \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates?template_id=TEMPLATE_ID"
```

### Log sanitize operations in floor settings

gcloud (`--no-enable-vertex-ai-cloud-logging` and `--no-enable-google-mcp-server-cloud-logging` disable):

```bash
gcloud model-armor floorsettings update \
--full-uri='projects/PROJECT_ID/locations/global/floorSetting' \
--enable-vertex-ai-cloud-logging \
--enable-google-mcp-server-cloud-logging
```

REST (`aiPlatformFloorSetting.enableCloudLogging` and `googleMcpServerFloorSetting.enableCloudLogging`):

```bash
curl -X PATCH \
 -d '{ "aiPlatformFloorSetting":{ "enableCloudLogging": true}, "googleMcpServerFloorSetting":{ "enableCloudLogging": true}}' \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://modelarmor.googleapis.com/v1/projects/PROJECT_ID/locations/global/floorSetting?updateMask=aiPlatformFloorSetting.enableCloudLogging,googleMcpServerFloorSetting.enableCloudLogging"
```

### View and filter logs (Logs Explorer queries)

All Model Armor logs:

```text
protoPayload.serviceName="modelarmor.googleapis.com" OR jsonPayload.@type="type.googleapis.com/google.cloud.modelarmor.logging.v1.SanitizeOperationLogEntry"
```

Audit logs only:

```text
protoPayload.serviceName="modelarmor.googleapis.com"
```

Sanitization operation logs only:

```text
jsonPayload.@type="type.googleapis.com/google.cloud.modelarmor.logging.v1.SanitizeOperationLogEntry"
```

By client name:

```text
jsonPayload.@type="type.googleapis.com/google.cloud.modelarmor.logging.v1.SanitizeOperationLogEntry"
labels."modelarmor.googleapis.com/client_name"="CLIENT_NAME"
```

By correlation ID:

```text
jsonPayload.@type="type.googleapis.com/google.cloud.modelarmor.logging.v1.SanitizeOperationLogEntry"
labels."modelarmor.googleapis.com/client_correlation_id"="CORRELATION_ID"
```

Requests where an exclusion rule (Preview) overrode a filter result:

```text
jsonPayload.@type="type.googleapis.com/google.cloud.modelarmor.logging.v1.SanitizeOperationLogEntry"
labels."modelarmor.googleapis.com/exclusion_rule_overridden_filters":"FILTER_NAME"
```

### Correlate logs with a client correlation ID

Set the `MA-Client-Correlation-Id` header to a unique ID you generate (for example a UUID).

Adapted (not in the official docs): the source wrote `uuid=$(uuidgen) \` followed by `curl`, which makes `uuid` a one-command environment prefix so `${uuid}` expands empty (and is unset for the second request); the assignment is now a separate command.

```bash
uuid=$(uuidgen)

curl -X POST -d  '{"userPromptData": { "text": "USER_PROMPT" } }' \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "MA-Client-Correlation-Id:${uuid}" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID:sanitizeUserPrompt"

curl -X POST \
    -d  '{"modelResponseData": { "text": "MODEL_RESPONSE" }, "userPrompt": "USER_PROMPT" }' \
    -H "Content-Type: application/json" \
    -H "MA-Client-Correlation-Id:${uuid}" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID:sanitizeModelResponse"
```

## Options / Props

### Template metadata flags

| Field | Description |
|---|---|
| `log_template_operations` (`logTemplateOperations`) | Boolean; logs create, update, read and delete template operations. |
| `log_sanitize_operations` (`logSanitizeOperations`) | Boolean; logs the full content of user prompts and model responses during sanitize operations. |

### Client names (`CLIENT_NAME`)

| Value | Integration |
|---|---|
| `CLIENT_NAME_UNSPECIFIED` | Default, when not specified. |
| `VERTEX_AI` | Gemini Enterprise Agent Platform. |
| `LOAD_BALANCER` | Load balancer as a service extension. |
| `LANGCHAIN` | LangChain. |
| `GEMINI_ENTERPRISE_BUSINESS` | Gemini Enterprise - Business edition. |
| `GOOGLE_MCP_SERVER` | Google and Google-managed MCP servers. |
| `AGENT_GATEWAY` | Agent Gateway. |
| `GEMINI_ENTERPRISE_NON_BUSINESS` | Gemini Enterprise editions other than Business (Standard, Plus, Frontline). |
| `SECURE_WEB_PROXY` | Secure Web Proxy. |

### Exclusion rule labels (Preview)

| Label | Description |
|---|---|
| `modelarmor.googleapis.com/exclusion_rule_overridden_filters` | Comma-separated filters whose `MATCH_FOUND` or `EXECUTION_SKIPPED` results were overridden to `NO_MATCH_FOUND` by an exclusion rule. |
| `modelarmor.googleapis.com/exclusion_rule_skipped_filters` | Comma-separated filters whose exclusion rule evaluation was skipped (for example input over 130,000 tokens (0.5 MB), the exclusion payload limit). `FILTER_NAME` is `PROMPT_INJECTION_AND_JAILBREAK` or `RESPONSIBLE_AI`. |

### Cloud Audit Logs versus platform logs

| Feature | Cloud Audit Logs | Platform logs |
|---|---|---|
| Purpose | Security auditing of API calls and compliance. | Operational monitoring, debugging, analysis of sanitization events. |
| Captured | Create, read, update, delete, list on templates and floor settings; sanitize calls as metadata. | All requests such as `SanitizeUserPrompt` and `SanitizeModelResponse`. |
| Payload | No prompt or response text; metadata only (caller, method, resource, timestamp, status). | Full payload including prompt or response text and filter results. |
| Enabling | IAM audit log settings; template operation audit logs are generated automatically; data access logs often need explicit enablement. | `log_sanitize_operations` in template metadata or floor settings. |
| Volume / cost | Smaller, predictable. | Can be very large; large payloads may be split into multiple entries. |
| Sensitivity | Relatively safe. | Contains potentially sensitive user data (PII, confidential data); visible to anyone with log viewing permissions such as `roles/logging.privateLogViewer`. |
| Recommendation | Enable for general security and compliance monitoring. | Not recommended for production or sensitive data unless routed to an access-controlled sink (for example BigQuery with strict IAM). |

## Notes

- Enabling logging in a template writes raw prompts and responses to Cloud Logging; this can include PII and confidential data, can cause high log volume and cost, and needs careful management. Do not enable it for sensitive data without a restricted log destination.
- In the console, floor settings sanitize logging is enabled by default for Agent Platform and disabled by default for MCP servers.
- With data residency requirements, configure a log sink to a compliant storage location before enabling Cloud Logging (see Regionalize your logs).
- For Google and Google Cloud MCP servers, set up traffic sanitization through floor settings.
- Audit logs record the caller in `protoPayload.authenticationInfo.principalEmail`: the user or service account for direct calls; a Google-managed service agent (`service-PROJECT_NUMBER@SERVICE_NAME.iam.gserviceaccount.com`) when called through an integrated service such as Agent Platform.
- Logging is charged at Cloud Logging pricing (https://cloud.google.com/stackdriver/pricing); Model Armor usage charges might also apply (https://cloud.google.com/security-command-center/pricing#model-armor-pricing).
- Corrected from the official docs: the correlation ID sample began with `uuid=$(uuidgen) \` followed by `curl -X POST ...`; as a one-command prefix assignment, `${uuid}` expanded empty in the headers, so the assignment is now a separate command.
- Console steps and Python client samples are omitted; see the source page.
- Source: https://docs.cloud.google.com/model-armor/configure-logging (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [model-armor-vertex-integration.md](./model-armor-vertex-integration.md)
- [integrations.md](./integrations.md)
- [best-practices.md](./best-practices.md)
