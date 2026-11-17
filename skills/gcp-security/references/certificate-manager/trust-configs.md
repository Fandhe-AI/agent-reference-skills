---
source: https://docs.cloud.google.com/certificate-manager/docs/trust-configs
---

# Manage trust configs

Create, update, list, view, and delete Certificate Manager trust configs used for mutual TLS (mTLS) scenarios. A trust config holds the trust anchors, optional intermediate CAs, and optional allowlisted certificates used to validate certificates.

## Signature / Usage

### Create or update (YAML import)

Trust config YAML file:

```yaml
name: "TRUST_CONFIG_ID"
trustStores:
- trustAnchors:
  - pemCertificate: "CERTIFICATE_PEM_PAYLOAD"
  intermediateCas:
  - pemCertificate: "INTER_CERT_PEM_PAYLOAD"
allowlistedCertificates:
- pemCertificate: "ALLOWLISTED_CERT1"
- pemCertificate: "ALLOWLISTED_CERT2"
```

```bash
gcloud certificate-manager trust-configs import TRUST_CONFIG_ID \
  --project=PROJECT_ID \
  --source=TRUST_CONFIG_FILE \
  --location=LOCATION
```

To update, export the current file, edit it, and import it against the existing name:

```bash
gcloud certificate-manager trust-configs export TRUST_CONFIG_ID \
    --project=PROJECT_ID \
    --destination=TRUST_CONFIG_FILE \
    --location=LOCATION
```

### Create via API

Adapted (not in the official docs): removed trailing commas (invalid JSON) and used the camelCase field names of the Certificate Manager v1 Discovery document (`trustStores`, `trustAnchors`, `pemCertificate`, `intermediateCas`, `allowlistedCertificates`).

```text
POST /v1/projects/PROJECT_ID/locations/LOCATION/trustConfigs?trust_config_id=TRUST_CONFIG_ID
{
  "description": "DESCRIPTION",
  "trustStores": [{
    "trustAnchors": [{
      "pemCertificate": "CERTIFICATE_PEM_PAYLOAD"
    }],
    "intermediateCas": [{
      "pemCertificate": "INTER_CERT_PEM_PAYLOAD"
    }]
  }],
  "allowlistedCertificates": [{
    "pemCertificate": "ALLOWLISTED_CERT"
  }]
}
```

### List, view, delete

```bash
gcloud certificate-manager trust-configs list \
    --filter="FILTER" \
    --page-size="PAGE_SIZE" \
    --limit="LIMIT" \
    --sort-by="SORT_BY" \
    --location=LOCATION
```

```bash
gcloud certificate-manager trust-configs describe TRUST_CONFIG_ID \
    --location=LOCATION
```

```bash
gcloud certificate-manager trust-configs delete TRUST_CONFIG_ID \
    --location=LOCATION
```

View it through the API:

```text
GET /v1/projects/PROJECT_ID/locations/LOCATION/trustConfigs/TRUST_CONFIG_ID
```

Delete it through the API:

```text
DELETE /v1/projects/PROJECT_ID/locations/LOCATION/trustConfigs/TRUST_CONFIG_ID
```

## Options / Props

### Roles

| Task | Roles on the project |
|---|---|
| Create, update | `roles/certificatemanager.editor` or `roles/certificatemanager.owner` |
| List, view | `roles/certificatemanager.editor`, `roles/certificatemanager.owner`, or `roles/certificatemanager.viewer` |
| Delete | `roles/certificatemanager.owner` |

### Placeholders and constraints

| Item | Detail |
|---|---|
| `LOCATION` | Region where the trust config is stored; default `global`. For list, `-` (the default) lists all regions |
| Name (console) | Unique per project; starts with a lowercase letter, then up to 62 lowercase letters, numbers, or hyphens; must not end with a hyphen |
| Location choices (console) | Global or Regional |
| Sort | `SORT_BY` is a comma-separated list of `name` fields; ascending by default, prefix `~` for descending |
| Filter example | `--filter='labels.key:value AND create_time > "2021-09-01T00:00:00Z"'` |

## Notes

- One `pemCertificate` field holds one certificate; repeat the field for multiple trust anchors, intermediate certificates, or allowlisted certificates. PEM format follows RFC 7468.
- Allowlisted certificates are always considered valid if parseable, with proof of private-key possession and SAN constraints met; expired certificates are also valid when allowlisted. A trust store isn't needed for allowlist-only configs. Allowlisting widens trust; use it deliberately.
- Before deleting a trust config, detach it from the Client Authentication (`ServerTlsPolicy`) resource. Deleting is irreversible and, if the config is still in use for mTLS, disruptive; try it on a disposable resource first.
- The gcloud steps assume Cloud Shell or another environment with `bash`. Trust anchors and intermediate CAs are public certificates; never put private keys into a trust config file.
- Using a trust config on a target proxy is described in the Cloud Load Balancing mTLS pages (`gcp-load-balancing` skill).
- The source also shows Console steps and the `PATCH ...trustConfigs/TRUST_CONFIG_ID?update_mask=*` API update with the same body shape.
- Corrected from the official docs: the API example used mixed `trust_stores` / `trust_anchors` / `pem_certificate` and `allowlistedCertificates` names and trailing commas (`"intermediate_cas": [{...}],`).
- Source: https://docs.cloud.google.com/certificate-manager/docs/trust-configs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [core-components.md](./core-components.md)
- [overview.md](./overview.md)
