---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/clusterupgrade/describe
---

# gcloud container fleet clusterupgrade describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet clusterupgrade describe

```text
NAME
    gcloud container fleet clusterupgrade describe - describe the
        clusterupgrade feature for a fleet within a given project

SYNOPSIS
    gcloud container fleet clusterupgrade describe
        [--show-linked-cluster-upgrade] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the Fleet clusterupgrade feature used for configuring fleet-based
    rollout sequencing.

EXAMPLES
    To view the cluster upgrade feature information for the current fleet, run:

        $ gcloud container fleet clusterupgrade describe

FLAGS
     --show-linked-cluster-upgrade
        Shows the cluster upgrade feature information for the current fleet as
        well as information for all other fleets linked in the same rollout
        sequence (provided that the caller has permission to view the upstream
        and downstream fleets). This displays cluster upgrade information for
        fleets in the current fleet's rollout sequence in order of furthest
        upstream to downstream.

        To view the cluster upgrade feature information for the rollout
        sequence containing the current fleet, run:

            $ gcloud container fleet clusterupgrade describe \
                --show-linked-cluster-upgrade

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet clusterupgrade describe

        $ gcloud beta container fleet clusterupgrade describe
```

### gcloud beta container fleet clusterupgrade describe

```text
NAME
    gcloud beta container fleet clusterupgrade describe - describe the
        clusterupgrade feature for a fleet within a given project

SYNOPSIS
    gcloud beta container fleet clusterupgrade describe
        [--show-linked-cluster-upgrade] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet clusterupgrade describe

```text
NAME
    gcloud alpha container fleet clusterupgrade describe - describe the
        clusterupgrade feature for a fleet within a given project

SYNOPSIS
    gcloud alpha container fleet clusterupgrade describe
        [--show-linked-cluster-upgrade] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/clusterupgrade/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
