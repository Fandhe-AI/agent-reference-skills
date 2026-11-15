---
source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/spanner
---

# gcloud emulators spanner

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud emulators spanner env-init

```text
NAME
    gcloud emulators spanner env-init - print the commands required to export
        Spanner emulator's env variables

SYNOPSIS
    gcloud emulators spanner env-init [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print the commands required to export Spanner emulator's env variables.

EXAMPLES
    To print the env variables exports for a Spanner emulator, run:

        $ gcloud emulators spanner env-init

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha emulators spanner env-init

        $ gcloud beta emulators spanner env-init
```

### gcloud emulators spanner notices

```text
NAME
    gcloud emulators spanner notices - print third-party notices for the local
        Cloud Spanner emulator

SYNOPSIS
    gcloud emulators spanner notices [--use-docker] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print third-party notices for the local Cloud Spanner emulator.

EXAMPLES
    To print third-party notices for the local Cloud Spanner emulator, run:

        $ gcloud emulators spanner notices

FLAGS
     --use-docker
        Use the Cloud Spanner emulator docker image even if the platform has a
        native binary available in the gcloud CLI. Currently we only provide a
        native binary for Linux. For other systems, you must install Docker for
        your platform before starting the emulator.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha emulators spanner notices

        $ gcloud beta emulators spanner notices
```

### gcloud emulators spanner start

```text
NAME
    gcloud emulators spanner start - start a local Cloud Spanner emulator

SYNOPSIS
    gcloud emulators spanner start
        [--enable-fault-injection=ENABLE_FAULT_INJECTION]
        [--host-port=HOST_PORT]
        [--remote-functions-host-port=REMOTE_FUNCTIONS_HOST_PORT]
        [--rest-port=REST_PORT] [--use-docker=USE_DOCKER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command starts a local Cloud Spanner emulator.

EXAMPLES
    To start a local Cloud Spanner emulator, run:

        $ gcloud emulators spanner start

FLAGS
     --enable-fault-injection=ENABLE_FAULT_INJECTION
        If true, the emulator will randomly inject faults into transactions.
        This facilitates application abort-retry testing.

     --host-port=HOST_PORT
        The host:port to which the emulator should be bound. The default value
        is localhost:9010. Note that this port serves gRPC requests. To
        override the default port serving REST requests, use --rest-port. If
        using Docker to run the emulator, the host must be specified as an
        ipaddress.

     --remote-functions-host-port=REMOTE_FUNCTIONS_HOST_PORT
        The host:port address of the Functions Framework instance hosting
        remote functions. Only localhost addresses are supported.

     --rest-port=REST_PORT
        The port at which REST requests are served. gcloud uses REST to
        communicate with the emulator. The default value is 9020.

     --use-docker=USE_DOCKER
        Use the Cloud Spanner emulator docker image even if the platform has a
        native binary available in the gcloud CLI. Currently we only provide a
        native binary for Linux. For other systems, you must install Docker for
        your platform before starting the emulator.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha emulators spanner start

        $ gcloud beta emulators spanner start
```

### gcloud beta emulators spanner env-init

```text
NAME
    gcloud beta emulators spanner env-init - print the commands required to
        export Spanner emulator's env variables

SYNOPSIS
    gcloud beta emulators spanner env-init [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta emulators spanner notices

```text
NAME
    gcloud beta emulators spanner notices - print third-party notices for the
        local Cloud Spanner emulator

SYNOPSIS
    gcloud beta emulators spanner notices [--use-docker] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta emulators spanner start

```text
NAME
    gcloud beta emulators spanner start - start a local Cloud Spanner emulator

SYNOPSIS
    gcloud beta emulators spanner start
        [--enable-fault-injection=ENABLE_FAULT_INJECTION]
        [--host-port=HOST_PORT]
        [--remote-functions-host-port=REMOTE_FUNCTIONS_HOST_PORT]
        [--rest-port=REST_PORT] [--use-docker=USE_DOCKER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators spanner env-init

```text
NAME
    gcloud alpha emulators spanner env-init - print the commands required to
        export Spanner emulator's env variables

SYNOPSIS
    gcloud alpha emulators spanner env-init [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators spanner notices

```text
NAME
    gcloud alpha emulators spanner notices - print third-party notices for the
        local Cloud Spanner emulator

SYNOPSIS
    gcloud alpha emulators spanner notices [--use-docker]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha emulators spanner start

```text
NAME
    gcloud alpha emulators spanner start - start a local Cloud Spanner emulator

SYNOPSIS
    gcloud alpha emulators spanner start
        [--enable-fault-injection=ENABLE_FAULT_INJECTION]
        [--host-port=HOST_PORT]
        [--remote-functions-host-port=REMOTE_FUNCTIONS_HOST_PORT]
        [--rest-port=REST_PORT] [--use-docker=USE_DOCKER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/spanner (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
