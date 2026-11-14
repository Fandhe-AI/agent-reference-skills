# kubb remove

Run `kubb remove` to delete a plugin or parser from `kubb.config.ts` and uninstall its package. It shows the lines it removes and asks before it changes anything.

## Signature / Usage

Remove a plugin:

```shell [Terminal]
kubb remove plugin-zod
```

```text [Output]
◇  Plugin plugin-zod v5.13.0
│  Config    kubb.config.ts
│    - import { pluginZod } from '@kubb/plugin-zod'
│    - pluginZod({ output: { path: 'zod' } }),
│  Uninstalls @kubb/plugin-zod
│
◆  Remove it?
│  Yes
│
◇  pluginZod() removed from kubb.config.ts

✓ Plugin removed  3.42s

  Packages  @kubb/plugin-zod uninstalled with pnpm

Next     kubb generate
```

Files the plugin generated stay on disk until the next `kubb generate`.

Keep the package installed:

```shell [Terminal]
kubb remove plugin-zod --no-uninstall
```

## Options / Props

| Option                | Default          | Description |
| --------------------- | ---------------- | ----------- |
| `--config`, `-c`      |                  | Path to the Kubb config to edit. Without it, the CLI looks for the same config files as `kubb generate`, in the current directory and then in each parent directory. |
| `--yes`, `-y`         | `false`          | Remove without asking. |
| `--no-uninstall`      |                  | Edit the config only and keep the package installed. |
| `--dry-run`           | `false`          | Print the config lines and the package the command would remove, then stop. Nothing is uninstalled or written. |

## Notes

- Migration (5.11 → 5.20): `kubb remove <id>` and the Studio `--allow-remove` permission were added in 5.13.1 (@kubb/cli, #4431). The 5.13.x changelog (#4435) says `kubb remove` ignores plugins Studio switched off, while the 5.20.0 docs state that it deletes a plugin or parser from the config also when Studio switched it off; both statements are kept as published, and the 5.20.0 docs describe the current behavior
- Studio: using it from Studio needs the `--allow-remove` permission (and `--allow-config-edit`); see [studio](./studio.md)
- Source: https://kubb.dev/docs/5.x/reference/commands/remove (kubb@5.20.0, docs/5.x/reference/commands/remove.md, retrieved 2026-11-14)

### Arguments

| Argument | Required | Description |
| -------- | -------- | ----------- |
| `<id>`   | `true`   | Registry id, as `<owner>/<slug>` or a bare `<slug>` for `kubb-labs/<slug>`. |

### What it removes

`kubb remove` deletes the plugin or parser from the config, also when Kubb Studio switched it off, and drops its unused import. With several config entries, it edits the first one.

It does not remove:

- the adapter. A config needs one.
- the last parser. A config needs at least one.
- an extension another one depends on. Remove that one first.

`@kubb/adapter-oas`, `@kubb/parser-ts`, `@kubb/parser-md`, and `@kubb/plugin-barrel` ship with `kubb`. They leave the config but stay installed.

### Environment variables

| Variable        | Default                     | Description |
| --------------- | --------------------------- | ----------- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | Base URL of the registry to read. See [Host your own registry](../reference/registry.md). |

### Exit codes

`kubb remove` exits with code 1 when the id is invalid or unknown, it cannot remove the extension, or the uninstall fails. It exits with code 0 when the extension is removed, was not in the project, or you cancel.

## Related

- [add](./add.md)
- [list](./list.md)
- [studio](./studio.md)
