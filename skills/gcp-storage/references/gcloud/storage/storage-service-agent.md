---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/service-agent
---

# gcloud storage service-agent

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage service-agent

```text
NAME
    gcloud storage service-agent - manage a project's Cloud Storage service
        agent, which is used to perform Cloud KMS operations

SYNOPSIS
    gcloud storage service-agent [--authorize-cmek=AUTHORIZE_CMEK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage service-agent displays the Cloud Storage service agent,
    which is used to perform Cloud KMS operations against your a default or
    supplied project. If the project does not yet have a service agent, gcloud
    storage service-agent creates one.

EXAMPLES
    To show the service agent for your default project:

        $ gcloud storage service-agent

    To show the service account for my-project:

        $ gcloud storage service-agent --project=my-project

    To authorize your default project to use a Cloud KMS key:

        $ gcloud storage service-agent \
            --authorize-cmek=projects/key-project/locations/us-east1/\
        keyRings/key-ring/cryptoKeys/my-key

FLAGS
     --authorize-cmek=AUTHORIZE_CMEK
        Adds appropriate encrypt/decrypt permissions to the specified Cloud KMS
        key. This allows the Cloud Storage service agent to write and read
        Cloud KMS-encrypted objects in buckets associated with the service
        agent's project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage service-agent
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud storage service-agent \
    --authorize-cmek=projects/key-project/locations/us-east1/keyRings/key-ring/cryptoKeys/my-key
```

### gcloud alpha storage service-agent

```text
NAME
    gcloud alpha storage service-agent - manage a project's Cloud Storage
        service agent, which is used to perform Cloud KMS operations

SYNOPSIS
    gcloud alpha storage service-agent [--authorize-cmek=AUTHORIZE_CMEK]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/service-agent (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
