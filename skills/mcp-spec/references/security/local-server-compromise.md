---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices#local-mcp-server-compromise
---

# Local MCP Server Compromise

Local MCP servers run on a user's machine (downloaded and executed, self-authored, or installed through a client's configuration flows). They may have direct access to the user's system and may be reachable by other local processes, making them attractive targets. Also covers stdio Transport Security in Proxy Scenarios.

## Signature / Usage

Example malicious startup commands that could be embedded in a client configuration (the source shows attack examples; abridged here as non-executable placeholders):

```text
# ATTACK EXAMPLES ONLY - DO NOT RUN. Placeholders, not executable commands.

# Data exfiltration: a startup command that runs a malicious package, then
# sends a sensitive local file (e.g. an SSH private key) to a remote location
<attacker-controlled command> && <upload sensitive file to attacker-controlled URL>

# Privilege escalation: a startup command that uses elevated privileges to
# delete system files, then prints a benign-looking message
<privileged destructive command> && echo "MCP server installed!"
```

## Options / Props

Attack vectors: malicious "startup" command in a client configuration; malicious payload inside the server itself; insecure local server left running on localhost reached via DNS rebinding.

Risks: arbitrary code execution (with MCP client privileges), no visibility, command obfuscation, data exfiltration (via compromised JavaScript), data loss.

## Notes

- The attack-example block above is an abridged rendering of the source: the original concrete commands are replaced with placeholders so they cannot be copy-pasted and run; see the source URL for the verbatim text.
- If an MCP client supports one-click local MCP server configuration, it **MUST** implement proper consent mechanisms prior to executing commands. Before connecting, the client **MUST**: show the exact command without truncation (arguments and parameters included); identify it as a potentially dangerous operation that executes code on the user's system; require explicit user approval; allow users to cancel.
- Clients **SHOULD**: highlight dangerous command patterns (`sudo`, `rm -rf`, network operations, file access outside expected directories); warn for sensitive locations (home directory, SSH keys, system directories); warn that servers run with the client's privileges; run server commands in a sandbox with minimal default privileges; restrict file system, network and other resources; let users grant extra privileges explicitly; use platform-appropriate sandboxing (containers, chroot, application sandboxes); keep sandboxing up to date.
- Local servers **SHOULD** prevent unauthorized use by malicious processes: use the `stdio` transport to limit access to the MCP client; if using HTTP, require an authorization token or use unix domain sockets or other restricted IPC.
- stdio Transport Security in Proxy Scenarios: the `stdio` transport itself is not inherently vulnerable. In proxy architectures where a separate proxy service manages `stdio` connections and spawns MCP servers as child processes, client-side code execution (e.g. XSS via OAuth URL vulnerabilities) can steal the client-proxy authentication token and make the proxy spawn arbitrary commands (RCE with user privileges). This applies only to proxy architectures, not direct `stdio` use.
- stdio proxy mitigation: prevent the enabling vulnerabilities (see oauth-redirect-attacks.md), use CSP, validate and sanitize all input from MCP servers. Proxy services **SHOULD**: sandbox or containerize spawned processes; restrict file system access for spawned servers; log all `stdio` transport usage; require additional authorization for potentially dangerous commands. Clients **SHOULD**: isolate proxy communication in a separate security context, apply least privilege to the proxy process, sandbox the proxy, consider running it in a container.
- Distance line: host-side configuration such as `.mcp.json` or `claude_desktop_config.json` lives in anthropic-claude-code-extend; this page states the protocol-level security considerations only.

## Related

- [oauth-redirect-attacks.md](./oauth-redirect-attacks.md)
- [security-best-practices.md](./security-best-practices.md)
