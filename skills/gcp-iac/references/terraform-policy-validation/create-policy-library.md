---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-policy-library
---

# Create a policy library

An organization's policies are represented as a policy library: a Git repository holding constraint templates and constraints. Duplicate Google's sample repository to your own repository, pick templates, add constraint YAML files and keep the library in sync with the public repository (Preview feature).

## Signature / Usage

### Duplicate the sample library

You need an empty Git repository (`POLICY_LIBRARY_REPO`) and Git configured to connect securely (for GitHub, see "Connecting to GitHub with SSH").

```bash
git clone https://github.com/GoogleCloudPlatform/policy-library.git
cd policy-library
git remote set-url origin POLICY_LIBRARY_REPO
git push origin main
```

Examine the available constraint templates (`ls policies/templates`), choose templates (the example uses `gcp_storage_location_v1.yaml`, which enforces location for Cloud Storage buckets) and create corresponding constraint YAML files under `policies/constraints`. Then commit and push:

```bash
git add --all .
git commit -m "Initial commit of policy library constraints"
git push -u origin main
```

### Periodic updates

Pull changes from the public repository, which might contain new templates and Rego files.

```bash
git remote add public https://github.com/GoogleCloudPlatform/policy-library.git
git pull public main
git push origin main
```

## Options / Props

### Library structure

| Path | Contents |
|------|----------|
| `policies/constraints/` | Initially empty; place your constraint files here |
| `policies/templates/` | Pre-defined constraint templates |
| `validator/` | `.rego` files and their unit tests; only touch to modify existing templates or create new ones. `make build` inlines the Rego content in the corresponding constraint template files |

## Notes

- Preview feature (Pre-GA Offerings Terms apply).
- The `samples` folder in the library holds example constraints.
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-policy-library (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-validation-overview.md](./policy-validation-overview.md)
- [create-terraform-constraints.md](./create-terraform-constraints.md)
- [create-cai-constraints.md](./create-cai-constraints.md)
- [quickstart.md](./quickstart.md)
