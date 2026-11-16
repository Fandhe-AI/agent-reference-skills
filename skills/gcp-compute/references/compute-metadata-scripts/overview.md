---
source: https://docs.cloud.google.com/compute/docs/metadata/overview
---

# About VM metadata

Every Compute Engine instance stores its metadata (instance properties, network settings, user-defined data) on a metadata server that the VM reaches without extra authorization. Entries are key-value pairs in a directory hierarchy, scoped to the project, a zone, or one instance. Metadata keys are case sensitive.

## Signature / Usage

### Query the metadata server

Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux (first two lines of the "Accessing metadata" block). Always send the `Metadata-Flavor: Google` header.

Adapted (not in the official docs): `curl` changed to `curl -fsS`, as in the adapted linux.md script, so a missing key or an unavailable metadata server fails the command instead of storing the error body in `METADATA_VALUE`.

```bash
#! /bin/bash
METADATA_VALUE=$(curl -fsS http://metadata.google.internal/computeMetadata/v1/instance/attributes/foo -H "Metadata-Flavor: Google")
```

### HTTPS metadata server root certificate (Shielded VMs with the guest environment)

Root certificate on CentOS / RHEL / Rocky, Debian / Ubuntu, Fedora and SLES VMs:

```text
/run/google-mds-mtls/root.crt
```

Root certificate on Windows VMs:

```text
C:\ProgramData\Google\ComputeEngine\mds-mtls-root.crt
```

Client identity key on Linux VMs (Windows: `C:\ProgramData\Google\ComputeEngine\mds-mtls-client.key`):

```text
/run/google-mds-mtls/client.key
```

## Options / Props

### Endpoints

| Endpoint | HTTP | HTTPS (Shielded VMs only) |
|---|---|---|
| DNS name (recommended) | `http://metadata.google.internal/computeMetadata/v1` | `https://metadata.google.internal/computeMetadata/v1` |
| IPv4 address | `http://169.254.169.254/computeMetadata/v1` | `https://169.254.169.254/computeMetadata/v1` |
| IPv6 address (IPv6-only VMs only) | `http://[fd20:ce::254]/computeMetadata/v1` | `https://[fd20:ce::254]/computeMetadata/v1` |

HTTP endpoints work on all instance types, including Shielded VMs.

### Types of metadata

| Type | Directory | Notes |
|---|---|---|
| Project metadata | `http://metadata.google.internal/computeMetadata/v1/project` | Applies to all VMs in the project; predefined and custom keys |
| Zonal metadata | `http://metadata.google.internal/computeMetadata/v1/project` (same directory) | Applies to VMs in one zone of the project; custom keys only (no predefined zonal keys); zonal values override project values in that zone |
| Instance metadata | `http://metadata.google.internal/computeMetadata/v1/instance` | Per VM; predefined and custom keys |

Example from the source: project `key-1=value-1` plus zonal `key-1=zonal-value-1` for `us-central1-a` only. VMs in `us-central1-a` see `zonal-value1`; VMs in other zones keep `value-1`. A new project value for a key that already has a zonal value changes nothing in that zone.

### HTTPS endpoint certificates

| Certificate | Properties |
|---|---|
| Self-signed root | Unique per VM; generated on first boot only; valid 50 years; rotated on every instance start and stop |
| Server identity | For the metadata server |
| Client identity | Not cached by the server; new certificate on each call to the client certificate endpoint; valid 7 days; the guest environment must call at least every 7 days |

Metadata keys: `disable-https-mds-setup` set to `FALSE` enables automatic certificate setup. `enable-https-mds-native-cert-store` set to `TRUE` also adds the root certificate to the OS trust store (Debian/Ubuntu `/etc/ssl/certs/ca-certificates.crt`, CentOS/RHEL/Rocky `/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem`, Fedora `/etc/pki/tls/certs/ca-bundle.crt`, SLES `/etc/ssl/ca-bundle.pem`, Windows `Cert:\LocalMachine\Root`).

## Notes

- Uses: startup and shutdown scripts, host maintenance notices (`scheduling/` directory, `maintenance-event` key), guest attributes (small, infrequently changing data written by apps on the VM), partner attributes (deprecated when used with managed workload identities).
- Entries that are directories end with `/` (for example `/project/attributes/`); a single-value endpoint such as `hostname` returns plain text, a directory returns one entry per line. Custom directory listings need a trailing `/` in the key name.
- Security: any process that can query the metadata URL can read all values, including custom values, client certificates and private keys. Do not write secrets to metadata; sandbox any process that must not reach the metadata server. Requests never leave the physical host.
- Zonal metadata is recommended over project metadata for workloads that need regional isolation; it limits the impact of incorrect metadata updates to one zone.
- Querying the metadata server from inside the VM, including guest attribute writes, costs nothing and does not consume `compute.googleapis.com` API or regional quotas. Managing metadata with `gcloud` or the API from outside the VM counts against standard API quotas.
- Windows caution from the source: adding certificates to the OS trust store might cause issues with LDAPS.
- Source inconsistency: the zonal metadata example sets "`key-1=zonal-value-1`" and then says VMs in `us-central1-a` "inherit `key-1=zonal-value1`" (missing hyphen); both are kept as written. The value the VMs see is the one you set (`zonal-value-1`).
- The HTTPS form of each metadata directory is the same path under `https://metadata.google.internal` (Shielded VMs only).
- Corrected from the official docs: the borrowed snippet calls `curl` without `-f`; the metadata server returns `404` ("Not Found: the requested endpoint doesn't exist") for a path that does not exist, such as an unset attribute key, and `503` while it "isn't ready to serve"; without `-f`, `curl` prints the error response body and exits 0, so `METADATA_VALUE` holds the error text instead of failing. It now uses `curl -fsS`.
- Source (metadata server status codes): https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshoot-metadata-server (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/metadata/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux

## Related

- [predefined-metadata-keys.md](./predefined-metadata-keys.md)
- [linux.md](./linux.md)
- [shutdownscript.md](./shutdownscript.md)
- [guest-environment.md](./guest-environment.md)
