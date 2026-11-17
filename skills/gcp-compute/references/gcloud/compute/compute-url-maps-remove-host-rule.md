---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/remove-host-rule
---

# gcloud compute url-maps remove-host-rule

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps remove-host-rule

```text
NAME
    gcloud compute url-maps remove-host-rule - remove a host rule from a URL
        map

SYNOPSIS
    gcloud compute url-maps remove-host-rule URL_MAP --host=HOST
        [--delete-orphaned-path-matcher] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute url-maps remove-host-rule is used to remove a host rule from
    a URL map. When a host rule is removed, its path matcher is only removed if
    it is not referenced by any other host rules and
    --delete-orphaned-path-matcher is provided.

EXAMPLES
    To remove a host rule that contains the host example.com from the URL map
    named MY-URL-MAP, you can use this command:

        $ gcloud compute url-maps remove-host-rule MY-URL-MAP \
            --host=example.com

POSITIONAL ARGUMENTS
     URL_MAP
        Name of the URL map to operate on.

REQUIRED FLAGS
     --host=HOST
        One of the hosts in the host rule to remove.

OPTIONAL FLAGS
     --delete-orphaned-path-matcher
        If provided and a path matcher is orphaned as a result of this command,
        the command removes the orphaned path matcher instead of failing.

     At most one of these can be specified:

       --global
          If set, the URL map is global.

       --region=REGION
          Region of the URL map to operate on. If not specified, you might be
          prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute url-maps remove-host-rule

        $ gcloud beta compute url-maps remove-host-rule
```

### gcloud beta compute url-maps remove-host-rule

```text
NAME
    gcloud beta compute url-maps remove-host-rule - remove a host rule from a
        URL map

SYNOPSIS
    gcloud beta compute url-maps remove-host-rule URL_MAP --host=HOST
        [--delete-orphaned-path-matcher] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps remove-host-rule

```text
NAME
    gcloud alpha compute url-maps remove-host-rule - remove a host rule from a
        URL map

SYNOPSIS
    gcloud alpha compute url-maps remove-host-rule URL_MAP --host=HOST
        [--delete-orphaned-path-matcher] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/remove-host-rule (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
