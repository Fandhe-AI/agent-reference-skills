---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/describe
---

# gcloud compute forwarding-rules describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute forwarding-rules describe

```text
NAME
    gcloud compute forwarding-rules describe - display detailed information
        about a forwarding rule

SYNOPSIS
    gcloud compute forwarding-rules describe NAME [--view=VIEW]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute forwarding-rules describe displays all data associated with
    a forwarding rule in a project.

EXAMPLES
    To get details about a global forwarding rule, run:

        $ gcloud compute forwarding-rules describe FORWARDING-RULE --global

    To get details about a regional forwarding rule, run:

        $ gcloud compute forwarding-rules describe FORWARDING-RULE \
            --region=us-central1

    To get full details, including any extensions attached to the rule, run:

        $ gcloud compute forwarding-rules describe FORWARDING-RULE \
            --region=us-central1 --view=FULL

POSITIONAL ARGUMENTS
     NAME
        Name of the forwarding rule to describe.

FLAGS
     --view=VIEW
        The view of the forwarding rule to return. BASIC includes the standard
        fields. FULL includes standard fields plus any extensions attached to
        the forwarding rule. VIEW must be one of: BASIC, FULL.

     At most one of these can be specified:

       --global
          If set, the forwarding rule is global.

       --region=REGION
          Region of the forwarding rule to describe. If not specified, you
          might be prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute forwarding-rules describe

        $ gcloud beta compute forwarding-rules describe
```

### gcloud beta compute forwarding-rules describe

```text
NAME
    gcloud beta compute forwarding-rules describe - display detailed
        information about a forwarding rule

SYNOPSIS
    gcloud beta compute forwarding-rules describe NAME [--view=VIEW]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute forwarding-rules describe

```text
NAME
    gcloud alpha compute forwarding-rules describe - display detailed
        information about a forwarding rule

SYNOPSIS
    gcloud alpha compute forwarding-rules describe NAME [--view=VIEW]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
