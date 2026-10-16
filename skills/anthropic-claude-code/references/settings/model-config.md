<!-- source: https://code.claude.com/docs/en/model-config.md / last verified: 2026-10-16 -->

# Model configuration

Configure which Claude model Claude Code uses, model aliases like `opusplan`, effort levels, extended thinking, extended context, and the auto-compact window.

## Available models

The `model` setting accepts a **model alias** or a **model name** (Anthropic API: full model name; Amazon Bedrock: inference profile ARN; Microsoft Foundry: deployment name; Google Cloud's Agent Platform: version name).

`ANTHROPIC_BASE_URL` changes where requests are sent, not which model answers them; for routing through a gateway see the LLM gateway docs.

### Model aliases

| Alias | Behavior |
| --- | --- |
| `default` | Special value that clears any model override and reverts to the runtime default for your account. Not itself a model alias |
| `best` | Uses the model the `fable` alias resolves to where Fable is available to you, otherwise the same model as `opus` |
| `fable` | Uses the Fable model for your provider, for the hardest and longest-running tasks |
| `sonnet` | Latest Sonnet, for daily coding |
| `opus` | Latest Opus, for complex reasoning |
| `haiku` | Fast/efficient Haiku, for simple tasks |
| `sonnet[1m]` | Sonnet with 1M token context. No effect when `sonnet` already resolves to Sonnet 5.5 or Sonnet 5 with their native 1M window |
| `opus[1m]` | Opus with 1M token context. No effect when `opus` already resolves to Opus 4.7 or later with its native 1M window |
| `opusplan` | Hybrid: `opus` in plan mode, `sonnet` for execution |

The `opus`, `sonnet`, and `haiku` aliases resolve to the newest version on the Anthropic API and to an earlier version on some other providers:

| Provider | `opus` | `sonnet` | `haiku` |
| --- | --- | --- | --- |
| Anthropic API | Opus 5.5 | Sonnet 5.5 | Haiku 5.5 |
| Claude Platform on AWS | Opus 5.5 | Sonnet 4.6 | Haiku 4.5 |
| Amazon Bedrock, Google Cloud's Agent Platform | Opus 5.5 | Sonnet 4.5 | Haiku 4.5 |
| Microsoft Foundry | Opus 4.6 | Sonnet 4.5 | Haiku 4.5 |

Unless you set `ANTHROPIC_DEFAULT_FABLE_MODEL`, the `fable` alias resolves to Fable 5.1, except in Claude apps gateway sessions, where `fable` and `best` resolve to Fable 5. A gateway that isn't configured to serve `claude-fable-5-1` rejects requests for that model; select it with `/model claude-fable-5-1` through a gateway that serves it.

Where `opus` or `sonnet` resolves to an older model, newer models are available by selecting the full model name or setting `ANTHROPIC_DEFAULT_OPUS_MODEL` / `ANTHROPIC_DEFAULT_SONNET_MODEL`. Aliases point to the recommended version for your provider and update over time; to pin a version, use the full model name, for example `claude-opus-5-5`, or the corresponding environment variable.

Sonnet 5.5 requires Claude Code v2.1.284 or later, Opus 5.5 requires v2.1.280 or later, and Haiku 5.5 requires v2.1.293 or later. Run `claude update` to upgrade.

### Work with Fable

Claude Fable 5.1 and Claude Fable 5 are the most capable models in Claude Code, suited to tasks larger than a single sitting. Neither is the account-type default on any plan or provider; select one explicitly:

- **Fable 5.1**: `/model fable`, or `claude --model fable`. In Claude apps gateway sessions (where the alias resolves to Fable 5), run `/model claude-fable-5-1`.
- **Fable 5**: select by model ID. On the Anthropic API, `/model claude-fable-5` or `claude --model claude-fable-5`. On other providers, use your provider's Fable 5 model ID or pin it with `ANTHROPIC_DEFAULT_FABLE_MODEL`.

If you connect to the Anthropic API directly and your user settings hold `claude-fable-5` or `claude-fable-5[1m]` as the model (for example selected in the `/model` picker before v2.1.257), Claude Code changes that saved value to the `fable` or `fable[1m]` alias the first time you run v2.1.257 or later; the startup model line shows `(auto-updated)` once. A `claude-fable-5` value in project, local, or managed settings stays as it is. Fable 5.1 requires v2.1.257 or later. Requests that a Fable model's safety classifiers flag trigger automatic model fallback.

#### Fable and usage credits

Depending on your plan and seat tier, Fable usage can bill to usage credits instead of your plan's included limits; the `/model` picker then shows "Requires usage credits" on the Fable row. In interactive sessions Claude Code shows a consent prompt before a Fable request bills usage credits (Enterprise members with organization billing don't see it); once you choose to continue, it doesn't ask again. In a session with Remote Control connected, a background session, or an agent team teammate's session, Claude Code holds the mid-session consent prompt for the `dialogExpiry` deadline (five minutes by default) and then ends the turn without sending the request. In `-p` mode, and in an Agent SDK application that doesn't show the prompt, Claude Code never asks and bills usage credits without asking.

### Setting your model

Priority order: `/model <alias|name>` (session) > `claude --model <alias|name>` (startup) > `ANTHROPIC_MODEL` env var > `model` in settings file > `ANTHROPIC_DEFAULT_MODEL` (default for new sessions).

In the `/model` picker, `Enter` switches and saves as your default (writes `model` in user settings); `s` switches for this session only (rebind with `modelPicker:thisSessionOnly`). Typing `/model <name>` behaves like `Enter`. In v2.1.144 through v2.1.152, `/model` applied to the current session only and `d` in the picker saved a default. On an Enterprise plan with a claude.ai login, a default saved with `/model` is also recorded on the account (v2.1.280+). In `-p` mode `/model` applies to the current session only and requires v2.1.205 or later. If you switch models with `/model`, the switch also reaches subagents that inherit the main conversation's model.

```bash
claude --model opus
```
```text
/model sonnet
```
```json
{ "permissions": { "allow": ["Bash(npm run lint)"] }, "model": "opus" }
```

Resumed sessions (`--resume` / `--continue` / `/resume`) keep the transcript's saved model unless it's retired or excluded by `availableModels`, or you pass `--model` / `ANTHROPIC_MODEL` explicitly (as of v2.1.195, an `ANTHROPIC_DEFAULT_OPUS_MODEL`-family variable also takes precedence). Provider-deployment-ID platforms (Bedrock / Vertex / Foundry) don't restore the transcript model at all. If your `model` setting is `haiku`, a session saved on Haiku 4.5 resumes on whatever `haiku` resolves to now (Haiku 5.5). When project or managed settings set the startup model, the startup header shows which settings file set it. PreModelSwitch hooks run before a requested switch applies and can block it.

#### Set a default model for new sessions

Set `ANTHROPIC_DEFAULT_MODEL=<alias|name>` (requires v2.1.236 or later). A new session starts on it only when none of these selects a model: the `--model` flag, `ANTHROPIC_MODEL`, a `model` value in any settings file (including the choice you save with `/model`), or an organization default model. The Default option also resolves to it unless an organization default applies; the picker's Default row shows "Set by ANTHROPIC_DEFAULT_MODEL". Claude Code ignores the variable when set to `default`, `inherit`, `opusplan`, or `haiku`, when `enforceAvailableModels` is on, when model restrictions exclude the model, or when the model isn't available to your account.

#### A new session starts on a different model than you picked

Usual causes: you chose it for one session (`s`, `--model`, `-p` `/model`); something with higher priority sets the model (project / managed `model`, `ANTHROPIC_MODEL`, an organization default set to override); Claude Code couldn't write `~/.claude/settings.json`; or you resumed a session.

## Restrict model selection

Admins use `availableModels` in managed/policy settings to allowlist models (matches a family alias, a version prefix, or a full ID). A version prefix also matches later IDs that extend it: `claude-fable-5` permits both Fable 5 and Fable 5.1, while `claude-fable-5-1` permits Fable 5.1 only.

```json
{ "availableModels": ["sonnet", "haiku"] }
```

Applies everywhere a model can be specified: main session model (including `ANTHROPIC_DEFAULT_MODEL` and the resumed model), alias resolution (`ANTHROPIC_DEFAULT_*_MODEL`), fast mode, subagent / teammate / skill / command models, advisor model, background agent dispatch. On the Anthropic API and Claude Platform on AWS, a blocked family alias resolves to the newest permitted version of the family (before v2.1.205 it was rejected). Other blocked selections: `/model` rejects with an error; `--model` / `ANTHROPIC_MODEL` / `model` setting are replaced at startup with a warning; `ANTHROPIC_DEFAULT_MODEL` is ignored; a subagent runs on a fallback model; a skill or command override is ignored; the `advisorModel` setting disables the advisor; the `--advisor` flag exits with an error at launch.

### Surface coverage

Every surface enforces the allowlist it receives, but delivery differs. Server-managed settings reach CLI / IDE, Desktop local sessions, web / mobile / cloud sessions (except Claude Tag), and the Agent SDK; MDM or managed settings files reach CLI / IDE, Desktop, SDK, and Cowork where deployed, but are not delivered in Anthropic-hosted cloud environments (self-hosted environments read the file from the runner image). Third-party provider sessions (Bedrock, Agent Platform, Foundry, Claude Platform on AWS) don't receive server-managed settings; use MDM or managed settings files there. The picker state on claude.ai / Desktop is a convenience, not enforcement.

### Enforce the allowlist for the Default model

```json
{ "availableModels": ["sonnet", "haiku"], "enforceAvailableModels": true }
```

Extends the allowlist to the Default option (requires v2.1.175 or later). No effect when `availableModels` is unset or `[]`. With the default prefix matching, `availableModels` alone leaves the Default option on the runtime default for the account. When the account-type default isn't allowed, Default resolves to the first `availableModels` entry that names an allowed, available model. Deploy both keys together in the highest-ranked managed source.

### Control the model users run on

The `model` setting is an initial selection, not enforcement. Combine `availableModels`, `enforceAvailableModels`, `deniedModels` / `availableModelsMatch`, `model`, and the `ANTHROPIC_DEFAULT_*_MODEL` variables (in an `env` block) to control the model experience.

### Merge behavior

When the managed settings Claude Code applies define `availableModels`, that list alone applies (entries in user / project / local settings can't extend it, and it never merges across managed sources); before v2.1.175, lower-precedence entries merged into the managed list. Otherwise lists are concatenated and deduplicated. An entry naming a specific model in a family disables that family's wildcard entry: `["sonnet", "claude-sonnet-4-5"]` allows only Sonnet 4.5 versions.

### Mantle model IDs

`availableModels` entries that start with `anthropic.` are added to the `/model` picker as custom options and, with the Amazon Bedrock Mantle endpoint enabled, routed there.

### Block specific models or versions

Both keys below are managed-settings-only and require v2.1.283 or later (earlier versions ignore them, so also set `requiredMinimumVersion`):

- `deniedModels`: list models to block even when `availableModels` permits them; works with no allowlist too.
- `availableModelsMatch`: `"exact"` makes each model ID in `availableModels` permit only the version it names.

```json
{ "availableModels": ["opus", "sonnet"], "deniedModels": ["claude-opus-5-5"] }
```

A blocked Default option steps down: newest permitted version of the same family, then the newest permitted model of each lower-cost family (Sonnet, then Haiku), then the first `availableModels` entry; if none is permitted, the session refuses to start.

### Organization model restrictions

Claude Enterprise admins can disable individual models in the claude.ai admin console (requires v2.1.187 or later). Delivered with the account's entitlements and enforced server-side; applies to sessions on the Anthropic API and LLM gateway deployments only. Haiku models can't be disabled. Both restrictions apply together.

## Organization default model

Enterprise admins set an org-wide or per-role default from the claude.ai admin console (requires v2.1.196 or later). The Default row shows "Org default". `--model`, `ANTHROPIC_MODEL`, managed / `--settings` `model`, and your own `model` values take precedence, unless the admin turns on override. It reaches only sessions authenticated with the Anthropic API.

## Organization effort limits

Enterprise admins can cap the max effort level per model per role (requires v2.1.195 or later); levels above the cap aren't offered and are silently clamped in non-interactive / background contexts. On any plan and provider, the `maxEffortLevel` managed setting caps effort on the client; when both apply, the lower cap applies.

## Special model behavior

### `default` model setting

- Pro, Max, Team, Enterprise, Anthropic API: Opus 5.5
- Claude Platform on AWS, Amazon Bedrock, Google Cloud's Agent Platform: Opus 5.5
- Microsoft Foundry: Sonnet 4.5

Before v2.1.280, `default` resolved to Sonnet 5 on Pro and Team Standard, and to Opus 5 elsewhere (from v2.1.219); before v2.1.219, Opus 4.8 on the Anthropic API, Max, Team Premium, and Enterprise pay-as-you-go from v2.1.154, and on Claude Platform on AWS, Bedrock, and Agent Platform from v2.1.207; before v2.1.207, Opus 4.7 on Claude Platform on AWS and Sonnet 4.5 on Bedrock and Agent Platform. An organization default, `ANTHROPIC_DEFAULT_MODEL`, or the model recorded on your account can replace the account-type default.

### `opusplan` model setting

`opus` in plan mode, `sonnet` in execution. Each phase shares its alias's context window; when both resolve to native-1M models (as on the Anthropic API) both run with 1M. Force 1M in both phases with `opusplan[1m]` (via `/model` requires v2.1.265 or later). When `availableModels` excludes the newest Opus but permits an older version, `opusplan` plans on the newest permitted Opus (before v2.1.205 plan mode stayed on the session's model).

### Fallback model chains

```bash
claude --fallback-model sonnet,haiku
```
```json
{ "fallbackModel": ["claude-sonnet-5", "claude-haiku-4-5"] }
```

Tries each model in order on overload / unavailable / non-retryable server errors (not authentication, billing, rate-limit, request-size, transport errors, or a denial by your organization's policy check). Also switches when Bedrock or Agent Platform refuses a model your account can't invoke. Switch lasts one turn. Capped at 3 models after dedup. `"default"` expands to the default model. `--fallback-model` takes precedence over the setting. Entries outside `availableModels`, or with a smaller context window than the primary during compaction, are dropped. The chain also applies to subagents (before v2.1.247 a covered failure ended the subagent).

### Automatic model fallback

Content-based fallback. Fable models, Opus 5.5, Sonnet 5.5, and Opus 5 run safety classifiers (cybersecurity / biology):

- Fable 5.1, Fable 5, Opus 5.5: biology re-runs on Opus 5, cybersecurity re-runs on Opus 4.8.
- Sonnet 5.5: cybersecurity re-runs on Sonnet 5; biology ends in a refusal (no fallback model).
- Opus 5: cybersecurity re-runs on Opus 4.8; biology ends in a refusal.

Category-based fallback requires v2.1.219 or later. After a fallback the session continues on the fallback model and keeps the effort level the flagged request ran at. A fallback whose target is blocked by `availableModels` doesn't run. Fallback can trigger on the first request because it carries workspace context; `claude --safe-mode` disables customizations to check whether CLAUDE.md / skills / MCP / hooks are the trigger. To be asked before switching, choose **Ask each time** in `/config` or set `switchModelsOnFlag` to `false`.

On Bedrock, Agent Platform, and Foundry, fallback operates only when Claude Code can identify each model: set `ANTHROPIC_DEFAULT_FABLE_MODEL` for Fable sources, `ANTHROPIC_DEFAULT_OPUS_MODEL` to an Opus model ID (needed for every source model), and for Sonnet 5.5 also `ANTHROPIC_DEFAULT_SONNET_MODEL` (or a Sonnet 5 entry in the provider's model list). The fallback model must have a context window at least as large as the session's. Workloads in offensive security or biology trigger fallback frequently; ask your Anthropic account team about trusted access programs.

### Adjust effort level

| Model | Levels |
| --- | --- |
| Fable 5.1 and Fable 5 | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 5.5, Sonnet 5.5, Haiku 5.5, Opus 5, Sonnet 5, Opus 4.8, Opus 4.7 | `low`, `medium`, `high`, `xhigh`, `max` |
| Opus 4.6, Sonnet 4.6 | `low`, `medium`, `high`, `max` |

Default is `high`, except Opus 5.5, Sonnet 5.5, and Haiku 5.5 default to `medium` and Opus 4.7 defaults to `xhigh` (an organization can set a default effort for its organization default model). A level the model doesn't support falls back to the highest supported level at or below it. Resolution order: (1) explicit choice: `CLAUDE_CODE_EFFORT_LEVEL`, `--effort`, or `/effort`; (2) your settings: the level saved per model under `modelSettings`, or `effortLevel`; (3) the model's default. A top-level `effortLevel` in user settings doesn't count for Opus 5.5 and later models (it's the older form, kept for Opus 5, Fable 5.1, and earlier); one in project, local, or managed settings or `--settings` applies to every model.

`Enter` in the `/effort` slider or `/model` picker saves the level as the default; `s` applies it to this session only (v2.1.257+). `max` is session-only unless set through `CLAUDE_CODE_EFFORT_LEVEL`. In `-p` runs and from a Remote Control device (v2.1.234+) a level applies to that session only. `/effort auto` clears your saved level for the active model. `effortLevel` / `modelSettings` accept `low`/`medium`/`high`/`xhigh` (not `max` or `ultracode`); skill / subagent frontmatter `effort:` overrides the session level but not the env var; `maxEffortLevel` and organization caps still limit it.

`ultracode` is a Claude Code setting, not a level: with it on, Claude orchestrates dynamic workflows for substantive tasks. Turn it on with `/effort ultracode` (off: `/effort ultracode off`), the slider's Ultracode toggle (`Tab`), `claude --effort ultracode` (also sets `xhigh`; v2.1.203+), or the `ultracode` setting (`--settings` or an Agent SDK request). `/effort ultracode off`, the toggle, and keeping ultracode on at levels other than `xhigh` require v2.1.284 or later. Unavailable when workflows are turned off or the model doesn't support `xhigh`.

Include `ultrathink` anywhere in a prompt for one-off deeper reasoning without changing the session effort setting. Fable models, Sonnet 5 and later, Haiku 5.5, and Opus 4.7 and later always use adaptive reasoning; on Opus 4.6 and Sonnet 4.6 `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` reverts to the fixed `MAX_THINKING_TOKENS` budget. Opus 5.5 at `medium` matches or exceeds Opus 5 at `high` on coding and knowledge-work evaluations (Anthropic's testing); start at `medium` when moving from Opus 5.

### Extended thinking

| Control | How |
| --- | --- |
| Toggle for session | Option+T (macOS) / Alt+T (Windows/Linux) |
| Global default | `/config` → thinking mode toggle, saves `alwaysThinkingEnabled` |
| Disable regardless of effort | `MAX_THINKING_TOKENS=0` (turns thinking off on the Anthropic API except on Opus 5.5, Sonnet 5.5, Haiku 5.5, and the Fable models; on third-party providers omits the `thinking` parameter) |

You can't turn thinking off on Opus 5.5, Sonnet 5.5, Haiku 5.5, or the Fable models; the toggle shows `Thinking can't be turned off`. Thinking output is collapsed by default; `Ctrl+O` toggles verbose mode. Interactive sessions on the Anthropic API receive redacted thinking blocks by default, so set `showThinkingSummaries: true` for full summaries. You are charged for all thinking tokens generated.

### Extended context

Fable 5.1, Fable 5, Sonnet 5 and later, Haiku 5.5, Opus 4.6 and later, and Sonnet 4.6 support a 1M-token context window. Fable models, Sonnet 5 and later, Haiku 5.5, and Opus 4.7 and later run with 1M by default (no `[1m]` suffix), including on Bedrock, Agent Platform, Foundry, and Claude apps gateway sessions. Opus 4.6 and Sonnet 4.6 reach 1M only through `[1m]` (e.g. `/model claude-opus-4-6[1m]`); Opus 4.6 1M is included on Max / Team / Enterprise, Sonnet 4.6 1M requires usage credits on every subscription plan. On the Anthropic API 1M uses standard pricing with no premium beyond 200K, except Haiku 5.5. Disable entirely with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (sessions then compact at the 200K boundary). Behind an LLM gateway, set `CLAUDE_CODE_AUTO_COMPACT_WINDOW=200000` if the gateway rejects requests above 200K tokens.

#### Haiku 5.5 context window and pricing

On the Anthropic API, Haiku 5.5 runs with the 1M window on every plan; model ID `claude-haiku-5-5` (`/model claude-haiku-5-5`). A request costs more per token when its prompt is longer than 100K tokens (see Anthropic pricing). Sessions auto-compact at about 967K tokens by default.

## Context window and auto-compaction

### Set the auto-compact window

- Current model, this and later sessions: `/autocompact 500k` (saved under the model in `modelSettings`; before v2.1.288 the command saved one window for every model as top-level `autoCompactWindow`). `/autocompact auto` returns to the tuned window.
- Every model: `autoCompactWindow` in a settings file.
- One launch: `--autocompact`.
- Scripts and cloud: `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (plain token count; takes precedence over the command, flag, and setting).

Accepted window sizes are 100K to 1M tokens: a plain count (`200000`), a `k` / `M` suffix (`500k`, `1M`), or a bare number from 100 to 1000 meaning thousands. Capped at the model's context window.

### Default auto-compact thresholds

With no window set, Claude Code compacts at the model's context limit, except: native-1M models compact at about 967K tokens; Sonnet 4.6 / Opus 4.6 without extended context compact at 200K; with `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` native-1M models compact at 200K; unrecognized model IDs (such as a gateway alias) compact at the assumed window. The `idleCompaction` setting governs compaction of an idle conversation.

### Correct the window for a gateway or custom model ID

A startup warning that the model ID isn't recognized means Claude Code assumes 200K. Fixes: `claude update`; a `modelOverrides` entry (or a `modelPicker` row with `behavesAs`); append `[1m]` for a 1M model; or set `CLAUDE_CODE_MAX_CONTEXT_TOKENS` (takes effect on its own for an unrecognized ID that doesn't start with `claude-` and has no `[1m]`; for IDs that resolve to a known model it takes effect only with `DISABLE_COMPACT`). `CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT=1` makes Claude Code compact only after the API rejects the conversation as too long.

## Checking your current model

In the status line (if configured), or in `/status`, which also displays account information.

## Add a custom model option

```bash
export ANTHROPIC_CUSTOM_MODEL_OPTION="my-gateway/claude-opus-5-5"
export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="Opus via Gateway"
export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Custom deployment routed through the internal LLM gateway"
```

Adds one entry after the built-in entries in the `/model` picker without replacing built-in aliases; skips ID validation. `_NAME` and `_DESCRIPTION` are optional (description defaults to `Custom model (<model-id>)`). Must also be listed in `availableModels` if that allowlist is set. For gateways, `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` populates the picker from `/v1/models`; to list several models in your own order use `modelPicker`.

## Environment variables

| Variable | Description |
| --- | --- |
| `ANTHROPIC_DEFAULT_FABLE_MODEL` | Model for `fable`, and the model ID recognized as a Fable model for automatic fallback on third-party providers |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model for `opus`, or `opusplan` in plan mode |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model for `sonnet`, or `opusplan` outside plan mode |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model for `haiku`, and background functionality |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Default model for subagents, agent team teammates, and workflow agents not assigned a model another way; a per-invocation model or a definition's `model` field (including `inherit`) takes precedence; `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` changes that |

`ANTHROPIC_SMALL_FAST_MODEL` is deprecated in favor of `ANTHROPIC_DEFAULT_HAIKU_MODEL`. To choose the model your sessions start on, use `ANTHROPIC_DEFAULT_MODEL`.

### Pin models for third-party deployments

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-8'   # Amazon Bedrock
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-8'                # Google Cloud's Agent Platform / Microsoft Foundry
```

Pin model versions before rolling out to users; without pinning, aliases resolve to a built-in default that can lag the newest release or not yet be enabled in an account (Bedrock and Agent Platform show a notice and fall back to an earlier version; Foundry shows errors). Apply the same pattern for the Fable, Sonnet, and Haiku variables. A pinned model with a native 1M window runs with 1M without a suffix when Claude Code can match the ID (it contains the model's Anthropic API ID, or a `modelOverrides` entry maps it); for Opus 4.6 / Sonnet 4.6 append `[1m]`, which is stripped before sending and read per variable. When you set an `ANTHROPIC_DEFAULT_*_MODEL` variable, the picker shows one row for that model in place of the family's built-in rows.

### Customize pinned model display and capabilities

`ANTHROPIC_DEFAULT_OPUS_MODEL_NAME`, `_DESCRIPTION`, `_SUPPORTED_CAPABILITIES` (comma-separated: `effort`, `xhigh_effort`, `max_effort`, `thinking`, `adaptive_thinking`, `interleaved_thinking`) — same suffixes apply to Sonnet / Haiku / Fable and `ANTHROPIC_CUSTOM_MODEL_OPTION`. They take effect on third-party providers (`_NAME` and `_DESCRIPTION` also behind an LLM gateway), not when connecting directly to `api.anthropic.com`. When `_SUPPORTED_CAPABILITIES` is set, listed capabilities are enabled and unlisted ones disabled; unset falls back to built-in detection by model ID. By default a row shows the model's name if Claude Code recognizes the pinned ID, and the raw ID otherwise (Foundry deployment names are never recognized).

### Override model IDs per version (`modelOverrides`)

```json
{
  "modelOverrides": {
    "claude-opus-4-7": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-prod",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/sonnet-prod"
  }
}
```

Maps individual Anthropic model IDs to provider-specific strings (Bedrock ARN, Agent Platform version name, Foundry deployment name). Keys must be Anthropic model IDs as listed in the Models overview; unknown keys are ignored. Also applies to IDs passed through `--model`, `ANTHROPIC_MODEL`, or `ANTHROPIC_DEFAULT_*_MODEL` (before v2.1.200 these reached the provider as-is). When `availableModels` is set in managed settings, only managed `modelOverrides` apply to such IDs (v2.1.200+). Adding an entry whose value is a gateway alias stops the `[claude-code:unrecognized_model]` diagnostic line.

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
| `deniedModels` | array | (Managed only, v2.1.283+) Block specific models or versions |
| `availableModelsMatch` | `"exact"` | (Managed only, v2.1.283+) Each `availableModels` ID permits only the version it names |
| `effortLevel` | `low` \| `medium` \| `high` \| `xhigh` | Persisted effort level (default for models without a per-model level) |
| `fallbackModel` | array (max 3) | Ordered fallback chain for overload/unavailable |
| `modelOverrides` | map | Anthropic model ID → provider-specific ID |

## Version history

The Claude Code version at which each model alias changed the model it resolves to, newest first.

| Version | Change |
| --- | --- |
| v2.1.293 | `haiku` resolves to Haiku 5.5 on the Anthropic API |
| v2.1.284 | `sonnet` resolves to Sonnet 5.5 on the Anthropic API |
| v2.1.280 | `opus` resolves to Opus 5.5 on the Anthropic API, Claude Platform on AWS, Amazon Bedrock, and Google Cloud's Agent Platform |
| v2.1.257 | `fable` resolves to Fable 5.1, except in Claude apps gateway sessions |
| v2.1.219 | `opus` resolves to Opus 5 on the Anthropic API, Claude Platform on AWS, Amazon Bedrock, and Agent Platform |
| v2.1.207 | `opus` resolves to Opus 4.8 on Claude Platform on AWS, Amazon Bedrock, and Agent Platform |
| v2.1.197 | `sonnet` resolves to Sonnet 5 on the Anthropic API |
| v2.1.154 | `opus` resolves to Opus 4.8 on the Anthropic API |
| Earlier | `opus` resolves to Opus 4.7 on Claude Platform on AWS and to Opus 4.6 on Amazon Bedrock and Agent Platform. `fable` resolves to Fable 5 and `haiku` resolves to Haiku 4.5 on every provider |

## Notes

- Example model IDs (`claude-opus-4-8`, `claude-opus-5-5`, `claude-sonnet-5`) are copied as they appear in the official page; the page itself uses `claude-opus-4-8` in the Pin models table and `claude-opus-5-5` in the pin and custom-option examples.
- This is a condensed reference; the official page is much longer (about 1050 lines as of 2026-10), notably the Surface coverage, organization restriction, and gateway context-window sections.

## Related

- [settings.md](./settings.md): where `model`, `availableModels`, `fallbackModel`, `effortLevel` live in the settings file
- [fast-mode.md](./fast-mode.md): the Opus-only fast mode toggle that interacts with model switching
- [statusline.md](./statusline.md): displaying the current model/effort in a status line
