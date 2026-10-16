<!-- source: https://code.claude.com/docs/en/tools-reference / last verified: 2026-10-17 -->

# Tools reference

Complete reference for Claude Code's built-in tools. Tool names are the exact strings used in permission rules, subagent tool lists, and hook matchers. To add custom tools, connect an MCP server; to add reusable prompt-based workflows, write a skill (runs through the existing `Skill` tool).

## Signature / Usage

```text
# permission rule syntax: ToolName(specifier)
Bash(npm run *)
Read(~/secrets/**)
Edit(/src/**)
WebFetch(domain:example.com)
Skill(deploy *)
Agent(Explore)
```

## Options / Props

Built-in tools (name — description — permission required by default inside the working directory):

| Name | Description | Permission required |
| --- | --- | --- |
| `Agent` | Spawns a subagent with its own context window | No |
| `Artifact` | Publishes HTML/Markdown as a shareable claude.ai artifact | Yes |
| `AskUserQuestion` | Multiple-choice question to gather requirements | No |
| `Bash` | Executes shell commands | Yes (built-in read-only commands run without prompting) |
| `CronCreate` / `CronDelete` / `CronList` | Session-scoped scheduled task management | No |
| `Edit` | Targeted exact-string-replacement edits | Yes |
| `EndConversation` | Ends the session (abuse / demo only, v2.1.213+) | No |
| `EnterPlanMode` / `ExitPlanMode` | Switch to / present and exit plan mode | No / Yes |
| `EnterWorktree` / `ExitWorktree` | Create/switch into, or exit, a git worktree | Yes / No |
| `Glob` | Finds files by name pattern. Absent by default on macOS, Linux, WSL | No |
| `Grep` | Searches file contents (ripgrep-backed). Absent by default on macOS, Linux, WSL | No |
| `ListAgents` | Lists the agents `SendMessage` can reach: subagents, agent-team teammates, your other local sessions, and (while connected to Remote Control) cloud and other-machine sessions. Backs `/list-agents`. v2.1.224+; only where cross-session messaging is enabled | No |
| `ListMcpResourcesTool` / `ReadMcpResourceTool` | List / read MCP server resources | No |
| `LSP` | Code intelligence via language servers | No |
| `Monitor` | Watches a background command or WebSocket, feeding events back | Yes |
| `NotebookEdit` | Modifies Jupyter notebook cells | Yes |
| `PowerShell` | Native PowerShell execution | Yes |
| `PushNotification` | Desktop/phone notification | No |
| `Read` | Reads file contents (text, images, PDF, `.ipynb`) | No |
| `RemoteTrigger` | Manages claude.ai Routines; backs `/schedule` | No |
| `ReportFindings` | Structured code-review findings list | No |
| `ScheduleWakeup` | Reschedules the next self-paced `/loop` iteration | No |
| `SendFeedback` | Claude drafts a feedback report about Claude Code locally (`~/.claude/feedback/drafts/`); nothing is sent until you choose to send it. v2.1.238+ | No |
| `SendMessage` | Message an agent-team teammate, resume a subagent by agent ID or name, or message one of your other Claude Code sessions (cross-session; v2.1.224+) | No |
| `SendUserFile` | Sends a generated file to the user's device | No |
| `ShareOnboardingGuide` | Uploads `ONBOARDING.md`, returns a share link | Yes |
| `Skill` | Executes a skill in the main conversation | Yes |
| `SubagentHandback` | Delivers a subagent's final report to the conversation receiving its result. Provided only in auto mode, to locally-run non-fork subagents; the classifier reviews the report first. v2.1.271+ | No |
| `TaskCreate` / `TaskGet` / `TaskList` / `TaskStop` / `TaskUpdate` | Task list management (Create/Get/List/Update provided by default only on certain models; see Notes) | No |
| `TaskOutput` | Removed in v2.1.277 (read the background task's output file with `Read`) | No |
| `TodoWrite` | Session checklist. Disabled by default in favor of the Task tools; `CLAUDE_CODE_ENABLE_TASKS=0` re-enables it in sessions that have the task-tracking tools | No |
| `ToolSearch` | Searches/loads deferred tools under MCP tool search | No |
| `WaitForMcpServers` | Waits for still-connecting MCP servers | No |
| `WebFetch` | Fetches a URL, converts to Markdown, summarizes via a small model | Yes |
| `WebSearch` | Web search via Anthropic's backend (results only, no page fetch) | Yes |
| `Workflow` | Runs a dynamic workflow orchestrating many background subagents | Yes |
| `Write` | Creates or overwrites a file (prior Read of an existing file is required on Opus 4.6 / Haiku 4.5 and older models; see Notes) | Yes |

Permission rule formats by tool group:

| Rule format | Applies to |
| --- | --- |
| `Bash(npm run *)` | Bash, Monitor |
| `PowerShell(Get-ChildItem *)` | PowerShell |
| `Read(~/secrets/**)` | Read, Grep, Glob, LSP |
| `Edit(/src/**)` | Edit, Write, NotebookEdit |
| `Skill(deploy *)` | Skill |
| `Agent(Explore)` | Agent |
| `WebFetch(domain:example.com)` | WebFetch |
| `WebSearch` | WebSearch (no specifier) |

## Notes

- Bash output limits: valid results inline up to ~30,000 chars (then a session-directory file path + preview); failures inline up to ~10,000 chars as a head/tail excerpt. `BASH_MAX_OUTPUT_LENGTH` raises the read-back window up to 150,000. The `bashOutputMaxChars` setting (up to 128,000; v2.1.261+) sizes the inline ceiling and read-back window together, and Claude Code then ignores `BASH_MAX_OUTPUT_LENGTH`.
- Background command time limit: only in unattended sessions (`-p`, Agent SDK, CI, cloud). A command Claude starts in the background gets 30 minutes, or the `timeout` Claude passes with `run_in_background`, up to 2 hours (10 minutes default in a `-p` run whose prompt is passed as text). Requires v2.1.285+ (before v2.1.288 it applied in every session). Raise with `BASH_DEFAULT_TIMEOUT_MS` (above 1800000) / `BASH_MAX_TIMEOUT_MS` (above 7200000).
- Glob and Grep are absent from the default tool set on macOS, Linux and WSL (on Windows they are included): Claude searches with `find` / `grep` through Bash, which run embedded `bfs` / `ugrep`. They come back when `Glob` / `Grep` is named in `--tools` or `--allowedTools` (naming either in `--allowedTools` restores both; a settings-file allow rule doesn't), when a deny rule / `--disallowedTools` / `--restricted` removes `Bash`, or when a subagent lists them in `tools` without `Bash`.
- Edit requires the file to have been read in the current conversation first (a `PARTIAL view` truncated read doesn't count); Claude Opus 4.6, Haiku 4.5 and older models always require it, newer models can edit an unread file when reading wouldn't need a permission prompt and Read is available (v2.1.208+). A `Read` deny rule blocks Edit/Write on the same path including new-file creation.
- Write: whether the prior read is needed before overwriting an existing file depends on the model: Opus 4.6, Haiku 4.5 and older always need it; newer models can overwrite an unread file under the same conditions as Edit; notebooks and partially-read files need it on every model. Before v2.1.228 every model required it. New files never need it.
- WebFetch is lossy by design: the page is converted to Markdown and summarized by a small model against your prompt before Claude sees it; use `curl` via Bash for the raw page. It reads up to 100,000 characters per call (v2.1.290+: the result says how much went unread). `CLAUDE_CODE_DISABLE_WEB_FETCH=1` turns it off (v2.1.285+).
- WebSearch is capped at 200 calls per session (across main conversation + all subagents), configurable via `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`; resets on `/clear`. On v2.1.290+ an interactive session's limit refills at about 100 calls per hour (`CLAUDE_CODE_WEB_SEARCH_REFILLS_PER_HOUR` changes the rate).
- Task tools (`TaskCreate` / `TaskGet` / `TaskList` / `TaskUpdate`) and `TodoWrite` are provided by default only on Opus 4.7, Sonnet 4.6, Haiku 4.5 and earlier models (v2.1.268+); on other models, opt in with `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`, `--allowedTools TaskCreate`, or `--tools`. Background and cloud sessions always provide them. With `CLAUDE_CODE_ENABLE_TASKS=0`, `TodoWrite` is provided instead of the four Task tools.
- `EndConversation` cannot be removed by deny/disallowed-tools rules while any other tool remains — it is deliberately un-blockable since it only ends the session.
- Subagent tool access: no `tools`/`disallowedTools` set → inherits every tool available to subagents; `tools` only → exactly that list; `disallowedTools` only → everything except listed; both set → `disallowedTools` wins on overlap.
- The advisor tool is a server-side tool run by the API, not a Claude Code tool — it has no name usable in permission rules or hook matchers (see `advisor.md`).

## Related

- [advisor.md](./advisor.md) — server-side second-opinion tool, not in the permission-rule tool table
- [ultrareview.md](./ultrareview.md) — cloud multi-agent review invoked via `/code-review ultra`, distinct from the `Agent` tool's local subagents
