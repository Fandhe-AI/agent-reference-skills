---
source: https://ui.shadcn.com/docs/cli
---

# shadcn

The `shadcn` CLI adds components to your project and manages presets, registries, migrations and the shadcn/ui CSS setup.

## Signature / Usage

```bash
npx shadcn@latest init
npx shadcn@latest add [component]
```

`init` installs dependencies, adds the `cn` util and configures CSS variables. `npx shadcn@latest create` is an alias for `init`.

```bash
Usage: shadcn init [options] [components...]

Arguments:
  components                 names, url or local path to component

Options:
  -t, --template <template>  the template to use. (next, vite, start, react-router, laravel, astro)
  -b, --base <base>          the component library to use. (base, radix, aria)
  -p, --preset [name]        use a preset configuration
  -y, --yes                  skip confirmation prompt. (default: true)
  -d, --defaults             use default configuration: --template=next --preset=nova (default: false)
  -f, --force                force overwrite of existing configuration. (default: false)
  -c, --cwd <cwd>            the working directory. defaults to the current directory.
  -n, --name <name>          the name for the new project.
  -s, --silent               mute output. (default: false)
  --css-variables / --no-css-variables
  --monorepo / --no-monorepo
  --rtl / --no-rtl
  --pointer / --no-pointer
  --reinstall / --no-reinstall
```

```bash
Usage: shadcn add [options] [components...]

Options:
  -y, --yes            skip confirmation prompt. (default: false)
  -o, --overwrite      overwrite existing files. (default: false)
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -a, --all            add all available components (default: false)
  -p, --path <path>    the path to add the component to.
  -s, --silent         mute output. (default: false)
  --dry-run            preview changes without writing files. (default: false)
  --diff [path]        show diff for a file.
  --view [path]        show file contents.
```

```bash
# apply a preset to an existing project
npx shadcn@latest apply a2r6bw
npx shadcn@latest apply a2r6bw --only theme     # --only: theme | font

# preset subcommands
npx shadcn@latest preset decode a2r6bw          # --json
npx shadcn@latest preset resolve                # alias: preset info (--json, -c)
npx shadcn@latest preset url a2r6bw
npx shadcn@latest preset open a2r6bw

# registry
npx shadcn@latest view button card dialog
npx shadcn@latest view @acme/auth @v0/dashboard
npx shadcn@latest search @shadcn -q "button"    # alias: list; -q, -l/--limit (100), -o/--offset (0)
npx shadcn@latest build                         # registry.json -> ./public/r
npx shadcn@latest build --output ./public/registry

# docs / project info
npx shadcn@latest docs [component]              # -b/--base base|radix|aria, --json
npx shadcn@latest info                          # --json

# migrations
npx shadcn@latest migrate [migration] [path]    # -l/--list, -y, -f/--from, -t/--to

# inline shadcn/tailwind.css (irreversible)
npx shadcn@latest eject
npx shadcn@latest eject -c packages/ui
```

## Options / Props

`migrate` migrations:

| Migration | Description |
| --- | --- |
| `cn` | Migrate `clsx` and `tailwind-merge` to `cn`. |
| `icons` | Migrate your UI components to a different icon library. |
| `base-color` | Migrate your theme to a different base color. |
| `radix` | Migrate to radix-ui. |
| `rtl` | Migrate your components to support RTL (right-to-left). |

Other command options (from the docs):

| Command | Options |
| --- | --- |
| `apply [preset]` | `--preset <preset>`, `--only [parts]` (theme, font), `-y`, `-c`, `-s` |
| `view <items...>` | `-c` |
| `search\|list <registries...>` | names must be prefixed with `@`; `-c`, `-q`, `-l`, `-o` |
| `build [registry]` | registry path default `./registry.json`; `-o, --output <path>` default `./public/r`; `-c` |
| `docs [component]` | `-c`, `-b, --base <base>` (defaults to project base), `--json` |
| `info` | `-c`, `--json` |
| `eject` | `-c`, `-y`, `-s` |

## Notes

- `migrate cn` replaces `clsx`, `tailwind-merge` and `cnfast` with `cn` (rewrites imports, replaces `twMerge(clsx(...))`, installs `cn` and removes old packages when no references remain). It does not require `components.json` and works in any JS/TS package using Tailwind CSS v4. The `cn` merge engine supports Tailwind CSS v4 (like `tailwind-merge` v3); Tailwind CSS v3 projects should keep `tailwind-merge` v2. Scoped runs (`migrate cn src/lib/utils.ts`) keep the old packages in `package.json`; unsupported imports are left unchanged and reported.
- `migrate icons` supports `lucide`, `tabler`, `hugeicons`, `phosphor`, `remixicon` and `radix` (legacy); use `--from` / `--to` with `--yes` for non-interactive runs. It updates `iconLibrary` in `components.json` (scoped runs do not).
- `migrate base-color` supports `neutral`, `zinc`, `stone`, `mauve`, `olive`, `mist`, `taupe`; it rewrites the CSS file set by `tailwind.css` and updates `baseColor`. `--to` alone migrates from the current `baseColor`.
- `migrate rtl` sets `rtl: true`, converts physical to logical utilities (`ml-4` to `ms-4`, `text-left` to `text-start`) and adds `rtl:` variants.
- `migrate radix` moves `@radix-ui/react-*` imports to the unified `radix-ui` package.
- `eject` inlines `shadcn/tailwind.css` (added by `init`) into your global CSS and removes the `shadcn` dependency. It is irreversible; later CLI updates to that file will not apply.
- shadcn/ui is a copy-in component CLI, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [components.json](./components-json.md)
- [Monorepo](./monorepo.md)
- [MCP Server](./mcp.md)
