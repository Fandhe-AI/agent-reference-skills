---
source: https://docs.cloud.google.com/application-integration/docs/test-publish-integrations
---

# Test and publish integrations

Test or publish an integration from the integration editor after configuring triggers, tasks and edges. Testing from the console runs the integration in synchronous mode. Publishing deploys an integration version and puts it in the active state; unpublishing undeploys it and puts it in a snapshot state.

## Signature / Usage

### Test, publish and unpublish through the API

Methods: `projects.locations.integrations.test`, `projects.locations.integrations.versions.publish`, `projects.locations.integrations.versions.unpublish`. For `test`, the `clientId` request-body field is required and must be your Google Cloud project number (not the project ID). Set the flow timeout with the `X-Server-Timeout` header (default 120 seconds).

No request example is given for these methods.

### Invoke the published integration

After publishing, an integration with an API trigger is invoked synchronously with `projects.locations.integrations.execute`; the call also shows the `X-Server-Timeout` header:

```bash
curl -X POST \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -H "X-Server-Timeout: TIMEOUT_SECONDS" \
    -d '{"triggerId":"api_trigger/TRIGGER_NAME"}' \
    "https://LOCATION-integrations.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/integrations/-:execute"
```

## Options / Props

### Required roles (on the project)

| Action | Role | Permission |
|--------|------|-----------|
| Test an integration | Application Integration Invoker (`roles/integrations.integrationInvoker`) | `integrations.integrations.invoke` |
| Publish an integration | Application Integration Deployer (`roles/integrations.integrationDeployer`) | `integrations.integrationVersions.deploy` |
| Test and publish | Application Integration Editor (`roles/integrations.integrationEditor`) contains both permissions | both |

### Test pane actions (console)

| Action | Effect |
|--------|--------|
| Edit input variables | Change input values |
| Retest integration | Run again |
| Restore values | Restore the values |
| View logs | Execution logs of the test run |
| View Cloud logs | Cloud Logging, if Cloud Logging is enabled |
| Edit integration | Edit without creating a new version |
| Close | Return to the editor |

## Notes

- If the integration uses a run-as service account, you also need Service Account User (`roles/iam.serviceAccountUser`) on that service account to test or publish it (see the authorization-changes grant page: https://docs.cloud.google.com/application-integration/docs/authorization-changes-grant-access).
- Integrations with suspension-based tasks (Approval, Suspend, Timer) cannot be tested before publishing.
- Publishing a version automatically unpublishes any previously published version, and all services that relied on it use the latest published version.
- Unpublishing an active version automatically stops all services that rely on it. Try on a disposable project first; do not unpublish a version that live triggers use unless intended.
- A published integration is locked from editing by default; **Enable editing** creates a new version.
- Best practice: define input / output variables before testing, and define error handling.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-api-trigger (the test and publish page has no code block).
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/test-publish-integrations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [error-handling.md](./error-handling.md)
- [configure-api-trigger.md](./configure-api-trigger.md)
