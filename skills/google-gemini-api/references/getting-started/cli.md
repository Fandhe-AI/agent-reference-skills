---
source: https://aistudio.google.com/docs/cli
---

# Gemini API CLI

The Gemini API CLI (`gemini-api`, open-source beta) is a stateless, zero-dependency command-line client built for AI agents with shell access, scripts, and CI pipelines. Every feature runs as a standard shell command on the Interactions API: generate text and media, analyze files, and delegate tasks to Gemini managed agents. It works with Antigravity, Claude Code, Cursor, and any standard shell environment.

## Signature / Usage

Official quick example (install, set the API key, then generate media, analyze a file, or launch a background managed agent):

```bash
# 1. Install on macOS or Linux
curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash

# 2. Set your API key
export GEMINI_API_KEY="YOUR_API_KEY"

# 3. Generate media, analyze a file, or launch a background managed agent
gemini-api image "Minimalist isometric icon of a cloud database" --out ./assets/db-icon.jpg
gemini-api analyze -i ./docs/quarterly-report.pdf "Summarize the key findings in three bullets."
gemini-api agent run "Compare WebRTC SFU architectures and cite sources" \
  --agent deep-research-preview-04-2026 \
  --background \
  --stream=false
```

Adapted (not in the official docs): download, inspect, then run (instead of piping the remote script straight into a shell).

```bash
# 1. Download the installer, inspect it, then run it
curl -fsSL -o install.sh https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh
less install.sh
bash install.sh

# 2. Set your API key
export GEMINI_API_KEY="YOUR_API_KEY"
```

With `-o json`, media commands still write the file to disk and print metadata to `stdout`:

```json
{
  "kind": "image",
  "mime_type": "image/jpeg",
  "path": "/path/to/project/assets/db-icon.jpg",
  "response_id": "v1_...",
  "size_bytes": 2914159,
  "status": "completed"
}
```

### Install the binary

macOS and Linux (official):

```bash
curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash
```

To install a specific release, set `GEMINI_VERSION` to a release tag (official):

```bash
curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | GEMINI_VERSION=<release-tag> bash
```

Adapted (not in the official docs): download, inspect, then run, including the pinned release variant.

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh
less install.sh
GEMINI_VERSION=<release-tag> bash install.sh
```

Windows (PowerShell, official):

```bash
iwr -useb https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.ps1 | iex
```

Adapted (not in the official docs): download, inspect, then run (PowerShell).

```powershell
iwr -useb https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.ps1 -OutFile install.ps1
Get-Content install.ps1
.\install.ps1
```

Go:

```bash
go install github.com/google-gemini/gemini-api-cli/cmd/gemini-api@latest
```

Prebuilt binaries: download versioned archives for macOS, Linux, and Windows from GitHub Releases (https://github.com/google-gemini/gemini-api-cli/releases) and place `gemini-api` on your `PATH`. Use prebuilt archives to pin exact versions in Docker images and CI.

### Configure authentication and verify

Create an API key in Google AI Studio and set `GEMINI_API_KEY` in your shell and your agent's subprocess environment:

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

On a local workstation, you can save the key in your OS keychain (macOS Keychain, Linux Secret Service, or Windows Credential Manager). Pass `--no-keyring` to store the key in `~/.config/gemini-api/config.yaml` instead:

```bash
# Save to your OS keychain (or run gemini-api configure --interactive)
gemini-api configure --api-key "YOUR_API_KEY"

# Check the active credential source, then preview a request offline
gemini-api whoami
gemini-api generate "Confirm CLI setup in one sentence." --dry-run
```

### Give your agent instructions

Add this snippet to your project's `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, or system prompt so your coding agent knows how to use `gemini-api`:

```markdown
### Gemini API CLI (`gemini-api`)

You have access to `gemini-api` through the shell. Use it to generate text or media (images, speech, music, video), analyze documents and recordings, or run and manage Gemini managed agents.

1. Run `gemini-api --help` or `gemini-api --usage` to choose a command, and `gemini-api <command> --schema` before building a `--body` JSON payload.
2. Preview unfamiliar or complex calls offline with `--dry-run -o json`.
3. For a single JSON result or `--jq` filtering on `generate` or `agent run`, pass `--stream=false -o json`.
4. To chain multi-step workflows, capture the output paths that media and transcription commands print to stdout, and the `id` values returned by `generate` or `agent run`.
```

### Workflows

Each command defaults to a model suited for its task. Pass `--model` (`-m`) to pick a different model. Run `gemini-api models` to list available options.

Image generation and editing (pass a generated path back in with `-i` to edit; pass `-i` multiple times to combine reference images):

```bash
# Generate a 16:9 image at 2K resolution (512, 1K, 2K, or 4K) and capture its path
HERO_PATH=$(gemini-api image "Friendly robot mascot in a sunlit workshop, space on left for headline" \
  --aspect-ratio 16:9 \
  --image-size 2K \
  --out ./public/images/hero.jpg)

# Edit the generated image
gemini-api image "Add a winter scarf and soft snowfall outside the window" \
  -i "$HERO_PATH" \
  --out ./public/images/hero-winter.jpg
```

Speech synthesis (`tts` writes 24 kHz WAV; default voice `Kore`; choose another with `--voice`; label each turn and map speakers to voices for two-speaker dialogue):

```bash
gemini-api tts "Build succeeded. All integration tests passed." \
  --voice Aoede \
  --out ./public/audio/build-ok.wav

gemini-api tts "Alice: Welcome to the release walkthrough! Bob: Let's look at what shipped today." \
  --multi-speaker "Alice=Kore,Bob=Puck" \
  --out ./public/audio/release-intro.wav
```

Music and video (`video` waits for generation to finish by default; `--async` returns an interaction ID immediately, then run `gemini-api video --resume <id> --out <path>`; pass `-i` to animate an existing image):

```bash
gemini-api music "Warm ambient synth and acoustic guitar background loop, 95 BPM" \
  --out ./public/audio/bg-loop.mp3

gemini-api video "A drone shot of a mountain landscape at sunrise." \
  --aspect-ratio 16:9 \
  --resolution 1080p \
  --out ./public/video/mountain-sunrise.mp4
```

Text generation (`generate` streams text to `stdout`; add `--stdin` to pipe text into the prompt; `--previous-interaction-id` continues an earlier interaction):

```bash
gemini-api generate "Write a one-paragraph welcome message for new users of a note-taking app."
```

Document analysis and transcription (`analyze` accepts PDFs, spreadsheets, screenshots, audio and video files, and public YouTube URLs; `transcribe` writes `md`, `text`, `json`, or `srt`):

```bash
gemini-api analyze -i ./docs/product-brief.pdf "List the open questions and who owns each one." > open-questions.md

gemini-api transcribe -i ./fixtures/customer-call.mp4 --format srt --out ./fixtures/customer-call.srt
```

Local files are sent inline up to 14 MB (20 MB after base64 encoding). For larger files, upload once with `files upload --wait` and reuse the returned `files/<id>` URI:

```bash
FILE_URI=$(gemini-api files upload ./recordings/all-hands.mp4 --wait)

gemini-api analyze -i "$FILE_URI" "List action items with owners and timestamps."
gemini-api transcribe -i "$FILE_URI" --format json --out ./recordings/all-hands.json
```

Run and manage managed agents (`--background --stream=false` returns an interaction ID immediately):

```bash
# Launch a Deep Research job in the background and capture its interaction ID
RESEARCH_ID=$(gemini-api agent run "Compare open-source vector index benchmarks and cite primary papers." \
  --agent deep-research-preview-04-2026 \
  --background \
  --stream=false \
  --jq '.id')

# Check status or fetch the finished result while continuing other work
gemini-api agent status "$RESEARCH_ID" -o json
```

Run `gemini-api agent cancel <id>` to stop a running job. You can also launch the Antigravity agent in a remote sandbox with `agent run`, or manage custom agents with `agent create`, `list`, `get`, and `delete`.

### Custom request bodies

For options without dedicated flags, pass a raw Interactions API JSON payload with `--body` (inline or as `@file.json`), for example to set `response_format` schemas, function-calling tools, `generation_config`, or `"store": false`. Run `gemini-api <command> --schema` first to check valid fields:

```bash
# Inspect the JSON Schema for the request body
gemini-api generate --schema > generate-schema.json

# Return schema-constrained JSON and skip storing the interaction
cat logs.txt | gemini-api generate "Extract every error message from these logs." \
  --stdin \
  --body '{
    "response_format": {
      "type": "text",
      "mime_type": "application/json",
      "schema": {
        "type": "object",
        "properties": {"errors": {"type": "array", "items": {"type": "string"}}},
        "required": ["errors"]
      }
    },
    "store": false
  }'
```

`--body` merges with command flags. If both set the same key, the command fails with exit code `2`.

## Options / Props

Commands (run `gemini-api --help` to list all, or `gemini-api explore` to browse interactively):

| Group | Command | What it does |
| :--- | :--- | :--- |
| Create | `image` | Generates or edits images (`-i`), writes a JPEG file, and prints its path. |
| Create | `tts` | Synthesizes 24 kHz mono WAV speech (one or two speakers) and prints the output path. |
| Create | `music` | Generates music tracks or loops, writes the audio file, and prints its path. |
| Create | `video` | Generates or edits MP4 clips and waits until done (`--async` returns an ID immediately). |
| Create | `generate` | Generates text and streams it to `stdout` (`--stream=false` returns one complete result). |
| Understand | `analyze` | Answers questions about PDFs, images, audio, video, CSV and text files, or public YouTube URLs. |
| Understand | `transcribe` | Writes speaker-labeled, timestamped transcripts (`md`, `text`, `json`, or `srt`) and prints the output paths. |
| Manage agents | `agent` | Runs managed agents (`run`, `status`, `cancel`, `delete-interaction`) and manages custom agent definitions (`create`, `list`, `get`, `delete`). |
| Manage agents | `environments`, `credentials`, `webhooks`, `triggers` | Configures sandbox environments, stored credentials, webhook delivery, and scheduled runs for managed agents. |
| Setup and files | `configure`, `auth`, `whoami` | Configures credentials and defaults, and shows the active auth state. |
| Setup and files | `files` | Uploads, lists, inspects, and deletes files in the Files API. |
| Setup and files | `models` | Lists available models. |

Design choices that keep the CLI reliable for agents:

- Offline schema lookup: `--usage` prints the command tree (in KDL), `--schema` prints the JSON Schema for `--body` requests.
- Files on disk, paths on `stdout`: media and transcription commands write files to disk and print only the output path.
- Dry runs and structured output: `--dry-run` validates inputs, redacts credentials, and previews the HTTP request offline. `-o json`, `-o toon`, or `--jq` give machine-readable output. `--agent-mode` returns structured JSON errors on `stderr`. Commands never prompt unless you pass `--interactive`.
- Stateless by default: chain multi-step work explicitly with `--previous-interaction-id`, an uploaded `files/<id>` URI, or a background interaction ID.

Exit codes:

| Code | Meaning |
| :--- | :--- |
| `0` | The command succeeded. |
| `1` | Runtime or API error, such as a network failure, rate limit, or failed background job. |
| `2` | Usage or validation error, such as an unknown flag, missing input, or duplicate `--body` key. |
| `3` | Authentication or authorization failure, such as a missing or invalid API key or token. |

Run `gemini-api --help-global` to list global flags shared by every command (authentication, output, network, and diagnostics).

Choosing a Gemini tool:

| Tool | What it does | When to use it |
| :--- | :--- | :--- |
| Gemini API CLI (`gemini-api`) | Calls Gemini models and managed agents from any shell. | Your coding agent, shell script, or CI job needs to generate media, analyze files, or run a background research agent with zero project dependencies. |
| Google GenAI SDKs | Imports Gemini client libraries into Python, TypeScript, JavaScript, Go, Java, or C# code. | You are building Gemini features into your application, backend service, or real-time Live API session. |
| Gemini Docs MCP and skills | Gives coding agents live documentation search and current SDK rules. | Your coding agent is writing application code that imports a Google GenAI SDK. |

## Notes

- `gemini-api` is an open-source beta release that evolves alongside the Interactions API. Breaking changes can occur between minor versions. Pin a specific release version (https://github.com/google-gemini/gemini-api-cli/releases) in automated agent environments and CI pipelines.
- `gemini-api` is a stateless API client, not an interactive coding agent like `@google/gemini-cli`. You can run `gemini-api` inside any coding agent. It is also distinct from Claude Code, the Claude API CLI `ant`, and OpenAI Codex CLI (see anthropic-claude-code, anthropic-models-sdks, openai-codex).
- Treat `GEMINI_API_KEY` as a secret. In CI, inject the key from your secret store instead of committing it to a repository or build file.
- The official install one-liners pipe a script from the `main` branch of the `google-gemini/gemini-api-cli` repository into a shell (`| bash`, `| iex`). Prefer the download, inspect, then run forms above, and pin a release with `GEMINI_VERSION` or prebuilt archives.
- Limitations: streaming commands (`generate` and `agent run`) require `--stream=false` when combined with `-o json` or `--jq` to return a single JSON response object; inline `-i` file inputs cap at 14 MB of raw file data (20 MB request payload including base64 encoding), and the Files API deletes uploaded files after 48 hours; `gemini-api` supports standard HTTP requests, SSE streaming, and async polling, not bidirectional WebSockets (use the Live API with the Google GenAI SDKs for real-time voice and video streaming).
- Released October 27, 2026 as "Gemini API CLI (`gemini-api`) beta" (release notes).
- Source: https://aistudio.google.com/docs/cli (fetched 2026-11-14)
- Source: https://aistudio.google.com/docs/changelog (fetched 2026-11-14)

## Related

- [coding-agents.md](./coding-agents.md)
- [interactions-overview.md](./interactions-overview.md)
- [libraries.md](./libraries.md)
