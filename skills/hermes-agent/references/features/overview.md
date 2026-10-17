# Features Overview

Hermes Agent includes capabilities that extend beyond basic chat: persistent memory, file-aware context, browser automation, voice, and more.

## Signature / Usage

```bash
# One command: model provider + all four Tool Gateway tools (web search, image generation, TTS, browser)
hermes setup --portal
```

## Feature Map

| Group | Feature | Summary |
|-------|---------|---------|
| Core | Tools & Toolsets | Functions organized into toolsets enabled or disabled per platform |
| Core | Skills System | On-demand knowledge documents with progressive disclosure; compatible with the agentskills.io open standard |
| Core | Persistent Memory | Bounded, curated memory across sessions via `MEMORY.md` and `USER.md` |
| Core | Context Files | Auto-loads `.hermes.md`, `AGENTS.md`, `CLAUDE.md`, `SOUL.md`, `.cursorrules` |
| Core | Context References | `@` references inject files, folders, git diffs, and URLs into messages |
| Core | Checkpoints | Automatic snapshots of the working directory; roll back with `/rollback` |
| Automation | Scheduled Tasks (Cron) | Natural-language or cron-expression jobs; can attach skills and deliver to any platform |
| Automation | Subagent Delegation | `delegate_task` spawns child agents (3 concurrent by default, configurable) |
| Automation | Code Execution | `execute_code` runs Python scripts that call Hermes tools via sandboxed RPC |
| Automation | Event Hooks | Gateway hooks (logging, alerts, webhooks) and plugin hooks (interception, metrics, guardrails) |
| Automation | Batch Processing | Run across many prompts in parallel; ShareGPT-format trajectory output |
| Media & Web | Voice Mode | Voice interaction across CLI and messaging platforms |
| Media & Web | Wake Word | Hands-free "Hey Hermes" trigger for CLI, TUI, and desktop app |
| Media & Web | Browser Automation | Browserbase, Browser Use, local Chrome/Brave/Chromium/Edge via CDP, or local Chromium |
| Media & Web | Vision & Image Paste | Paste clipboard images into the CLI for any vision-capable model |
| Media & Web | Image Generation | FAL.ai text-to-image; eleven models, picked via `hermes tools` |
| Media & Web | Voice & TTS | Text-to-speech and voice transcription; ten native providers plus custom command providers |
| Integrations | MCP Integration | stdio or HTTP MCP servers, per-server tool filtering, sampling |
| Integrations | Provider Routing | Sorting, whitelists, blacklists, priority ordering |
| Integrations | Fallback Providers | Automatic failover, including independent fallback for auxiliary tasks |
| Integrations | Credential Pools | Distribute calls across multiple keys with rotation on rate limits |
| Integrations | Prompt caching | Built-in cross-session 1-hour prefix cache for Claude on native Anthropic, OpenRouter, and Nous Portal; always on |
| Integrations | Memory Providers | External memory backends beyond built-in memory |
| Integrations | API Server | OpenAI-compatible HTTP endpoint (Open WebUI, LobeChat, LibreChat) |
| Integrations | IDE Integration (ACP) | Use Hermes inside VS Code, Zed, JetBrains |
| Customization | Personality & SOUL.md | `SOUL.md` is the primary identity file; `/personality` presets |
| Customization | Skins & Themes | CLI banner colors, spinner faces and verbs, labels, branding |
| Customization | Plugins | General plugins, memory providers, context engines; managed via `hermes plugins` |

## Notes

- Image Generation lists eleven models: FLUX 2 Klein/Pro, GPT-Image 1.5/2, Nano Banana Pro, Ideogram V3, Recraft V4 Pro, Qwen, Z-Image Turbo, Krea V2 Medium/Large.
- TTS providers: Edge TTS (free), ElevenLabs, OpenAI TTS, MiniMax, Mistral Voxtral, Google Gemini, xAI, NeuTTS, KittenTTS, Piper.
- Memory providers named in the overview: RetainDB, ByteRover, plus Honcho, Hindsight, Supermemory, Mem0, OpenViking and Holographic from the plugin catalog.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/overview (pinned to v0.22.2)

## Related

- [Tools](./tools.md)
- [Skills](./skills.md)
- [Memory](./memory.md)
- [MCP](./mcp.md)
- [Voice Mode](./voice-mode.md)
