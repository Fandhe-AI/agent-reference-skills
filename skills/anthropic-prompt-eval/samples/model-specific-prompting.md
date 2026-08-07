<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5 / last verified: 2026-08-07 -->

# Model-specific prompt adjustments: Fable 5 vs. Opus 5 vs. Sonnet 5

Contrast the conciseness and effort-tuning instructions recommended for Claude Fable 5, Claude Opus 5, and Claude Sonnet 5 on the same underlying task.

```python
import anthropic

client = anthropic.Anthropic()

# Claude Opus 5: response length runs long by default; effort does not shorten it.
# Prompt for conciseness explicitly, and constrain scope/subagent spawning.
opus5_system = """Keep responses focused, brief, and concise. Keep disclaimers and caveats
short, and spend most of the response on the main answer. When asked to explain
something, give a high-level summary unless an in-depth explanation is specifically
requested. Deliver what was asked, at the scope intended.
Delegate to a subagent only for large tasks that are genuinely independent and
parallelizable. Do not use subagents to verify or double-check your own work."""

opus5_response = client.messages.create(
    model="claude-opus-5",
    max_tokens=16000,
    system=opus5_system,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
)

# Claude Sonnet 5: adaptive thinking is on by default; effort defaults to "high".
# Positive concision examples outperform "don't" instructions; no temperature override.
sonnet5_system = """Provide concise, focused responses. Skip non-essential context,
and keep examples minimal."""

sonnet5_response = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=16000,
    system=sonnet5_system,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},  # raise to "xhigh" for the hardest coding tasks
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
    # temperature / top_p / top_k intentionally omitted: non-default values 400 on Sonnet-class models
)

# Claude Fable 5: long-horizon autonomous runs; curb over-deliberation and
# ground progress claims in tool evidence to avoid fabricated status reports.
fable5_system = """When you have enough information to act, act. Do not re-derive
facts already established, or narrate options you will not pursue.
Before reporting progress, audit each claim against a tool result from this
session. If something is not yet verified, say so explicitly."""
```

## Notes

- `effort` and `thinking` request-body mechanics (schema, allowed values, `max_tokens` interaction) are an anthropic-api-core topic; this sample shows only the prompting-level tuning.
- Non-default `temperature`/`top_p`/`top_k` returns a 400 error on Sonnet-class models (Sonnet 5+) — do not port `temperature` from Haiku/Opus samples onto Sonnet calls.
- Manual extended thinking (`budget_tokens`) is unsupported on Claude 4.7+ and Claude Fable 5 / Mythos 5; use `thinking: {"type": "adaptive"}` with `effort` instead.
- The code-review "report every issue" coverage prompt is shared verbatim between Sonnet 5 and Opus 4.8 guidance — it is not Sonnet-5-specific.
