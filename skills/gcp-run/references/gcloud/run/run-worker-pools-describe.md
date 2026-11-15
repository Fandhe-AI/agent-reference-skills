---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/describe
---

# gcloud run worker-pools describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools describe

```text
NAME
    gcloud run worker-pools describe - obtain details about a given worker-pool

SYNOPSIS
    gcloud run worker-pools describe WORKER_POOL [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about a given worker-pool.

EXAMPLES
    To obtain details about a given worker-pool:

        $ gcloud run worker-pools describe <worker-pool-name>

    To get those details in the YAML format:

        $ gcloud run worker-pools describe <worker-pool-name> --format=yaml

    To get them in YAML format suited to export (omitting metadata specific to
    this deployment and status info):

        $ gcloud run worker-pools describe <worker-pool-name> --format=export

POSITIONAL ARGUMENTS
     WorkerPool resource - WorkerPool to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument WORKER_POOL on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKER_POOL
          ID of the WorkerPool or fully qualified identifier for the
          WorkerPool.

          To set the worker-pool attribute:
          + provide the argument WORKER_POOL on the command line.

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools describe

        $ gcloud beta run worker-pools describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud run worker-pools describe WORKER_POOL_NAME

gcloud run worker-pools describe WORKER_POOL_NAME \
    --format=yaml

gcloud run worker-pools describe WORKER_POOL_NAME \
    --format=export
```

### gcloud beta run worker-pools describe

```text
NAME
    gcloud beta run worker-pools describe - obtain details about a given
        worker-pool

SYNOPSIS
    gcloud beta run worker-pools describe WORKER_POOL
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools describe

```text
NAME
    gcloud alpha run worker-pools describe - obtain details about a given
        worker-pool

SYNOPSIS
    gcloud alpha run worker-pools describe WORKER_POOL
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
