---
source: https://vite.dev/guide/troubleshooting#performance-bottlenecks
---

# Debug and Profile

Commands for debug logs and CPU profiles.

## Show debug logs

```sh
vite --debug
vite build --debug
```

`-d, --debug [feat]` shows debug logs, and `-f, --filter <filter>` filters them. The CLI page does not document concrete values for `feat` and `filter` (needs confirmation).

```sh
vite --debug [feat] --filter <filter>
```

The above follows the notation of the CLI table. Replace `[feat]` and `<filter>` before use.

## CPU profile of the dev server

```sh
vite --profile --open
```

After the app has finished loading in the browser, go back to the terminal, press `p` to stop the Node.js inspector, then press `q` to stop the dev server.

## CPU profile of the build

```sh
vite build --profile
```

## Name the profile file

```sh
vite --profile my-profile
vite build --profile=my-profile
```

By default, `vite-profile-0.cpuprofile` is generated in the root. `--profile <name>` (or `--profile=<name>`) changes it to `<name>.cpuprofile`. Inspect the generated CPU profile by uploading it with the `BROWSE` button at https://www.speedscope.app/.

## Inspect intermediate plugin state

```sh
npm install -D vite-plugin-inspect
```

vite-plugin-inspect is a third-party plugin introduced by the official troubleshooting guide. It works in both dev and build, and helps identify plugins or middleware that are bottlenecks. For how to add it to vite.config, see the plugin's README (not described in these docs).
