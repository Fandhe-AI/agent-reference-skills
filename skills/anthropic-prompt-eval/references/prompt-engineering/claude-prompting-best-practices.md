<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices / last verified: 2026-10-17 -->

# Prompting best practices

Comprehensive guide to prompt engineering techniques for Claude's latest models, covering clarity, examples, XML structuring, thinking, and agentic systems.

The living reference for Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Opus 5.5, Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5.5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Haiku 5.5, and Claude Haiku 4.5. Organized as: model-specific guidance → techniques for all current models → migration considerations.

## Model-specific guidance

Each of these models has its own prompting page. Read the one for your model first, then the techniques that follow.

| Model | Guide | What's different |
| --- | --- | --- |
| Claude Fable 5.1 and Claude Mythos 5.1 | [prompting-claude-fable-5-1](./prompting-claude-fable-5-1.md) | Differences from Claude Fable 5: effort levels, finishing long tasks, user-facing progress updates, passing thinking blocks back unchanged, tool-call batching in agent loops, search triggering at low effort, formatting, and writing density. |
| Claude Fable 5 and Claude Mythos 5 | [prompting-claude-fable-5](./prompting-claude-fable-5.md) | Differences from Claude Opus 4.8: effort levels, instruction following, long-run progress claims, memory systems, and the `reasoning_extraction` refusal category. |
| Claude Sonnet 5.5 | [prompting-claude-sonnet-5-5](./prompting-claude-sonnet-5-5.md) | Differences from Claude Sonnet 5: effort calibration, initiative and scope, running without up-front thinking, JSON output on reasoning tasks, user-facing progress updates, tool use in chat, mid-turn user messages, verification on coding tasks, tool-call handling, complex visual inputs, and safeguard refusals. |
| Claude Sonnet 5 | [prompting-claude-sonnet-5](./prompting-claude-sonnet-5.md) | Differences from Claude Sonnet 4.6: response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, and design and frontend defaults. |
| Claude Opus 5.5 | [prompting-claude-opus-5-5](./prompting-claude-opus-5-5.md) | Differences from Claude Opus 5: effort calibration, prompts written for thinking disabled, user-facing progress updates, safeguard refusals, and tools for complex visual inputs. |
| Claude Opus 5 | [prompting-claude-opus-5](./prompting-claude-opus-5.md) | Differences from prior Opus models: response length and verbosity, user-facing progress updates, written deliverable length, task scope and over-verification, subagent control, and self-correction. |
| Claude Opus 4.8 | [prompting-claude-opus-4-8](./prompting-claude-opus-4-8.md) | Response length, effort and thinking-depth calibration, tool use triggering, literal instruction following, subagent control, and design and frontend defaults. |
| Claude Haiku 5.5 | [prompting-claude-haiku-5-5](./prompting-claude-haiku-5-5.md) | Differences from Claude Haiku 4.5: effort levels, search, JSON output with your own tools, early stopping in long agent prompts, verification on coding tasks, mid-turn user messages, system prompt adherence in chatbots, and safeguard refusals. |

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
    model="claude-opus-5-5",
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

To have Claude identify itself correctly: `"The assistant is Claude, created by Anthropic. The current model is Claude Opus 5.5."` For apps that need to specify model strings: state the exact API string (for example, `claude-opus-5-5`) explicitly.

## Output and formatting

### Communication style and verbosity

Claude's latest models are more direct, conversational, and less verbose by default — may skip post-tool-call summaries. To restore visibility: `"After completing a task that involves tool use, provide a quick summary of the work you've done."` Claude Opus 5 is an exception: its default responses run longer and `effort` does not reliably shorten them — prompt explicitly for conciseness instead (see `prompting-claude-opus-5.md`). Claude Fable 5.1 has the opposite tendency during agentic work: it writes fewer user-facing updates between tool calls. Ask for progress text explicitly, and remove any instruction telling it to keep that text brief (see `prompting-claude-fable-5-1.md`).

### Control the format of responses

1. Tell Claude what to do instead of what not to do ("Write flowing prose paragraphs" rather than "Do not use markdown").
2. Use XML format indicators (for example, `<smoothly_flowing_prose_paragraphs>` tags).
3. Match prompt style to desired output style (markdown in the prompt tends to produce markdown in the output).
4. For strict control, provide a detailed formatting block, for example an `<avoid_excessive_markdown_and_bullet_points>` instruction block that bans unordered lists and bold/italics except where explicitly warranted. Claude Fable 5.1 already formats less than earlier models, so on that model a block like this can suppress structure the content needs; remove it, or replace it with the shorter rule in the "Formatting in chat" section of `prompting-claude-fable-5-1.md`.

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

Claude's latest models run independent tool calls in parallel by default. To push toward ~100% parallel execution, add a `<use_parallel_tool_calls>` instruction block describing when calls are independent vs. dependent. To reduce parallelism, instruct sequential execution with brief pauses. On Claude Fable 5.1 in long agent loops, send the parallel-calls instruction as a turn-scoped system message after each round of tool results (see "Batch independent tool calls in agent loops" in `prompting-claude-fable-5-1.md`).

## Thinking and reasoning

### Overthinking and excessive thoroughness

Claude Opus 4.6 does more upfront exploration, especially at higher [effort](https://platform.claude.com/docs/en/build-with-claude/effort). Replace blanket "default to using [tool]" instructions with targeted ones ("use [tool] when it would enhance your understanding"); remove over-prompting like "if in doubt, use [tool]"; use lower `effort` as a fallback if the model remains overly aggressive.

### Leverage thinking and interleaved thinking

Claude 4.6+ and Claude Mythos Preview use [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) (`thinking: {type: "adaptive"}`), calibrated by the `effort` parameter and query complexity. On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, and Claude Opus 5.5, thinking is always on and adaptive thinking is the only mode. Older models use manual [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) with `budget_tokens` (deprecated on Opus 4.6/Sonnet 4.6, a 400 error on Claude 4.7+). Migration example:

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

If you are not using extended thinking, you don't need to add a `thinking` parameter. Defaults when `thinking` is omitted:

- Claude Opus 4.6 through Claude Opus 4.8 and Claude Sonnet 4.6: thinking is off.
- Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, and Claude Haiku 5.5: thinking is on by default, so a response can begin with `thinking` blocks. Select content blocks by `type` rather than by position, and leave room in `max_tokens` for thinking.
- Claude Opus 5 and Claude Haiku 5.5: can disable thinking only at effort `high` or lower.
- Claude Sonnet 5.5: the lowest thinking setting is `between_tools`, accepted at effort `high` or lower.
- Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, and Claude Opus 5.5: thinking is always on, regardless of whether you set the `thinking` parameter.

Notes: thinking triggering is promptable (steer down with a "thinking adds latency, respond directly when in doubt" instruction). Prefer general instructions ("think thoroughly") over prescriptive step-by-step plans. Multishot examples can include `<thinking>` tags to demonstrate reasoning style. When thinking is off, manual chain-of-thought prompting (think through the problem, put the final answer in `<answer>` tags) is a fallback; on Claude Fable 5.1, Claude Fable 5, Claude Opus 5.5, Claude Opus 5, and Claude Sonnet 5.5, rely on thinking instead (at a lower `effort` if cost or latency matters), because a prompt that asks the model to write out its reasoning, for example in `<thinking>` tags, may be declined (`reasoning_extraction` refusal category; see "Keep reasoning in thinking blocks" in the official refusals-and-fallback page). Ask Claude to self-check against test criteria before finishing — except on Claude Opus 5, where this is unnecessary and can cause over-verification (see `prompting-claude-opus-5.md`). Structured outputs and adaptive thinking are covered further in anthropic-api-core.

### Note on effort and thinking parameters

Detailed configuration of `effort`, `thinking`, and `output_config` is an anthropic-api-core topic; see that skill for parameter reference.

## Agentic systems

### Long-horizon reasoning and state tracking

Claude Sonnet 5, Sonnet 4.6, Sonnet 4.5 (deprecated), and Haiku 4.5 support [context awareness](https://platform.claude.com/docs/en/build-with-claude/context-windows#context-awareness) (tracking remaining token budget). For harnesses that compact context, tell Claude explicitly that context is auto-compacted so it does not stop tasks early. The [memory tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool) pairs well with context awareness.

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

### Medication dosing

If people might ask your application about medicine doses, add the block below for the model your application calls to your system prompt, exactly as written. The block has Claude give a child's dose of an over-the-counter medicine from the product's label, not from memory. With web search, such as the web search tool, Claude checks the label before answering, which adds latency and search costs. Without web search, Claude points the person to the label's dosing chart, a pharmacist, or the child's doctor instead of giving a dose.

Representative block (Claude Sonnet 5.5):

```text
<medical_guidance>
This applies only when the person explicitly says the medicine is for a child, and isn't a healthcare professional asking for work.
Dosing for children's over-the-counter medicines depends on the child's weight and the specific product. For infants and toddlers, a small error can cause real harm. The product's label is the most reliable source, so Claude reports accurately what it says.
If neither the child's age or weight is given, Claude asks for both. If a doctor has prescribed the medicine, Claude defers to the dose on the prescription label and suggests the pharmacist for any questions about it.
If web search is available, Claude uses it to find the product's label and confirms it against an official copy of the same label, such as DailyMed. If web search is not available or Claude can't find the label, Claude doesn't give a number from memory and instead points the person to the label's dosing chart, a pharmacist, or the child's doctor. Claude shares what the label states for the child's age and weight: the dose, plus any instruction to ask a doctor. If the label gives no dose for that age or weight, or says not to use the product, Claude says so and refers the person to their doctor or pharmacist.
</medical_guidance>
```

The official page has a separate block for each of Claude Sonnet 5.5, Claude Haiku 5.5, Claude Sonnet 4.6, and Claude Haiku 4.5; use the block for the model you call. Differences from the Sonnet 5.5 block:

- Claude Haiku 5.5: says "age or weight" (not "weight") in the dosing sentence and "child's age or weight" in the label sentence; adds a final line: if someone mentions emotional distress or a difficult experience and asks about a medication's dose or limit, Claude should not provide the requested information and should instead address the underlying emotional distress.
- Claude Sonnet 4.6 and Claude Haiku 4.5: stricter wording that states no amount, dose, dosing table, or typical range for a child unless the product's label is in the conversation (including numbers remembered or computed from weight). The Haiku 4.5 block also says Claude gives adults asking about their own medicine the standard dose as usual, and does not look up or work out a dose when a doctor has prescribed the medicine for a child.

## Migration considerations

When migrating to current Claude models from earlier generations:

1. **Be specific about desired behavior.**
2. **Frame your instructions with modifiers** that encourage higher quality and detail (for example, "Include as many relevant features and interactions as possible. Go beyond the basics").
3. **Request specific features explicitly:** animations and interactive elements should be requested explicitly when desired.
4. **Update thinking configuration:** Claude 4.6 and later models use adaptive thinking (`thinking: {type: "adaptive"}`) instead of manual thinking with `budget_tokens`. On Claude 4.7 and later models, setting `budget_tokens` returns a 400 error. Use the [effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort) (an anthropic-api-core topic) to control thinking depth.
5. **Migrate away from prefilled responses:** prefilled responses on the last assistant turn are no longer supported starting with Claude 4.6 models and Claude Mythos Preview (see above).
6. **Tune anti-laziness prompting:** if your prompts previously encouraged more thoroughness or more aggressive tool use, dial back that guidance. Claude 4.6 models are more proactive and may overtrigger on instructions that were needed for previous models.
7. **Pass thinking blocks back unchanged and keep history append-only:** append each assistant turn exactly as the API returned it, thinking blocks included. On Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5, and Claude Haiku 5.5, modifying the conversation before a thinking block results in an error, or in the block being dropped if you opt into that: editing earlier messages, rebuilding `system` or `tools`, or summarizing older turns in place between requests invalidates every later thinking block, so move those changes to mid-conversation system messages and server-side context management (see "Keep the conversation history append-only" in `prompting-claude-fable-5-1.md`).

For detailed migration steps, see the Migration guide (`/docs/en/about-claude/models/migration-guide`).

### Migrating to Claude Sonnet 5.5

See the Claude Sonnet 5.5 migration guide (`/docs/en/models/sonnet-5-5/migration-guide`). It covers the breaking changes for code written for Claude Sonnet 5 and the steps from Claude Sonnet 4.6 and earlier, including the removal of manual extended thinking (`budget_tokens`).

## Notes

- Parameter-level detail for `thinking`, `effort`, and `output_config` (schemas, request/response shapes) belongs to anthropic-api-core; this page covers prompting technique only.

## Related

- [prompting-claude-fable-5-1](./prompting-claude-fable-5-1.md)
- [prompting-claude-fable-5](./prompting-claude-fable-5.md)
- [prompting-claude-sonnet-5-5](./prompting-claude-sonnet-5-5.md)
- [prompting-claude-sonnet-5](./prompting-claude-sonnet-5.md)
- [prompting-claude-opus-5-5](./prompting-claude-opus-5-5.md)
- [prompting-claude-haiku-5-5](./prompting-claude-haiku-5-5.md)
- [prompting-claude-opus-5](./prompting-claude-opus-5.md)
- [prompting-claude-opus-4-8](./prompting-claude-opus-4-8.md)
- [overview](./overview.md)
