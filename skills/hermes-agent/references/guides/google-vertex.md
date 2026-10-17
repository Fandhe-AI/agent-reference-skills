# Google Vertex AI

Use Gemini on Google Cloud Vertex AI through its OpenAI-compatible endpoint, with OAuth2 (service account or ADC) and GCP billing; no static API key.

## Signature / Usage

```bash
# Option A: service account JSON
echo "VERTEX_CREDENTIALS_PATH=/path/to/service-account.json" >> ~/.hermes/.env
# Option B: Application Default Credentials
gcloud auth application-default login

hermes model     # More providers... -> Google Vertex AI -> project ID, region, model
hermes chat
```

`~/.hermes/config.yaml`:

```yaml
model:
  default: google/gemini-3-flash-preview
  provider: vertex

vertex:
  project_id: my-gcp-project   # blank -> use the project embedded in the credentials
  region: global               # "global" is required for the Gemini 3.x previews
```

Endpoint used:

```text
https://aiplatform.googleapis.com/v1beta1/projects/{project}/locations/{region}/endpoints/openapi
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `VERTEX_CREDENTIALS_PATH` | env | Service-account JSON path (checked first) |
| `GOOGLE_APPLICATION_CREDENTIALS` | env | Service-account JSON path (checked second); omit both to use ADC |
| `VERTEX_PROJECT_ID` | env | Overrides `vertex.project_id` |
| `VERTEX_REGION` | env | Overrides `vertex.region` |
| `vertex.project_id` | config | GCP project |
| `vertex.region` | config | Region; default `global` |

Models (require the `google/` prefix): `google/gemini-3.8-flash`, `google/gemini-3.7-flash`, `google/gemini-3.1-pro-preview`, `google/gemini-3-pro-preview`, `google/gemini-3-flash-preview`, `google/gemini-3.1-flash-lite-preview`, `google/gemini-2.5-pro`, `google/gemini-2.5-flash`.

## Notes

- Requires a GCP project with the Vertex AI API enabled and billing active, and `roles/aiplatform.user` on the identity. `google-auth` is lazy-installed; `hermes setup` repairs a managed install.
- Auth: credentials resolve as `VERTEX_CREDENTIALS_PATH`, then `GOOGLE_APPLICATION_CREDENTIALS`, then ADC. An OAuth2 token (`cloud-platform` scope) is cached and refreshed within 5 minutes of expiry; on `401` it is re-minted and retried; if ADC's refresh token expires on a long-running gateway, the service-account JSON is used when configured. Pasting a temporary token as a custom provider `api_key` does not work.
- Regional locations use a `{region}-aiplatform.googleapis.com` host; Gemini 3.x previews may 404 on regional endpoints, so keep `region: global`.
- Reasoning effort maps to `extra_body.google.thinking_config`.
- `/model` switches among configured models; it does not collect credentials.
- Distinct from the AI Studio provider (`gemini`, static API key). Express-mode keys belong to the Gemini provider with `GEMINI_BASE_URL`.
- Troubleshooting: "Vertex AI credentials could not be resolved" (set a path or run ADC login; set `vertex.project_id`); 404 on Gemini 3.x (use `global`); 403 (role / API not enabled).
- Source: https://hermes-agent.nousresearch.com/docs/guides/google-vertex (pinned to v0.22.2)

## Related

- [google-gemini](./google-gemini.md)
- [aws-bedrock](./aws-bedrock.md)
