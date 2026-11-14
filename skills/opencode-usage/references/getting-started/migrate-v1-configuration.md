---
source: https://opencode.ai/docs/migrate-v1/#configuration
---

# Migrate from V1: Configuration

This section covers both JSON/JSONC configuration and file-based definitions under `.opencode/`.

## Signature / Usage

### Use your existing configuration

V2 reads existing system, global, and project configuration from the same locations as V1:

```text
/Library/Application Support/opencode/opencode.json(c)
/etc/opencode/opencode.json(c)
%ProgramData%\opencode\opencode.json(c)
/Library/Managed Preferences/<user>/ai.opencode.managed.plist
/Library/Managed Preferences/ai.opencode.managed.plist
~/.config/opencode/opencode.json(c)
<project>/opencode.json(c)
<project>/.opencode/opencode.json(c)
```

V2 normalizes supported V1 and native V2 fields in memory without rewriting the source
file. Existing supported V1 configuration is intended to keep working, so you do not need to convert it to try or adopt
V2.

As in V1, system configuration and macOS managed preferences have the highest precedence, so their settings override
global and project files. Their [policies](https://opencode.ai/docs/policies/#precedence), including migrated `enabled_providers` and
`disabled_providers`, also outrank global and project policies. Overriding a setting cannot stop users from adding
providers, MCP servers, agents, or plugins, so express admin-enforced restrictions as `policies` rather
than ordinary settings such as `permissions`.

### Ask OpenCode to migrate

The V1 config format remains supported. The native V2 format is optional and makes several settings more explicit and
ergonomic.

The recommended migration path is to ask OpenCode to update the configuration for you:

```text
Migrate my OpenCode configuration, including file-based definitions, from the V1 format to the native V2 format.
Preserve its behavior and all unrelated settings.
```

OpenCode can inspect the complete file, apply the relevant changes below, and avoid rewriting settings that do not need to
change. Conversion does not need to happen all at once: supported V1 and native V2 fields may coexist at the top level.
When both forms set the same canonical value, a valid native V2 value takes precedence regardless of JSON key order.

Nested mixing is intentionally bounded. OpenCode recognizes mixed V1 and V2 members within `mcp`, `compaction`, and
`experimental`, but it does not recursively infer formats inside individual agents, providers, commands, or models. Keep
each of those nested entries entirely in one format. Supported V1 syntax remains quiet by itself; malformed values,
unsupported legacy fields, and conflicting V1/V2 values produce warnings while unrelated valid settings continue to load.

### Permissions and tools

V1 groups permission effects by tool. V2 uses one ordered `permissions` array, making precedence and exceptions explicit:

```jsonc
// V1
{
  "permission": {
    "bash": {
      "git push *": "ask"
    },
    "edit": "allow"
  },
  "tools": {
    "websearch": false
  }
}

// V2
{
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" },
    { "action": "edit", "resource": "*", "effect": "allow" },
    { "action": "websearch", "resource": "*", "effect": "deny" }
  ]
}
```

Permission actions also changed: `bash` is now `shell`, `task` is now `subagent`, and `write` and `patch` are now `edit`.
See [Permissions](https://opencode.ai/docs/permissions/) for the ordered V2 rule format.

Todos are off by default in V2. To turn them on, use the experimental flag. It may change or be removed in a future
release; see [Experimental](https://opencode.ai/docs/config/#experimental).

```jsonc
{
  "experimental": {
    "todo": true,
  },
}
```

V1 asks before accessing paths outside the project. V2 does not: `external_directory` is allowed by default. To keep
the V1 behavior, add `{ "action": "external_directory", "resource": "*", "effect": "ask" }` to `permissions`.

### Agents and modes

The singular `agent` and deprecated `mode` maps become `agents`. Agent fields become more consistent with the rest of the
V2 config:

```jsonc
// V1
{
  "agent": {
    "reviewer": {
      "prompt": "Review for correctness and missing tests.",
      "model": "anthropic/claude-sonnet-5-5",
      "variant": "high",
      "disable": false,
      "permission": {
        "edit": "deny"
      }
    }
  }
}

// V2
{
  "agents": {
    "reviewer": {
      "system": "Review for correctness and missing tests.",
      "model": "anthropic/claude-sonnet-5-5#high",
      "disabled": false,
      "permissions": [
        { "action": "edit", "resource": "*", "effect": "deny" }
      ]
    }
  }
}
```

`prompt` becomes `system`, `disable` becomes `disabled`, and a separate `variant` joins the model reference after `#`.
`maxSteps` becomes `steps`. Entries from the old `mode` map become primary agents.

Agent [`request.body`](https://opencode.ai/docs/agents/#request) is kept but not sent to the model, so V1 `temperature`, `top_p`, and `options`
have no effect there. Set them on a model variant instead. DeepSeek only applies `temperature` with thinking off, so
this variant turns thinking off too:

```jsonc title="opencode.jsonc"
{
  "providers": {
    "opencode": {
      "models": {
        "deepseek-v4.1-flash": {
          "variants": [{ "id": "review", "body": { "thinking": { "type": "disabled" }, "temperature": 0.2 } }],
        },
      },
    },
  },
  "agents": {
    "reviewer": { "model": "opencode/deepseek-v4.1-flash#review" },
  },
}
```

Use `body` for provider JSON fields and `settings` for provider package options. See [model options](https://opencode.ai/docs/models/#options).

### Snapshots

Rename the singular `snapshot` field to `snapshots`. Its boolean value does not change:

```jsonc
// V1
{ "snapshot": false }

// V2
{ "snapshots": false }
```

### Media

Rename the singular `attachment` object to `media`. Nested image settings keep the same names:

```jsonc
// V1
{ "attachment": { "image": { "auto_resize": true } } }

// V2
{ "media": { "image": { "auto_resize": true } } }
```

### MCP servers

V2 groups servers under `mcp.servers`, replaces `enabled` with the inverse `disabled`, and separates timeout purposes:

```jsonc
// V1
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp"],
      "enabled": true,
      "timeout": 30000
    }
  }
}

// V2
{
  "mcp": {
    "servers": {
      "playwright": {
        "type": "local",
        "command": ["npx", "@playwright/mcp"],
        "disabled": false,
        "timeout": {
          "catalog": 30000,
          "execution": 30000
        }
      }
    }
  }
}
```

Remote OAuth fields use snake case: `clientId` becomes `client_id`, `clientSecret` becomes `client_secret`,
`callbackPort` becomes `callback_port`, and `redirectUri` becomes `redirect_uri`. The V1 `experimental.mcp_timeout` value
also becomes the default `mcp.timeout.catalog` and `mcp.timeout.execution` values. See [MCP servers](https://opencode.ai/docs/mcp-servers/).

### Compaction

V2 groups the retained-context token budget under `keep` and gives the reserve a clearer name:

```jsonc
// V1
{
  "compaction": {
    "preserve_recent_tokens": 8000,
    "reserved": 20000
  }
}

// V2
{
  "compaction": {
    "keep": {
      "tokens": 8000
    },
    "buffer": 20000
  }
}
```

The V1 token count carries over as is. V2 also accepts a percentage of the model's window, such as `"buffer": "15%"`,
which fits models with different window sizes.

`auto` keeps its name. V2 has no native `tail_turns` or `prune` field; both legacy fields are ignored with a warning. Recent
context is retained by token budget instead. See [Compaction](https://opencode.ai/docs/compaction/).

### Skills

V1 separates extra skill paths and URLs. V2 combines both into one ordered array:

```jsonc
// V1
{
  "skills": {
    "paths": ["./team-skills"],
    "urls": ["https://example.com/skills/"]
  }
}

// V2
{
  "skills": ["./team-skills", "https://example.com/skills/"]
}
```

Existing skill files and automatic `.opencode/skills/` discovery do not change. See [Skills](https://opencode.ai/docs/skills/).

### Commands

Rename the singular `command` map to `commands` and `subtask` to `subagent`. Join a separate model `variant` to the model reference:

```jsonc
// V1
{
  "command": {
    "review": {
      "template": "Review the current changes.",
      "model": "anthropic/claude-sonnet-5-5",
      "variant": "high",
      "subtask": true
    }
  }
}

// V2
{
  "commands": {
    "review": {
      "template": "Review the current changes.",
      "model": "anthropic/claude-sonnet-5-5#high",
      "subagent": true
    }
  }
}
```

`template`, `description`, and `agent` keep their names. Legacy `subtask` remains accepted; delegated commands now run
automatically in the background and report their results to the parent session. Existing Markdown command definitions remain supported.
See [Commands](https://opencode.ai/docs/commands/).

### References

Rename the deprecated singular `reference` map to `references`:

```jsonc
// V1
{ "reference": { "docs": "../docs" } }

// V2
{ "references": { "docs": "../docs" } }
```

V1 already accepts `references`, so no change is needed when the file uses it. Reference entries keep the
same shapes. See [References](https://opencode.ai/docs/references/).

### Providers

Rename the singular `provider` map to `providers`. V2 separates the runtime package, endpoint, and request settings:

```jsonc
// V1
{
  "provider": {
    "acme": {
      "npm": "@ai-sdk/openai-compatible",
      "api": "https://llm.example.com/v1",
      "options": {
        "apiKey": "{env:ACME_API_KEY}"
      }
    }
  }
}

// V2
{
  "providers": {
    "acme": {
      "package": "aisdk:@ai-sdk/openai-compatible",
      "settings": {
        "baseURL": "https://llm.example.com/v1",
        "apiKey": "{env:ACME_API_KEY}"
      }
    }
  }
}
```

V1 `npm` becomes `package`, and AI SDK packages receive the `aisdk:` prefix. `api` becomes `settings.baseURL`. Provider
`options` are separated into `settings`, `headers`, and `body` according to their request role. `options.setCacheKey`
becomes `compatibility.supportsPromptCacheKey` on the provider. See [Providers](https://opencode.ai/docs/providers/).

V2 consolidated two legacy provider namespaces:

| V1 provider ID             | Canonical V2 provider ID |
| -------------------------- | ------------------------ |
| `azure-cognitive-services` | `azure`                  |
| `google-vertex-anthropic`  | `google-vertex`          |

Migration of unambiguous V1 provider, agent, command, and provider-filter fields uses these canonical IDs. The shared
top-level `model` field keeps its exact provider ID because the same syntax is valid in native V2 config; update that field
to the canonical ID when migrating a legacy built-in provider.

### Models and variants

Models remain nested under their provider, but several model fields become more explicit:

- `id` becomes `modelID`.
- `tool_call` and `modalities` become `capabilities.tools`, `capabilities.input`, and `capabilities.output`.
- A `status` of `"deprecated"` becomes `disabled: true`.
- Cache costs move from `cache_read` and `cache_write` to `cache.read` and `cache.write`.
- Provider-specific `options` become `settings`.
- A V1 variants object becomes a V2 array with an `id` on each entry.

```jsonc
// V1
{
  "variants": {
    "high": {
      "reasoningEffort": "high"
    }
  }
}

// V2
{
  "variants": [
    {
      "id": "high",
      "settings": {
        "reasoningEffort": "high"
      }
    }
  ]
}
```

See [Models](https://opencode.ai/docs/models/) for the complete native model shape.

### Supported fields without direct native equivalents

Most fields that keep the same shape, including `shell`, `model`, `default_agent`, `watcher`, `formatter`,
`instructions`, `enterprise`, and `tool_output`, require no migration.

V2 accepts and preserves `lsp` configuration, but it does not run language servers, expose LSP tools, or produce LSP
diagnostics. Replace workflows that depend on those capabilities with the project's lint, typecheck, or compiler commands.

The V1 provider filters do not have one-to-one native V2 config fields, but their behavior remains supported through
[policies](https://opencode.ai/docs/policies/):

- `enabled_providers` becomes an internal deny-by-default provider policy followed by allows for the listed providers.
- `disabled_providers` becomes internal deny policies for the listed providers.
- `autoupdate` becomes `update`: `false` maps to `"disable"`, `"notify"` maps to `"notify"`, and `true` maps to `"auto"`.
- `small_model` becomes the `model` selection for the built-in `title` agent. Native V2 configuration should use
  `agents.title.model` instead.

You may keep these fields in V1 syntax. OpenCode normalizes them without warning.

### Accepted but unsupported fields

The V1 schema also accepted fields that have no supported V2 behavior. V2 ignores these values and emits a warning so
they are not mistaken for active configuration:

- `logLevel`: use `OPENCODE_LOG_LEVEL` when starting OpenCode.
- `server`: use the V2 service and explicit server options; the server API is an intentional breaking change.
- Top-level `subagent_depth`: use `experimental.subagent_depth` instead.
- `compaction.tail_turns` and `compaction.prune`: V2 uses `compaction.keep.tokens` and checkpoint-based compaction instead.
- Agent `name` inside V1 JSON configuration.
- An enabled-only V1 MCP entry without a `type`.
- V1 experimental fields `batch_tool`, `openTelemetry`, `primary_tools`, and `continue_loop_on_deny`.
- V1 provider fields `id`, `whitelist`, and `blacklist`.
- V1 provider-model fields `release_date`, `attachment`, `reasoning`, `temperature`, `experimental`, a non-`deprecated`
  `status`, and boolean `interleaved`.

Ignoring these fields is intentional and is not a compatibility regression. If V2 does not preserve behavior identified
as supported elsewhere in this guide, follow the issue-reporting guidance in [Troubleshooting](https://opencode.ai/docs/troubleshooting/).

### Agent files

V1 agent files may use `agent/`, `agents/`, `mode/`, or `modes/`. V2 still discovers all four directories. The preferred
V2 location is:

```text
.opencode/agents/<name>.md
```

Files under a V1 `mode/` or `modes/` directory represent primary agents. When moving one into `agents/`, add
`mode: primary` to its frontmatter. Files under `agent/` can move to `agents/` without changing their path-derived ID.

When converting the frontmatter to native V2 fields:

- Keep the Markdown body as the agent's system instructions.
- Rename `prompt` to `system` when it appears in JSON configuration; file bodies do not need a `system` field.
- Rename `disable` to `disabled` and `permission` to `permissions`.
- Join `model` and `variant` as `provider/model#variant`.
- Set sampling and provider options on a model variant, as shown [above](#agents-and-modes).

V1 agent frontmatter is deprecated but still translated automatically. Each file is read as one format. A file that
uses any of `permissions`, `request`, `system`, or `disabled` is read as V2, and V1 fields in it, such as `name`,
`tools`, `permission`, or `temperature`, are ignored with a warning in the log. Other files that use V1 fields are read
as V1. Convert a file's frontmatter all at once rather than mixing the two formats. See [Agents](https://opencode.ai/docs/agents/).

### Command files

V1 command files may use `command/` or `commands/`. V2 discovers both. The preferred location is:

```text
.opencode/commands/<name>.md
```

Move files from `command/` to the same relative path under `commands/` to preserve command names. The Markdown body remains
the command template, and `description` and `agent` frontmatter keep the same names. Rename `subtask` to `subagent` to use
the native name for background delegation. If frontmatter has separate
`model` and `variant` fields, append the variant to the model and remove `variant`:

```yaml
# V1
model: anthropic/claude-sonnet-5-5
variant: high
subtask: true

# V2
model: anthropic/claude-sonnet-5-5#high
subagent: true
```

See [Commands](https://opencode.ai/docs/commands/).

### Skill files

V2 discovers skills from both `.opencode/skill/` and `.opencode/skills/`. The preferred layout is:

```text
.opencode/skills/<skill-id>/SKILL.md
```

Move the complete skill directory, not only `SKILL.md`, so relative scripts, references, and other supporting files remain
available. Keep the directory name stable to preserve the skill ID. Existing skill frontmatter and Markdown bodies do not
require a V2 rewrite. See [Skills](https://opencode.ai/docs/skills/).

### Instruction files

Existing `AGENTS.md` files stay in place. V2 discovers the global `~/.config/opencode/AGENTS.md` and ambient `AGENTS.md`
files from the current directory up to home. For projects outside home, discovery stops at the project root.

If a V1 setup relied on a `CLAUDE.md` fallback, move that guidance into the applicable `AGENTS.md`. V2 currently only
discovers `AGENTS.md`; because non-API V1 behavior is intended to remain compatible, also file a compatibility issue with
the affected project details. See [Instructions](https://opencode.ai/docs/instructions/).

## Notes

- V1 and V2 share configuration locations; do not point V1 at files converted to native V2-only shapes.
- V1 `external_directory` behavior differs: V1 asks, V2 allows by default.
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).
- OpenCode agents, commands, and permissions are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin) concepts.
- OpenCode `AGENTS.md` instructions are distinct from the openai-codex `AGENTS.md`.
- MCP servers here are OpenCode configuration; the protocol spec is mcp-spec, and Claude Code / Codex MCP settings are covered by other skills.

## Related

- [Migrate from V1](./migrate-v1.md)
- [Permissions](../permissions-policies/permissions.md)
- [Policies](../permissions-policies/policies.md)
- [Compaction](../sessions/compaction.md)
- [Snapshots](../sessions/snapshots.md)
