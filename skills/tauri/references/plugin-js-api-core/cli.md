---
source: https://v2.tauri.app/reference/javascript/cli/
---

# @tauri-apps/plugin-cli

Parse arguments from your Command Line Interface.

## Signature / Usage

```ts
import { getMatches } from '@tauri-apps/plugin-cli';
const matches = await getMatches();
if (matches.subcommand?.name === 'run') {
  // `./your-app run $ARGS` was executed
  const args = matches.subcommand?.matches.args
  if ('debug' in args) {
    // `./your-app run --debug` was executed
  }
} else {
  const args = matches.args
  // `./your-app $ARGS` was executed
}
```

```ts
function getMatches(): Promise<CliMatches>   // @since 2.0.0

interface ArgMatch {
  value: string | boolean | string[] | null
  occurrences: number
}
interface SubcommandMatch {
  name: string
  matches: CliMatches
}
interface CliMatches {
  args: Record<string, ArgMatch>
  subcommand: SubcommandMatch | null
}
```

## Options / Props

`ArgMatch`

| Name | Type | Description |
| --- | --- | --- |
| value | `string \| boolean \| string[] \| null` | string if takes value; boolean if flag; string[] or null if takes multiple values |
| occurrences | `number` | Number of occurrences |

`SubcommandMatch`

| Name | Type | Description |
| --- | --- | --- |
| name | `string` | The name of the matched subcommand. |
| matches | `CliMatches` | The argument matches of the subcommand, resolved the same way as the parent command's matches. |

`CliMatches`

| Name | Type | Description |
| --- | --- | --- |
| args | `Record<string, ArgMatch>` | The matched arguments, keyed by argument name. |
| subcommand | `SubcommandMatch \| null` | The matched subcommand, or `null` if no subcommand was invoked. |

## Notes

- `getMatches` parses the arguments provided to the current process using the CLI configuration defined in `tauri.conf.json`. The TSDoc link for that configuration points to the Tauri v1 config page (`tauri.cli`).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@cli-v2.5.0` `plugins/cli/guest-js/index.ts`

## Related

- CLI plugin
