# Image Generation Provider Plugins

Image-gen provider plugins register a backend that services every `image_generate` tool call (DALL·E, gpt-image, Grok, Flux, fal, Replicate, local ComfyUI, ...). Built-in providers (OpenAI, OpenAI-Codex, xAI, FAL, Krea, DeepInfra, OpenRouter, Meta Model API) all ship as plugins; add or override by dropping a directory into `plugins/image_gen/<name>/`.

## Signature / Usage

```
plugins/image_gen/my-backend/
├── __init__.py      # ImageGenProvider subclass + register()
└── plugin.yaml      # Manifest with kind: backend
```

```python
from agent.image_gen_provider import (
    DEFAULT_ASPECT_RATIO, ImageGenProvider, error_response,
    normalize_reference_images, resolve_aspect_ratio, save_b64_image, success_response,
)

class MyBackendImageGenProvider(ImageGenProvider):
    @property
    def name(self) -> str:
        return "my-backend"          # stable id used in image_gen.provider

    def is_available(self) -> bool:
        return bool(os.environ.get("MY_BACKEND_API_KEY"))

    def list_models(self):
        return [{"id": "my-model-fast", "display": "My Model (Fast)",
                 "speed": "~5s", "strengths": "Quick iteration", "price": "$0.01/image"}]

    def default_model(self):
        return "my-model-fast"

    def capabilities(self):
        return {"modalities": ["text", "image"], "max_reference_images": 4}

    def generate(self, prompt: str, aspect_ratio: str = DEFAULT_ASPECT_RATIO, *,
                 image_url=None, reference_image_urls=None, **kwargs):
        aspect_ratio = resolve_aspect_ratio(aspect_ratio)
        try:
            ...
            return success_response(image=image, model=model_id, prompt=prompt,
                                    aspect_ratio=aspect_ratio, provider=self.name, modality="text")
        except Exception as exc:
            return error_response(error=str(exc), error_type=type(exc).__name__,
                                  provider=self.name, model=model_id,
                                  prompt=prompt, aspect_ratio=aspect_ratio)

def register(ctx) -> None:
    ctx.register_image_gen_provider(MyBackendImageGenProvider())
```

```yaml
# plugin.yaml
name: my-backend
version: 1.0.0
description: My image backend — text-to-image via My Backend SDK
author: Your Name
kind: backend
requires_env:
  - MY_BACKEND_API_KEY
```

## Options / Props

ABC members (`agent/image_gen_provider.py`):

| Member | Required | Default | Purpose |
|--------|----------|---------|---------|
| `name` | yes | — | Stable id used in `image_gen.provider` config |
| `display_name` | no | `name.title()` | Label in `hermes tools` |
| `is_available()` | no | `True` | Gate for missing creds/deps |
| `list_models()` | no | `[]` | Catalog for the model picker |
| `default_model()` | no | first from `list_models()` | Fallback model |
| `get_setup_schema()` | no | minimal | Picker metadata + env-var prompts (`name`, `badge`, `tag`, `env_vars`) |
| `capabilities()` | no | `{"modalities": ["text"], "max_reference_images": 0}` | Image-to-image support; optional `supports_upscale`, `creative_controls` (`creativity`, `intensity`, `complexity`, `movement`), `source_image_role: "style"` |
| `generate(prompt, aspect_ratio, **kwargs)` | yes | — | The call |

Response helpers:

| Helper | Fields |
|--------|--------|
| `success_response(...)` | `image` (URL or absolute path), `model`, `prompt`, `aspect_ratio` (`landscape` / `square` / `portrait`), `provider`, `modality`, optional `extra` |
| `error_response(...)` | `error`, `error_type` (`provider_error` / `invalid_input` / exception class name), `provider`, `model`, `prompt`, `aspect_ratio` |

## Notes

- Discovery: bundled `plugins/image_gen/<name>/` (auto-loaded, `kind: backend`), user `~/.hermes/plugins/image_gen/<name>/` (needs `plugins.enabled` or `hermes plugins enable <name>`), pip entry point `hermes_agent.plugins` (`my-backend-imggen = "my_backend_imggen_package"`, package must expose a top-level `register`). The registry is `agent/image_gen_registry.py`; the active provider is `image_gen.provider`.
- If `image_url` / `reference_image_urls` is set the call is image-to-image; report the path via `modality`.
- Base64 output: `save_b64_image(b64, prefix=..., extension="png")` writes to `$HERMES_HOME/cache/images/` and returns an absolute `Path`; pass `str(path)` as `image=`. URLs and absolute paths are both delivered by the gateway.
- User plugins with the same `name` as a bundled one override it (last-writer-wins).
- Reference implementations: `plugins/image_gen/openai/` (gpt-image-2 tiers as virtual model IDs), `xai/` (Grok Imagine, URL output), `openai-codex/` (Codex OAuth token, plain `httpx`).
- Source: developer-guide/image-gen-provider-plugin (v0.22.2 snapshot).

## Related

- [Video Generation Provider Plugins](./video-gen-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
