<!-- source: https://code.claude.com/docs/en/model-config.md / last verified: 2026-08-07 -->

# Model configuration

Configure which Claude model Claude Code uses, model aliases like `opusplan`, effort levels, extended thinking, and extended context.

## Available models

The `model` setting accepts a **model alias** or a **model name** (Anthropic API: full model name; Amazon Bedrock: inference profile ARN; Microsoft Foundry: deployment name; Google Cloud's Agent Platform: version name).

`ANTHROPIC_BASE_URL` changes where requests are sent, not which model answers them; for routing through a gateway see the LLM gateway docs.

### Model aliases

| Alias | Behavior |
| --- | --- |
| `default` | Clears any override; reverts to the recommended model for your account type, or the organization default model if set |
| `best` | Fable 5 where available, otherwise the latest Opus |
| `fable` | Claude Fable 5, for the hardest/longest-running tasks |
| `sonnet` | Latest Sonnet, for daily coding |
| `opus` | Latest Opus, for complex reasoning |
| `haiku` | Fast/efficient Haiku, for simple tasks |
| `sonnet[1m]` | Sonnet with 1M token context |
| `opus[1m]` | Opus with 1M token context |
| `opusplan` | Hybrid: `opus` in plan mode, `sonnet` for execution |

`opus`/`sonnet` resolve differently per provider: Anthropic API → Opus 5 / Sonnet 5; Claude Platform on AWS → Opus 5 / Sonnet 4.6; Amazon Bedrock, Google Cloud's Agent Platform → Opus 5 / Sonnet 4.5; Microsoft Foundry → Opus 4.6 / Sonnet 4.5. Pin an older/newer version with the full model name or `ANTHROPIC_DEFAULT_OPUS_MODEL`/`ANTHROPIC_DEFAULT_SONNET_MODEL`.

### Fable 5

Claude Fable 5 is the most capable model, suited to long autonomous sessions. Not the default — select with `/model fable`. Safety-classifier-flagged requests (mostly cybersecurity/biology) trigger automatic model fallback. Requires v2.1.170+; unavailable under zero data retention.

### Setting your model

Priority order: `/model <alias|name>` (session, saves as default via `Enter`, or session-only via `s`) > `claude --model <alias|name>` (startup) > `ANTHROPIC_MODEL` env var > `model` in settings file.

```bash
claude --model opus
```
```text
/model sonnet
```
```json
{ "permissions": { "allow": ["Bash(npm run lint)"] }, "model": "opus" }
```

Resumed sessions (`--resume`/`--continue`/`/resume`) keep the transcript's saved model unless it's retired or excluded by `availableModels`, or you pass `--model`/`ANTHROPIC_MODEL` explicitly. Provider-deployment-ID platforms (Bedrock/Vertex/Foundry) don't restore the transcript model at all.

## Restrict model selection

Admins use `availableModels` in managed/policy settings to allowlist models (matches family alias, version prefix, or full ID):

```json
{ "availableModels": ["sonnet", "haiku"] }
```

Applies everywhere a model can be specified: main session model, alias resolution (`ANTHROPIC_DEFAULT_*_MODEL`), fast mode, subagent/teammate/skill/command models, advisor model, background agent dispatch. On the Anthropic API and Claude Platform on AWS, a blocked family alias resolves to the newest permitted version instead of being rejected outright.

### Enforce the allowlist for the Default model

```json
{ "availableModels": ["sonnet", "haiku"], "enforceAvailableModels": true }
```

Extends the allowlist to the Default option. Requires v2.1.175+. Has no effect when `availableModels` is unset or `[]`.

### Organization default model

Enterprise admins set an org-wide or per-role default from the claude.ai admin console (requires v2.1.196+). The Default row shows "Org default". Any explicit model selection (`--model`, `ANTHROPIC_MODEL`, `model` in settings) still takes precedence, unless the admin turns on override.

### Organization effort limits

Enterprise admins can cap the max effort level per model per role (requires v2.1.195+); levels above the cap aren't offered and are silently clamped in non-interactive/background contexts.

## Special model behavior

### `default` model setting

Max/Team Premium/Enterprise pay-as-you-go/Anthropic API/Claude Platform on AWS/Amazon Bedrock/Google Cloud's Agent Platform → Opus 5. Pro/Team Standard/Enterprise subscription seats → Sonnet 5. Microsoft Foundry → Sonnet 4.5.

### `opusplan` model setting

`opus` in plan mode, `sonnet` in execution. Shares the `opus` model setting's context window; force 1M in both phases with `opusplan[1m]`.

### Fallback model chains

```bash
claude --fallback-model sonnet,haiku
```
```json
{ "fallbackModel": ["claude-sonnet-5", "claude-haiku-4-5"] }
```

Tries each model in order on overload/unavailable/non-retryable server errors (not auth/billing/rate-limit/request-size/transport errors). Switch lasts one turn. Capped at 3 models after dedup. `"default"` expands to the default model. Entries outside `availableModels`, or with a smaller context window than the primary during compaction, are dropped.

### Automatic model fallback

Fable 5 and Opus 5 run safety classifiers (cybersecurity/biology). A flagged request re-runs on a fallback model automatically: Fable 5 biology → Opus 5; Fable 5 cybersecurity → Opus 4.8; Opus 5 cybersecurity → Opus 4.8 (Opus 5 biology has no fallback, ends in refusal). Turn off automatic switching with `switchModelsOnFlag: false` in settings, which instead pauses for you to choose. `claude --safe-mode` disables customizations to check whether CLAUDE.md/skills/MCP/hooks content is triggering the classifier.

### Adjust effort level

| Model | Levels |
| --- | --- |
| Fable 5 | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 5, Sonnet 5, Opus 4.8, Opus 4.7 | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 4.6, Sonnet 4.6 | `low`, `medium`, `high`, `max` |

Default is `high` everywhere except Opus 4.7 (`xhigh`). Set via `/effort [level]`, `--effort <level>`, `CLAUDE_CODE_EFFORT_LEVEL` env var (highest precedence), the `effortLevel` setting (`low`/`medium`/`high`/`xhigh`; not `max`/`ultracode`), or skill/subagent frontmatter `effort:`.

`ultracode` (via `/effort ultracode` or `--effort ultracode`) sends `xhigh` and has Claude orchestrate dynamic workflows for substantive tasks; session-only.

Include `ultrathink` anywhere in a prompt for one-off deeper reasoning without changing the session effort setting.

### Extended thinking

| Control | How |
| --- | --- |
| Toggle for session | Option+T (macOS) / Alt+T (Windows/Linux) |
| Global default | `/config` → thinking mode toggle, saves `alwaysThinkingEnabled` |
| Disable regardless of effort | `MAX_THINKING_TOKENS=0` (no effect on Fable 5) |

Thinking output is collapsed by default; `Ctrl+O` toggles verbose mode. `showThinkingSummaries: true` in settings shows full (non-redacted) summaries.

### Extended context

Fable 5, Sonnet 5, Opus 4.6+, and Sonnet 4.6 support a 1M-token context window. Opus auto-upgrades to 1M on Max/Team/Enterprise plans; Sonnet 4.6 1M requires usage credits on every plan including Max. Sonnet 5 on the Anthropic API always runs at 1M (no `[1m]` suffix needed), auto-compacting around 967K tokens. Disable entirely with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`.

## Add a custom model option

```bash
export ANTHROPIC_CUSTOM_MODEL_OPTION="my-gateway/claude-opus-5"
export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="Opus via Gateway"
export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Custom deployment routed through the internal LLM gateway"
```

Adds one entry to the bottom of the `/model` picker without replacing built-in aliases; skips ID validation. Must also be listed in `availableModels` if that allowlist is set.

## Environment variables

| Variable | Description |
| --- | --- |
| `ANTHROPIC_DEFAULT_FABLE_MODEL` | Model for `fable`, and Fable-5 recognition for automatic fallback on third-party providers |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model for `opus`, or `opusplan` in plan mode |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model for `sonnet`, or `opusplan` outside plan mode |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model for `haiku`, and background functionality |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Model for all subagents/agent teams/workflow agents; overrides per-invocation `model` and frontmatter; `inherit` restores normal resolution |

`ANTHROPIC_SMALL_FAST_MODEL` is deprecated in favor of `ANTHROPIC_DEFAULT_HAIKU_MODEL`.

### Pin models for third-party deployments

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'   # Amazon Bedrock
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'                # Vertex / Foundry
```

Append `[1m]` for extended context: `ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8[1m]'`.

### Customize pinned model display and capabilities

`ANTHROPIC_DEFAULT_OPUS_MODEL_NAME`, `_DESCRIPTION`, `_SUPPORTED_CAPABILITIES` (comma-separated: `effort`, `xhigh_effort`, `max_effort`, `thinking`, `adaptive_thinking`, `interleaved_thinking`) — same suffixes apply to Sonnet/Haiku/Fable/`ANTHROPIC_CUSTOM_MODEL_OPTION`.

### Override model IDs per version (`modelOverrides`)

```json
{
  "modelOverrides": {
    "claude-opus-4-7": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-prod",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/sonnet-prod"
  }
}
```

Maps individual Anthropic model IDs to provider-specific strings (Bedrock ARN, Vertex version, Foundry deployment name), for governance/cost allocation/regional routing.

### Prompt caching configuration

| Variable | Effect |
| --- | --- |
| `DISABLE_PROMPT_CACHING` | Disable for all models (takes precedence) |
| `DISABLE_PROMPT_CACHING_HAIKU` / `_SONNET` / `_OPUS` / `_FABLE` | Disable per model tier |

## Options / Props

| Setting | Values | Description |
| --- | --- | --- |
| `model` | alias or full model ID | Initial model selection for a session |
| `availableModels` | array of model families/IDs | Allowlist restricting selectable models |
| `enforceAvailableModels` | boolean | Extend allowlist to the Default option |
| `effortLevel` | `low` \| `medium` \| `high` \| `xhigh` | Persisted effort level |
| `fallbackModel` | array (max 3) | Ordered fallback chain for overload/unavailable |
| `modelOverrides` | map | Anthropic model ID → provider-specific ID |

## Related

- [settings.md](./settings.md): where `model`, `availableModels`, `fallbackModel`, `effortLevel` live in the settings file
- [fast-mode.md](./fast-mode.md): the Opus-only fast mode toggle that interacts with model switching
- [statusline.md](./statusline.md): displaying the current model/effort in a status line

## Notes

This page was retrieved in full (no truncation observed).
