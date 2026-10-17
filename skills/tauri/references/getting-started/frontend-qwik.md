---
source: https://v2.tauri.app/start/frontend/qwik/
---

# Qwik

Create a Tauri app using the Qwik web framework.

## Signature / Usage

Checklist:

- Use SSG. Tauri doesn't support server-based solutions.
- Use `dist/` as `frontendDist` in `tauri.conf.json`.

Steps (npm; yarn / pnpm / deno equivalents are `yarn ...` / `pnpm ...` / `deno task ...`):

```sh
# 1. Create a new Qwik app
npm create qwik@latest
cd <PROJECT>
# 2. Install the static adapter
npm run qwik add static
# 3. Add the Tauri CLI to your project
npm install -D @tauri-apps/cli@latest
# 4. Define the `tauri` script in package.json
npm pkg set scripts.tauri=tauri
# 5. Initiate a new Tauri project
npm run tauri init
```

Tauri configuration:

```json
// tauri.conf.json
{
  "build": {
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  }
}
```

Start the app:

```sh
npm run tauri dev
```

## Notes

- Added the `tauri` script step; the source runs `npm run tauri` without defining it.
- The page source omits the comma after the `devUrl` line in its JSON example; it is added above so the snippet is valid JSON.
- Tauri-side integration settings only; Qwik itself has no dedicated skill here. Vite: vite skill.

## Related

- [Frontend Configuration](./frontend-configuration.md)
- [Create a Project](./create-project.md)
