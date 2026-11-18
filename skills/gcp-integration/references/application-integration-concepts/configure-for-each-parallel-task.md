---
source: https://docs.cloud.google.com/application-integration/docs/configure-for-each-parallel-task
---

# For Each Parallel task

The For Each Parallel task runs other integrations (sub-integrations) from the main integration, in parallel, one thread per item of an array. The API Trigger ID is the handle: for `api_trigger/APITriggerX`, the task runs all sub-integrations with that trigger ID.

## Signature / Usage

The task uses the API **Trigger ID** as the handle that identifies the sub-integrations to run. With the following Trigger ID, the task runs all sub-integrations that have this trigger ID:

```text
api_trigger/APITriggerX
```

## Options / Props

| Group | Parameter | Type | Description |
|-------|-----------|------|-------------|
| Array Selection | `List to iterate` | Array of string, integer, double or JSON | One parallel sub-integration thread per value |
| Sub-integration Details | `API Trigger ID` | String | Trigger ID of the published sub-integration (in its API Trigger) |
| Sub-integration Details | `Execution strategy` | N/A | `SYNC`: main integration waits for sub-integrations; `ASYNC`: does not wait |
| Sub-integration Details | `Run all integrations with this API Trigger ID` | N/A | Runs every integration with that trigger ID for each item; sub-integration responses are not available in the main integration |
| Sub-integration Details | `Run a single integration` | N/A | Runs only the integration in **Integration name**; outputs can be collected |
| On each execution | `Where to map individual array elements` | String | Sub-integration input variable that receives each element |
| On each execution | `Map to additional sub-integration input(s)` | String | Key-value mapping: main-integration variable to sub-integration input (for example `productID` to `subIntProductID`) |
| On each execution | `Collect values from sub-integration output(s)` | String | Only with SYNC and a single sub-integration: collect output variables into array variables |
| Execution Settings | `Integrations to execute at a time (parallel)` | Integer | Default `50`, maximum `10000`; each cohort finishes completely before the next starts |
| Execution Settings | `Ignore failures` | Boolean | True: ignore sub-integration failures and run all executions; False: fail and end all executions |

## Notes

- Run-as authorization change: the fallback to the default service account when no service account is attached is as the source states it. Per https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes, every run must now have an explicit identity (the triggering user or a run-as service account); this already applies to integrations created on or after October 15, 2026 and to every test, and applies to all existing integrations starting January 15, 2027 (UTC). Do not rely on the default-service-account fallback for new integrations; see prepare-for-authorization-changes.md.
- Prerequisites: attach a user-managed service account to the integration (otherwise the default service account `service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com` is used) and grant it the Application Integration Invoker role.
- Best practices: set the cohort size based on quota limits of the sub-integrations; use SYNC to collect sub-integration output; use ASYNC when a sub-integration may run longer than 2 minutes.
- Do not use SYNC if a sub-integration takes longer than 2 minutes or if you combine the task with naturally asynchronous tasks such as the Approval task.
- Usage limits: https://docs.cloud.google.com/application-integration/docs/quotas#usage-limits
- Source: https://docs.cloud.google.com/application-integration/docs/configure-for-each-parallel-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-for-authorization-changes.md](../application-integration-data-auth-ops/prepare-for-authorization-changes.md)
- [configure-api-trigger.md](./configure-api-trigger.md)
- [tasks.md](./tasks.md)
- [error-handling.md](./error-handling.md)
