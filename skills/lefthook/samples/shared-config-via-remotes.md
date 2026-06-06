# Shared Config via Remotes

Fetch hook configuration from a remote Git repository to share a common setup across multiple projects.

```yaml
# lefthook.yml

remotes:
  - git_url: https://github.com/my-org/lefthook-configs
    configs:
      - shared/pre-commit.yml
      - shared/commit-msg.yml

# Local hooks can still be added alongside remote ones
pre-push:
  commands:
    test:
      run: yarn test
```

## Notes

- Lefthook downloads the remote configs during `lefthook install` and merges them with the local configuration
- `configs` lists paths within the remote repository; multiple files can be specified
- Remote configuration is merged before `lefthook-local.yml`, so local overrides take precedence
- Pin a specific revision with `ref` to avoid unexpected changes: `ref: v1.2.0`
