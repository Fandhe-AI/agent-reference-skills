<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5 / last verified: 2026-10-17 -->

# Prompting Claude Sonnet 5.5

Prompting patterns specific to Claude Sonnet 5.5: effort, initiative and scope, running without up-front thinking, JSON output, progress updates, tool use, mid-turn messages, coding verification, tool calls, visual inputs, and refusals.

Existing Sonnet 5 prompts should perform well without changes. For the hardest long-horizon work, an Opus model is the better choice.

## Signature / Usage

```text
Think the problem through before you answer.
```

(Last line of the system prompt for JSON-answer reasoning tasks with adaptive thinking; see "Reasoning tasks with JSON output".)

## Calibrate effort

- Levels are recalibrated vs Sonnet 5; run a fresh sweep. Start at `high` (API default) unless the workload is agentic or latency-sensitive. Agentic coding / multistep tool use: `medium` for well-specified tasks, `high` for harder or longer. Chat / latency-sensitive: `medium` or `low`.
- At `low` it keeps thinking short and can skip verification; at `low` / `medium` on long agentic tasks it's more likely to check in before finishing.
- Set `max_tokens` with room for thinking and reply (agentic coding: 128,000, the model maximum, and stream). Reserve `xhigh` / `max` for measured gains; at those levels `between_tools` isn't accepted. From `medium` up it thinks briefly before almost every reply, even a greeting; at `low` it skips thinking on most simple requests. Asking it to think less doesn't reliably reduce thinking.
- Changing top-level `effort` between requests invalidates the prompt cache; use a per-message effort change (beta, adaptive thinking required; returns 400 with `between_tools`).

## Steer initiative and scope

Carrying work through (at `low` / `medium` the model sometimes pauses to confirm a plan or ask answerable questions). Try higher effort first, or add:

```text
Keep working until everything the user asked for is done, and only stop to ask when you can't go on without the user or before a risky step.

When the work the user asked for is done and checked, stop and report. Don't add features, tests, files, docs or refactors that weren't asked for. If you think one would help, mention it at the end instead of doing it.
```

- This makes `low` / `medium` sessions run longer and cost more; keep your own rules for risky or irreversible actions.
- Unrequested additions: it tends to add tests, docs, and small supporting files matching repo conventions at every effort level (more at higher effort). To limit changes, add only the second paragraph.
- Thoroughness at `xhigh` / `max`: it can start its own review rounds, sometimes with subagents, and make related fixes. Run routine work at `high` or below, or add:

```text
When the work the user asked for is done and its checks pass, stop and report. Don't start extra rounds of review or hardening on your own, and don't launch reviewer sub-agents unless the user asked for a review. If you think a deeper review is worth doing, say so at the end.
```

At `max` this stopped reviewer subagents and cut session cost by about a third with no quality change.

- Open-ended requests ("show me what you can do with this") may start building. Add:

```text
When the user asks for ideas, options or a plan, give them that and stop. Don't start building or changing anything until they say to go ahead.
```

## Running without up-front thinking

Send `thinking: {"type": "between_tools"}`: the lowest thinking setting, accepted at `high` effort or below.

- At `xhigh` / `max` it returns 400. Effort can't change mid-conversation under it (a differing per-message `output_config.effort` returns 400); use adaptive thinking to vary effort per turn.
- Remove any instruction telling the model not to think (it makes internal XML tags more likely in visible output).
- Read the response by block type; a response can begin with a `thinking` block (empty under default `display: "omitted"`, or a progress-update block under `between_tools`).
- Pass `thinking` blocks back unchanged (notes longer than a sentence or two come back as `thinking` blocks with a summary; the block you send back carries the full note).
- In a request without tools, `between_tools` means no thinking before answering; use adaptive thinking for reasoning tasks.

## Reasoning tasks with JSON output

For JSON answers needing a few steps of working out (totals, rules, ranking), the model often answers without thinking at `low` / `medium`. With structured outputs the working happens only in thinking, so accuracy can drop. Options:

- With adaptive thinking, add the line above to the end of the system prompt: at `high` it brings accuracy close to `xhigh` for a modest increase in output tokens; at `low` / `medium` it raises accuracy (not to `high` level) with a larger token increase.
- Or use `xhigh` with adaptive thinking (highest accuracy, more tokens than `high`).
- Use adaptive thinking rather than `between_tools`.
- At `low` / `medium` with structured outputs it occasionally thinks until `max_tokens`; treat `stop_reason: "max_tokens"` as failed even if the text is valid JSON, and retry.
- Without structured outputs: parse the last JSON value in the response (read only `text` blocks; from each `{` or `[` try to parse a value and continue from its end; keep the last found; don't take first `{` to last `}`), check fields, retry once if needed. Or use `xhigh` with adaptive thinking, which nearly always returns JSON alone.

## User-facing progress updates

Notes longer than a sentence or two come back as progress-update `thinking` blocks (empty at default `thinking.display`); shorter remarks stay `text`.

- Set `display: "updates"` (beta, `thinking-display-updates-2026-08-18` header). With `between_tools` the notes come back with summary text and no `display` field is needed; `between_tools` accepts no other field (`display`, `budget_tokens`, `block_binding` return 400).
- For exact text mid-turn, give a message-sending tool declared in the first request.
- Remove instructions like "hold all findings for the final response"; ask for updates at predictable points if wanted.
- If turns stay quiet, count consecutive silent tool-calling steps (e.g. five) and append a one-turn reminder as a turn-scoped system message (beta); stop after the second or third:

```text
The user hasn't heard from you in a while — say in a few words what you're doing, then continue.
```

Frequent harness text after tool results can make the model suspect prompt injection. Leave each reminder in `messages` on later requests so the prompt cache and preserved thinking stay intact.

## Tool use in chat and knowledge work

The model sometimes answers from training knowledge when a search would catch changes (what is allowed, required, or charged). Remove language discouraging tool use ("only use tools when strictly necessary", "minimize tool calls"), then add:

```text
Use the search tool to check specifics that may have changed since your training, such as what is allowed, required or charged, even when you feel confident. For researched work such as a report or a comparison, gather current sources rather than writing from your training knowledge.
```

## Mid-turn user messages

Trained to resist indirect prompt injection, it sometimes treats a genuine user message as injection when it arrives in a `tool_result` block or as a mid-conversation system message right after a tool result. Common causes: a token countdown after every tool result, users typing mid-turn, per-step instructions after tool results.

- Never put user text inside a `tool_result` block.
- Deliver mid-turn input as a text block after the last `tool_result` in the same user message.
- Keep harness notices in a separate mid-conversation system message after the user's words; never in the same block.
- In interactive sessions, don't add your own token or budget countdown after tool results. Task budgets (beta) add a similar countdown but haven't been seen to cause the misread; if seen while a budget is set, try without one.

## Verification on coding tasks

It generally checks work before reporting done, but at `low` effort sometimes skips a real check (e.g. dependencies not installed). Add to the system prompt:

```text
When you change code that can be run, built, or type-checked, run a real check that exercises the change before reporting it done: the project's tests, type-checker, or build, or the changed command itself. A syntax-only check, or a check command that failed to start, does not count; if all that is missing is the project's declared dependencies, install them with its own package manager and lockfile (e.g. npm install, pip install -r requirements.txt), never via sudo or the system package manager, unless told not to. Only if no real check can run here, say which one you did not run and why instead of reporting the change as done.
```

At `low` this makes skipped or superficial checks rare, with no measurable quality change and slightly higher cost.

## Tolerant tool-call handling

It occasionally calls a declared tool with a name differing only in letter case (`bash` for `Bash`) or passes a known parameter under a slightly different name. In your harness, either accept the call when the match is unambiguous, or return a `tool_result` with `is_error: true` stating the exact expected name; the model usually corrects on its next turn.

## Tools for complex visual inputs

For dense charts and technical drawings, give it a way to crop, zoom, or run code on the image (the official cookbook has a crop tool recipe). On charts, tools help at every effort level and beat raising effort (tools at `high` read charts more accurately than no tools at `max`, at a fraction of the cost). On technical drawings they help from `high` up, most at `xhigh` / `max`.

## Safeguard refusals

Safety classifiers can decline a request: `stop_reason: "refusal"` with `stop_details.category`:

| Category | Meaning |
| --- | --- |
| `cyber` | Could enable cyber harm; finding vulnerabilities in source code allowed, high-risk dual-use not |
| `bio` | Could enable biological harm; everyday health and educational questions unaffected |
| `frontier_llm` | Could assist development of competing AI models |
| `reasoning_extraction` | Asks the model to reproduce its internal reasoning in the response text |
| `general_harms` | Another usage-policy area; benign work can also trigger it |

- Legitimate blocked work: Cyber Verification Program (`cyber`), Life Sciences Verification Program (`bio`).
- Server-side fallback (beta) retries `cyber` and `frontier_llm` declines on Claude Sonnet 5; it doesn't retry `bio`, `reasoning_extraction`, or `general_harms`.
- Remove prompts asking for reasoning in the response; with adaptive thinking read `display: "summarized"` thinking blocks. Short explanations or action summaries are still fine.

## Notes

- The five breaking API changes from Sonnet 5 are in the model migration guide (not on this page); `effort`, `thinking` types (`adaptive`, `between_tools`), `max_tokens` and structured outputs API details are an anthropic-api-core topic.
- Beta header names above are stated as on the source page.

## Related

- [prompting-claude-sonnet-5](./prompting-claude-sonnet-5.md)
- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
