---
source: https://docs.cloud.google.com/dataform/docs/reference/dataform-cli-reference
---

# Dataform CLI reference

## Signature / Usage

This document describes commands of the open source Dataform command line interface (CLI).

<br />

### Dataform CLI commands

The open-source Dataform CLI provides commands to initialize, compile,
test, and run
[Dataform core](dataform-core-reference.md)
locally, outside of Google Cloud.

| Dataform CLI command | Description |
|---|---|
| `dataform help` | Shows help for all Dataform CLI commands. |
| `dataform help [command]` | Shows help for the specified command. |
| `dataform init [project-dir] [default-database] [default-location]` | Creates a new Dataform project. |
| `dataform install [project-dir]` | Installs NPM dependencies for the specified Dataform project. |
| `dataform init-creds [project-dir]` | Creates a `.df-credentials.json` file for Dataform to use when accessing Google Cloud APIs. |
| `dataform compile [project-dir]` | Compiles the specified Dataform project and prints a summary of the compiled dependency graph without executing it against BigQuery. Pass `--json` or `--dot` for JSON or Graphviz DOT output. |
| `dataform test [project-dir]` | Runs the specified Dataform project's unit tests on BigQuery. |
| `dataform run [project-dir]` | Runs the specified Dataform project's scripts on BigQuery. |
| `dataform format [project-dir]` | Formats the specified Dataform project's files. |
| `--help` | Shows help \[boolean\]. |
| `--version` | Shows the version number of the Dataform CLI \[boolean\]. |

### Command options and examples

For the complete list of command-specific flags, shared project-configuration
override flags, and usage examples, see the
[Dataform CLI reference on GitHub](https://github.com/dataform-co/dataform/blob/main/cli/README.md).

Snippet taken from https://docs.cloud.google.com/dataform/docs/use-dataform-cli#install-dataform-cli

```sh
npm i -g @dataform/cli
```

## Notes

- Source: https://docs.cloud.google.com/dataform/docs/reference/dataform-cli-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page has no code example; the snippet is taken verbatim from a related page of the same reference (https://docs.cloud.google.com/dataform/docs/use-dataform-cli#install-dataform-cli).

## Related

- [Index of this directory](./README.md)
