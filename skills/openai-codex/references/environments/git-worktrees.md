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

- Worktrees run on the computer or remote development environment that contains the project; the ChatGPT mobile app controls Codex on the connected computer and worktrees don't run locally on your phone. A worktree is a second checkout of your repository with its own copy of every file but shared `.git` metadata, so you can work on multiple branches in parallel.
- Why use one: work in parallel without disturbing your Local setup, queue background work, and move a chat into Local later to inspect, test, or collaborate. Think of Local as the foreground and Worktree as the background.
- Option 1, stay on the worktree: use **Create branch here** in the chat header, then commit, push, and open a pull request; open your IDE with **Open** or use the integrated terminal. Option 2, **Hand off** to Local (or from Local to a worktree): Codex handles the Git steps; each chat keeps the same associated worktree over time. Files in `.gitignore` don't move with the chat unless copied into a managed worktree via `.worktreeinclude`.
- How Codex manages worktrees: they live under `$CODEX_HOME/worktrees`; the starting commit is the `HEAD` of the selected branch (uncommitted changes on that branch are applied too); the worktree is in detached HEAD state so Codex can create several without polluting branches. Codex-managed worktrees are lightweight and typically dedicated to one chat; a permanent worktree (project three-dot menu in the sidebar) is created as its own project and can host multiple chats.
- `.worktreeinclude`: copies ignored paths or `.gitignore`-style patterns (e.g. `.env`, `.env.local`, `config/secrets.json`) into new local managed worktrees; only ignored files matching it are copied, tracked files shouldn't be listed, source symlinks are skipped, existing files aren't overwritten, and it doesn't apply to remote worktrees or Git worktrees you create from the command line. Codex automatically copies an ignored `AGENTS.override.md`.
- Branch limitation: checking out a branch already used by a worktree fails with `fatal: '<branch>' is already used by worktree at '<WORKTREE_PATH>'`; check out another branch on the worktree, or use Handoff to move the chat into Local. Git enforces one branch per worktree so each branch has a single authoritative working copy.
- Cleanup: Codex keeps the most recent 15 Codex-managed worktrees by default (changeable, or turn off automatic deletion in settings). It won't auto-delete a worktree tied to a pinned chat, an in-progress chat, or a permanent worktree; it deletes them when you archive the chat or the limit is exceeded. A snapshot is saved before deletion; reopening the chat offers a restore. Chats remain in history after the worktree directory is deleted; permanent worktrees aren't deleted when you archive their chats.
- FAQ: change the location under **Settings > Worktrees > Worktree root**; move chats between Local and Worktree with **Hand off** in the chat header.
- Worktrees require the project to be a Git repository; scheduled tasks on non-version-controlled projects run directly in the project directory.
- Git only allows a branch to be checked out in one place at a time — a branch created on a worktree (**Create branch here**) can't also be checked out in the local checkout or another worktree until it's freed via Handoff.
- Codex-managed worktrees live under `$CODEX_HOME/worktrees` (configurable at **Settings > Worktrees > Worktree root**); Codex keeps the most recent 15 by default and deletes older ones unless a pinned/in-progress chat or a permanent worktree references them (a snapshot is saved before deletion and can be restored).
- Permanent worktrees (created from a project's three-dot menu) are not automatically deleted and can host multiple chats.

## Related

- [modes.md](./modes.md)
- [local-environment.md](./local-environment.md)
