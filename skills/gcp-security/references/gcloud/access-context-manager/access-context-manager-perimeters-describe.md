---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/describe
---

# gcloud access-context-manager perimeters describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager perimeters describe

```text
NAME
    gcloud access-context-manager perimeters describe - show details about a
        service perimeter

SYNOPSIS
    gcloud access-context-manager perimeters describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about an service perimeter in a given access policy.

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter you want to show details about.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       PERIMETER
          ID of the perimeter or fully qualified identifier for the perimeter.

          To set the perimeter attribute:
          + provide the argument perimeter on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument perimeter on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters describe

        $ gcloud beta access-context-manager perimeters describe
```

### gcloud beta access-context-manager perimeters describe

```text
NAME
    gcloud beta access-context-manager perimeters describe - show details about
        a service perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters describe

```text
NAME
    gcloud alpha access-context-manager perimeters describe - show details
        about a service perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
