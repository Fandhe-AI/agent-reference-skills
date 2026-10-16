<!-- source: https://code.claude.com/docs/en/hooks / last verified: 2026-10-17 -->

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
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [hooks-guide.md](./hooks-guide.md) — task-oriented walkthroughs and troubleshooting for the same event/config model
