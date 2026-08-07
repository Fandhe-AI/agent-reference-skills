<!-- source: https://code.claude.com/docs/en/advisor / last verified: 2026-08-07 -->

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
| Haiku 4.5 | Fable, Opus, Sonnet |
| Sonnet 4.6 | Fable, Opus, Sonnet |
| Sonnet 5 | Fable, Opus, Sonnet 5 |
| Opus 4.6 | Fable, Opus, Sonnet 5 |
| Opus 4.7+ | Fable, Opus 4.7+ |
| Fable 5 | Fable only |

## Notes

- Fable 5 is not currently offered as the advisor even where the pairing table allows it (`/advisor fable` is rejected) — a remote rollout controls when it returns.
- Claude decides when to call the advisor; there's no cap or force setting — ask for a consultation in your prompt if needed.
- Advisor tokens bill at the advisor model's rates in addition to the main model's usage; counts toward `/usage` and plan limits.
- Toggling `/advisor` mid-session does not invalidate the main model's prompt cache.
- Requires a supported main model: Opus 4.6+, Sonnet 4.6+, or Haiku 4.5 (Fable 5 also qualifies on v2.1.170+).
- `CLAUDE_CODE_DISABLE_ADVISOR_TOOL=1` disables the tool entirely; `/advisor` becomes unavailable and `advisorModel` is ignored.
- Compare with `opusplan` (stronger model during plan mode only), subagents with `model` set (stronger model for a whole delegated subtask), and `/model` (switches for all subsequent turns).

## Related

- [tools-reference.md](./tools-reference.md) — the advisor has no tool name usable in permission rules, unlike every other tool listed there
