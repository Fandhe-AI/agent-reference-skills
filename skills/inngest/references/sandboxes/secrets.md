# Secrets

Let sandboxed code deploy, publish, push, and call your APIs without holding your long-lived keys. Anything in a Sandbox can be read by the code running in it, so prefer a tool, a short-lived token, or per-command `env` over injecting long-lived keys.

## Signature / Usage

Let a tool do it: a [tool](./tools.md) runs in your function with your credentials; the Sandbox calls it by name and gets the result.

```typescript
import { tool } from "inngest/experimental";
import { z } from "zod";

const openPr = tool.step({
  description: "Open a PR for a branch",
  input: z.object({
    branch: z.string().regex(/^[\w./-]+$/),
    title: z.string().max(120),
  }),
  output: z.object({ url: z.string() }),
  run: async ({ branch, title }) => {
    const pr = await octokit.rest.pulls.create({
      owner: "acme",
      repo: "box",
      head: branch,
      base: "main",
      title,
    });

    return { url: pr.data.html_url };
  },
});

await sb.commands.run("agent", "node agent.js", { tools: { openPr } });
```

Pass a secret to one command (`environment` on a `step.sandbox` command, or `env` on `$`):

```typescript
const publish$ = sb.$({ env: { NPM_TOKEN: process.env.NPM_TOKEN! } });

await publish$.sh`pnpm publish`;

await sb.commands.run("publish", ["pnpm", "publish"], {
  environment: { NPM_TOKEN: process.env.NPM_TOKEN! },
});
```

Mint, use, and revoke a token inside one tool:

```typescript
const sb = await step.sandbox.create("create", {
  name: `pr-${event.data.jobId}`,
  vcpu: 2,
  memoryMb: 2048,
});

const createPr = tool.step({
  input: z.object({ branch: z.string().regex(/^[\w./-]+$/) }),
  output: z.object({ ok: z.boolean(), tail: z.string() }),
  run: async ({ branch }) => {
    const { data } = await appOctokit.rest.apps.createInstallationAccessToken({
      installation_id: installationId,
      repositories: ["box"],
      permissions: { pull_requests: "write", contents: "read" },
    });

    try {
      const sandbox = await inngest.sandboxes.get(sb.id);
      const result = await sandbox!.commands.run(
        ["gh", "pr", "create", "--fill", "--head", branch],
        { cwd: "/work/box", environment: { GH_TOKEN: data.token }, timeout: "2m" },
      );

      return { ok: result.exitCode === 0, tail: result.stderr.slice(-500) };
    } finally {
      await new Octokit({ auth: data.token }).rest.apps.revokeInstallationAccessToken();
    }
  },
});

await sb.commands.run("agent", "node agent.js", {
  tools: { createPr },
  toolOptions: { toolTimeout: "5m" },
});
```

Call home for a credential: a credential helper asks a tool for a token on demand.

```typescript
const gitToken = tool.step({
  output: z.object({ password: z.string() }),
  run: async () => {
    const { data } = await appOctokit.rest.apps.createInstallationAccessToken({
      installation_id: installationId,
      repositories: ["box"],
      permissions: { contents: "write" },
    });

    return { password: data.token };
  },
});

await sb.commands.run(
  "push",
  ["git", "-c", "credential.helper=!node /opt/git-credential.js", "push", "origin", "HEAD"],
  { tools: { gitToken } },
);
```

```js
// /opt/git-credential.js
const { tools } = require("inngest_tools");

(async () => {
  if (process.argv[2] !== "get") {
    return;
  }

  const { password } = await tools.gitToken();

  console.log("username=x-access-token");
  console.log(`password=${password}`);
})();
```

A `*_BASE_URL` points an SDK at a route on your server; the route adds the real key and forwards the request.

```typescript
await sb.$({
  env: {
    ANTHROPIC_BASE_URL: "https://app.example.com/llm",
    ANTHROPIC_API_KEY: runToken,
  },
}).sh`node agent.js`;
```

Select workspace secrets at Create (direct client, middleware-backed client, REST):

```typescript
const sandbox = await inngest.sandboxes.create({
  name: `agent-${crypto.randomUUID()}`,
  vcpu: 1,
  memoryMb: 1024,
  environment: {
    APP_ENV: "beta",
  },
  secrets: ["OPENAI_API_KEY", "GITHUB_TOKEN"],
});
```

```typescript
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `agent-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
  secrets: ["OPENAI_API_KEY"],
});
```

```json
{
  "name": "agent-job-42",
  "vcpu": 1,
  "memoryMb": 1024,
  "environment": {
    "APP_ENV": "beta"
  },
  "secrets": ["OPENAI_API_KEY", "GITHUB_TOKEN"]
}
```

What not to do:

```typescript
const token = await step.run("mint", () => {
  return mintToken();
});

await sb.files.write("env", { path: "/work/.env", data: `TOKEN=${token}` });

await sb.$`curl -H ${`Authorization: Bearer ${token}`} https://api.example.com`;
```

## Options / Props

### Where the secret lives

| Technique | Sandbox code can read it | Stored with the run | Lives until |
|-----------|--------------------------|---------------------|-------------|
| Tool | No | Tool arguments and result | Your server only |
| Tool that runs a command with a token | One command | Exit code and the output you return | The token expires or is revoked |
| Per-command `env` | That command | Names only, values `[redacted]` | The command, and anything it writes |
| Credential helper or `*_BASE_URL` | A short-lived token | The tool result | The token expires |
| Workspace secrets | Yes, for the Sandbox's whole life | Names only | The Sandbox and its snapshots |

### Pick a technique

| You want to | Use |
|-------------|-----|
| Open a PR, query a database, call a billing API, sign something | A tool. The key never enters. |
| `git push`, `gh`, or another CLI | A short-lived token, run from a tool or as per-command `env` |
| `npm publish` or a deploy CLI | A short-lived, single-resource token as per-command `env` |
| Cloud SDKs | Short-lived session credentials from your provider, as per-command `env` |
| Call an LLM | A `*_BASE_URL` route on your server, else a workspace secret with a spend cap |

Decide in this order: (1) Can a tool do the work? Use it. (2) Can the credential be short-lived and scoped to one resource? Mint it per use. (3) Only then inject a long-lived key, with a workspace secret.

### What is stored with the run

| Value | In the trace |
|-------|--------------|
| `environment` or `env` values on a `step.sandbox` call | Names only, values `[redacted]`. A command run with `tools` records none |
| `secrets` | Names only |
| Command text and step ID | Stored |
| Command output | Stored, the last 2 MiB (512 KiB when `timeout` is over 5 minutes) |
| `files.write` data | Stored as step input |
| Tool arguments and results | Stored |
| A value returned from `step.run` | Stored |

### Workspace secret validation and limits

- Each name is exact and case-sensitive.
- Each name must be non-empty and at most 256 UTF-8 bytes.
- Names cannot have leading or trailing Unicode whitespace.
- Names cannot contain `=`, carriage return, line feed, or NUL.
- Names must be unique and cannot overlap literal `environment` keys.
- Literal environment keys and selected names share a maximum of 256 entries.
- Literal `environment` and selected names together are limited to 64 KiB.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Tool: `input` is validated before `run` starts (arguments come from untrusted code, so constrain them). The result is stored with the run, so return ids and status, never tokens. Tools receive an `idempotencyKey` as their second argument; pass it to APIs that deduplicate writes. A tool that fails runs again.
- Per-command `env`: the SDK records the step with every value replaced by `[redacted]`, then restores the real values before running it. A command run with `tools` records no environment at all. The command can read and print the value; redaction hides it from the trace, not from the code. Read the value from your app's environment (if it comes from a step's return value, it is stored with the run). Only `environment` values are redacted; the command text, step ID, and output are not. Values are literal strings; a selected workspace secret cannot be passed by name per command. The same redaction applies to `step.sandbox.create` and `processes.start`. A Create `environment` is also stored as Sandbox configuration, so never put a secret there.
- Mint, use, and revoke in one place: a token returned from `step.run` is stored with the run, so mint and use it inside one tool. The code cannot pick the command (it supplies a validated branch name only). Return an exit code and a trimmed tail, never raw output. Use the Sandbox your run created; do not look one up from untrusted input. Raise `toolTimeout` (defaults to 30 seconds). `inngest.sandboxes` is the direct client; it has no step replay, which is why the token stays in the tool's memory.
- Credential helper: Git also calls the helper with `store` and `erase`, so the script answers only `get`. Put the helper in your image or write it once with `files.write`; it holds no secret. The tool result is stored with the run, so keep the token short-lived and scoped.
- `*_BASE_URL`: `runToken` is a per-run token that only your route accepts. The Sandbox can use the route while it is reachable, so expire the token, allowlist what it can call, and rate limit it.
- Workspace secrets: for keys that are cheap to rotate and cheap to leak (a capped LLM key, a read-only token). Selection is in the open beta and its API can change before launch. Secret injection is not output redaction: any code in the Sandbox can read selected values, and a value printed to stdout, stderr, logs, or files can be returned by the Sandbox APIs. Create the secrets in the same Inngest workspace that will create the Sandbox; the public Sandbox REST API and JavaScript SDK select existing secrets and do not create, list, rotate, or archive them. Save a secret under the variable name your application expects (for example `OPENAI_API_KEY`). The SDK and API send only names; values are injected under those names and inherited by commands and managed processes. Selection is supported only for a fresh Sandbox: a snapshot clone restores the environment captured by its snapshot and cannot select new secrets.
- Environment precedence: (1) guest defaults; (2) literal Sandbox `environment` values and selected secret values; (3) command- or process-specific `environment` values. An operation-specific value can override a selected secret for that operation. A Create request cannot include the same key in both `environment` and `secrets`.
- Rotation and lifecycle: names resolve to stable secret identities at create. Selection order does not affect Create identity. Rotating a secret changes the value fetched by a future launch but does not replace a value already delivered to a running or paused guest. Archiving a selected secret and creating another with the same name affects new Sandboxes only. Pause and Resume do not fetch secrets again. A user snapshot captures guest memory, disk, and environment after delivery, so values can remain in the snapshot and its clones. A clone does not fetch current values. Rotation or archival cannot revoke a value already delivered; destroy Sandboxes and delete snapshots when sensitive state is no longer needed.
- Delivery and failure: names resolve inside the authenticated account and workspace. Unknown, archived, duplicated, or colliding names reject Create as invalid input. If the secrets cannot be delivered at launch, the launch fails.
- How secrets stay safe: encrypted at rest (envelope-encrypted, bound to your account and workspace); a launch can fetch its secrets only with an authorization that lasts one minute and is tied to that Sandbox and the launching machine; the machine running your Sandbox receives the values, never the keys that decrypt them; each Sandbox gets one fetch attempt (a failed or lost response is not replayed, and the launch fails). Once a value is inside the Sandbox, code there can read it.
- What not to do (example above): a file's contents are stored with the run (`files.write` is a step, so the data is its input, up to about 2 MiB, and it stays on the Sandbox disk and in every snapshot); command text and the step ID are stored (put the value in `env`); a step's return value is stored until the run is purged.
- Values in the Sandbox itself, on disk or in memory, go into any snapshot you take.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/secrets (retrieved 2026-11-14)

## Related

- [Tools](./tools.md)
- [Commands](./commands.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Traces](./traces.md)
- [Isolation and security](./isolation-and-security.md)
