---
source: https://docs.cloud.google.com/binary-authorization/docs/configuring-policy-cli
---

# Configure a policy using the gcloud CLI

Configure a Binary Authorization policy with the Google Cloud CLI: export the existing policy as a YAML file, edit it, and import it back. Applies to GKE, Distributed Cloud, Cloud Run and Cloud Service Mesh; each section notes which platforms it covers.

## Signature / Usage

### Before you begin

Enable Binary Authorization, create a cluster, and (if you use attestations) create attestors first. Set the project to the one where Binary Authorization is enabled:

```bash
PROJECT_ID=PROJECT_ID
gcloud config set project ${PROJECT_ID}
```

### Export the policy YAML file (GKE, Distributed Cloud, Cloud Run, Cloud Service Mesh)

```bash
gcloud container binauthz policy export > /tmp/policy.yaml
```

The default file contents look similar to:

```yaml
defaultAdmissionRule:
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  evaluationMode: ALWAYS_ALLOW
globalPolicyEvaluationMode: ENABLE
name: projects/PROJECT_ID/policy
```

### Set the default rule (all platforms)

```text
defaultAdmissionRule:
  evaluationMode: EVALUATION_MODE
  enforcementMode: ENFORCEMENT_MODE
  requireAttestationsBy:
  - ATTESTOR
  - ...
```

### Manage exempt images (all platforms)

```yaml
admissionWhitelistPatterns:
- namePattern: MATCHING_PATTERN
```

Replace `MATCHING_PATTERN` with the path to a single image (exact match) or a pattern using `*` or `**`.

### System policy evaluation mode (GKE and Distributed Cloud)

```bash
gcloud alpha container binauthz policy export-system-policy
```

```yaml
globalPolicyEvaluationMode: ENABLE
```

```yaml
globalPolicyEvaluationMode: DISABLE
```

Export the system policy of a specific region:

```bash
gcloud alpha container binauthz policy export-system-policy \
  --location=REGION > /tmp/policy.yaml
```

### Cluster-specific rules (optional; GKE and Distributed Cloud)

```text
clusterAdmissionRules:
  CLUSTER_SPECIFIER:
    evaluationMode: EVALUATION_MODE
    enforcementMode: ENFORCEMENT_MODE
    requireAttestationsBy:
    - ATTESTOR
    - ...
```

### Specific rules (optional; Cloud Service Mesh)

Adapted (not in the official docs): the `evaluationMode` value is the `EVALUATION_MODE` placeholder instead of `ENFORCEMENT_MODE`.

```text
defaultAdmissionRule:
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  evaluationMode: ALWAYS_DENY
globalPolicyEvaluationMode: ENABLE
istioServiceIdentityAdmissionRules:
  SERVICE_IDENTITY_ID:
    enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    evaluationMode: EVALUATION_MODE
    requireAttestationsBy:
    - ATTESTOR
    - ...

name: projects/PROJECT_ID/policy
```

Adapted (not in the official docs): the `evaluationMode` value is the `EVALUATION_MODE` placeholder instead of `ENFORCEMENT_MODE`.

```text
defaultAdmissionRule:
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  evaluationMode: ALWAYS_DENY
globalPolicyEvaluationMode: ENABLE
kubernetesServiceAccountAdmissionRules:
  KUBERNETES_SERVICE_ACCOUNT_ID:
    enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    evaluationMode: EVALUATION_MODE
    requireAttestationsBy:
    - ATTESTOR
    - ...
name: projects/PROJECT_ID/policy
```

```text
defaultAdmissionRule:
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  evaluationMode: ALWAYS_DENY
globalPolicyEvaluationMode: ENABLE
kubernetesNamespaceAdmissionRules:
  KUBERNETES_NAMESPACE:
    enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
    evaluationMode: EVALUATION_MODE
    requireAttestationsBy:
    - ATTESTOR
    - ...
name: projects/PROJECT_ID/policy
```

### Import the policy YAML file (all platforms)

```bash
gcloud container binauthz policy import /tmp/policy.yaml
```

## Options / Props

| Placeholder | Description |
|---|---|
| `EVALUATION_MODE` | `ALWAYS_ALLOW` (allow all), `ALWAYS_DENY` (disallow all) or `REQUIRE_ATTESTATION` (requires a `requireAttestationsBy` block with at least one attestor; all listed attestors must verify an attestation). |
| `ENFORCEMENT_MODE` | `ENFORCED_BLOCK_AND_AUDIT_LOG` (default; block violating images and log to Cloud Audit Logs) or `DRYRUN_AUDIT_LOG_ONLY` (allow all images but log violations). |
| `ATTESTOR` | Attestor resource ID `projects/PROJECT_ID/attestors/ATTESTOR_NAME`. |
| `CLUSTER_SPECIFIER` (GKE, GKE attached clusters, GKE on AWS) | `CLUSTER_LOCATION.CLUSTER_NAME`, for example `us-central1-a.test-cluster`. |
| `CLUSTER_SPECIFIER` (Google Distributed Cloud software, bare metal or VMware) | `FLEET_MEMBERSHIP_LOCATION.FLEET_MEMBERSHIP_ID`, for example `global.test-membership`. |
| `SERVICE_IDENTITY_ID` (Cloud Service Mesh) | `PROJECT_ID.svc.id.goog/ns/NAMESPACE/sa/SERVICE_ACCOUNT`. |
| `KUBERNETES_SERVICE_ACCOUNT_ID` | `NAMESPACE:SERVICE_ACCOUNT`. |
| `KUBERNETES_NAMESPACE` | The Kubernetes namespace the rule is scoped to. |
| `REGION` | Region of the system policy to export, or `global`; for example `asia-east1`, `europe-west1`, `us-central1`. |

### `gcloud container binauthz policy` flags (gcloud 593.0.0)

| Command | Flags |
|---|---|
| `gcloud container binauthz policy export` | Writes the current project policy to stdout. |
| `gcloud container binauthz policy import POLICY_FILE` | `--strict-validation` (additional validity checks on policy contents). |
| `gcloud alpha container binauthz policy export-system-policy` | `--location=LOCATION` (default `global`); alpha track only. |

## Notes

- Cloud Run: you cannot directly specify image names that contain a tag (for example `IMAGE_PATH:latest`). Use a wildcard: `*` for all versions of one image (`us-docker.pkg.dev/myproject/container/hello@*`) or `**` for all images in a project (`us-docker.pkg.dev/myproject/**`). You can specify a digest as `IMAGE_PATH@DIGEST`.
- Not recommended: `ALWAYS_ALLOW` in the default rule. It allows all images unless they fail a cluster-specific or other specific rule. It appears above only as the exported default; do not keep it as a production policy.
- Importing a policy with `ENFORCED_BLOCK_AND_AUDIT_LOG` can block deployments right away; try it with `DRYRUN_AUDIT_LOG_ONLY` on a disposable project first. It can take a few minutes for the policy to take effect.
- The `ALWAYS_DENY` default rules in the Cloud Service Mesh examples block every image that does not match a specific rule.
- System policy: for reliability the system policy is updated one region at a time, so it can differ between regions during an update. With no `--location` or `--location=global`, the command outputs the system policy from a region in the last group of regions to receive updates (the set of system images currently allowed in all regions, since most changes are additions). At deploy time exempt images from `admissionWhitelistPatterns` are applied after the system policy.
- `gcloud container binauthz policy export-system-policy` exists only on the `alpha` track in gcloud 593.0.0, as in the source.
- Corrected from the official docs: the Cloud Service Mesh service identity and Kubernetes service account examples set `evaluationMode: ENFORCEMENT_MODE`; the placeholder list that follows each example describes `EVALUATION_MODE` (`ALWAYS_ALLOW`, `ALWAYS_DENY`, `REQUIRE_ATTESTATION`) as the `evaluationMode` value, and `ENFORCEMENT_MODE` values are not valid evaluation modes.
- `/tmp/policy.yaml` is a shared temporary path in the source example; use a protected directory if the policy names internal attestors.
- The source also shows Console and REST API alternatives.
- The full `gcloud container binauthz` flag list is in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/binary-authorization/docs/configuring-policy-cli (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-yaml-reference.md](./policy-yaml-reference.md)
- [key-concepts.md](./key-concepts.md)
- [attestations.md](./attestations.md)
- [run-overview.md](./run-overview.md)
