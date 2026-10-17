---
source: https://ai-sdk.dev/docs/agents/tool-approvals
---

# Tool Approvals

By default, tools with an `execute` function run automatically when the model calls them. Use `toolApproval` on `ToolLoopAgent` to review, approve, or deny selected tool calls before they execute.

## Signature / Usage

```ts
import { ToolLoopAgent, tool } from 'ai';
import { z } from 'zod';

const agent = new ToolLoopAgent({
  model,
  tools: {
    runCommand: tool({
      inputSchema: z.object({ command: z.string() }),
      execute: async ({ command }) => runCommand(command),
    }),
  },
  toolApproval: {
    runCommand: 'user-approval',
  },
});
```

When `runCommand` is called, the agent returns a `tool-approval-request` instead of executing the tool.

## Statuses

Every approval rule returns one of these statuses, either as a string or as an object with a `type` field:

| Status | Behavior |
| --- | --- |
| `'not-applicable'` | Execute the tool normally without approval metadata. This is the default. |
| `'approved'` | Record an automatic approval, then execute the tool. |
| `'denied'` | Record an automatic denial and return a denied tool output. |
| `'user-approval'` | Emit an approval request and wait for an explicit response. |

For automatic approvals and denials, use the object form to include a reason:

```ts
toolApproval: {
  deleteFile: {
    type: 'denied',
    reason: 'Deleting files is disabled in this workspace',
  },
}
```

Approval functions can also return `undefined`, which is treated the same as `'not-applicable'`.

## Decide Based on Tool Input

A per-tool approval function receives the typed input plus `toolCallId`, `messages`, `toolContext`, and `runtimeContext`.

```ts
const agent = new ToolLoopAgent({
  model,
  tools: {
    processPayment: tool({
      inputSchema: z.object({
        amount: z.number(),
        recipient: z.string(),
      }),
      execute: async ({ amount, recipient }) =>
        processPayment({ amount, recipient }),
    }),
  },
  toolApproval: {
    processPayment: async ({ amount }, { runtimeContext }) => {
      if (runtimeContext.role !== 'admin') {
        return { type: 'denied', reason: 'Only admins can send payments' };
      }
      return amount > 1000 ? 'user-approval' : undefined;
    },
  },
});
```

## Use One Policy for All Tools

Pass a function directly as `toolApproval` (a `GenericToolApprovalFunction`):

```ts
toolApproval: ({ toolCall }) => {
  if (toolCall.dynamic) {
    return 'user-approval';
  }

  if (toolCall.toolName === 'deleteFile') {
    return 'user-approval';
  }

  return undefined;
},
```

The generic function receives:

- `toolCall`: the full tool call, including `toolName`, `toolCallId`, `input`, and whether it is dynamic.
- `tools`: all tools available to the model.
- `toolsContext`: context for all tools.
- `messages`: the messages sent to the model for the step that produced the tool call.
- `runtimeContext`: the call's shared runtime context.

## Configure Approval per Request

Because `toolApproval` is an agent setting, it can be returned from `prepareCall`:

```ts
const agent = new ToolLoopAgent({
  model,
  callOptionsSchema: z.object({
    canRunCommands: z.boolean(),
  }),
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    toolApproval: {
      runCommand: options.canRunCommands
        ? 'user-approval'
        : { type: 'denied', reason: 'Command access is disabled' },
    },
  }),
  tools: {
    runCommand: tool({
      inputSchema: z.object({ command: z.string() }),
      execute: async ({ command }) => runCommand(command),
    }),
  },
});
```

## Handle Manual Approvals

1. Call `agent.generate()` or `agent.stream()` with `toolApproval`.
2. Read the `tool-approval-request` from the result or UI stream.
3. Ask the user or your approval system for a decision.
4. Add a `tool-approval-response` to the messages.
5. Call the agent again with the updated messages.

```ts
import { type ModelMessage, type ToolApprovalResponse } from 'ai';

const messages: ModelMessage[] = [{ role: 'user', content: 'Delete temp.txt' }];

const result = await agent.generate({ messages });
messages.push(...result.responseMessages);

const approvalResponses: ToolApprovalResponse[] = [];

for (const part of result.content) {
  if (part.type === 'tool-approval-request' && !part.isAutomatic) {
    approvalResponses.push({
      type: 'tool-approval-response',
      approvalId: part.approvalId,
      approved: true,
      reason: 'User confirmed the file can be deleted',
    });
  }
}

messages.push({
  role: 'tool',
  content: approvalResponses,
});

const finalResult = await agent.generate({ messages });
```

If approved, the tool runs on the second call. If denied, the model receives the denial and can respond without the tool result.

## Use with `useChat`

Approval requests appear as tool parts with `state: 'approval-requested'`. Respond with `addToolApprovalResponse`.

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { lastAssistantMessageIsCompleteWithApprovalResponses } from 'ai';

export default function Chat() {
  const { messages, addToolApprovalResponse } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });

  return messages.map(message =>
    message.parts.map(part => {
      if (part.type !== 'tool-runCommand') {
        return null;
      }

      if (part.state === 'approval-requested' && !part.approval.isAutomatic) {
        return (
          <div key={part.toolCallId}>
            {part.approval.requestReason && (
              <p>{part.approval.requestReason}</p>
            )}
            <button
              onClick={() =>
                addToolApprovalResponse({
                  id: part.approval.id,
                  approved: true,
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                addToolApprovalResponse({
                  id: part.approval.id,
                  approved: false,
                })
              }
            >
              Deny
            </button>
          </div>
        );
      }
    }),
  );
}
```

Only call `addToolApprovalResponse` for manual approvals. Automatic approvals and denials already include approval state in the stream. When a manual approval status includes a reason, it is available as `part.approval.requestReason`. A reason supplied with `addToolApprovalResponse` is stored separately as `part.approval.reason`.

## Schema transforms and persisted approvals

Approval requests preserve the original schema input in `inputSchemaInput` when it differs from the input presented for approval. Keep this field when persisting `responseMessages` or UI messages; the UI message conversion functions preserve it automatically. On continuation, the SDK reconstructs the transformed input and checks that it matches the approved input. It never replaces the approved input with a different value. Older or projected histories that omit the original input are rejected as invalid tool input if revalidation fails or would change the approved value. The original input is included in persisted messages and UI approval streams, including fields removed by schema transforms; a transform that removes a field does not redact it from approval metadata.

## Signing approvals with `experimental_toolApprovalSecret`

In the standard `useChat` pattern, the server rebuilds the conversation from the messages the client sends each turn, so message history is client-controlled input. Tool approvals reconstructed from this history are re-validated (schema check and policy re-evaluation), but without additional protection a client that crafts a valid-looking approval for a schema-conforming input can bypass the human-in-the-loop step. For sensitive tools, use `experimental_toolApprovalSecret`: the server HMAC-signs each approval request at issuance and verifies the signature when the approval is replayed. Configure it on `ToolLoopAgent` (or pass it directly to `generateText` or `streamText`).

```ts
const agent = new ToolLoopAgent({
  model,
  tools: { deleteFile, runQuery },
  toolApproval: { deleteFile: 'user-approval', runQuery: 'user-approval' },
  experimental_toolApprovalSecret: process.env.TOOL_APPROVAL_SECRET,
});
```

The signature binds the approval to the exact tool name, tool call ID, and input arguments. Setting up the secret:

1. Generate a high-entropy random string (at least 32 bytes): `openssl rand -base64 32`
2. Store it as an environment variable accessible to all server instances: `TOOL_APPROVAL_SECRET=your-generated-secret-here`
3. Pass it to `ToolLoopAgent`, `generateText`, or `streamText` via `experimental_toolApprovalSecret`.

Every serverless instance that might handle a request needs the same secret. When configured: approval requests without a valid signature are rejected (fail-closed); with no secret configured approvals work as before; the secret is never sent to the client or included in the stream.

## Notes

- `toolApproval` applies to tools executed by the AI SDK. Provider-executed tools run provider-side and do not use AI SDK tool approvals.
- When a tool execution is denied, consider adding an instruction such as "When a tool execution is not approved, do not retry it" to prevent repeated approval requests for the same action.
- `experimental_toolApprovalSecret` is experimental and can change in patch releases. `WorkflowAgent` also supports it; it signs in a workflow step before writing the durable approval request. Pass an environment variable reference, such as `{ environmentVariable: 'TOOL_APPROVAL_SECRET' }`, so the raw secret is read only inside signing and verification steps.
- `toolApproval` is used with `ToolLoopAgent`, `generateText`, and `streamText`. `needsApproval` is used only with `WorkflowAgent`, where approvals suspend and resume durable workflow execution. The Subagents page refers to `needsApproval` as deprecated. On `ToolLoopAgent`, `toolApproval` takes precedence over a tool's `needsApproval` default.
- Subagent tools cannot use `toolApproval`.

## Related

- [Policy-Based Tool Approvals](./policy-tool-approvals.md)
- [Subagents](./subagents.md)
- [ToolLoopAgent](./tool-loop-agent.md)
- [Building Agents](./building-agents.md)
