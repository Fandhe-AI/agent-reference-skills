---
source: https://servicecontrol.googleapis.com/$discovery/rest?version=v2
---

# Service Control API REST API (servicecontrol)

## Signature / Usage

Base URL: `https://servicecontrol.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `servicecontrol.services.allocateQuota`

- Versions: v1
- `POST https://servicecontrol.googleapis.com/v1/services/{serviceName}:allocateQuota`
- Attempts to allocate quota for the specified consumer. It should be called before the operation is executed. This method requires the `servicemanagement.services.quota` permission on the specified service. For more information, see Cloud IAM (https://cloud.google.com/iam). \*\*NOTE:\*\* The client \*\*must\*\* fail-open on server errors `INTERNAL`, `UNKNOWN`, `DEADLINE_EXCEEDED`, and `UNAVAILABLE`. To ensure system reliability, the server may inject these errors to prohibit any hard dependency on the quota functionality.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/servicecontrol`
- Request: `AllocateQuotaRequest`; Response: `AllocateQuotaResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | Name of the service as specified in the service configuration. For example, `"pubsub.googleapis.com"`. See google.api.Service for the definition of a service name. |

### `servicecontrol.services.check`

- Versions: v2, v1
- `POST https://servicecontrol.googleapis.com/v2/services/{serviceName}:check`
- This method provides admission control for services that are integrated with Service Infrastructure (https://cloud.google.com/service-infrastructure). It checks whether an operation should be allowed based on the service configuration and relevant policies. It must be called before the operation is executed. For more information, see Admission Control (https://cloud.google.com/service-infrastructure/docs/admission-control). NOTE: The admission control has an expected policy propagation delay of 60s. The caller \*\*must\*\* not depend on the most recent policy changes. NOTE: The admission control has a hard limit of 1 referenced resources per call. If an operation refers to more than 1 resources, the caller must call the Check method multiple times. This method requires the `servicemanagement.services.check` permission on the specified service. For more information, see Service Control API Access Control (https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/servicecontrol`
- Request: `CheckRequest`; Response: `CheckResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See google.api.Service (https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. |

### `servicecontrol.services.report`

- Versions: v2, v1
- `POST https://servicecontrol.googleapis.com/v2/services/{serviceName}:report`
- This method provides telemetry reporting for services that are integrated with Service Infrastructure (https://cloud.google.com/service-infrastructure). It reports a list of operations that have occurred on a service. It must be called after the operations have been executed. For more information, see Telemetry Reporting (https://cloud.google.com/service-infrastructure/docs/telemetry-reporting). NOTE: The telemetry reporting has a hard limit of 100 operations and 1MB per Report call. This method requires the `servicemanagement.services.report` permission on the specified service. For more information, see Service Control API Access Control (https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/servicecontrol`
- Request: `ReportRequest`; Response: `ReportResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `serviceName` | path | string | yes | The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See google.api.Service (https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. |

### Example request skeleton

Generated from the Discovery entry of `servicecontrol.services.allocateQuota` (not in the official docs); replace the `{...}` path variables:

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://servicecontrol.googleapis.com/v1/services/{serviceName}:allocateQuota"
```

## Notes

- Generated from the Discovery document(s) v2, v1 of `servicecontrol` (retrieved 2026-11-14). Resources on this page: services.
- Message schemas are listed under `references/rest-schemas/servicecontrol/`.
- Source: https://servicecontrol.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
