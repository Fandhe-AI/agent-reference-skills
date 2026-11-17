---
source: https://docs.cloud.google.com/model-armor/set-filter-version
---

# Set the filter version

Filter versions give production stability and access to the latest threat detection models. You configure a single filter version per template (not per filter), either with an alias (`Stable`, `Latest`) or a pinned version number such as `v3` or `v4`. The setting does not affect the Sensitive Data Protection and malicious URL filters.

## Signature / Usage

### Create a template with a filter version

gcloud, alias (`FILTER_VERSION_ALIAS` is `filter-version-alias-stable` or `filter-version-alias-latest`):

```bash
gcloud model-armor templates create TEMPLATE_ID \
    --project=PROJECT_ID \
    --location=LOCATION \
    --pi-and-jailbreak-filter-settings-enforcement=enabled \
    --filter-version-selector-alias=FILTER_VERSION_ALIAS
```

gcloud, version number (`FILTER_VERSION_NUMBER` such as `v3` or `v4`):

```bash
gcloud model-armor templates create TEMPLATE_ID \
    --project=PROJECT_ID \
    --location=LOCATION \
    --pi-and-jailbreak-filter-settings-enforcement=enabled \
    --filter-version-selector=FILTER_VERSION_NUMBER
```

REST: use `alias` (`FILTER_VERSION_ALIAS_STABLE` or `FILTER_VERSION_ALIAS_LATEST`), or pin a version by replacing the `filterVersionSelector` content with `"version": "FILTER_VERSION_NUMBER"`. `LOCATION` is the template location.

```bash
export TEMPLATE_CONFIG='{
  "filterConfig": {
    "piAndJailbreakFilterSettings": {
      "filterEnforcement": "ENABLED"
    }
  },
  "templateMetadata": {
    "filterVersionSelector": {
      "alias": "FILTER_VERSION_ALIAS"
    }
  }
}'

curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -d "$TEMPLATE_CONFIG" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates?template_id=TEMPLATE_ID"
```

### Update the filter version of a template

gcloud, alias:

```bash
gcloud model-armor templates update TEMPLATE_ID \
    --project=PROJECT_ID \
    --location=LOCATION \
    --filter-version-selector-alias=FILTER_VERSION_ALIAS
```

gcloud, version number:

```bash
gcloud model-armor templates update TEMPLATE_ID \
    --project=PROJECT_ID \
    --location=LOCATION \
    --filter-version-selector=FILTER_VERSION_NUMBER
```

REST, alias (for a version number use `"version": "FILTER_VERSION_NUMBER"`):

```bash
export TEMPLATE_CONFIG='{
  "templateMetadata": {
    "filterVersionSelector": {
      "alias": "FILTER_VERSION_ALIAS"
    }
  }
}'

curl -X PATCH \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    -d "$TEMPLATE_CONFIG" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID?updateMask=templateMetadata.filterVersionSelector"
```

### Override the default filter version for floor settings

The Agent Platform integration with floor settings uses `Stable` by default. To override, create a template with a version or alias in the same region where you send the Gemini request, then pass it in `model_armor_config`.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/publishers/google/models/gemini-2.5-flash:generateContent" \
  -d '{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Your prompt here"
        }
      ]
    }
  ],
  "model_armor_config": {
    "prompt_template_name": "projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID",
    "response_template_name": "projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
  }
}'
```

## Options / Props

### Aliases

| Alias | Meaning |
|---|---|
| `Latest` | Latest models and protections, frequently updated; standard SLOs but stability might vary. For testing, staging, and workloads that prioritize recent detection. |
| `Stable` | Default alias; reliable, unchanging detection logic for production. When a new version becomes `Stable`, the previous `Stable` becomes `Legacy`. |
| `Legacy` | Earlier `Stable` version, available for 90 days after a new `Stable` release. New templates cannot be created with a `Legacy` version. |
| `Retired` | Version past the 90-day legacy period, no longer available; calls to templates still using it are sanitized with the `Stable` version. |

### Alias values

| Surface | Values |
|---|---|
| gcloud `--filter-version-selector-alias` | `filter-version-alias-latest`, `filter-version-alias-legacy`, `filter-version-alias-retired`, `filter-version-alias-stable` (use `-stable` or `-latest`) |
| REST `filterVersionSelector.alias` | `FILTER_VERSION_ALIAS_STABLE`, `FILTER_VERSION_ALIAS_LATEST` |

### Version release timeline

| Version | Alias | Release date | Retirement date | Supported region |
|---|---|---|---|---|
| `v1` | `Legacy` (`Stable` in `asia-northeast3`; `Legacy` from September 25, 2026 in `australia-southeast2`) | 2025-01-30 | 2026-12-17 | `asia-northeast1` `asia-northeast3` (`Stable`) `asia-south1` `asia-southeast1` `australia-southeast2` (`Legacy` from September 25, 2026) `europe-southwest1` `europe-west9` `northamerica-northeast2` `us` `us-central1` `us-east4` `us-west1` |
| `v2` | `Legacy` | 2025-06-19 | 2026-12-17 | `eu` `europe-west1` `europe-west2` `europe-west3` `europe-west4` `us-east1` |
| `v3` | `Stable` (`Stable` from September 25, 2026 in `australia-southeast2`) | 2026-05-25 | --- | `asia-northeast1` `asia-south1` `asia-southeast1` `australia-southeast2` (`Stable` from September 25, 2026) `eu` `europe-southwest1` `europe-west1` `europe-west2` `europe-west3` `europe-west4` `europe-west9` `northamerica-northeast2` `southamerica-east1` `us` `us-central1` `us-east1` `us-east4` `us-west1` |
| `v4` | `Latest` | 2026-09-18 | --- | `asia-northeast1` `asia-south1` `asia-southeast1` `eu` `europe-southwest1` `europe-west1` `europe-west2` `europe-west3` `europe-west4` `europe-west9` `northamerica-northeast2` `southamerica-east1` `us` `us-central1` `us-east1` `us-east4` `us-west1` |

### Sanitize response fields (`sanitizationMetadata.filterVersionConfig`)

| Field | Description |
|---|---|
| `filterVersion` | Version used, for example `v2`. |
| `filterVersionAlias` | Alias of that version, for example `FILTER_VERSION_ALIAS_LEGACY`. |
| `releaseDate` | Release date (`year`, `month`, `day`). |
| `projectedDeprecationDate` | Projected retirement date. |
| `messageItems` | Messages such as a `WARNING` that the version is `LEGACY` and will be `RETIRED` on a date. |

## Notes

- Template behavior: a template without a version, new or existing, defaults to `Stable`; templates using the `Latest` or `Stable` alias move automatically when the alias moves; you can't set a template's version to `Legacy` or `Retired`.
- Lifecycle: new version released as `Latest`; when promoted to `Stable` the previous `Stable` becomes `Legacy` and a new `Latest` appears; after 90 days as `Legacy` the version is retired. Migrate `Legacy` templates to `Stable` or `Latest` within the 90 days. A deprecation warning appears in the sanitize response 30 days before retirement. A `Legacy` version still works for sanitize operations during the 90 days.
- Pinning a version gives fixed, unchanged behavior even when aliases are updated; an alias adopts new versions automatically. The source suggests the `Latest` alias for evaluating new filter rules in pre-production environments.
- `LOCATION` of the template must be the region where the Gemini request is sent, otherwise Agent Platform returns `Template not found`.
- The filter version cannot be overridden for the Google and Google Cloud MCP servers integration.
- In gcloud 593.0.0 `templates create`, the filter flags form a group of which at least one must be specified ("At least one of these must be specified"); `--pi-and-jailbreak-filter-settings-enforcement` alone satisfies it.
- The REST create request with a pinned `version`, the sample create / update responses, and a sanitize response with `filterVersionConfig` are omitted (summarized in the table above; the sample's multi-line message string is not valid JSON); see the source page.
- Source: https://docs.cloud.google.com/model-armor/set-filter-version (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [model-armor-vertex-integration.md](./model-armor-vertex-integration.md)
- [configure-logging.md](./configure-logging.md)
