---
source: https://docs.cloud.google.com/run/docs/authenticating/public
---

# Allow public (unauthenticated) access

Make a Cloud Run service public in one of two ways: disable the Cloud Run Invoker IAM check (recommended), or grant the Cloud Run Invoker role to the `allUsers` member type.

## Signature / Usage

### Disable the Invoker IAM check (recommended)

Cloud Run enforces the check by default. Use this approach when the project is subject to the domain restricted sharing organization policy constraint.

New service:

```bash
gcloud run deploy SERVICE_NAME --no-invoker-iam-check
```

Existing service:

```bash
gcloud run services update SERVICE_NAME --no-invoker-iam-check
```

YAML (download with `gcloud run services describe SERVICE --format export > service.yaml`, edit, then `gcloud run services replace service.yaml`):

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
    annotations:
      run.googleapis.com/invoker-iam-disabled: 'true'
    name: SERVICE_NAME
```

### Re-enable the Invoker IAM check

```bash
gcloud run services update SERVICE_NAME --invoker-iam-check
```

In YAML, set the `run.googleapis.com/invoker-iam-disabled` annotation to `'false'`.

Re-enabling the check with gcloud or YAML is not documented to remove `roles/run.invoker` bindings for `allUsers` or `allAuthenticatedUsers` (the source documents automatic removal of `allUsers` bindings only when the check is enabled in the Console), and a service that still has such a binding stays publicly invocable. Check the policy with `gcloud run services get-iam-policy SERVICE_NAME` and remove each such binding, with `PRINCIPAL` set to `allUsers` (or `allAuthenticatedUsers`) and `ROLE` set to `roles/run.invoker`:

```bash
gcloud run services remove-iam-policy-binding SERVICE_NAME \
  --member=PRINCIPAL \
  --role=ROLE
```

### Grant Invoker to `allUsers`

Adapted (not in the official docs): the source writes `[SERVICE_NAME]` in square brackets, which the shell treats as a glob; replaced with `SERVICE_NAME`.

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
  --member="allUsers" \
  --role="roles/run.invoker"
```

Replace `SERVICE_NAME` with the service name. Policy file route:

```text
bindings:
- members:
  - allUsers
  role: roles/run.invoker
```

```bash
gcloud run services set-iam-policy SERVICE policy.yaml
```

## Options / Props

| Item | Value |
|---|---|
| Permissions to disable or re-enable the check | `run.services.create`, `run.services.update`, `run.services.setIamPolicy` (all in Cloud Run Admin, `roles/run.admin`) |
| Permission to grant `allUsers` | `run.services.setIamPolicy` (in Cloud Run Admin) |
| `--no-invoker-iam-check` / `--invoker-iam-check` | Disable / re-enable the Invoker IAM check |
| `--allow-unauthenticated` | Used with `gcloud run deploy` to make the service public at deploy time (the source shows it as `gcloud run deploy [SERVICE_NAME] ... --allow-unauthenticated`) |
| Annotation | `run.googleapis.com/invoker-iam-disabled: 'true'` or `'false'` |
| Org policy | `constraints/run.managed.requireInvokerIam` restricts the ability to disable the check; not enforced by default |

## Notes

- Makes the service publicly accessible; use only for intentionally public content. Prefer disabling the Invoker IAM check (the source's recommended approach) over `allUsers`. For private services, require authentication and grant `roles/run.invoker` to specific principals.
- The `allUsers` route fails if the project is under a domain restricted sharing organization policy that restricts granting IAM roles to `allUsers`; in that case disable the Invoker IAM check instead.
- Source inconsistency: the source lists the Console **Allow public access** choice (for a new service via Deploy container, or on the Security tab) under the "disable the Invoker IAM check" method, and again under the "grant Invoker to `allUsers`" method; it does not say which mechanism the Console applies (https://docs.cloud.google.com/run/docs/securing/security equates it with `--no-invoker-iam-check`), so after using the Console check both (`--invoker-iam-check` and the service IAM policy).
- In the Console, enabling the Invoker IAM check removes any existing `roles/run.invoker` bindings for `allUsers`; re-granting is manual if you later re-enable the check.
- Source inconsistency: this page calls `constraints/run.managed.requireInvokerIam` the managed constraint and notes an additional invitation-only `constraints/run.requireInvokerIam`; the security overview page calls `run.managed.requireInvokerIam` legacy. Both are kept verbatim.
- The source shows `gcloud run deploy [SERVICE_NAME] ... --allow-unauthenticated` with a literal `...` and bracketed name, which is not runnable as written; it is described in the options table instead.
- Adapted from the official docs: the `allUsers` binding command wrote `gcloud run services add-iam-policy-binding [SERVICE_NAME]`; the square brackets are a shell glob, so it is written `SERVICE_NAME`.
- `gcloud run services set-iam-policy SERVICE policy.yaml` replaces the service's entire IAM policy: a policy file without an `etag` removes every existing binding, including `roles/run.invoker` grants to Cloud Scheduler, Cloud Tasks, Pub/Sub or other callers' service accounts. Prefer `gcloud run services add-iam-policy-binding`, or start from `gcloud run services get-iam-policy SERVICE --format yaml > policy.yaml` and add the `allUsers` binding to that file.
- `gcloud run deploy SERVICE_NAME --no-invoker-iam-check` (verbatim) has no `--image`; the deploy command defaults to source deployment (of the current directory) when neither `--image` nor `--source` is supplied (https://docs.cloud.google.com/run/docs/deploying-source-code). Add `--image IMAGE_URL` to deploy an existing image.
- The Terraform `google_cloud_run_service_iam_binding` binding for `allUsers` is authoritative only for the given role; other bindings are preserved. Being authoritative for `roles/run.invoker` means it replaces all members of that role, so existing invoker grants (for example to Cloud Scheduler, Cloud Tasks, Pub/Sub or caller service accounts) are removed; the non-authoritative `google_cloud_run_v2_service_iam_member` (used in https://docs.cloud.google.com/run/docs/deploying) adds `allUsers` without touching them. The source also shows Console and Terraform forms (not reproduced); the re-enable YAML sample in the source is mis-indented and is described in prose.
- Verify the setting after deployment by browsing to the service HTTPS endpoint.
- To make a public service private again, close both mechanisms as shown in "Re-enable the Invoker IAM check": re-enable the check and remove any `allUsers` / `allAuthenticatedUsers` binding for `roles/run.invoker`.
- Snippet taken from https://docs.cloud.google.com/run/docs/securing/managing-access: the `gcloud run services remove-iam-policy-binding` block in "Re-enable the Invoker IAM check" (verbatim; `PRINCIPAL` and `ROLE` are that page's placeholders).
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/managing-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/security (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-access.md](./managing-access.md)
- [service-to-service.md](./service-to-service.md)
- [end-users.md](./end-users.md)
