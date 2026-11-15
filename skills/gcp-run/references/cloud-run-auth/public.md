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
- In the Console, enabling the Invoker IAM check removes any existing `roles/run.invoker` bindings for `allUsers`; re-granting is manual if you later re-enable the check.
- Source inconsistency: this page calls `constraints/run.managed.requireInvokerIam` the managed constraint and notes an additional invitation-only `constraints/run.requireInvokerIam`; the security overview page calls `run.managed.requireInvokerIam` legacy. Both are kept verbatim.
- The source shows `gcloud run deploy [SERVICE_NAME] ... --allow-unauthenticated` with a literal `...` and bracketed name, which is not runnable as written; it is described in the options table instead.
- Adapted from the official docs: the `allUsers` binding command wrote `gcloud run services add-iam-policy-binding [SERVICE_NAME]`; the square brackets are a shell glob, so it is written `SERVICE_NAME`.
- `gcloud run services set-iam-policy SERVICE policy.yaml` replaces the service's entire IAM policy: a policy file without an `etag` removes every existing binding, including `roles/run.invoker` grants to Cloud Scheduler, Cloud Tasks, Pub/Sub or other callers' service accounts. Prefer `gcloud run services add-iam-policy-binding`, or start from `gcloud run services get-iam-policy SERVICE --format yaml > policy.yaml` and add the `allUsers` binding to that file.
- `gcloud run deploy SERVICE_NAME --no-invoker-iam-check` (verbatim) has no `--image`; the deploy command defaults to source deployment (of the current directory) when neither `--image` nor `--source` is supplied (https://docs.cloud.google.com/run/docs/deploying-source-code). Add `--image IMAGE_URL` to deploy an existing image.
- The Terraform `google_cloud_run_service_iam_binding` binding for `allUsers` is authoritative only for the given role; other bindings are preserved. The source also shows Console and Terraform forms (not reproduced); the re-enable YAML sample in the source is mis-indented and is described in prose.
- Verify the setting after deployment by browsing to the service HTTPS endpoint.
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-access.md](./managing-access.md)
- [service-to-service.md](./service-to-service.md)
- [end-users.md](./end-users.md)
