---
source: https://docs.cloud.google.com/model-armor/overview
---

# Model Armor overview

Model Armor is a Google Cloud service that screens LLM prompts and responses to protect AI applications from malicious input, unsafe content and sensitive data leakage. Behavior is configured with templates (per application) and floor settings (project-level baseline). Filters cover responsible AI categories, prompt injection and jailbreak, Sensitive Data Protection, malicious URLs and CSAM. It works for AI deployed in Google Cloud or other cloud providers.

## Signature / Usage

### Data flow

1. The application receives a prompt; Model Armor inspects it.
2. The prompt (or sanitized prompt) goes to the LLM.
3. The LLM generates a response; Model Armor inspects it.
4. The response (or sanitized response) goes to the user, with a description of triggered and untriggered filters.

### Template configuration example

The following template configuration enables the responsible AI filters at `MEDIUM_AND_ABOVE`, prompt injection and jailbreak detection at `LOW_AND_ABOVE`, malicious URL detection, `INSPECT_ONLY` enforcement and multi-language detection.

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
```

## Options / Props

### Confidence levels

| Confidence level | Detection probability | False positive risk | Recommended use case |
|---|---|---|---|
| High | Only flags content with near-certainty of a violation. | Very low | Production environments that prioritize uninterrupted user interactions. |
| Medium and above | Flags content with a balanced degree of confidence. | Moderate | Standard enterprise applications; suitable for general content safety. |
| Low and above | Flags any content with even a slight indication of a violation. | High | Use with caution. Potentially suitable for high-stakes categories like prompt injection and jailbreak detection. Not recommended for general responsible AI content categories. |

### Responsible AI categories

| Category | Definition |
|---|---|
| Hate speech | Negative or harmful comments targeting identity and/or protected attributes. |
| Harassment | Threatening, intimidating, bullying, or abusive comments targeting another individual. |
| Sexually explicit | Contains references to sexual acts or other lewd content. |
| Dangerous content | Promotes or enables access to harmful goods, services, and activities. |

### Sensitive Data Protection modes

| Mode | Details |
|---|---|
| Basic configuration | Inspection only; no Sensitive Data Protection templates. Categories: credit card number, US social security number (SSN), financial account number, US individual taxpayer identification number (ITIN), Google Cloud credentials, Google Cloud API key. |
| Advanced configuration | Uses Sensitive Data Protection templates; supports inspection and de-identification. Basic provides limited infotypes, mainly for the US region. |

### Enforcement types

| Mode | Function |
|---|---|
| `Inspect only` | Logs violations to Cloud Logging; does not stop the request or response. Cloud Logging must be enabled to gain value. |
| `Inspect and block` | Logs the violation and returns a block verdict; the calling service or Policy Enforcement Point (PEP) blocks further processing. |

### Limits and defaults

| Item | Value |
|---|---|
| Malicious URL detection | Scans only the first 256 URLs found in a prompt or response. |
| Prompt injection and jailbreak input | Fewer than three words returns `NO_MATCH_FOUND`. |
| CSAM filter, floor settings | Enabled by default at `High` (floor settings are global resources). |
| CSAM filter, templates | Enabled by default at `High` in regions that support CSAM detection or when data residency compliance is disabled; disabled by default in regions without support when data residency compliance is enabled (cannot create or update a template with CSAM enabled unless data residency compliance is disabled in the template). CSAM is configurable only through the API, not the console. |
| Document size | 4 MB; larger files are skipped. Files smaller than 69 bytes are rejected with `InvalidDocumentInputException`. |
| Document types | PDF; CSV; TXT; DOCX, DOCM, DOTX, DOTM; PPTX, PPTM, POTX, POTM, POT; XLSX, XLSM, XLTX, XLTM. |
| Image screening (Preview) | JPEG, PNG, BMP only; 4 MB or smaller; one image per request; not images embedded in files; not images combined with text in `SanitizeUserPrompt` / `SanitizeModelResponse`; only the `us` and `eu` multi-regions (otherwise `invocation_result` is `FAILURE`). |
| Tested languages | Chinese (Mandarin), English, French, German, Italian, Japanese, Korean, Portuguese, Spanish (responsible AI and prompt injection filters; other languages vary in quality). |
| Data in transit | TLS 1.2 and later. |
| Tokens | About 4 characters per token; tokens are used for pricing and filter limit enforcement. |

### Limitations

| Limitations |
|---|
| Each prompt and response is inspected independently as a single-turn request; no conversation history. |
| Encoded content (Base64, hexadecimal, URL encoding, ciphertext) is not decoded or inspected. |
| Audio and video are not supported; prompts combining text and images in one request are not supported. |

## Notes

- Confidence levels: Filter sensitivity controls the detection rate. A lower threshold identifies more events but might increase false positives. Confidence levels for Sensitive Data Protection work differently (see the Sensitive Data Protection match likelihood page).
- Google Cloud Model Armor screens prompts and responses as a service; it is not the guardrails of the OpenAI Agents SDK (`openai-agents`) or Claude guardrail guidance (`anthropic-prompt-eval`).
- Network: to reach regional endpoints from a VPC network, create a Private Service Connect endpoint to the Model Armor APIs; this prevents certificate errors with Private Google Access or VPC Service Controls.
- Best practice: use separate templates for prompts (input) and responses (output); start with `High` or `Medium and above`; test against representative data. Suggested start: responsible AI hate speech and harassment at `High`, prompt injection and jailbreak at `Medium` (`High` for applications like Gemini Enterprise), advanced Sensitive Data Protection templates for required infotypes.
- Start with `Inspect only` and enable Cloud Logging, then switch to `Inspect and block` after analyzing logs. In `Inspect only` mode a model's own refusal is not a Model Armor block; check `SanitizeOperationLogEntry` records in Cloud Logging (filter service name `modelarmor.googleapis.com`).
- The example template above uses `INSPECT_ONLY`; it does not block anything.
- Model Armor is stateless and keeps content in memory only; content is stored only if Cloud Logging is enabled. Processing stays in the chosen geography (such as `US` or `EU`). Only active filters transmit data.
- Pricing: standalone or as part of Security Command Center; skipped data is not charged. See https://cloud.google.com/security/products/model-armor#pricing and https://cloud.google.com/security-command-center/pricing#model-armor-in-security-command-center.
- The overview page itself has no code; Snippet taken from https://docs.cloud.google.com/model-armor/model-armor-vertex-integration
- Source: https://docs.cloud.google.com/model-armor/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [integrations.md](./integrations.md)
- [model-armor-vertex-integration.md](./model-armor-vertex-integration.md)
- [set-filter-version.md](./set-filter-version.md)
- [configure-logging.md](./configure-logging.md)
- [best-practices.md](./best-practices.md)
