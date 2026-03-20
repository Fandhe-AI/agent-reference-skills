# CLI

The Chakra UI CLI generates theme typings, adds community snippets, downloads Pro blocks, and ejects default theme tokens.

## Installation

```bash
npm i -D @chakra-ui/cli
```

> Requires Node.js `>= 20.6.0`

## Usage

```
Usage: npx chakra [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  typegen [options] <source>   Generate theme and recipe typings
  snippet                      Add snippets to your project for better DX
  blocks                       Add Chakra UI Pro blocks to your project
  eject [options]              Take control over the default theme tokens and recipes
  help [command]               display help for command
```

## chakra typegen

Generates TypeScript typings for custom theme tokens (colors, semantic tokens, recipe variants, etc.).

```bash
# Generate typings
chakra typegen src/theme.ts

# Watch for changes and rebuild
chakra typegen src/theme.ts --watch

# Generate strict types for props variant and size
chakra typegen src/theme.ts --strict
```

### When to use typegen

Run `typegen` if **all** of these are true:
- You use TypeScript
- You customize the Chakra system (tokens, semantic tokens, recipes, slot recipes)
- You want type-safe autocompletion and strict token validation

If you use JavaScript only, or TypeScript without custom theme types, `typegen` is optional.

### Workflow integration

Add to `postinstall` or `prepare` script to keep types up to date:

```json
{
  "scripts": {
    "postinstall": "chakra typegen src/theme.ts",
    "prepare": "chakra typegen src/theme.ts"
  }
}
```

Use `postinstall` if you want types after every install. Use `prepare` if you also want it to run on package publish. Pick one to avoid running `typegen` twice.

### CI/CD strategy

Run before type-checking and build steps:

```json
{
  "scripts": {
    "typegen": "chakra typegen src/theme.ts",
    "typecheck": "npm run typegen && tsc --noEmit",
    "build": "npm run typegen && your-build-command"
  }
}
```

### Monorepo setup

In a monorepo, run `typegen` in the package that depends on Chakra UI — not at the repo root.

```json
// packages/frontend/package.json
{
  "scripts": {
    "postinstall": "chakra typegen src/theme.ts"
  },
  "dependencies": {
    "@chakra-ui/react": "..."
  },
  "devDependencies": {
    "@chakra-ui/cli": "..."
  }
}
```

### Generated files

By default, generated files go to `node_modules/@chakra-ui/react/types/styled-system/generated` and should **not** be committed. If you use a custom `--outdir` inside your repo, follow your team's codegen policy.

## chakra snippet

Generates useful component compositions that boost development speed.

```bash
# Add all snippets
chakra snippet add --all

# Add a specific snippet
chakra snippet add button

# List all available snippets
chakra snippet list

# Specify a custom output directory
chakra snippet add dialog --outdir ./components/custom
```

## chakra blocks

Downloads premium blocks from Chakra UI Pro (requires active Pro subscription and API key).

```bash
# Interactive block selection
chakra blocks add

# Add all variants of a specific block
chakra blocks add hero

# Add a specific variant
chakra blocks add hero --variant "simple"

# List available blocks
chakra blocks list

# List blocks in a specific category
chakra blocks list --category "marketing"

# Preview without downloading
chakra blocks add --dry-run --category "marketing"

# Specify output directory
chakra blocks add --outdir ./components/blocks
```

### Pro API Key Setup

```bash
export CHAKRA_UI_PRO_API_KEY="your-api-key"
```

Or add to `.env`:

```
CHAKRA_UI_PRO_API_KEY=your-api-key
```

### blocks options

| Option | Description |
|--------|-------------|
| `--variant <variant>` | Add a specific variant instead of all variants |
| `--outdir <dir>` | Specify output directory |
| `--force` | Overwrite existing files |
| `--dry-run` | Preview what will be downloaded without writing files |
| `--tsx` | Force TypeScript JSX format (auto-detected by default) |

## chakra eject

Generates the default theme tokens and recipes files for full customization control.

```bash
# Copy tokens and recipes to your project
chakra eject --outdir src/theme
```

## Notes

- After running `typegen`, restart the TypeScript server in your editor for autocomplete to appear
- `strictTokens` in your theme config requires `typegen` to be run in local and CI workflows

## Related

- [Installation](./installation.md)
- [AI MCP Server](./ai-mcp-server.md)
