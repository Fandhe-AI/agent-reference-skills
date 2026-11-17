---
source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-learn
---

# Overview of attack exposure scores and attack paths

The Security Command Center Risk Engine runs attack path simulations that produce attack exposure scores and attack paths, so you can prioritize exposure routes to your high-value resources. Available on the Premium and Enterprise (Deprecated) service tiers, and only with organization-level activation (project-level activations are not supported). Attack paths represent possibilities, not evidence of an actual attack.

## Signature / Usage

### Priority values in a resource value configuration

A resource value configuration assigns the matching high-value resources one of these priority values; `LOW` resources are still high-value resources, only with a lower priority in the simulations.

```text
- `LOW` = 1
- `MEDIUM` = 5
- `HIGH` = 10
- `NONE` = 0
```

### View attack exposure scores of high-value resources (Console)

1. Open the Security Command Center **Assets** page and select the organization where Security Command Center is activated.
2. Select the **High value resource set** tab; resources are listed in descending order of attack exposure score.
3. Click the number in the **Attack exposure score** column to display the attack paths from the public internet to the resource; click a node for links to related findings.

The scores are also available on **Settings** > **Attack Path simulation** tab > **View valued resources used in last simulation**.

## Options / Props

### Priority values

| Resource value in a configuration | Numeric value |
|------|------|
| `HIGH` | 10 |
| `MEDIUM` | 5 |
| `LOW` | 1 |
| `NONE` | 0 (excludes matching resources from the high-value set; overrides other configurations) |

### Limits and schedule

| Item | Value |
|------|-------|
| Resource attack exposure score range | 0 to 10 |
| Finding attack exposure score | No fixed upper limit |
| Simulation schedule | New results up to every 48 hours; not triggered by changes to resources or resource value configurations |
| Resource instances in a high-value resource set | 1,000 per cloud service provider |
| Resource value configurations | Up to 100 per Google Cloud organization |

### Resource types that receive attack exposure scores (Google Cloud)

| Resource type |
|------|
| `aiplatform.googleapis.com/Dataset`, `Featurestore`, `MetadataStore`, `Model`, `ReasoningEngine`, `TrainingPipeline` |
| `artifactregistry.googleapis.com/Repository` |
| `bigquery.googleapis.com/Dataset` |
| `cloudbuild.googleapis.com/BitbucketServerConfig`, `BuildTrigger`, `Connection`, `GithubEnterpriseConfig`, `Repository`, `WorkerPool` |
| `cloudfunctions.googleapis.com/CloudFunction` |
| `compute.googleapis.com/Instance` |
| `container.googleapis.com/Cluster` |
| `dataproc.googleapis.com/Cluster`, `Job` |
| `run.googleapis.com/Job`, `Service` |
| `spanner.googleapis.com/Instance` |
| `sqladmin.googleapis.com/Instance` |
| `storage.googleapis.com/Bucket` |

### Default high-value resource set (Google Cloud)

| Resource type |
|------|
| `aiplatform.googleapis.com/Model`, `ReasoningEngine` |
| `artifactregistry.googleapis.com/Repository` |
| `bigquery.googleapis.com/Dataset` |
| `cloudbuild.googleapis.com/BuildTrigger` |
| `cloudfunctions.googleapis.com/CloudFunction` |
| `compute.googleapis.com/Instance` |
| `run.googleapis.com/Job`, `Service` |
| `spanner.googleapis.com/Instance` |
| `sqladmin.googleapis.com/Instance` |
| `storage.googleapis.com/Bucket` |

### Resource types with automatic data-sensitivity priority values

| Provider | Resource types |
|------|------|
| Google Cloud | `aiplatform.googleapis.com/Dataset`, `bigquery.googleapis.com/Dataset`, `sqladmin.googleapis.com/Instance`, `storage.googleapis.com/Bucket` |
| AWS | Amazon S3 bucket |

### Node types in an attack path

| Node type | Meaning |
|------|------|
| Entry point | Start of the simulated attack: the public internet |
| Affected resource | A resource an attacker can use to move forward on a path |
| Exposed resource | End of a path; a resource in a defined or default high-value resource set |

## Notes

- Tier: Premium and Enterprise (Deprecated) service tiers, organization-level activation required. The Enterprise service tier shuts down on May 21, 2027; an organization using it moves automatically to Premium on or after May 21, 2027. Multicloud (AWS, Azure) risk assessments are Enterprise (Deprecated) only. External exposure findings are Preview.
- A high attack exposure score does not mean an attack is in progress; watch `THREAT` class findings from Event Threat Detection and Container Threat Detection for actual attacks. A score of `0` does not mean no risk (internal actors, zero-day vulnerabilities and third-party infrastructure are not modeled).
- Simulations always start from the public internet and use a virtual external, persistent, skilled attacker. They are read-only (agentless, API read access) and do not touch the live environment.
- Score calculation: priority value of the exposed high-value resources, number of possible paths, percentage of simulations in which the attacker reaches the resource, and (findings only) the number of high-value resources exposed. Resource score is roughly percentage of successful attacks multiplied by priority value; finding score uses the same calculation multiplied by the number of high-value resources the finding exposes.
- `INACTIVE` and `MUTED` findings are excluded from simulations, receive no score and do not appear in attack paths. Muting does not generally change the environment model, except muting vulnerability findings, where `MUTED` is treated as "not exploitable"; do not mute vulnerability findings that may still be exploitable. Muting is a disruptive change to the risk picture; try it on a disposable finding first.
- A finding or resource may have no score if it was created or added to the high-value set after the latest simulation, or if the finding category or resource type is unsupported.
- If several configurations assign different values to one resource, the highest applies unless one assigns `NONE`; keep `NONE` configurations narrow.
- If configurations exist but none match a resource, Security Command Center generates an `SCC Error` finding and falls back to the default set. When more than 1,000 resources match, those with the lowest assigned value are excluded first; an `SCC error` finding and a message on the **Attack path simulation** settings tab alert you (no `SCC error` finding if the default set exceeds the limit).
- Default set: resources get `LOW`, or `HIGH` / `MEDIUM` when Sensitive Data Protection discovery finds high / medium sensitivity data. Risk Engine uses heuristics on tags, labels and resource names. Define your own set for accurate scores; do not mark adjacent resources (for example a jump server) as high value.
- Sensitive Data Protection prioritization: `MEDIUM` / `HIGH` sensitivity maps by default to the same priority value; resources with only low-sensitivity data are not designated high value (use a duplicate configuration with `LOW` for that).
- CVE data considered: attack vector, attack complexity, exploitation activity (Mandiant assessments); a vulnerability with no known exploitation activity is not considered.
- Container nodes for ReplicaSet, Deployment, Job, CronJob and DaemonSet controllers can represent multiple instances. Lines show potential accessibility, not a relationship defined in Google Cloud; upstream nodes have `AND` or `OR` relationships.
- Source: https://docs.cloud.google.com/security-command-center/docs/attack-exposure-learn (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [attack-exposure-define-high-value-resource-set.md](./attack-exposure-define-high-value-resource-set.md)
- [attack-exposure-supported-features.md](./attack-exposure-supported-features.md)
- [toxic-combinations-overview.md](./toxic-combinations-overview.md)
- [risk-reports-overview.md](./risk-reports-overview.md)
