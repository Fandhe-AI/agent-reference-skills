---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/delete
---

# gcloud run worker-pools delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run worker-pools delete

```text
NAME
    gcloud run worker-pools delete - delete a worker-pool

SYNOPSIS
    gcloud run worker-pools delete (WORKER_POOL : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a worker-pool.

EXAMPLES
    To delete a worker-pool:

        $ gcloud run worker-pools delete <worker-pool-name>

POSITIONAL ARGUMENTS
     WorkerPool resource - WorkerPool to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the WorkerPool. Overrides the default run/region
          property value for this command invocation.

          To set the region attribute:
          + provide the argument WORKER_POOL on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property run/region;
          + specify the region from an interactive prompt.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run worker-pools delete

        $ gcloud beta run worker-pools delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud run worker-pools delete WORKER_POOL_NAME
```

### gcloud beta run worker-pools delete

```text
NAME
    gcloud beta run worker-pools delete - delete a worker-pool

SYNOPSIS
    gcloud beta run worker-pools delete (WORKER_POOL : --region=REGION)
        [--async] [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run worker-pools delete

```text
NAME
    gcloud alpha run worker-pools delete - delete a worker-pool

SYNOPSIS
    gcloud alpha run worker-pools delete (WORKER_POOL : --region=REGION)
        [--async] [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/worker-pools/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
