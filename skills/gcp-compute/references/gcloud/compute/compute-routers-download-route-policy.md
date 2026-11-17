---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/download-route-policy
---

# gcloud compute routers download-route-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers download-route-policy

```text
NAME
    gcloud compute routers download-route-policy - download a route policy from
        a Compute Engine router

SYNOPSIS
    gcloud compute routers download-route-policy NAME --file-name=FILE_NAME
        --policy-name=POLICY_NAME [--file-format=FILE_FORMAT] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers download-route-policy downloads a route policy from
    a Compute Engine router.

EXAMPLES
    To download a route policy my-export-policy to a file my-export-policy.yaml
    from a router my-router in region us-central1, run:

        $ gcloud compute routers download-route-policy my-router \
            --region=us-central1 --policy-name=my-export-policy \
            --file-name=my-export-policy.yaml"

POSITIONAL ARGUMENTS
     NAME
        Name of the router to export.

REQUIRED FLAGS
     --file-name=FILE_NAME
        The name of the file to download the route policy config to.

     --policy-name=POLICY_NAME
        Name of the route policy to download.

OPTIONAL FLAGS
     --file-format=FILE_FORMAT
        Format of the file passed to --file-name. FILE_FORMAT must be one of:
        json, yaml.

     --region=REGION
        Region of the router to export. If not specified, you might be prompted
        to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers download-route-policy

        $ gcloud beta compute routers download-route-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute routers download-route-policy my-router \
    --region=us-central1 \
    --policy-name=my-export-policy \
    --file-name=my-export-policy.yaml
```

### gcloud beta compute routers download-route-policy

```text
NAME
    gcloud beta compute routers download-route-policy - download a route policy
        from a Compute Engine router

SYNOPSIS
    gcloud beta compute routers download-route-policy NAME
        --file-name=FILE_NAME --policy-name=POLICY_NAME
        [--file-format=FILE_FORMAT] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers download-route-policy

```text
NAME
    gcloud alpha compute routers download-route-policy - download a route
        policy from a Compute Engine router

SYNOPSIS
    gcloud alpha compute routers download-route-policy NAME
        --file-name=FILE_NAME --policy-name=POLICY_NAME
        [--file-format=FILE_FORMAT] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray unmatched `"` after `--file-name=my-export-policy.yaml`; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/download-route-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
