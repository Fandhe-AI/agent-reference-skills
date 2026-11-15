---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/update
---

# gcloud workstations update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workstations update

```text
NAME
    gcloud workstations update - update a workstation

SYNOPSIS
    gcloud workstations update
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [--pd-disk-size=PD_DISK_SIZE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a workstation's properties, such as its persistent directory disk
    size.

EXAMPLES
    To update the persistent directory disk size to 500GB, run:

        $ gcloud workstations update WORKSTATION --pd-disk-size=500

POSITIONAL ARGUMENTS
     Workstation resource - The group of arguments defining a workstation The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument workstation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKSTATION
          ID of the workstation or fully qualified identifier for the
          workstation.

          To set the workstation attribute:
          + provide the argument workstation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --cluster=CLUSTER
          The cluster for the workstation.

          To set the cluster attribute:
          + provide the argument workstation on the command line with a fully
            specified name;
          + provide the argument --cluster on the command line;
          + set the property workstations/cluster.

       --config=CONFIG
          The config for the workstation.

          To set the config attribute:
          + provide the argument workstation on the command line with a fully
            specified name;
          + provide the argument --config on the command line;
          + set the property workstations/config.

       --region=REGION
          The region for the workstation.

          To set the region attribute:
          + provide the argument workstation on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property workstations/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     Persistent directory settings.

     --pd-disk-size=PD_DISK_SIZE
        Specifies the desired size in GB of the persistent directory mounted at
        /home.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha workstations update

        $ gcloud beta workstations update
```

### gcloud beta workstations update

```text
NAME
    gcloud beta workstations update - update a workstation

SYNOPSIS
    gcloud beta workstations update
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [--pd-disk-size=PD_DISK_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations update

```text
NAME
    gcloud alpha workstations update - update a workstation

SYNOPSIS
    gcloud alpha workstations update
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        [--async] [--endpoint-mode=ENDPOINT_MODE] [--pd-disk-size=PD_DISK_SIZE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
