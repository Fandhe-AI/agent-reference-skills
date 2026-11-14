<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2 / last verified: 2026-11-14 -->

# Prompting Claude Fable 5.2

Prompting patterns specific to Claude Fable 5.2 and Claude Mythos 5.2: effort, early stopping, approvals, code ownership, progress updates, subagents, caution that builds up, prompts and harnesses designed for earlier models, final reports, and refusals.

For the model's capabilities and API changes, see the official "What's new in Claude Fable 5.2" and the Claude Fable 5.2 / Claude Mythos 5.2 migration guide (model pages, outside this skill). For techniques shared across current models, see claude-prompting-best-practices.

## Signature / Usage

```text
Every few tool calls, give the user a one-line update on where things stand.
```

(System-prompt fallback for progress updates where mid-conversation system messages are unavailable; see "Keep users informed during long turns".)

## Calibrate effort

- Start at `high`, the default for Claude Fable 5.2 on the Claude API. Effort levels rank the same way across Claude models but the amount of thinking per level differs: rerun the sweep instead of carrying over a setting tuned on Claude Fable 5.1 or Claude Opus 5.5.
- `low`: quick back-and-forth, well-specified tasks, high-volume workloads (fast subagents). On coding evals it scored close to Claude Fable 5.1 at higher effort.
- `medium`: interactive coding, chat, everyday knowledge work.
- `high`: hard coding, research, agentic work, long unattended runs; turns take noticeably longer than at `medium`. Most of the capability gain comes at `high`.
- `xhigh`: hardest long-running coding and agentic work where a gain is measured; slight score gain on internal coding evals, many more tokens.
- `max`: measuring the ceiling, or open-ended problems (scientific discovery, mathematics) where time and tokens don't matter; slower and many more tokens than `xhigh`.
- At `low` / `medium` agentic work, add the "Finishing work" text below; the model stops early more often at lower effort.
- At `high` and above the model thinks before almost every reply, including a greeting. An instruction to answer directly without deliberating did not stop thinking at `medium` and above: lower the effort for those turns instead.
- Effort has little effect on reply length; change length and tone by prompting.
- To change levels within a conversation and keep the prompt cache, use per-message effort (beta, `mid-conversation-output-config-2026-07-01` header). Otherwise a new top-level `effort` on the next request can invalidate cached messages.

## Finish the whole task

On long multistep tasks the model sometimes ends a turn by listing what is left, offering to continue, or stopping at an ordinary obstacle such as a timeout (more often at `low` / `medium`). Add to the system prompt:

```text
# Finishing work
Please avoid stopping while you still owe work the user asked for. Be persistent and do not stop unless needed.

While status notes are welcome, as is clarifying with the user on open decisions, carry on with work that does not depend on the user's answer without unnecessary stops.

If you notice yourself inviting the user to redirect you or offering to wait, instead proceed on the next part of the task. You may meet ordinary obstacles like errors, timeouts, locked files, empty results or failing tools. Diagnose them first, and when they are not real blockers, work through them with the access you have (wait and retry, fix the request, use another tool or source) rather than stopping unnecessarily.

If someone clearly decided something is a hard blocker, such as a file marked not to be touched, access that was intentionally withheld, or a safety guardrail, leave it alone, say plainly what you found, and look for another safe way to finish the task. Stopping before the task is complete is very rarely merited, as in when the task can't move forward without user input, or where the blocker is deliberate and should not be worked past. This does not override the need for confirmation on risky or destructive actions.
```

- In Anthropic's replay of recorded coding sessions at `medium`, about half as many sessions ended with unfinished work that could have been continued; output tokens rose by about 30 percent. Endings that list what remains and then stop were not removed.
- Keep your own confirmation step for risky or irreversible actions.

### Approvals

- Say exactly what you approve instead of a bare "continue" (for example "Yes, run the migration on the staging database").
- Be specific about the actions to double-check: a rule listing "sending messages to people outside this conversation" among steps needing approval made the model hold back about half of its routine requests to colleagues in simulated unattended tasks.

## Say who owns the code

- With no ownership statement, or code presented as someone else's, the model tends to add to the existing structure even when that duplicates code. When the code base is the model's own, it often consolidates duplicates and sometimes makes related fixes unasked.
- To have it improve structure as it works:

```text
You are the owner and long-term maintainer of this codebase, and its design is up to you.
```

- Consolidation of duplicated code rose from under 10 percent of runs to about 75 percent. Output tokens rose by about 70 to 80 percent, with unrequested changes (many new tests and documentation), and sometimes changed existing feature behavior. Closing PR summaries often omitted small changes: review the diff and the summary.
- Leave the sentence out where the user owns the code and wants minimal change. A scope-limiting rule does not cancel it: with "No drive-by refactors, renames or cleanups" earlier in the prompt the model still consolidated in more than half of runs.

## Keep users informed during long turns

- First check the client receives updates. Between tool calls the model's updates come back as progress-update `thinking` blocks, empty at the default `thinking.display` of `"omitted"`, so a client rendering only `text` blocks can look silent. Set `display: "updates"` (beta, `thinking-display-updates-2026-08-18` header) or `"summarized"`, then render non-empty `thinking` blocks between tool calls.

### Modify your harness

Count consecutive tool-calling steps that show the user nothing (no `text` block and no `thinking` block with text; count with `display` set to `"updates"` or `"summarized"`). Where mid-conversation system messages are supported, after several in a row append this as a turn-scoped system message (`clear_at: "next_user_message"`, beta, `mid-conversation-system-clear-at-2026-08-21` header):

```text
The user hasn't heard from you in a while: say in a few words what you're doing, then continue.
```

- Roughly halved the longest silent stretch in multi-turn coding tests without a noticeable increase in tokens or time.
- Leave each reminder in `messages` on later requests: removing or rewording one edits an earlier turn and invalidates the thinking blocks after it.

### Signal intent

For an opening line before the first tool call, brief updates, and a closing recap, add to the system prompt (about 20 percent more output tokens per task; use where a human is in the loop, optionally together with the reminder above):

```text
Before you start, say in a line what you're about to do; brief updates while you work help the user follow along. Close with a short recap that stands on its own (what you found, what you did, and what's next), so a reader who only sees the last message has the full picture.
```

### Update system prompt instructions

Where the reminder is not possible, add the sentence in "Signature / Usage" above. It cut most long silent stretches on workflow automation tasks; expect runs of several tool calls between updates. The model suits long asynchronous tasks where nobody needs frequent updates.

## Set expectations for subagents

- Delegation depends on harness and tasks: rare with a minimal subagent tool on short tasks, ready in a coding product whose prompts invite delegation. At `xhigh` / `max` it used subagents to review its own work, which Claude Fable 5.1 did not.
- Early testers had good results using it as planner and orchestrator for other models. Subagents can be a large share of session cost: check which model subagents use by default.
- Change the subagent tool description only if it starts more subagents than needed (mainly in a harness that already invites delegation). Review system prompt, skills and agent-file lines that tell the model to delegate first.
- In the new description, state what a subagent adds to session cost, when delegation is and is not worth it, and how to brief a subagent. A longer cost-focused description roughly halved the subagent count at `high` effort versus a shorter one.

## Keep caution from piling up

Memory, notes and instruction files accumulate cautious instructions that the model follows closely (seen mostly when several agents worked together). To fix:

- Remove notes you no longer need (for example an old "never retry").
- Name the routine steps that need no approval; "act more freely" is too vague.
- Check validation steps: "stop and review at the first error" can block autonomous work.
- Be explicit about exceptions: "never" is treated as absolute; write "ask for approval before deleting files" instead of "never delete files".
- Keep your own confirmation step for risky or irreversible actions.

## Review prompts and harnesses designed for earlier models

- Standing instructions to delegate in system prompts, skills and agent files: remove if it delegates too much.
- A token budget shown to the model in the prompt: removing a large budget lowered cost with equivalent performance on coding tasks at `high` / `xhigh`. This is about prompt text, not the API's task budgets (beta, not covered by the testing).
- Harness code that edits earlier turns: preserved thinking means changing `system`, `tools` or an earlier message invalidates later thinking blocks. By default the Messages API rejects the request and the Message Batches API drops those blocks. Shorten history with context editing or compaction that keeps no earlier turns after the summary; or set `thinking.block_binding.prefix_mismatch_behavior` to `"drop_block"` (beta, `thinking-binding-controls-2026-08-01` header), but dropping thinking on every turn made the model think again and use more output tokens. Otherwise keep history append-only; measure output tokens before relying on `"drop_block"`.
- The "treat that answer as done" chat lines from the Claude Opus 5.5 guide reduced thinking on follow-ups and made the model far less likely to point out mistakes in earlier answers at `high` effort; leave them out where re-examination matters.
- Instructions to think less: Claude Fable 5.1 usually followed "answer directly without deliberating"; on Fable 5.2 it does not stop thinking at `medium` and above. Remove such lines and lower effort.
- Style rules for writing: followed closely, so a hard limit such as "one instruction per sentence, in 20 words or fewer" can make prose choppy. Remove unneeded ones before adding the report text below.
- Accumulated rules, notes and memories: delete cautions whose reason no longer holds, rewrite absolute rules with scope and reason, and consider restarting a stuck system with memory and notes trimmed.

## Make reports easy to follow

Readers of a final report or handoff usually haven't seen the tool calls or files behind it. Add to the system prompt and adjust to your readers:

```text
# Communicating clearly
Write for an intelligent but low-context reader. The person reading has not seen your tool calls, your reasoning or the files you opened, and may be switching in from other work. Messages should generally be self-contained: the reader should understand what you mean without having to dig for other context. Put the key points in the first few sentences. Practice progressive disclosure in your sentence order, and do not use undefined references and ideas in line 1 that won't make sense until the reader reaches line 12.

Use plain words, and write in clear, understandable full sentences. Do not use a term or abbreviation that you made up during the work. Say what the thing is in a way any reader would understand. Write mostly in the style of ASD-STE100 Simplified Technical English: short sentences, one idea per sentence, active voice, and consistently using the same word for the same thing. Use a paragraph of flowing prose where ideas connect, and keep bullets for lists of separate items. Leave out unnecessary details unless the reader asks and practice concision, but do ensure that your messages have the key context. Aim to make your user-facing text as human-readable and clear as possible.
```

- In agentic testing the text made final reports less dense, reduced semicolons, and shortened sentences on workflow automation tasks. Add length or detail instructions as needed.

## Safeguard refusals

- Safety classifiers can decline a request: `stop_reason: "refusal"` with `stop_details.category` naming the category: `cyber`, `bio`, `frontier_llm`, `reasoning_extraction` (the request asks the model to reproduce its internal reasoning in the response text), `general_harms`, or `null` (no named category).
- Benign cybersecurity or life sciences work can trigger `cyber` / `bio`; Anthropic's Cyber Verification Program and Life Sciences Verification Program exist for legitimate organizations. Claude Mythos 5.2 offers the same capabilities as Claude Fable 5.2 only to organizations verified through these programs.
- Remove prompt, skill or tool-description instructions that ask the model to write out its reasoning in the response. To see how it reasoned, set `display: "summarized"` and read the thinking blocks.
- To retry a declined request on another model, see the official "Refusals, fallback, and billing" section of What's new in Claude Fable 5.2 (outside this skill; fallback mechanics are an anthropic-api-core topic).

## Where to start

1. Set `effort` to `high` explicitly, then run your evals at `medium` and `xhigh` as well.
2. Read the system prompts, skills, agent files, memory files, notes and harness text you carry over; remove or test what "Review prompts and harnesses designed for earlier models" describes.
3. Run your longest agentic tasks and note where the model stops early, asks for unneeded approvals, goes quiet, delegates more than needed, or adds to existing code where you wanted it restructured.
4. Add the text or follow the advice for each observed behavior one at a time, and measure its effect and token cost on your own tasks.

## Notes

- Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2 (retrieved 2026-11-14 via the `.md` twin). Code blocks are verbatim; prose is condensed.
- Make instruction changes in new conversations only: on Claude Fable 5.2 a request that fails the prefix check gets a 400 error. To change instructions mid-conversation, put them in the newest turn or append a mid-conversation system message where available.
- Distinct from Claude Fable 5.1 (see prompting-claude-fable-5-1): the progress-update reminder here uses a colon, the "answer directly without deliberating" instruction no longer works, and ownership, approvals, subagent, and "caution piling up" guidance are new. The official pages differ in this wording; both are kept verbatim in their own pages.
- Request mechanics (`effort`, `thinking.display`, beta headers, refusal fallback) belong to anthropic-api-core; this page covers prompting-level tuning only.

## Related

- [prompting-claude-fable-5-1](./prompting-claude-fable-5-1.md)
- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
- [handle-streaming-refusals](../test-evaluate/handle-streaming-refusals.md)
