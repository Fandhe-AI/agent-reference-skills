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
  replay_recent_images: 3     # default; 0 = never re-send earlier images in rebuilt follow-up turns
```

## Options / Props

| Name | Value | Description |
|---|---|---|
| `agent.image_input_mode` | `auto` | Native pixels when the model reports vision support, `vision_analyze` description otherwise; an explicit `auxiliary.vision` backend also selects the description path |
| | `native` | Always attach pixels |
| | `text` | Always route through the `vision_analyze` describer |
| `vision.embed_target_bytes` | int | Larger images (or wider than 1568 px) are downscaled to a JPEG that fits; default 256 KB |
| `vision.max_calls_per_image` | int | How often the same image (region crops included) may be embedded per session |
| `vision.replay_recent_images` | int | Default `3`; how many recent images are re-sent natively when a turn's history is rebuilt from the session database. `0` = never re-send; a value that is not a non-negative integer logs a warning and disables replay |

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
- Images in follow-up turns (`vision.replay_recent_images`, new in v0.23): the session database stores user messages as text with one `[screenshot]` line per image, so a turn rebuilt from it (API server requests continuing a session with `X-Hermes-Session-Id`, `hermes chat --resume`, a gateway restart) used to show only the placeholder. With a native-vision model, Hermes now re-sends the most recent images in their original message. Bytes come from the copy kept under `cache/documents/native-inputs/` in the profile; nothing new is stored and the database / session messages API stay text only.
- Replay is byte-identical to the original request, so the provider prompt cache stays valid. Older images leave the window in batches: with the default 3, the newest 3 to 5 images are re-sent, and every third new image drops the oldest batch at once; an image that left the window does not come back.
- Replay reaches only images whose kept copy still exists. On the gateway, the kept copy of an image attached in chat is removed once older than the media-cache age (24 hours), so a follow-up more than a day later sees `[screenshot]` again (this can also happen mid-session, changing the request once). Images sent to the API server stay with the API request record and are not removed by that cleanup. Images outside the window, remote-URL images (they can expire) and missing or changed files keep the `[screenshot]` text. With `agent.image_input_mode: text` or a model without native vision, nothing is re-sent.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/vision (pinned to v0.23.1)

## Related

- [Image Generation](./image-generation.md)
- [Document Extraction](./document-extraction.md)
- [Computer Use](./computer-use.md)
