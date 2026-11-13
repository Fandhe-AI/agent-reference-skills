---
source: https://opencode.ai/docs/tools/#interaction
---

# Tools: Interaction and Automation (question / skill / subagent / execute / sessions / worktrees)

Tools that ask the user questions, load skills, start subagents, and run Code Mode JavaScript including session and worktree utilities.

## Signature / Usage

### Question

`question` pauses execution and presents one or more questions to the user. Each question has a short header, prompt, and choices; `multiple` allows more than one choice. A free-form answer is always available.

```text
Before changing the API, ask me to choose between a breaking change and a compatibility layer.
```

Permission: `question` with `*` as its resource. A client must support the interactive form, and dismissing it cancels the question.

### Skill

`skill` loads the instructions and bundled resources for one available skill ID into the conversation.

```text
Load the effect skill before changing this Effect code.
```

The ID must be in the advertised skill list or explicitly named by the user. Permission: `skill` with the skill ID as its resource. See [Skills](https://opencode.ai/docs/skills/) for creation, discovery, and loading rules.

### Subagent

`subagent` starts a child session with a configured subagent. Supply the agent ID, a short `description`, and a complete `prompt`.

```text
Ask the explore subagent to map the authentication flow and return the key files.
```

Subagents always run in the background. The call returns immediately with a `sessionID`, and the parent receives a `<subagent>` message when the child goes idle, and again after each later round of work, so it can keep working or end its turn without waiting. Pass the returned `sessionID` to continue that same child conversation; a follow-up to a running child joins its current run. Only subagent-mode agents can be used, and the default nesting depth is one.

Permission: `subagent` with the selected agent ID as its resource.

### Execute

`execute` runs JavaScript in Code Mode so the agent can call and combine tools from the catalog. It is useful for parallel independent calls and for processing results without adding every intermediate value to the model context.

```text
Read package.json and README.md in parallel, then return their relevant setup details.
```

The runtime has no direct filesystem access, imports, or timers. It provides `fetch` for HTTP requests; everything else goes through tools in its catalog. Denying `execute` with resource `*` removes Code Mode. The tools it would reach, including MCP tools from servers that do not set `codemode: false`, are then listed as direct tools, each with its full definition in every request. Deny those tools too if the agent should not have them. Nested built-in and MCP tools still enforce their own permissions, and plugin tools enforce the permissions they assert.

### Sessions

The `opencode` Code Mode namespace contains session utilities:

- `session_rename` changes the title of the current session, or another session selected by `sessionID`.
- `session_move` moves the current session, or another selected session, to a relative or absolute `directory`. The move takes effect at a safe boundary, so destination-dependent work belongs in a later call.

```text
Rename this session to "Timeout cleanup", then move it to the new worktree.
```

### Worktrees

The same namespace manages worktrees for the session's project:

- `worktree_create` creates a worktree from a `name` and returns its `directory`. The project's worktree configuration selects the destination and strategy.
- `worktree_list` lists the project's worktrees.
- `worktree_remove` removes a worktree OpenCode recorded for the project. Set `force` to discard uncommitted changes.

```text
Create a worktree named "login" and move this session into it.
```

`worktree_remove` uses the `edit` permission with the worktree directory as its resource. The other worktree utilities do not request a built-in permission action.

## Options / Props

| Tool | Parameters | Permission resource |
|------|------------|---------------------|
| `question` | header, prompt, choices, `multiple` | `*` |
| `skill` | skill ID | skill ID |
| `subagent` | agent ID, `description`, `prompt`, `sessionID` | selected agent ID |
| `execute` | JavaScript (Code Mode) | `*` (deny removes Code Mode) |
| `session_rename` | title, `sessionID` | — |
| `session_move` | `directory`, `sessionID` | — |
| `worktree_create` | `name` | — |
| `worktree_list` | — | — |
| `worktree_remove` | directory, `force` | worktree directory (`edit` action) |

## Notes

- Using `worktree_remove` with `force` discards uncommitted changes; confirm first.
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).
- OpenCode subagents and permissions are distinct from Claude Code (anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [tools-overview.md](./tools-overview.md)
- [mcp-permissions-names.md](./mcp-permissions-names.md)
