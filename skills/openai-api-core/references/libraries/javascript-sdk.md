# JavaScript / TypeScript SDK

Official OpenAI SDK for TypeScript and JavaScript (`openai` package on npm), for server-side environments such as Node.js, Deno, or Bun.

## Signature / Usage

```bash
npm install openai
```

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.6",
  input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
```

## Notes

- `new OpenAI()` reads the API key automatically from the `OPENAI_API_KEY` environment variable; export it before running (`export OPENAI_API_KEY="your_api_key_here"`, or `setx OPENAI_API_KEY "your_api_key_here"` on Windows PowerShell).
- Run the example with `node example.mjs` or the equivalent command for Deno/Bun.
- Source and full API surface: [github.com/openai/openai-node](https://github.com/openai/openai-node).

## Related

- [Python SDK](./python-sdk.md)
- [OpenAI CLI](./openai-cli.md)
