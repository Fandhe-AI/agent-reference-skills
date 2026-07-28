# Security and consent model for MCP and App Actions on Windows

How Windows scopes access and obtains user consent for MCP servers, App Actions, and agents, drawing together the containment, permission, and responsible-AI mechanisms used across the MCP and App Actions frameworks.

## Notes

- **MCP server containment**: by default, MCP servers accessed through the ODR run in an agent session under a separate agent user account, with no direct access to the user's session, files, settings, or credentials unless explicitly granted. See [Securely containing MCP servers on Windows](./mcp-containment.md).
- **Per-host, not per-server, file consent**: when a host app requests user-file access on behalf of an MCP server, granting it applies to all MCP servers used by that host in the session, not just the requesting server.
- **Reduced protections**: `Settings > System > Advanced > AI components > Reduce protections for agent connectors` allows unpackaged apps/MCP bundles to run outside containment for testing; this exposes the device to additional threats like cross-prompt injection (XPIA) and should not be relied on for production.
- **App Actions caller filtering**: `allowedAppInvokers` in the action definition JSON restricts action *discovery*; the `$.Token` URI parameter or AUMID/PFN checks at invocation time (via `CoImpersonateClient`) further validate that an action was actually invoked by the Action Runtime. See [Detect and filter callers](./actions-filter-caller.md).
- **Content age rating**: App Actions and Agent Launcher actions can declare `contentAgeRating` (`"Child"`, `"Minor"`, `"Adult"`) to gate access by age group; default allows all ages. See [Responsible AI and safety](./actions-rai-safety.md).
- **Agent Workspace / agent accounts**: the OS-level isolation model for interactive agents (such as Copilot Actions), built on dedicated agent accounts, a contained agent desktop, and explicit, revocable user authorization — disabled by default. See [Agent Workspace](./agent-workspace.md).
- **Responsible AI**: action and agent authors are responsible for content moderation and abuse monitoring of AI-generated entities returned to users.

## Related

- [Securely containing MCP servers on Windows](./mcp-containment.md)
- [Detect and filter callers for App Actions on Windows](./actions-filter-caller.md)
- [Responsible AI and safety for App Actions on Windows](./actions-rai-safety.md)
- [Agent Workspace](./agent-workspace.md)
