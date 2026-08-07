# turbo gen

## Signature / Usage

```bash
turbo gen [subcommand] [options]
```

Alias: `turbo generate`

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
| `--root` | Path to the repository root |

## Notes

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
