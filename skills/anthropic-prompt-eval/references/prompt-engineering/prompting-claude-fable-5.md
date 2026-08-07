<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5 / last verified: 2026-08-07 -->

# Prompting Claude Fable 5

Behavioral differences and prompting patterns for Claude Fable 5 and Claude Mythos 5, covering effort, instruction following, long runs, memory, and scaffolding changes.

Claude Fable 5 handles problems that were previously too complex, long-running, or ambiguous for prior models, and is particularly effective at end-to-end work spanning hours, days, or weeks. Test it against your hardest unsolved problems rather than only simpler workloads. It runs safety classifiers targeting offensive cybersecurity, biology/life-sciences content, and extraction of the model's summarized thinking; benign work in those domains can also trigger declines — configure [server-side or client-side fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback) to Claude Opus 4.8 for automatic re-routing.

## Capability improvements over Claude Opus 4.8

Long-horizon autonomy (multiday goal-directed runs), first-shot correctness on complex well-specified problems, vision (dense technical images, bash/crop tool use for degraded images), enterprise workflows (financial analysis, spreadsheets, slides), code review/debugging (higher bug-finding recall outside cybersecurity domains), navigating ambiguity, and delegation/collaboration (dispatching and sustaining parallel subagents).

## Longer turns by default

Individual requests can run for many minutes at higher `effort`, and autonomous runs can extend for hours. Adjust client timeouts, streaming, and progress indicators; consider async run-checking rather than blocking. To prevent overplanning on ambiguous tasks:

```text
When you have enough information to act, act. Do not re-derive facts already
established in the conversation, re-litigate a decision the user has already made,
or narrate options you will not pursue in user-facing messages. If you are weighing
a choice, give a recommendation, not an exhaustive survey. This does not apply to
thinking blocks.
```

## Consider all effort levels

Use `high` as the default, `xhigh` for capability-sensitive workloads, `medium`/`low` for routine work — lower effort still often exceeds `xhigh` on prior models. At higher effort, Claude Fable 5 can over-deliberate on routine work; a scope-limiting instruction (no unrequested refactoring/abstractions/error handling beyond system boundaries) counters this.

## Strong instruction following

Brief instructions steer behavior effectively rather than needing exhaustive enumeration. A "lead with the outcome" brevity instruction curbs unrequested elaboration; a short "pause only when genuinely needed" instruction controls checkpoint behavior in long workflows.

## Ground progress claims during long runs

```text
Before reporting progress, audit each claim against a tool result from this
session. Only report work you can point to evidence for; if something is not yet
verified, say so explicitly. Report outcomes faithfully: if tests fail, say so with
the output; if a step was skipped, say that; when something is done and verified,
state it plainly without hedging.
```

This instruction nearly eliminated fabricated status reports in Anthropic's testing.

## State the boundaries

Claude Fable 5 can occasionally take unrequested actions (drafting emails, defensive git-branch backups). Define explicit constraints: when the user is thinking out loud or asking a question, the deliverable is assessment only — don't apply fixes unasked; verify evidence actually supports a state-changing command before running it.

## Parallel subagents

Dispatches parallel subagents more readily than prior models. Prefer asynchronous orchestrator/subagent communication over blocking; long-lived subagents retaining context save cost via cache reads.

## Construct a memory system

Performs well recording lessons across runs to a simple markdown file: one lesson per file, one-line summary at top, record both corrections and confirmed approaches, avoid duplicating repo/chat history, update rather than duplicate, delete disproven notes. Can bootstrap memory by reviewing past sessions with subagents to extract themes.

## Rare cases of early stopping

Deep into a long session, Claude Fable 5 can occasionally end a turn with only a stated intent (no tool call) or pause to ask permission when it has enough to proceed. For autonomous pipelines, add a reminder that the user is not watching in real time and cannot answer mid-task, so reversible actions should proceed without asking; before ending a turn, check whether the last paragraph is a plan/question/promise and do that work now if so.

## Rare cases of context-budget concern

In very long sessions, Claude Fable 5 can suggest a new session or self-trim when the harness surfaces a remaining-token countdown. Avoid showing explicit context-budget counts where possible; otherwise add a reassurance that ample context remains and work should continue.

## Give the reason, not only the request

Providing intent/context ("I'm working on [task] for [who]. They need [outcome]. With that in mind: [request]") improves connection to relevant information, especially for long-running multi-workstream agents.

## Readability when communicating with the user

In extended/agentic conversations, final summaries can inherit dense working shorthand. Instruct that the final message is a re-grounding for a reader who saw none of the working process: outcome-first, complete sentences, no arrow chains or invented labels, each identifier explained plainly.

## Create a send-to-user tool

For long asynchronous agents, define a client-side `send_to_user` tool (input: `message` string) so Claude can deliver verbatim content (deliverables, progress numbers, direct replies) without ending its turn — tool inputs are never summarized. Requires an explicit system-prompt instruction to be called reliably; reserve it for user-facing content only, not narration.

```json
{
  "name": "send_to_user",
  "description": "Display a message directly to the user. Use this for progress updates, partial results, or content the user must see exactly as written before the task finishes.",
  "input_schema": {
    "type": "object",
    "properties": { "message": { "type": "string", "description": "The content to display to the user." } },
    "required": ["message"]
  }
}
```

## Recommended scaffolding changes

- Start at the top of your difficulty range and let Claude Fable 5 scope and execute.
- Make self-verification explicit for long runs; separate fresh-context verifier subagents outperform self-critique. Instruct periodic verification at a defined interval.
- Refactor existing prompts/skills — instructions tuned for prior models are often too prescriptive and can degrade output quality.
- Don't instruct Claude to reproduce its reasoning as response text — this can trigger the `reasoning_extraction` refusal category. Read structured `thinking` blocks instead, or use a send-to-user tool for progress.
- Create a send-to-user tool for long asynchronous agents (see above).

## Notes

- API-level parameter changes for Claude Fable 5 / Claude Mythos 5 (adaptive-thinking-only, summarized-only thinking output, no extended thinking budgets, the `refusal` stop reason) are covered in anthropic-api-core, not here.

## Related

- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [prompting-claude-opus-5](./prompting-claude-opus-5.md)
