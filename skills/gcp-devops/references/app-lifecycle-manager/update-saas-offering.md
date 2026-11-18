---
source: https://docs.cloud.google.com/app-lifecycle-manager/update-saas-offering
---

# Update a SaaS offering

App Lifecycle Manager updates multiple provisioned units with rollouts. A rollout targets units by their `UnitKind` and can apply a `unit_filter` (Google Cloud CLI only; filters cannot be applied in the Google Cloud console) to target a subset. Update flow: create a release (the update itself), create a rollout kind (how the release is deployed), then create a rollout. A rollback is performed by upgrading units to a previous release. For a single unit, use the controls on the Unit details page.

## Signature / Usage

### Create a release

The source gives this usage pattern (square brackets mark optional flags):

```text
gcloud app-lifecycle-manager releases create RELEASE_NAME --blueprint-package=BLUEPRINT_PACKAGE_URI --unit-kind=UNIT_KIND [--location=LOCATION] [--labels=[KEY=VALUE,...]] [--upgradeable-from-releases=[RELEASE_NAME,...]] [--input-variable-defaults=[variable=VARIABLE,value=VALUE,type=TYPE,...]]
```

Runnable example from the gcloud help:

Adapted (not in the official docs): the help example is line-wrapped (the blueprint URI and `--input-variable-defaults` value are split across lines); the lines are joined so the command runs.

```bash
gcloud app-lifecycle-manager releases create my-release \
    --location=us-central1 --unit-kind=my-unit-kind \
    --blueprint-package=us-central1-docker.pkg.dev/my-project/my-repo/my-blueprint:v2 \
    --upgradeable-from-releases=my-old-release \
    --input-variable-defaults=variable=instance_name,value=my-instance,type=string --labels=env=prod
```

### Create a rollout kind

Adapted (not in the official docs): the source command uses `--rollout_strategy`, `--error_budget`, `--unit_filter` and `--update_unit_kind_default`, which do not exist in gcloud 593.0.0; the flags below are the ones in the help for `rollout-kinds create` (`--unit-kind` is required).

```bash
gcloud app-lifecycle-manager rollout-kinds create ROLLOUT_KIND_NAME \
  --unit-kind=UNIT_KIND \
  --location=LOCATION \
  --rollout-orchestration-strategy=ROLLOUT_STRATEGY \
  --error-budget-allowed-count=ALLOWED_COUNT \
  --unit-filter=UNIT_FILTER \
  --update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY
```

### Create a rollout

```bash
gcloud app-lifecycle-manager rollouts create ROLLOUT_NAME --rollout-kind=ROLLOUT_KIND_NAME --release=RELEASE_NAME --location=LOCATION
```

Filter example from the gcloud help (only units labeled `env=prod`):

```bash
gcloud app-lifecycle-manager rollouts create my-rollout \
    --location=us-central1 --release=my-release \
    --rollout-kind=my-rollout-kind \
    --unit-filter="unit.labels['env'] == 'prod'"
```

## Options / Props

### Release flags

| Flag | Description |
|------|-------------|
| `RELEASE_NAME` | ID of the release; part of the full resource name. |
| `--blueprint-package` | URI of the blueprint package (OCI image in Artifact Registry or another OCI registry; contains artifacts, engine metadata (Terraform) and version). If the hostname is omitted, the regional Artifact Registry path (for example `us-east1-docker.pkg.dev`) is assumed. Cannot be changed after the release is created. |
| `--unit-kind` | ID or fully qualified identifier of the unit kind. Immutable after creation. |
| `--location` | Fallback location when the full URI path is not provided; defaults to the location configured in your gcloud environment. |
| `--labels` | Optional. Keys start with a lowercase character; keys and values contain only hyphens, underscores, lowercase characters and numbers (for example `--labels=environment=staging,team=app-lifecycle-manager`). |
| `--upgradeable-from-releases` | Optional comma-separated release names that can be updated to this release. Empty means no constraint; when set, unit update requests to this release enforce it. |
| `--input-variable-defaults` | Optional defaults for blueprint input variables; inline or a YAML / JSON file; overridable at rollout creation. Maximum of 100 input variables; types `string`, `int`, `bool`, `struct`, `list` (gcloud help). |

### Rollout kind flags

| Flag | Values / description |
|------|----------------------|
| `--rollout-orchestration-strategy` | `Google.Cloud.Simple.OneLocationAtATime`, `Google.Cloud.Simple.AllAtOnce`, `Google.Cloud.Progressive.Gradual.v1`, `Google.Cloud.Progressive.SingleLocation.v1` (see rollout-strategies). |
| `--unit-kind` | Required. Releases apply to all units of this unit kind; cannot change after creation. |
| `--error-budget-allowed-count` | Maximum failed units allowed in a location without pausing (gcloud help). |
| `--error-budget-allowed-percentage` | Maximum percentage of units allowed to fail in a location; greater than 0 and at most 100 (gcloud help). |
| `--unit-filter` | CEL (Common Expression Language) filter selecting the eligible units; it can only reduce the scope of the rollout, never expand it. |
| `--update-unit-kind-strategy` | `on-start` (default; update the unit kind when the rollout starts) or `never` (gcloud help). REST enum: `UPDATE_UNIT_KIND_STRATEGY_UNSPECIFIED`, `UPDATE_UNIT_KIND_STRATEGY_ON_START`, `UPDATE_UNIT_KIND_STRATEGY_NEVER`. |

### Rollout flags (gcloud help)

| Flag | Description |
|------|-------------|
| `--rollout-orchestration-strategy` | Overrides the rollout kind's strategy for this rollout. |
| `--unit-filter` | If empty, the rollout kind's filter is used. |
| `--control-action` | `cancel` (permanently), `pause` (until `run` is requested), `run` (continue to a terminal state; retryable errors pause the rollout by default). Only for non-terminal rollouts. |
| `--[no-]retry-failed-operations` | With `--control-action=run`, retry failed operations when resuming a paused rollout (default retries). |

### Console strategies

| Console label | Value |
|---------------|-------|
| One location at a time (simple) | `Google.Cloud.Simple.OneLocationAtATime` |
| All at once (simple) | `Google.Cloud.Simple.AllAtOnce` |
| Progressive (gradual) | `Google.Cloud.Progressive.Gradual.v1` |
| Progressive (single location) | `Google.Cloud.Progressive.SingleLocation.v1` |

## Notes

- Warning: a rollout updates every eligible unit of the unit kind with the release's Terraform, run by the actuation service account, which can create, modify and delete resources. If `error_budget` is not set, App Lifecycle Manager attempts to update all units regardless of the number of failures. Try releases and rollouts on a disposable project first, narrow the scope with `--unit-filter`, and pick a progressive strategy for production.
- Warning: rollouts reuse variables used at provisioning (for example `tenant_project_id`). If you add a variable when creating a new release, all previously set values of `tenant_project_id` are overridden (Console note); the gcloud note says the variable is reused "unless explicitly overridden".
- Corrected from the official docs: the source command lists `--rollout_strategy=ROLLOUT_STRATEGY --error_budget=ERROR_BUDGET --unit_filter=UNIT_FILTER --update_unit_kind_default=UPDATE_UNIT_KIND_DEFAULT`; these flags are not in gcloud 593.0.0 help (GA or beta). The source says the error budget pauses a rollout when failures exceed `allowed_count` or `allowed_ratio` * `total_units`; the gcloud help and the rollout-strategies page use `allowed_percentage` (pause when the number of failed units in a location exceeds the larger of the count and the percentage of units).
- The source says the rollout updates units "according to the strategy defined in the unit kind"; the strategy is defined in the rollout kind.
- Releases and rollout kinds in the source can be created in the Console; the console applies no filters. The source's `UPDATE_UNIT_KIND_STRATEGY_*` values are the REST names for `--update-unit-kind-strategy`.
- Resources are replicated across regions only by Console operations, not by gcloud (see regionalization).
- The `gcloud app-lifecycle-manager` GA commands above use `--release`; in the `beta` track `rollouts create` accepts `--flag-release` or `--release` (see flags-quickstart).
- The source also shows Console steps for releases, rollout kinds and rollouts.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/releases/create (gcloud 593.0.0 help, second example).
- Adapted from the official docs: the help's line wrapping of the release example is joined into one runnable command.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/update-saas-offering (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [rollout-strategies.md](./rollout-strategies.md)
- [deploy-saas-offering.md](./deploy-saas-offering.md)
- [variables.md](./variables.md)
- [regionalization.md](./regionalization.md)
- [service-accounts.md](./service-accounts.md)
- [flags-quickstart.md](./flags-quickstart.md)
