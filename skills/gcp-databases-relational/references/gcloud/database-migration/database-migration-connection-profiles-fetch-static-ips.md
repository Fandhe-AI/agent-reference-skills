---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/fetch-static-ips
---

# gcloud database-migration connection-profiles fetch-static-ips

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration connection-profiles fetch-static-ips

```text
NAME
    gcloud database-migration connection-profiles fetch-static-ips - list IPs
        used for static IP connectivity method

SYNOPSIS
    gcloud database-migration connection-profiles fetch-static-ips REGION
        [--endpoint-mode=ENDPOINT_MODE] [--fetch-reserved-public-ips]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetches a set of static IP addresses that need to be allowlisted when using
    the static IP connectivity method.

EXAMPLES
    To list the static IPs, run:

        $ gcloud database-migration connection-profiles fetch-static-ips \
            my-location

POSITIONAL ARGUMENTS
     Region resource - The region you want to list static ips of. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument region on the command line.

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

     --fetch-reserved-public-ips
        Indicates whether to fetch the reserved public IP addresses allocated
        for private connections in this location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha database-migration connection-profiles \
            fetch-static-ips
```

### gcloud alpha database-migration connection-profiles fetch-static-ips

```text
NAME
    gcloud alpha database-migration connection-profiles fetch-static-ips - list
        IPs used for static IP connectivity method

SYNOPSIS
    gcloud alpha database-migration connection-profiles fetch-static-ips REGION
        [--endpoint-mode=ENDPOINT_MODE] [--fetch-reserved-public-ips]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/fetch-static-ips (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
