---
source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/recommender-config
---

# gcloud recommender recommender-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud recommender recommender-config describe

```text
NAME
    gcloud recommender recommender-config describe - describe a recommender
        configuration

SYNOPSIS
    gcloud recommender recommender-config describe RECOMMENDER
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a recommender configuration based on a given entity (project,
    organization, billing account), location, and recommender.

EXAMPLES
    To describe a recommender configuration, run:

        $ gcloud recommender recommender-config describe ${RECOMMENDER} \
            --project=${PROJECT} --location=${LOCATION}

POSITIONAL ARGUMENTS
     RECOMMENDER
        Recommender to use for this invocation.

REQUIRED FLAGS
     --location=LOCATION
        Location to use for this invocation.

     Resource that is associated with cloud entity type.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud billing account ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud project ID. Overrides the default core/project
          property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta recommender recommender-config describe
```

### gcloud recommender recommender-config update

```text
NAME
    gcloud recommender recommender-config update - update a recommender
        configuration

SYNOPSIS
    gcloud recommender recommender-config update RECOMMENDER --etag=ETAG
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--annotations=KEY=VALUE,[KEY=VALUE,...]]
        [--config-file=CONFIG_FILE] [--display-name=DISPLAY_NAME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a recommender configuration based on a given entity (project,
    organization, billing account), location, and recommender.

EXAMPLES
    To update a recommender configuration, run:

        $ gcloud recommender recommender-config update ${RECOMMENDER} \
             --project=${PROJECT} --location=${LOCATION} --etag=\"123\" \
             --config-file=config.yaml

POSITIONAL ARGUMENTS
     RECOMMENDER
        Recommender to use for this invocation.

REQUIRED FLAGS
     --etag=ETAG
        Etag of the recommender configuration.

     --location=LOCATION
        Location to use for this invocation.

     Resource that is associated with cloud entity type.

     Exactly one of these must be specified:

       --billing-account=BILLING_ACCOUNT
          The Google Cloud billing account ID to use for this invocation.

       --organization=ORGANIZATION_ID
          The Google Cloud organization ID to use for this invocation.

       --project=PROJECT_ID
          The Google Cloud project ID. Overrides the default core/project
          property value for this command invocation.

OPTIONAL FLAGS
     --annotations=KEY=VALUE,[KEY=VALUE,...]
        Store small amounts of arbitrary data on the recommender configuration.

     --config-file=CONFIG_FILE
        Generation configuration file for the recommender configuration.

     --display-name=DISPLAY_NAME
        Display name of the recommender configuration.

     --validate-only
        If true, validate the request and preview the change, but do not
        actually update it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta recommender recommender-config update
```

### gcloud beta recommender recommender-config describe

```text
NAME
    gcloud beta recommender recommender-config describe - describe a
        recommender configuration

SYNOPSIS
    gcloud beta recommender recommender-config describe RECOMMENDER
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta recommender recommender-config update

```text
NAME
    gcloud beta recommender recommender-config update - update a recommender
        configuration

SYNOPSIS
    gcloud beta recommender recommender-config update RECOMMENDER --etag=ETAG
        --location=LOCATION
        (--billing-account=BILLING_ACCOUNT | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--annotations=KEY=VALUE,[KEY=VALUE,...]]
        [--config-file=CONFIG_FILE] [--display-name=DISPLAY_NAME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/recommender/recommender-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
