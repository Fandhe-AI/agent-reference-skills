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
- `/worktree new [name]` creates `.worktrees/<name>/` on branch `hermes/<name>` (based on the freshly fetched remote tip unless `worktree_sync: false`) and retargets terminal and file tools into it without a restart; omitting the name gives `hermes-<id>`. `/worktree` shows the active tree, `/worktree list` lists all. On exit the tree is kept only if it has unpushed commits, like `hermes -w`.
- `hermes -w` checks the worktree out without the repository's own git configuration (hooks, `core.fsmonitor`, clean/smudge filters are off). Git LFS repos get pointer files; run `git lfs pull` inside the worktree.
- Each worktree writes checkpoints under a different shadow hash derived from its path, so `/rollback` is independent per worktree.
- Cleanup: `git worktree remove ../repo-feature` refuses with uncommitted changes unless forced; it does not delete the branch. `~/.hermes/checkpoints/` data is not pruned automatically on removal.
- Avoid running Hermes from the bare repo root when using worktrees.

## Related

- [checkpoints-and-rollback.md](./checkpoints-and-rollback.md)
