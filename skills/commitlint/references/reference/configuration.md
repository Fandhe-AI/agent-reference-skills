# Configuration

> Source: https://commitlint.js.org/reference/configuration

Configuration file formats and all options of commitlint.

## Configuration file formats

commitlint resolves configuration files with cosmiconfig. Supported formats:

- `.commitlintrc`（JSON / YAML）
- `.commitlintrc.json`
- `.commitlintrc.yaml`
- `.commitlintrc.yml`
- `.commitlintrc.js`
- `.commitlintrc.cjs`
- `.commitlintrc.mjs`
- `.commitlintrc.ts`
- `.commitlintrc.cts`
- `.commitlintrc.mts`
- `commitlint.config.js`
- `commitlint.config.cjs`
- `commitlint.config.mjs`
- `commitlint.config.ts`
- `commitlint.config.cts`
- `commitlint.config.mts`

### Defined in package.json

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

### Specified via CLI option

```bash
commitlint --config commitlint.config.js
```

## Configuration object (all options)

### JavaScript (ESM)

```javascript
const Configuration = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [2, "always", ["foo"]],
  },
  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    messages: {},
    questions: {
      type: {
        description: "please input type:",
      },
    },
  },
};

export default Configuration;
```

### CommonJS

```javascript
module.exports = Configuration;
```

### TypeScript

```typescript
import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [RuleConfigSeverity.Error, "always", ["foo"]],
  },
};

export default Configuration;
```

## Property details

### extends

Resolves and loads shareable configs. The referenced packages must be installed.

```javascript
export default {
  extends: [
    "lerna",
    "@commitlint/config-conventional"
  ]
};
```

When multiple configs are given, later ones override earlier ones.

### parserPreset

A configuration preset that determines how commit messages (type / scope / subject / body / footer, etc.) are parsed ("Parser presets" section of the official docs).

- If no preset is specified, commitlint ships no parser preset and falls back to the defaults of [`conventional-changelog-angular`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)
- Extending `@commitlint/config-conventional` applies the `conventional-changelog-conventionalcommits` preset
- The `parserPreset` value is one of
  - string: an npm package or a local file (Node module resolution)
  - object: an object with a `parserOpts` property for inline configuration

#### Using an npm package

```sh
npm install --save-dev conventional-changelog-atom
```

```js
// commitlint.config.js
export default {
  parserPreset: "conventional-changelog-atom",
};
```

#### Using a local file

```js
// commitlint.config.js
export default {
  parserPreset: "./parser-preset",
};
```

```js
// parser-preset.js
export default {
  parserOpts: {
    headerPattern: /^(\w*)\((\w*)\)-(\w*)\s(.*)$/,
    headerCorrespondence: ["type", "scope", "ticket", "subject"],
  },
};
```

#### Inline `parserOpts`

`parserOpts` can be passed directly without a separate file. Suited to small tweaks such as custom issue prefixes.

```js
// commitlint.config.js
export default {
  parserPreset: {
    parserOpts: {
      issuePrefixes: ["PROJ-", "JIRA-"],
    },
  },
};
```

#### Main `parserOpts`

Parsing is done by [`conventional-commits-parser`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser). See that package's documentation for all options.

| Option | Description |
| --- | --- |
| `headerPattern` | Regex to match the commit header (type, scope, subject) |
| `headerCorrespondence` | Array of field names matching the capture groups in headerPattern |
| `issuePrefixes` | Prefixes to match issue references (e.g. `["#", "PROJ-"]`) |
| `noteKeywords` | Keywords that mark footer notes (e.g. `["BREAKING CHANGE"]`) |
| `breakingHeaderPattern` | Regex to detect breaking changes in the header (e.g. the `!` marker) |

#### `presetConfig`

The official docs describe passing `presetConfig` with a preset such as `conventional-changelog-conventionalcommits` to tweak the preset's behavior without replacing the whole parser configuration, commonly to configure which commit types appear in the generated changelog. Available options differ per preset (see "Preset Configuration" in `conventional-changelog-conventionalcommits`). See Notes: `presetConfig` has no runtime effect in commitlint as of v21.2.3.

```js
// commitlint.config.js
export default {
  parserPreset: {
    name: "conventional-changelog-conventionalcommits",
    presetConfig: {
      types: [
        { type: "feat", section: "Features" },
        { type: "fix", section: "Bug Fixes" },
        { type: "docs", section: "Documentation", hidden: false },
        { type: "chore", hidden: true },
      ],
    },
  },
};
```

#### Using with semantic-release

The official docs describe sharing the same `conventional-changelog-conventionalcommits` preset between [semantic-release](https://github.com/semantic-release/semantic-release) and commitlint, aligning `parserOpts` / `presetConfig` across both tools so that commits parsed at lint time match semantic-release's version determination and changelog generation. See Notes: the `presetConfig` in the commitlint config below has no runtime effect as of v21.2.3.

```js
// commitlint.config.js
export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    name: "conventional-changelog-conventionalcommits",
    presetConfig: {
      types: [
        { type: "feat", section: "Features" },
        { type: "fix", section: "Bug Fixes" },
        { type: "docs", section: "Documentation", hidden: false },
      ],
    },
  },
};
```

```js
// .releaserc.js
export default {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "docs", section: "Documentation", hidden: false },
          ],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "docs", section: "Documentation", hidden: false },
          ],
        },
      },
    ],
  ],
};
```

### formatter

Specifies the output format of lint results.

```javascript
export default {
  formatter: "@commitlint/format",
};
```

### rules

Rule definitions. Can override rules loaded via `extends`.

```javascript
export default {
  rules: {
    "type-enum": [2, "always", ["foo"]],
  },
};
```

See [rules-configuration.md](./rules-configuration.md) and [rules.md](./rules.md) for details.

### ignores

An array of functions that determine whether commitlint should skip a message.

```javascript
export default {
  ignores: [(commit) => commit === ""],
};
```

### defaultIgnores

A boolean controlling whether the default ignore patterns apply. The default ignore patterns include merge commits, reverts, and semver versions.

```javascript
export default {
  defaultIgnores: true,
};
```

### helpUrl

A custom URL shown on failure.

```javascript
export default {
  helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};
```

### prompt

An object configuring the command-line interaction of `@commitlint/cz-commitlint`.

See [prompt.md](./prompt.md) for details.

## Shareable Configuration

Shareable configs follow these rules:

- Can be published as npm packages
- `commitlint-config-` prefix (e.g. `commitlint-config-lerna`)
- Scoped packages: `@scope/commitlint-config-name`
- The prefix may be omitted when referenced in `extends` (e.g. `"lerna"` resolves to `commitlint-config-lerna`)

## Notes

- As of v21.2.3, `@commitlint/load` resolves `parserPreset` by name only when it is a string; an object `parserPreset` without `parserOpts` is passed through unchanged (`load-parser-opts.ts`), and `presetConfig` is not read anywhere in `@commitlint/load` or `@commitlint/resolve-extends`. The `ParserPreset` type declares `presetConfig?: unknown` (so TypeScript configs type-check, see upstream issue #4748), but it has no effect on parsing. The `presetConfig` / semantic-release examples above are reproduced from the official docs as published. To change how commitlint parses, use `parserOpts` (inline or via a preset module).
