# How Knip Works

Source: https://knip.dev/explanations/how-knip-works

## Overview

Knip identifies and removes unused code and dependencies by analyzing a project's dependency graph starting from entry files. The process runs in two phases: building the graph, then analyzing it.

## Phase 1: Build Graph

1. **Entry Point Scanning**: begins from designated entry files
2. **File Parsing**: reads each file and parses its contents
3. **Import/Export Collection**: identifies all imports and exports
4. **Resolution**: maps each import to its corresponding file location
5. **Recursive Traversal**: repeats for every newly discovered file
6. **Graph Construction**: creates a comprehensive project visualization showing all files, their imports, and dependencies

The build phase intentionally uses broad resolution: following custom path aliases, reading config files, and "compiling" non-standard formats like Vue and Svelte.

## Phase 2: Analyze Graph

The analysis queries the constructed graph to identify unused elements:

- **Unused Files**: files unreachable from any entry point
- **Unused Exports**: exports that no other file imports
- **Unused Dependencies**: dependencies that no file imports

## Notes

- The graph contains only what's reachable from an entry file. Miss one entry, and everything reachable solely from it appears unused
- Plugins automatically detect framework-specific entry points to maximize graph completeness
- Unused results form cascading chains — one missing entry can generate dozens of related findings
- Some chains only show up one run at a time: an export counts as used when another file imports it, even if the importing code is unused. Remove that code, and the next run may report the export. Unused exports that import each other across files are never reported
- Recommended workflow: read the output from the root down, examining unused files first, since fixing root causes typically resolves downstream issues

- Source: https://knip.dev/explanations/how-knip-works (knip@6.45.1 docs, retrieved 2026-11-14)

## Related

- [Entry Files](./entry-files.md)
- [Why use Knip?](./why-use-knip.md)
