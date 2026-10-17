---
source: https://docs.docker.com/reference/compose-file/models/
---

# Models

The top-level `models` section declares AI models used by your Compose application. Models are typically pulled as OCI artifacts, run by a model runner, and exposed as an API that service containers can consume.

## Signature / Usage

```yaml
services:
  app:
    image: app
    models:
      - ai_model


models:
  ai_model:
    model: ai/model
```

- The `app` service uses `ai_model`, defined as an OCI artifact (`ai/model`) that is pulled and served by the model runner.
- Docker Compose injects connection info, for example `AI_MODEL_URL`, into the container.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `model` (required) | string | The OCI artifact identifier for the model; what Compose pulls and runs via the model runner. |
| `context_size` | integer | Maximum token context size for the model. |
| `runtime_flags` | list | Raw command-line flags passed to the inference engine when the model is started. |

Advanced setup (long syntax in the service; Compose injects the model runner's URL as `MODEL_URL`):

```yaml
services:
  app:
    image: app
    models:
      my_model:
        endpoint_var: MODEL_URL

models:
  my_model:
    model: ai/model
    context_size: 1024
    runtime_flags: 
      - "--a-flag"
      - "--another-flag=42"
```

## Notes

- Services can only access models when explicitly granted by a `models` attribute within the `services` element.
- This is the Compose file's `models` element; Docker Model Runner, `docker model` CLI, and the broader `/ai/` documentation are not covered by this skill.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: image / build / command / identity attributes](./services-image-command.md)
