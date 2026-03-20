# Namespace Imports

Source: https://knip.dev/guides/namespace-imports

## Overview

When using `import * as NS`, all exports become namespace members. The intention of export usage is not always clear.

## Property Access Matters

If at least one reference to a property like `NS.version` is found, individual exports are considered separately.

## Default Heuristic

- References without property access → all exports considered used
- Otherwise → exports evaluated individually

## All Exports Considered Used

These patterns mark all exports as used:
- `{ ...NS }` (spreading)
- `{ NS }` (shorthand)
- `NS` (direct assignment)
- `typeof NS` (type operation)
- `export { NS }` (re-export)

## Individual Evaluation

When `NS.start` is accessed alongside `send(NS)`, the `end` export can be flagged as unused.

## Configuration

Override behavior:

```sh
knip --include nsExports
```

Or include `"nsExports"` (and optionally `"nsTypes"`) in configuration.
