<!-- source: https://code.claude.com/docs/en/advisor / last verified: 2026-10-17 -->

# Advisor tool

Experimental server-side tool that pairs the main model with a stronger advisor model Claude consults at key moments — before committing to an approach, when stuck on a recurring error, or before declaring a task complete. The advisor receives the full conversation, including every tool call and result, and returns guidance Claude applies before continuing. Anthropic API only; not available on Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry.

## Signature / Usage

```bash
/advisor opus
claude --advisor opus
```

```json
{ "advisorModel": "opus" }
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/advisor [model\|off]` | command | Set/change the advisor mid-session and save as default; no argument opens a picker |
| `advisorModel` | setting | Persistent default advisor model in a settings file |
| `--advisor <model>` | CLI flag | Advisor for a single session only; not listed in `claude --help` |

Accepted advisor per main model (advisor must be at least as capable as the main model):

| Main model | Accepted advisors |
| --- | --- |
| Haiku 4.5 | Fable, Opus, Sonnet, Haiku 5.5 |
| Sonnet 4.6 | Fable, Opus, Sonnet, Haiku 5.5 |
| Opus 4.6 | Fable, Opus, Sonnet 5 or later, Haiku 5.5 |
| Sonnet 5 or Haiku 5.5 | Fable, Opus 4.7 or later, Sonnet 5 or later, Haiku 5.5 |
| Opus 4.7 or Opus 4.8 | Fable, Opus 4.7 or later, Sonnet 5.5 |
| Sonnet 5.5 | Fable, Opus 5 or later, Sonnet 5.5 |
| Opus 5 or Opus 5.5 | Fable, Opus 5 or later |
| Fable 5 | Fable 5.1 or Fable 5 |
| Fable 5.1 | Fable 5.1 |

Fable 5.1 requires Claude Code v2.1.257+. Sonnet 5.5 as the advisor for an Opus 4.7 / 4.8 main model requires v2.1.287+. Haiku 5.5 as the main model or as the advisor requires v2.1.293+. Fable models require Fable access. Haiku 4.5 can call the advisor but can't act as one.

## Notes

- Fable advisor and usage credits: on some plans, Fable as the advisor needs the one-time consent to bill Fable usage to usage credits. Before consent, `/advisor fable` (or picking Fable in the picker) is not saved and points to `/model fable`; `claude --advisor fable` exits at launch with a message pointing to `/model fable` (a background session starts without the advisor instead). With Fable already saved as `advisorModel`, requests are sent without the advisor.
- `/advisor` also works in `-p`, the Agent SDK, the desktop app and Remote Control (v2.1.260+); with no argument it prints the current advisor and accepted aliases. A saved advisor excluded by the organization's `availableModels` allowlist is not invoked.
- `--advisor` exits with an error at launch if: the main model doesn't support the advisor; the requested model (e.g. Haiku 4.5) can't act as an advisor; `availableModels` excludes the model; or Fable was requested while the usage-credits consent is still required. A background session started with `--advisor` starts without the advisor instead of exiting.
- Transcript display: an `Advising` line while in progress, then **Reviewed** (Ctrl+O reads guidance), **Declined** (`Advisor declined to advise on this request`) or **Unavailable** (`Advisor unavailable (<error_code>)`).
- Subagents inherit the configured advisor and apply the same pairing check against their own model.
- Claude decides when to call the advisor; there's no cap or force setting — ask for a consultation in your prompt if needed.
- Advisor tokens bill at the advisor model's rates in addition to the main model's usage; counts toward `/usage` and plan limits.
- Toggling `/advisor` mid-session does not invalidate the main model's prompt cache.
- Requires a supported main model: Fable, Opus 4.6+, Sonnet 4.6+, Haiku 4.5, or Haiku 5.5.
- Requires feature-flag fetching: the advisor is turned on through a feature flag fetched from Anthropic, so it stays off when a variable that turns flag fetching off (such as `DISABLE_TELEMETRY`) is set.
- `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` disables the tool entirely; `/advisor` becomes unavailable and `advisorModel` is ignored.
- Compare with `opusplan` (stronger model during plan mode only), subagents with `model` set (stronger model for a whole delegated subtask), and `/model` (switches for all subsequent turns).

## Related

- [tools-reference.md](./tools-reference.md) — the advisor has no tool name usable in permission rules, unlike every other tool listed there
