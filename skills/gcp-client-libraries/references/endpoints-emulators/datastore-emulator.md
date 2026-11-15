---
source: https://docs.cloud.google.com/datastore/docs/emulator
---

# Datastore mode emulator (client side)

Run the Firestore emulator in Datastore mode and connect a Datastore mode client library with `DATASTORE_EMULATOR_HOST`.

## Signature / Usage

### Start the emulator

```bash
gcloud emulators firestore start --database-mode=datastore-mode
```

By default the emulator uses `127.0.0.1:8080` (the legacy Cloud Datastore emulator used `8081`). To bind a specific host and port:

```bash
gcloud emulators firestore start --database-mode=datastore-mode --host-port=HOST:PORT
```

### Connect a client library

When this variable is set, the client libraries connect to the emulator automatically.

```bash
export DATASTORE_EMULATOR_HOST="HOST:PORT"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `DATASTORE_EMULATOR_HOST` | env var | `HOST:PORT` the emulator prints at startup. |
| `--database-mode` | gcloud flag | `datastore-mode` for Datastore mode behavior. |
| `--host-port` | gcloud flag | `HOST:PORT` to bind the emulator. |

## Notes

- Use the emulator only for local testing, bound to `localhost` / `127.0.0.1`. Data is held in memory only and is not persisted.
- The source shows no Node.js, Python or Rust code; the env var applies to all client libraries.
- Import / export, reset and index checking features are not about pointing the client and are omitted.
- The Firestore emulator requires Java 21 starting with Google Cloud CLI release 528.0.0.
- Out of scope: the Datastore mode API itself belongs to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/datastore/docs/emulator (retrieved 2026-11-16; CC BY 4.0)

## Related

- [firestore-emulator.md](./firestore-emulator.md)
- [datastore-regional-endpoints.md](./datastore-regional-endpoints.md)
