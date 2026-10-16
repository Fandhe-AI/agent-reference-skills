# Local Setup

Validate commit messages locally with Git hooks using Husky.

> **Source**: https://commitlint.js.org/guides/local-setup

Local linting gives immediate feedback, but it is easy to bypass, so pair it with CI Setup for production-grade validation.

## Adding a Hook

### Using Husky v9

Install Husky and configure the `commit-msg` hook.

```bash
# npm
npm install --save-dev husky
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# yarn
yarn add --dev husky
yarn husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# pnpm
pnpm add -D husky
pnpm exec husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

```bash
# bun
bun add -d husky
bunx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### Notes for Windows

On Windows, make sure all Husky files are encoded as **UTF-8**.

When using PowerShell, escaping differs:

```powershell
echo "npx --no -- commitlint --edit `$1" > .husky/commit-msg
```

### Alternative using an npm script

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

### Using Git hooks directly

You can also set up the Git `commit-msg` hook directly without Husky. See the [Git documentation](https://git-scm.com/docs/githooks). The hook file must be named `commit-msg`.

## Testing

### Verify commitlint works

```bash
# npm
npx commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# yarn
yarn commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# pnpm
pnpm commitlint --from HEAD~1 --to HEAD --verbose
```

```bash
# bun
bun commitlint --from HEAD~1 --to HEAD --verbose
```

### Verify the hook works

#### Example of a failing commit

```bash
git commit -m "foo: this will fail"
```

Output:

```
⧗   --- input ---
foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]
✖   found 1 problems, 0 warnings
husky - commit-msg script failed (code 1)
```

#### Example of a passing commit

```bash
git commit -m "chore: lint on commitmsg"
```

commitlint prints nothing when there are no problems. Use the `--verbose` flag if you want confirmation output.

## Notes

- Since v21.0.0, commitlint prints the commit message after a line break (EOL) instead of after the colon. The `--legacy-output` flag restores the old output format.
