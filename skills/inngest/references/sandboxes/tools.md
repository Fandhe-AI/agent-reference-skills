# Tools

Let code in a Sandbox call back into your app. Each call is a durable step that runs with your credentials, so the Sandbox never sees your keys.

## Signature / Usage

Pass `tools` to `commands.run`; the code calls it by name.

```typescript
await sandbox.commands.run("agent", "node agent.js", {
  tools: {
    getCustomer: (id: string) => db.customers.find(id),
  },
});
```

Inside the Sandbox, import `inngest_tools`:

```js
// agent.js
const { tools } = require("inngest_tools");

async function main() {
  const customer = await tools.getCustomer("cus_1");
}

main();
```

```python
# agent.py
import asyncio
from inngest_tools import tools

async def main():
    customer = await tools.getCustomer("cus_1")

asyncio.run(main())
```

Use tools in a runner (no import needed in the code):

```typescript
const total = await step.sandbox.python(
  "total",
  `customer = await tools.getCustomer("cus_1")
return customer["seats"] * 10`,
  {
    tools: { getCustomer: (id: string) => db.customers.find(id) },
    schema: { output: z.number() },
  },
);
```

Type the arguments with `tool.step()`:

```typescript
import { tool } from "inngest/experimental";
import { z } from "zod";

const getCustomer = tool.step({
  description: "Look up a customer by ID",
  input: z.object({ id: z.string() }),
  output: z.object({ name: z.string() }),
  run: async ({ id }, { idempotencyKey }) => {
    return db.customers.find(id);
  },
});

await sandbox.commands.run("agent", "node agent.js", {
  tools: { getCustomer },
});
```

```js
const customer = await tools.getCustomer({ id: "cus_1" });
```

```python
customer = await tools.getCustomer(id="cus_1")
```

Run steps inside a tool with `tool.group()`:

```typescript
import { step } from "inngest";
import { tool } from "inngest/experimental";

const refund = tool.group({
  input: z.object({ orderId: z.string() }),
  run: async ({ orderId }) => {
    const result = await step.invoke("refund", {
      function: refundFn,
      data: { orderId },
    });

    await step.sendEvent("notify", { name: "order/refunded", data: result });

    return result;
  },
});
```

Pass an Inngest function as a tool:

```typescript
import { eventType } from "inngest";

const refund = inngest.createFunction(
  {
    id: "refund",
    triggers: [
      eventType("order/refund", {
        schema: z.object({ orderId: z.string() }),
      }),
    ],
  },
  async ({ event }) => issueRefund(event.data.orderId),
);

await sandbox.commands.run("agent", "node agent.js", {
  tools: { refund },
});
```

Tune calls with `toolOptions`:

```typescript
await sandbox.commands.run("agent", "node agent.js", {
  tools: { getCustomer },
  toolOptions: { toolTimeout: "10s", maxCalls: 50 },
});
```

Give the tools to a model with `toolDefinitions(tools)`:

```typescript
import { toolDefinitions } from "inngest/experimental";

await anthropic.messages.create({
  model,
  max_tokens: 1024,
  messages,
  tools: toolDefinitions({ getCustomer }),
});
```

## Options / Props

`toolOptions`:

| Option | Default | What it does |
|--------|---------|--------------|
| `toolTimeout` | 30 seconds | How long one `tool.step()` may run before its step fails. |
| `maxCalls` | 100 | Tool calls allowed in one command before it is stopped. |
| `waitWindow` | 20 seconds | The longest one wait step blocks before a fresh one continues. |

### Limits

- Tool names start with a letter, then letters, digits, or `_`, up to 64 characters.
- A request from the Sandbox can be 256 KiB, and a reply 1 MiB.
- A command with tools can run for 5 minutes when you set no `timeout`.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- `tool` is exported from `inngest/experimental`; the API can change.
- Every call is its own step: retried, memoized, and visible in the trace. A tool can close over a client or tenant created earlier in the handler, and can be a plain function, an Inngest function, or a group of steps.
- A tool that fails raises a `ToolError` the code can catch. Tools work with `step.sandbox`; the direct `inngest.sandboxes` client does not run them.
- A plain function takes positional arguments; `tool.step()` takes named, validated ones. A bad call gets a `ToolError` in the Sandbox and nothing runs. `input` and `output` take any Standard Schema. `idempotencyKey` stays the same across retries; pass it to APIs that deduplicate writes.
- The body of a `tool.group()` can use real steps: run them in parallel, invoke other functions, send events, or wait for one.
- An Inngest function, or a `referenceFunction()` to one, is a tool too. The code passes named arguments, which become the event data, and gets the function's result back. Arguments are checked against the function's trigger schema when it has one. Without a schema, any named arguments are sent; wrap the invoke in `tool.group()` to declare the input you want.
- Arguments arrive from the Sandbox, so validate them with `tool.step()` when the code is untrusted.
- `toolDefinitions(tools)` (experimental, from `inngest/experimental`) returns `{ name, description, input_schema }` for each tool, ready for a model API, with no hand-written JSON Schema. For OpenAI, map each definition to `{ type: "function", name, description, parameters: input_schema }`. Declare tools with `tool.step()` or `tool.group()` and an object `input` schema; schemas come from Zod 4 or any library that implements Standard JSON Schema, other schemas throw. A tool without an `input` schema takes any object.
- `toolDefinitions(tools)` is covered by this page's source. Command shims are described below.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/tools (retrieved 2026-11-14)

### Command shims (experimental, SDK 4.26.2)

`tool.shim()` makes a program on the command's `PATH` call a handler in your app first. The handler gets the command's `sandbox`, so it can do privileged work in your app and reply with the result, run the real program (as called, or with another `argv`, extra `env` or `stdin`), or refuse. Credentials never need to enter the sandbox.

```ts
import { tool } from "inngest/experimental";

await sandbox.$({
  shims: [
    tool.shim("terraform", ({ argv, run, refuse }) => {
      return argv[0] === "apply"
        ? refuse("apply goes through a pull request")
        : run();
    }),
    tool.shim.config({ REGION: "iad" }),
  ],
}).sh`terraform plan && inngest-tool config REGION`;
```

- `shims` is accepted by `commands.run()` and `$` and takes only `tool.shim()` values. Code in the sandbox reads settings with `inngest-tool config NAME` and lists the shims with `inngest-tool shims`. Commands with tools or shims can run longer than five minutes, `exitCodes` works with them, and a timeout fails as a `sandbox_exec_timed_out` error. Shims use a small static `inngest-tool` binary that the SDK puts into the sandbox when it is missing.
- Source: https://github.com/inngest/inngest-js/releases/tag/inngest@4.26.2 (retrieved 2026-11-14)

## Related

- [Commands](./commands.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Secrets](./secrets.md)
- [Limits](./limits.md)
