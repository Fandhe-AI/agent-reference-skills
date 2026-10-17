# Integrations Overview

Hermes Agent connects to external systems for AI inference, tool servers, IDE workflows, programmatic access, and more. These integrations extend what Hermes can do and where it can run.

## Signature / Usage

```yaml
web:
  backend: firecrawl    # firecrawl | searxng | brave-free | ddgs | tavily | perplexity | keenable | exa | parallel | xai
```

If `web.backend` is not set, the backend is auto-detected from whichever API key is available. Self-hosted Firecrawl is also supported via `FIRECRAWL_API_URL`.

## Integration Areas

| Area | What it covers |
|------|----------------|
| AI Providers & Routing | OpenRouter, Anthropic, OpenAI, Google, any OpenAI-compatible endpoint. Provider Routing (OpenRouter sub-provider control) and Fallback Providers (automatic failover, primary and auxiliary) |
| Tool Servers (MCP) | Connect external tool servers via Model Context Protocol; stdio and SSE transports, per-server tool filtering |
| Web Search Backends | `web_search` / `web_extract` backends configured via `config.yaml` or `hermes tools` |
| Browser Automation | Browser Use Cloud, Browserbase, local Chromium-family CDP (`/browser connect`), local Chromium via the `agent-browser` CLI |
| Voice & TTS | Text-to-speech and speech-to-text across all messaging platforms |
| IDE & Editor | ACP server for VS Code, Zed, JetBrains |
| Programmatic Access | OpenAI-compatible API Server (Open WebUI, LobeChat, LibreChat, NextChat, ChatBox) |
| Memory & Personalization | Built-in `MEMORY.md` / `USER.md`; external Memory Providers (RetainDB and ByteRover ship with Hermes; Honcho, Hindsight, Supermemory, Mem0, OpenViking, Holographic via `hermes plugins install <name>`) |
| Messaging Platforms | Gateway bot on 27+ platforms (Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Buzz, ...) |
| Collaboration Workspaces | Buzz (Block's Nostr-based human+agent workspace), three integration paths |
| Home Automation | Home Assistant via `ha_list_entities`, `ha_get_state`, `ha_list_services`, `ha_call_service`; catalog plugin `homeassistant` (`hermes plugins install homeassistant`), activates when `HASS_TOKEN` is configured |
| Plugins | Custom tools, lifecycle hooks, CLI commands; discovered from `~/.hermes/plugins/`, project-local `.hermes/plugins/`, and pip-installed entry points |
| Training & Evaluation | Batch Processing: run the agent across hundreds of prompts in parallel, producing ShareGPT-format trajectory data |

## Web Search Backends

| Backend | Env Var | Search | Extract | Crawl |
|---------|---------|--------|---------|-------|
| **Firecrawl** (default) | `FIRECRAWL_API_KEY` | yes | yes | yes |
| **SearXNG** | `SEARXNG_URL` | yes | - | - |
| **Brave** (free tier) | `BRAVE_SEARCH_API_KEY` | yes | - | - |
| **DuckDuckGo** (ddgs) | (none) | yes | - | - |
| **Exa** | `EXA_API_KEY` | yes | yes | - |
| **Parallel** | `PARALLEL_API_KEY` | yes | yes | - |
| **xAI** | `XAI_API_KEY` | yes | - | - |

## Voice & TTS Providers

| Provider | Quality | Cost | API Key |
|----------|---------|------|---------|
| **Edge TTS** (default) | Good | Free | None needed |
| **ElevenLabs** | Excellent | Paid | `ELEVENLABS_API_KEY` |
| **OpenAI TTS** | Good | Paid | `VOICE_TOOLS_OPENAI_KEY` |
| **MiniMax** | Good | Paid | `MINIMAX_API_KEY` |
| **xAI TTS** | Good | Paid | `XAI_API_KEY` |
| **NeuTTS** | Good | Free | None needed |

Speech-to-text supports eight providers: local faster-whisper (free, on-device), a local command wrapper, Groq, OpenAI Whisper API, Mistral, xAI, ElevenLabs Scribe, and DeepInfra.

## Quick connect links

| Platform | Direct link | What it opens |
|----------|-------------|---------------|
| Telegram | `t.me/BotFather` | Chat with BotFather; send `/newbot` to mint a bot token |
| Discord | `discord.com/developers/applications?new_application=true` | Developer Portal with the New Application dialog pre-opened |
| Slack | `api.slack.com/apps?new_app=1` | Create New App dialog; pick "From an app manifest" and paste the manifest `hermes slack manifest --agent-view` generates |
| LINE | `developers.line.biz/console` | LINE Developers Console for creating a Messaging API channel |
| Feishu/Lark | `open.feishu.cn/app` | Feishu open-platform console for creating a custom app |

## Notes

- The page recommends Nous Portal first: a single OAuth login covers 300+ models plus the four Tool Gateway tools (web search, image generation, TTS, browser automation).
- The Web Search table lists seven backends while the prose says eight; the `config.yaml` comment enumerates `firecrawl | searxng | brave-free | ddgs | tavily | perplexity | keenable | exa | parallel | xai`. Treat the comment line as the accepted values.
- Messaging platforms listed: Telegram, Discord, Slack, WhatsApp, Signal, Matrix, Mattermost, Email, SMS, DingTalk, Feishu/Lark, WeCom, WeCom Callback, Weixin, BlueBubbles, Buzz, QQ Bot, Yuanbao, Home Assistant (plugin), Microsoft Teams, Microsoft Teams Meetings, Microsoft Graph Webhook, Google Chat, LINE, ntfy, SimpleX, Open WebUI, Webhooks.

## Related

- [Providers](./providers.md)
- [Provider Routing](./provider-routing.md)
- [Fallback Providers](./fallback-providers.md)
- [Credential Pools](./credential-pools.md)
- [ACP](./acp.md)
- [API Server](./api-server.md)
- [Honcho](./honcho.md)
- [Buzz](./buzz.md)
