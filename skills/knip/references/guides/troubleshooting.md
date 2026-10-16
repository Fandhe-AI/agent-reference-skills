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
- Use `--trace-file` and `--trace-export` together to trace a specific named or default export of a certain file
- Legend: `✓` (referenced, not reported as unused), `✗` (reported as unused), `⎆` (entry file)
- Each child node is prefixed with how the export is consumed: `import`, `importAs` (shown as `original → alias`), `importNS`, or a re-export (`reExport`, `reExportAs`, `reExportNS`, `reExportStar`)
- A `refs:` line lists the references found in that file; a `members:` line shows per-member status for namespaces and enums
- An `[ambiguous]` line lists the competing definitions when a name reaches the file through more than one `export *`
