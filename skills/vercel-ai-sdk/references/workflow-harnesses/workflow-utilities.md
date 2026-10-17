---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/workflow-utilities
---

# Workflow Utilities

`@ai-sdk/workflow-harness` provides helpers for running `HarnessAgent` turns inside a workflow: a serializable state machine and runners for time-sliced and semantic agent step turns. You call the runner from your own `'use workflow'` and `'use step'` functions.

## Signature / Usage

```bash
npm i @ai-sdk/workflow-harness workflow
```

Semantic agent step (configure the agent with `stopWhen: isStepCount(1)`):

```ts
import {
  runHarnessAgentStep,
  type HarnessWorkflowState,
} from '@ai-sdk/workflow-harness';

export async function agentStep(
  state: HarnessWorkflowState,
): Promise<HarnessWorkflowState> {
  'use step';

  const { agent } = await import('./agent');
  const {
    createVercelNetworkSandboxSession,
    resumeVercelNetworkSandboxSession,
  } = await import('@ai-sdk/sandbox-vercel');
  const sandboxId = `harness-${state.sessionId}`;
  const isFirstStep = state.resumeFrom == null && state.continueFrom == null;
  const sandboxSession = isFirstStep
    ? await createVercelNetworkSandboxSession({
        sandboxId,
        runtime: 'node24',
        ports: [4000],
        template: await agent.getSandboxTemplate(),
      })
    : await resumeVercelNetworkSandboxSession({ sandboxId });

  return runHarnessAgentStep({ agent, state, sandboxSession });
}
```

Workflow loop:

```ts
import { agentStep } from './agent-step';
import {
  createHarnessWorkflowState,
  finalizeHarnessWorkflow,
  type HarnessWorkflowInput,
} from '@ai-sdk/workflow-harness';

export async function agentWorkflow(input: {
  messages: NonNullable<HarnessWorkflowInput['messages']>;
  sessionId: string;
}) {
  'use workflow';

  let state = createHarnessWorkflowState(input);

  do {
    state = await agentStep(state);
  } while (state.status === 'ready_for_next_step');

  return finalizeHarnessWorkflow(state);
}
```

Time slices: omit `stopWhen` on the agent and call `runHarnessAgentTimeSlice({ agent, state, sandboxSession })` from the step; loop the same way.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| runHarnessAgentStep | function | Semantic agent step: persists the harness turn after each agent step. |
| runHarnessAgentTimeSlice | function | Persists a long-running turn at wall-clock boundaries; 750-second budget by default, `timeSliceSeconds` to change. |
| createHarnessWorkflowState | function | Creates `HarnessWorkflowState` from `{ messages, sessionId, resumeFrom? }`. |
| finalizeHarnessWorkflow | function | Returns the turn result or throws if the workflow failed. |
| state.status | string | `'ready_for_next_step'` while more work remains; each such result carries `continueFrom`. |

## Notes

- Stability: harness packages are experimental.
- Install the core harness package, an adapter, and a sandbox adapter as in `HarnessAgent`. Core harness and workflow files are framework-independent; the route handlers use Next.js as one example.
- Keep the Workflow step in its own module and import the agent dynamically inside the step body so the agent, sandbox adapter, and Node.js dependencies stay out of the workflow bundle. Keep `agent.ts`, the step module, `workflow.ts` and the route in separate modules.
- Pass messages converted with `convertToModelMessages` so `HarnessAgent` can distinguish a new user turn from tool approval and tool result continuations. The route returns `createUIMessageStreamResponse({ stream: run.readable as ReadableStream<UIMessageChunk> })` from `start(workflow, [{ messages, sessionId }])`.
- Workflow state `sessionId` identifies the harness session and `sandboxId` is derived from it; the state does not serialize a live sandbox. Otherwise persist `sandboxSession.id` separately.
- `destroyOnFinish` destroys the harness session, never the supplied sandbox. Never destroy the sandbox at a time-slice boundary where a subsequent step must resume it.
- Resume persistence: workflow persists `HarnessWorkflowState` (incl. `continueFrom`) for the current run. To continue the native session across separate user-turn runs, persist the opaque `resumeFrom` (type `HarnessV1ResumeSessionState` from `@ai-sdk/harness`) by `sessionId` in your own durable storage (the official example uses local files via `'use step'` functions; use durable storage in production), load it before `createHarnessWorkflowState({ ...input, resumeFrom })` and persist `state.resumeFrom` after the loop.
- Distance: Workflow DevKit / Vercel platform details are covered by the vercel skill; other durable engines (inngest) are separate skills.

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness adapters](./harness-adapters.md)
- [Harness UI](./harness-ui.md)
- [WorkflowAgent guide](./workflow-agent-guide.md)
