---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/quickstart
---

# Policy validation quickstart

Apply a constraint that enforces an IAM domain restriction, run `gcloud beta terraform vet` against a Terraform plan that intentionally violates it, then modify the constraint so the plan passes. The steps use Cloud Shell, which has Terraform pre-installed and a cloned Policy Library repository (Preview feature).

## Signature / Usage

### Get the policy library

The source opens Cloud Shell with a "Clone policy library" link (`https://console.cloud.google.com/cloudshell/open?cloudshell_git_repo=https://github.com/GoogleCloudPlatform/policy-library.git`), which clones the repository and opens it. Without the link, clone it and run every later command from its root.

Snippet taken from https://docs.cloud.google.com/docs/terraform/policy-validation/create-policy-library (retrieved 2026-11-19).

```bash
git clone https://github.com/GoogleCloudPlatform/policy-library.git
cd policy-library
```

### Copy and inspect the sample constraint

```bash
cp samples/iam_service_accounts_only.yaml policies/constraints
```

```bash
cat policies/constraints/iam_service_accounts_only.yaml
```

The output looks like this:

```yaml
# This constraint checks that all IAM policy members are in the
# "gserviceaccount.com" domain.
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedPolicyMemberDomainsConstraintV2
metadata:
  name: service_accounts_only
  annotations:
    description: Checks that members that have been granted IAM roles belong to allowlisted
      domains.
spec:
  severity: high
  match:
    target: # {"$ref":"#/definitions/io.k8s.cli.setters.target"}
    - "organizations/**"
  parameters:
    domains:
    - gserviceaccount.com
```

Only members from the `gserviceaccount.com` domain can be present in an IAM policy.

### Create `policy-library/main.tf`

Replace `PROJECT_ID` with your project ID and `EMAIL_ADDRESS` with any valid email address (for example `user@example.com`).

```hcl
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 3.84"
    }
  }
}

resource "google_project_iam_binding" "sample_iam_binding" {
  project = "PROJECT_ID"
  role    = "roles/viewer"

  members = [
    "user:EMAIL_ADDRESS"
  ]
}
```

### Generate and convert the plan, then validate

Initialize Terraform, export the plan, convert it to JSON, install the terraform-tools component, then validate:

```bash
terraform init
```

```bash
terraform plan -out=test.tfplan
```

```bash
terraform show -json ./test.tfplan > ./tfplan.json
```

```bash
sudo apt-get install google-cloud-sdk-terraform-tools
```

```bash
gcloud beta terraform vet tfplan.json --policy-library=. --format=json
```

The email address is not a service account, so the plan violates the constraint; the JSON output reports the `GCPIAMAllowedPolicyMemberDomainsConstraintV2.service_accounts_only` constraint with the message `IAM policy for //cloudresourcemanager.googleapis.com/projects/PROJECT_ID contains member from unexpected domain: user:user@example.com`.

### Allow your email domain

Edit `policy-library/policies/constraints/iam_service_accounts_only.yaml` and append your email domain (the source adds `example.com`; use your own).

Adapted (not in the official docs): `kind` is `GCPIAMAllowedPolicyMemberDomainsConstraintV2` instead of `...ConstraintV1`.

```yaml
apiVersion: constraints.gatekeeper.sh/v1alpha1
kind: GCPIAMAllowedPolicyMemberDomainsConstraintV2
metadata:
  name: service_accounts_only
spec:
  severity: high
  match:
    target: ["organizations/**"]
  parameters:
    domains:
      - gserviceaccount.com
      - example.com
```

Validate again; expected output is no violations:

```bash
gcloud beta terraform vet tfplan.json --policy-library=. --format=json
```

```json
[]
```

## Options / Props

### Required permissions on the project

| Permission | Granted by |
|------------|-----------|
| `resourcemanager.projects.getIamPolicy` | Security Reviewer role for the organization |
| `resourcemanager.projects.get` | Project Viewer role for the organization |

## Notes

- Preview feature (Pre-GA Offerings Terms apply).
- Troubleshooting: `"Error 403: The caller does not have permission, forbidden"` means `PROJECT_ID` in `policy-library/main.tf` was not replaced, or you lack the permissions above on that project. After fixing, export the Terraform plan again and convert it to JSON again.
- Corrected from the official docs: step 10 edits the copied file with `kind: GCPIAMAllowedPolicyMemberDomainsConstraintV1`, while the same page prints that file in step 3 as `kind: GCPIAMAllowedPolicyMemberDomainsConstraintV2` and the step 9 output reports `"kind": "GCPIAMAllowedPolicyMemberDomainsConstraintV2"`.
- The source also shows the Cloud Shell link that clones the policy library, an **Authorize** prompt during `terraform plan`, and the full JSON output of step 9 (omitted).
- `gcloud beta terraform vet` checks Terraform plans against a policy library before apply; Security Command Center IaC validation is in `gcp-security-compliance`, and Organization Policy custom constraints are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-validation-overview.md](./policy-validation-overview.md)
- [create-policy-library.md](./create-policy-library.md)
- [validate-policies.md](./validate-policies.md)
- [policy-validation-troubleshooting.md](./policy-validation-troubleshooting.md)
