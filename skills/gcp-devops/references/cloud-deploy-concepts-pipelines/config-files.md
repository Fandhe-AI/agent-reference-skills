---
source: https://docs.cloud.google.com/deploy/docs/config-files
---

# Cloud Deploy configuration file schema

The configuration file or files define the delivery pipeline, the targets to deploy to, and their progression. By convention a file containing both pipeline and target configs is `clouddeploy.yaml`, and a pipeline config without targets is `delivery-pipeline.yaml`; any name works. `Target`, `CustomTargetType`, `Automation` and `DeployPolicy` definitions can live in the same file (separated by `---`) or in separate files. After defining the files, register them with `gcloud deploy apply` (see create-pipeline-targets).

## Signature / Usage

### Structure of a configuration file

Templates below are schema skeletons (empty values, `[...]` placeholders), not applyable YAML.

```text
# Delivery pipeline config
apiVersion: deploy.cloud.google.com/v1
kind: DeliveryPipeline
metadata:
 name:
 annotations:
 labels:
description:
suspended:
serialPipeline:
 stages:
 - targetId:
   profiles: []
# Deployment strategies
# One of:
#   standard:
#   canary:
# See the strategy section in this document for details.
   strategy:
     standard:
       predeploy:
         tasks: []
       verify:
         tasks: []
       analysis:
       postdeploy:
         tasks: []
   deployParameters:
   - values:
     matchTargetLabels:
 - targetId:
   profiles: []
   strategy:
   deployParameters:
```

### GKE target

```text
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name:
 annotations:
 labels:
description:
deployParameters:
multiTarget:
 targetIds: []

requireApproval:
gke:
 cluster: projects/[project_name]/locations/[location]/clusters/[cluster_name]
 dnsEndpoint:
 internalIp:
 proxyUrl:

associatedEntities:
  [KEY]:
    gkeClusters:
    - cluster: projects/[project_name]/locations/[location]/clusters/[cluster_name]
      dnsEndpoint: [true|false]
      internalIp: [true|false]
      proxyUrl:

executionConfigs:
- usages:
  - [RENDER | PREDEPLOY | DEPLOY | VERIFY | POSTDEPLOY | ANALYSIS]
  workerPool:
  serviceAccount:
  artifactStorage:
  executionTimeout:
  verbose:
```

```yaml
gke:
  cluster: projects/cd-demo-01/locations/us-central1/clusters/prod
```

### GKE attached clusters target

```yaml
anthosCluster:
  membership: projects/cd-demo-01/locations/global/memberships/prod
```

### Custom target

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
  name: sample-env
customTarget:
  customTargetType: basic-custom-target
```

### Deploy parameters

```yaml
deployParameters:
- values:
    someKey: "value1"
  matchTargetLabels:
    label1: firstLabel
- values:
    someKey: "value2"
  matchTargetLabels:
    label2: secondLabel
```

## Options / Props

### DeliveryPipeline

| Field | Description |
|---|---|
| `metadata.name` | String, unique per project and location. |
| `metadata.annotations`, `metadata.labels` | Stored with the pipeline resource after registration. |
| `description` | Arbitrary string shown in the pipeline details in the Google Cloud console. |
| `suspended` | Boolean; `true` suspends the pipeline so it can't create, promote, roll back or redeploy releases, and you can't approve or reject a rollout from it. Default `false`. |
| `serialPipeline` | Start of a serial-progression pipeline. Required. |
| `serialPipeline.stages` | Ordered list of targets (first listed is the first deployment). |
| `stages[].targetId` | `metadata.name` of the target definition. |
| `stages[].profiles` | Zero or more Skaffold profile names from `skaffold.yaml`, used with `skaffold render` when creating the release. |
| `stages[].strategy` | `standard` (default; omit `strategy` for it) or `canary`. Defined per target. |
| `stages[].deployParameters` | Key-value `values` passed to manifests of targets matched by `matchTargetLabels`. Can also be set on targets. |

### strategy details

| Field | Description |
|---|---|
| `standard.verify` | `true`, or `tasks: [...]` run sequentially right after the deploy job. Optional; if omitted there is no verify job. Default standard strategy has verification `false`. |
| `verify: true` | Requires a `verify` stanza in `skaffold.yaml`. Valid under `strategy.standard`, `strategy.canary.canaryDeployment`, or each phase of `customCanaryDeployment`. |
| `analysis` | Optional; for Cloud Deploy analysis. Per-phase analysis requires a custom canary. |
| `predeploy` / `postdeploy` | Hooks, as `tasks` or Skaffold `actions` (the name configured in `skaffold.yaml` `customActions.name`). Predeploy runs immediately before the deploy job; postdeploy runs after all other jobs including verify and analysis. Valid under any strategy. |
| `canary.runtimeConfig.cloudRun.automaticTrafficControl` | Must be `true` for Cloud Run targets unless you configure a custom canary. |
| `kubernetes.serviceNetworking` | `service`, `deployment`, `disablePodOverprovisioning`. |
| `kubernetes.gatewayServiceMesh` | `httpRoute`, `service`, `deployment`, `routeUpdateWaitTime` (wait after applying `HTTPRoute` changes if propagation delays drop requests), `routeDestinations.destinationIds` / `propagateService`. |
| `customCanaryDeployment[]` | Per phase: `name`, `percent`, `profiles`, `verify`, `analysis`. Runtime-specific `runtimeConfig` is omitted for custom canary but included for automated and custom-automated canary. |

### Target

| Field | Description |
|---|---|
| `metadata.name` | Unique per region. |
| `metadata.annotations`, `metadata.labels` | Optional; stored with the target resource. |
| `description` | Arbitrary string. |
| `deployParameters` | Key-value pairs assigned to manifest keys after rendering. On a multi-target, the value is assigned to all its child targets. |
| `multiTarget.targetIds` | Optional; list of child targets for parallel deployment. Child targets are normal targets without `multiTarget`. |
| `requireApproval` | `true` or `false`; optional, default `false`. For parallel deployment, require approval on the multi-target only, not child targets. |
| `gke.cluster` | `projects/[project_name]/locations/[location]/clusters/[cluster_name]`; location can be regional (`us-central1`) or zonal (`us-central1-c`). Omit `gke` on a multi-target. |
| `gke.dnsEndpoint` | `true` connects via the cluster's DNS endpoint. Cannot be combined with `internalIp`. |
| `gke.internalIp` | `true` connects via the private IP. Cannot be combined with `dnsEndpoint`; DNS endpoint is recommended because its network configuration is much simpler. |
| `gke.proxyUrl` | URL of an HTTP proxy, passed to kubectl. |
| `associatedEntities.[KEY]` | Name referenced from `routeDestinations` in a canary configuration; holds `gkeClusters[]` with `cluster`, `dnsEndpoint`, `internalIp`, `proxyUrl`. |
| `run.location` | `projects/[project_name]/locations/[location]` where the Cloud Run service is created. Omit `run` on a multi-target. |
| `anthosCluster.membership` | `projects/[project_name]/locations/global/memberships/[membership_name]`; location is always `global`. `dnsEndpoint` / `internalIp` don't apply. Omit on a multi-target. |
| `customTarget.customTargetType` | Name from the `CustomTargetType` definition. A custom target has no `gke`, `run` or `anthosCluster`. |

### executionConfigs

All `executionConfigs` properties are optional. If you specify a configuration for either RENDER or DEPLOY you must do so for the other, even if only `usages:`.

| Field | Description |
|---|---|
| `usages` | `RENDER`, `DEPLOY`, plus `PREDEPLOY`, `VERIFY`, `POSTDEPLOY`, `ANALYSIS` if enabled on the target. If a custom environment is set for `RENDER` and `DEPLOY`, you must specify one for `VERIFY` / `PREDEPLOY` / `POSTDEPLOY` / `ANALYSIS` when configured on the pipeline; otherwise the default environment is used. You can't specify those four unless `RENDER` and `DEPLOY` are specified in the same or separate custom environments. |
| `workerPool` | Cloud Build worker pool path, e.g. `projects/p123/locations/us-central1/workerPools/wp123`. Omit for the default pool. A target can have two (one for `RENDER`, one for `DEPLOY`). |
| `serviceAccount` | Service account for the operation (`RENDER` or `DEPLOY`). |
| `artifactStorage` | Cloud Storage bucket for the operation instead of the default bucket. |
| `executionTimeout` | Optional; seconds for Cloud Build operations. Default `3600` (1 hour). Example `"5000s"`. |
| `verbose` | Optional; `true` sets Skaffold `--verbosity` to `debug` (default `warn`), kubectl `--v` to `4` (default `2`), gcloud `--verbosity` to `debug` (default `warning`). |

A multi-target's `executionConfigs` can be inherited by each child target.

### CustomTargetType

| Field | Description |
|---|---|
| `metadata.name` | Arbitrary name referenced by targets that use this type. |
| `customActions.renderAction` | `customAction.name` in `skaffold.yaml` for render. |
| `customActions.deployAction` | `customAction.name` in `skaffold.yaml` for deploy. |
| `customActions.includeSkaffoldModules` | `configs` from `googleCloudStorage` (`source`, `path`) or `git` (`repo`, `path`, `ref`). |

### Automation

| Field | Description |
|---|---|
| `metadata.name` | `[PIPELINE_NAME]/[PURPOSE]`; `PIPELINE_NAME` is the pipeline's `metadata.name`. Automations are exclusive to the pipeline they are created for. |
| `suspended` | `true` means the automation isn't used (useful for testing). |
| `serviceAccount` | Required. Cloud Deploy doesn't use the default service account for automations. Needs `actAs` permission to impersonate the execution service account and the permission for the automated operation (for example `clouddeploy.rollouts.create`, `clouddeploy.rollouts.advance`). |
| `selector.targets[].id` | Target ID; `*` selects all targets in the pipeline. |
| `selector.targets[].labels` | Key-value pairs matched against target labels. |
| `rules[]` | Rule type is `promoteReleaseRule`, `timedPromoteReleaseRule`, `advanceRolloutRule` or `repairRolloutRule`; several rules, including several of one type, are allowed. Each rule needs an `id` unique within the automation; the rest is rule-specific. |

### DeployPolicy

| Field | Description |
|---|---|
| `metadata.name` | Unique per project and location; lower-case letters, numbers and hyphens, first character a letter, last a letter or number, 63 characters maximum. |
| `suspended` | `true` deactivates the policy. |
| `selectors[].deliveryPipeline.id` / `.labels` | Pipeline ID (`*` for all) and/or labels. |
| `selectors[].target.id` / `.labels` | Target ID (`*` for all) and/or labels. |
| `rules[]` | The only valid rule type is `rolloutRestriction`. |

### rolloutRestriction

| Field | Description |
|---|---|
| `id` | Required; same format as the policy name, unique within the policy. |
| `actions` | Optional; empty restricts all. `ADVANCE` (phases can't be advanced), `APPROVE` (promotion can't be approved), `CANCEL`, `CREATE`, `IGNORE_JOB`, `RETRY_JOB`, `ROLLBACK`, `TERMINATE_JOBRUN`. |
| `invokers` | `USER` (for example a manual gcloud command), `DEPLOY_AUTOMATION`; default both. |
| `timeWindows.timeZone` | Required; IANA format, e.g. `America/New_York`. |
| `oneTimeWindows[].start` / `end` | Required; format `"yyyy-mm-dd hh:mm"`; `00:00` for start of day, `24:00` for end of day. |
| `weeklyWindows[].daysOfWeek` | `SUNDAY` through `SATURDAY`; blank matches all days. |
| `weeklyWindows[].startTime` / `endTime` | `00:00` to `24:00`; if you give a start time you must give an end time. |

### analysis

| Field | Description |
|---|---|
| `duration` | Time to run the analysis in seconds, minutes or hours, e.g. `200s`. |
| `googleCloud.alertPolicyChecks[]` | `id` (unique, shown in results), `alertPolicies` (names of alert policies in Google Cloud Observability), `labels` (key-value pairs to match). Any number of checks. |
| `customChecks[]` | `id`, `frequency` (e.g. `300s`), `task` of `type: container` with `image`, `command` (for example `/bin/sh`), `args` (then `-c` plus the command), `env`. |

## Notes

- The pipeline file may contain any number of pipeline definitions; a target can be reused by multiple pipelines but referenced only once in one pipeline's progression.
- Your organization can keep target definitions separate from the pipeline definition so that different roles manage them.
- Source's `apiVersion` is `deploy.cloud.google.com/v1`; `skaffold.yaml` apiVersion values are covered on the Skaffold pages, not here.
- Source typo kept out of the tables: the page spells the per-phase analysis path `strategy.canary.customCanaryDepolyment.phaseConfigs.phaseId.analysis`; the field is `customCanaryDeployment` (as in the strategy table).
- The source also shows Console steps and field-by-field prose for repeated properties of the Cloud Run target; the Target table covers them. Terraform is not shown.
- Omitted code blocks (the tables below cover their fields): the Target, `CustomTargetType`, `Automation` parts of the combined skeleton, the Cloud Run target skeleton, the `CustomTargetType` skeleton, the standard / canary / custom canary strategy skeletons, hook (`tasks` / `actions`) and analysis (`alertPolicyChecks` / `customChecks`) snippets, the legacy `executionConfigs` syntax (`privatePool` / `defaultPool`), and the `Automation`, `DeployPolicy` and `rolloutRestriction` skeletons. The pipeline skeleton shown is the first part of the source's combined skeleton. Rule-specific automation configuration is on the automation-rules page.
- Corrected from the official docs: the Automation `serviceAccount` row names `clouddeploy.releases.promote` as the permission for promoting; no such permission exists in the Cloud Deploy IAM permission list, and the automation rules page names `clouddeploy.rollouts.create` for `promoteReleaseRule`, so that permission is shown here.
- Source: https://docs.cloud.google.com/deploy/docs/config-files (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-pipeline-targets.md](./create-pipeline-targets.md)
- [promote-release.md](./promote-release.md)
- [terminology.md](./terminology.md)
- [architecture.md](./architecture.md)
