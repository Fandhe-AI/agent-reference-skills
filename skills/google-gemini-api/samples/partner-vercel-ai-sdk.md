---
source: https://ai.google.dev/gemini-api/docs/vercel-ai-sdk-example
---

# Vercel AI SDK with Gemini

Call Gemini through the AI SDK's Google provider with Google Search, then extract structured data with `generateObject` and a zod schema.

```bash
npm install ai @ai-sdk/google zod
export GOOGLE_GENERATIVE_AI_API_KEY="YOUR_API_KEY_HERE"
```

```typescript
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

async function main() {
  const { text } = await generateText({
    model: google("gemini-3.8-flash"),
    prompt: 'What is plant-based milk?',
  });

  console.log(text);
}

main().catch(console.error);
```

```typescript
import { google } from "@ai-sdk/google";
import { generateText, generateObject } from "ai";
import { z } from "zod/v4";

async function main() {
  // Step 1: Search market trends
  const { text: marketTrends, sources } = await generateText({
    model: google("gemini-3.8-flash"),
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    prompt: `Search the web for market trends for plant-based milk in North America for 2024-2025.
          I need to know the market size, key players and their market share, and primary consumer drivers.
          `,
  });

  console.log("Market trends found.");

  // Step 2: Extract chart data
  const { object: chartData } = await generateObject({
    model: google("gemini-3.8-flash"),
    schema: z.object({
      chartConfigurations: z
        .array(
          z.object({
            type: z.enum(["bar", "line"]).describe('The type of chart to generate. Either "bar" or "line"',),
            labels: z.array(z.string()).describe("A list of chart labels"),
            data: z.array(z.number()).describe("A list of the chart data"),
            label: z.string().describe("A label for the chart"),
            colors: z.array(z.string()).describe('A list of colors to use for the chart, e.g. "rgba(255, 99, 132, 0.8)"',),
          }),
        )
        .describe("A list of chart configurations"),
    }),
    prompt: `Given the following market trends text, come up with a list of 1-3 meaningful bar or line charts
    and generate chart data.

Market Trends:
${marketTrends}
`,
  });
}

main().catch(console.error);
```

## Notes

- Replace `YOUR_API_KEY_HERE` with your key (do not commit it).
- The official guide goes on to render charts with Chart.js and save a PDF with Puppeteer; that step is omitted here.
- The `GOOGLE_GENERATIVE_AI_API_KEY` environment variable is read automatically by the Google Generative AI Provider (not `GEMINI_API_KEY`).
- Third-party library (AI SDK by Vercel); model ID `gemini-3.8-flash` is kept as written.
- Not the Vercel platform itself (see the vercel skill).
