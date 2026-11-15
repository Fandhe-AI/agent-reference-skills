---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components
---

# Components and Emulators

Copy-paste commands for the gcloud component manager (`gcloud components`) and for the local emulators (`gcloud emulators`).

## Signature / Usage

### List components

```bash
gcloud components list
```

```bash
gcloud components list --show-versions
```

### Install components

```bash
gcloud components install COMPONENT-1 COMPONENT-2
```

```bash
gcloud components install kubectl
```

```bash
gcloud components install beta
```

Installing a component also installs the components it depends on, after you confirm.

### Update components

```bash
gcloud components update
```

```bash
gcloud components update --version=1.2.3
```

`--version` can name an older version, which downgrades the installation.

### Remove components

> **警告**: `gcloud components remove` uninstalls the named components and every component that directly or indirectly depends on them. Review the list it prints before confirming.

```bash
gcloud components remove COMPONENT-1 COMPONENT-2
```

### Reinstall the gcloud CLI

> **警告**: `gcloud components reinstall` replaces your existing installation with a fresh download, equivalent to deleting the current installation and installing again in the same location. Run it only to repair a corrupt installation.

```bash
gcloud components reinstall
```

### Manage Trusted Tester component repositories

```bash
gcloud components repositories list
```

Adapted (not in the official docs): the help example registers `http://repo.location.com` over plain HTTP; a component repository serves code that `gcloud components install` / `update` runs, so the example uses an HTTPS placeholder. Add only repositories you trust.

```bash
gcloud components repositories add https://REPOSITORY_URL
```

```bash
gcloud components repositories remove
```

### Start the interactive shell

```bash
gcloud beta interactive
```

Install the `beta` component first (see above).

### Start the Firestore emulator

```bash
gcloud emulators firestore start
```

Adapted (not in the official docs): the help example binds the Firestore emulator to `0.0.0.0:8080`, which exposes the unauthenticated emulator to every network interface; the example binds to `localhost:8080`. Bind to `0.0.0.0` only on an isolated network or behind a firewall that limits access.

```bash
gcloud emulators firestore start --host-port=localhost:8080
```

```bash
gcloud emulators firestore start --rules=firestore.rules
```

```bash
gcloud emulators firestore start --database-mode=datastore-mode
```

Adapted (not in the official docs): the help-text placeholders `<path/to/file>` and `<path/to/directory>` are shell redirections when pasted into bash; they are written as `PATH_TO_FILE` and `PATH_TO_DIRECTORY`.

```bash
gcloud emulators firestore start --import-data=PATH_TO_FILE
```

```bash
gcloud emulators firestore start \
    --export-on-exit=PATH_TO_DIRECTORY
```

Adapted (not in the official docs): the help example's lowercase placeholder `--edition=edition` is not an accepted value; `enterprise` (one of `standard`, `enterprise`) is used.

```bash
gcloud emulators firestore start --edition=enterprise
```

The default bind address is `localhost:8080`. `--edition` accepts `standard` (default) or `enterprise`. `--index-file` and `--require-indexes` work only in Datastore Mode, together.

### Start the Spanner emulator

```bash
gcloud emulators spanner start
```

```bash
gcloud emulators spanner env-init
```

```bash
gcloud emulators spanner notices
```

`--host-port` serves gRPC (default `localhost:9010`); use `--rest-port` for REST. `--use-docker` forces the Docker image; a native binary exists only on Linux.

### Start the Pub/Sub emulator (beta)

```bash
gcloud beta emulators pubsub start
```

```bash
gcloud beta emulators pubsub env-init
```

### Start the Bigtable emulator (beta)

```bash
gcloud beta emulators bigtable start
```

```bash
gcloud beta emulators bigtable env-init
```

### Start the Datastore emulator (beta)

```bash
gcloud beta emulators datastore start
```

```bash
gcloud beta emulators datastore env-init
```

```bash
gcloud beta emulators datastore env-unset
```

## Notes

- Adapted from the official docs: the help example `gcloud emulators firestore start --host-port=0.0.0.0:8080` is shown with `localhost:8080`; the emulator has no authentication, so `0.0.0.0` makes its data readable and writable from other hosts.
- Adapted from the official docs: `gcloud components repositories add http://repo.location.com` (help example) is shown with an HTTPS placeholder `https://REPOSITORY_URL`, since components fetched over plain HTTP can be altered in transit.
- Flags worth knowing, see each command's `--help`: `gcloud components list --only-local-state` and `--show-platform`; `gcloud components repositories remove --all` (removes every registered Trusted Tester repository; run `gcloud components update` afterwards to revert to standard component versions); `gcloud beta emulators pubsub start --host-port --data-dir`; `gcloud beta emulators bigtable start --host-port`; `gcloud beta emulators datastore start --data-dir --host-port --no-store-on-disk`, with `--consistency` (default 0.9) and `--use-firestore-in-datastore-mode` mutually exclusive.
- `gcloud emulators firestore` and `gcloud emulators spanner` are GA in the 593.0.0 reference; `pubsub`, `bigtable`, and `datastore` appear there as alpha and beta only, so they are written as `gcloud beta emulators ...`.
- `env-init` prints the commands that export the emulator's environment variables; `env-unset` (Datastore) prints the commands that unset them. Neither sets variables by itself.
- Emulators ship as separate packages (for example `google-cloud-cli-firestore-emulator`, `google-cloud-cli-pubsub-emulator`, `google-cloud-cli-spanner-emulator`); the apt and rpm package lists are on the install page, see install.md.
- Corrected from the official docs: the help example `gcloud emulators firestore start --edition=edition` passes a placeholder that is not one of the accepted values (`EDITION must be one of: standard, enterprise`); the fence uses `--edition=enterprise`.
- Adapted from the official docs: the help text writes the Firestore paths as `<path/to/file>` and `<path/to/directory>`; they are `PATH_TO_FILE` / `PATH_TO_DIRECTORY` here because `<` and `>` are bash redirections. Replace them with real paths. The Firestore import and export flags read and write files on this machine.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/list (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/install (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/update (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/remove (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/reinstall (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/repositories (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/firestore (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/emulators/spanner (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/pubsub (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/bigtable (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators/datastore (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/interactive (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/docs/components (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/interactive-gcloud (retrieved 2026-11-14)

## Related

- [components.md](../references/install-setup/components.md)
- [interactive-gcloud.md](../references/install-setup/interactive-gcloud.md)
- [install-sdk.md](../references/install-setup/install-sdk.md)
