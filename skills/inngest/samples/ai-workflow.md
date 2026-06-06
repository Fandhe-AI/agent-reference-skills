# AI Workflow

Make LLM calls durable and observable using step.ai — automatic retries, memoization, and inference tracking included.

```typescript
import { Inngest } from "inngest";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const inngest = new Inngest({ id: "my-app" });

// Option A: step.ai.infer() — call any OpenAI-compatible endpoint directly
export const summarizeTicket = inngest.createFunction(
  { id: "summarize-ticket" },
  { event: "app/ticket.created" },
  async ({ event, step }) => {
    const summary = await step.ai.infer("summarize-with-openai", {
      model: step.ai.models.openai({ model: "gpt-4o" }),
      body: {
        messages: [
          {
            role: "user",
            content: `Summarize this support ticket: ${event.data.body}`,
          },
        ],
      },
    });

    await step.run("save-summary", async () => {
      await db.tickets.update(event.data.ticketId, {
        summary: summary.choices[0].message.content,
      });
    });

    return summary.choices;
  }
);

// Option B: step.ai.wrap() — wrap any AI SDK call for durability
export const classifyContent = inngest.createFunction(
  { id: "classify-content" },
  { event: "app/content.uploaded" },
  async ({ event, step }) => {
    const { text } = await step.ai.wrap("classify-with-vercel-ai", generateText, {
      model: openai("gpt-4-turbo"),
      prompt: `Classify the following content into one category (news, opinion, tutorial): ${event.data.content}`,
    });

    return { classification: text };
  }
);
```

## Notes

- `step.ai.infer()` offloads the HTTP call to Inngest infrastructure; all requests and responses appear in workflow traces
- `step.ai.wrap()` works with any AI SDK function (Vercel AI SDK, Anthropic SDK, etc.) — bind the method first if needed (`anthropic.messages.create.bind(anthropic.messages)`)
- Both methods memoize the result — LLM calls are not repeated when the function retries after a downstream failure
- For multi-step agent loops, wrap each LLM call in its own `step.run()` or `step.ai.infer()` so each reasoning step is individually checkpointed
