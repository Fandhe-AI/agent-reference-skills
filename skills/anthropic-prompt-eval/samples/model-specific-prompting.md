<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5, https://platform.claude.com/docs/en/about-claude/model-deprecations / last verified: 2026-10-17 -->

# Model-specific prompt adjustments: Fable 5 / 5.1 vs. Opus 5 / 5.5 vs. Sonnet 5 / 5.5 vs. Haiku 5.5

Contrast the conciseness, scope, and effort-tuning instructions recommended for each current Claude model on the same underlying task.

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
    model="claude-sonnet-5",
    max_tokens=16000,
    system=sonnet5_system,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},  # raise to "xhigh" for the hardest coding tasks
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
    # temperature / top_p / top_k intentionally omitted: non-default values 400 on Sonnet 5
)

# Claude Fable 5: long-horizon autonomous runs; curb over-deliberation and
# ground progress claims in tool evidence to avoid fabricated status reports.
fable5_system = """When you have enough information to act, act. Do not re-derive
facts already established, or narrate options you will not pursue.
Before reporting progress, audit each claim against a tool result from this
session. If something is not yet verified, say so explicitly."""

# Claude Fable 5.1: default effort is "high". Without a nudge it may end a turn by
# describing the next step ("Next, I'll ...") or by asking permission for work the
# request already covered. The first paragraph of the official autonomy block:
fable51_system = """You are operating autonomously. The user is not watching in real time and cannot answer questions mid-task, so asking 'Want me to…?' or 'Shall I…?' will block the work. For reversible actions that follow from the original request, proceed without asking. Stop only for destructive actions or genuine scope changes the user must decide. Offering follow-ups after the task is done is fine; asking permission before doing the work is not."""

fable51_response = client.messages.create(
    model="claude-fable-5-1",
    max_tokens=16000,
    system=fable51_system,
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
)

# Claude Opus 5.5: default effort is "medium" (Opus 5 defaults to "high"); set it explicitly.
# Early stops and scope are steered by naming the behavior; thinking is always on.
opus55_system = """Before taking any action, explore broadly with tool calls: list and open the emails, documents, spreadsheet tabs and records across the available apps that could be relevant to this task, including ones the task does not explicitly mention, and use what you find."""

opus55_response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
    system=opus55_system,
    output_config={"effort": "medium"},
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
)

# Claude Sonnet 5.5: effort levels are recalibrated vs. Sonnet 5; re-sweep on your own evals.
# At low/medium effort on agentic tasks it may check in early; this keeps it working
# and limits scope to what was asked.
sonnet55_system = """Keep working until everything the user asked for is done, and only stop to ask when you can't go on without the user or before a risky step.

When the work the user asked for is done and checked, stop and report. Don't add features, tests, files, docs or refactors that weren't asked for. If you think one would help, mention it at the end instead of doing it."""

sonnet55_response = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=16000,
    system=sonnet55_system,
    output_config={"effort": "medium"},
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
)

# Claude Haiku 5.5: first Haiku with effort levels (replaces Haiku 4.5 budget_tokens).
# Default is "medium"; "low" is the cheapest level but more likely to stop early in
# long agent prompts. Thinking counts toward max_tokens, so leave room for it.
haiku55_system = """Keep working until everything the user asked for is done, and only stop to ask when you can't go on without the user or before a risky step.
When the work the user asked for is done and checked, stop and report. Don't add new features, docs, or refactors that weren't asked for. If you think one would help, mention it at the end instead of doing it."""

haiku55_response = client.messages.create(
    model="claude-haiku-5-5",
    max_tokens=16000,
    system=haiku55_system,
    output_config={"effort": "low"},
    messages=[{"role": "user", "content": "Review this pull request diff for bugs."}],
)
```

## Notes

- `effort` and `thinking` request-body mechanics (schema, allowed values, `max_tokens` interaction) are an anthropic-api-core topic; this sample shows only the prompting-level tuning. Effort level names do not map to the same amount of thinking across models (Fable 5.1, Opus 5.5, and Sonnet 5.5 pages all say to re-sweep on your own evals).
- Non-default `temperature` / `top_p` / `top_k` returns a 400 error on Claude 4.7 and later models and Claude Mythos Preview (model-deprecations page); this includes Sonnet 5, Sonnet 5.5, Opus 5 / 5.5, Fable, and Haiku 5.5. Do not port `temperature` from Haiku 4.5 samples.
- Manual extended thinking (`budget_tokens`) returns a 400 error on Claude 4.7 and later models; use `effort` (and adaptive thinking where the model supports it) instead. Haiku 5.5 effort replaces the Haiku 4.5 thinking budget.
- Opus 5.5 does not accept `thinking: {"type": "disabled"}` (Opus 5 does at `high` effort or below); the Haiku 5.5 doc says `disabled` works only at `low` / `medium` / `high`, and Sonnet 5.5 uses `between_tools` as its lowest thinking setting. Add system-prompt text to stored conversations only at the start: changing `system` mid-conversation can invalidate thinking blocks (400 error).
- The code-review "report every issue" coverage prompt is shared verbatim between Sonnet 5 and Opus 4.8 guidance — it is not Sonnet-5-specific. The "Keep working until everything the user asked for is done" paragraphs are near-identical in the Sonnet 5.5 and Haiku 5.5 guides (wording differs slightly in the second paragraph).
