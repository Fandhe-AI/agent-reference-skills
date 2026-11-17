---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/test-iam-permissions
---

# gcloud compute url-maps test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps test-iam-permissions

```text
NAME
    gcloud compute url-maps test-iam-permissions - test IAM permissions for a
        Compute Engine URL map

SYNOPSIS
    gcloud compute url-maps test-iam-permissions URL_MAP
        --permissions=[PERMISSION,...] [--global] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute url-maps test-iam-permissions tests the IAM permissions that
    a caller has on a Compute Engine URL map.

EXAMPLES
    To test if the caller has compute.urlMaps.get and compute.urlMaps.update
    permissions on a global URL map my-map, run:

        $ gcloud compute url-maps test-iam-permissions my-map \
            --permissions=compute.urlMaps.get,compute.urlMaps.update

POSITIONAL ARGUMENTS
     URL_MAP
        Name of the URL map to test IAM permissions for.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The set of permissions to check for the resource.

OPTIONAL FLAGS
     --global
        (Default) The URL map is global. Regional URL maps are not supported.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute url-maps test-iam-permissions

        $ gcloud beta compute url-maps test-iam-permissions
```

### gcloud beta compute url-maps test-iam-permissions

```text
NAME
    gcloud beta compute url-maps test-iam-permissions - test IAM permissions
        for a Compute Engine URL map

SYNOPSIS
    gcloud beta compute url-maps test-iam-permissions URL_MAP
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps test-iam-permissions

```text
NAME
    gcloud alpha compute url-maps test-iam-permissions - test IAM permissions
        for a Compute Engine URL map

SYNOPSIS
    gcloud alpha compute url-maps test-iam-permissions URL_MAP
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
