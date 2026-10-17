---
source: https://ai-sdk.dev/docs/agents/policy-tool-approvals
---

# Policy-Based Tool Approvals

`@ai-sdk/policy-opa` moves tool approval rules out of code and into Open Policy Agent (OPA) policies written in `.rego`. It sits entirely on top of the public `toolApproval` callback; the wire flow (`tool-approval-request` / `tool-approval-response`) is unchanged.

## Signature / Usage

```sh
pnpm add @ai-sdk/policy-opa
# pick one (or both) OPA backends:
pnpm add @open-policy-agent/opa-wasm   # in-process WASM evaluation
pnpm add @open-policy-agent/opa        # HTTP client to a running OPA server
```

```ts
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { opaPolicy, wasmPolicyClient } from '@ai-sdk/policy-opa';
import { readFile } from 'node:fs/promises';

// 1. Load the compiled policy bundle.
const wasm = await readFile('./policy.wasm');
const client = await wasmPolicyClient({ wasm });

// 2. Build the toolApproval configuration.
const toolApproval = opaPolicy({
  client,
  path: 'agent/call/decision',
});

// 3. Pass it to generateText (or streamText / ToolLoopAgent). Everything else is normal.
const result = await generateText({
  model: anthropic('claude-sonnet-5-5'),
  tools: { git, bash, queryLogs },
  toolApproval,
  prompt: 'find the failing test and push the fix',
});
```

### How it works

The policy is consulted before every tool dispatch and maps to one of the standard approval statuses:

- `allow` runs the tool.
- `deny` returns a denied result the model can reason about (no human needed).
- `requires-approval` pauses the run and waits for a human `tool-approval-response`.
- No matching rule normalizes to `not-applicable`, which the SDK treats as allow. Add `default decision := { "decision": "deny" }` to default-deny instead.

The default OPA `input` shape is `{ tool: { name }, args, messages, runtimeContext }`. Override with `toInput`. The legacy boolean shape (`{ "allow": true | false, "reason": "..." }`) is also accepted.

```rego
package agent.call

# Default to "not-applicable" so unmatched calls fall through.
default decision := { "decision": "not-applicable" }

# Hard deny: pushes are never allowed automatically.
decision := { "decision": "deny", "reason": "pushes require human review" } if {
  input.tool.name == "git"
  input.args.args[0] == "push"
}

# Auto-allow: read-only git operations.
decision := { "decision": "allow" } if {
  input.tool.name == "git"
  input.args.args[0] in {"status", "log", "diff", "show"}
}

# Human-in-the-loop: kubectl by oncall.
decision := { "decision": "requires-approval", "reason": "kubectl by oncall" } if {
  input.tool.name == "kubectl"
  input.runtimeContext.role == "sre-oncall"
}
```

```ts
opaPolicy({
  client,
  path: 'agent/call/decision',
  toInput: ({ toolCall, runtimeContext }) => ({
    action: toolCall.toolName,
    principal: runtimeContext.role,
    resource: toolCall.input,
  }),
});
```

### API (exported from `@ai-sdk/policy-opa`)

| Name | Type | Description |
| --- | --- | --- |
| `shadow(approval, opts?)` | function | Wrap any approval so it is evaluated and reported but not enforced until `opts.enforce: true`. Recommended starting point for any new policy. |
| `wrapMcpTools(tools, approval, opts?)` | function | Make an approval total over a discovered tool set. `opts.default` controls uncovered tools (`'user-approval'` default, `'denied'`, `'approved'`). |
| `PolicyClient` | interface | The `evaluate(path, input)` interface every backend implements. The seam for non-OPA engines. |
| `wasmPolicyClient({ wasm, data? })` | async function | Loads a compiled OPA WASM bundle in-process. |
| `httpPolicyClient({ url, headers? })` | sync function | Client against a running OPA server. Pass `headers` for Styra DAS / EOPA authentication. |
| `opaPolicy({ client, path, toInput? })` | function | Returns a `toolApproval` configuration. Fails closed. |
| `optionalOpaPolicy({ client, path, toInput? })` | function | Like `opaPolicy` but returns `undefined` when `client` is `undefined`. |
| `opaCapabilityMiddleware({ client, path, toInput? })` | function | A `LanguageModelV4Middleware` that narrows `params.tools` to an allowlist. Fails closed. |
| `normalizeOpaDecision(result)` | function | Standalone result normalization, for users who call OPA themselves. |
| `PolicyDecision`, `WrappedMcpTools`, `PolicyDecisionEvent` | types | Helper types. |

### Rolling out with shadow mode

`shadow(approval, opts)` evaluates the policy and reports the decision via `onDecision`, but tells the SDK every call is approved until you flip `enforce: true`.

```ts
import { opaPolicy, shadow, wasmPolicyClient } from '@ai-sdk/policy-opa';

const client = await wasmPolicyClient({ wasm });

const toolApproval = shadow(
  opaPolicy({ client, path: 'agent/call/decision' }),
  {
    enforce: process.env.ENFORCE_POLICY === 'true',
    onDecision: event => {
      logger.info('policy.decision', {
        tool: event.toolCall.toolName,
        decision: event.decision.type,
        reason: event.decision.reason,
        enforced: event.enforced,
        wouldBlock: event.decision.type === 'denied',
      });
    },
  },
);
```

Each `PolicyDecisionEvent` carries the tool call, the policy `decision` (type and reason), `enforced`, and `effective` (what the SDK acted on). `onDecision` is fire-and-forget: a slow or throwing logger cannot block or break enforcement.

### Capability scoping and discovered tools

`opaCapabilityMiddleware` enforces policy before the model is told a tool exists (rule at `path` returns a `string[]` of allowed tool names, or `{ tools: string[] }`):

```ts
import { wrapLanguageModel } from 'ai';
import { wasmPolicyClient, opaCapabilityMiddleware } from '@ai-sdk/policy-opa';

const client = await wasmPolicyClient({ wasm });

const wrappedModel = wrapLanguageModel({
  model: anthropic('claude-sonnet-5-5'),
  middleware: opaCapabilityMiddleware({ client, path: 'agent/tools/allowed' }),
});
```

`wrapMcpTools` routes unmatched discovered tools (MCP / plugin registry) to a configurable default:

```ts
const discovered = await mcpClient.tools();
const client = await wasmPolicyClient({ wasm });

const { tools, toolApproval } = wrapMcpTools(
  discovered,
  opaPolicy({ client, path: 'agent/call/decision' }),
  { default: 'user-approval' }, // anything OPA does not match needs a human
);

await generateText({ model, tools, toolApproval, prompt });
```

### Loading the policy

- WASM (in-process): compile ahead of time with `opa build -t wasm -e 'agent/call/decision' -o bundle.tar.gz policy.rego` then `tar -xzf bundle.tar.gz /policy.wasm`; no network call per decision; hot-reload means rebuilding the WASM and re-instantiating the client.
- HTTP (running OPA server): `httpPolicyClient({ url: 'http://localhost:8181' })`; one HTTP round-trip per decision; good for hot-reload without redeploying.
- Static data at load time: pass `data` to `wasmPolicyClient({ wasm, data })`; it is handed to the bundle's `setData` and readable under `data.*`.

## Notes

- Backends are optional peer dependencies; only the backend you import is loaded.
- Errors fail closed: if the backend errors, or returns an unrecognized decision, `opaPolicy` returns `denied` (the error never rejects out of the callback and never aborts the run). A rule that matches nothing (`null` / `undefined`) normalizes to `not-applicable` (allow), so add a `default ... deny` rule to deny unmatched calls.
- Best fit is deterministic checks over structured fields (scopes, permissions, thresholds, allowlists, time windows, counts and running totals via `messages`). Content-based or semantic filtering ("do not use bad language") is weak: use a dedicated moderation or classification step.
- `toolApproval` only fires when the model calls a tool directly; a coarse dispatcher tool (e.g. a `bash` tool) can bypass per-action rules. Parse the dispatcher input in its own `toolApproval` entry and deny anything you cannot reduce to a clean invocation. This gates dispatch only; for untrusted execution use an out-of-band sandbox as the trust boundary.
- `optionalOpaPolicy` returns `undefined` when no client is given, which is the same as not passing `toolApproval` (the SDK approves every call); use `opaPolicy` directly to refuse startup without a policy.
- Test policies in CI with `opa test policy.rego policy_test.rego`.
- The official page's Rego example uses the older OPA 0.x syntax (no `if` before the rule body). `if` was added here for OPA 1.x (Rego v1 default). A v1-syntax example is in the package README: https://github.com/vercel/ai/blob/ai@7.0.142/packages/policy-opa/README.md
- Worked examples (SQL, HTTP, MCP, browser, shell dispatchers) live in the package README (`packages/policy-opa` in `vercel/ai`).

## Related

- [Tool Approvals](./tool-approvals.md)
- [Building Agents](./building-agents.md)
