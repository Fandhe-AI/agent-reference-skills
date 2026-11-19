---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/wlm-vpc-service-controls
---

# Workload Manager evaluations with VPC Service Controls

When you run evaluations in projects protected by VPC Service Controls, configure ingress and egress rules for the service account attached to the Compute Engine instance that runs your Agent for Compute Workloads. Without these rules, the agent cannot send data to Workload Manager and your evaluations fail.

## Signature / Usage

### Create the ingress policy (gcloud)

Create `ingress_policy.yaml`. Replace `SERVICE_ACCOUNT_EMAIL` with the email of the service account attached to the Compute Engine instance that runs the Agent for Compute Workloads.

```yaml
- ingressFrom:
    identities:
     - serviceAccount:SERVICE_ACCOUNT_EMAIL
    sources:
    - accessLevel: '*'
  ingressTo:
    operations:
    - serviceName: compute.googleapis.com
      methodSelectors:
      - method: "*"
    - serviceName: workloadmanager.googleapis.com
      methodSelectors:
      - method: "*"
    - serviceName: secretmanager.googleapis.com
      methodSelectors:
      - method: "*"
    resources:
    - "*"
```

Add the policy to the perimeter. `PERIMETER_NAME` is the name of your service perimeter, for example `accessPolicies/1234567890/servicePerimeters/example_perimeter`.

`--set-ingress-policies` replaces all of the perimeter's ingress policies with the file contents. On an existing perimeter, first look at its current ingress policies and copy the ones you keep into `ingress_policy.yaml` together with the new rule:

Adapted (not in the official docs): a `describe` step that shows the perimeter's current ingress policies (`status.ingressPolicies`) before they are replaced.

```bash
gcloud access-context-manager perimeters describe PERIMETER_NAME \
  --format="yaml(status.ingressPolicies)"
```

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
  --set-ingress-policies=ingress_policy.yaml
```

## Options / Props

### Ingress rule values (console)

| Section | Setting |
|---------|---------|
| From, Identities | **Select identities & groups**, then add the agent service account email, for example `sap-example-svc-acct@example-project-123456.iam.gserviceaccount.com`. |
| To, Resources | **All projects** |
| To, Operations | **Select operations**; add `compute.googleapis.com`, `workloadmanager.googleapis.com`, and `secretmanager.googleapis.com` with **All methods** selected. |

### Required role

| Role | Where |
|------|-------|
| Access Context Manager Editor (`roles/accesscontextmanager.policyEditor`) | The organization that owns the access policy, or the scoped access policy itself when perimeter administration is delegated to a folder or project (the source says "your project"; see Notes) |

## Notes

- Corrected from the official docs: the source asks for Access Context Manager Editor "on your project". Access policies and their service perimeters are organization resources; the role is granted on the organization, or, for a scoped policy delegated to a folder or project, directly on that access policy (see the scoped policies page in the `gcp-security` skill). A grant on the project alone does not cover `perimeters describe` / `update`.
- Adapted from the official docs: the source says to add the policy with `--set-ingress-policies=ingress_policy.yaml`. That flag sets the perimeter's ingress policies to the file contents, so on an existing perimeter a file with only this rule removes the other ingress policies. The page adds a `describe` step and says to merge the existing policies into the file; test the change in dry run mode (`gcloud access-context-manager perimeters dry-run update` takes the same flag; see the `gcp-security` skill) first.
- Before you begin: set up a VPC Service Controls perimeter; identify the service account attached to the instance (visible on the **VM instance details** page); verify it has the required roles (see the "Required roles for the agent and SAP workloads" section of the SAP agent setup guide).
- Egress rules are required only if the target project (where your workload runs) differs from the consumer project (where you run evaluations); with cross-project communication you must configure egress rules to allow the required traffic. The source shows no egress rule example.
- Permissive configuration: the ingress rule above allows the named service account from any source (`accessLevel: '*'`) to call all methods of the three services on all projects (`resources: "*"`). Scope it as tightly as your perimeter design allows.
- `gcloud access-context-manager perimeters update` with `--set-ingress-policies=YAML_FILE` exists in gcloud 593.0.0; the PERIMETER positional also accepts a fully qualified name that includes the access policy.
- Troubleshoot violations in Logs Explorer. VPC Service Controls itself is in `gcp-security`; Cloud Logging in `gcp-observability`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/wlm-vpc-service-controls (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-evaluation.md](./create-evaluation.md)
- [prerequisites.md](./prerequisites.md)
- [service-accounts.md](./service-accounts.md)
