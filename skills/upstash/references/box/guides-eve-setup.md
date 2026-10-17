# Guide: Vercel Eve Sandbox for Isolated Code Execution

Use `@upstash/agentkit-eve` to run Vercel Eve agent code in Upstash Box: deny-all egress by default, setup baked into a snapshot, one box per session. `UpstashSandbox` is used like Eve's built-in `VercelSandbox`.

## Signature / Usage

```bash
npx eve@latest init my-agent
npm install @upstash/agentkit-eve @upstash/box
```

```typescript
// agent/sandbox.ts
import { defineSandbox } from "eve/sandbox";
import { UpstashSandbox } from "@upstash/agentkit-eve/sandbox";

export const environment = UpstashSandbox.environment({
  runtime: "node",
  size: "medium",
  async prepare(sandbox) {
    await sandbox.setNetworkPolicy("allow-all"); // prepare starts deny-all too
    // Runs only inside the disposable remote Upstash Box (non-root boxuser), never on the host
    const result = await sandbox.run({ command: "sudo -n apt-get install -y jq" });
    if (result.exitCode !== 0) throw new Error(result.stderr);
  },
});

export default defineSandbox(() =>
  environment.open({ networkPolicy: { allow: ["registry.npmjs.org", "api.github.com"] } }),
);
```

## Options / Props

| Item | Description |
|---|---|
| `UpstashSandbox.environment(options)` | Takes the `@upstash/box` `BoxConfig` (`runtime`, `size`, `apiKey` defaults to `UPSTASH_BOX_API_KEY`, `keepAlive`, `initCommand`, `env`, `git`, `skills`, `mcpServers`, `attachHeaders`, `timeout`, ...) |
| `networkPolicy`, `name` | Not accepted in `environment()`; egress is per session via `environment.open({ networkPolicy })`, boxes are named `eve-<session hash>-<random>` |
| `prepare` | Setup hook run once per environment; result captured as a Box snapshot |
| `baseSnapshot` | Snapshot id or resolver (returning `undefined` = none) for heavy, slow-changing setup |

## Notes

- Requires eve `0.65.0` or later and `@upstash/box` `0.7.1` or later (optional peer dependency); the key is read at `eve build` and at run time
- `env` passed to `environment({ env })` is readable by code in the box; use `attachHeaders` to broker credentials. Eve's per-domain firewall rules (`transform`, `forwardURL`, `match`) have no Box equivalent and throw
- A box runs as non-root `boxuser`: system-wide `apt-get` installs need elevated privileges (otherwise `apt-get` exits `100` on the dpkg lock) and run only inside the disposable remote box, never on the host; prefer user-space installs where possible. The example above keeps the original docs' `sudo -n apt-get` because apt has no user-space equivalent. The network policy set in `prepare` is not inherited by sessions
- Each build with something to prepare creates a new snapshot; old ones are not removed automatically (delete in console or `Box.deleteSnapshots()`)
- Lifecycle: one box per Eve session; `sandbox.stop()` pauses, `sandbox.delete()` deletes; default `keepAlive: false`. Eve roots tools at `/workspace` while a Box session lives at `/workspace/home`; the provider rewrites paths
- Migration from `upstash()` (agentkit-eve 0.12 and earlier, removed in Eve 0.64): `bootstrap` becomes `prepare`; `onSession` `use({ networkPolicy })` becomes `environment.open({ networkPolicy })`; `revalidationKey`, `redis`, `templatePrefix`, `enableTelemetry` are gone
- Source: https://upstash.com/docs/box/guides/eve-setup (fetched 2026-10-17; no version pin on the site).

## Related

- [Network Policy](./network-policy.md)
- [Attach Headers](./attach-headers.md)
- [Snapshots](./snapshots.md)
- [Keep Alive](./keep-alive.md)
