---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/delete
---

# gcloud run services delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run services delete

```text
NAME
    gcloud run services delete - delete a service

SYNOPSIS
    gcloud run services delete (SERVICE : --namespace=NAMESPACE) [--[no-]async]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a service.

EXAMPLES
    To delete a service:

        $ gcloud run services delete <service-name>

POSITIONAL ARGUMENTS
     Service resource - Service to delete. The arguments in this group can be
     used to specify the attributes of this resource.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument SERVICE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --namespace=NAMESPACE
          Specific to Cloud Run for Anthos: Kubernetes namespace for the
          service.

          To set the namespace attribute:
          + provide the argument SERVICE on the command line with a fully
            specified name;
          + provide the argument --namespace on the command line;
          + set the property run/namespace;
          + For Cloud Run on Kubernetes Engine, defaults to "default".
            Otherwise, defaults to project ID.;
          + provide the argument project on the command line;
          + set the property core/project.

FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

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

        $ gcloud alpha run services delete

        $ gcloud beta run services delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud run services delete SERVICE_NAME
```

### gcloud beta run services delete

```text
NAME
    gcloud beta run services delete - delete a service

SYNOPSIS
    gcloud beta run services delete (SERVICE : --namespace=NAMESPACE)
        [--[no-]async] [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run services delete

```text
NAME
    gcloud alpha run services delete - delete a service

SYNOPSIS
    gcloud alpha run services delete (SERVICE : --namespace=NAMESPACE)
        [--[no-]async] [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
