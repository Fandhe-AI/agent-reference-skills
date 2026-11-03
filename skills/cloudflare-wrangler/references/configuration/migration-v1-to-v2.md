---
source: https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/update-v1-to-v2/
---

# Migrate from Wrangler v1 to v2 (including webpack projects)

Two steps: (1) eject webpack projects, then (2) update to Wrangler v2. The CLI guides you through the upgrade.

## Signature / Usage

```sh
npm uninstall -g @cloudflare/wrangler   # or: cargo uninstall wrangler
npm install -g wrangler
npx wrangler --version
npx wrangler dev   # shows warnings/errors to fix
```

## Options / Props

Which webpack situation applies (step 1, "Migrate webpack projects"):

| Situation | Action |
|-----------|--------|
| `[build]` runs webpack (or another bundler) externally | Nothing; `[build]` is still supported. |
| `type = webpack` without own config | Remove `type = webpack`; Wrangler handles it. |
| `type = webpack` + `webpack_config` for JSX/TS/Wasm/HTML | Built-in support in v2 (see Bundling); remove `type` and `webpack_config`. |
| `type = webpack` + `webpack_config` for code transforms | Keep maintaining your webpack config; use `wranglerjs-compat-webpack-plugin` short term, external `[build]` long term. |

Steps for the code-transform case:

1. Add dev dependencies: `npm i -D webpack@^4.46.0 webpack-cli wranglerjs-compat-webpack-plugin`.
2. Add the plugin to `webpack.config.js`:

```js
const {
	WranglerJsCompatWebpackPlugin,
} = require("wranglerjs-compat-webpack-plugin");

module.exports = {
	// ...
	plugins: [new WranglerJsCompatWebpackPlugin()],
};
```

3. Add a `"build": "webpack"` script to `package.json`.
4. Remove `type` and `webpack_config` from the Wrangler file.
5. Tell Wrangler how to bundle:

```jsonc
{
	"main": "./worker/script.js", // by default, or whatever file webpack outputs
	"build": {
		"command": "npm run build" // or "yarn build"
	}
}
```

```toml
main = "./worker/script.js"

[build]
command = "npm run build"
```

6. Test with `npx wrangler deploy`.

## Notes

- Example v2 warnings from `wrangler dev`: ignored `type`; deprecations for `zone_id` and `build.upload.format`; error when `route` is not a string or `{ pattern, zone_id | zone_name }`.
- Full v1 vs v2 differences: see [deprecations.md](./deprecations.md). Archived Wrangler v1 docs: see [legacy-wrangler-v1.md](./legacy-wrangler-v1.md).

## Related

- [deprecations.md](./deprecations.md)
- [custom-builds.md](./custom-builds.md)
- [legacy-wrangler-v1.md](./legacy-wrangler-v1.md)
