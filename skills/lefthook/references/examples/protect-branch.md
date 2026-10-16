# Protect a branch from direct push

Source: https://lefthook.dev/examples/protect-branch

A `pre-push` command blocks a push when the current branch is `main` or `master`. Setting an environment variable for a single push overrides the block.

## Signature / Usage

```yaml
# lefthook.yml

pre-push:
  commands:
    protect-main:
      run: |
        branch="$(git rev-parse --abbrev-ref HEAD)"
        case "$branch" in
          main|master)
            if [ "$ALLOW_PUSH_TO_MAIN" != "1" ]; then
              echo "Refusing direct push from protected branch '$branch'." >&2
              echo "Push a feature branch and open a PR instead, or set ALLOW_PUSH_TO_MAIN=1 to override." >&2
              exit 1
            fi
            ;;
        esac
```

### Override once

```
ALLOW_PUSH_TO_MAIN=1 git push
```

## Notes

- The check uses the current local branch (`git rev-parse --abbrev-ref HEAD`), not the remote ref being pushed: `git push origin HEAD:main` from a feature branch is not blocked, and any push made while `main` / `master` is checked out is blocked.
- This command does not reference `{push_files}`, so lefthook skips it when a push has no file changes (for example a push of an empty commit). It runs normally for any push that changes a file.
