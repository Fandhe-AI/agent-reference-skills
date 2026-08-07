<!-- source: https://platform.claude.com/docs/en/manage-claude/data-residency / last verified: 2026-08-07 -->

# Data residency

Manage where model inference runs and where data is stored, through two independent settings: `inference_geo` (per-request) and workspace geo (at-rest storage, set at workspace creation).

## Signature / Usage

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1024,
    "inference_geo": "us",
    "messages": [{"role": "user", "content": "Summarize the key points of this document."}]
  }'
```

Response `usage.inference_geo` reports where inference actually ran.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `inference_geo` | `"global"` \| `"us"` | Request parameter on `POST /v1/messages`. Default `"global"` |
| `allowed_inference_geos` | workspace setting | Restricts which geos a workspace can use |
| `default_inference_geo` | workspace setting | Fallback geo when `inference_geo` omitted |
| Workspace geo | `"us"` (only option) | Set once at workspace creation; controls at-rest storage and endpoint processing |

## Notes

- `inference_geo` requires Claude 4.6+ models; earlier models return 400. Not available on Bedrock, Google Cloud (region set by endpoint/inference profile instead), Microsoft Foundry (use US Data Zone Standard deployment instead), or the OpenAI SDK compatibility endpoint. Claude Managed Agents does not support the parameter but respects Workspace geo.
- Supported on the Batch API per-request.
- Pricing: `inference_geo: "us"` on Claude 4.6+ is 1.1x standard rate across all token categories (also affects Priority Tier TPM burndown); `"global"` and older models use standard pricing.
- Legacy global-routing opt-outs were auto-migrated to `allowed_inference_geos: ["us"]` and `default_inference_geo: "us"`; no code changes required.
- Current limitations: rate limits shared across geos; only `"us"`/`"global"` inference geos exist; only `"us"` workspace geo exists and it cannot change after creation.

## Related

- [api-and-data-retention.md](./api-and-data-retention.md)
