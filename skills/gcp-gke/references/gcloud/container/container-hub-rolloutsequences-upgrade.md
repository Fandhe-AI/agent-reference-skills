---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/upgrade
---

# gcloud container hub rolloutsequences upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub rolloutsequences upgrade

```text
NAME
    gcloud container hub rolloutsequences upgrade - upgrade the clusters in a
        rollout sequence resource

SYNOPSIS
    gcloud container hub rolloutsequences upgrade ROLLOUTSEQUENCE
        (--control-plane-version=CONTROL_PLANE_VERSION
          | --node-version=NODE_VERSION) [--async] [--force]
        [--ignore-cluster-disruption-budgets] [--ignore-maintenance-policies]
        [--patch-only] [--prioritized]
        [--soak-duration-override-all-stages=SOAK_DURATION_OVERRIDE_ALL_STAGES
          | --soak-duration-overrides-per-stage=[STAGE_NUMBER=DURATION,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade the clusters in a rollout sequence resource.

POSITIONAL ARGUMENTS
     RolloutSequence resource - The group of arguments defining a Rollout
     Sequence. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rolloutSequence on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument rolloutSequence on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       ROLLOUTSEQUENCE
          ID of the rolloutSequence or fully qualified identifier for the
          rolloutSequence.

          To set the rollout_sequence attribute:
          + provide the argument rolloutSequence on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --control-plane-version=CONTROL_PLANE_VERSION
          The GKE cluster version to upgrade the control plane to.

       --node-version=NODE_VERSION
          The GKE version to upgrade the nodes to.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        Force rollout creation even if an active rollout exists on the first
        stage of the sequence.

     --ignore-cluster-disruption-budgets
        If set, the rollout will ignore the disruption budgets of the clusters.

     --ignore-maintenance-policies
        If set, the rollout will ignore any maintenance policies (Maintenance
        Windows and Maintenance Exclusions) set on the clusters.

     --patch-only
        If set, the rollout will only upgrade clusters that are already on the
        minor version of the target version, but are on an earlier patch
        version.

     --prioritized
        If set, conflicting rollouts will be paused, to allow this rollout to
        progress through the sequence. Conflicting rollouts running on the
        first stage will be canceled, to allow this rollout to be created.

     At most one of these can be specified:

       --soak-duration-override-all-stages=SOAK_DURATION_OVERRIDE_ALL_STAGES
          Overrides the soak duration for all stages of the rollout.

       --soak-duration-overrides-per-stage=[STAGE_NUMBER=DURATION,...]
          Overrides the soak duration for specific stages of the rollout, in
          the format STAGE_NUMBER=DURATION (e.g., 1=1h,2=30m).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub rolloutsequences upgrade

        $ gcloud beta container hub rolloutsequences upgrade
```

### gcloud beta container hub rolloutsequences upgrade

```text
NAME
    gcloud beta container hub rolloutsequences upgrade - upgrade the clusters
        in a rollout sequence resource

SYNOPSIS
    gcloud beta container hub rolloutsequences upgrade ROLLOUTSEQUENCE
        (--control-plane-version=CONTROL_PLANE_VERSION
          | --node-version=NODE_VERSION) [--async] [--force]
        [--ignore-cluster-disruption-budgets] [--ignore-maintenance-policies]
        [--patch-only] [--prioritized]
        [--soak-duration-override-all-stages=SOAK_DURATION_OVERRIDE_ALL_STAGES
          | --soak-duration-overrides-per-stage=[STAGE_NUMBER=DURATION,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub rolloutsequences upgrade

```text
NAME
    gcloud alpha container hub rolloutsequences upgrade - upgrade the clusters
        in a rollout sequence resource

SYNOPSIS
    gcloud alpha container hub rolloutsequences upgrade ROLLOUTSEQUENCE
        (--control-plane-version=CONTROL_PLANE_VERSION
          | --node-version=NODE_VERSION) [--async] [--force]
        [--ignore-cluster-disruption-budgets] [--ignore-maintenance-policies]
        [--patch-only] [--prioritized]
        [--soak-duration-override-all-stages=SOAK_DURATION_OVERRIDE_ALL_STAGES
          | --soak-duration-overrides-per-stage=[STAGE_NUMBER=DURATION,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
