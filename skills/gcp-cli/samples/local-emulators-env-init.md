---
source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/spanner
---

# Start a Local Emulator and Export Its Environment

Start a local Spanner, Firestore, Pub/Sub, or Datastore emulator and print the commands that export its environment variables.

## Signature / Usage

### Spanner (GA)

```bash
gcloud emulators spanner start
```

```bash
gcloud emulators spanner env-init
```

Adapted (not in the official docs): `env-init` prints the export commands (per its help text); `eval "$(...)"` applies them to the current shell. The `eval` wrapper is the only addition.

```bash
eval "$(gcloud emulators spanner env-init)"
```

Bind to another host and port, or force the Docker image:

```bash
gcloud emulators spanner start --host-port=HOST_PORT --rest-port=REST_PORT
```

```bash
gcloud emulators spanner start --use-docker=USE_DOCKER
```

### Firestore (GA)

```bash
gcloud emulators firestore start
```

```bash
gcloud emulators firestore start --host-port=0.0.0.0:8080
```

```bash
gcloud emulators firestore start --rules=firestore.rules
```

```bash
gcloud emulators firestore start --database-mode=datastore-mode
```

Import data at start and export it on shutdown:

```bash
gcloud emulators firestore start --import-data=<path/to/file>
```

```bash
gcloud emulators firestore start \
    --export-on-exit=<path/to/directory>
```

### Pub/Sub (beta)

The input documents only the beta and alpha tracks (NAME and SYNOPSIS). Both flags are optional; omit either one to use its default.

Adapted (not in the official docs): the SYNOPSIS brackets (optional markers) are removed so the line runs as written.

```bash
gcloud beta emulators pubsub start --data-dir=DATA_DIR --host-port=HOST_PORT
```

Adapted (not in the official docs): the SYNOPSIS brackets (optional markers) are removed so the line runs as written.

```bash
gcloud beta emulators pubsub env-init --data-dir=DATA_DIR
```

### Datastore (beta)

All three flags are optional; `--no-store-on-disk` disables persisting data to disk (enabled by default).

Adapted (not in the official docs): the SYNOPSIS brackets (optional markers) are removed so the line runs as written.

```bash
gcloud beta emulators datastore start --data-dir=DATA_DIR --host-port=HOST_PORT --no-store-on-disk
```

Adapted (not in the official docs): the SYNOPSIS brackets (optional markers) are removed so the line runs as written.

```bash
gcloud beta emulators datastore env-init --data-dir=DATA_DIR
```

Adapted (not in the official docs): the SYNOPSIS brackets (optional markers) are removed so the line runs as written.

```bash
gcloud beta emulators datastore env-unset --data-dir=DATA_DIR
```

## Options / Props

| Name | Applies to | Description |
| --- | --- | --- |
| `--host-port=HOST_PORT` | all emulators | Address to bind; Firestore default `localhost:8080`, Spanner gRPC default `localhost:9010` |
| `--rest-port=REST_PORT` | Spanner | REST port, default 9020 |
| `--use-docker` | Spanner | Use the emulator Docker image; a native binary is provided only for Linux |
| `--rules=RULES` | Firestore | Firebase Rules file for all projects |
| `--import-data` / `--export-on-exit` | Firestore | Load data at start / save data on shutdown |
| `--data-dir=DATA_DIR` | Pub/Sub, Datastore | Data directory |

## Notes

- Adapted from the official docs: the Pub/Sub and Datastore lines are the beta SYNOPSIS lines (for example `gcloud beta emulators pubsub start [--data-dir=DATA_DIR] [--host-port=HOST_PORT]`) with the optional-marker brackets removed; every flag in them is optional. `<path/to/file>` and `<path/to/directory>` are placeholders from the help text.
- `env-init` / `env-unset` print commands; they do not start anything. Start the emulator in one terminal and apply the output in the terminal that runs your application.
- Some GA/beta pages in the input show only the SYNOPSIS for alpha and beta; use `gcloud beta emulators <name> start --help` for the full text.
- The names of the exported environment variables are not in the input; read them from the `env-init` output.
- Emulators are for local testing only. Client-library setup against an emulator is in the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/spanner (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/firestore (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/pubsub (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [properties.md](../references/config-auth/properties.md)
