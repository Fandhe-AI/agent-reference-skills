---
source: https://docs.cloud.google.com/secret-manager/docs/locations
---

# Secret Manager locations

Secret Manager resources can be created in many locations. Multi-region locations are supported; zones and dual-region locations are not. Secrets and secret versions can be accessed globally across Google Cloud; a secret's replication policy determines where it and its versions are stored.

## Signature / Usage

List available Secret Manager locations:

```bash
gcloud secrets locations list
```

Regional endpoint form, from the source prose:

```text
https://secretmanager.me-central2.rep.googleapis.com
```

## Options / Props

### Asia Pacific

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `asia-south2` (Delhi) | Yes | Yes |
| `asia-east2` (Hong Kong) | Yes | Yes |
| `asia-southeast2` (Jakarta) | Yes | No |
| `australia-southeast2` (Melbourne) | Yes | Yes |
| `asia-south1` (Mumbai) | Yes | Yes |
| `asia-northeast2` (Osaka) | Yes | Yes |
| `asia-northeast3` (Seoul) | Yes | Yes |
| `asia-southeast1` (Singapore) | Yes | No |
| `australia-southeast1` (Sydney) | Yes | Yes |
| `asia-east1` (Taiwan) | Yes | Yes |
| `asia-northeast1` (Tokyo) | Yes | Yes |
| `asia-southeast3` (Bangkok) | Yes | No |

### Europe

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `europe-west1` (Belgium) | Yes | Yes |
| `europe-west10` (Berlin) | Yes | No |
| `europe-north1` (Finland) | No | No |
| `europe-north2` (Stockholm) | Yes | No |
| `europe-west3` (Frankfurt) | Yes | Yes |
| `europe-west2` (London) | Yes | Yes |
| `europe-southwest1` (Madrid) | Yes | Yes |
| `europe-west8` (Milan) | Yes | Yes |
| `europe-west4` (Netherlands) | Yes | Yes |
| `europe-west12` (Turin) | Yes | No |
| `europe-west9` (Paris) | Yes | Yes |
| `europe-central2` (Warsaw) | Yes | Yes |
| `europe-west6` (Zurich) | Yes | Yes |

### North America

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `us-central1` (Iowa) | Yes | Yes |
| `us-west4` (Las Vegas) | Yes | Yes |
| `us-west2` (Los Angeles) | Yes | Yes |
| `northamerica-south1` (Mexico) | Yes | Yes |
| `northamerica-northeast1` (Montréal) | Yes | Yes |
| `us-east4` (Northern Virginia) | Yes | Yes |
| `us-west1` (Oregon) | Yes | Yes |
| `us-west3` (Salt Lake City) | Yes | Yes |
| `us-east1` (South Carolina) | Yes | Yes |
| `northamerica-northeast2` (Toronto) | Yes | Yes |
| `us-east5` (Columbus) | Yes | Yes |
| `us-south1` (Dallas) | Yes | Yes |

### South America

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `southamerica-east1` (São Paulo) | Yes | Yes |
| `southamerica-west1` (Santiago) | Yes | Yes |

### Middle East

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `me-central2` (Dammam) | Yes | No |
| `me-central1` (Doha) | Yes | Yes |
| `me-west1` (Tel Aviv) | Yes | Yes |

### Africa

| Region | Regional Secret Manager | Parameter Manager |
|---|---|---|
| `africa-south1` (Johannesburg) | Yes | Yes |

### Multi-region locations

| Multi-Region Name | Multi-Region Description | Regional Secret Manager | Parameter Manager |
|---|---|---|---|
| `us` | Data centers in the United States | Yes | Yes |
| `eu` | Data centers in the European Union | Yes | Yes |
| `ca` | Data centers in the Canada | Yes | Yes |
| `in` | Data centers in the India | Yes | Yes |

## Notes

- The tables show whether the regionalized services are available. Parameter Manager resources can be created in a global location, a multi-region location, or a specific data location through a regional endpoint.
- Multi-region locations: Multi-region locations are data centers spread across a general geographical area; you cannot select specific data centers within a multi-region.
- Automatic replication is recommended for most users; user-managed replication selects one or more locations. See [choosing-replication.md](./choosing-replication.md).
- Regional endpoints only let a request proceed if the affected resource exists in the endpoint's location (for example a delete request to `https://secretmanager.me-central2.rep.googleapis.com` proceeds only if the secret is in `ME-CENTRAL2`), keeping data at rest and in transit in that location. For data residency zone (DRZ) or other compliance requirements, create resources in a location that supports regional endpoints; an organization policy can enforce regional endpoint use ("Restricting endpoint usage", https://docs.cloud.google.com/docs/security/compliance/restrict-endpoint-usage).
- Availability of Secret Manager resources: see the SLA (https://docs.cloud.google.com/secret-manager/sla).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/locations/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/secret-manager/docs/locations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [choosing-replication.md](./choosing-replication.md)
- [overview-rs.md](./overview-rs.md)
