<!-- source: https://code.claude.com/docs/en/security.md / last verified: 2026-08-07 -->

# Security

Claude Code's overall security safeguards and best practices.

## Overview

- **Permission-based architecture**: strict read-only permissions by default; additional actions (edit files, run tests, execute commands) require explicit approval. Bash commands that modify the system require approval except a built-in read-only set (`ls`, `cat`, `git status`, etc.).
- **Built-in protections**: sandboxed Bash tool (filesystem/network isolation via `/sandbox`), working-directory write boundary (reads outside it prompt; extend with additional directories), allowlisting for prompt-fatigue mitigation, Accept Edits mode (auto-approves edits and a fixed filesystem command set).
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

- Windows: avoid enabling WebDAV or `\\*` paths — deprecated by Microsoft and a known bypass vector for the permission system.
- MCP servers are configured in checked-in settings; Anthropic reviews connectors against listing criteria for its Directory but does not security-audit third-party MCP servers.
- Cloud execution (Claude Code on the web) adds: isolated per-session VMs, network access controls, a secure GitHub credential proxy, git push restricted to the current branch, audit logging, automatic VM cleanup.
- Remote Control sessions run locally (code execution and file access stay on the user's machine); session transcripts are still stored on Anthropic servers to sync across devices.
- Report vulnerabilities via the Anthropic HackerOne program, not public disclosure.

## Related

- [permissions](./permissions.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
- [security-guidance](./security-guidance.md)
- [claude-security](./claude-security.md)
