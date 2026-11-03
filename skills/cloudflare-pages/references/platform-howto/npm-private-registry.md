---
source: https://developers.cloudflare.com/pages/how-to/npm-private-registry/
---

# Install private packages

Use private npm packages or custom registries in Pages builds through environment variables and an `.npmrc` file.

## Signature / Usage

Create a read-only token for Pages:

```sh
# Verify the current npm user is correct
npm whoami

# Create a readonly token
npm token create --read-only
#-> Enter password, if prompted
#-> Enter 2FA code, if configured
```

For a single private npm registry, add `NPM_TOKEN` (Production and Preview) with the token value. For multiple registries, add a root `.npmrc` that reads tokens from environment variables:

```ini
@foobar:registry=https://npm.pkg.github.com
//registry.npmjs.org/:_authToken=${TOKEN_FOR_NPM}
//npm.pkg.github.com/:_authToken=${TOKEN_FOR_GITHUB}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NPM_TOKEN` | environment variable | — | Read-only npm token; npm reads it by default. Add to both Production and Preview. |
| `TOKEN_FOR_NPM` | environment variable | — | Example name for the npm token referenced in `.npmrc`. |
| `TOKEN_FOR_GITHUB` | environment variable | — | Example name for a GitHub personal access token. |
| `NPM_CONFIG_USERCONFIG` | environment variable | — | Set to `/opt/buildhome/repo/.npmrc.pages` to use an alternate `.npmrc`; adjust the path if the file is not at the project root. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Trigger a new deployment after changing settings; changes are not reflected until the next deployment. Create a dedicated token for Pages.
- Keep tokens in environment variables as shown; `.npmrc` references them with `${...}` and must not contain literal tokens.
- If the Pages `.npmrc` breaks local development, rename it to `.npmrc.pages`, restore the previous `.npmrc`, and set `NPM_CONFIG_USERCONFIG`.
- The npm registry token entry is only needed when the registry hosts private packages your app requires.

## Related

- [Build configuration](../configuration/build-configuration.md)
- [Build image](../configuration/build-image.md)
