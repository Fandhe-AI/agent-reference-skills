# Troubleshooting

Source: https://knip.dev/guides/troubleshooting

## Lint Issues

Knip reports lint issues about unused code. Exit code `1` = successful execution with issues detected. See Handling Issues guide.

## Exceptions

Knip throws exceptions for errors. Exit code `2` = exception occurred. Check Known Issues for workarounds.

## Debug Mode

```sh
knip --debug
```

Shows:
- Included workspaces
- Configuration per workspace
- Enabled plugins per workspace
- Glob patterns and matching file paths
- Plugin config file paths and found dependencies
- Compiled non-standard source files

## Trace Options

```sh
knip --trace
knip --trace-file [path]
knip --trace-export [name]
knip --trace-dependency [name]
```

- Accepts exact strings or regex patterns
- Use `--workspace [filter]` for filtering
- Legend: ✓ (contains import), x (not imported), ◯ (entry file)
