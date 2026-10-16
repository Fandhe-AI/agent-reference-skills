# Code review

Use ChatGPT or Codex to understand code changes, investigate potential issues, and prepare review feedback: the Code Review plugin for pull requests, and the built-in `/review` command for local Git changes.

## Signature / Usage

```text
# Local changes (app composer, CLI, IDE extension; Git repository required)
/review

# Example prompt in a pull request chat
Walk me through this pull request. Focus on the default filter and what
happens when there are no matching issues. All should remain the default.
```

## Pull request reviews (app and web)

- The Code Review plugin shows a pull request's description, changed files, comments, and checks. In the desktop app it can be pinned to the sidebar from installed plugins.
- View a pull request: open **Code Review** -> connect a source account with repository access -> select a pull request or paste its link -> read **Summary** (description, activity, comments, checks) and **Changes** (files and comments beside the diff).
- Inbox (app): **Assigned to me**, **Assigned to my team**, **Authored by me**. Pin a review from its toolbar to find it under **Pinned**. In **Changes**, **Mark as viewed** applies to the displayed revision. **Stack** in **Summary** opens related dependent pull requests.
- Automatic cloud review: with the ChatGPT Codex connector, required repository permissions, and automatic reviews enabled, Codex can review a GitHub pull request before you open it; comments appear on GitHub and in Code Review. No cloud environment is required.
- Chat: describe expected behavior and ask Codex to explain or investigate the change; **Review with Codex** (app) starts a review in a new chat. Verify the referenced diff and tests.
- Review instructions (app): the gear next to **Review with Codex**, or **Settings** > **Code Review**. They apply to reviews started with **Review with Codex** across repositories; edits during a running review apply to the next review. Optional **Comic book**, **Visualization**, or **PDF** adds a suggested instruction.

```text
Start with a short summary. Prioritize behavior changes, data loss, and
missing edge-case tests. For each finding, explain the triggering input,
expected behavior, and actual behavior. Use our team's concise review style.
```

- Share feedback: reviewing in chat does not post comments, approve, or merge. Posting in **Summary** or **Changes** sends the comment to the source provider immediately, without waiting for **Submit review**. **Submit review** offers **Comment**, **Approve**, or **Request changes**.
- **Fix** in **Checks** (app, open pull request) attaches failing checks to the chat and prepares, but does not send, a message. For third-party CI, Codex can use the status and output reported to GitHub.

## Review local changes

| Client | How |
|--------|-----|
| App | `/review` in the composer -> **Review against a base branch** or **Review uncommitted changes**; also the review pane. Requires a project inside a Git repository (the app offers to create one). |
| CLI | `/review` opens presets: **Review against a base branch** (merge base), **Review uncommitted changes** (staged, unstaged, untracked), **Review a commit**, **Custom review instructions**. A dedicated reviewer reads the diff and does not change the working tree. |
| IDE extension | `/review` -> **Review against a base branch** or **Review uncommitted changes**. Appears only inside a Git repository. |
| ChatGPT Work (web) | Upload code or make it available via an installed source plugin; name the pull request, branch, commit, files, and criteria in the prompt. |

## Review pane (app)

- Default scope is **Unstaged**; also **Staged**, **Commit**, **Branch** (diff against base branch), **Last turn**. The pane reflects the Git repository state, including changes you made yourself.
- Multiple repositories: use the repository selector in the review header; **Last turn** shows **All repos**; other scopes apply to the selected repository.
- Inline comments: hover a line -> **+** -> write feedback -> submit, then send a follow-up chat message stating intent (for example, "Address the inline comments and keep the scope minimal."). Comments are treated as review guidance.
- Stage, unstage, or revert at the entire diff, per file, or per hunk level.
- Clicking a file name opens it in your chosen editor; clicking the name background expands or collapses the diff; Command-click a line opens that line in the editor.
- Results appear as inline comments in the review pane. Reviews run in the current chat by default; **Settings** > **General** > **Code review** -> **Detached** starts a separate review chat.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `review_model` | `config.toml` key (CLI) | Use a different model for reviews than the current session |
| `chatgpt.reviewDelivery` | IDE setting | Set to `detached` so `/review` starts a separate review chat (default: current chat) |

## Notes

- GitHub code review is generally available; GitLab merge request support in Code Review is in preview.
- If you ask Codex to apply fixes it finds, your normal sandbox and approval settings apply.
- Editing pull request descriptions with attached images is not supported in Code Review; edit them in GitHub.
- Automatic cloud reviews are separate from reviews you start in the pull request's chat.
- Source: https://learn.chatgpt.com/docs/code-review (retrieved 2026-10).

## Related

- [Review GitHub pull requests with Codex](./github.md)
- [Review GitLab merge requests with Codex](./gitlab.md)
