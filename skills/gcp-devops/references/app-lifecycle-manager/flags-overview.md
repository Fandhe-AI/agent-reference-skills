---
source: https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-overview
---

# App Lifecycle Manager feature flags overview

Feature flags control the availability and behavior of features without new code deployments or infrastructure changes. Use them integrated with App Lifecycle Manager deployments, or standalone by modeling your system components as App Lifecycle Manager units. Flag changes are not live until you initiate an App Lifecycle Manager rollout. Flag values are STRING, INTEGER, DOUBLE or boolean.

## Signature / Usage

### Create a string flag

```bash
gcloud beta app-lifecycle-manager flags create "feature-mode" \
  --key="feature-mode" \
  --flag-value-type=string \
  --location="global" \
  --unit-kind="UNIT_KIND_ID" \
  --variants='[{"id": "standard", "stringValue": "STANDARD"}, {"id": "advanced", "stringValue": "ADVANCED"}]' \
  --evaluation-spec='{"defaultVariant": "standard"}'
```

### Create an integer flag

```bash
gcloud beta app-lifecycle-manager flags create "max-retry-count" \
  --key="max-retry-count" \
  --flag-value-type=int \
  --location="global" \
  --unit-kind="UNIT_KIND_ID" \
  --variants='[{"id": "low", "integerValue": 3}, {"id": "high", "integerValue": 10}]' \
  --evaluation-spec='{"defaultVariant": "low"}'
```

### Create a double flag

```bash
gcloud beta app-lifecycle-manager flags create "sampling-rate" \
  --key="sampling-rate" \
  --flag-value-type=double \
  --location="global" \
  --unit-kind="demo-test-unitkind" \
  --variants='[{"id": "minimal", "doubleValue": 0.01}, {"id": "full", "doubleValue": 1.0}]' \
  --evaluation-spec='{"defaultVariant": "minimal"}'
```

### Integrated usage steps

1. Define flags: create flag resources with a unique `Flag key` (for example `enable-new-dashboard`) associated with a unit kind.
2. Provision flag changes with an App Lifecycle Manager rollout (batches, supervision, safety checks).
3. Access flags in the application (running in the provisioned unit, for example on Cloud Run or GKE) with an OpenFeature SDK using the `flagd` provider pointed at `saasconfig.googleapis.com`; inject the unit identifier into the application environment.

## Options / Props

### Data plane

| Setting | Description |
|---------|-------------|
| SDK | Vendor-neutral OpenFeature SDK with the `flagd` provider. |
| Endpoint | `saasconfig.googleapis.com:443`. |
| `provider_id` | Identifies the flag configuration; typically the full resource name of the unit, for example `projects/PROJECT_ID/locations/LOCATION/featureFlagsConfigs/UNIT_ID`. |
| Authentication | Application Default Credentials (ADC); the service account needs `roles/saasconfig.viewer`. |
| Evaluation | Standard OpenFeature methods, for example `client.get_boolean_value(...)`. |

### Flag value types

| Type | `--flag-value-type` | Variant field |
|------|---------------------|---------------|
| Boolean | `bool` | `booleanValue` |
| String | `string` | `stringValue` |
| Integer | `int` | `integerValue` |
| Double | `double` | `doubleValue` |

### Related capabilities (separate pages)

| Capability | Description |
|------------|-------------|
| Feature flag sets | Group multiple flags and manage them as one logical resource. |
| Manifests | Define flags in JSON files; push to the API or pull to generate type-safe accessors. |
| Complex targeting | Common Expression Language (CEL) targeting rules on user or request attributes. |
| Multi-tenant architecture | Target flags to specific units or groups (labels or tenants) and roll out gradually across tenants. |
| Allocations | Define allocations (such as experimental or baseline) and traffic splitting for tests or randomized rollouts. |

## Notes

- The `flags` commands exist only in the `beta` and `alpha` tracks of gcloud 593.0.0 (not GA); keep `gcloud beta`. The help lists `--flag-value-type` choices as lowercase `bool`, `double`, `int`, `string`; the flag key maximum length is 256 bytes (beta help).
- Non-boolean flags must be defined explicitly at creation. Percentage-based allocations are not supported for non-boolean flags; use the `defaultVariant` configuration or CEL-based targeting.
- Why rollouts: without staged rollouts, a flag change (for example enabling a feature for 1% of users) propagates instantly across all application instances, and a regression can hit the whole infrastructure at once; rollouts distribute flag changes gradually. Rollout of flag changes updates live units; try on a disposable project first.
- Benefits listed in the source: decoupling feature release from deployment, canary releases, allow listing and tenant customization, faster rollbacks by disabling a flag, unified management of flag configurations.
- The `flags` group is distinct from OpenFeature / third-party flag services; the `flagd` provider here connects to the App Lifecycle Manager config service.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [flags-quickstart.md](./flags-quickstart.md)
- [update-saas-offering.md](./update-saas-offering.md)
- [overview.md](./overview.md)
