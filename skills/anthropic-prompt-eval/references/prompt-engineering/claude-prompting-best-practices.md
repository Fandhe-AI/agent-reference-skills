<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices / last verified: 2026-08-07 -->

# Prompting best practices

Comprehensive guide to prompt engineering techniques for Claude's latest models, covering clarity, examples, XML structuring, thinking, and agentic systems.

The living reference for Claude Fable 5, Claude Mythos 5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5, Claude Sonnet 4.6, and Claude Haiku 4.5. Organized as: model-specific guidance (see `prompting-claude-fable-5.md`, `prompting-claude-sonnet-5.md`, `prompting-claude-opus-5.md`, `prompting-claude-opus-4-8.md`) → techniques for all current models → migration considerations.

## General principles

### Be clear and direct

Claude responds well to clear, explicit instructions. Be specific about desired output format and constraints; provide steps as numbered lists or bullets when order/completeness matters. Golden rule: show the prompt to a colleague with minimal context and ask them to follow it — if they'd be confused, Claude will be too.

### Add context to improve performance

Explaining *why* a behavior matters (for example, "your response will be read by a text-to-speech engine, so never use ellipses") helps Claude generalize correctly instead of following instructions rigidly out of context.

### Use examples effectively

Few-shot / multishot prompting (3-5 examples) is one of the most reliable ways to steer format, tone, and structure. Examples should be relevant, diverse (covering edge cases), and structured in `<example>` tags (`<examples>` for multiple).

### Structure prompts with XML tags

Wrap distinct content types (`<instructions>`, `<context>`, `<input>`) in their own tags so Claude parses complex prompts unambiguously. Use consistent tag names; nest tags for natural hierarchies (for example, `<documents>` containing `<document index="n">`).

### Give Claude a role

Setting a role in the `system` prompt focuses tone and behavior, even with a single sentence:

```python
message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    system="You are a helpful coding assistant specializing in Python.",
    messages=[{"role": "user", "content": "How do I sort a list of dictionaries by key?"}],
)
```

### Long context prompting (20k+ tokens)

- **Put longform data at the top**, above the query/instructions/examples — queries at the end can improve response quality up to 30% on complex multidocument inputs.
- **Structure documents with XML**: wrap each document in `<document>` with `<document_content>` / `<source>` subtags.
- **Ground responses in quotes**: ask Claude to quote relevant document parts before carrying out the task, to focus it on relevant content.

### Model self-knowledge

To have Claude identify itself correctly: `"The assistant is Claude, created by Anthropic. The current model is Claude Opus 5."` For apps that need to specify model strings: state the exact API string (for example, `claude-opus-5`) explicitly.

## Output and formatting

### Communication style and verbosity

Claude's latest models are more direct, conversational, and less verbose by default — may skip post-tool-call summaries. To restore visibility: `"After completing a task that involves tool use, provide a quick summary of the work you've done."` Claude Opus 5 is an exception: its default responses run longer and `effort` does not reliably shorten them — prompt explicitly for conciseness instead (see `prompting-claude-opus-5.md`).

### Control the format of responses

1. Tell Claude what to do instead of what not to do ("Write flowing prose paragraphs" rather than "Do not use markdown").
2. Use XML format indicators (for example, `<smoothly_flowing_prose_paragraphs>` tags).
3. Match prompt style to desired output style (markdown in the prompt tends to produce markdown in the output).
4. For strict control, provide a detailed formatting block, for example an `<avoid_excessive_markdown_and_bullet_points>` instruction block that bans unordered lists and bold/italics except where explicitly warranted.

### LaTeX output

Claude's latest models default to LaTeX for math. To force plain text: instruct it to avoid LaTeX/MathJax markup (`\( \)`, `$`, `\frac{}{}`) and use standard characters (`/`, `*`, `^`).

### Document creation

Claude's latest models create presentations, animations, and visual documents reliably on the first try. Prompt for "thoughtful design elements, visual hierarchy, and engaging animations where appropriate."

### Migrating away from prefilled responses

Starting with Claude 4.6 models and Claude Mythos Preview, prefilling the last assistant turn is **no longer supported** (400 error). Earlier models still support it; assistant messages elsewhere in the conversation are unaffected. Migration paths:

| Old prefill use | Migration |
| --- | --- |
| Force output format (JSON/YAML, classification) | Use [Structured Outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs); instruct schema conformance directly |
| Eliminate preambles | System-prompt instruction to skip "Here is…" phrasing; or use structured outputs / tool calling; strip in post-processing if needed |
| Avoid bad refusals | Claude handles appropriate refusals better now; clear prompting without prefill suffices |
| Continuations | Move continuation to the user message, quoting the interrupted text and asking Claude to continue from there |
| Context hydration / role consistency | Inject reminders into the user turn instead; for agentic systems consider hydrating via tools or during context compaction |

## Tool use

### Tool usage

Claude's latest models follow instructions precisely — "can you suggest changes" may produce suggestions rather than action. Be explicit ("Change this function to improve its performance") for Claude to act. To make the model proactive by default, add a `<default_to_action>` system-prompt block. To make it more conservative by default, add a `<do_not_act_before_instructions>` block. Claude Opus 4.5/4.6 are more responsive to the system prompt — dial back aggressive language ("CRITICAL: You MUST…") to avoid overtriggering.

### Optimize parallel tool calling

Claude's latest models run independent tool calls in parallel by default. To push toward ~100% parallel execution, add a `<use_parallel_tool_calls>` instruction block describing when calls are independent vs. dependent. To reduce parallelism, instruct sequential execution with brief pauses.

## Thinking and reasoning

### Overthinking and excessive thoroughness

Claude Opus 4.6 does more upfront exploration, especially at higher [effort](https://platform.claude.com/docs/en/build-with-claude/effort). Replace blanket "default to using [tool]" instructions with targeted ones ("use [tool] when it would enhance your understanding"); remove over-prompting like "if in doubt, use [tool]"; use lower `effort` as a fallback if the model remains overly aggressive.

### Leverage thinking and interleaved thinking

Claude 4.6+ and Claude Mythos Preview use [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) (`thinking: {type: "adaptive"}`), calibrated by the `effort` parameter and query complexity. On Claude Fable 5 / Claude Mythos 5, thinking is always on. Older models use manual [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) with `budget_tokens` (deprecated on Opus 4.6/Sonnet 4.6, a 400 error on Claude 4.7+). Migration example:

```python
# Before: manual budget (older models)
client.messages.create(
    model="claude-sonnet-4-5-20250929", max_tokens=16000,
    thinking={"type": "enabled", "budget_tokens": 10000},
    messages=[{"role": "user", "content": "..."}],
)

# After: adaptive thinking with effort
client.messages.create(
    model="claude-opus-4-8", max_tokens=16000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
```

Notes: thinking triggering is promptable (steer down with a "thinking adds latency, respond directly when in doubt" instruction). Prefer general instructions ("think thoroughly") over prescriptive step-by-step plans. Multishot examples can include `<thinking>` tags to demonstrate reasoning style. Ask Claude to self-check against test criteria before finishing — except on Claude Opus 5, where this is unnecessary and can cause over-verification (see `prompting-claude-opus-5.md`). Structured outputs and adaptive thinking are covered further in anthropic-api-core.

### Note on effort and thinking parameters

Detailed configuration of `effort`, `thinking`, and `output_config` is an anthropic-api-core topic; see that skill for parameter reference.

## Agentic systems

### Long-horizon reasoning and state tracking

Claude Sonnet 5, Sonnet 4.6, Sonnet 4.5, and Haiku 4.5 support [context awareness](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-awareness) (tracking remaining token budget). For harnesses that compact context, tell Claude explicitly that context is auto-compacted so it does not stop tasks early. The [memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) pairs well with context awareness.

For multi-context-window workflows: use a distinct first-window prompt to set up scaffolding (tests, setup scripts); have Claude write tests to a structured file (`tests.json`); create quality-of-life scripts (`init.sh`); prefer starting fresh over compaction when Claude can rediscover state from the filesystem/git; provide verification tools (for example Playwright MCP); encourage full context usage without leaving uncommitted work.

State management: use structured formats (JSON) for status data, unstructured text for progress notes, and git for state tracking/checkpoints across sessions.

### Balancing autonomy and safety

Without guidance, Claude Opus 4.6 may take hard-to-reverse actions (deleting files, force-pushing). Add explicit confirmation guidance listing destructive operations (`rm -rf`, `git push --force`, `git reset --hard`) and operations visible to others (pushing code, commenting on PRs, sending messages) that should require confirmation.

### Research and information gathering

Provide clear success criteria, encourage multi-source verification, and for complex research use a structured hypothesis-tracking approach (competing hypotheses, confidence levels in progress notes, self-critique).

### Subagent orchestration

Claude's latest models delegate to subagents proactively when tools are well-defined. Claude Opus 4.6 (and Opus 5) can over-spawn subagents for simple tasks a direct tool call would handle faster; add explicit guidance on when subagents are/aren't warranted if you observe overuse.

### Chain complex prompts

Explicit prompt chaining (breaking a task into sequential API calls) is still useful to inspect intermediate outputs or enforce a pipeline. The most common pattern is self-correction: draft → review against criteria → refine, each as a separate API call.

### Reduce file creation in agentic coding

Claude may create temporary scratchpad files during iteration. To minimize net-new files, instruct cleanup at the end of the task.

### Overeagerness

Claude Opus 4.5/4.6 can overengineer (extra files, unneeded abstractions). Add explicit minimal-scope guidance covering scope, documentation, defensive coding, and abstractions.

### Avoid focusing on passing tests and hardcoding

Instruct Claude to implement general, principled solutions rather than test-specific workarounds or helper-script hacks, and to flag unreasonable or incorrect tests instead of working around them.

### Minimizing hallucinations in agentic coding

Add an `<investigate_before_answering>` instruction requiring Claude to read referenced files before making claims about code.

## Capability-specific tips

### Improved vision capabilities

Claude Opus 4.5/4.6 have improved multi-image and computer-use vision. Giving Claude a crop tool or an [agent skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) to "zoom" into image regions consistently improves image-evaluation performance.

### Frontend design

Without guidance, models can default to generic "AI slop" aesthetics. A `<frontend_aesthetics>` system-prompt block covering typography, color/theme, motion, and backgrounds — explicitly avoiding overused fonts (Inter, Roboto, Arial), purple gradients, and predictable layouts — improves distinctiveness. See the public frontend-design skill (`github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md`) for the full definition.

## Migration considerations

When migrating to current Claude models: be specific about desired behavior; frame instructions with quality/detail modifiers; request animations/interactivity explicitly; update thinking configuration to adaptive thinking + `effort` (see [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort), an anthropic-api-core topic); migrate away from prefilled responses (see above); dial back anti-laziness prompting tuned for older models. See the Migration guide (`/docs/en/about-claude/models/migration-guide`) for detailed steps, and "Migrating to Claude Sonnet 5 from Claude Sonnet 4.5 or earlier" for the effort-default change and removal of manual extended thinking.

## Notes

- Parameter-level detail for `thinking`, `effort`, and `output_config` (schemas, request/response shapes) belongs to anthropic-api-core; this page covers prompting technique only.

## Related

- [prompting-claude-fable-5](./prompting-claude-fable-5.md)
- [prompting-claude-sonnet-5](./prompting-claude-sonnet-5.md)
- [prompting-claude-opus-5](./prompting-claude-opus-5.md)
- [prompting-claude-opus-4-8](./prompting-claude-opus-4-8.md)
- [overview](./overview.md)
