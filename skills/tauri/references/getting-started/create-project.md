---
source: https://v2.tauri.app/start/create-project/
---

# Create a Project

Create a Tauri app with the `create-tauri-app` utility (official framework templates), or add Tauri to an existing frontend with the Tauri CLI.

## Signature / Usage

Run one of these in the folder where you want the project:

```sh
# npm
npm create tauri-app@latest
# Yarn
yarn create tauri-app
# pnpm
pnpm create tauri-app
# deno
deno run -A npm:create-tauri-app
# bun
bun create tauri-app
# Cargo
cargo install create-tauri-app --locked
cargo create-tauri-app
```

Prompts:

```
? Project name (tauri-app) ›
? Identifier (com.tauri-app.app) ›
? Choose which language to use for your frontend ›
Rust  (cargo)
TypeScript / JavaScript  (pnpm, yarn, npm, bun)
.NET  (dotnet)
```

Templates: Rust -> Vanilla, Yew, Leptos, Sycamore. TypeScript / JavaScript -> Vanilla, Vue, Svelte, React, Solid, Angular, Preact (flavor TypeScript or JavaScript). .NET -> Blazor.

Start the development server:

```sh
cd tauri-app
npm install
npm run tauri dev
# yarn: yarn install / yarn tauri dev
# pnpm: pnpm install / pnpm tauri dev
# deno: deno install / deno task tauri dev
# bun:  bun install / bun tauri dev
# cargo:
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri dev
```

### Manual Setup (Tauri CLI)

1. Create the frontend (example with Vite): `mkdir tauri-app && cd tauri-app`, then `npm create vite@latest .` (pnpm: `pnpm create vite .`; yarn: `yarn create vite .`; deno: `deno run -A npm:create-vite .`; bun: `bun create vite .`).
2. Install the Tauri CLI (if using `cargo`, it must be installed globally):

```sh
npm install -D @tauri-apps/cli@latest
# cargo
cargo install tauri-cli --version "^2.0.0" --locked
```

3. Determine the URL of your frontend dev server (Vite default: `http://localhost:5173`).
4. Initialize Tauri in the project directory:

```sh
npx tauri init
# yarn tauri init / pnpm tauri init / deno task tauri init / bun tauri init / cargo tauri init
```

Prompts:

```sh
✔ What is your app name? tauri-app
✔ What should the window title be? tauri-app
✔ Where are your web assets located? ../dist
✔ What is the url of your dev server? http://localhost:5173
✔ What is your frontend dev command? pnpm run dev
✔ What is your frontend build command? pnpm run build
```

This creates a `src-tauri` directory with the necessary Tauri configuration files.

5. Configure `server.watch.ignored` in `vite.config.ts` so Vite does not watch `src-tauri`:

`vite.config.ts`

```js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
```

6. Verify with `npx tauri dev` (cargo: `cargo tauri dev`). This compiles the Rust code and opens a window with your web content.

## Notes

- The source also lists shell one-liners (Bash, PowerShell, Fish) that pipe `https://create.tauri.app/sh` / `/ps` into the shell; they are omitted here in favor of the package-manager commands above. If you use them, save the script first, inspect it, then run it.
- The source's bun tab runs `bun create vite` without `.` (scaffolds into a new subdirectory); `mkdir`/`cd` and `.` are made explicit so the following steps run in the same directory.
- The source's prompt transcript answers `..` for the web assets location; `../dist` (Vite's build output) is shown here because `..` would make the whole project root, including `node_modules` and `src-tauri`, the frontendDist.
- The page recommends starting with the vanilla template (language `TypeScript / JavaScript`, package manager `pnpm`, UI template `Vanilla`, flavor `TypeScript`); a framework can be integrated later.
- If `create-tauri-app` detects missing dependencies it prints a list of packages and how to install them.
- If you already initialized the frontend, skip manual-setup step 1.
- The Vite `server.watch.ignored` setting is Tauri-side integration only; Vite itself is covered by the vite skill.
- Other community templates are listed in the Awesome Tauri repo.

## Related

- [Prerequisites](./prerequisites.md)
- [Project Structure](./project-structure.md)
- [Frontend Configuration](./frontend-configuration.md)
