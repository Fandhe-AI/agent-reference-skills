---
source: https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes
---

# Prepare for authorization changes (run-as identity)

Application Integration has updated how it handles identities for integration runs. The changes already apply to integrations created on or after October 15, 2026, and starting January 15, 2027 (UTC) they apply to all existing integrations. Every run must now have an explicit identity: the user who triggered the run (the called systems apply that user's access permissions) or a run-as service account that you control, scope and audit like any other service account in your project.

## Signature / Usage

### What to do (in this order)

1. Find integrations that need a run-as service account: those that run asynchronously, on a schedule or from an event, and have none (https://docs.cloud.google.com/application-integration/docs/authorization-changes-find-affected).
2. Grant Service Account User on each run-as service account and each authentication profile's service account to everyone who runs, tests, publishes or approves the integration, and to the service accounts your triggers and automation use (https://docs.cloud.google.com/application-integration/docs/authorization-changes-grant-access).
3. Set a run-as service account on each integration found, and publish it (https://docs.cloud.google.com/application-integration/docs/authorization-changes-set-run-as).

Complete step 2 before step 3: publishing with a run-as service account requires Service Account User on that account, so setting the service account first can get the publish rejected. The authentication page shows this grant of Service Account User (`roles/iam.serviceAccountUser`) on one service account to one user (replace `SERVICE_ACCOUNT_NAME`, `PROJECT_ID` and `USER_EMAIL`):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

### Try the new behavior early

- Region-wide: in the region's settings turn on **Run integrations with end user credentials**, then save. Tasks then call downstream services as the triggering user instead of a shared platform identity; runs with no triggering user fall back to an identity with no permissions.
- One integration: **Test integration** > **Execution mode** > turn on **Run asynchronously**, enter inputs and run. The run is enqueued like a real trigger with no caller credentials and reports an execution ID rather than the output.

## Options / Props

### When the updates apply

| Integration | When the updates apply |
|---|---|
| Created on or after October 15, 2026 | From the first version you create; every version you publish afterward retains the new behavior. |
| Created before October 15, 2026 | Starting January 15, 2027 (UTC). |

### Consequences

| Condition | Effect |
|---|---|
| Publish or test an integration that has a run-as service account | You need permission to act as that account; running it, approving its suspended runs and calling it from another integration will require the same permission as the rollout proceeds. |
| New integration with a scheduled or event trigger and no run-as service account | Cannot be published or tested. |
| Runs reaching a task without an identity; asynchronous runs of any integration without a run-as service account | Planned to fail in a later release. |
| Service Account User checks | Apply to every integration regardless of creation date. |
| Tests | Every test uses the new behavior, including tests started from the Console and tests of integrations created before October 15, 2026. |

## Notes

- Editing an integration does not change its stage, and a sub-integration runs in its own stage, not in the stage of the integration that calls it.
- The region setting applies to every integration in the region, including those created before October 15, 2026; a task touching a resource the triggering user cannot access starts failing with a permission error. Complete "What to do" first, then turn it on.
- An asynchronous test is refused (nothing queued) if any configuration value differs from the saved version; save the integration first.
- Troubleshooting: https://docs.cloud.google.com/application-integration/docs/authorization-changes-troubleshoot. Service accounts and IAM are covered by `gcp-foundation`.
- The grant above is set on the service account itself, not on the project. Which principals need it (users, and the service accounts your triggers and automation use) and how to grant it are in https://docs.cloud.google.com/application-integration/docs/authorization-changes-grant-access.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/authentication
- Source: https://docs.cloud.google.com/application-integration/docs/authentication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/prepare-for-authorization-changes (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [configure-authentication-profiles.md](./configure-authentication-profiles.md)
- [authentication.md](./authentication.md)
