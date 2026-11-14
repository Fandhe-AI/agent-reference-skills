# Vercel AI SDK Integration

Run Vercel AI SDK calls durably by routing the model's HTTP requests through `context.call`, and wrapping tool execution in workflow steps.

## Signature / Usage

Adapted (not in the official docs): the `context.call` request body stays a string and the response `headers` / `body` follow the 1.x `{ status, headers, body }` shape (see context-call.md), instead of the official example's `JSON.parse` of the body and `responseInfo.header` arrays.

```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { HTTPMethods } from '@upstash/qstash';
import { WorkflowAbort, WorkflowContext } from '@upstash/workflow';

export const createWorkflowOpenAI = (context: WorkflowContext) => {
  return createOpenAI({
    compatibility: "strict",
    fetch: async (input, init) => {
      try {
        // Prepare headers from init.headers
        const headers = init?.headers
          ? Object.fromEntries(new Headers(init.headers).entries())
          : {};

        // Prepare body from init.body
        const body = init?.body as string | undefined;

        // Make network call
        const responseInfo = await context.call("openai-call-step", {
          url: input.toString(),
          method: init?.method as HTTPMethods,
          headers,
          body,
        });

        // Construct headers for the response
        const responseHeaders = new Headers();
        for (const [key, value] of Object.entries(responseInfo.headers)) {
          responseHeaders.set(key, Array.isArray(value) ? value.join(", ") : value);
        }

        // Return the constructed response
        return new Response(
          typeof responseInfo.body === "string" ? responseInfo.body : JSON.stringify(responseInfo.body),
          {
            status: responseInfo.status,
            headers: responseHeaders,
          }
        );
      } catch (error) {
        if (error instanceof WorkflowAbort) {
          throw error
        } else {
          console.error("Error in fetch implementation:", error);
          throw error; // Rethrow error for further handling
        }
      }
    },
  });
};
```

```typescript
import { serve } from "@upstash/workflow/nextjs";
import { WorkflowAbort } from '@upstash/workflow';
import { generateText, ToolExecutionError } from 'ai';

import { createWorkflowOpenAI } from './model';

export const { POST } = serve<{ prompt: string }>(async (context) => {
  const openai = createWorkflowOpenAI(context);

  // Important: Must have a step before generateText
  const prompt = await context.run("get prompt", async () => {
    return context.requestPayload.prompt;
  });

  try {
    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      maxTokens: 2048,
      prompt,
    });

    await context.run("text", () => {
      console.log(`TEXT: ${result.text}`);
      return result.text;
    });
    
  } catch (error) {    
    if (error instanceof ToolExecutionError && error.cause instanceof WorkflowAbort) {
      throw error.cause;
    } else {
      throw error;
    }
  }
});
```

## Options / Props

| Requirement | Detail |
|-------------|--------|
| Vercel AI SDK version | 4.0.12 or higher (required for `ToolExecutionError` handling) |
| Step before `generateText` | `generateText` must not be called before any workflow step; get the prompt in a `context.run` first (otherwise e.g. "prompt is undefined") |
| Error handling | Use the `ToolExecutionError` / `WorkflowAbort` rethrow pattern exactly as shown |
| Tools | Each tool's `execute` must be wrapped in `context.run()` with a descriptive step name; `maxSteps` must be greater than 1 when using tools |

Install: `npm install @ai-sdk/openai ai zod`.

## Notes

- The official pages disagree on the response header value type: `context.call` documents `Record<string, string>` while the official AI SDK example (and the workflow run log types) treat values as string arrays; the adapted wrapper accepts both
- Adapted from the official docs: the official `createWorkflowOpenAI` example parses `init.body` into an object and reads `responseInfo.header` as arrays of values, which does not match the `@upstash/workflow` 1.x `context.call` contract (string `body`, `{ status, headers, body }` result); the fetch wrapper above follows the 1.x contract
- Not yet available in `workflow-py`
- Using `context.call` as the fetch implementation makes Upstash perform the HTTP request and wait for the response, even if the LLM is slow; the pattern can be generalized to other LLM SDKs (Anthropic, Google)
- Model IDs (`gpt-3.5-turbo`) and the `compatibility` / `maxTokens` options come verbatim from the official page and may be outdated for current AI SDK versions
- Distinct from the `vercel-ai-sdk` skill (AI SDK itself) and from the Agents API (see agents)
- Source: https://upstash.com/docs/workflow/integrations/aisdk (fetched 2026-11-14; no version pin on the site)

## Related

- [agents](./agents.md)
- [context-call](./context-call.md)
- [context-api](./context-api.md)
