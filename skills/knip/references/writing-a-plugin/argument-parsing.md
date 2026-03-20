# Argument Parsing

Source: https://knip.dev/writing-a-plugin/argument-parsing

## Overview

Customize how CLI arguments are processed for tool executables. Uses minimist-compatible options.

## Configuration Options

### alias

Argument aliases: `{ require: ['r'] }` → `-r` as shorthand for `--require`.

### args

Modify/filter arguments before parsing. Accepts function `(args: string[]) => string[]`.

### binaries

Executable names for the dependency. Default: plugin name.

```javascript
{ binaries: ['tsc'] }
```

### boolean

Mark arguments as boolean type.

### config

Arguments containing config file paths. Shorthand `true` sets alias, string, and config.

```javascript
{ config: ['p'] }  // handles -p tsconfig.lib.json
```

### fromArgs

Parse return value as new script:

```javascript
{ fromArgs: ['exec'] }  // nodemon --exec "node index.js"
```

### nodeImportArgs

Shorthand for Node import aliases:

```javascript
{ import: ['r', 'experimental-loader', 'require', 'loader'] }
```

### positional

`true` to use first positional argument as entry point.

### resolve

List of arguments to resolve to dependency or entry file:

```javascript
{ resolve: ['plugin'] }
```

### resolveInputs

Function returning inputs from parsed arguments:

```javascript
(parsed: ParsedArgs) => parsed['flag'] ? [toDependency('package')] : []
```

### string

Mark arguments as strings (prevents number conversion by minimist).
