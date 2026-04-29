# Pull Requests

All changes to ZMK's `main` branch — including those from core committers — require a pull request.

## Commit Message Format

```
<type>[optional scope]: <short summary>

<body — paragraph or bulleted list>

[optional git trailers]
```

### Types

| Type | Purpose |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `docs` | Documentation update |
| `blog` | Documentation blog post |
| `ci` | GitHub Actions workflow changes |
| `chore` | Miscellaneous small changes |
| `feat!` / `fix!` / `refactor!` | Breaking change |

### Common Scopes

`hid`, `usb`, `ble`, `power`, `split`, `studio`, `display`, `underglow`, `backlight`, `behaviors`, `core`, `boards`, `shields`

## Notes

- Follow [Conventional Commits](https://www.conventionalcommits.org/) format for all commit messages.
- Keep commits discrete and cohesive; use `git commit --amend` or interactive rebase to combine related changes.
- Do **not** use merge commits — rebase against `upstream/main` to maintain linear history.
- Fill out the auto-populated PR template completely when opening a PR on GitHub.
- Reviewers assess based on area of expertise; maintainers verify CI, inspect commit quality, and use **squash-merge**.

## Related

- [Clean Room Policy](./clean-room.md)
- [Documentation](./documentation.md)
- [ZMK Pull Requests on GitHub](https://github.com/zmkfirmware/zmk/pulls)
