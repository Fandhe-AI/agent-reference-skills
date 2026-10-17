# Video Generation Provider Plugins

Video-gen provider plugins register a backend that services every `video_generate` tool call. Built-in providers (xAI, FAL, OpenRouter, DeepInfra) ship as plugins; add or override by dropping a directory into `plugins/video_gen/<name>/`. Mirrors the image-gen plugin shape.

## Signature / Usage

```
plugins/video_gen/my-backend/
├── __init__.py      # VideoGenProvider subclass + register()
└── plugin.yaml      # Manifest with kind: backend
```

```python
import os

from agent.video_gen_provider import VideoGenProvider, error_response, success_response

class MyVideoGenProvider(VideoGenProvider):
    @property
    def name(self) -> str:
        return "my-backend"

    def is_available(self) -> bool:
        return bool(os.environ.get("MY_API_KEY"))

    def list_models(self):
        return [{"id": "fast", "display": "Fast", "speed": "~30s",
                 "strengths": "Cheapest tier", "price": "$0.05/s",
                 "modalities": ["text", "image"]}]

    def default_model(self):
        return "fast"

    def capabilities(self):
        return {
            "modalities": ["text", "image"],
            "aspect_ratios": ["16:9", "9:16"],
            "resolutions": ["720p", "1080p"],
            "min_duration": 1,
            "max_duration": 10,
            "supports_audio": False,
            "supports_negative_prompt": True,
            "max_reference_images": 0,
        }

    def generate(self, prompt: str, *, model=None, image_url=None, reference_image_urls=None,
                 duration=None, aspect_ratio: str = "16:9", resolution: str = "720p",
                 negative_prompt=None, audio=None, seed=None, **kwargs):
        # ROUTE: image_url presence picks the endpoint.
        modality_used = "image" if image_url else "text"
        return success_response(
            video="https://your-cdn/output.mp4", model=model or "fast", prompt=prompt,
            modality=modality_used, aspect_ratio=aspect_ratio,
            duration=duration or 5, provider=self.name,
        )

def register(ctx) -> None:
    ctx.register_video_gen_provider(MyVideoGenProvider())
```

```yaml
name: my-backend
version: 1.0.0
description: "My video generation backend"
author: Your Name
kind: backend
requires_env:
  - MY_API_KEY
```

## Options / Props

`video_generate` tool schema (providers ignore parameters they do not support):

| Parameter | What it does |
|-----------|--------------|
| `prompt` | Text instruction (required) |
| `image_url` | Set = image-to-video; omitted = text-to-video |
| `reference_image_urls` | Style/character references (provider-dependent) |
| `duration` | Seconds; provider clamps |
| `aspect_ratio` | `"16:9"`, `"9:16"`, `"1:1"`, ...; provider clamps |
| `resolution` | `"480p"` / `"540p"` / `"720p"` / `"1080p"`; provider clamps |
| `negative_prompt` | Content to avoid (Pixverse/Kling only) |
| `audio` | Native audio (Veo3 / Pixverse pricing tier) |
| `seed` | Reproducibility |

Response keys: success (`success`, `video` URL or absolute path, `model`, `prompt`, `modality` `"text"` / `"image"`, `aspect_ratio`, `duration`, `provider`, `extra`); error (`success`, `video` None, `error`, `error_type`, `model`, `prompt`, `aspect_ratio`, `provider`). Artifact helpers: `save_b64_video()` (writes under `$HERMES_HOME/cache/videos/`), `save_bytes_video()`.

## Notes

- Discovery: bundled `plugins/video_gen/<name>/`, user `~/.hermes/plugins/video_gen/<name>/` (opt-in via `plugins.enabled`), pip entry point `hermes_agent.plugins`. Active provider: `video_gen.provider`; `hermes tools` > Video Generation. No in-tree legacy backend.
- One tool, two modalities; edit and extend are intentionally out of scope.
- There is deliberately no `model` tool parameter: backend and model are user configuration. `generate()` still receives `model=` (the configured model). Model precedence: `<PROVIDER>_VIDEO_MODEL` env var, `video_gen.<provider>.model`, `video_gen.model` (when one of your IDs), `default_model()`.
- Always accept and ignore unknown `**kwargs` for forward compatibility. Use `success_response()` / `error_response()`; do not hand-roll the dict.
- Model families (FAL pattern): one catalog entry per family; pick `text_endpoint` vs `image_endpoint` inside `generate()` depending on `image_url`.
- The agent sees the active backend's `capabilities()` in the tool description, rebuilt when the user changes backend.
- Add a smoke test under `tests/plugins/video_gen/test_<name>_plugin.py` (xAI and FAL tests show the pattern).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/video-gen-provider-plugin (pinned to v0.22.2)

## Related

- [Image Generation Provider Plugins](./image-gen-provider-plugin.md)
- [Build a Hermes Plugin](./plugins.md)
