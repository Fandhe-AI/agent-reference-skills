# Image Generation

Hermes generates images from text prompts via FAL.ai (eleven models) and other backends. The active model is chosen with `hermes tools` and persists in `config.yaml`. The same `image_generate` tool also edits images when the model supports it.

## Signature / Usage

```bash
hermes tools   # Image Generation -> pick backend and model
```

```yaml
image_gen:
  provider: fal                 # `nous` if you picked Nous Subscription
  model: fal-ai/flux-2/klein/9b
  max_parallel_requests: 4      # concurrent images in one tool-call batch
```

## Supported FAL Models

| Model | Speed | Strengths | Price |
|---|---|---|---|
| `fal-ai/flux-2/klein/9b` (default) | `<1s` | Fast, crisp text | $0.006/MP |
| `fal-ai/flux-2-pro` | ~6s | Studio photorealism | $0.03/MP |
| `fal-ai/z-image/turbo` | ~2s | Bilingual EN/CN, 6B params | $0.005/MP |
| `fal-ai/nano-banana-pro` | ~8s | Gemini 3 Pro, reasoning depth, text rendering | $0.15/image (1K) |
| `fal-ai/gpt-image-1.5` | ~15s | Prompt adherence | $0.034/image |
| `fal-ai/gpt-image-2` | ~20s | SOTA text rendering + CJK, photorealism | $0.04-0.06/image |
| `fal-ai/ideogram/v3` | ~5s | Best typography | $0.03-0.09/image |
| `fal-ai/recraft/v4/pro/text-to-image` | ~8s | Design, brand systems | $0.25/image |
| `fal-ai/qwen-image` | ~12s | LLM-based, complex text | $0.02/MP |
| `fal-ai/krea/v2/medium/text-to-image` | ~15-25s | Illustration, anime, painting | $0.030-0.035/image |
| `fal-ai/krea/v2/large/text-to-image` | ~25-60s | Photorealism, raw textured looks | $0.060-0.065/image |

Prices are FAL's at time of writing; check fal.ai for current numbers.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `image_gen.provider` | string | Single selection key: `nous` (managed Tool Gateway) or a vendor (`fal`, `openai`, `xai`, `krea`, `openrouter`, `meta-ai`) with your own key |
| `image_gen.model` | string | Model id for the provider |
| `image_gen.max_parallel_requests` | int | Default 4; clamped to at least 1 and the global tool-worker limit |
| `image_gen.openai.model` | string | e.g. `gpt-image-2.5-flare`; append `-low`/`-medium`/`-high`/`-xhigh`/`-max` for fixed quality |
| `image_gen.openai.base_url` / `key_env` / `provider` | string | Custom OpenAI-compatible endpoint; `provider` reuses a named `providers:` entry |
| `image_gen.openrouter.resolution` / `quality` / `output_format` | string | Per-request knobs for Image API models |
| `FAL_KEY` | env | FAL credential; ignored while `provider: nous` |
| `FAL_IMAGE_MODEL` | env | Fallback model before the default |
| `IMAGE_TOOLS_DEBUG=true` | env | Debug logs in `./logs/image_tools_debug_<session_id>.json` |

Tool inputs: `image_url` (primary source image to edit), `reference_image_urls` (extra references), `upscale` (opt-in), aspect ratio `landscape` / `square` / `portrait`.

## Notes

- `provider: fal` without `FAL_KEY` errors rather than silently rerouting; change providers via `hermes tools`, not by adding or removing keys. The legacy `use_gateway` boolean is still read as `nous` when true but never written.
- Nous Subscription is the only managed row; its picker spans the FAL catalog, native Krea 2 (`krea-2-medium`, `krea-2-large`, `krea-2-medium-turbo`) and Nous Portal image models. Free tool-pool accounts see FAL models only.
- `gpt-image-1.5` and `gpt-image-2` quality is pinned to `medium`. GPT Image 2 maps to 4:3 presets because its minimum pixel count is 655,360.
- GPT Image 2.5 on FAL: `openai/gpt-image-2.5/flare/text-to-image` and `openai/gpt-image-2.5/sunburst/text-to-image` (edit endpoints chosen automatically, up to 16 source images). The OpenAI (Codex auth) provider does not offer 2.5; use the direct OpenAI API provider or FAL.
- Meta Model API: `image_gen.provider: meta-ai`, model `muse-image-1.0` (~10s, $0.01/image), key `MODEL_API_KEY` (aliases `META_API_KEY`, `META_MODEL_API_KEY`), base URL override `META_BASE_URL`; text-to-image only.
- OpenRouter lists its live Image API catalog (40+ ids) fetched from `GET /images/models` and `GET /models`.
- Editing backends: FAL edit-capable models (`flux-2/klein/9b`, `flux-2-pro`, `nano-banana-pro`, `gpt-image-1.5`, `gpt-image-2`, `ideogram/v3`, `qwen-image`, GPT Image 2.5), OpenAI (up to 16 references), xAI Grok Imagine (1 reference), Krea 2 (up to 10), OpenAI Codex auth (up to 16; backend treats quality and size as advisory), OpenRouter. Text-only FAL models (`z-image/turbo`, `recraft`, `krea/*`) reject image inputs.
- Upscaling is opt-in per call (`upscale: true`): FAL uses Clarity Upscaler (2x, +$0.03/MP; creativity 0.35, resemblance 0.6, guidance 4, steps 18), Krea uses Krea Enhance; other backends return native resolution. If upscaling fails the original is returned and `upscaled: false` is reported. `video_generate` on FAL can chain SeedVR2 (2x, $0.001/MP).
- Resolution of the FAL model: `image_gen.model`, then `FAL_IMAGE_MODEL`, then `fal-ai/flux-2/klein/9b`. Returned URLs are temporary; Hermes materializes them to the local cache and delivers via `MEDIA:<url>`.
- Token-billed image models (OpenRouter, OpenAI `gpt-image`) are recorded in `session_model_usage` as task `image_generation`; per-image backends are not.
- Delivery: CLI prints markdown `![](url)`; Telegram photo with caption; Discord embed; Slack unfurl; WhatsApp media; others plain URL.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/image-generation (pinned to v0.22.2)

## Related

- [Tool Gateway](./tool-gateway.md)
- [Vision](./vision.md)
- [Built-in Plugins](./built-in-plugins.md)
