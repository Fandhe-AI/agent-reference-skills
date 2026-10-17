# Features

| Name | Description | Path |
|------|-------------|------|
| Bot Screen | On a headless Linux gateway host each bot gets its own Xfce desktop that its `computer_use` and headed browser act on, streamed live into Hermes Desktop. | [bot-screen.md](./bot-screen.md) |
| Browser | Browser automation toolset with multiple backends: Browser Use cloud, Browserbase, Firecrawl, Camofox, Lightpanda, local Chromium-family via CDP, and local Chromium through `agent-browser`. | [browser.md](./browser.md) |
| Built-in Plugins | Plugins bundled in the Hermes repository under `<repo>/plugins/<name>/`. | [built-in-plugins.md](./built-in-plugins.md) |
| Codex App-Server Runtime (optional) | Opt-in runtime that hands `openai/*`, `openai-codex/*` and named custom provider turns to the Codex CLI app-server. | [codex-app-server-runtime.md](./codex-app-server-runtime.md) |
| Computer Use | Hermes can drive the desktop (click, type, scroll, drag) in the background on macOS, Windows and Linux without moving your cursor or changing focus. | [computer-use.md](./computer-use.md) |
| Context Files | Hermes recognises several context file types. Only one project context type loads per session (first-match priority). | [context-files.md](./context-files.md) |
| Context References | Type `@` followed by a reference to inject content into a message. | [context-references.md](./context-references.md) |
| Passwords & Logins | The agent signs into sites, pays and fills addresses without ever seeing a password. | [credential-vault.md](./credential-vault.md) |
| Curator | Background maintenance pass for agent-created skills. | [curator.md](./curator.md) |
| Deliverable Mode (Artifacts in Chat) | In a messaging gateway (Slack, Discord, Telegram, WhatsApp, Signal, etc.), generated files are delivered as native attachments. | [deliverable-mode.md](./deliverable-mode.md) |
| Document Extraction | The `read_file` tool automatically converts common document formats to readable Markdown text so the agent can inspect PDFs and spreadsheets like source code. | [document-extraction.md](./document-extraction.md) |
| Extending the Dashboard | Themes, UI plugins, and backend plugins for the web dashboard (`hermes dashboard`). | [extending-the-dashboard.md](./extending-the-dashboard.md) |
| Image Generation | Hermes generates images from text prompts via FAL.ai (eleven models) and other backends. | [image-generation.md](./image-generation.md) |
| Language Packs | Hermes ships 17 UI languages (`display.language`). | [language-packs.md](./language-packs.md) |
| LSP — Semantic Diagnostics | Hermes runs real language servers (pyright, gopls, rust-analyzer, typescript-language-server, clangd and more) as background subprocesses and feeds their semantic diagnostics into the post-write check used by `write_file` and `patch`. | [lsp.md](./lsp.md) |
| MCP (Model Context Protocol) | MCP lets Hermes connect to external tool servers — GitHub, databases, file systems, APIs — without requiring native integrations. | [mcp.md](./mcp.md) |
| Memory Providers | External memory provider plugins that give the agent persistent cross-session knowledge beyond built-in MEMORY.md and USER.md. | [memory-providers.md](./memory-providers.md) |
| Memory | Hermes provides a two-file persistent memory system (`MEMORY.md` and `USER.md`) that injects into every session, plus a full-text session search index and optional external provider plugins. | [memory.md](./memory.md) |
| Mixture of Agents | Virtual model provider `moa`. Each named MoA preset appears as a selectable model. | [mixture-of-agents.md](./mixture-of-agents.md) |
| Features Overview | Hermes Agent includes capabilities that extend beyond basic chat: persistent memory, file-aware context, browser automation, voice, and more. | [overview.md](./overview.md) |
| Personality | Hermes uses a three-layer personality system. `SOUL.md` sets the persistent baseline identity; `AGENTS.md` provides project-specific context; `/personality` applies temporary session overlays. | [personality.md](./personality.md) |
| Pets (Petdex Mascots) | An animated mascot sprite that reacts to agent activity across the CLI, TUI and desktop app. | [pets.md](./pets.md) |
| Plugin Catalog | A curated, human-reviewed directory of Hermes plugins installable by name. | [plugin-catalog.md](./plugin-catalog.md) |
| Plugins | Hermes plugin system for adding custom tools, hooks, slash commands and integrations without modifying core code. | [plugins.md](./plugins.md) |
| Skills | Skills are on-demand knowledge documents following the agentskills.io open standard. | [skills.md](./skills.md) |
| Skins & Themes | Skins control the visual presentation of the Hermes CLI: banner colors, spinner faces and verbs, response-box labels, branding text and the tool activity prefix. | [skins.md](./skins.md) |
| Spotify | Control Spotify (playback, queue, search, playlists, saved tracks/albums, listening history) through the official `spotify` plugin from the plugin catalog. | [spotify.md](./spotify.md) |
| Subscription Proxy | A local HTTP server that lets external OpenAI-compatible apps (OpenViking, Karakeep, Open WebUI, and others) use your Hermes-managed provider subscription (Nous Portal or xAI) as their LLM endpoint. | [subscription-proxy.md](./subscription-proxy.md) |
| Nous Tool Gateway | Included with every paid Nous Portal subscription, the Tool Gateway routes Hermes tool calls (web search and extract, image generation, text-to-speech, cloud browser automation) through infrastructure Nous runs, so no separate vendor accounts or keys are needed. | [tool-gateway.md](./tool-gateway.md) |
| Tool Search | Progressive-disclosure layer, active by default (`tools.tool_search.enabled: auto`, currently an alias of `on`) whenever at least one deferred tool exists: MCP and plugin tools (and explicitly named cold built-ins) are replaced in the model-visible tools array by three bridge tools, and the model loads each tool's schema on demand. | [tool-search.md](./tool-search.md) |
| Tools & Toolsets | Hermes organizes its capabilities into eight tool categories and exposes them through named toolsets. | [tools.md](./tools.md) |
| Text-to-Speech | Text-to-speech output and voice message transcription (STT) across all messaging platforms, with eleven TTS providers, custom command providers and Python plugin providers. | [tts.md](./tts.md) |
| Vision | Multimodal vision: attach images (clipboard paste, gateway photos) and the agent analyzes them with any vision-capable model. | [vision.md](./vision.md) |
| Voice Mode | Hermes supports hands-free voice interaction in the CLI and through gateway platforms (Telegram, Discord). | [voice-mode.md](./voice-mode.md) |
| Wake Word | Hands-free "Hey Hermes" trigger for the CLI, TUI and desktop app. | [wake-word.md](./wake-word.md) |
| Hermes Web Dashboard | Browser-based administration panel (`hermes dashboard`) for configuration, API keys, MCP servers, messaging pairing and channels, webhooks, the gateway, memory, credentials, sessions, logs, analytics, cron jobs and skills. | [web-dashboard.md](./web-dashboard.md) |
| Web Search & Extract | Two model-callable web tools backed by multiple providers: `web_search` (ranked results) and `web_extract` (readable content from URLs). | [web-search.md](./web-search.md) |
| X (Twitter) Search | The `x_search` tool searches X posts, profiles and threads using xAI's built-in `x_search` Responses tool at `https://api.x.ai/v1/responses`. | [x-search.md](./x-search.md) |
