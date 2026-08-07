# Permissions and security

| Name | Description | Path |
|------|-------------|------|
| Claude Security plugin | Official plugin that runs a multi-agent vulnerability scan of a codebase inside a Claude Code session — maps architecture, builds a threat model, hunts for vulnerabilities, and independently reviews every finding before turning it into a reviewable patch. | [claude-security.md](./claude-security.md) |
| Data usage | Anthropic's data usage, training, and retention policies for Claude Code. | [data-usage.md](./data-usage.md) |
| Legal and compliance | Legal agreements, compliance certifications, and security-reporting information for Claude Code. | [legal-and-compliance.md](./legal-and-compliance.md) |
| Choose a permission mode | Permission modes control how often Claude Code pauses to ask before editing files, running commands, or making network requests. | [permission-modes.md](./permission-modes.md) |
| Configure permissions | Fine-grained permission rules, modes, and managed policies that control what Claude Code can access and do. | [permissions.md](./permissions.md) |
| Choose a sandbox environment | Compares Claude Code isolation options — from the built-in per-command Bash sandbox to a fully separate virtual machine — and how to pick one for a threat model. | [sandbox-environments.md](./sandbox-environments.md) |
| Configure the sandboxed Bash tool | Built-in per-command OS-level sandbox (Seatbelt on macOS, bubblewrap on Linux/WSL2) that lets Claude run most shell commands without a permission prompt by enforcing filesystem and network boundaries instead. | [sandboxing.md](./sandboxing.md) |
| security-guidance plugin | Official plugin that has Claude review its own code changes for common vulnerabilities while it works, and fix what it finds in the same session. | [security-guidance.md](./security-guidance.md) |
| Security | Claude Code's overall security safeguards and best practices. | [security.md](./security.md) |
| Zero data retention (ZDR) | ZDR for Claude Code is available to qualified accounts on Claude for Enterprise; when enabled, prompts and model responses generated during Claude Code sessions are processed in real time and not stored by Anthropic after the response is returned, except where required by law or to combat misuse. | [zero-data-retention.md](./zero-data-retention.md) |
