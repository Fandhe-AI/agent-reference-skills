# Context References

Type `@` followed by a reference to inject content into a message. Hermes expands the reference inline and appends the content under an `--- Attached Context ---` section.

## Signature / Usage

```text
Review @file:src/main.py and suggest improvements
What changed? @diff
What's in @folder:src/components?
Summarize this article @url:https://arxiv.org/abs/2301.00001
@file:src/main.py:10-25     # Lines 10 through 25 (inclusive)
```

## Supported References

| Syntax | Description |
|--------|-------------|
| `@file:path/to/file.py` | Inject file contents |
| `@file:path/to/file.py:10-25` | Inject a line range (1-indexed, inclusive); `:42` is a single line |
| `@folder:path/to/dir` | Inject directory tree listing with file metadata |
| `@diff` | Inject `git diff` (unstaged changes) |
| `@staged` | Inject `git diff --staged` |
| `@git:5` | Inject last N commits with patches (max 10) |
| `@url:https://example.com` | Fetch and inject web page content |

## Size Limits

| Threshold | Value | Behavior |
|-----------|-------|----------|
| Soft limit | 25% of context length | Warning appended, expansion proceeds |
| Hard limit | 50% of context length | Expansion refused, original message returned unchanged |
| Folder entries | 200 files max | Excess replaced with `- ...` |
| Git commits | 10 max | `@git:N` clamped to [1, 10] |

## Notes

- Trailing punctuation (`,` `.` `;` `!` `?`) is stripped from reference values. Invalid line ranges are silently ignored (full file returned).
- CLI tab completion: `@` lists reference types; `@file:` / `@folder:` complete filesystem paths with sizes.
- Always blocked from `@file:`: `~/.ssh/id_rsa`, `~/.ssh/id_ed25519`, `~/.ssh/authorized_keys`, `~/.ssh/config`, shell profiles (`~/.bashrc`, `~/.zshrc`, `~/.profile`, `~/.bash_profile`, `~/.zprofile`), `~/.netrc`, `~/.pgpass`, `~/.npmrc`, `~/.pypirc`, `$HERMES_HOME/.env`. Fully blocked directories: `~/.ssh/`, `~/.aws/`, `~/.gnupg/`, `~/.kube/`, `$HERMES_HOME/skills/.hub/`.
- Paths resolving outside the workspace root are rejected. Binary files (MIME type and null-byte scan) are rejected with a warning; known text extensions bypass MIME detection.
- Primarily a CLI feature: messaging gateways pass `@` text through unexpanded; the agent can still use `read_file`, `search_files`, `web_extract`.
- Expanded content is summarized, not preserved verbatim, when context is compressed; use line ranges for large files.
- Invalid references produce inline warnings (file not found, binary file, folder not found, git stderr, no content extracted, sensitive credential file, outside workspace) rather than failures.

## Related

- [Context Files](./context-files.md)
- [Tools](./tools.md)
