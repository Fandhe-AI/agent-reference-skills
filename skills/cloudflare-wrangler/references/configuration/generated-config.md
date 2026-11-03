---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#generated-wrangler-configuration
---

# Generated Wrangler Configuration (`.wrangler/deploy/config.json`)

Frameworks and build tools (e.g. the Cloudflare Vite plugin) may generate a modified Wrangler configuration and redirect Wrangler to it. Application developers rarely need this.

## Signature / Usage

`.wrangler/deploy/config.json` must contain only a single JSON object:

```json
{ "configPath": "../../path/to/wrangler.jsonc" }
```

Example: a tool generates `dist/` and a redirect.

```
- dist/
  - index.js
  - wrangler.jsonc
- .wrangler/
  - deploy/
    - config.json
```

Generated `dist/wrangler.jsonc`:

```json
{
	"name": "my-worker",
	"main": "./index.js",
	"vars": {
		"MY_VARIABLE": "staging variable"
	}
}
```

`.wrangler/deploy/config.json`:

```json
{
	"configPath": "../../dist/wrangler.jsonc"
}
```

## Notes

- Wrangler uses the redirect only for: `wrangler deploy`, `wrangler dev`, `wrangler versions upload`, `wrangler versions deploy`, `wrangler pages deploy`, `wrangler pages functions build`.
- Wrangler looks up the directory tree from the working directory for `.wrangler/deploy/config.json`, then follows `configPath` (relative to that file) and displays a message that configuration was redirected.
- The generated configuration should not include any environments; build tools should generate distinct deployment configs per environment.
- In the docs example the user config has `vars.MY_VARIABLE` for production and `env.staging`; running `my-tool build --env=staging` resolves the staging value into the generated file, with no environment defined and `main` pointing at generated code.

## Related

- [bundling.md](./bundling.md)
- [environments.md](./environments.md)
