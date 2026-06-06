# Local Override

Use `lefthook-local.yml` to override or extend the shared configuration without modifying the committed file.

```yaml
# lefthook.yml  (committed to repository)

pre-commit:
  commands:
    lint:
      glob: "*.rb"
      run: bundle exec rubocop -- {staged_files}
    check-links:
      run: lychee -- {staged_files}
```

```yaml
# lefthook-local.yml  (git-ignored, per-developer)

pre-commit:
  parallel: true
  commands:
    lint:
      run: docker-compose run backend {cmd}   # {cmd} expands to the original run value
    check-links:
      skip: true

post-merge:
  files: "git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD"
  commands:
    dependencies:
      glob: "Gemfile*"
      run: docker-compose run backend bundle install
```

## Notes

- Add `lefthook-local.yml` to `~/.gitignore` (global) so it is never accidentally committed
- `{cmd}` in `run` expands to the original command string from `lefthook.yml`, enabling wrapping (e.g., with Docker)
- `skip: true` on a command disables it locally without removing it from the shared config
- New hooks added only in `lefthook-local.yml` (e.g., `post-merge`) are merged into the final config
