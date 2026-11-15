---
source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/firestore
---

# gcloud emulators firestore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud emulators firestore start

```text
NAME
    gcloud emulators firestore start - start a local Firestore emulator

SYNOPSIS
    gcloud emulators firestore start [--database-mode=DATABASE_MODE]
        [--edition=EDITION; default="standard"]
        [--export-on-exit=EXPORT_ON_EXIT] [--host-port=HOST_PORT]
        [--import-data=IMPORT_DATA] [--index-file=INDEX_FILE] [--licenses]
        [--require-indexes] [--rules=RULES] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command starts a local Firestore emulator.

EXAMPLES
    To start the local Firestore emulator, run:

        $ gcloud emulators firestore start

    To bind to a specific host and port, run:

        $ gcloud emulators firestore start --host-port=0.0.0.0:8080

    To run the local Firestore emulator with a Firebase Rules set, run:

        $ gcloud emulators firestore start --rules=firestore.rules

    To run the local Firestore emulator in Datastore Mode, run:

        $ gcloud emulators firestore start --database-mode=datastore-mode

    To import data at the start of the Firestore emulator, run:

        $ gcloud emulators firestore start --import-data=<path/to/file>

    To export emulator data upon emulator shutdown, run:

        $ gcloud emulators firestore start \
            --export-on-exit=<path/to/directory>

    To run the local Firestore emulator with a specific database edition, run:

        $ gcloud emulators firestore start --edition=edition

FLAGS
     --database-mode=DATABASE_MODE
        The database mode to start the Firestore Emulator in. The valid options
        are:

            `firestore-native` (default): start the emulator in Firestore Native
            `datastore-mode`: start the emulator in Datastore Mode

     --edition=EDITION; default="standard"
        The database edition to start the Firestore Emulator in. EDITION must
        be one of: standard, enterprise.

     --export-on-exit=EXPORT_ON_EXIT
        Directory path in which emulator data will be saved upon shutdown.
        Example: /home/user/myexports/2024-03-26/

     --host-port=HOST_PORT
        The host:port to which the emulator should be bound. Can take the form
        of a single address (hostname, IPv4, or IPv6) and/or port:

            [ADDRESS][:PORT]

        In this format you must enclose IPv6 addresses in square brackets: e.g.

            [2001:db8:0:0:0:ff00:42:8329]:8080

        The default value is localhost:8080.

     --import-data=IMPORT_DATA
        File path to the data to be loaded into the emulator upon start up.
        Example:
        /home/user/myexports/sampleExport/sampleExport.overall_export_metadata.

     --index-file=INDEX_FILE
        File path to the index file to be used by the emulator. Example:
        /home/user/firestore.indexes.yaml

        Only supported in Datastore Mode in conjunction with --require-indexes.

     --licenses
        If set, the emulator will print open-source dependencies and licenses,
        then exit.

     --require-indexes
        If set, the emulator will require composite indexes to be defined in
        the index file for all queries that require them.

        Only supported in Datastore Mode in conjunction with --index-file.

     --rules=RULES
        If set, all projects will use the security rules in this file. More
        information on Firebase Rules and the syntax for this file is available
        at https://firebase.google.com/docs/rules.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha emulators firestore start

        $ gcloud beta emulators firestore start
```

### gcloud beta emulators firestore start

```text
NAME
    gcloud beta emulators firestore start - start a local Firestore emulator

SYNOPSIS
    gcloud beta emulators firestore start [--database-mode=DATABASE_MODE]
        [--edition=EDITION; default="standard"]
        [--export-on-exit=EXPORT_ON_EXIT] [--host-port=HOST_PORT]
        [--import-data=IMPORT_DATA] [--index-file=INDEX_FILE] [--licenses]
        [--require-indexes] [--rules=RULES] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators firestore start

```text
NAME
    gcloud alpha emulators firestore start - start a local Firestore emulator

SYNOPSIS
    gcloud alpha emulators firestore start [--database-mode=DATABASE_MODE]
        [--edition=EDITION; default="standard"]
        [--export-on-exit=EXPORT_ON_EXIT] [--host-port=HOST_PORT]
        [--import-data=IMPORT_DATA] [--index-file=INDEX_FILE] [--licenses]
        [--require-indexes] [--rules=RULES] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/firestore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
