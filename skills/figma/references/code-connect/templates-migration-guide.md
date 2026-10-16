# Migrating from Parsers to Template Files

Guide for moving from legacy framework-specific Code Connect parsers (React, iOS, Android, Web Components) to template files (`.figma.ts` / `.figma.js`) using the `migrate` command.

## Signature / Usage

```shell
npx figma connect migrate [options]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--outDir <dir>` | string | Write template files to a specific directory instead of alongside the source files |
| `--javascript` | flag | Output `.figma.js` files instead of the default `.figma.ts` |
| `--delete` | flag | Delete source Code Connect files after they are successfully migrated |
| `--include-props` | flag | Preserve `__props` metadata blocks in the migrated output (removed by default). Pass if using the React `.getProps()` or `.render()` modifiers, or if other template files read `executeTemplate().metadata.__props` from the migrated components |

## Notes

- As of August 17th, 2026, the legacy parsers are no longer updated or actively maintained. Parsers remain available via older versions of the Code Connect CLI, so migration can be done later.
- Parser-based files were treated as strings rather than executed, so ternaries and switches were emitted verbatim. A template is a function that runs and returns a string: any valid JavaScript / TypeScript works, and Figma data is available as inputs.
- `migrate` parses the whole project for Code Connect objects and saves them as template files (`.figma.ts`). Output in Figma and in MCP stays the same.
- Treat migration output as a starting point. Migrated files use `figma.helpers` for correct rendering; when the output is known they can be simplified, e.g. `figma.code\`<Counter${figma.helpers.react.renderProp('count', count)} />\`` becomes `figma.code\`<Counter count={${count}} />\``.
- Variant restrictions (multiple `figma.connect` calls with the same Figma URL and different `variant` objects) migrate into a single file with an if / else-if / else structure using `getPropertyValue()`. These can usually be replaced with `getBoolean()` / `getEnum()` or ternaries; multiple AND'd variant properties can often be collapsed with `getEnum()` and a mapping object.
- Testing in Figma: set a temporary `label` and limit `include` in `figma.config.json` so publish / unpublish does not affect existing Code Connect (see below).
- MCP skill route: with Claude Code and the Figma plugin installed, a component published to a team library, and a Professional, Organization, or Enterprise plan, ask Claude to create a template for a Figma URL, or invoke `/figma-code-connect (url: <figma url>)`. It inspects the component properties, finds the matching code component, confirms the match with you, then writes a `.figma.ts` file alongside existing Code Connect files. Review the output, then run `npx figma connect publish`.
- Finishing up: delete remaining parser-based files (e.g. `*.figma.tsx` for the React parser) and remove parser-specific fields from `figma.config.json`: `parser`, `importPaths` (React only), `paths` (React only), `imports` (React only), `xcodeprojPath` (SwiftUI only), `sourcePackagesPath` (SwiftUI only), `importMapping` (SwiftUI only).
- The official migration guide shows the test configuration keys at the top level; in `figma.config.json` they belong under the `codeConnect` object (see [Config File](./config-file.md)).
- Source: https://developers.figma.com/docs/code-connect/templates-migration-guide/ (fetched 2026-10-17)

Test configuration and publish / unpublish:

```json
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "label": "TEST",
    "language": "jsx"
  }
}
```

```shell
npx figma connect publish --config <your figma.config.json path>
npx figma connect unpublish --config <your figma.config.json path>
```

Cleaned-up variant template (from the guide):

```ts
const hasLabel = figma.selectedInstance.getBoolean('Has Label')

export default {
  example: hasLabel
    ? figma.code`<InputField label={${label}} />`
    : figma.code`<Input />`,
  imports: hasLabel
    ? ['import { InputField } from "./InputField"']
    : ['import { Input } from "./Input"'],
  id: 'input',
}
```

## Related

- [Template Files](./template-files.md)
- [Template API](./template-api.md)
- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
