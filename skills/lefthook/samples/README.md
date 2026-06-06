# samples

| Name | Description | Path |
|------|-------------|------|
| Auto-fix and Stage | Automatically fix lint errors and re-stage the corrected files so they are included in the commit. | [auto-fix-and-stage.md](./auto-fix-and-stage.md) |
| Basic Setup | Install lefthook and configure a pre-commit hook that runs a linter on staged files. | [basic-setup.md](./basic-setup.md) |
| Commitlint Integration | Validate commit messages against Conventional Commits using commitlint, with optional interactive message generation via Commitizen. | [commitlint-integration.md](./commitlint-integration.md) |
| Conditional Skip | Skip or restrict hook execution based on branch name, Git state, or environment variable. | [conditional-skip.md](./conditional-skip.md) |
| Local Override | Use `lefthook-local.yml` to override or extend the shared configuration without modifying the committed file. | [local-override.md](./local-override.md) |
| Monorepo Setup | Run different linters for each sub-project in a monorepo by scoping commands with `root` and `glob`. | [monorepo-setup.md](./monorepo-setup.md) |
| Parallel Execution | Run multiple hook commands concurrently to reduce total wait time. | [parallel-execution.md](./parallel-execution.md) |
| Shared Config via Remotes | Fetch hook configuration from a remote Git repository to share a common setup across multiple projects. | [shared-config-via-remotes.md](./shared-config-via-remotes.md) |
