# Use Codex in Linear

Delegate work from Linear issues: assign an issue to Codex or mention `@Codex` in a comment, and Codex creates a cloud chat and replies with progress and results. Available on paid plans.

## Signature / Usage

```md
# In a Linear issue comment thread
@Codex fix this in openai/codex

# CLI: connect Linear MCP for local access to issues
codex mcp add linear --url https://mcp.linear.app/mcp
```

```toml
# ~/.codex/config.toml (manual MCP setup)
[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"
```

## Set up the Linear integration

1. Set up [Codex cloud chats](../getting-started/cloud.md): connect GitHub in Codex and create an environment for the target repository.
2. Go to Codex settings (`chatgpt.com/codex/settings/connectors`) and install **Codex for Linear** for the workspace.
3. Link the Linear account by mentioning `@Codex` in a comment thread on a Linear issue.
4. Enterprise plans: a workspace admin must turn on Codex cloud chats and enable **Codex for Linear** in connector settings.

## Delegate work to Codex

- **Assign an issue to Codex** the same way issues are assigned to teammates; Codex starts work and posts updates back to the issue.
- **Mention `@Codex` in comments** to delegate work or ask questions; follow up in the thread to continue the same chat.
- Pin a specific repo by naming it in the comment, e.g. `@Codex fix this in openai/codex`.
- **Automatic assignment**: in Linear, Settings > team > Triage, turn on Triage and add a rule with **Delegate > Codex**. Codex then runs chats using the account of the issue creator.

### How Codex chooses an environment and repo

Linear suggests a repository from issue context; Codex picks the environment that best matches, falling back to the most recently used environment if ambiguous. The chat runs against the default branch of the first repository listed in that environment's repo map.

## Notes

- `codex mcp add linear` / the `[mcp_servers.linear]` block here is Linear's own remote MCP server for **local** Codex (CLI/IDE/desktop app) access to issues — a specific server instance, distinct from the general MCP client configuration mechanism documented in `config/mcp-config.md`.
- Data handling for `@Codex` mentions follows OpenAI's Privacy Policy and Terms of Use; see the security-automation category for Codex's own security model.

## Related

- [Codex cloud](../getting-started/cloud.md)
- [MCP server configuration](../config/mcp-config.md)
- [Use Codex in Slack](./slack.md)
