# Skills & Plugins

Skills and plugins help ChatGPT and Codex complete repeatable work with the right instructions, resources, and tools, instead of pasting the same prompt each time.

## Signature / Usage

```text
@skill-creator   (ChatGPT)
$skill-creator   (Codex)
```

ChatGPT selects a skill explicitly with `@` mentions; Codex uses `$` mentions.

### Skill vs. plugin

| | Skill | Plugin |
|---|-------|--------|
| What it is | Instructions and supporting resources for a specific task or workflow. | Installable bundle that can include skills and MCP servers (tools, optional custom ChatGPT UI) and lifecycle hooks for the Codex runtime. |
| Use when | You need reusable instructions for a focused task. | You want an installable package combining instructions with connected services (e.g. GitHub, Google Drive, Slack) or other tools. |

### Build a skill

1. Choose one focused task (inputs and what a finished result looks like).
2. Describe the workflow with `@skill-creator` (ChatGPT) or `$skill-creator` (Codex): goal, steps, expected format, what to always include or avoid; add a template or example.
3. Review and try the draft with a realistic request; refine.
4. Install and reuse it; share with teammates when workspace settings allow.

## Notes

- A skill can combine a name and description (so the product recognizes when it applies), workflow instructions, and supporting resources (templates, examples, brand guidance, schemas, connected tools).
- ChatGPT and Codex can choose a skill automatically when a request matches its purpose.
- ChatGPT and Codex share one universal plugin directory.
- Related pages on the official site: Build skills, Plugins, Build plugins (conversational), Migrate custom GPTs to plugins, Record & Replay (turns a recording into a reusable skill). Plugin packaging and submission live at https://developers.openai.com/plugins/build/plugins, https://developers.openai.com/plugins/build/mcp-server, https://developers.openai.com/plugins/deploy/submission.
- Source: https://learn.chatgpt.com/docs/skills-and-plugins (retrieved 2026-11-14).

## Related

- [Build skills](../extend/build-skills.md)
- [Plugins](../extend/plugins.md)
- [Record & Replay](../extend/record-and-replay.md)
