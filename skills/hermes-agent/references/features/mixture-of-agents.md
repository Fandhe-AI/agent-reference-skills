# Mixture of Agents

Virtual model provider `moa`. Each named MoA preset appears as a selectable model. Reference models run first and provide analysis; the preset's aggregator is the acting model that writes the response and emits tool calls.

## Signature / Usage

```bash
/model default --provider moa
/model review --provider moa
/moa design and implement a migration plan for this flaky test cluster   # one-shot via the default preset

hermes moa list
hermes moa configure              # update the default preset
hermes moa configure review       # create or update a named preset
hermes moa delete review
```

```yaml
moa:
  default_preset: default
  presets:
    default:
      reference_models:
        - provider: openai-codex
          model: gpt-5.5
        - provider: openrouter
          model: deepseek/deepseek-v4-pro
      aggregator:
        provider: openrouter
        model: anthropic/claude-opus-4.8
      # reference_temperature: 0.6
      # aggregator_temperature: 0.4
      enabled: true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `moa.default_preset` | string | Preset used by `/moa` and `--provider moa` without a name |
| `reference_models[]` | list | `{provider, model, reasoning_effort?}` advisors, run without tool schemas |
| `aggregator` | map | `{provider, model, reasoning_effort?}` acting model; cannot be another MoA preset |
| `reference_temperature` / `aggregator_temperature` | float | Optional; omitted means the provider default |
| `enabled` | bool | `false` disables reference fan-out; aggregator acts alone |
| `fanout` | string | `user_turn` (default), `per_iteration`, `every_n:N` (N >= 2; mapping `{mode: every_n, n: 3}` also accepted); unknown values fall back to `user_turn` |
| `reasoning_effort` | string | Per slot: `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| `moa.privacy_filter` | string | `display` (redact UI blocks and saved traces) or `full` (also redact aggregator input); off by default |

## Notes

- The aggregator is billed for the whole tool loop; `hermes moa configure` / `list` print a notice when the aggregator provider differs from `model.provider`.
- Selectable on every surface: `/model <preset> --provider moa`, `hermes model`, Dashboard model picker, Desktop `MoA presets` dropdown. `/moa <prompt>` temporarily switches for one turn then restores your model; bare `/moa` prints usage.
- Loop: reference models see only conversation user/assistant text (no system prompt or tool transcript); outputs are appended as a trailing private-guidance user message; the aggregator is called with the normal tool schema; the process repeats each iteration per `fanout`.
- Per-slot output-token caps are no longer supported (provider-owned output limits). Prior to July 2026 the default cadence was `per_iteration`; it is now `user_turn`.
- Prompt cache of the main conversation is never broken. On OpenAI-compatible wires that reject adjacent user messages (`Conversation roles must alternate`), Hermes retries merged and remembers that destination for the session.
- MoA is not listed under `hermes tools`; there is no `moa` toolset. A reference credential failure does not abort the turn. A preset can be a fallback entry: `fallback_providers: [{provider: moa, model: <preset>}]`.
- Benchmark on HermesBench: opus-4.8 aggregating a gpt-5.5 reference 0.8202 vs `anthropic/claude-opus-4.8` 0.7607 vs `openai/gpt-5.5` 0.7412.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/mixture-of-agents (pinned to v0.22.2)

## Related

- Fallback Providers
- [Delegation](../automation/delegation.md)
