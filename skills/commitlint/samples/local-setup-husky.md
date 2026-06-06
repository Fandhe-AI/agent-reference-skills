# Local Setup with Husky

Enforce commit message validation automatically via the `commit-msg` git hook using husky.

```bash
# Install husky
npm install --save-dev husky
npx husky init

# Register commitlint as the commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

Verify the setup by making a commit that should fail:

```bash
git commit -m "foo: this will fail"
# ✖ type must be one of [build, chore, ci, docs, feat, fix, ...]
```

Validate the last commit manually:

```bash
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## Notes

- The hook file must be named `commit-msg`; `pre-commit` is not supported by commitlint
- Since v8.0.0, commitlint only outputs messages when problems are detected; use `--verbose` for positive confirmation
- Local hooks can be bypassed with `git commit --no-verify`; pair with CI checks for reliable enforcement
- Alternative using npm script: `npm pkg set scripts.commitlint="commitlint --edit"` then `echo "npm run commitlint \${1}" > .husky/commit-msg`
