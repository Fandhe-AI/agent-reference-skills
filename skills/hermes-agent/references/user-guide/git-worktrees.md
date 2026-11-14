# Git Worktrees

Run multiple Hermes agents safely on the same repository by giving each session its own git worktree (own branch, own working directory, own checkpoint history).

## Signature / Usage

```bash
cd /path/to/your/repo
hermes -w          # disposable worktree under .worktrees/ with its own branch
hermes -w -z "Fix issue #123"
```

In-session:

```
/worktree new my-experiment
```

Manual worktrees:

```bash
git worktree add ../repo-feature feature/hermes-experiment
cd ../repo-feature
hermes
```

## Notes

- Hermes treats the current working directory as the project root (CLI: where you run `hermes`; gateways: `terminal.cwd` in `~/.hermes/config.yaml`).
- `/worktree new [name]` creates `.worktrees/<name>/` on branch `hermes/<name>` (based on the freshly fetched remote tip unless `worktree_sync: false`) and retargets terminal and file tools into it without a restart; omitting the name gives `hermes-<id>`. `/worktree` shows the active tree, `/worktree list` lists all. On exit a clean, pushed tree is removed; a tree with uncommitted changes or unpushed commits triggers the same keep / archive / remove question as `hermes -w`.
- Leaving an interactive `hermes -w` session (classic CLI or `--tui`) with uncommitted changes or unpushed commits asks: **Keep the worktree** (default; Enter/Esc), **Archive and remove it** (archived first, tree removed before exit, `hermes worktree restore` command printed; tree kept if the archive fails), or **Remove it and discard the changes** (only when picked explicitly). One-shot runs (`-q`, `-z`), cron, gateway sessions and any exit without a terminal never ask: the tree is kept for the stale-worktree sweep.
- Stale worktree sweep: every repository Hermes creates a worktree in (`hermes -w`, `/worktree new`, subagent worktree isolation, the desktop git pane) is recorded in `<HERMES_HOME>/worktree_repos.json`; at `hermes -w` startup and every 6 hours from the cron ticker each repository's `.worktrees/` is swept. Idle past its tier (`hermes-*` / `subagent-*` 24 h, named trees 72 h): clean and merged/pushed -> removed; uncommitted or unpushed -> archived, then removed. Never touched: live hermes lock owner or a live process whose cwd is inside, activity younger than the tier, Kanban task trees (`t_<hex>`). Kept: submodules (`keep-submodule-work`), embedded repositories (`keep-unarchivable`), commits held only by per-worktree refs (`keep-worktree-refs`), untracked files above `worktrees.archive_max_file_mb` (`keep-large-untracked`). Ignored files are not archived and are deleted with the tree.
- An archive is a commit at `refs/hermes/archive/<tree>` holding HEAD, staged, unstaged and untracked files (gitignored files such as `node_modules/` are not captured), built with a temporary index; bytes are stored exactly (no `.gitattributes` / filter rules). A branch that exists on a remote (an open PR) is kept; otherwise the archive holds its commits and the local branch is deleted. Restore puts the branch back when it is missing or still at the archived HEAD, else the tree comes back detached. Archives older than `worktrees.archive_retention_days` are deleted by the sweep. No limit on tree count; `max_total_gb` only evicts idle trees past their tier. Subagent worktrees (`delegation.worktree_isolation: true`): a clean tree is removed; a tree with commits or edits is archived and removed with its branch kept for the parent to merge.

```bash
hermes worktree list                 # trees plus archives (name, age, branch, reason)
hermes worktree prune --dry-run      # every archive/remove/skip decision and why; changes nothing
hermes worktree restore lane-x       # recreate .worktrees/lane-x with its branch, staged and untracked files
hermes worktree restore lane-x --path ../lane-x-review
```

```yaml
worktrees:
  archive_dirty: true          # false = never remove dirty/unpushed trees (the old behaviour)
  archive_max_file_mb: 50      # untracked files above this are not archived; their tree is kept
  archive_retention_days: 30   # 0 keeps archives forever
  max_total_gb: 0              # optional budget for idle trees; oldest are archived + removed first
  install_state_retention_days: 14  # dependency state of a missing checkout outside .worktrees/ and
                               # the data root, unused this long, is reclaimed; 0 keeps it forever.
                               # Read from the root profile's config: its profiles share installs/
```

- `hermes -w` checks the worktree out without the repository's own git configuration (hooks, `core.fsmonitor`, clean/smudge filters are off). Git LFS repos get pointer files; run `git lfs pull` inside the worktree.
- Each worktree writes checkpoints under a different shadow hash derived from its path, so `/rollback` is independent per worktree.
- Cleanup: `git worktree remove ../repo-feature` refuses with uncommitted changes unless forced; it does not delete the branch. `~/.hermes/checkpoints/` data is not pruned automatically on removal.
- Avoid running Hermes from the bare repo root when using worktrees.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/git-worktrees (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): on exit, v0.22.2 kept a worktree only if it had unpushed commits; v0.23.1 removes a clean, pushed tree and asks keep / archive / remove for dirty or unpushed trees, and adds the stale-worktree sweep with `hermes worktree list|prune|restore`.

## Related

- [checkpoints-and-rollback.md](./checkpoints-and-rollback.md)
