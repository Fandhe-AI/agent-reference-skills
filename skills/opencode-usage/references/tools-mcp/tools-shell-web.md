---
source: https://opencode.ai/docs/tools/#commands
---

# Tools: Shell, Web, and Image Generation

Command execution (`shell`), web access (`webfetch`, `websearch`), and experimental image generation.

## Signature / Usage

### Shell

`shell` executes a command in the host user's shell. Set `workdir` instead of putting `cd` in the command, and set `timeout` in milliseconds when the default two-minute foreground timeout is not suitable.

```text
Run bun test from packages/core with a five-minute timeout.
```

Set `background` to true for a dev server or another long-running process. Background calls return immediately and notify the session when they finish; they have no timeout unless one is supplied. Large output is shortened and the complete output is retained in a managed file.

Permission: `shell` with each scanner-produced command as a resource. The scanner also checks an external working directory and directories it can infer from the command. Shell has the host user's filesystem, process, and network authority, so use narrow rules in [Permissions](https://opencode.ai/docs/permissions/).

### Webfetch

`webfetch` retrieves one HTTP or HTTPS URL as `markdown`, `text`, or `html`. Markdown is the default; `timeout` accepts up to 120 seconds.

```text
Fetch https://example.com/docs as markdown.
```

It accepts textual responses such as HTML, plain text, JSON, and XML, but not images or other binary downloads. Large output can be shortened while the full text is retained in managed storage. Permission: `webfetch` with the requested URL as its resource.

### Websearch

`websearch` searches the selected integration for current information. Its input is a search `query`.

```text
Search the web for the latest Bun release notes.
```

Permission: `websearch` with the query as its resource. See [Web search](https://opencode.ai/docs/websearch/) for providers, selection, rate limits, and disabling the tool.

### Image generate

`experimental_image_generate` creates a new image from a prompt, or edits existing ones. It is experimental and appears while a connected provider has an image model. To choose its default model, see [`experimental.image_generate`](https://opencode.ai/docs/config/#image-generation).

```text
Generate a flat app icon of a paper plane on a blue background and save it to assets/icon.png.
```

Give it a `prompt`, and optionally `images` to edit or use as references, a specific `model`, or a `path` to save to. It runs in the background and notifies the session with the saved path when the image is ready.

Permission: `experimental_image_generate` with the selected model as its resource.

## Options / Props

| Tool | Parameters | Permission resource |
|------|------------|---------------------|
| `shell` | command, `workdir`, `timeout` (ms), `background` | each scanner-produced command |
| `webfetch` | URL, format (`markdown` / `text` / `html`), `timeout` (up to 120 s) | requested URL |
| `websearch` | `query` | the query |
| `experimental_image_generate` | `prompt`, `images`, `model`, `path` | selected model |

## Notes

- `shell` has the host user's filesystem, process, and network authority. Use narrow permission rules and prefer a disposable environment for untrusted tasks.
- The `websearch` tool is configured in OpenCode (`websearch` config key); it is unrelated to OpenCode Console's web search (see opencode-console).

## Related

- [tools-overview.md](./tools-overview.md)
- [websearch.md](./websearch.md)
- [tools-files.md](./tools-files.md)
