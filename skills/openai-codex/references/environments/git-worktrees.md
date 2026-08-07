# Worktrees

Git worktrees in Codex in the ChatGPT desktop app let Codex run multiple independent chats in the same project without interfering with each other, and move a chat between Local and Worktree via Handoff.

## Signature / Usage

```text
# .worktreeinclude — copy ignored local files into managed worktrees
.env
.env.local
config/secrets.json
```

## Options / Props

| Name | Description |
|------|-------------|
| Local checkout | The repository you created; also called Local in the app. |
| Worktree | A [Git worktree](https://git-scm.com/docs/git-worktree) created from the local checkout in the app; shares `.git` metadata with the local checkout. |
| Handoff | Moves a chat (and its code) between Local and Worktree; Codex handles the required Git operations. |
| `.worktreeinclude` | Repo-root file listing `.gitignore`-style patterns of ignored files (e.g. `.env`) to copy into a new managed worktree. Tracked files must not be listed. |

## Getting started

1. Select **Worktree** under the composer in the new chat view (optionally choose a local environment for setup scripts).
2. Choose the starting Git branch (`main`/`master`, a feature branch, or the current branch with unstaged changes).
3. Submit the prompt; Codex creates a worktree in a detached HEAD state.
4. Keep working on the worktree, or hand the chat off to the local checkout.

## Notes

- Worktrees require the project to be a Git repository; scheduled tasks on non-version-controlled projects run directly in the project directory.
- Git only allows a branch to be checked out in one place at a time — a branch created on a worktree (**Create branch here**) can't also be checked out in the local checkout or another worktree until it's freed via Handoff.
- Codex-managed worktrees live under `$CODEX_HOME/worktrees` (configurable at **Settings > Worktrees > Worktree root**); Codex keeps the most recent 15 by default and deletes older ones unless a pinned/in-progress chat or a permanent worktree references them (a snapshot is saved before deletion and can be restored).
- Permanent worktrees (created from a project's three-dot menu) are not automatically deleted and can host multiple chats.

## Related

- [modes.md](./modes.md)
- [local-environment.md](./local-environment.md)
