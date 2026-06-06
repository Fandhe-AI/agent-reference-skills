# Commitlint Integration

Validate commit messages against Conventional Commits using commitlint, with optional interactive message generation via Commitizen.

```bash
# Install dependencies
yarn add -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog
```

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

```json
// package.json (commitizen adapter)
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

```yaml
# lefthook.yml

prepare-commit-msg:
  commands:
    commitizen:
      interactive: true
      run: yarn run cz --hook
      env:
        LEFTHOOK: 0

commit-msg:
  commands:
    commitlint:
      run: yarn run commitlint --edit {1}
```

## Notes

- `{1}` in `commit-msg` expands to the path of the temporary commit message file passed by Git
- `interactive: true` on `commitizen` allows the CLI prompt to receive keyboard input
- `LEFTHOOK: 0` in the `prepare-commit-msg` env prevents lefthook from re-triggering recursively when Commitizen calls `git commit`
- To bypass Commitizen and write a message directly: `git commit -m "fix: typo"`
