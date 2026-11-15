---
source: https://docs.cloud.google.com/spanner/docs/emulator
---

# Spanner emulator (client side)

Run the Spanner emulator (gcloud or Docker) and point client libraries at it with `SPANNER_EMULATOR_HOST`. The gcloud CLI itself is redirected with `api_endpoint_overrides`.

## Signature / Usage

### Start the emulator

```bash
gcloud components install cloud-spanner-emulator
gcloud emulators spanner start
```

The emulator uses `localhost:9010` for gRPC and `localhost:9020` for REST. With Docker:

Adapted (not in the official docs): the ports are published on the loopback interface only (`127.0.0.1:`), because the emulator has no authentication or IAM and the official `-p 9010:9010 -p 9020:9020` publishes them on all host interfaces.

```bash
docker run -p 127.0.0.1:9010:9010 -p 127.0.0.1:9020:9020 gcr.io/cloud-spanner-emulator/emulator
```

### Point client libraries at it

```bash
export SPANNER_EMULATOR_HOST=localhost:9010
```

Or with `env-init`:

```bash
$(gcloud emulators spanner env-init)
```

### Point gcloud at it

```bash
gcloud config configurations create emulator
gcloud config set auth/disable_credentials true
gcloud config set project your-project-id
gcloud config set api_endpoint_overrides/spanner http://localhost:9020/
```

Switch back and forth:

```bash
gcloud config configurations activate default
gcloud config configurations activate emulator
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `SPANNER_EMULATOR_HOST` | env var | `localhost:9010` (gRPC endpoint). Checked automatically at application start. |
| `api_endpoint_overrides/spanner` | gcloud property | `http://localhost:9020/` (REST endpoint). |
| `auth/disable_credentials` | gcloud property | `true` for emulator use. |

Minimum Spanner client library versions that support the emulator (source table, by language): Node.js client v4.5.0+, Python client v1.15.0+. These are library versions, not runtime versions.

## Notes

- Plain `http://localhost:9020/` is acceptable only for the local emulator. The emulator supports no TLS, authentication or IAM.
- gcloud may warn that the property value belongs to a domain outside the current config universe; the source says to confirm with `y`.
- Corrected from the official docs: `docker run -p 9010:9010 -p 9020:9020 gcr.io/cloud-spanner-emulator/emulator` publishes the ports on all host interfaces; the command above binds them to `127.0.0.1`. Do not expose the emulator ports publicly.
- The source shows no Node.js, Python or Rust code; the env var applies to all libraries. C#-specific `emulatordetection` and other-language tabs are omitted. Rust is not mentioned.
- Out of scope: the Spanner API itself and the emulator's limitations belong to a product skill, not `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/spanner/docs/emulator (retrieved 2026-11-16; CC BY 4.0)

## Related

- [bigtable-emulator.md](./bigtable-emulator.md)
- [pubsub-emulator.md](./pubsub-emulator.md)
