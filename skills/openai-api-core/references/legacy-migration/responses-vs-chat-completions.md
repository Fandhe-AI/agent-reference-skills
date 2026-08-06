# Responses API vs. Chat Completions API

Capability and design comparison between the two text-generation primitives, to decide which one to use.

## Signature / Usage

```javascript
// Chat Completions
const completion = await client.chat.completions.create({
  model: "gpt-5.6",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ],
});
console.log(completion.choices[0].message.content);

// Responses
const response = await client.responses.create({
  model: "gpt-5.6",
  instructions: "You are a helpful assistant.",
  input: "Hello!",
});
console.log(response.output_text);
```

The [Responses API](https://developers.openai.com/api/reference/resources/responses) is the newer, unified API primitive — an evolution of [Chat Completions](https://developers.openai.com/api/reference/resources/chat) with agentic primitives (built-in tools, multi-turn state) and native multimodal support. Chat Completions remains supported, but Responses is recommended for all new projects.

## Options / Props

| Capability | Chat Completions API | Responses API |
|------------|----------------------|----------------|
| Text generation | Yes | Yes |
| Audio | Yes | Coming soon |
| Vision | Yes | Yes |
| Structured Outputs | Yes | Yes |
| Function calling | Yes | Yes |
| Web search | No | Yes |
| File search | No | Yes |
| Computer use | No | Yes |
| Code interpreter | No | Yes |
| MCP | No | Yes |
| Image generation | No | Yes |
| Reasoning summaries | No | Yes |

## Notes

- **Messages vs. Items**: Chat Completions exchanges an array of `messages`; Responses exchanges typed `input`/`output` Items (`message`, `reasoning`, `function_call`, `function_call_output`, ...). A `message` is just one Item type among several.
- Chat Completions can return multiple parallel generations via `choices` and the `n` param; Responses always returns a single generation (no `n` param).
- Responses are stored by default; Chat Completions are stored by default for new accounts. Set `store: false` to disable storage on either API.
- Reasoning models (e.g. GPT-5 family) get richer tool usage and reasoning-item context preservation in Responses. Starting with GPT-5.4, Chat Completions does not support tool calling with `reasoning: none`.
- Structured Outputs use `response_format` in Chat Completions vs. `text.format` in Responses (different shape).
- Function-calling request/response shapes differ between the two APIs (see the migration guide for details).
- The Responses SDK provides an `output_text` helper; Chat Completions does not.
- Chat Completions requires manual conversation-state management; Responses supports the Conversations API and `previous_response_id` chaining.
- Better performance and cost claimed for Responses with reasoning models: ~3% SWE-bench improvement and 40-80% better cache utilization vs. Chat Completions in OpenAI's internal evaluations.

## Related

- [Migrate Chat Completions to Responses](./migrate-chat-completions-to-responses.md)
- [Assistants to Responses migration](./assistants-to-responses-migration.md)
