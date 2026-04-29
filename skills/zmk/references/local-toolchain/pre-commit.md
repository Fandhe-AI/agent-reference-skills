# Pre-commit

ZMK uses [pre-commit](https://pre-commit.com/) to enforce consistent formatting and catch common errors. Hooks run automatically on pull requests; install locally to validate commits before pushing.

## Signature / Usage

### Install pre-commit

```bash
pip3 install pre-commit
```

### Enable hooks in the ZMK repository

```bash
pre-commit install
pre-commit install --hook-type commit-msg
```

After installation, hooks run automatically on each `git commit`. If a hook auto-fixes a file, stage the fixed file and commit again:

```bash
git add <fixed-file>
git commit
```

## Notes

- Two hook types are installed: standard pre-commit hooks and commit-message hooks
- Hooks block the commit if problems are detected
- Simple formatting issues are fixed automatically; manual fixes are required for logic/content issues
- See the [pre-commit docs](https://pre-commit.com/#automatically-enabling-pre-commit-on-repositories) for auto-enabling hooks on newly cloned repositories

## Related

- [IDE Integration](./ide-integration.md)
- [Build and Flash](./build-flash.md)
