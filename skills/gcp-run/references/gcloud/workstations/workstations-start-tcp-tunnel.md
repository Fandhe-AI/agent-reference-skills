---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start-tcp-tunnel
---

# gcloud workstations start-tcp-tunnel

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workstations start-tcp-tunnel

```text
NAME
    gcloud workstations start-tcp-tunnel - start a tunnel through which a local
        process can forward TCP traffic to the workstation

SYNOPSIS
    gcloud workstations start-tcp-tunnel
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        WORKSTATION_PORT [--endpoint-mode=ENDPOINT_MODE]
        [--local-host-port=LOCAL_HOST_PORT; default="localhost:0"]
        [--start-workstation] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Start a tunnel through which a local process can forward TCP traffic to the
    workstation.

    Note that arguments for the NO_PROXY environment variable must be FQDNs.

EXAMPLES
    To start a tunnel to port 22 on a workstation, run:

        $ gcloud workstations start-tcp-tunnel --project=my-project \
            --region=us-central1 --cluster=my-cluster --config=my-config \
            my-workstation 22

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

     WORKSTATION_PORT
        The port on the workstation to which traffic should be sent.

FLAGS
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

     --local-host-port=LOCAL_HOST_PORT; default="localhost:0"
        LOCAL_HOST:LOCAL_PORT on which gcloud should bind and listen for
        connections that should be tunneled.

        LOCAL_PORT may be omitted, in which case it is treated as 0 and an
        arbitrary unused local port is chosen. The colon also may be omitted in
        that case.

        If LOCAL_PORT is 0, an arbitrary unused local port is chosen.

     --start-workstation
        If set, automatically starts the workstation if it is currently
        stopped.

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

        $ gcloud alpha workstations start-tcp-tunnel

        $ gcloud beta workstations start-tcp-tunnel
```

### gcloud beta workstations start-tcp-tunnel

```text
NAME
    gcloud beta workstations start-tcp-tunnel - start a tunnel through which a
        local process can forward TCP traffic to the workstation

SYNOPSIS
    gcloud beta workstations start-tcp-tunnel
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        WORKSTATION_PORT [--endpoint-mode=ENDPOINT_MODE]
        [--local-host-port=LOCAL_HOST_PORT; default="localhost:0"]
        [--start-workstation] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workstations start-tcp-tunnel

```text
NAME
    gcloud alpha workstations start-tcp-tunnel - start a tunnel through which a
        local process can forward TCP traffic to the workstation

SYNOPSIS
    gcloud alpha workstations start-tcp-tunnel
        (WORKSTATION : --cluster=CLUSTER --config=CONFIG --region=REGION)
        WORKSTATION_PORT [--endpoint-mode=ENDPOINT_MODE]
        [--local-host-port=LOCAL_HOST_PORT; default="localhost:0"]
        [--start-workstation] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start-tcp-tunnel (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
