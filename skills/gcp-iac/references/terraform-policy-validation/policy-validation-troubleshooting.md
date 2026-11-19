---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/troubleshooting
---

# Troubleshoot policy validation

Common problems when running `gcloud beta terraform vet`: a violation that does not fire, a "no project defined" error, and an Error 403 while resolving resource ancestry (Preview feature).

## Signature / Usage

### Base validation command

The command below is the validation command without extra flags. To troubleshoot, re-run it with `--verbosity=debug` to see unsupported-resource messages and the identity used for API requests, and provide a default project with the `--project` flag or with `gcloud config`.

```bash
gcloud beta terraform vet tfplan.json --policy-library=POLICY_LIBRARY_DIR
```

### Check which resource a constraint targets

1. Check the `kind` field of the constraint, for example `GCPAppengineLocationConstraintV1`.
2. Search `policies/templates` for a template whose `spec.crd.spec.names.kind` has the same value.
3. In its `rego` field look for the CAI Asset Type, for example `asset.asset_type == "appengine.googleapis.com/Application"`.
4. Make sure that CAI Asset Type is in the supported resources list.

## Options / Props

### Why is an expected violation not thrown?

| Check | What to verify |
|-------|----------------|
| Policy library set up correctly | It contains a `policies/constraints` directory with the constraint you expect to violate |
| Resource is supported | Only resources supported by your version are checked; look for `unsupported resource: google_resource_name` in `--verbosity=debug` output, or check the supported resources list |
| Constraint targets the correct resource | See the steps under Usage |

### Errors

| Error | Cause and fix |
|-------|---------------|
| `project: required field is not set` | Resource ancestry is used to build an accurate CAI Asset Name and could not be determined; set a default with `--project` or `gcloud config` |
| `getting resource ancestry for project PROJECT_ID: googleapi: Error 403: The caller does not have permission, forbidden` | See the identity checks below |

### Identity checks for the 403 error

Run with `--verbosity=debug` and look for `Terraform is using this identity:` followed by an email address.

| Observation | Action |
|-------------|--------|
| No email address | Make sure authentication is working properly |
| Email is not the service account you wanted to impersonate | Make sure service account impersonation is set up correctly |
| Correct email | Make sure it has `getIamPolicy` and `resourcemanager.projects.get` on the project |

## Notes

- Preview feature (Pre-GA Offerings Terms apply).
- The troubleshooting page has no code. Snippet taken from https://docs.cloud.google.com/docs/terraform/policy-validation/validate-policies
- Source inconsistency: the 403 checks list the permission as `getIamPolicy` without a service prefix; for projects, the quickstart page names `resourcemanager.projects.getIamPolicy`.
- `--verbosity`, `--project` and `--impersonate-service-account` are gcloud-wide flags (gcloud 593.0.0 help for `gcloud beta terraform vet`).
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/troubleshooting (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [validate-policies.md](./validate-policies.md)
- [create-cai-constraints.md](./create-cai-constraints.md)
- [quickstart.md](./quickstart.md)
