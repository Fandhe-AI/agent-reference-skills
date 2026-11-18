---
source: https://docs.cloud.google.com/security-command-center/docs/iac-validation-tutorial
---

# Create a sample IaC validation report

Tutorial that creates a posture, deploys it on a project, validates an example Terraform plan that violates it, then fixes the violations and re-validates. Requires SCC Standard-legacy, Premium or Enterprise (Deprecated) with organization-level activation, and the Project Creator and Security Posture Admin roles on the organization. Use a disposable project.

## Signature / Usage

### Prepare

```bash
gcloud organizations list
```

```bash
gcloud projects describe PROJECT_ID
```

```bash
terraform init
```

### Create and deploy the posture

Save as `example-standard.yaml` (replace `ORGANIZATION_ID`):

Adapted (not in the official docs): the `fixedMTU` custom module requires an MTU of 1460 instead of 1000, which is outside the valid range.

```yaml
name: organizations/ORGANIZATION_ID/locations/global/postures/example-standard
state: ACTIVE
policySets:
- policies:
  - constraint:
      orgPolicyConstraintCustom:
        customConstraint:
          actionType: ALLOW
          condition: "resource.initialNodeCount == 3"
          description: Set initial node count to be exactly 3.
          displayName: fixedNodeCount
          methodTypes:
          - CREATE
          name: organizations/ORGANIZATION_ID/customConstraints/custom.fixedNodeCount
          resourceTypes:
          - container.googleapis.com/NodePool
        policyRules:
        - enforce: true
    policyId: fixedNodeCount
  - constraint:
      securityHealthAnalyticsCustomModule:
        config:
          customOutput: {}
          description: Set MTU for a network to be exactly 1460.
          predicate:
            expression: "!(resource.mtu == 1460)"
          recommendation: Only create networks whose MTU is 1460.
          resourceSelector:
            resourceTypes:
            - compute.googleapis.com/Network
          severity: HIGH
        displayName: fixedMTU
        moduleEnablementState: ENABLED
    policyId: fixedMTU
  - constraint:
      securityHealthAnalyticsModule:
        moduleEnablementState: ENABLED
        moduleName: BUCKET_POLICY_ONLY_DISABLED
    policyId: bucket_policy_only_disabled
  - constraint:
      securityHealthAnalyticsModule:
        moduleEnablementState: ENABLED
        moduleName: BUCKET_LOGGING_DISABLED
    policyId: bucket_logging_disabled
  policySetId: policySet1
```

```bash
gcloud scc postures create organizations/ORGANIZATION_ID/locations/global/postures/example-standard --posture-from-file=example-standard.yaml
```

Copy the posture revision ID from the output, then deploy to the project:

```bash
gcloud scc posture-deployments create organizations/ORGANIZATION_ID/locations/global/postureDeployments/example-standard \
--posture-name=organizations/ORGANIZATION_ID/locations/global/postures/example-standard \
--posture-revision-id="POSTURE_REVISION_ID" \
--target-resource=projects/PROJECT_NUMBER
```

### Validate the Terraform file

`main.tf` (replace `PROJECT_ID`; it intentionally violates the posture):

Adapted (not in the official docs): the network `mtu` is set to 1500 instead of 100, which is outside the valid range.

```terraform
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
    }
  }
}

provider "google" {
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_network" "example_network"{
  name                            = "example-network-1"
  delete_default_routes_on_create = false
  auto_create_subnetworks         = false
  routing_mode                    = "REGIONAL"
  mtu                             = 1500
  project                         = "PROJECT_ID"
}

resource "google_container_node_pool" "example_node_pool" {
  name               = "example-node-pool-1"
  cluster            = "example-cluster-1"
  project            = "PROJECT_ID"
  initial_node_count = 2

  node_config {
    preemptible  = true
    machine_type = "e2-medium"
  }
}

resource "google_storage_bucket" "example_bucket" {
  name          = "example-bucket-1"
  location      = "EU"
  force_destroy = true

  project = "PROJECT_ID"

  uniform_bucket_level_access = false
}
```

```bash
terraform plan -out main.plan
terraform show -json main.plan > mainplan.json
```

```bash
gcloud scc iac-validation-reports create organizations/ORGANIZATION_ID/locations/global --tf-plan-file=mainplan.json
```

### Clean up

```bash
gcloud projects delete PROJECT_ID
```

## Notes

- Expected violations in the first report: `mtu` of `example_network` is not 1460; `initial_node_count` of `example_node_pool` is not 3; `example_bucket` lacks uniform bucket-level access; `example_bucket` has no logging.
- Fix: set `mtu = 1460`, `initial_node_count = 3`, `uniform_bucket_level_access = true`, and add a `logging` block (`log_bucket` pointing to a separate log bucket and optional `log_object_prefix = "tf-logs/"`), then rerun `terraform plan`, `terraform show -json` and `gcloud scc iac-validation-reports create` to confirm. The fixed `main.tf` is omitted here.
- Caution from the source: deleting a project deletes everything in the project (including any other work in it) and custom project IDs are lost. Run `gcloud projects delete` only on a disposable project created for this tutorial; to keep the project, delete the individual resources instead.
- Destructive: `force_destroy = true` on `example_bucket` lets Terraform delete the bucket together with all objects in it. It is in the source for the throwaway tutorial bucket only; do not copy it to buckets that hold data.
- The posture deployment enforces the custom organization constraint on the target project; deploy only to the tutorial project.
- The source labels the YAML block with an `xml` fence; it is YAML. The source also shows Console IAM role steps and Cloud Shell Editor steps.
- The SCC Enterprise tier shuts down on May 21, 2027; organizations move to Premium on or after that date.
- Corrected from the official docs: the source tutorial uses `mtu = 100` in `main.tf` and a `fixedMTU` module that requires exactly 1000. The Compute Engine `Network.mtu` field accepts 1300 to 8896 (default 1460; Compute Engine API Discovery document), so both values are outside the valid range. The adapted example keeps the tutorial's contract with valid values: the module requires 1460, the initial `main.tf` uses 1500 (a violation), and the fix sets 1460.
- Source: https://docs.cloud.google.com/security-command-center/docs/iac-validation-tutorial (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [validate-iac.md](./validate-iac.md)
- [supported-iac-assets-policies.md](./supported-iac-assets-policies.md)
- [how-to-use-security-posture.md](./how-to-use-security-posture.md)
