---
source: https://docs.cloud.google.com/application-integration/docs/configure-api-trigger
---

# API trigger

API triggers invoke executions of an integration directly. They let you set request and response payloads with trigger-specific input and output variables, generate and view the OpenAPI Specification of the integration, and invoke it synchronously or asynchronously. After publishing, the `projects.locations.integrations.execute` method invokes the trigger in synchronous mode.

## Signature / Usage

### Invoke an API trigger (syntax)

```bash
curl -X POST \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -H "X-Server-Timeout: TIMEOUT_SECONDS" \
    -d '{"triggerId":"api_trigger/TRIGGER_NAME"}' \
    "https://LOCATION-integrations.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/integrations/-:execute"
```

### Example

Invokes the `test_API_1` trigger of an integration in `us-east1` in project `demo-project`:

```bash
curl -X POST \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -H "X-Server-Timeout: 300" \
    -d '{"triggerId":"api_trigger/test_API_1"}' \
    "https://us-east1-integrations.googleapis.com/v1/projects/demo-project/locations/us-east1/integrations/-:execute"
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `TIMEOUT_SECONDS` | Timeout for the API call; default 120 seconds |
| `TRIGGER_NAME` | Name of the API trigger in the integration |
| `PROJECT_ID` | Google Cloud project ID |
| `LOCATION` | Region of the integration, for example `us-east1` |

### Trigger configuration fields

| Field | Description |
|-------|-------------|
| Label | Visible name of the trigger |
| Notes | Additional information |
| Trigger ID | Unique ID in the format `api_trigger/TRIGGER_NAME`; an integration can have several API triggers |
| Input variables | Trigger-specific variables for the request payload |
| Output variables | Trigger-specific variables for the response payload |

## Notes

- The cumulative size of all input variables can be at most 8 MB; above that the integration does not run and you get an error.
- Variables created in the trigger pane are added to that trigger; variables from the Variables pane are accessible by all elements. Changing a variable's type affects all elements that use it.
- This page covers invoking with the v1 API; the generated OpenAPI Specification may include other versions such as v2.
- The example call sends an OAuth access token from `gcloud auth print-access-token` in the `authorization` header. The API trigger documentation does not name the IAM permission needed to call `execute`; the test-and-publish documentation names `integrations.integrations.invoke` (Application Integration Invoker) for testing, see [test-publish-integrations.md](./test-publish-integrations.md).
- Source: https://docs.cloud.google.com/application-integration/docs/configure-api-trigger (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [variables.md](./variables.md)
- [test-publish-integrations.md](./test-publish-integrations.md)
- [configure-for-each-parallel-task.md](./configure-for-each-parallel-task.md)
