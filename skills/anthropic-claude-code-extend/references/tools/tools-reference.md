<!-- source: https://code.claude.com/docs/en/tools-reference / last verified: 2026-08-07 -->

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
| `Glob` | Finds files by name pattern | No |
| `Grep` | Searches file contents (ripgrep-backed) | No |
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
| `SendMessage` | Message an agent-team teammate or resume a subagent | No |
| `SendUserFile` | Sends a generated file to the user's device | No |
| `ShareOnboardingGuide` | Uploads `ONBOARDING.md`, returns a share link | Yes |
| `Skill` | Executes a skill in the main conversation | Yes |
| `TaskCreate` / `TaskGet` / `TaskList` / `TaskOutput` / `TaskStop` / `TaskUpdate` | Task list management | No |
| `TodoWrite` | Legacy session checklist, disabled by default since v2.1.142 | No |
| `ToolSearch` | Searches/loads deferred tools under MCP tool search | No |
| `WaitForMcpServers` | Waits for still-connecting MCP servers | No |
| `WebFetch` | Fetches a URL, converts to Markdown, summarizes via a small model | Yes |
| `WebSearch` | Web search via Anthropic's backend (results only, no page fetch) | Yes |
| `Workflow` | Runs a dynamic workflow orchestrating many background subagents | Yes |
| `Write` | Creates or overwrites a file (requires prior Read for existing files) | Yes |

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

- Bash output limits: valid results inline up to ~30,000 chars (then a session-directory file path + preview); failures inline up to ~10,000 chars as a head/tail excerpt. `BASH_MAX_OUTPUT_LENGTH` raises the read-back window up to 150,000.
- Edit/Write require the file to have been read in the current conversation first (a `PARTIAL view` truncated read doesn't count); a `Read` deny rule blocks Edit/Write on the same path including new-file creation.
- WebFetch is lossy by design: the page is converted to Markdown and summarized by a small model against your prompt before Claude sees it; use `curl` via Bash for the raw page.
- WebSearch is capped at 200 calls per session (across main conversation + all subagents), configurable via `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`; resets on `/clear`.
- `EndConversation` cannot be removed by deny/disallowed-tools rules while any other tool remains — it is deliberately un-blockable since it only ends the session.
- Subagent tool access: no `tools`/`disallowedTools` set → inherits every tool available to subagents; `tools` only → exactly that list; `disallowedTools` only → everything except listed; both set → `disallowedTools` wins on overlap.
- The advisor tool is a server-side tool run by the API, not a Claude Code tool — it has no name usable in permission rules or hook matchers (see `advisor.md`).

## Related

- [advisor.md](./advisor.md) — server-side second-opinion tool, not in the permission-rule tool table
- [ultrareview.md](./ultrareview.md) — cloud multi-agent review invoked via `/code-review ultra`, distinct from the `Agent` tool's local subagents
