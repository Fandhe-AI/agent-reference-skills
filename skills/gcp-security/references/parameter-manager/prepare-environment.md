---
source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/prepare-environment
---

# Prepare environment for Parameter Manager

Enable the Parameter Manager API, optionally configure regional endpoints (required to create regional parameters), and grant the Parameter Manager Admin role.

## Signature / Usage

### Regional endpoint format

Regional endpoints only allow requests to proceed if the affected resource exists in the location specified by the endpoint. They help meet data residency and data sovereignty requirements.

```text
SERVICE_NAME.LOCATION.rep.googleapis.com
```

### Configure gcloud for a regional endpoint

Use Google Cloud CLI 402.0.0 or newer, then set the property. `LOCATION` is a supported location such as `us-central1`.

```bash
gcloud config set api_endpoint_overrides/parametermanager https://parametermanager.LOCATION.rep.googleapis.com/
```

### Configure REST for a regional endpoint

Replace the generic endpoint `https://secretmanager.googleapis.com/v1/` with the regional endpoint (`LOCATION` such as `me-central2`).

```text
https://parametermanager.LOCATION.rep.googleapis.com/
```

### Grant the Parameter Manager Admin role

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member user:USER_IDENTIFIER \
    --role=roles/parametermanager.admin
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Your project ID |
| `USER_IDENTIFIER` | Identifier used to access Google Cloud and assign IAM roles, for example `dana@example.com` |
| `LOCATION` | A supported Google Cloud location (for example `us-central1`) |

## Notes

- The source shows the API enablement steps as Console instructions only; they are not reproduced here.
- The role grant is project-level, as in the source; grant at a narrower scope where possible.
- Source inconsistency: the REST step gives `me-central2` as an example location, but the Secret Manager locations page lists `me-central2` (Dammam) as not supporting Parameter Manager; pick a location that the locations page marks as supported.
- To see which locations support regional endpoints, see the Parameter Manager regional endpoint locations on https://docs.cloud.google.com/secret-manager/docs/locations#parameter_manager_locations.
- Source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/prepare-environment (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-parameter.md](./create-parameter.md)
