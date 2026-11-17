---
source: https://docs.cloud.google.com/model-armor/integrations
---

# Overview

Model Armor integrates with Google Cloud services to secure AI and LLM interactions, reporting policy violations and optionally blocking actions. This page lists supported services, setup (enable the API, endpoint override), quota and enforcement.

## Signature / Usage

### Enable the API

Required permission `serviceusage.services.enable` (Owner `roles/owner`, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

```bash
gcloud services enable modelarmor.googleapis.com
```

### Set the API endpoint override (gcloud)

Only required when using gcloud with a region or multi-region other than the default `us` multi-region. Replace `LOCATION` with the region or multi-region where you want to use Model Armor.

```bash
gcloud config set api_endpoint_overrides/modelarmor "https://modelarmor.LOCATION.rep.googleapis.com/"
```

## Options / Props

### Integration options

| Integration option | Configure detections | Supported modalities | Inspect only | Inspect and block | Coverage |
|---|---|---|---|---|---|
| Agent Gateway | Only using templates | Text | Yes | Yes | All models and all clouds |
| Apigee | Only using templates | Text | Yes | Yes | All models and all clouds (includes other public clouds like AWS and Azure) |
| Gemini Enterprise | Only using templates | Text, documents | Yes | Yes | All models and all clouds (includes AWS and Azure) |
| Google and Google Cloud MCP servers | Only using floor settings | Text | Yes | Yes | Google and Google Cloud MCP servers |
| Service Extensions | Only using templates | Text | Yes | Yes | OpenAI format models, agents, and MCP servers on all clouds (includes AWS and Azure) |
| Gemini Enterprise Agent Platform | Both floor settings and templates | Text | Yes | Yes | Gemini models (non-streaming) |

### Quota

| Item | Value |
|---|---|
| Default quota | 1,200 QPM per project |
| Adjustable range | 0 to 1,200 QPM per project |
| Quota exceeded | HTTP `429 RESOURCE_EXHAUSTED` |

## Notes

- Integration options: OpenAI format models include several popular models (Anthropic Claude, Mistral AI, Grok) that support OpenAI specifications, typically deployed with inference engines such as vLLM.
- Modalities: the direct REST API supports text, documents and images. Among integrations only Gemini Enterprise supports documents (images embedded in documents are not screened); all others scan text only.
- Gemini Enterprise integration does not support de-identification or masking; if content triggers any Sensitive Data Protection infoType detector, Gemini Enterprise blocks the response.
- Agent Gateway: inline inspection on supported protocols, ingress and egress, without application code changes. Apigee: configure Model Armor policies in API proxies. Service Extensions: configure on application load balancers and GKE inference gateways. Google and Google Cloud MCP servers: sanitize MCP tool calls and responses using floor settings. Gemini Enterprise Agent Platform: screens `generateContent` of Gemini API in Vertex AI; documents and images are not supported and Cloud Logging must be enabled to see results.
- Integrations with Gemini Enterprise, Agent Runtime and Apigee sanitize the initial prompt, the final response and intermediate steps (grounding data, web search tool responses); a violating request is blocked and logged with a `SANITIZE_USER_PROMPT` operation type.
- REST API integration: Model Armor acts only as a detector; your application decides to block or allow from the response.
- Estimating quota: peak requests per minute, number of Model Armor calls per interaction (for example prompt plus response), concurrent users, plus a 20-30% buffer. Example: 500 users per minute with two calls each needs at least 1,000 QPM; request 1,200-1,300 QPM. Model Armor quota is separate from quotas of integrating services; use client-side retries with exponential backoff.
- Violations of a floor setting block the prompt or response and send a finding to Security Command Center (see the Security Command Center findings pages of this skill).
- Console steps are omitted; see the source page.
- Source: https://docs.cloud.google.com/model-armor/integrations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [model-armor-vertex-integration.md](./model-armor-vertex-integration.md)
- [configure-logging.md](./configure-logging.md)
- [best-practices.md](./best-practices.md)
