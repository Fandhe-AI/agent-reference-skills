<!-- source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1 / last verified: 2026-10-17 -->

# Prompting Claude Fable 5.1

Behavioral differences and prompting patterns for Claude Fable 5.1 (and Claude Mythos 5.1), covering effort, progress updates, tool-call batching, conversation history, writing style, formatting, task completion, compaction summaries, scope and tests, search triggering, safeguard false positives, file edits, long outputs, subagents, and vision.

Existing Claude Fable 5 prompts should perform well on Claude Fable 5.1 without changes.

## Signature / Usage

```text
First privately list what you need next; then request every item that doesn't depend on another's result in this one response.
```

(Batching nudge for coding and computer-use loops; see "Batch independent tool calls".)

## Consider all effort levels

- Start at the default effort `high`, then test `low`, `medium`, `xhigh`, `max` against your own evals. Re-run the sweep even if done for Claude Fable 5: level names don't map to the same amount of thinking across models.
- Gains over Fable 5 are largest at higher settings. At `medium`, results roughly match Fable 5 at lower cost. At `low`, often competitive with Claude Opus / Sonnet models on cost per task while scoring higher.
- At `low`, search/retrieval tools are called less often; at `xhigh` / `max`, it can think longer before a long deliverable.

## Ask for user-facing progress updates

- Fewer user-facing updates during long tool-calling turns than Fable 5, more pronounced at higher effort.
- Progress updates come back as `thinking` blocks, empty under the default `thinking.display` of `"omitted"`. Set `display: "updates"` (beta, `thinking-display-updates-2026-08-18` header) or `"summarized"`.
- Remove prompt lines that suppress narration (e.g. "hold all findings for the final response"). To get more updates:

```text
Before you start, say in a line what you're about to do; brief updates while you work help the user follow along. Close with a short recap that stands on its own — what you found, what you did, and what's next — so a reader who only sees the last message has the full picture.
```

If your product hides tool output, deliver this in a turn-scoped system message (`clear_at: "next_user_message"`, beta):

```text
Only you see that command's output — the user's terminal shows at most a few lines of it. If the user needs to read any of it, put it in your reply.
```

## Batch independent tool calls in agent loops

- Parallel calls work when a request names several things; in coding / computer-use loops where next calls are implied, it may issue one per turn.
- Append the batching nudge (above) after each tool-result user message as a turn-scoped system message: a `role: "system"` entry with `clear_at: "next_user_message"`. Beta header `mid-conversation-system-clear-at-2026-08-21`. Without the beta, put the sentence in a text block after the `tool_result` blocks in the same user message.
- Append a fresh copy each turn and leave earlier copies byte-for-byte; deleting or rewriting restarts the prompt cache and invalidates later thinking blocks.

```python
messages.append({"role": "user", "content": tool_results})
messages.append(
    {"role": "system", "content": BATCH_NUDGE, "clear_at": "next_user_message"}
)
```

(Excerpt of the official loop, which calls `client.beta.messages.create(model="claude-fable-5-1", betas=["mid-conversation-system-clear-at-2026-08-21"], ...)`; the page also has C# / Go / Java / PHP / Ruby / TypeScript versions.)

## Keep the conversation history append-only

- Append each assistant turn exactly as returned, thinking blocks included; don't edit earlier turns.
- For new accounts created on or after August 31, 2026, thinking blocks are valid only in the exact conversation that produced them: replaying a thinking block after the prefix (system prompt, tool list, earlier message) changed returns a 400, or drops the blocks with `thinking.block_binding.prefix_mismatch_behavior: "drop_block"` (beta, `thinking-binding-controls-2026-08-01` header). Adopt the pattern on every account.
- Edits that trip the check are the same that restart the prompt cache: per-turn reminders injected/removed, in-place summarization, mid-session system prompt changes. Use turn-scoped system messages, mid-conversation system messages, server-side compaction or context editing instead.
- Client-side compaction: replace the whole history with one summary message plus the new user turn. Cache reads are cheaper, so experiment with later compaction points.
- Detect existing edits: run with `prefix_mismatch_behavior: "drop_block"` and log `input_transformations`, or confirm consecutive requests are byte-identical up to appended turns.

## Writing density

Prose can be denser than Fable 5 (longer sentences, fewer paragraph breaks). Add to a user message (preferred) or system prompt:

```text
Please remove all mannered prose.
```

The page also gives a longer definition of "mannered prose" (metaphor and flourish substituting for direct statement; "say what you mean").

## Formatting in chat

Fable 5.1 uses bold less and is less likely to use headers, lists, or quotation marks. Remove anti-formatting language or replace it with:

```text
Use lists and bullet points when asked to, or when the content is multifaceted enough that they help with clarity. If the person explicitly requests minimal formatting, always format your responses without bullet points, headers, lists, or bold emphasis, as requested. In conversational, personal, or emotional exchanges, keep to plain prose.
```

## Quoting retrieved sources

More likely than Fable 5 to reproduce source passages without marking them as quotations. Add one complete correct example (`<example>` with `<user>`, `<response>`, `<rationale>`) to the system prompt; the official example compares two news outlets, conveys each in indirect speech with one short marked quote, and ends with `<rationale>CORRECT: ...</rationale>`. Replace the `[web_search: ...]` lines with your own tool's name.

## Finish the whole task

On complex asynchronous workloads the model sometimes describes next steps ("Next, I'll ...") or asks permission already covered ("Shall I apply this?"). Two system prompt additions together mitigate this (if length is limited, use only the first):

```text
You are operating autonomously. The user is not watching in real time and cannot answer questions mid-task, so asking 'Want me to…?' or 'Shall I…?' will block the work. For reversible actions that follow from the original request, proceed without asking. Stop only for destructive actions or genuine scope changes the user must decide. Offering follow-ups after the task is done is fine; asking permission before doing the work is not.
```

The first addition continues with an exception for when the user is describing a problem or thinking out loud (report findings and stop), a check of the last paragraph before ending the turn, and a check that evidence supports state-changing commands. The second addition, headed `# Delivering work`, defines the user's request (or approved plan) as the scope of the deliverable: don't quietly narrow, widen or swap it; complete every non-blocked part and say what was left out; keep changes to what the request needs and suggest extras at the end. The opening sentence carries much of the effect (keep as written). The block can make the model less likely to ask about ambiguous requests; check that trade-off.

## Compaction summaries

Server-side compaction already tells the model what to preserve. For client-side compaction, use a summarization instruction that:

```text
Summarize the transcript inside <summary></summary> tags. Include relevant information in the summary such that this conversation will be continued by a new context window without needing to redo work or be reprovided with relevant constraints or context.
```

then lists six things to preserve: (1) difficulties and how resolved; (2) options raised, tried, or set aside and why; (3) asked-for / decided / ruled-out items, stated exactly; (4) exactly where things stand; (5) open or promised items; (6) hard-to-reconstruct details (names, numbers, dates, exact wording, links) kept exactly. Keep the user's voice close to their words; condense the model's own reasoning.

## Keep changes and tests to what the task asks for

On open-ended features the model may fix nearby code, extend behavior, or commit extra test files. An explicit instruction reduces unrequested additions and committed test code substantially with no measurable change in task success. Key elements of the official instruction: don't fix/optimize/extend pre-existing bugs or unmentioned behavior unless required (report as follow-up); on ambiguity implement the most directly supported reading and state the assumption; scratch scripts need not be kept; commit tests only where requested or where the repo keeps such tests, "roughly one focused test per stated behavior"; "implement every behavior the task asks for, completely."

## Search triggering at low effort

At `low`, less likely than Fable 5 to call search/retrieval tools. Raise effort for the affected turns (see "Change effort mid-conversation" in the effort docs), or nudge in the system prompt:

```text
When a query centers on a name you do not confidently recognize, or recognize from a fast-moving area like AI models and developer tools where the landscape shifts within months, the name itself is the thing to verify: search before answering, and include the name as the user wrote it in at least one query alongside any reformulations. This holds even when you have some background on it — partial background is exactly what makes an out-of-date answer sound authoritative, so familiarity is not a reason to skip the search.
```

## Reduce safeguard false positives

Fewer false positives than at Fable 5 launch; finding vulnerabilities in source code is permitted. A blocked request returns `stop_reason: "refusal"`. More likely with:

- Compile-check phrasing: ask "Are there any bugs in this program?" instead of "Does this program compile without errors?"
- Lesser-known programming languages: give context or documentation access.
- Base64 in tool output: remove tools that return base64 into the model's context.

## Prefer targeted edits over whole-file rewrites

More likely than Fable 5 to rewrite an entire file for a small change (more output tokens and time). Append to the system prompt or first user message:

```text
The number of tokens used to edit files is best minimized, all else being equal. Therefore, when it will not affect the end result, try to surgically edit a file rather than rewrite the entire thing.
```

## Leave room for long outputs at xhigh and max effort

At `xhigh` / `max` the model may draft a long deliverable in thinking and then write it again. Prefer `high` and move up only where measured; otherwise set `max_tokens` to cover thinking plus reply, and append a note to the end of the user message (replace `[max_tokens]` with the request's actual value):

```text
Everything produced in one reply, including any reasoning or drafting done before the reply, counts toward a single limit of about [max_tokens] tokens. If that limit is reached before the reply is finished, the person receives a cut-off response and has to start over. Composing an entire output or deliverable in full as reasoning and then again as a reply would double the length of the turn without improving the result, so don't do that.
```

The official note continues: for long deliverables spend effort on understanding the request, checking inputs and settling structure; "Usually it is not needed to draft an output multiple times."

## Subagents and vision

- Subagents: don't force the lead agent to wait. Have the subagent-start tool return immediately, pass each result back in a later `user` message, and give the lead a separate tool to wait for results. Lowers average time to completion at similar quality, tokens, and cost.
- Vision: for dense charts, run the model as an agent with a container holding the raw images and libraries such as PIL / OpenCV; or at minimum an image-cropping tool that returns a chosen region cropped and enlarged (the official cookbook has a crop tool recipe).

## Notes

- Claude Fable 5.1 runs safety classifiers; prompts, skills, and tool descriptions asking the model to write out its thinking/reasoning may be declined with the `reasoning_extraction` category. Ask for a short explanation or summary of actions, or read `thinking` blocks with `display: "summarized"`.
- Beta features named here (`thinking-display-updates-2026-08-18`, `mid-conversation-system-clear-at-2026-08-21`, `thinking-binding-controls-2026-08-01`) are beta headers as stated on the source page.
- The model's capabilities, API changes, pricing, and availability are on the separate "What's new in Claude Fable 5.1" page (models docs), covered by anthropic-models-sdks / anthropic-api-core; effort, thinking, and compaction API details are an anthropic-api-core topic.

## Related

- [prompting-claude-fable-5](./prompting-claude-fable-5.md)
- [claude-prompting-best-practices](./claude-prompting-best-practices.md)
