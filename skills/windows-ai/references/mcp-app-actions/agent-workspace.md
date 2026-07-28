# Agent Workspace

A contained Windows session and isolation model in which AI agents (such as the experimental Copilot Actions feature) can operate in parallel with a signed-in user, with runtime isolation and granular permissions.

## Notes

- Part of the "Copilot Actions" experimental feature (Windows 11), which lets an agent click, type, and scroll like a human to complete tasks on local files and apps after the user grants access.
- Building blocks: **Agent accounts** — a separate standard account on the device that agents use when acting on the user's behalf, enabling agent-specific policy and access control; **Agent workspace** — the contained runtime environment (its own desktop, limited visibility into the user's desktop) built on Windows' standard security-servicing boundaries; **User Transparency** — lets users authorize, monitor, and take over agent actions in the workspace.
- Disabled by default; enabled via `Settings > System > AI components > Agent tools > Experimental agentic features`. Agent accounts are only provisioned once the user enables the agent workspace.
- During preview, the agent has access to a limited set of known folders (Documents, Downloads, Desktop, Pictures) and resources common to all accounts; access outside these requires explicit user authorization. Standard Windows ACLs help prevent unauthorized use, and sensitive actions may require additional user approval before proceeding.
- Distinct from MCP server containment (a separate agent session used to sandbox individual MCP servers) — the agent workspace is the broader OS-level environment in which an interactive agent (including one built on App Actions/Agent Launchers) runs. See [Securely containing MCP servers on Windows](./mcp-containment.md) for the MCP-specific mechanism.

## Related

- [Agent Launchers on Windows overview](./agent-launchers-overview.md)
- [Securely containing MCP servers on Windows](./mcp-containment.md)
- [Security and consent model](./security-consent-model.md)
