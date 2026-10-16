<!-- source: https://code.claude.com/docs/en/security.md / last verified: 2026-10-16 -->

# Security

Claude Code's overall security safeguards and best practices.

## Signature / Usage

- **Permission-based architecture**: strict read-only permissions by default; additional actions (edit files, run tests, execute commands) require explicit approval. Bash commands that modify the system require approval except a built-in read-only set (`ls`, `cat`, `git status`, etc.).
- **Permission modes**: auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions (a classifier reviews actions instead of you; your ask/deny rules still apply; organizations can turn it off). Manual mode starts read-only and asks before edits, tests, and commands.
- **Built-in protections**: sandboxed Bash tool (filesystem/network isolation via `/sandbox`), working-directory boundary (in Manual mode, file tools ask before reading or writing outside the start folder; it is a permission prompt, so an approved Bash command can still write anywhere your user account can — use sandboxing for OS-level enforcement), allowlisting for prompt-fatigue mitigation, Accept Edits mode (auto-approves edits and `mkdir`, `touch`, `rm`, `mv`, `cp`, `sed` for paths in the working directory; other Bash commands and out-of-scope paths still prompt).
- **User responsibility**: Claude Code only has the permissions granted; users must review proposed code/commands before approval.

## Options / Props

| Safeguard | Purpose |
|---|---|
| Context-aware analysis | Detects potentially harmful instructions from the full request |
| Input sanitization | Prevents command injection |
| Network command approval | `curl`/`wget` are not auto-approved by default; prompt like any non-read-only Bash command |
| Isolated context windows | WebFetch uses a separate context window to avoid injecting malicious prompts |
| Trust verification | First-time codebase runs and new MCP servers require trust acceptance (disabled with `-p`) |
| Command injection detection | Suspicious bash commands require manual approval even if allowlisted |
| Fail-closed matching | Unmatched commands default to requiring approval |
| Secure credential storage | macOS Keychain; file permissions on Windows/Linux |

## Notes

- The official page contains no code examples; none are added here.
- Windows: avoid enabling WebDAV or `\\*` paths — deprecated by Microsoft and a known bypass vector for the permission system.
- MCP servers are configured in checked-in settings; Anthropic reviews connectors against listing criteria for its Directory but does not security-audit third-party MCP servers.
- Cloud sessions add: isolated Anthropic-managed per-session VMs, network access controls (limited by default; can be disabled or restricted to specific domains), credential protection (GitHub credentials stored encrypted on Anthropic's servers and never enter the VM; the VM holds a short-lived credential scoped to the session, and GitHub traffic goes through an Anthropic proxy that attaches the credential server-side), push restrictions (the proxy rejects branch deletions and pushes of anything other than a branch, such as a tag; GitHub applies your repository's branch protection rules and rulesets to the connected access, and a rule that access can bypass doesn't block a session's push), audit logging, automatic VM cleanup after inactivity, and session deletion at any time.
- Sessions routed to a self-hosted environment run on your own infrastructure, where isolation, network egress, and git credentials are your deployment's responsibility.
- Remote Control sessions run locally (code execution and file access stay on the user's machine); session transcripts are still stored on Anthropic servers to sync across devices.
- Report vulnerabilities via the Anthropic HackerOne program, not public disclosure.

## Related

- [permissions](./permissions.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
- [security-guidance](./security-guidance.md)
- [claude-security](./claude-security.md)
