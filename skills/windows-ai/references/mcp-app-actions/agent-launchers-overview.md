# Agent Launchers on Windows overview

A standardized way for apps to register AI agents so they're discoverable and invokable across the system (Start menu, search, other apps) without callers needing to know which app provides a given agent.

## Notes

- An Agent Launcher is a registered entry point for an interactive, conversational AI agent — distinct from a background service or one-off request processor. Agents are interactive, task-oriented, contextually aware, action-capable, and open a visible UI for the user to interact with.
- Built on top of the App Actions framework: an Agent Launcher consists of an agent definition manifest JSON, an app extension declaration in the package manifest, and an App Action with required `agentName` and `prompt` inputs (plus optional entities like `attachedFile`).
- Agents register with and are retrieved through the On-Device Registry (ODR) via `odr.exe`, either statically (at install time) or dynamically (at runtime).
- When invoked, the system locates the associated App Action via the agent's `action_id` and launches it with the user's prompt and context.

## Related

- [Get started with Agent Launchers on Windows](./agents-get-started.md)
- [Agent definition JSON schema](./agents-json.md)
- [App Actions on Windows Overview](./app-actions-overview.md)
- [The ODR command-line tool](./odr-tool.md)
