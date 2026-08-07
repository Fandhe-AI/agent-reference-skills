# Application Development

## Usage

### dev task configuration

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- `"cache": false`: no caching needed for frequently-changing development code
- `"persistent": true`: prevents other tasks from accidentally depending on a task that never exits

### dev with a setup script

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["//#dev:setup"]
    },
    "//#dev:setup": {
      "outputs": [".codegen/**"]
    }
  }
}
```

### Commands

```bash
turbo dev                      # Run all dev tasks
turbo dev --filter=web         # Run only web and its dependencies
turbo watch dev lint           # Watch mode
```

### Watch Mode

`turbo watch` automatically re-runs tasks in package B when package A (which B depends on) changes.

## Options

Terminal UI keybindings:

| Key | Action |
| --- | --- |
| `m` | Toggle the keybinding menu |
| `↑`/`↓` or `j`/`k` | Navigate the task list |
| `p` | Toggle pinning the selected task |
| `h` | Toggle the task list display |
| `c` | Copy the highlighted log |
| `u`/`d` | Scroll logs up/down |
| `i` | Start interacting with a task |
| `Ctrl+z` | Stop interacting |

## Notes

- Teardown tasks: Turborepo cannot automatically run teardown scripts. Run `turbo dev:teardown` manually.
