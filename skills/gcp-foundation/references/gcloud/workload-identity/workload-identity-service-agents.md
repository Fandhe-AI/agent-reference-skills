---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workload-identity/service-agents
---

# gcloud workload-identity service-agents

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workload-identity service-agents generate

```text
NAME
    gcloud workload-identity service-agents generate - generate service agents
        for a service producer

SYNOPSIS
    gcloud workload-identity service-agents generate --service=SERVICE
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    It can be generated in a project, folder, or organization and location.

    gcloud workload-identity service-agents generate generates service agents
    for a given service producer in a specific project, folder, or organization
    and location.

EXAMPLES
    To generate service agents for bigquery.googleapis.com in the global
    location for the project 123456, run:

        $ gcloud workload-identity service-agents generate \
            --service="bigquery.googleapis.com" --location="global" \
            --project="123456"

    To generate service agents for bigquery.googleapis.com in the global
    location for the folder 123456, run:

        $ gcloud workload-identity service-agents generate \
            --service="bigquery.googleapis.com" --location="global" \
            --folder="123456"

    To generate service agents for bigquery.googleapis.com in the global
    location for the organization 123456, run:

        $ gcloud workload-identity service-agents generate \
            --service="bigquery.googleapis.com" --location="global" \
            --organization="123456"

REQUIRED FLAGS
     --service=SERVICE
        The service producer to generate service agents for (e.g.
        bigquery.googleapis.com).

     Exactly one of these must be specified:

       --folder=FOLDER
          The folder number to generate service agents for.

       --organization=ORGANIZATION
          The organization number to generate service agents for.

       --project=PROJECT
          The project number to generate service agents for.

OPTIONAL FLAGS
     --location=LOCATION; default="global"
        The location for which to generate the service agents. Defaults to
        global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha workload-identity service-agents generate

        $ gcloud beta workload-identity service-agents generate
```

### gcloud beta workload-identity service-agents generate

```text
NAME
    gcloud beta workload-identity service-agents generate - generate service
        agents for a service producer

SYNOPSIS
    gcloud beta workload-identity service-agents generate --service=SERVICE
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha workload-identity service-agents generate

```text
NAME
    gcloud alpha workload-identity service-agents generate - generate service
        agents for a service producer

SYNOPSIS
    gcloud alpha workload-identity service-agents generate --service=SERVICE
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--location=LOCATION; default="global"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workload-identity/service-agents (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
