# CLI Reference

> Source: https://commitlint.js.org/reference/cli

All command-line options of commitlint.

## Basic Usage

```bash
# Read from stdin
echo "feat: add feature" | commitlint

# Lint the last commit
commitlint --last

# Lint a commit range
commitlint --from HEAD~3 --to HEAD

# Print the resolved config
commitlint --print-config
```

## Input

| Option | Description |
|--------|-------------|
| `[input]` | Reads from stdin if `--edit`, `--env`, `--from` and `--to` are omitted |

## Output / Display

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-c, --color` | boolean | `true` | Toggle colored output |
| `-q, --quiet` | boolean | `false` | Toggle console output |
| `-V, --verbose` | boolean | - | Enable verbose output for reports without problems |
| `-o, --format` | string | - | Output format of the results |
| `--print-config` | choices | `""`, `"text"`, `"json"` | Print resolved config |
| `--legacy-output` | boolean | - | Use the legacy input output format (single-line 'input: ...') |

## Configuration

| Option | Type | Description |
|--------|------|-------------|
| `-g, --config` | string | Path to the config file; result code 9 if config is missing |
| `--default-config` | boolean | Use the built-in default config (@commitlint/config-conventional) when no rules are found. A config file with rules always takes precedence; configs passed via `--extends` are kept and override the default config when the fallback applies. Useful for one-off checks or server-side hooks such as `pre-receive` ("Lint without a config file" section) |
| `-x, --extends` | array | Array of shareable configurations to extend |
| `-p, --parser-preset` | string | Configuration preset to use for conventional-commits-parser |
| `--options` | string | Path to a JSON file or Common.js module containing CLI options |

## Commit Range / Analysis

| Option | Type | Description |
|--------|------|-------------|
| `-e, --edit` | string | Read last commit message from the specified file; falls back to `./.git/COMMIT_EDITMSG` |
| `-E, --env` | string | Check message in the file at the path given by the environment variable value |
| `-f, --from` | string | Lower end of the commit range to lint; applies if edit=false |
| `-t, --to` | string | Upper end of the commit range to lint; applies if edit=false |
| `-l, --last` | boolean | Just analyze the last commit; applies if edit=false |
| `--from-last-tag` | boolean | Use the last tag as the lower end of the commit range to lint; applies if edit=false and from is not set |
| `--git-log-args` | string | Additional git log arguments as space separated string, example `'--first-parent --cherry-pick'` |

## Other Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `-d, --cwd` | string | (Working Directory) | Directory to execute in |
| `-H, --help-url` | string | - | Help URL in error message |
| `-s, --strict` | boolean | - | Enable strict mode; result code 2 for warnings, 3 for errors |
| `-v, --version` | boolean | - | Display version information |
| `-h, --help` | boolean | - | Show help |

## Examples

```bash
# Use the default config without a config file (one-off check)
echo "feat: add new feature" | npx commitlint --default-config
```

```bash
# Use a specific config file
commitlint --config commitlint.config.js

# Extend a shareable config
commitlint --extends @commitlint/config-conventional

# Use from a hook when editing a commit message
commitlint --edit

# Get the file path from an environment variable
commitlint --env COMMIT_MSG_FILE

# Lint commits since the last tag
commitlint --from-last-tag --to HEAD

# Run in strict mode
commitlint --strict

# Print the config as JSON
commitlint --print-config json

# Pass additional git log arguments
commitlint --from HEAD~5 --to HEAD --git-log-args "--first-parent"
```
