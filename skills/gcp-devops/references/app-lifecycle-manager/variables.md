---
source: https://docs.cloud.google.com/app-lifecycle-manager/variables
---

# Variables, variable mapping and dependencies

Units use variables (Terraform variables you define in a blueprint's `variables.tf`) to customize deployment. Units can depend on other units, and variable mappings pass data between a dependent unit and its dependencies. App Lifecycle Manager provisions missing dependency units automatically, before the dependent unit.

## Signature / Usage

### Define dependencies in a unit kind

```protobuf
  message UnitKind {
    // ... other fields ...

    // List of other unit kinds that this release will depend on.
    repeated Dependency dependencies = 4
        [(.google.api.field_behavior) = OPTIONAL];
    // ...
  }

  message Dependency {
    // The unit kind of the dependency.
    string unit_kind = 1 [
      (.google.api.field_behavior) = REQUIRED,
      (.google.api.field_behavior) = IMMUTABLE,
      (.google.api.resource_reference) = {
        type: "saasservicemgmt.googleapis.com/UnitKind"
      }
    ];

    // An alias for the dependency. Used for input variable mapping.
    string alias = 2 [(.google.api.field_behavior) = REQUIRED];
  }
```

### FromMapping: read a dependency's output

```protobuf
  message VariableMapping {
    // ...
    oneof mapping_type {
      // Output variables which will get their values from dependencies
      FromMapping from = 2 [(.google.api.field_behavior) = OPTIONAL];
      // ...
    }
  }

  message FromMapping {
    // Alias of the dependency that the outputVariable will pass its value to
    string dependency = 1 [(.google.api.field_behavior) = REQUIRED];

    // Name of the outputVariable on the dependency
    string output_variable = 2 [(.google.api.field_behavior) = REQUIRED];
  }
```

### ToMapping: pass inputs to a dependency

```protobuf
  message VariableMapping {
    // ...
    oneof mapping_type {
      // ...
      // Input variables whose values will be passed on to dependencies.
      ToMapping to = 3 [(.google.api.field_behavior) = OPTIONAL];
    }
  }

  message ToMapping {
    // Alias of the dependency that the inputVariable will pass its value to
    string dependency = 1 [(.google.api.field_behavior) = REQUIRED];

    // Name of the inputVariable on the dependency
    string input_variable = 2 [(.google.api.field_behavior) = REQUIRED];

    // Tells EasySaaS if this mapping should be used during lookup or not
    bool ignore_for_lookup = 3 [(.google.api.field_behavior) = OPTIONAL];
  }
```

## Options / Props

### Mandatory variables

| Variable | Description |
|----------|-------------|
| `project_id` and `project_number` (or `tenant_project_id` and `tenant_project_number`) | Project where the unit's resources are deployed. App Lifecycle Manager recognizes them even if not defined in the Terraform. Use one pair or the other; mixing (for example `project_id` with `tenant_project_number`) is not supported and may lead to errors. |
| `actuation_sa` | Email of the user-managed actuation service account used (via Infrastructure Manager) to run the Terraform when provisioning, updating or deprovisioning. Use a dedicated actuation service account per tenant (or unit). |

### Variable precedence (lowest to highest)

| Order | Source | Behavior |
|-------|--------|----------|
| 1 (lowest) | Existing input variables on the unit | Overridden by any source below. |
| 2 | Release defaults | Applied if a variable isn't already set on the unit, but override existing unit variables. |
| 3 | Unit operations (`provision`, `upgrade`) | Variables in the request override release defaults and existing unit variables. |
| 4 (highest) | Dependencies' input variable mappings | Override unit operations, release defaults and unit variables. |

### `ignore_for_lookup` in `ToMapping`

| Value | Behavior |
|-------|----------|
| `false` (or not specified) | The mapped input variables are lookup keys to find an existing dependency unit; a matching unit is reused, otherwise a new dependency unit is provisioned. Useful for shared resources such as clusters. |
| `true` | The variable is not used for lookup; a new dependency unit is always provisioned. Useful for dedicated, non-shared dependencies. |

## Notes

- Examples in the source: a shared Kubernetes cluster uses `ToMapping` with `ignore_for_lookup: false` and maps variables like `tenant_project_id` and `region` to the cluster unit kind (units in the same project and region reuse the cluster); a dedicated cluster per application uses `ignore_for_lookup: true` or no `ToMapping` lookup variables. In the source's codelab example, the `App UnitKind` uses `FromMapping` to get `cluster_endpoint` from the `Cluster UnitKind` and `ToMapping` to pass `tenant_project_id` and `tenant_project_number` to it.
- Secrets: variables are not intended for passwords, API keys or certificates; values can be logged and exposed through system outputs. Use Secret Manager (see the `gcp-security` skill).
- Source text discrepancies kept verbatim: the mandatory-variable text says "`tenant_id` and `tenant_project_number`" where the pair elsewhere is `tenant_project_id` / `tenant_project_number`; the `ToMapping` comment says "EasySaaS". The proto blocks above use snake_case field names; gcloud flags show them as camelCase (for example `--dependencies=[alias=ALIAS],[unitKind=UNITKIND]`).
- Releasing with a variable that was previously set during provisioning (for example `tenant_project_id`) can override tenant values; see update-saas-offering.
- Snippets are protobuf definitions from the source; they are descriptions, not commands.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/variables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [tenants.md](./tenants.md)
- [service-accounts.md](./service-accounts.md)
- [model-saas-offering.md](./model-saas-offering.md)
- [update-saas-offering.md](./update-saas-offering.md)
