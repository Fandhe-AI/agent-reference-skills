---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/delete
---

# gcloud database-migration connection-profiles delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration connection-profiles delete

```text
NAME
    gcloud database-migration connection-profiles delete - delete a Database
        Migration Service connection profile

SYNOPSIS
    gcloud database-migration connection-profiles delete
        (CONNECTION_PROFILE : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a connection profile. A connection profile can only be deleted if
    it is not in use by any active migration jobs.

EXAMPLES
    To delete a connection profile:

        $ gcloud database-migration connection-profiles delete \
          CONNECTION_PROFILE --region=us-central1

POSITIONAL ARGUMENTS
     Connection profile resource - Connection profile resource - Connection
     profile to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connection_profile on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION_PROFILE
          ID of the connection_profile or fully qualified identifier for the
          connection_profile.

          To set the connection_profile attribute:
          + provide the argument connection_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument connection_profile on the command line with
            a fully specified name;
          + provide the argument --region on the command line.

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

     --force
        Cloud SQL replica database is also deleted (only for Cloud SQL
        connection profiles).

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

        $ gcloud alpha database-migration connection-profiles delete
```

### gcloud alpha database-migration connection-profiles delete

```text
NAME
    gcloud alpha database-migration connection-profiles delete - delete a
        Database Migration Service connection profile

SYNOPSIS
    gcloud alpha database-migration connection-profiles delete
        (CONNECTION_PROFILE : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [--force] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
