---
source: https://docs.cloud.google.com/armor/docs/create-security-policies
---

# Create and view Cloud Armor security policies

How to set up IAM permissions for Cloud Armor security policies, create policies with the Google Cloud console, gcloud CLI, or REST API, and list the policies in a project. In gcloud, the `--type` flag selects whether a policy is a backend security policy or an edge security policy. Rules and rule expressions are added separately (see `rules-language-reference.md`).

## Signature / Usage

### Create a security policy

Create a policy with a given type and description:

```bash
gcloud compute security-policies create my-policy \
    --type=CLOUD_ARMOR_EDGE --description="policy description"
```

### List security policies

```bash
gcloud compute security-policies list
```

Output:

```text
NAME: my-policy
REGION: us-central1
```

### Attach a policy to a backend service

Backend services without an attached security policy are not protected. Attach a backend security policy with `--security-policy`:

```bash
gcloud compute backend-services update my-backend \
    --security-policy my-policy
```

## Options / Props

### IAM roles

| Role | Permitted operations |
|---|---|
| Compute Security Admin (`roles/compute.securityAdmin`) | Configure, modify, update, and delete security policies; API methods `SecurityPolicies insert`, `delete`, `patch`, `addRule`, `patchRule`, `removeRule` |
| Compute Network Admin (`roles/compute.networkAdmin`) | Set a security policy for a backend service (`BackendServices setSecurityPolicy`; `BackendServices list`, gcloud only) |
| Security Admin (`roles/iam.securityAdmin`) together with Compute Network Admin | View policies via `SecurityPolicies get`, `list`, `getRule` |

### IAM permissions for custom roles

| IAM permission | API methods | Roles |
|---|---|---|
| `compute.securityPolicies.create` | `SecurityPolicies insert` | Compute Security Admin |
| `compute.securityPolicies.delete` | `SecurityPolicies delete` | Compute Security Admin |
| `compute.securityPolicies.get` | `SecurityPolicies get`, `SecurityPolicies getRule` | Security Admin (`roles/iam.securityAdmin`) |
| `compute.securityPolicies.list` | `SecurityPolicies list` | Security Admin |
| Both `compute.securityPolicies.use` and `compute.backendServices.setSecurityPolicy` | `BackendServices setSecurityPolicy` | Compute Network Admin |
| `compute.securityPolicies.update` | `SecurityPolicies patch`, `addRule`, `patchRule`, `removeRule` | Compute Security Admin |

### `--type` values (gcloud 593.0.0 help)

| Value | Policy |
|---|---|
| `CLOUD_ARMOR` | Backend security policy |
| `CLOUD_ARMOR_EDGE` | Edge security policy |
| `CLOUD_ARMOR_NETWORK` | Network edge security policy (see `network-edge-policies.md`) |

## Notes

- Caution from the source: you can configure Cloud Armor by using GKE ingress security policies, but when you apply changes to GKE resources, the Cloud Armor configuration is overwritten. Configure Cloud Armor on GKE through `BackendConfig` parameters (GKE is covered by the `gcp-gke` skill).
- Before you begin: be familiar with external Application Load Balancer concepts, and examine your backend services to find the ones without an attached security policy; those backend services and their backends are not protected.
- If you are unfamiliar with security policy configuration, the source points to the example security policies page (https://docs.cloud.google.com/armor/docs/example-policies).
- Update, delete, export / import, and attach / remove operations are on https://docs.cloud.google.com/armor/docs/manage-security-policies. Delete a policy only after removing it from all backend services; try deletions on a disposable policy first.
- Console steps are omitted; see the source page. The source shows the same `gcloud compute security-policies list` command twice; it is shown once here.
- The full flag list for `gcloud compute security-policies` and `gcloud compute backend-services` is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/create).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/create (gcloud 593.0.0 help; the create example and the `--type` values).
- Snippet taken from https://docs.cloud.google.com/armor/docs/manage-security-policies (the `backend-services update` attach example).
- Source: https://docs.cloud.google.com/armor/docs/create-security-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-policy-overview.md](./security-policy-overview.md)
- [rules-language-reference.md](./rules-language-reference.md)
- [network-edge-policies.md](./network-edge-policies.md)
- [best-practices.md](./best-practices.md)
