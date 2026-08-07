# Record & Replay

Demonstrate a workflow on your Mac and turn it into a reusable skill, without writing a prompt from scratch.

## Signature / Usage

```text
1. In the ChatGPT desktop app, select ChatGPT and turn on Work in the switcher, or select Codex. Then open Plugins.
2. Open the + menu.
3. Select "Record a skill".
4. Review the suggested prompt, add any helpful context, and submit it.
5. When the chat asks for permission to record your actions, approve the request once you are ready to demonstrate the workflow.
6. Perform the workflow on your Mac.
7. When you are done, stop recording from the menu bar or overlay, or tell the chat that you are done.
```

Recording continues until you stop it; ChatGPT or Codex observes the actions and window content needed to learn the workflow. After you stop, it inspects the captured workflow and drafts a skill explaining when to use it, what inputs it needs, what steps to follow, and how to verify the result. You can ask for further refinements before using it.

To replay, start a new ChatGPT or Codex chat and ask it to use the generated skill, supplying the values that differ this time (file to upload, issue to create, date range, etc.). The product completes the workflow with the tools available in the current environment: Computer Use, browser actions, and installed plugins.

## Requirements

- Available on macOS only.
- Initial availability excludes the European Economic Area, the United Kingdom, and Switzerland.
- Computer Use must be available and enabled.
- If an organization manages Codex with `requirements.toml`, the `[features].computer_use` requirement controls Record & Replay too — disabling `computer_use` also disables Record & Replay.

## Tips for better recordings

- Keep the demonstration short and complete.
- State your goal and any specific inputs that might vary between skill uses before you start recording.
- Use realistic inputs, but avoid secrets and sensitive data.
- Refine the skill after recording to call out hidden preferences that matter, such as naming conventions, field defaults, or decision points.
- Stop recording when the workflow is complete instead of continuing into unrelated cleanup.

## When to build a plugin instead

Record & Replay is a fast way to create a skill from a demonstrated workflow. To distribute a stable package across a team, bundle multiple skills, include connectors, add MCP servers, or manage install metadata, package the workflow as its own plugin instead (see [Build plugins](https://developers.openai.com/plugins/build/plugins), outside this skill's scope).

## Notes

- Pick a workflow you already know how to complete; Record & Replay works best when the steps are stable and the success criteria are clear.
- The "skill" this feature produces is a Codex/ChatGPT skill document (instructions + supporting resources), distinct from this repository's Claude Code Skills (`SKILL.md`) and from the OpenAI Apps SDK's plugin "skills" concept — see `references/administration/skill-controls.md` for the ChatGPT workspace / filesystem / plugin skill distribution models.
- For MCP server configuration referenced above (used by replayed workflows and plugin-based alternatives), see [MCP server configuration](../config/mcp-config.md).

## Related

- [Skill controls](../administration/skill-controls.md)
- [Model Context Protocol (MCP config)](../config/mcp-config.md)
