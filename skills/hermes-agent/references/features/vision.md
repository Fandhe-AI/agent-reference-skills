# Vision

Multimodal vision: attach images (clipboard paste, gateway photos) and the agent analyzes them with any vision-capable model. Images are sent as base64 content blocks; the `vision_analyze` tool handles URLs and files.

## Signature / Usage

```text
/paste              # explicit image-attach fallback (most reliable)
/terminal-setup     # VS Code / Cursor / Windsurf (local macOS) keybindings
```

```yaml
agent:
  image_input_mode: auto      # auto (default) | native | text
vision:
  embed_target_bytes: 262144  # per-embed byte budget; clamped 64 KiB..4 MiB
  max_calls_per_image: 3      # unset = 3 in delegated subagents, unlimited for the main agent; 0 = unlimited
```

## Options / Props

| Name | Value | Description |
|---|---|---|
| `agent.image_input_mode` | `auto` | Native pixels when the model reports vision support, `vision_analyze` description otherwise; an explicit `auxiliary.vision` backend also selects the description path |
| | `native` | Always attach pixels |
| | `text` | Always route through the `vision_analyze` describer |
| `vision.embed_target_bytes` | int | Larger images (or wider than 1568 px) are downscaled to a JPEG that fits; default 256 KB |
| `vision.max_calls_per_image` | int | How often the same image (region crops included) may be embedded per session |

## Platform compatibility

| Environment | Requirement |
|---|---|
| macOS | None (`osascript`); optional `brew install pngpaste` |
| Linux X11 | `xclip` |
| Linux Wayland | `wl-clipboard` (`wl-paste`) |
| WSL2 | `powershell.exe` (built in); WSLg BMP converted to PNG via Pillow or ImageMagick |
| SSH sessions | Clipboard images unavailable; upload the file, paste a URL, use `ssh -X`, or send via a messaging platform |

## Notes

- Attached images show as `[📎 Image #1]` badges; `Ctrl+C` clears them. Images are saved as PNG under `~/.hermes/images/`.
- Paste is layered: text paste, then native clipboard / OSC52 fallback, then image attach for image payloads or paths (macOS screenshot temp paths and `file://` URIs attach immediately). An image-only clipboard needs `/paste`, since terminals cannot send binary image bytes.
- Wire format is the OpenAI vision content shape: `{"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}`.
- Routing: vision-capable models receive real pixels; text-only models get a description from the auxiliary vision model (`auxiliary.vision`). Browser screenshots, `computer_use` captures and MCP image results follow the same decision; `agent.image_input_mode: text` keeps pixels out of all of them.
- `vision_analyze` returns raw pixels as a multimodal tool result when the main model is vision-capable and the provider supports images in tool results (Anthropic, OpenAI, Azure-OpenAI, Gemini 3.x); an image already attached natively is not re-embedded.
- Responses-style backends (e.g. `openai-codex`) accept only inline JPEG, PNG, GIF and WebP; inline SVG is rasterized (`cairosvg`, `svglib`+`reportlab`, `rsvg-convert` or `inkscape`) or replaced by a text placeholder.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/vision (pinned to v0.22.2)

## Related

- [Image Generation](./image-generation.md)
- [Document Extraction](./document-extraction.md)
- [Computer Use](./computer-use.md)
