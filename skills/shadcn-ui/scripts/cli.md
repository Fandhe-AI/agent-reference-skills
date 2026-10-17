---
source: https://ui.shadcn.com/docs/cli
---

# CLI

Main subcommands of the `shadcn` CLI (4.22.0). Source: the official cli page (retrieved 2026-10-16). Run commands that modify files in a disposable environment or a clean Git-tracked working tree.

## Initialize a project (init)

```sh
npx shadcn@latest init
```

`create` is an alias of `init`.

```sh
npx shadcn@latest create
```

## List init options

```sh
npx shadcn@latest init --help
```

Main options: `-t, --template <template>` (next / vite / start / react-router / laravel / astro), `-b, --base <base>` (base / radix / aria), `-p, --preset [name]`, `-d, --defaults` (`--template=next --preset=nova`), `-n, --name <name>`, `--monorepo` / `--no-monorepo`, `--rtl` / `--no-rtl`, `--css-variables` / `--no-css-variables`, `--pointer` / `--no-pointer`, `--reinstall` / `--no-reinstall`, `-c, --cwd <cwd>`.

## Initialize with a specific base

```sh
npx shadcn@latest init --base radix
npx shadcn@latest init --base aria
```

## Initialize and overwrite existing configuration

> **Warning**: `-f, --force` forcibly overwrites existing configuration. Run it in a disposable environment or with all changes committed to Git.

```sh
npx shadcn@latest init --force
```

## Add components (add)

```sh
npx shadcn@latest add [component]
```

`components` accepts a name, a URL, or a local path.

## List add options

```sh
npx shadcn@latest add --help
```

Main options: `-y, --yes`, `-o, --overwrite`, `-c, --cwd <cwd>`, `-a, --all`, `-p, --path <path>`, `-s, --silent`, `--dry-run`, `--diff [path]`, `--view [path]`.

## Preview and diff before writing

```sh
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff
npx shadcn@latest add button --view
```

`--dry-run` shows the changes without writing files. `--diff [path]` shows a diff and `--view [path]` shows file contents (per the Options in the cli page).

## Add and overwrite existing files

> **Warning**: `-o, --overwrite` overwrites existing files in `components/ui/` and discards local changes. Run it in a disposable environment or with all changes committed to Git.

```sh
npx shadcn@latest add button --overwrite
```

## Add all components

> **Warning**: `-a, --all` adds every available component. It adds many files and dependencies, so run it in a disposable environment or a clean Git working tree.

```sh
npx shadcn@latest add --all
```

## Apply a preset (apply)

```sh
npx shadcn@latest apply a2r6bw
```

Applies a preset to an existing project. `a2r6bw` is the preset code used in the official example.

## Apply only the theme or font

```sh
npx shadcn@latest apply a2r6bw --only theme
```

`--only` accepts `theme` or `font`. UI components are not reinstalled.

## Decode a preset code (preset decode)

```sh
npx shadcn@latest preset decode a2r6bw
```

Use `--json` for JSON output.

## Resolve the preset of the current project (preset resolve / info)

```sh
npx shadcn@latest preset resolve
npx shadcn@latest preset info
```

`preset info` is an alias of `preset resolve`. Supports `--json` and `-c, --cwd <cwd>`.

## Get the create URL or open it in the browser (preset url / open)

```sh
npx shadcn@latest preset url a2r6bw
npx shadcn@latest preset open a2r6bw
```

## View registry items (view)

```sh
npx shadcn@latest view button card dialog
npx shadcn@latest view @acme/auth @v0/dashboard
```

Inspect an item's contents before installing. Namespaced registries are also accepted.

## Search registries (search / list)

```sh
npx shadcn@latest search @shadcn -q "button"
npx shadcn@latest search @shadcn @v0 @acme
npx shadcn@latest list @acme
```

`list` is an alias of `search`. Registry names start with `@`. Control the result count with `-l, --limit <number>` (default 100) and `-o, --offset <number>` (default 0).

## Build registry JSON (build)

```sh
npx shadcn@latest build
npx shadcn@latest build --output ./public/registry
```

Reads `registry.json` and generates JSON into `public/r` by default. Change the destination with `-o, --output <path>`.

## Fetch documentation (docs)

```sh
npx shadcn@latest docs [component]
```

Supports `-b, --base <base>` (base / radix / aria; defaults to the project's base) and `--json`.

## Get project information (info)

```sh
npx shadcn@latest info
```

Supports `--json` and `-c, --cwd <cwd>`.

## List migrations (migrate)

```sh
npx shadcn@latest migrate --list
```

> **Warning**: `migrate` commands rewrite existing source files. Run them in a disposable environment or with all changes committed to Git.

Available migrations: `cn` / `icons` / `base-color` / `radix` / `rtl`. Common options: `-c, --cwd <cwd>`, `-l, --list`, `-y, --yes`, `-f, --from <name>`, `-t, --to <name>`.

## migrate cn

```sh
npx shadcn@latest migrate cn
npx shadcn@latest migrate cn src/lib/utils.ts
npx shadcn@latest migrate cn "src/**/*.{ts,tsx}"
```

Replaces `clsx` / `tailwind-merge` / `cnfast` with `cn`. Does not require `components.json`; intended for Tailwind CSS v4 projects.

## migrate icons

```sh
npx shadcn@latest migrate icons
npx shadcn@latest migrate icons --from lucide --to phosphor --yes
npx shadcn@latest migrate icons src/components/ui/button.tsx --from lucide --to tabler
npx shadcn@latest migrate icons "src/components/**" --from lucide --to tabler
```

Supported libraries: `lucide` / `tabler` / `hugeicons` / `phosphor` / `remixicon` / `radix` (legacy). When paths are given, `components.json` is not updated.

## migrate base-color

```sh
npx shadcn@latest migrate base-color
npx shadcn@latest migrate base-color --to zinc --yes
```

Supported base colors: `neutral` / `zinc` / `stone` / `mauve` / `olive` / `mist` / `taupe`.

## migrate rtl

```sh
npx shadcn@latest migrate rtl
npx shadcn@latest migrate rtl src/components/ui/button.tsx
npx shadcn@latest migrate rtl "src/components/ui/**"
```

Sets `rtl: true` in `components.json` and converts physical CSS properties to logical ones. When no path is given, the whole `ui` directory is targeted.

## migrate radix

```sh
npx shadcn@latest migrate radix
npx shadcn@latest migrate radix src/components/ui/dialog.tsx
npx shadcn@latest migrate radix "src/components/ui/**"
```

Converts `@radix-ui/react-*` imports to the unified `radix-ui` package.

## Inline shadcn/tailwind.css (eject)

> **Warning**: The official documentation states this operation cannot be undone. After ejecting, CLI updates to `shadcn/tailwind.css` are no longer applied automatically. Run it in a disposable environment or with all changes committed to Git.

```sh
npx shadcn@latest eject
```

In a monorepo, specify the workspace that holds `components.json` and the global CSS.

```sh
npx shadcn@latest eject -c packages/ui
```

Supports `-y, --yes` and `-s, --silent`.
