# turbo gen

## Signature / Usage

```bash
turbo gen [subcommand] [options]
```

Alias: `turbo generate`. `run` is the default subcommand, so `turbo gen` is equivalent to `turbo generate run`.

## Options / Props

### turbo gen workspace

```bash
turbo gen workspace [options]
```

| Option | Description |
|---|---|
| `--name` | Name of the workspace |
| `--empty` | Create an empty workspace (default: `true`) |
| `--copy` | Copy an existing workspace or GitHub repository |
| `--destination` | Path to create the workspace at |
| `--type` | `app` or `package` |
| `--root` | Root of the repository (default: directory of the root `turbo.json`) |
| `--show-all-dependencies` | Remove the workspace-type filter when selecting dependencies |
| `--example-path` / `-p` | Separate the branch name and example path in a GitHub URL |

### turbo gen run

```bash
turbo gen run [generator-name] [options]
```

| Option | Description |
|---|---|
| `--args` | Answers passed directly to the generator's prompts |
| `--config` | Generator config file (default: `turbo/generators/config.js`) |
| `--root` | Path to the repository root (default: directory with root `turbo.json`) |

## Notes

- Turborepo variables: when running generator actions, Turborepo injects a `turbo` object into the action answers data.

  `turbo.paths`:

  | Variable | Type | Description |
  |---|---|---|
  | `turbo.paths.cwd` | `string` | Current working directory when the generator was invoked |
  | `turbo.paths.root` | `string` | Root directory of the Turborepo project |
  | `turbo.paths.workspace` | `string \| undefined` | Root directory of the workspace containing the generator; `undefined` for root-level generators not within a workspace |

  `turbo.configs` is an array of `TurboConfig` objects for all `turbo.json` and `turbo.jsonc` files in the repository:

  | Property | Type | Description |
  |---|---|---|
  | `config` | `object` | Parsed contents of the Turbo configuration file |
  | `turboConfigPath` | `string` | Absolute path to the Turbo configuration file |
  | `workspacePath` | `string` | Absolute path to the workspace directory containing the configuration |
  | `isRootConfig` | `boolean` | Whether the configuration is from the root of the monorepo |

- `@turbo/gen` type definitions:
  ```ts
  import type { PlopTypes } from "@turbo/gen";

  export default function generator(plop: PlopTypes.NodePlopAPI): void {
    plop.setGenerator("name", {
      description: "description",
      prompts: [],
      actions: [],
    });
  }
  ```
