---
source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-terraform-constraints
---

# Create Terraform constraints

Terraform-based constraints operate on resource change data (the `resource_changes` key of Terraform plan JSON). A constraint template defines a Rego rule; a constraint references the template, supplies parameters and selects resources by Terraform address. Applies to any Terraform resource from any provider (Preview feature; requires a policy library).

## Signature / Usage

### Sample data

Constraint templates need sample data. A Terraform plan JSON excerpt:

```text
// tfplan.json
{
  "format_version": "0.2",
  "terraform_version": "1.0.10",
  "resource_changes": [
    {
      "address": "google_compute_address.internal_with_subnet_and_address",
      "mode": "managed",
      "type": "google_compute_address",
      "name": "internal_with_subnet_and_address",
      "provider_name": "registry.terraform.io/hashicorp/google",
      "change": {
        "actions": [
          "create"
        ],
        "before": null,
        "after": {
          "address": "10.0.42.42",
          "address_type": "INTERNAL",
          "description": null,
          "name": "my-internal-address",
          "network": null,
          "prefix_length": null,
          "region": "us-central1",
          "timeouts": null
        },
        "after_unknown": {
          "creation_timestamp": true,
          "id": true,
          "network_tier": true,
          "project": true,
          "purpose": true,
          "self_link": true,
          "subnetwork": true,
          "users": true
        },
        "before_sensitive": false,
        "after_sensitive": {
          "users": []
        }
      }
    }
  ],
  // other data
}
```

### Write Rego

The Rego needs a violation rule; the resource change under review is `input.review`, constraint parameters are `input.parameters`.

Adapted (not in the official docs): `allowed_address_types` is read into a set and the check is `== 0` instead of `>= 1`, so the rule fires for an address type that is not in the allowlist.

```rego
# validator/tf-compute-address-address-type-allowlist-constraint-v1.rego
package templates.gcp.TFComputeAddressAddressTypeAllowlistConstraintV1

violation[{
  "msg": message,
  "details": metadata,
}] {
  resource := input.review
  resource.type == "google_compute_address"

  allowed_address_types := {t | t := input.parameters.allowed_address_types[_]}
  count({resource.change.after.address_type} & allowed_address_types) == 0
  message := sprintf(
    "Compute address %s has a disallowed address_type: %s",
    [resource.address, resource.change.after.address_type]
  )
  metadata := {"resource": resource.name}
}
```

### Test your Rego

Put sample data in `validator/test/fixtures/tf-compute-address-address-type-allowlist-constraint-v1-test/resource_changes/data.json`, the directory the test below reads (`data.test.fixtures` + the test file name + `resource_changes`). The file holds the value of the plan's `resource_changes` key (the array of resource changes), not the whole plan JSON, so that `resource_changes[_]` in the test is one resource change. Use non-sensitive data in the Rego Playground.

Adapted (not in the official docs): `allowed_address_types` is passed as a list (`["EXTERNAL"]`) instead of the string `"EXTERNAL"`, and the fixture is read with a bracketed string key instead of the hyphenated `import` path.

```rego
# validator/tf-compute-address-address-type-allowlist-constraint-v1-test.rego
package templates.gcp.TFComputeAddressAddressTypeAllowlistConstraintV1

test_violation_with_disallowed_address_type {
  resource_changes := data.test.fixtures["tf-compute-address-address-type-allowlist-constraint-v1-test"].resource_changes
  parameters := {
    "allowed_address_types": ["EXTERNAL"]
  }
  violations := violation with input.review as resource_changes[_]
    with input.parameters as parameters
  count(violations) == 1
}
```

### Constraint template skeleton

Place it in `policies/templates`; the file name matches the Rego file name.

```yaml
# policies/templates/tf-compute-address-address-type-allowlist-constraint-v1.yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: tfcomputeaddressaddresstypeallowlistconstraintv1
spec:
  crd:
    spec:
      names:
        kind: TFComputeAddressAddressTypeAllowlistConstraintV1
      validation:
        openAPIV3Schema:
          properties:
            allowed_address_types:
              description: "A list of address_types allowed, for example: ['INTERNAL']"
              type: array
              items:
                type: string
  targets:
    - target: validation.resourcechange.terraform.cloud.google.com
      rego: |
            #INLINE("validator/tf-compute-address-address-type-allowlist-constraint-v1.rego")
            #ENDINLINE
```

Directory layout, then run `make build` (in the Google-provided policy-library repository) to inline the Rego into `policies/templates`:

```text
| policy-library/
|- validator/
||- tf-compute-address-address-type-allowlist-constraint-v1.rego
||- tf-compute-address-address-type-allowlist-constraint-v1-test.rego
|- policies
||- templates
|||- tf-compute-address-address-type-allowlist-constraint-v1.yaml
```

### Set up a constraint

Only allow `INTERNAL` address types:

```yaml
# policies/constraints/tf_compute_address_internal_only.yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: TFComputeAddressAddressTypeAllowlistConstraintV1
metadata:
  name: tf_compute_address_internal_only
spec:
  severity: high
  match:
    addresses:
    - "**"
  parameters:
    allowed_address_types:
    - "INTERNAL"
```

### Disallow unknown ancestry

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: GCPAlwaysViolatesConstraintV1
metadata:
  name: disallow_unknown_ancestry
  annotations:
    description: |
      Unknown ancestry is not allowed; use --project=<project> to set a
      default ancestry
spec:
  severity: high
  match:
    ancestries:
    - "organizations/unknown"
  parameters: {}
```

## Options / Props

### Constraint fields

| Field | Description |
|-------|-------------|
| `severity` | `low`, `medium`, or `high` |
| `match.addresses` | List of resource addresses to include, glob-style |
| `match.excludedAddresses` | (Optional) Resource addresses to exclude, glob-style |
| `parameters` | Values for the constraint template's input parameters |
| `kind` | Must contain the constraint template name; `metadata.name` should be a descriptive slug |

### Address matching examples

| Address matcher | Description |
|-----------------|-------------|
| `module.**` | All resources in any module |
| `module.my_module.**` | Everything in module `my_module` |
| `**.google_compute_global_forwarding_rule.*` | All google_compute_global_forwarding_rule resources in any module |
| `module.my_module.google_compute_global_forwarding_rule.*` | All google_compute_global_forwarding_rule resources in `my_module` |

### Template naming and file rules

| Rule | Detail |
|------|--------|
| Template name format | `TF{resource}{feature}Constraint{version}`, CamelCase |
| Single-resource templates | Follow the Terraform provider's product naming (for `google_tags_tag` the product is `tags` although the API name is `resourcemanager`) |
| Multi-resource templates | Omit the resource part (example `TFAddressTypeAllowlistConstraintV1`) |
| Version number | A single number, not semver; every version is a unique template |
| Rego file name | Template name in snake_case (lowercase words separated with `_`), for example `tf-compute-address-address-type-allowlist-constraint-v1.rego` |
| Skeleton | Same file name as the Rego; `spec.crd.spec.names.kind` contains the template name; `metadata.name` is the template name lower-cased |

## Notes

- Preview feature (Pre-GA Offerings Terms apply). Supported resources: any Terraform resource from any Terraform provider.
- If a resource address matches both `addresses` and `excludedAddresses`, it is excluded.
- Limitations: Terraform plan data is the best available representation of state after apply, but values computed server side may be unknown. CAI ancestry paths use the default project (`--project`) to resolve unknown project IDs; without one the ancestry path defaults to `organizations/unknown`. The last constraint above disallows unknown ancestry.
- Corrected from the official docs: the source Rego uses `count({resource.change.after.address_type} & allowed_address_types) >= 1`, which raises a violation only for allowed types. The same page contradicts it: the message reads "has a disallowed address_type", the template is an allowlist ("A list of address_types allowed"), the constraint example is introduced with "to only allow `INTERNAL` address types", and `test_violation_with_disallowed_address_type` allows `EXTERNAL` against the `INTERNAL` sample data and expects `count(violations) == 1`.
- Corrected from the official docs: the source test passes `"allowed_address_types": "EXTERNAL"` (a string), while the template schema declares `allowed_address_types` as `type: array` of `string` and the Rego intersects it with a set (`&`); the Rego therefore reads the parameter into a set and the test passes a list.
- Corrected from the official docs: the source test has `import data.test.fixtures.tf-compute-address-address-type-allowlist-constraint-v1-test.resource_changes as resource_changes`. A Rego dot-access term is an identifier, which cannot contain `-`, so the import does not parse; the test reads the same document with a bracketed string key, `data.test.fixtures["tf-compute-address-address-type-allowlist-constraint-v1-test"].resource_changes`, inside the rule.
- Source inconsistency: the prose says "Your Rego must have a `violations` rule", while the code defines `violation`.
- Source inconsistency: the naming guidance says snake_case ("separate words with `_`"), while its example file name `tf-compute-address-address-type-allowlist-constraint-v1.rego` uses hyphens.
- Corrected from the official docs: the source puts sample data in `validator/test/fixtures/<constraint filename>/resource_changes/data.json`, while its test reads `data.test.fixtures.tf-compute-address-address-type-allowlist-constraint-v1-test.resource_changes` (the test file name), so data placed as the prose says is not found. The page names the fixture directory after the test file, `validator/test/fixtures/tf-compute-address-address-type-allowlist-constraint-v1-test/resource_changes/data.json`, to match the test. The page also says that `data.json` holds only the `resource_changes` array: the source's sample data is a whole plan JSON object, which, stored as is, would make `data.test.fixtures[...].resource_changes` the plan object and `resource_changes[_]` iterate over `format_version`, `terraform_version` and the array instead of individual resource changes.
- The unknown-ancestry constraint uses `match.ancestries`, not the `addresses` / `excludedAddresses` fields listed above; `ancestries` is the match field of CAI constraints (see create-cai-constraints.md).
- Source: https://docs.cloud.google.com/docs/terraform/policy-validation/create-terraform-constraints (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-policy-library.md](./create-policy-library.md)
- [create-cai-constraints.md](./create-cai-constraints.md)
- [validate-policies.md](./validate-policies.md)
- [policy-validation-overview.md](./policy-validation-overview.md)
