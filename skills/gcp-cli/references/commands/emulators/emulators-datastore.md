---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore
---

# gcloud emulators datastore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta emulators datastore env-init

```text
NAME
    gcloud beta emulators datastore env-init - print the commands required to
        export env variables of a datastore

SYNOPSIS
    gcloud beta emulators datastore env-init [--data-dir=DATA_DIR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta emulators datastore env-unset

```text
NAME
    gcloud beta emulators datastore env-unset - print the commands required to
        unset a datastore emulators env variables

SYNOPSIS
    gcloud beta emulators datastore env-unset [--data-dir=DATA_DIR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta emulators datastore start

```text
NAME
    gcloud beta emulators datastore start - start a local datastore emulator

SYNOPSIS
    gcloud beta emulators datastore start [--data-dir=DATA_DIR]
        [--host-port=HOST_PORT] [--no-store-on-disk]
        [--consistency=CONSISTENCY; default=0.9
          | --use-firestore-in-datastore-mode] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators datastore env-init

```text
NAME
    gcloud alpha emulators datastore env-init - print the commands required to
        export env variables of a datastore

SYNOPSIS
    gcloud alpha emulators datastore env-init [--data-dir=DATA_DIR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators datastore env-unset

```text
NAME
    gcloud alpha emulators datastore env-unset - print the commands required to
        unset a datastore emulators env variables

SYNOPSIS
    gcloud alpha emulators datastore env-unset [--data-dir=DATA_DIR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators datastore start

```text
NAME
    gcloud alpha emulators datastore start - start a local datastore emulator

SYNOPSIS
    gcloud alpha emulators datastore start [--data-dir=DATA_DIR]
        [--host-port=HOST_PORT] [--no-store-on-disk]
        [--consistency=CONSISTENCY; default=0.9
          | --use-firestore-in-datastore-mode] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
