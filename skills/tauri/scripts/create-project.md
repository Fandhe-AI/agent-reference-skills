---
source: https://v2.tauri.app/start/create-project/
---

# Create Project

Commands for creating a new Tauri project (create-tauri-app) and adding Tauri to an existing frontend (`tauri init`).

## Scaffold with create-tauri-app

The official page says to run one of the following in the folder you want to work in. This file lists the package-manager variants as the primary route.

> **WARNING**: The official Bash / PowerShell / Fish one-liners are not included because they pass a remote script straight to the shell. Use the package-manager variants (npm / yarn / pnpm / deno / bun / cargo).
>
> Notes: The source also lists shell one-liners (Bash, PowerShell, Fish) that pipe the remote script into the shell; they are omitted here (same as references/getting-started/create-project.md).

npm:

```sh
npm create tauri-app@latest
```

yarn:

```sh
yarn create tauri-app
```

pnpm:

```sh
pnpm create tauri-app
```

deno:

```sh
deno run -A npm:create-tauri-app
```

bun:

```sh
bun create tauri-app
```

cargo:

```sh
cargo install create-tauri-app --locked
cargo create-tauri-app
```

The prompts ask for project name / identifier / frontend language (Rust, TypeScript / JavaScript, .NET) / package manager (pnpm, yarn, npm, bun) / UI template / UI flavor.

## Start the dev server (after create-tauri-app)

```sh
cd tauri-app
npm install
npm run tauri dev
```

```sh
cd tauri-app
pnpm install
pnpm tauri dev
```

cargo variant (Tauri CLI installed via cargo).

```sh
cd tauri-app
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri dev
```

## Add the Tauri CLI to an existing frontend

```sh
npm install -D @tauri-apps/cli@latest
```

```sh
pnpm add -D @tauri-apps/cli@latest
```

```sh
cargo install tauri-cli --version "^2.0.0" --locked
```

Installing with cargo is a global install.

## Initialize a Tauri project (tauri init)

```sh
npx tauri init
```

```sh
pnpm tauri init
```

```sh
cargo tauri init
```

It asks for the app name / window title / web assets location / dev server URL / frontend dev command / frontend build command, then creates the `src-tauri` directory. For all `tauri init` options, see `cli/init.md` in references.

## Verify

```sh
npx tauri dev
```

```sh
cargo tauri dev
```

The first run takes a while because Rust has to compile.

## Reference: create a Vite project (official example)

The official page shows creating a Vite app as an example of manual setup. Any frontend works.

```sh
mkdir tauri-app
cd tauri-app
npm create vite@latest .
```
