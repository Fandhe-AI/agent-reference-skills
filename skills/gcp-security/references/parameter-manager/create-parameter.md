---
source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/create-parameter
---

# Create a parameter

A parameter is a dynamic variable holding configuration values such as database connection strings, feature flags, or service endpoints. It can store structured data (YAML or JSON) or unstructured data (plain text or binary content). You can create global and regional parameters.

## Signature / Usage

### Create a global parameter (structured data)

```bash
gcloud parametermanager parameters create PARAMETER_ID --location=global --parameter-format=FORMAT
```

Expected response:

```text
Created parameter [app_config].
```

### Create a regional parameter (structured data)

Configure the regional endpoint first (see [prepare-environment.md](./prepare-environment.md)).

```bash
gcloud parametermanager parameters create PARAMETER_ID --location=LOCATION --parameter-format=FORMAT
```

### Create a global parameter (unstructured data)

```bash
gcloud parametermanager parameters create PARAMETER_ID --location=global --parameter-format=UNFORMATTED
```

### Create a regional parameter (unstructured data)

```bash
gcloud parametermanager parameters create PARAMETER_ID --location=LOCATION --parameter-format=UNFORMATTED
```

### REST: create a global parameter

```text
POST https://parametermanager.googleapis.com/v1/projects/PROJECT_ID/locations/global/parameters?parameter_id=PARAMETER_ID
```

Request body (save as `request.json`):

```json
{"format": "YAML"}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://parametermanager.googleapis.com/v1/projects/PROJECT_ID/locations/global/parameters?parameter_id=PARAMETER_ID"
```

### REST: create a regional parameter

```text
POST https://parametermanager.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/parameters?parameter_id=PARAMETER_ID
```

The source shows a response similar to the following (regional, YAML format):

```json
{
  "name": "projects/production-1/locations/us-central1/parameters/app_config",
  "createTime": "2024-10-30T05:27:28.934719122Z",
  "updateTime": "2024-10-30T05:27:28.934719122Z",
  "format": "YAML",
  "policyMember": {
    "iamPolicyUidPrincipal": "principal://parametermanager.googleapis.com/projects/463050620945/uid/locations/us-central1/parameters/6ffe4045-0778-490a-a786-d77b124e2613"
  }
}
```

## Options / Props

| Name | Description |
|---|---|
| `PARAMETER_ID` | Name of the new parameter. 63 characters or less; English letters (A-Z, a-z), numbers (0-9), dashes (-), and underscores (_). Can't begin with a dash |
| `FORMAT` / `format` | Data type of the value: `YAML` or `JSON`; `UNFORMATTED` for unstructured data |
| `LOCATION` | Google Cloud location of a regional parameter; `global` for a global parameter |
| `PROJECT_ID` | Google Cloud project ID |

### Global vs regional parameters

| Feature | Global | Regional |
|---|---|---|
| Storage | Stored centrally | Stored within a specific location |
| Access | Standard API endpoint | Regional endpoint matching the parameter's location |
| Use cases | Apply regardless of where the app runs (default language settings, API keys) | Vary by deployment location (regional database connection strings, per-location feature flags) |

### Required role

| Role | Scope |
|---|---|
| Parameter Manager Admin (`roles/parametermanager.admin`) | Project, folder, or organization |

## Notes

- The REST query parameter is `parameterId` in the Discovery document (`projects.locations.parameters.create`); the source writes `?parameter_id=`, which is kept as in the source.
- The parameter creation endpoint has a threshold of approximately 1 query per second (QPS). On `RESOURCE_EXHAUSTED`, resubmit the request.
- Parameters have built-in identities: a unique identifier generated at creation and stored in the `iamPolicyUidPrincipal` field. Include that principal in allow policies to let the parameter access Secret Manager resources.
- The REST body for an unstructured parameter is `{"format": "UNFORMATTED"}` (global and regional). The source's regional client-library samples set the regional API endpoint `parametermanager.LOCATION.rep.googleapis.com:443` on the client (Java: `String.format("parametermanager.%s.rep.googleapis.com:443", locationId)`).
- The source also shows Console steps and C#, Go, Java, Node.js, PHP, Python, Ruby client-library samples, plus PowerShell variants; they are omitted here. The page states the format values `UNFORMATTED`, `YAML`, `JSON` in its SDK samples.
- Source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/create-parameter (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [prepare-environment.md](./prepare-environment.md)
- [overview.md](./overview.md)
