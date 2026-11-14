<!-- source: https://code.claude.com/docs/en/hooks / last verified: 2026-11-14 -->

# Hooks reference

Hooks are user-defined shell commands, HTTP endpoints, MCP tool calls, or LLM prompts that execute automatically at specific points in Claude Code's lifecycle. They run wherever Claude Code runs (terminal, IDE extensions, Desktop, Claude Code on the web) and fire the same events everywhere. Configuration has three levels of nesting: a hook event (e.g. `PreToolUse`), a matcher group filtering when it fires, and one or more hook handlers to run.

## Signature / Usage

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command')
if echo "$COMMAND" | grep -q 'rm -rf'; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:"Destructive command blocked by hook"}}'
else
  exit 0
fi
```

## Options / Props

Hook events (cadence: once per session, once per turn, or on every tool call):

| Event | When it fires |
| --- | --- |
| `SessionStart` | Session begins or resumes |
| `Setup` | `--init-only`, or `--init`/`--maintenance` in `-p` mode |
| `UserPromptSubmit` | Prompt submitted, before Claude processes it |
| `UserPromptExpansion` | A typed command expands into a prompt |
| `PreToolUse` / `PostToolUse` / `PostToolUseFailure` | Before / after success / after failure of a tool call |
| `PermissionRequest` / `PermissionDenied` | Permission decision needed / auto-mode denial |
| `PostToolBatch` | After a full batch of parallel tool calls resolves |
| `Notification` | Claude Code sends a notification |
| `MessageDisplay` | While assistant text is displayed |
| `SubagentStart` / `SubagentStop` | Subagent spawned / finishes |
| `TaskCreated` / `TaskCompleted` | Task created via `TaskCreate` / marked completed |
| `Stop` / `StopFailure` | Claude finishes responding / turn ends on API error |
| `TeammateIdle` | An agent-team teammate is about to go idle |
| `InstructionsLoaded` | CLAUDE.md or `.claude/rules/*.md` loaded |
| `ConfigChange` | A configuration file changes mid-session |
| `CwdChanged` / `DirectoryAdded` | Working directory changes / added via `/add-dir` |
| `FileChanged` | A watched file changes on disk |
| `WorktreeCreate` / `WorktreeRemove` | Worktree created / removed |
| `PreCompact` / `PostCompact` | Before / after context compaction |
| `Elicitation` / `ElicitationResult` | MCP server requests input / user responds |
| `PreModelSwitch` | Before Claude Code applies a model switch that you or a client requested; can block the switch (v2.1.251+). Matcher is the target's canonical model name; check `to_model` in the input (without a canonical name, every hook runs regardless of matcher) |
| `PostModelSwitch` | After the session's model changes, including automatic changes such as restoring the model on resume (v2.1.251+); cannot block |
| `SessionEnd` | Session terminates |

Hook handler types: `command` (shell), `http` (POST to a URL), `mcp_tool` (call a connected MCP server tool), `prompt` (single-turn Claude yes/no eval), `agent` (subagent with tool access, experimental).

Common handler fields: `type` (required), `if` (permission-rule-syntax filter, tool events only), `timeout` (seconds; defaults 600 command/http/mcp_tool, 30 prompt, 60 agent; the command/http/mcp_tool default is lowered to 30 on `UserPromptSubmit`, `PreModelSwitch` and `PostModelSwitch`, and to 10 on `MessageDisplay`; `SessionEnd` hooks share a 1.5-second budget that rises to match a longer per-hook `timeout`, up to 60 seconds), `statusMessage`, `once` (skill frontmatter only).

Command hook fields: `command`, `args` (exec form — no shell, no quoting needed), `async`, `asyncRewake`, `shell` (`bash`/`powershell`), `onFailure` (`"continue"` default | `"block"`: block the action when the hook fails or times out; v2.1.295+; `command` and `http` hooks). HTTP hook fields: `url`, `headers`, `allowedEnvVars`. MCP tool hook fields: `server`, `tool`, `input`. Prompt/agent hook fields: `prompt`, `model`.

Hook locations and scope:

| Location | Scope | Shareable |
| --- | --- | --- |
| `~/.claude/settings.json` | All your projects | No |
| `.claude/settings.json` | Single project | Yes |
| `.claude/settings.local.json` | Single project | No (gitignored) |
| Managed policy settings | Organization-wide | Yes |
| Plugin `hooks/hooks.json` | While plugin enabled | Yes |
| Skill frontmatter | The rest of the session once the skill is invoked | Yes |
| Subagent frontmatter | While that subagent is running | Yes |

Exit code contract: **0** = success, JSON on stdout is parsed; **2** = blocking error, stderr fed to Claude as the reason (exact effect varies per event — see the event's "can block?" behavior); any other code = non-blocking error, action proceeds, transcript shows a `<hook name> hook error` notice.

JSON output universal fields: `continue` (default `true`), `stopReason`, `suppressOutput`, `systemMessage`, `terminalSequence` (allowlisted OSC escape sequences for notifications). Decision fields vary by event: top-level `decision: "block"` + `reason` for most post-hoc events; `hookSpecificOutput.permissionDecision` (`allow`/`deny`/`ask`/`defer`) for `PreToolUse`; `hookSpecificOutput.decision.behavior` for `PermissionRequest`; `hookSpecificOutput.additionalContext` injects text into Claude's context (10,000-char cap per value, overflow saved to a file).

## Notes

- All matching hooks in a matched group run in parallel; the most restrictive `PreToolUse` decision wins (`deny` > `defer` > `ask` > `allow`), and `additionalContext` from every hook is kept.
- Matcher syntax: `"*"`/empty/omitted matches all; letters/digits/`_`/`-`/spaces/`,`/`|` only → exact-string match (or list); any other character → unanchored JS regex. `FileChanged` and `StopFailure` use a narrower exact-match set (`|` only for alternatives).
- `if` uses permission-rule syntax (`"Bash(git *)"`, `"Edit(*.ts)"`) to filter by tool name **and** arguments together; only evaluated on `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`.
- Path placeholders: `${CLAUDE_PROJECT_DIR}`, `${CLAUDE_PLUGIN_ROOT}`, `${CLAUDE_PLUGIN_DATA}` — prefer exec form (`args` set) whenever a hook references one, since shell form needs manual quoting.
- Hooks defined in skill/subagent frontmatter are scoped to the component's lifecycle; for subagents, `Stop` hooks convert to `SubagentStop`.
- `disableAllHooks: true` disables user/project/local hooks but cannot disable managed-policy hooks from outside managed settings.
- Stop hooks that block 8 times in a row without progress are overridden automatically (the count of consecutive continuations resets each time Claude calls a tool); `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` raises the cap. Check `stop_hook_active` in the input to avoid loops.
- `allowManagedHooksOnly` (managed settings): user, project, local and plugin hooks are blocked (plugins force-enabled in managed `enabledPlugins` are exempt); `statusLine`, `fileSuggestion` and `subagentStatusLine` narrow to managed settings; plugins with a `command` source (v2.1.229+) and marketplace `headersHelper` commands are blocked unless `disableCommandPluginSources` is explicitly `false`. HTTP hook allowlists apply to every source: `allowedHttpHookUrls` (URL allowlist) and `httpHookAllowedEnvVars` (env vars interpolated into headers).
- A handler defined identically in several settings files runs once (a plugin's or skill's copy stays separate).
- Since v2.1.214, an `if` condition such as `Edit(src/**)` matches only the `src` directory in the working directory; write `Edit(**/src/**)` to match `src` at any depth (before v2.1.214 it matched at any depth).
- Prompt hooks accept `continueOnBlock` (on `ok: false`, feed the reason back to Claude and continue instead of ending the turn) and `impossible` (on `Stop` / `SubagentStop`, lets the turn end); agent hooks have neither field.
- Monitor commands (v2.1.314+): a `PreToolUse` / `PermissionRequest` hook with a `Bash` matcher also runs on shell commands Claude starts with the Monitor tool, but its `allow` and `updatedInput` have no effect on them (it can still deny or ask). To allow or rewrite a Monitor command, use a matcher that includes Monitor (`Bash|Monitor`, `.*`, or none) and name Monitor in `if`, e.g. `Monitor(tail *)`, which matches by the rules `Bash(tail *)` follows. A hook with a `Bash` matcher doesn't run for a WebSocket watch, and a `PostToolUse` hook with one doesn't run for Monitor.
- `PostToolUse` after an interrupt (v2.1.319+): if `Ctrl+Enter` ends the turn while a tool is running and the tool finishes, `PostToolUse` hooks still run on its result and have 10 seconds to finish; a command hook still running after that is killed whatever its `timeout` (use `async: true` for longer work). A message queued with `Enter` doesn't interrupt, so hooks keep their usual `timeout`; `Esc` cancels the hooks at once. Before v2.1.319 the hooks didn't start after a message interrupt.
- Concurrency (2.1.312): prompt and agent hooks run at most 24 at a time per session, sub-agents included, plus at most 12 that have waited longer than their event's timeout; a `timeout` under 1 second counts as 1 second.
- `onFailure: "block"` (v2.1.295+, `command` and `http` hooks) turns a failed or timed-out hook into a block; for Agent SDK callback hooks, 2.1.317 added the same `onFailure: "block"` option so a failing callback blocks the action instead of letting it run. On Windows without Git Bash, a shell-form `PreToolUse` or `PermissionRequest` command hook with `onFailure` unset can instead block the tool call; set `"onFailure": "continue"` to let the call go ahead, or `"block"` with exec form (`args`) and `"shell": "powershell"` for a guard that must block either way.
- `WorktreeCreate`: the hook must print the worktree path (last non-empty stdout line for command hooks; `hookSpecificOutput.worktreePath` for HTTP hooks). Claude Code refuses an absolute path containing `.` or `..` segments and any path that passes through a symlink below the repository root; return a normalized real path. 2.1.325: EnterWorktree refuses a hook path that goes through a symlink inside the project.
- `PreCompact` stdout (exit 0, not blocking) is used as instructions for the compaction summary and is cut at 10,000 characters per hook (2.1.314); `systemMessage` and `continue` are discarded on `PreCompact` and `PostCompact`.
- 2.1.323: `PreCompact`, `PostCompact` and post-compaction `SessionStart` hooks now receive `agent_id` and `agent_type` when a subagent compacts.
- Skill-frontmatter hooks (v2.1.304+): the skills of one source (project, personal folder, or each plugin) can register at most 1,024 hooks and 16,384 matcher characters per session.
- 2.1.323: if a tool's permission check errors after a `PreToolUse` hook returned `allow`, Claude Code decides the call as if no hook had answered; if it fails on input that a `PermissionRequest` hook rewrote, Claude Code asks again, or refuses the call where nobody can answer. Also 2.1.323 and 2.1.325: with `--trust-workspace false` or an untrusted VS Code folder, the repository's settings can no longer disable your hooks; in cloud scheduled tasks a `PostToolUse` hook from your own settings can't replace the plan in `ExitPlanMode`'s result (2.1.321: nor the `AskUserQuestion` answer in Cowork cloud sessions).
- 2.1.323: `claude -p` and SDK sessions emit a progress heartbeat every 30 seconds while hooks run long.
- Source: https://code.claude.com/docs/en/hooks.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304, 2.1.312, 2.1.314, 2.1.317, 2.1.319, 2.1.321, 2.1.323, 2.1.325, retrieved 2026-11-14)
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [hooks-guide.md](./hooks-guide.md) — task-oriented walkthroughs and troubleshooting for the same event/config model
