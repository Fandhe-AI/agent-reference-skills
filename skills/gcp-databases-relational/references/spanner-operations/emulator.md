---
source: https://docs.cloud.google.com/spanner/docs/emulator
---

# Cloud Spanner emulator

The Google Cloud CLI provides a local, in-memory emulator for developing and testing Spanner applications. It stores data only in memory, so all state (data, schema, configs) is lost on restart. It offers the same APIs as the Spanner production service, supports both the GoogleSQL and PostgreSQL dialects, and is for local development and testing, not production. It is also open source at GitHub (`GoogleCloudPlatform/cloud-spanner-emulator`).

## Signature / Usage

### Run with the gcloud CLI

```bash
gcloud components install cloud-spanner-emulator
```

```bash
gcloud components update
```

```bash
gcloud emulators spanner start
```

The emulator uses two local endpoints: `localhost:9010` for gRPC requests and `localhost:9020` for REST requests.

### Run with Docker

```bash
docker pull gcr.io/cloud-spanner-emulator/emulator
```

Adapted (not in the official docs): published both ports on the loopback interface only (`127.0.0.1`), because the emulator has no TLS or authentication and the original `-p 9010:9010 -p 9020:9020` binds all host interfaces.

```bash
docker run -p 127.0.0.1:9010:9010 -p 127.0.0.1:9020:9020 gcr.io/cloud-spanner-emulator/emulator
```

### Point the gcloud CLI at the emulator

Create a separate gcloud configuration, disable authentication and override the endpoint:

```bash
gcloud config configurations create emulator
gcloud config set auth/disable_credentials true
gcloud config set project your-project-id
gcloud config set api_endpoint_overrides/spanner http://localhost:9020/
```

Verify by creating an instance with the emulator's instance config:

```bash
gcloud spanner instances create test-instance \
  --config=emulator-config --description="Test Instance" --nodes=1
```

Switch between configurations:

```bash
# To switch to default (production) configuration:
gcloud config configurations activate default

# To switch back to emulator configuration:
gcloud config configurations activate emulator
```

### Point client libraries at the emulator

Set `SPANNER_EMULATOR_HOST` (Linux/macOS):

```bash
export SPANNER_EMULATOR_HOST=localhost:9010
```

Windows:

```bash
set SPANNER_EMULATOR_HOST=localhost:9010
```

Or with `gcloud emulators spanner env-init` (Linux/macOS):

```bash
$(gcloud emulators spanner env-init)
```

Windows:

```bash
gcloud emulators spanner env-init > set_vars.cmd && set_vars.cmd
```

When the application starts, the client library checks `SPANNER_EMULATOR_HOST` and connects to the emulator if it is running. When following the Getting Started guides, ignore project creation, authentication and credentials steps.

## Options / Props

### Not supported / differences

| Area | Behavior |
|------|----------|
| TLS/HTTPS, authentication, IAM, permissions, roles | Not supported |
| `PLAN` / `PROFILE` query modes | Returned query plan is empty |
| `ANALYZE` statement | Accepted but ignored |
| Audit logging and monitoring tools | Not supported |
| Database drop protection | `enable_drop_protection` is accepted, but databases can still be dropped |
| Error messages | Might differ from production |
| Performance and scalability | Not comparable to production |
| Read-write transactions and schema changes | Lock the entire database for exclusive access until completion |
| Partitioned DML and `partitionQuery` | Supported, but partitionability is not verified; a statement might run in the emulator and fail in production with the non-partitionable statement error |

### Minimum client library versions

| Client library | Minimum version |
|---|---|
| C++ | v0.9.x+ |
| C# | v3.1.0+ |
| Go | v1.5.0+ |
| Java | v1.51.0+ |
| Node.js | v4.5.0+ |
| PHP | v1.25.0+ |
| Python | v1.15.0+ |
| Ruby | v1.13.0+ |

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/emulator (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the Docker command was `docker run -p 9010:9010 -p 9020:9020 gcr.io/cloud-spanner-emulator/emulator`; ports are now bound to `127.0.0.1` so the unauthenticated, TLS-less emulator is not exposed on other interfaces.
- The image path `gcr.io/cloud-spanner-emulator/emulator` is kept verbatim as given in the source. Not from the source: Container Registry is shut down and writing images to it has been unavailable since March 18, 2025 (https://docs.cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation, as quoted on https://docs.cloud.google.com/appengine/docs/standard/quotas); the emulator page still documents this path for pulling, so check the emulator README on GitHub for the current image location.
- C#: unlike the other client libraries, C# ignores `SPANNER_EMULATOR_HOST` by default. Set `EmulatorDetection = "EmulatorOnly"` (the `emulatordetection` option) in `SpannerConnectionStringBuilder`; the source shows a C# snippet that is omitted here.
- When starting the emulator, warnings about proto registration conflicts (for example `WARNING: proto: file "google/rpc/status.proto" is already registered`) or log messages before `absl::InitializeLog()` are expected and can be ignored.
- Running `gcloud config set api_endpoint_overrides/spanner` may warn that the value is associated with a domain outside the current config universe; type `y` to proceed.
- For client setup patterns against the emulator (ADC, retries, emulator hosts per language), see the `gcp-client-libraries` skill.
- The full list of supported, unsupported and partially supported APIs is in the emulator README on GitHub. A 90-day free trial instance is an alternative to the emulator. The source also shows the per-language Getting Started links and the C# snippet.

## Related

- [pgadapter.md](./pgadapter.md)
