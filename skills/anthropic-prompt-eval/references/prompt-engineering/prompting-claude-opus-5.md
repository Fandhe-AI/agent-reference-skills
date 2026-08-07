<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5 / last verified: 2026-08-07 -->

# Prompting Claude Opus 5

Behavioral differences and prompting patterns for Claude Opus 5, covering response verbosity, agentic narration, task scoping, subagent delegation, self-correction, and output artifacts when thinking is disabled.

Claude Opus 5 is built for complex agentic coding and enterprise work with strengths in long-horizon agentic tasks, and performs well out of the box on existing Claude Opus 4.8 prompts.

## Capability improvements over Claude Opus 4.8

Agentic coding (multi-file features, larger refactors, completes full tasks rather than leaving stubs), code review/bug-finding (high precision and recall, holds at lower effort), efficiency at lower effort (`low`/`medium` produce strong quality at a fraction of the cost — re-run effort sweeps rather than carrying over old defaults), vision (chart/document/diagram understanding, UI replication — tool-assisted crop/verify is more cost-effective than thinking alone), long-context work (1M token context window as default and maximum), office/document tasks (multi-sheet spreadsheets, slide decks), and multi-agent coordination (effective writer-verifier patterns).

## Response length and verbosity

Default user-facing responses run longer than prior Opus models. The `effort` parameter controls thinking volume, not visible response length — lowering effort does not reliably shorten answers. Prompt for conciseness explicitly:

```text
Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and
spend most of the response on the main answer. When asked to explain something,
give a high-level summary unless an in-depth explanation is specifically requested.
```

## User-facing progress updates

Narrates readily during agentic work (announces upcoming actions, longer per-message output). To tune narration down, specify cadence: one-sentence pre-tool-call statement, brief updates only on important findings/direction changes, outcome-first final summary. To tune up, provide positive examples of the desired update style.

## Written deliverable length

Files Claude writes to disk (reports, docs, summaries) run longer than on prior models. Add explicit length calibration: match length to what the task needs, no padding/filler/boilerplate.

## Task scope and over-verification

Claude Opus 5 self-verifies without being told to. Remove explicit verification instructions ("include a final verification step," "use a subagent to verify") — they cause over-verification and wasted tokens with no quality gain. It can also expand task scope; constrain narrow tasks with an explicit "deliver what was asked, at the scope intended" instruction.

## Controlling subagent spawning

Delegates to subagents more readily than prior models — beneficial for large independent tracks, costly for small tasks. Give explicit criteria for when delegation is warranted or set deterministic spawn caps:

```text
Delegate to a subagent only for large tasks that are genuinely independent and
parallelizable, such as a wide multi-file investigation. Do not delegate work you
can finish yourself in a handful of tool calls, and do not use subagents to verify
or double-check your own work. If one subagent can complete the task, use one
rather than several, and keep spawn counts low.
```

## Self-correction

Catches and fixes its own mistakes well without prompting — avoid "double-check your answer" style instructions, which compound with existing self-correction behavior and add cost. It narrates corrections more than prior models; limit narration to corrections that change the user's code/conclusions/decisions.

## Running with thinking disabled

Thinking is on by default and can only be disabled at `effort` `high` or below. With thinking disabled, two artifacts can leak into visible output: (1) tool calls written as text instead of a structured `tool_use` block (the call never runs, and the leaked text persists in later-turn history), and (2) internal `<thinking>` or other XML tags appearing in the response. Primary mitigation is to keep thinking enabled at a lower effort instead of disabling it — thinking-enabled at `low` effort typically outperforms thinking-disabled at similar cost. If thinking must stay disabled:

```text
When you use a tool, you may say a brief sentence first. If no tool can express
what the user asked for, say so instead of guessing. Do not include internal or
system XML tags in your response.
```

Naming thinking tags specifically in instructions is less effective than this general form.

## Notes

- `effort` and `thinking` are anthropic-api-core parameters; this page covers behavioral tuning only, not the parameter schema.

## Related

- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [prompting-claude-opus-4-8](./prompting-claude-opus-4-8.md)
- [prompting-claude-fable-5](./prompting-claude-fable-5.md)
