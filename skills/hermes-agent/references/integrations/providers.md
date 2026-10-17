# Providers

LLM and model providers (upstream title: "LLM and Model Providers"): cloud APIs, self-hosted endpoints (Ollama, vLLM, SGLang, llama.cpp, LM Studio), gateways, and custom OpenAI-compatible endpoints. At least one provider must be configured.

## Signature / Usage

```bash
hermes model                       # full setup wizard (terminal, outside a session)
hermes chat --provider anthropic --model claude-sonnet-4-6
```

```yaml
model:
  provider: "anthropic"
  default: "claude-sonnet-4-6"      # `model:` is an accepted alias for `default:`
```

Inside a chat session, `/model` only switches among already-configured providers; adding a provider needs `hermes model`.

```
/model custom:qwen-2.5            # model on your custom endpoint
/model custom                     # auto-detect (queries /models; picks if exactly one loaded)
/model custom:local:qwen-2.5      # named custom provider "local" with model qwen-2.5
```

## Provider setup (provider id and credential)

| Provider | Setup |
|----------|-------|
| Nous Portal (`nous`) | `hermes model` (OAuth subscription); `hermes setup --portal` on fresh install |
| OpenAI Codex (`openai-codex`) | `hermes model`, "ChatGPT or Codex Subscription" (ChatGPT OAuth) |
| GitHub Copilot (`copilot`) | OAuth device code, `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, or `gh auth token` |
| GitHub Copilot ACP (`copilot-acp`) | Spawns local `copilot --acp --stdio` |
| Anthropic (`anthropic`) | `hermes model` (Claude Max + extra usage credits via OAuth), `ANTHROPIC_API_KEY`, or setup-token `ANTHROPIC_TOKEN` |
| OpenRouter (`openrouter`) | `OPENROUTER_API_KEY`, or `hermes auth add openrouter --type oauth` |
| Ramp Router (`router`) | `RAMP_ROUTER_API_KEY` |
| Fireworks AI (`fireworks`) | `FIREWORKS_API_KEY` |
| NovitaAI (`novita`) | `NOVITA_API_KEY` |
| AI Gateway (`ai-gateway`) | `AI_GATEWAY_API_KEY` |
| z.ai / GLM (`zai`) | `GLM_API_KEY` |
| Kimi / Moonshot (`kimi-coding`, `kimi-coding-cn`) | `KIMI_API_KEY` / `KIMI_CN_API_KEY` |
| Arcee AI (`arcee`) | `ARCEEAI_API_KEY` |
| GMI Cloud (`gmi`) | `GMI_API_KEY` |
| Nebius Token Factory (`nebius-token-factory`) | `NEBIUS_API_KEY` |
| Actual Computer (`actual`) | `ACTUAL_API_KEY` for hosted relay; `model.base_url` for local daemon |
| MiniMax (`minimax`, `minimax-cn`, `minimax-oauth`) | `MINIMAX_API_KEY` / `MINIMAX_CN_API_KEY` / browser OAuth |
| xAI (`xai`, `xai-oauth`) | `XAI_API_KEY` / browser OAuth (SuperGrok / Premium+) |
| Qwen Cloud (`alibaba`, `alibaba-cn`) | `DASHSCOPE_API_KEY` |
| Alibaba Coding Plan (`alibaba-coding-plan`, `alibaba-coding-plan-cn`) | `ALIBABA_CODING_PLAN_API_KEY` (falls back to `DASHSCOPE_API_KEY`) |
| Alibaba Token Plan (`alibaba-token-plan`, `alibaba-token-plan-cn`) | `ALIBABA_TOKEN_PLAN_API_KEY` |
| Kilo Code (`kilocode`) | `KILOCODE_API_KEY` |
| Xiaomi MiMo (`xiaomi`) | `XIAOMI_API_KEY` |
| Tencent (`tencent-tokenhub`, `tencent-tokenplan`) | `TOKENHUB_API_KEY` / `TOKENPLAN_API_KEY` |
| OpenCode (`opencode-zen`, `opencode-go`) | `OPENCODE_ZEN_API_KEY` / `OPENCODE_GO_API_KEY` |
| CommandCode (`commandcode`, `commandcode-anthropic`) | `COMMANDCODE_API_KEY` |
| DeepSeek (`deepseek`) | `DEEPSEEK_API_KEY` |
| Hugging Face (`huggingface`, alias `hf`) | `HF_TOKEN` |
| Google / Gemini (`gemini`) | `GOOGLE_API_KEY` or `GEMINI_API_KEY` |
| Google Vertex AI (`vertex`) | `hermes model`; OAuth2 via service-account JSON (`VERTEX_CREDENTIALS_PATH`) or ADC |
| OpenAI API direct (`openai-api`) | `OPENAI_API_KEY`, optional `OPENAI_BASE_URL` |
| Azure AI Foundry (`azure-foundry`) | `hermes model` |
| AWS Bedrock (`bedrock`) | boto3 credential chain |
| NVIDIA Build (`nvidia`) | `NVIDIA_API_KEY` |
| Ollama Cloud (`ollama-cloud`) | `OLLAMA_API_KEY` |
| Qwen OAuth (`qwen-oauth`) | browser PKCE login |
| StepFun (`stepfun`) | `STEPFUN_API_KEY` |
| LM Studio (`lmstudio`) | `hermes model`, optional `LM_API_KEY` |
| Custom endpoint (`custom`) | `hermes model`, "Custom endpoint"; saved in `config.yaml` |

First-class API-key examples:

```bash
hermes chat --provider zai --model glm-5                  # GLM_API_KEY
hermes chat --provider kimi-coding --model kimi-for-coding  # KIMI_API_KEY
hermes chat --provider minimax --model MiniMax-M2.7       # MINIMAX_API_KEY
hermes chat --provider gmi --model zai-org/GLM-5.1-FP8    # GMI_API_KEY
```

Base URL overrides: `NOVITA_BASE_URL`, `GLM_BASE_URL`, `KIMI_BASE_URL`, `MINIMAX_BASE_URL`, `MINIMAX_CN_BASE_URL`, `DASHSCOPE_BASE_URL`, `XIAOMI_BASE_URL`, `GMI_BASE_URL`, `META_BASE_URL`, `TOKENHUB_BASE_URL`, `STEPFUN_BASE_URL`, `NVIDIA_BASE_URL`, `HF_BASE_URL`, `BEDROCK_BASE_URL`, `HERMES_QWEN_BASE_URL`.

## Custom endpoints and named providers

```yaml
model:
  default: your-model-name
  provider: custom
  base_url: http://localhost:8000/v1
  api_key: your-key-or-leave-empty-for-local
  # key_env: MY_PROVIDER_API_KEY  # env var holding the key (alternative to api_key)
```

Named custom providers under `providers:`:

```yaml
providers:
  local:
    api: http://localhost:8080/v1
  work:
    api: https://gpu-server.internal.corp/v1
    key_env: CORP_API_KEY
    transport: chat_completions
  anthropic-proxy:
    api: https://proxy.example.com/anthropic
    key_env: ANTHROPIC_PROXY_KEY
    transport: anthropic_messages  # for Anthropic-compatible proxies
```

Entry keys: `api` (aliases `base_url` / `url`), `name`, `key_env` / `api_key` / `key_cmd`, `transport` (`chat_completions` / `anthropic_messages` / `codex_responses`), `default_model`, `models`, `context_length`, `discover_models`, `extra_body`, `extra_headers`, `session_affinity_header`, `ssl_ca_cert` / `ssl_verify`, `catalog_provider`, `enabled: false`.

`key_cmd` mints short-lived bearer tokens from a command that prints a token (bare or JSON with `access_token`):

```yaml
providers:
  my-gateway:
    base_url: "https://gateway.internal.example.com/v1"
    api_mode: chat_completions
    key_cmd: "my-auth-cli print-token --profile prod"
```

Together AI / Groq / Perplexity recipes, switch with `/model custom:<name>:<model>`:

```yaml
providers:
  together:
    api: https://api.together.xyz/v1
    key_env: TOGETHER_API_KEY
model:
  default: MiniMaxAI/MiniMax-M2.7
  provider: custom:together
```

## Context length detection

Resolution chain: `model.context_length` (pin, highest) then `providers.<name>.models.<id>.context_length`, persistent cache, endpoint `/models`, Anthropic `/v1/models`, OpenRouter API, Nous Portal, models.dev, fallback defaults (128K).

```yaml
model:
  default: "qwen3.5:9b"
  base_url: "http://localhost:8080/v1"
  context_length: 131072  # tokens
```

## Self-hosted server requirements

| Server | Key setup |
|--------|-----------|
| Ollama | Default context is small (under 24 GB VRAM: 4,096; 24-48 GB: 32,768; 48+ GB: 256,000). Raise with `OLLAMA_CONTEXT_LENGTH=64000 ollama serve` or Modelfile `PARAMETER num_ctx 64000`; cannot be set via the OpenAI-compatible API. Verify with `ollama ps` |
| vLLM | `--enable-auto-tool-choice --tool-call-parser <name>` (`hermes`, `llama3_json`, `mistral`, `deepseek_v3`, `deepseek_v31`, `xlam`, `pythonic`); `--max-model-len` for context |
| SGLang | `--tool-call-parser` (`qwen`, `llama3`, `llama4`, `deepseekv3`, `mistral`, `glm`); `--context-length`; defaults to 128 max output tokens (set server-side) |
| llama.cpp | `--jinja` required for tool calling; set `-c` to at least 64000 explicitly (with `-np` slots, context divides among slots) |
| LM Studio | Tool calling since 0.3.6; `lms load <model> --context-length 64000`; `hermes config set model.lmstudio_load_mode jit` (default `explicit`) |

Hermes requires at least 64,000 tokens of context for agent use; smaller windows are rejected at startup. `model.ollama_num_ctx` is honored on every local endpoint.

## Notes

- Subscription plans: Anthropic OAuth only works on Claude Max with purchased extra usage credits (base Max allowance is not consumed); Claude Pro cannot use it, use `ANTHROPIC_API_KEY`. Codex plan-quota semantics, xAI inference quota beyond X Search, and Google consumer plans are stated as not currently documented upstream. xAI OAuth may return HTTP 403 for tier restrictions; switch to `XAI_API_KEY`.
- Copilot: classic PATs (`ghp_*`) are not supported; use `gho_` OAuth, `github_pat_` fine-grained (needs Copilot Requests permission), or `ghu_`. GPT-5+ models (except `gpt-5-mini`) use the Responses API; others use Chat Completions. `HERMES_COPILOT_ACP_COMMAND` / `HERMES_COPILOT_ACP_ARGS` override the CLI binary and args.
- Codex: device code by default; `hermes auth add openai-codex --browser` or `auth.codex_login_flow: browser` uses PKCE on fixed `localhost:1455` (needs `ssh -N -L 1455:127.0.0.1:1455 user@host` over SSH). `auth.adopt_external_logins` controls automatic adoption of Codex CLI / Claude Code logins.
- Nous Portal requests carry a `client=hermes-client-v<version>` tag and prefer scoped `inference:invoke` JWTs.
- Auxiliary tasks (vision, web summarization, MoA) default to the main chat model (`auxiliary.*.provider: "auto"`).
- xAI: Responses API (`codex_responses` transport); `x-grok-conv-id` header enables prompt caching automatically for `x.ai` base URLs. Upstream notes xAI retiring `grok-4*`, `grok-3`, `grok-code-fast-1`, `grok-imagine-image-pro` on 2026-05-15; `hermes migrate xai` (dry run) and `hermes migrate xai --apply` rewrite config.
- `LLM_MODEL` in `.env` is removed; `config.yaml` is the single source of truth. `OPENAI_BASE_URL` is honored only for `openai-api`.
- Legacy `custom_providers:` list still works and auto-migrates to `providers:` (config v12; `model` becomes `default_model`, `api_mode` becomes `transport`).
- Output-token caps (`model.max_tokens`, `HERMES_MAX_TOKENS`, `max_output_tokens` overrides) are no longer read; Hermes stops repetition loops after about 130,000 characters.
- Vision on custom models: `model.supports_vision: true` (also `providers.<name>.models.<id>.supports_vision`). `catalog_provider` lets a gateway inherit a catalogued vendor's metadata.
- Meta `muse-spark-*-contributor` tiers may train on prompts; interactive selection asks for confirmation.
- Bedrock uses the Converse API; configure `bedrock.region` / `bedrock.profile` / `bedrock.guardrail`. Vertex needs the `google/` model prefix and `vertex.project_id` / `vertex.region`.
- OpenRouter shortcuts: `:nitro` (throughput) and `:floor` (price); `openrouter/pareto-code` with `openrouter.min_coding_score` (default 0.65, only sent for that model).
- WSL2: mirrored networking (`networkingMode=mirrored` in `.wslconfig`, Windows 11 22H2+) or the Windows host IP; NAT mode needs servers bound to `0.0.0.0` (Ollama `OLLAMA_HOST=0.0.0.0`, llama-server/SGLang `--host 0.0.0.0`, LM Studio "Serve on Network") and a firewall rule.
- Optional API keys: `FIRECRAWL_API_KEY` / `FIRECRAWL_API_URL`, `BROWSERBASE_API_KEY` / `BROWSERBASE_PROJECT_ID`, `FAL_KEY`, `ELEVENLABS_API_KEY`, `VOICE_TOOLS_OPENAI_KEY`, `MISTRAL_API_KEY`, `HONCHO_API_KEY`, `SUPERMEMORY_API_KEY`. Self-hosted Firecrawl: `hermes config set FIRECRAWL_API_URL http://localhost:3002`.
- Model examples in this page (model IDs such as `claude-sonnet-4-6`, `glm-5`) are copied from upstream v0.22.2 docs verbatim and are not verified against provider catalogs.

## Related

- [Provider Routing](./provider-routing.md)
- [Fallback Providers](./fallback-providers.md)
- [Credential Pools](./credential-pools.md)
- [Nous Portal](./nous-portal.md)
- [Integrations Overview](./overview.md)
