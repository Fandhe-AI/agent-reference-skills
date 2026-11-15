---
source: https://docs.cloud.google.com/firestore/native/docs/emulator
---

# Firestore emulator (client side)

Start the local in-memory Firestore emulator with the gcloud CLI and connect a server client library by setting `FIRESTORE_EMULATOR_HOST`.

## Signature / Usage

### Start the emulator

```bash
gcloud emulators firestore start
```

By default it uses `127.0.0.1:8080`. To bind a specific host and port:

```bash
gcloud emulators firestore start --host-port=HOST:PORT
```

### Connect a server client library

When this variable is set, the server client libraries (C#, Go, Java, Node.js, PHP, Python, Ruby) connect to the emulator automatically.

```bash
export FIRESTORE_EMULATOR_HOST="HOST:PORT"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `FIRESTORE_EMULATOR_HOST` | env var | `HOST:PORT` the emulator prints at startup (the emulator binds `127.0.0.1:8080` by default). |
| `--host-port` | gcloud flag | `HOST:PORT` to bind the emulator. |
| `--edition` | gcloud flag | `standard` (default) or `enterprise`. |

## Notes

- Use the emulator only for local testing; keep the host `localhost` / `127.0.0.1`. Data is held in memory only.
- Only the env var is needed for Node.js and Python; the source shows no Node.js, Python or Rust code. Rust is not mentioned.
- Android, Apple and Web SDK connection snippets (Firebase SDKs, for example `connectFirestoreEmulator`) are omitted: they are the Firebase client SDKs, distinct from the Google Cloud server client libraries.
- The emulator can also be reached through the Firebase Local Emulator Suite.
- Out of scope: the Firestore API itself and the emulator's differences from production (transactions, indexes, limits) belong to a product skill.
- Source: https://docs.cloud.google.com/firestore/native/docs/emulator (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [datastore-emulator.md](./datastore-emulator.md)
- [firestore-regional-endpoints.md](./firestore-regional-endpoints.md)
