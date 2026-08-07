# Architecture

## Scanner

Walks the filesystem to collect project metadata.

- Discovers nested `biome.json` / `biome.jsonc` files inside a monorepo
- Detects nested `.gitignore` files when [`vcs.useIgnoreFile`](../reference/configuration.md) is enabled
- Indexes `package.json` manifests and source files when project domain rules are enabled

### Scanner targeting

When project rules are disabled, the Scanner intelligently targets only the relevant folders. Running `biome check` from `packages/foo/` scans only the repository root, `packages/`, and `packages/foo/` with its subfolders (excluding `node_modules/` and ignored paths), automatically skipping sibling folders. Specifying a file path such as `packages/bar/src/index.ts` similarly targets only that directory structure. This optimization does not apply when project rules are enabled.

### Scanner configuration

Configured via [`files.includes`](../reference/configuration.md).

## Parser and CST

Uses an internally forked `rowan` to implement the Green Tree / Red Tree pattern. A CST (Concrete Syntax Tree) resembles an AST but retains full program information including trivia such as whitespace, tabs, and comments.

### Trivia structure

Trivia is attached to nodes as either leading or trailing.

- **leading trivia**: information preceding a token (including newlines)
- **trailing trivia**: information following a token, up to the next newline

### Resilience and recoverability

- **resilience**: continues parsing even when it encounters language-specific syntax errors
- **recoverability**: identifies the location of the error and reconstructs correct information

Invalid syntax is marked with "Bogus" nodes to protect consumers.

## Formatter

Work in progress.

## Linter

Work in progress.

## Daemon

Biome adopts a server-client architecture. The daemon is a long-running background server that handles requests from editors and the CLI.

## Related

- [Philosophy](./philosophy.md)
- [Language support](./language-support.md)
