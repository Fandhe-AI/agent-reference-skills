# Run a deep security scan

Search an authorized repository deeply for plausible vulnerabilities.

```text
Use $codex-security:deep-security-scan to run a deep security scan on [this repository / absolute path to a scoped folder].

Scope and rules:
- I am authorized to assess this repository.
- Keep the scan within [the entire repository / the exact folder named above].
- Use the Codex Security plugin's deep-scan workflow; do not reinterpret this as a pull request or diff review.

Return the scan directory and report.md path. Summarize the findings, reviewed surfaces, structural hardening guidance, and proof gaps that require human review first.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `suggestedEffort: high`. Uses the `$codex-security:deep-security-scan` skill
- Best for: application security reviews of an owned or authorized repository/component; more comprehensive reviews where extra runtime and token cost are acceptable
- For diff-level reviews, use Scan code changes for security (`scan-code-changes-for-security.md`); to fix found issues, use Remediate a vulnerability backlog (`remediate-vulnerability-backlog.md`)
