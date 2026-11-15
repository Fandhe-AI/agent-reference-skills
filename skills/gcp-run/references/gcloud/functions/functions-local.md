---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/functions/local
---

# gcloud functions local

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha functions local call

```text
NAME
    gcloud alpha functions local call - call a locally deployed Google Cloud
        Function

SYNOPSIS
    gcloud alpha functions local call NAME
        [--cloud-event=CLOUD_EVENT | --data=DATA] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions local delete

```text
NAME
    gcloud alpha functions local delete - delete a locally deployed Google
        Cloud Function

SYNOPSIS
    gcloud alpha functions local delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions local deploy

```text
NAME
    gcloud alpha functions local deploy - deploy a Google Cloud Function
        locally

SYNOPSIS
    gcloud alpha functions local deploy NAME [--builder=BUILDER]
        [--entry-point=ENTRY_POINT] [--ignore-file=IGNORE_FILE]
        [--port=PORT; default=8080] [--runtime=RUNTIME] [--source=SOURCE]
        [--build-env-vars-file=FILE_PATH | --clear-build-env-vars
          | --set-build-env-vars=[KEY=VALUE,...]
          | --remove-build-env-vars=[KEY,...]
          --update-build-env-vars=[KEY=VALUE,...]]
        [--clear-env-vars | --env-vars-file=FILE_PATH
          | --set-env-vars=[KEY=VALUE,...]
          | --remove-env-vars=[KEY,...] --update-env-vars=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/functions/local (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
