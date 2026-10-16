# Configuration

All options of `biome.json` / `biome.jsonc` (following the Biome 2.5.15 schema).

## Top-level properties

| Property | Description |
|-----------|------|
| `$schema` | JSON schema path. Local: `./node_modules/@biomejs/biome/configuration_schema.json` (always matches the installed version). Online: `https://biomejs.dev/schemas/2.5.15/schema.json` (match the version in use; Biome warns on a mismatch) |
| `extends` | Array of paths to other configuration files. Monorepo: `"//"` refers to the root configuration |
| `root` | Whether this is the root configuration (default: true). Set false in nested configurations |
| `files` | Scope of files to process |
| `vcs` | VCS integration settings |
| `formatter` | Formatter settings |
| `linter` | Linter settings |
| `assist` | Assist settings |
| `javascript` | JavaScript/TypeScript settings |
| `css` | CSS settings |
| `json` | JSON settings |
| `graphql` | GraphQL settings |
| `html` | HTML settings |
| `overrides` | Per-file-pattern overrides |
| `grit` | Formatter / linter / assist settings for GritQL (.grit) files |
| `plugins` | Array of GritQL plugins. Each item is a string path or `{ "path": string, "includes"?: string[] }` |

### plugins items

| Option | Description |
|-----------|------|
| `plugins.<ITEM>.path` | The plugin `.grit` file, or a directory containing `biome-manifest.jsonc` |
| `plugins.<ITEM>.includes` | Globs of files the plugin runs on (`!` negates). If omitted, all linted files; `[]` means no files |

## files section

| Option | Description |
|-----------|------|
| `files.includes` | Files to process, as glob patterns. `!` excludes, `!!` force-ignores |
| `files.ignoreUnknown` | Ignore unknown files (default: false) |
| `files.maxSize` | Maximum file size (default: 1048576 = 1 MiB) |
| `files.experimentalScannerIgnores` | Deprecated (since 2.3.0). Array of path components the scanner ignores unconditionally. Use force-ignore (`!!`) in `files.includes` or migrate with `biome migrate` |

## vcs section

| Option | Default | Description |
|-----------|-----------|------|
| `vcs.enabled` | false | Enable VCS integration |
| `vcs.clientKind` | - | Set to `"git"` |
| `vcs.useIgnoreFile` | false | Respect .gitignore/.ignore |
| `vcs.root` | - | Folder to search for VCS files |
| `vcs.defaultBranch` | - | Name of the main branch |

## linter / assist sections (preset)

| Option | Description |
|-----------|------|
| `linter.enabled` / `linter.includes` | Enable the linter / target files (only narrows `files.includes`) |
| `linter.domains` | `Record<domain name, "recommended" \| "all" \| "none">`. 15 domains: astro / drizzle / next / playwright / project / qwik / react / reactNative / solid / svelte / tailwind / test / turborepo / types / vue (see `domains.md`) |
| `linter.rules.recommended` | Deprecated. To be removed in the next major. Use `linter.rules.preset` or `biome migrate` |
| `linter.rules.preset` | `"recommended"` (default) \| `"all"` (all non-nursery rules) \| `"none"` |
| `linter.rules.[group]` | `"off" \| "on" \| "info" \| "warn" \| "error" \| { preset?, recommended?, [rule]? }` |
| `linter.rules.[group].preset` | Group-level preset (overrides `linter.rules.preset`; individual rule settings take highest priority) |
| `linter.rules.[group].[rule]` | `"off" \| "on" \| "info" \| "warn" \| "error"` or an object `{ level, options?, fix? }` |
| `assist.enabled` / `assist.includes` | Enable assist / target files |
| `assist.actions.preset` | `"recommended"` (default) \| `"all"` \| `"none"` |
| `assist.actions.[group].preset` | Group-level preset. `preset` takes precedence over `assist.actions.[group].recommended` |
| `assist.actions.[group].[action]` | `"on" \| "off"` or an object `{ level, options }` |

## formatter section

| Option | Default | Description |
|-----------|-----------|------|
| `enabled` | true | Enable the formatter |
| `includes` | - | Target files (globs) |
| `indentStyle` | tab | Indentation style |
| `indentWidth` | 2 | Indentation width |
| `lineEnding` | lf | Line ending |
| `lineWidth` | 80 | Maximum line width |
| `formatWithErrors` | false | Format even with syntax errors |
| `attributePosition` | auto | HTML attribute position |
| `bracketSameLine` | false | Put the closing bracket of a multi-line HTML / JSX opening tag at the end of the last attribute line |
| `bracketSpacing` | true | Spacing inside brackets |
| `delimiterSpacing` | false | Spacing inside matching delimiters that fit on one line (2.5.0; affected delimiters depend on the language; per-language keys also exist) |
| `expand` | auto | Array / object expansion |
| `trailingNewline` | true | Trailing newline at end of file |
| `useEditorconfig` | false | Read .editorconfig |

## javascript section

### Parser
| Option | Default | Description |
|-----------|-----------|------|
| `unsafeParameterDecoratorsEnabled` | false | Parameter decorators |
| `gritMetavariables` | false | Parse Grit metavariables inside JS/TS syntax |
| `jsxEverywhere` | true | Allow JSX in .js files |

### Formatter
| Option | Default |
|-----------|-----------|
| `quoteStyle` | double |
| `jsxQuoteStyle` | double |
| `quoteProperties` | asNeeded |
| `trailingCommas` | all |
| `semicolons` | always |
| `arrowParentheses` | always |
| `bracketSameLine` | false |
| `delimiterSpacing` | false |
| `operatorLinebreak` | after |

### Other
- `linter.enabled` / `assist.enabled`
- `globals`: array of global variables
- `jsxRuntime`: `"transparent"` (default) / `"reactClassic"`
- `resolver.experimentalPnpmCatalogs` (default false; opt-in added in 2.5.0): resolves `catalog:` versions using `catalog` / `catalogs` in `pnpm-workspace.yaml`
- `experimentalEmbeddedSnippetsEnabled` (default false): parse, format, and lint CSS (`css` / `styled`) and GraphQL (`gql` / `graphql`) embedded in JS/TS template literals (templates with interpolation are not supported)

## json section

- `json.parser.allowComments` / `json.parser.allowTrailingCommas`: allow comments / trailing commas in `.json` (if unset, follows the file-type default; `biome.jsonc` always allows comments)
- `json.formatter.*` (including `delimiterSpacing`) / `json.linter.enabled` / `json.assist.enabled`

## css section

- `css.parser.cssModules`: CSS Modules support (enabled automatically for `.module.css` when unset)
- `css.parser.tailwindDirectives`: Tailwind CSS syntax
- `css.parser.allowWrongLineComments` (default false): allow `//` line comments in plain CSS
- `css.formatter.*` (including `delimiterSpacing`): CSS-specific formatter settings
- `css.globals`: reserved for a future CSS analyzer; currently has no effect

## html section

- `html.experimentalFullSupportEnabled`: Vue/Svelte/Astro support (the formatter must be enabled separately with `html.formatter.enabled`)
- `html.parser.interpolation`: `{{ }}` expression support
- `html.parser.vue` (default false, 2.5.0): enables Vue syntax (`v-if` / `v-bind`, etc.) in `.html`; also enables `html.parser.interpolation`
- `html.formatter.whitespaceSensitivity`: whitespace handling mode
- `html.formatter.indentScriptAndStyle` (default false): indent `<script>` / `<style>` content by one level
- `html.formatter.selfCloseVoidElements` (`"never"` (default) / `"always"`): whether void elements get a `/`

## grit section

Settings for GritQL (.grit) files:

| Option | Default | Description |
|-----------|-----------|------|
| `grit.formatter.enabled` | false | Enable formatting of GritQL files |
| `grit.formatter.indentStyle` | tab | Indentation style |
| `grit.formatter.indentWidth` | 2 | Indentation width |
| `grit.formatter.lineWidth` | 80 | Maximum line width |
| `grit.formatter.trailingNewline` | true | Trailing newline at end of file |
| `grit.linter.enabled` | true | Enable linting of GritQL files |
| `grit.assist.enabled` | true | Enable assist for GritQL files |

## overrides section

Overrides settings for specific files:

```json
{
  "overrides": [
    {
      "includes": ["generated/**"],
      "formatter": { "lineWidth": 160 }
    },
    {
      "includes": ["**/*.config.js"],
      "javascript": { "formatter": { "quoteStyle": "double" } }
    }
  ]
}
```

Pattern order matters. The first matching pattern is applied.

## Glob patterns

| Pattern | Description |
|---------|------|
| `*` | All files in one folder |
| `**` | All files recursively |
| `[...]` | Character class |
| `!pattern` | Exclude |
| `!!pattern` | Force-ignore (ignored by the scanner) |

## Notes

- The official page was restructured into a hand-written reference in 2026-10 (website #4508). `<ITEM>` is an array element; `[group]` / `[rule]` / `[action]` are name placeholders
- `grit.formatter.quoteStyle` was removed here because it does not exist in the 2.5.15 schema
- Settings that differ at documentation HEAD are recorded according to the 2.5.15 schema and the released-version page
