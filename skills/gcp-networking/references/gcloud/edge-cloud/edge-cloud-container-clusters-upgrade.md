---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/upgrade
---

# gcloud edge-cloud container clusters upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container clusters upgrade

```text
NAME
    gcloud edge-cloud container clusters upgrade - upgrade an Edge Container
        cluster

SYNOPSIS
    gcloud edge-cloud container clusters upgrade
        (CLUSTER : --location=LOCATION) --schedule=SCHEDULE --version=VERSION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade an Edge Container cluster.

EXAMPLES
    To upgrade an Edge Container cluster to 1.5.1 immediately, run:

        $ gcloud edge-cloud container clusters upgrade my-cluster \
            --version=1.5.1 --schedule=IMMEDIATELY

POSITIONAL ARGUMENTS
     Cluster resource - Edge Container cluster to upgrade. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --schedule=SCHEDULE
        Schedule to upgrade a cluster after the request is acknowledged by
        Google. Support values: IMMEDIATELY.

     --version=VERSION
        Target cluster version to upgrade to. For example: "1.5.1".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters upgrade
```

### gcloud alpha edge-cloud container clusters upgrade

```text
NAME
    gcloud alpha edge-cloud container clusters upgrade - upgrade an Edge
        Container cluster

SYNOPSIS
    gcloud alpha edge-cloud container clusters upgrade
        (CLUSTER : --location=LOCATION) --schedule=SCHEDULE --version=VERSION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud edge-cloud container clusters upgrade` example omits `--location`, which the SYNOPSIS requires for the cluster (`(CLUSTER : --location=LOCATION)`; no property sets it, and gcloud 593.0.0 fails with "Failed to find attribute [location]"). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
