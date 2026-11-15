---
source: https://docs.cloud.google.com/bigtable/docs/emulator
---

# Bigtable emulator (client side)

Start the local in-memory Bigtable emulator and point a client library at it with `BIGTABLE_EMULATOR_HOST`.

## Signature / Usage

### Start with the gcloud CLI

```bash
gcloud beta emulators bigtable start
```

Default is `localhost:8086`. To bind a specific host and port:

```bash
gcloud beta emulators bigtable start --host-port=localhost:8086
```

### Start with Docker

```bash
docker run -p 127.0.0.1:8086:8086 --rm -ti google/cloud-sdk gcloud beta emulators bigtable start --host-port=0.0.0.0:8086
```

### Point the client at it

```bash
export BIGTABLE_EMULATOR_HOST=localhost:8086
```

Stop the emulator with Control-C, then:

```bash
unset BIGTABLE_EMULATOR_HOST
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `BIGTABLE_EMULATOR_HOST` | env var | `host:port` of the emulator; the client library checks it at startup. |
| `--host-port` | gcloud flag | `HOST:PORT` to bind; specify it explicitly when running multiple emulators. |

## Notes

- The Docker command binds `0.0.0.0` only inside the container; the published port is restricted to `127.0.0.1` on the host. Do not publish that port publicly.
- The emulator has no administrative APIs: use any project and instance name. It does not support a secure connection (plain local connection only).
- The source shows no Node.js, Python or Rust code; the env var applies to all client libraries. The Java wrapper is omitted.
- Out of scope: the Bigtable API itself (filters, table operations) belongs to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/bigtable/docs/emulator (retrieved 2026-11-16; CC BY 4.0)

## Related

- [spanner-emulator.md](./spanner-emulator.md)
- [pubsub-emulator.md](./pubsub-emulator.md)
