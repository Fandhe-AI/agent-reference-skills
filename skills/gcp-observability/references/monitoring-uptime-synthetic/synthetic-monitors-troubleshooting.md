---
source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create
---

# Troubleshoot synthetic monitors

Common error messages and status values (In progress, Warning, Failing) of synthetic monitors, with their causes and fixes.

## Signature / Usage

### API enablement error in the create flow

```text
An error occurred during fetching available regions: Cloud Functions API has
not been used in project PROJECT_ID before or it is disabled.
```

Verify the API is enabled; the condition resolves after enablement propagates.

### Function deleted or failed to deploy

```text
Cloud Function not found for this Synthetic monitor. Please confirm it exists or delete this monitor.
```

```text
This function has failed to deploy and will not work correctly. Please edit and redeploy
```

### Delete fails while an alerting policy uses the monitor

```json
{
  "error": {
    "code": 400,
    "message": "Request contains an invalid argument.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.DebugInfo",
        "detail": "[ORIGINAL ERROR] generic::invalid_argument: Cannot delete check 1228258045726183344. One or more alerting policies is using it.Delete the alerting policy with id projects/myproject/alertPolicies/16594654141392976482 and any other policies using this uptime check and try again."
      }
    ]
  }
}
```

## Options / Props

| Symptom | Cause and fix |
|---|---|
| Trace shows only one span for outbound HTTP requests | Service account lacks Cloud Trace Agent (`roles/cloudtrace.agent`); Editor (`roles/editor`) is also sufficient. Grant the role |
| Status `In progress` | Newly created with no data, or function failed to deploy: remove any underscore from the function name and redeploy; if the details page says the function was not found, delete the monitor; fix build / deploy errors shown on the function page |
| Status `Warning` | Execution results inconsistent: test design issue or inconsistent behavior of the target |
| Status `Failing`, `Request failed with status code 429` | Target rejected the request; change the target (`https://www.google.com` rejects synthetic monitors) |
| Status `Failing`, execution time `0ms` | Function may be out of memory: increase memory to at least 2 GiB and set CPU to `1` |
| API delete returns `INVALID_ARGUMENT` | Delete the alerting policies that monitor the monitor, then delete the monitor |

## Notes

- Deleting a monitor stops its checks and its stored results; delete alerting policies first, and try deletion on a disposable project first.
- Creation can take several minutes before the function is deployed and executed.
- The Cloud Trace Agent grant to the monitor's service account is the narrow option; Editor also works but is broad.
- Source: https://docs.cloud.google.com/monitoring/synthetic-monitors/create (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [synthetic-monitors-create.md](./synthetic-monitors-create.md)
- [synthetic-monitors-deploy.md](./synthetic-monitors-deploy.md)
