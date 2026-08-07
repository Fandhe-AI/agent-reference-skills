# step.fetch

Makes durable HTTP requests by offloading them to the Inngest Platform, so the request survives even if the calling service is not active while waiting for a response.

## Signature / Usage

```ts
step.fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>
```

```ts
export const retrieveTextFile = inngest.createFunction(
  { id: "retrieveTextFile", triggers: { event: "textFile/retrieve" } },
  async ({ step }) => {
    // The fetching of the text file is offloaded to the Inngest Platform
    const response = await step.fetch(
      "https://example-files.online-convert.com/document/txt/example.txt"
    );

    // The Inngest function run is resumed when the HTTP request is complete
    await step.run("extract-text", async () => {
      const text = await response.text();
      const exampleOccurences = text.match(/example/g);
      return exampleOccurences?.length;
    });
  }
);
```

A Fetch API-compatible `fetch()` utility is also exported from `inngest` for passing to packages/SDKs that accept a custom `fetch` implementation (e.g. `axios`, AI SDK providers):

```ts
import { fetch as inngestFetch } from "inngest";
import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic({ fetch: inngestFetch });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input` | `RequestInfo \| URL` | The URL or `Request` to fetch, same as the native Fetch API |
| `init` | `RequestInit` | (optional) Standard fetch options (method, headers, body, etc.) |

## Notes

- Useful in serverless environments to offload long-running HTTP requests that might otherwise trigger platform timeouts
- Makes starting parallel HTTP requests easier via `Promise.all()`
- All `step.fetch()` calls are visible in Inngest Traces for monitoring and debugging
- The exported `fetch()` utility should **not** be called inside `step.run()` blocks — it internally transforms calls into `step.run()` calls, which cannot be nested, and silently falls back to the global `fetch` if nested
- Outside of an Inngest function, `fetch()` falls back to the global `fetch`; a custom fallback can be set with `fetch.config({ fallback: myCustomFetch })`, or disabled with `fetch.config({ fallback: undefined })`
- When used with the AI SDK, disable the SDK's own retry logic (`maxRetries: 0` in `generateText()` / `streamText()`) so Inngest's retry mechanism handles retries instead of compounding with the SDK's

## Related

- [step.run](./step-run.md)
- [Parallel Steps](./parallel-steps.md)
