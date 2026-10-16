# Install Motion UI (Motion+ private registry)

Install Motion UI in a React project from Motion's private registry (`api.motion.dev`), keeping the access token out of source control.

## Signature / Usage

`.npmrc` in the project root (safe to commit; references an env var):

```ini
@motionplus:registry=https://api.motion.dev/npm/
//api.motion.dev/npm/:_authToken=${MOTION_TOKEN}
```

`package.json`:

```json
{
  "dependencies": {
    "motion-plus": "npm:@motionplus/core@^2.12.0"
  }
}
```

```bash
export MOTION_TOKEN=your-token-here
npm install   # or pnpm install / bun install
```

```tsx
import { Cursor } from "motion-plus/react"
```

## Notes

- Requires a Motion+ membership; the token is on the Motion+ tokens page (`https://motion.dev/dashboard/tokens`). The token is a secret: never put it in `package.json`, lockfiles or anything committed.
- The alias installs `@motionplus/core` under the name `motion-plus`. Depending on `@motionplus/core` directly is also possible (import from `@motionplus/core/react`).
- Bun loads `.env` automatically. npm and pnpm do not read `.env`: export the variable, use direnv, or `npx dotenv-cli -- npm install`.
- npm exits with `Failed to replace env in config` on every command while `MOTION_TOKEN` is unset, including in CI.
- Yarn 1 needs `.yarnrc` (`"@motionplus:registry" "https://api.motion.dev/npm/"`) in addition to `.npmrc`. Yarn 2+ uses `.yarnrc.yml` with `npmScopes.motionplus.npmRegistryServer` and `npmAuthToken: "${MOTION_TOKEN}"`.
- CI: expose `MOTION_TOKEN` as a secret env var (e.g. `env: MOTION_TOKEN: ${{ secrets.MOTION_TOKEN }}` on the `npm ci` step); same for Vercel / Netlify.
- pnpm 11+ refuses to expand `${MOTION_TOKEN}` in a committed project `.npmrc` `_authToken` line (401, "Ignored project-level auth setting"). Run `pnpm config set "//api.motion.dev/npm/:_authToken" "$MOTION_TOKEN"` before `pnpm install`.
- `404` from `registry.npmjs.org` for `@motionplus/...` means the scoped-registry config is not picked up; check `.npmrc` location. Monorepos: place `.npmrc` at the workspace root.
- Migrating from the old URL-based install (`https://api.motion.dev/registry.tgz?...`): switch to the alias form, add `.npmrc`, drop the lockfile entry for `motion-plus`; regenerate the token if it was ever committed. The old endpoint keeps working.
- Source: https://motion.dev/docs/react-motion-ui-installation (fetched 2026-10).

## Related

- [Installation](./installation.md)
