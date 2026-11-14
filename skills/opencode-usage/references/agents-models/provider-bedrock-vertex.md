---
source: https://opencode.ai/docs/providers/#bedrock
---

# Provider: Amazon Bedrock and Google Vertex

Amazon Bedrock uses the AWS default credential chain; Google Vertex uses Application Default Credentials (ADC).

## Signature / Usage

### Bedrock

Amazon Bedrock uses the AWS default credential chain. A named AWS profile is the simplest durable setup; OpenCode also recognizes access-key environments, web identity, and container credentials.

```bash
aws configure sso --profile work
aws sso login --profile work
```

Select the profile and region in provider settings. A configured `profile`, `AWS_PROFILE`, `AWS_ACCESS_KEY_ID`, web identity token file, or container credential URI activates the provider; a region alone does not.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "amazon-bedrock": {
      "settings": {
        "profile": "work",
        "region": "us-west-2",
      },
    },
  },
}
```

Without an explicit region, OpenCode uses `AWS_REGION`, then `AWS_DEFAULT_REGION`, then `us-east-1`. For a private or VPC endpoint, set `baseURL` while keeping the same profile and region.

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "amazon-bedrock": {
      "settings": {
        "profile": "work",
        "region": "us-west-2",
        "baseURL": "https://bedrock-runtime.vpce.example.com",
      },
    },
  },
}
```

Bedrock API keys use `AWS_BEARER_TOKEN_BEDROCK`. Other AWS variables feed SigV4 and are not stored as OpenCode API-key accounts.

### Vertex

Google Vertex uses Application Default Credentials (ADC) and needs a project before its models become available. Create local ADC, then set the project and location in provider settings.

```bash
gcloud auth application-default login
```

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "google-vertex": {
      "settings": {
        "project": "my-project",
        "location": "us-central1",
      },
    },
  },
}
```

OpenCode also resolves the project from `GOOGLE_VERTEX_PROJECT`, `GOOGLE_CLOUD_PROJECT`, `GCP_PROJECT`, or `GCLOUD_PROJECT`, in that order. It resolves the location from `GOOGLE_VERTEX_LOCATION`, `GOOGLE_CLOUD_LOCATION`, or `VERTEX_LOCATION`, and defaults to `us-central1`.

```bash
GOOGLE_CLOUD_PROJECT=my-project GOOGLE_VERTEX_LOCATION=europe-west4 opencode --standalone
```

Service accounts work through the same ADC path. Point `GOOGLE_APPLICATION_CREDENTIALS` at the service-account JSON file and still provide a project through settings or one of the project variables above.

```bash
GOOGLE_APPLICATION_CREDENTIALS=/secure/vertex.json \
GOOGLE_CLOUD_PROJECT=my-project \
opencode --standalone
```

Use the single `google-vertex` provider ID for Gemini, Anthropic, and OpenAI-compatible Vertex catalog models. The old `google-vertex-anthropic` provider ID is unavailable in V2.

## Notes

- Keep service-account JSON files outside the repository; do not commit credentials.
- Vertex does not appear until a project resolves; ADC alone does not activate the provider. Bedrock does not appear without a profile or another supported credential-chain input.

## Related

- [Providers](./providers.md)
- [Provider errors](./provider-errors.md)
- [Provider packages and models](./provider-packages-models.md)
