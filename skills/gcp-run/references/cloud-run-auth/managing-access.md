---
source: https://docs.cloud.google.com/run/docs/securing/managing-access
---

# Control access with IAM

Use IAM roles to control who can create, update, delete, and invoke Cloud Run services, jobs, worker pools, and instances, per resource or project-wide. By default only project owners and editors can create, update, delete, or invoke resources, and only owners and Cloud Run Admins can modify IAM policies (for example, to make a service public).

## Signature / Usage

### Add or remove principals on a resource

Services (the same pattern applies to `jobs` with `JOB_NAME`, `worker-pools` with `WORKER_POOL`, and `gcloud beta run instances` with `INSTANCE_NAME`):

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
  --member=PRINCIPAL \
  --role=ROLE
```

```bash
gcloud run services remove-iam-policy-binding SERVICE_NAME \
  --member=PRINCIPAL \
  --role=ROLE
```

`PRINCIPAL` example: `user:email@domain.com` (see https://docs.cloud.google.com/iam/docs/principal-identifiers). `ROLE` example: `roles/run.invoker`.

### View principals

```bash
gcloud run services get-iam-policy SERVICE_NAME
```

```bash
gcloud run jobs get-iam-policy JOB_NAME
```

```bash
gcloud run worker-pools get-iam-policy WORKER_POOL
```

```bash
gcloud beta run instances get-iam-policy INSTANCE_NAME
```

### Bulk add or remove with a policy file

Adapted (not in the official docs): the source leaves `ROLE` and `PRINCIPAL` unquoted, which is invalid JSON; they are quoted here (for example `"roles/run.invoker"` and `"user:email@domain.com"`).

```bash
cat <<EOF > policy.json
{
  "bindings": [
    {
      "role": "ROLE",
      "members": [
        "PRINCIPAL"
      ]
    }
  ]
}
EOF
```

```bash
gcloud run services set-iam-policy SERVICE_NAME policy.json
```

`set-iam-policy` replaces the whole policy. Equivalent commands: `gcloud run jobs set-iam-policy JOB_NAME policy.json`, `gcloud run worker-pools set-iam-policy WORKER_POOL policy.json`, `gcloud beta run instances set-iam-policy INSTANCE_NAME policy.json`.

### Grant a role on all resources in a project

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=PRINCIPAL \
  --role=ROLE
```

`PROJECT_ID` is the project ID (not the project number). `ROLE` example: `roles/run.admin`.

### Conditional invoker access (IAM Conditions)

Supported condition attributes: `request.host` and `request.path`, for invoking services and worker pools. The `--condition` flag must include the key-value pairs `expression` and `title`.

```text
gcloud run services add-iam-policy-binding SERVICE_NAME \
    --member=PRINCIPAL \
    --role=ROLE \
    --region=REGION \
    --condition=[KEY=VALUE,...]
```

`SERVICE_NAME` is the service name (for example `my-service`), `REGION` is the region (for example `europe-west1`), and `KEY=VALUE` are condition pairs (`expression` and `title`).

## Options / Props

| Role | Description |
|---|---|
| Cloud Run Admin (`roles/run.admin`) | Create, update, delete services, jobs, worker pools; get, list, delete job executions; invoke services and jobs; cancel executions; get and set IAM policies; view, apply, dismiss recommendations. Needs additional configuration to deploy services |
| Cloud Run Developer (`roles/run.developer`) | Same management as Admin but can get, not set, IAM policies |
| Cloud Run Viewer (`roles/run.viewer`) | View services, jobs, executions, worker pools; get IAM policies; view recommendations |
| Cloud Run Invoker (`roles/run.invoker`) | Invoke services and jobs; cancel job executions |
| Cloud Run Source Developer (`roles/run.sourceDeveloper`) | Deploy and manage source-deployed resources |
| Cloud Run Builder (`roles/run.builder`) | Build Cloud Run functions and source-deployed services |
| Cloud Run Service Invoker (`roles/run.servicesInvoker`) | Invoke services |
| Cloud Run Jobs Executor (`roles/run.jobsExecutor`) | Execute and cancel jobs |
| Cloud Run Jobs Executor With Overrides (`roles/run.jobsExecutorWithOverrides`) | Execute and cancel jobs with overrides |

Project-level rule: the `allUsers` and `allAuthenticatedUsers` principal types can't be applied at the project level and must be added to each service individually.

## Notes

- Making a service public (disabling the Invoker IAM check with `--no-invoker-iam-check`, or granting `roles/run.invoker` to `allUsers`) makes it publicly accessible; use only for intentionally public content. The source recommends disabling the Invoker IAM check over `allUsers`. Full commands, required permissions (`run.services.create`, `run.services.update`, `run.services.setIamPolicy`), and the domain restricted sharing caveat are on [public.md](./public.md); this page repeats them.
- Source inconsistency: this page calls `constraints/run.managed.requireInvokerIam` the managed constraint (not enforced by default) and mentions an invitation-only `constraints/run.requireInvokerIam`; the security overview calls `run.managed.requireInvokerIam` legacy.
- In the Console, enabling the Invoker IAM check removes existing `roles/run.invoker` bindings for `allUsers`. With gcloud (`--invoker-iam-check`) or YAML this is not documented, so check the policy and remove any `allUsers` / `allAuthenticatedUsers` binding for `roles/run.invoker` with `gcloud run services remove-iam-policy-binding` as well (see "Re-enable the Invoker IAM check" in [public.md](./public.md)).
- Functions created with `gcloud functions` or the Cloud Functions v2 APIs for backward compatibility: see https://docs.cloud.google.com/functions/docs/concepts/iam
- Prefer granting roles per resource over project-wide, with the minimum set of permissions.
- Adapted from the official docs: the source's bulk policy JSON shows `"role": ROLE` and `PRINCIPAL` unquoted; quoted here so the JSON is valid.
- The source also shows Console steps for each resource and a Terraform `google_cloud_run_service_iam_binding` form (authoritative only for the given role); not reproduced. Being authoritative for a role, it replaces all members of that role (for `roles/run.invoker`, existing grants to service accounts such as Cloud Scheduler, Cloud Tasks, Pub/Sub or other callers are removed); a non-authoritative `google_cloud_run_v2_service_iam_member` resource adds one member without touching the others.
- Source inconsistency: this page lists "cancel job executions" under Cloud Run Invoker; https://docs.cloud.google.com/run/docs/execute/jobs requires Cloud Run Developer to cancel job executions and says the required permission is `run.executions.cancel` since September 16, 2024. The IAM roles reference (https://docs.cloud.google.com/iam/docs/roles-permissions/run) lists no `run.executions.cancel` in `roles/run.invoker`; its permissions are `run.instances.invoke`, `run.jobs.run` and `run.routes.invoke`.
- Source: https://docs.cloud.google.com/run/docs/securing/managing-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/execute/jobs (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/run (IAM roles and permissions reference)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [public.md](./public.md)
- [developers.md](./developers.md)
- [service-to-service.md](./service-to-service.md)
- Cloud Run IAM roles: https://docs.cloud.google.com/run/docs/reference/iam/roles
