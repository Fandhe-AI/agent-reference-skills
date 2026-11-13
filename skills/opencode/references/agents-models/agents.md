---
source: https://opencode.ai/docs/agents/
---

# Agents

Create a Markdown file to add a reusable agent. An agent combines a system prompt, model preference, permissions, and display details into a named assistant profile.

## Signature / Usage

This example adds a read-only reviewer that the main agent can launch for code reviews:

```md title=".opencode/agents/reviewer.md"
---
description: Reviews changes for correctness and regressions
mode: subagent
model: anthropic/claude-sonnet-5-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

Review the current changes. List findings in severity order with file and line references.
```

Ask your primary agent to use it:

```text
Use the reviewer subagent to review my current changes.
```

### Locations

Save Markdown agents globally for all projects or inside a project:

```text
~/.config/opencode/agents/<name>.md
.opencode/agents/<name>.md
```

OpenCode discovers project `.opencode` directories from the current directory up to the project root. A nested path becomes part of the agent ID:

```text
.opencode/agents/team/reviewer.md  →  team/reviewer
```

### Formats

#### Markdown

Frontmatter accepts the same fields as an `agents` configuration entry. The Markdown body becomes the agent's `system` prompt:

```md title=".opencode/agents/explainer.md"
---
description: Explains code without changing it
mode: subagent
---

Explain the relevant code with short examples. Do not edit files.
```

V1 frontmatter fields are deprecated. See [Agent files](https://opencode.ai/docs/migrate-v1/#agent-files) for how files that still use them are read.

#### JSONC

Define agents under `agents` in any [OpenCode configuration file](https://opencode.ai/docs/config/):

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "agents": {
    "reviewer": {
      "description": "Reviews current changes",
      "mode": "subagent",
      "system": "Report findings in severity order.",
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" },
      ],
    },
  },
}
```

### Selection

Set the primary agent used when a session has not selected one:

```jsonc
// opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "default_agent": "writer",
  "agents": {
    "writer": { "mode": "primary" },
  },
}
```

The selected default must exist, be visible, and support primary use. Otherwise OpenCode uses `build`, then the first visible primary-capable agent. Changing this setting does not replace the agent stored on an existing session.

### Modes

Set `mode` according to where the agent should run:

```jsonc
{
  "agents": {
    "reviewer": { "mode": "subagent" },
  },
}
```

| Mode | Behavior |
| --- | --- |
| `primary` | Runs as the main agent for a session. This is the default for a new custom agent. |
| `subagent` | Runs only in a child session through the `subagent` tool. |
| `all` | Runs either as a primary agent or a subagent. |

Subagents run with fresh context in their own child sessions. They always run in
the background: the parent receives a report when a child goes idle, and again
after each later round of work. The parent agent's `subagent` permissions control
which agents it may launch; the child uses its own configured permissions.

```jsonc
{
  "agents": {
    "orchestrator": {
      "permissions": [
        { "action": "subagent", "resource": "*", "effect": "deny" },
        { "action": "subagent", "resource": "reviewer", "effect": "allow" },
      ],
    },
  },
}
```

### Built-ins

OpenCode includes these visible agents:

| Agent | Mode | Purpose |
| --- | --- | --- |
| **Build** (`build`) | `primary` | Default coding agent. Tools and access outside the workspace are allowed by default; sensitive environment-file reads ask for approval. |
| **Plan** (`plan`) | `primary` | Explores and plans without editing normal project files. It may write OpenCode plan files when asked, and shell commands remain permission-controlled. |
| **General** (`general`) | `subagent` | Handles research and multi-step work with broad tool access, but cannot launch more subagents. |
| **Explore** (`explore`) | `subagent` | Searches and reads code or web sources without editing files. |

Override a built-in by using the same ID:

```jsonc
{
  "agents": {
    "build": {
      "permissions": [
        { "action": "shell", "resource": "git push *", "effect": "ask" },
      ],
    },
  },
}
```

Hidden `compaction`, `title`, and `summary` agents perform maintenance and cannot be selected directly. V2 has no built-in `scout` agent.

### Merging

Agent definitions merge in configuration order. Later scalar values replace earlier values, request maps merge by key, and permission rules append:

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
  ],
  "agents": {
    "build": {
      "permissions": [
        { "action": "shell", "resource": "git status", "effect": "allow" },
      ],
    },
  },
}
```

Global `permissions` apply before agent-specific rules, so later agent rules can refine them.

## Notes

- OpenCode agents are distinct from Claude Code subagents and settings (anthropic-claude-code, anthropic-claude-code-extend, anthropic-claude-code-admin).
- Per-agent fields (`description`, `model`, `system`, `permissions`, `steps`, `hidden`, `color`, `disabled`, `request`) are documented in the agent options page.
- Do not use legacy top-level fields such as `temperature`, `top_p`, `prompt`, `permission`, `tools`, `disable`, or `maxSteps` in new V2 agent configuration.

## Related

- [Agent options](./agent-options.md)
- [Commands](./commands.md)
- [Skills](./skills.md)
- [Models](./models.md)
