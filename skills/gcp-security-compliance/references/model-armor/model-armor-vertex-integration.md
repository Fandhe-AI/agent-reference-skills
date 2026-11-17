---
source: https://docs.cloud.google.com/model-armor/model-armor-vertex-integration
---

# Integrate Model Armor with Gemini Enterprise Agent Platform

Model Armor screens prompts before they reach Gemini models on Gemini Enterprise Agent Platform and screens responses before your application receives them (Gemini API in Vertex AI, `generateContent` method). Configure it with templates (per request) or floor settings (project-level baseline). Cloud Logging must be enabled to view sanitization results. The integration also protects the Google Generative AI SDKs and Firebase AI Logic SDKs.

## Signature / Usage

### Prerequisites

Grant the Model Armor User role to the Gemini Enterprise Agent Platform service account, enable the Model Armor API and set the API endpoint override.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member='serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com' --role='roles/modelarmor.user'
```

### Per-request protection with templates

Pass `modelArmorConfig` (`promptTemplateName` for the prompt, `responseTemplateName` for the response) in the `generateContent` request. Supported `LOCATION` values: `europe-west1`, `europe-west2`, `europe-west3`, `asia-southeast1`, `asia-south1`.

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/gemini-2.0-flash-001:generateContent" -d '{
"contents": [
    {
        "role": "user",
        "parts": [
            {
                "text": "[YOUR PROMPT HERE]"
            }
        ]
    }
]
, "generationConfig": {
    "responseModalities": ["TEXT"]
    ,"temperature": 0.2
    ,"maxOutputTokens": 1024
    ,"topP": 0.8
},
 "model_armor_config": {
        "prompt_template_name": "projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID",
        "response_template_name": "projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
        }
}'
```

Blocked response:

```json
{
  "promptFeedback": {
    "blockReason": "MODEL_ARMOR",
    "blockReasonMessage": "Blocked by Floor Setting. The prompt violated Responsible AI Safety settings (Harassment, Dangerous), Prompt Injection and Jailbreak filters."
  },
  "usageMetadata": {
    "trafficType": "ON_DEMAND"
  },
  "modelVersion": "gemini-2.0-flash-001",
  "createTime": "2025-03-26T13:14:36.961184Z",
  "responseId": "vP3jZ6DVOqLKnvgPqZL-8Ao"
}
```

### Create a template with the `Inspect only` enforcement type

```bash
export TEMPLATE_CONFIG='{
   "filter_config": {
    "rai_settings": {
     "rai_filters": [{
       "filter_type": "HATE_SPEECH",
       "confidence_level": "MEDIUM_AND_ABOVE"
      }, {
      "filter_type": "HARASSMENT",
      "confidence_level": "MEDIUM_AND_ABOVE"
    }, {
      "filter_type": "DANGEROUS",
      "confidence_level": "MEDIUM_AND_ABOVE"
    },{
      "filter_type": "SEXUALLY_EXPLICIT",
      "confidence_level": "MEDIUM_AND_ABOVE"
    }]
  },
  "pi_and_jailbreak_filter_settings": {
    "filter_enforcement": "ENABLED",
    "confidence_level": "LOW_AND_ABOVE"
  },
  "malicious_uri_filter_settings": {
    "filter_enforcement": "ENABLED"
  }
 },
 "template_metadata": {
    "enforcement_type": "INSPECT_ONLY",
    "multi_language_detection": {
      "enable_multi_language_detection": true
    }
  }
}'

curl -X POST \
    -d "$TEMPLATE_CONFIG"  \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates?template_id=TEMPLATE_ID"
```

### Project-level protection with floor settings

Set floor settings only at the project level (API or console). They apply to all `generateContent` calls in the project even if `modelArmorConfig` is omitted.

```bash
gcloud model-armor floorsettings update \
  --full-uri=projects/PROJECT_ID/locations/global/floorSetting \
  --add-integrated-services=VERTEX_AI
```

This enables `INSPECT_ONLY` by default. To switch to `INSPECT_AND_BLOCK`:

```bash
gcloud model-armor floorsettings update \
  --full-uri=projects/PROJECT_ID/locations/global/floorSetting \
  --vertex-ai-enforcement-type=INSPECT_AND_BLOCK
```

Remove the integration:

```bash
gcloud model-armor floorsettings update \
  --full-uri=projects/PROJECT_ID/locations/global/floorSetting \
  --remove-integrated-services=VERTEX_AI
```

Remove all integrated services:

```bash
gcloud model-armor floorsettings update \
  --full-uri=projects/PROJECT_ID/locations/global/floorSetting \
  --clear-integrated-services
```

REST (`inspectOnly` enforcement):

```bash
curl -X PATCH \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -d '{"filterConfig" : {"piAndJailbreakFilterSettings": { "filterEnforcement": "ENABLED"}}, "integratedServices": ["AI_PLATFORM"], "aiPlatformFloorSetting":{"inspectOnly":true, "enableCloudLogging":true}, "enableFloorSettingEnforcement":true}' \
  "https://modelarmor.googleapis.com/v1/projects/PROJECT_ID/locations/global/floorSetting"
```

Test inline enforcement with a `generateContent` call that uses a prompt designed to violate the floor settings (put the test prompt in `text`; set `VERTEX_AI_LOCATION` and `PROJECT_ID` first). Expect `blockReason` set to `MODEL_ARMOR`.

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://${VERTEX_AI_LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${VERTEX_AI_LOCATION}/publishers/google/models/gemini-2.5-flash:generateContent" -d '{
"contents": [
    {
        "role": "user",
        "parts": [
            {
                "text": ""
            }
        ]
    }
]
, "generationConfig": {
    "responseModalities": ["TEXT"]
    ,"temperature": 0.2
    ,"maxOutputTokens": 1024
    ,"topP": 0.8
}
}'
```

## Options / Props

### Precedence

| Template configured? | Agent Platform safety filters configured? | Floor settings configured? | Behavior |
|---|---|---|---|
| Yes | Yes | Any | Error: you cannot specify both template configuration and safety filters in the same request. |
| Yes | No | Any | Model Armor runs with the request templates; Agent Platform safety filters ignored; request templates override floor settings. |
| No | Yes | Yes | Both run; the most restrictive outcome is applied. |
| No | No | Yes | Model Armor runs with the active floor setting policy. |
| No | Yes | No | Only Agent Platform safety filters are evaluated; Model Armor isn't called. |
| No | No | No | Neither is applied; only baseline model behavior. |

### Template request fields

| Field | Description |
|---|---|
| `modelArmorConfig.promptTemplateName` | Resource name of the template that sanitizes the prompt. |
| `modelArmorConfig.responseTemplateName` | Resource name of the template that sanitizes the response. |

### gcloud floor settings flags

| Flag | Description |
|---|---|
| `--add-integrated-services=VERTEX_AI` | Enable Agent Platform integration (default `INSPECT_ONLY`). |
| `--vertex-ai-enforcement-type` | `INSPECT_ONLY` or `INSPECT_AND_BLOCK` (gcloud 593.0.0 help; default `INSPECT_ONLY`). |
| `--remove-integrated-services` | Remove the named service(s). |
| `--clear-integrated-services` | Remove all integrated services. |

## Notes

- Precedence: 1. Model Armor templates in the request (highest). 2. Model Armor floor settings. 3. Gemini Enterprise Agent Platform built-in safety filters (lowest).
- Limitation: with a Sensitive Data Protection template, Model Armor does not pass de-identified (masked, redacted, hashed) data back to Agent Platform; with `INSPECT_AND_BLOCK` it issues a block verdict instead.
- Limitation: documents and file uploads (such as PDFs) are not supported here; call the Model Armor REST API directly.
- Limitation: if the request is routed to a region where the template does not exist, it fails with `Template not found`.
- Fail-open: Agent Platform skips Model Armor sanitization and continues when Model Armor isn't available in the region, is temporarily unreachable, or errors, so unscreened prompts or responses can occasionally pass. `INSPECT_AND_BLOCK` still reports configuration errors such as permission or quota issues.
- Floor settings use the `Stable` filter version by default; specify a template in the `generateContent` call to override.
- Switching the floor settings to `INSPECT_AND_BLOCK` blocks every `generateContent` call in the project that violates the filters. Start with `INSPECT_ONLY`, review logs, and try it on a disposable project first.
- Source inconsistency: the floor-settings enforcement section names the values `INSPECT` or `INSPECT_AND_BLOCK`, while its examples and the gcloud 593.0.0 help use `INSPECT_ONLY` and `INSPECT_AND_BLOCK`. gcloud uses `VERTEX_AI` as the integrated service name and REST uses `AI_PLATFORM`.
- The IAM binding is at project level and grants the Agent Platform service agent; this is the documented requirement.
- Omitted: a second gcloud `INSPECT_AND_BLOCK` command that hard-codes the project `modelarmor-api-test` (the same command with `PROJECT_ID` is shown above); the REST `PATCH` that sets `"inspectAndBlock": true` with every filter at `LOW_AND_ABOVE`; a floor-settings `generateContent` example whose first `curl ... -d '{` line is duplicated (the test call above is used instead); and two sample responses, one with a line break inside a JSON string.
- The Console option for floor settings is omitted; see the source page.
- Source: https://docs.cloud.google.com/model-armor/model-armor-vertex-integration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [integrations.md](./integrations.md)
- [set-filter-version.md](./set-filter-version.md)
- [configure-logging.md](./configure-logging.md)
