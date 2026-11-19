---
source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert
---

# DM Convert Overview

Deployment Manager Convert (DM Convert) is a Preview tool that converts Deployment Manager configurations and Jinja or Python templates into Terraform or Kubernetes Resource Model (KRM, for Config Connector) files.

## Signature / Usage

Check which resource types and type providers are supported (flag `--list_supported_types`; the full commands are on the convert page).

```bash
docker run --rm -it \
us-central1-docker.pkg.dev/dm-convert-host/deployment-manager/dm-convert:public-preview \
--output_format tf \
--list_supported_types
```

Opt out of anonymous usage data for one conversion:

```text
--opt_out_data_collection=true
```

## Options / Props

### How DM Convert translates concepts

| Deployment Manager concept | KRM / Config Connector | Terraform |
|----------------------------|------------------------|-----------|
| References | Resource references if the KRM schema defines the field as a reference; otherwise replaced by the resolved value | Terraform references (behave similarly) |
| Explicit dependencies (`depends_on`) | No support for explicit ordering; eventually-consistent actuation | `depends_on` |
| Authoritative IAM bindings (`accessControl` blocks) | `IAMPolicy` | `<resource_type>_iam_policy` (for example `google_pubsub_topic_iam_policy`) |
| Nonauthoritative IAM (`iamMemberBinding` types) | `IAMPolicyMember` | `<resource_type>_iam_member` (for example `google_project_iam_member`) |
| Composite types | Deprecated; not converted | Deprecated; not converted |
| Actions, custom type providers, outputs | Not supported | Actions with declarative Terraform equivalents are converted |

### Actions (Terraform)

| Case | Result |
|------|--------|
| Action calls to APIs that insert a resource | Equivalent Terraform resource, for example `action: gcp-types/storage-v1:storage.buckets.insert` becomes `google_storage_bucket` |
| Action calls to APIs that get a resource | Terraform `data` types where possible, for example `actions: gcp-types/compute-v1:compute.subnetworks.get` becomes `google_compute_subnetwork` |
| `setIamPolicy` | `*_iam_policy` (authoritative) or `*_iam_member` (non-authoritative), depending on whether it is used with `getIamPolicy` |
| Not converted | Patch, delete and list APIs; APIs in custom type providers; custom APIs such as `sqladmin-v1beta4:sql.instances.restart` |

### Data collection

| Item | Detail |
|------|--------|
| Default | Anonymous usage data sent to Google |
| Collected | Conversion command input parameters (output format KRM or Terraform, and booleans for whether other flags are set, not their values); conversion result (`SUCCESS` or `FAILURE`, error code and message); start and end times |
| Opt out | `--opt_out_data_collection=true` on every run; `--opt_out_data_collection=false` or omitting the flag enables it |

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down."; use Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- Workflow from the source: identify the configuration; reconcile active deployments; run DM Convert locally; verify the generated Terraform reflects the current resources; delete the Deployment Manager deployment with `delete-policy` set to `abandon` to preserve resources. Recommended practices: store Terraform state in a Cloud Storage bucket (https://docs.cloud.google.com/docs/terraform/resource-management/store-state) and use Cloud Build for actuation (https://docs.cloud.google.com/architecture/managing-infrastructure-as-code).
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud. Config Connector is covered separately; the GKE cluster itself is in `gcp-gke`.
- Snippet taken from https://docs.cloud.google.com/deployment-manager/docs/dm-convert/convert (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/deployment-manager/docs/dm-convert (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [convert.md](./convert.md)
- [best-practices.md](./best-practices.md)
- [troubleshooting.md](./troubleshooting.md)
- [deprecations.md](./deprecations.md)
