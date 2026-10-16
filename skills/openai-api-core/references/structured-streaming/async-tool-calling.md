# Async Tool Calling

Lets the model continue working after it calls a tool, without waiting for that tool's result. Set `async: true` on a function or custom tool definition; your application still executes the tool and returns the output in a later Responses request, matched by the original `call_id`.

## Signature / Usage

```javascript
import OpenAI from "openai";

const client = new OpenAI();
const model = "gpt-6-astra";

const tools = [
  {
    type: "function",
    name: "get_weather",
    description: "Read a demo weather snapshot for a city.",
    async: true,
    strict: true,
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
      additionalProperties: false,
    },
  },
];

let response = await client.responses.create({
  model,
  tools,
  input:
    "Check the demo weather snapshot for Paris. Meanwhile, " +
    "list three essentials for any city trip.",
});

const call = response.output.find((item) => item.type === "function_call");
if (!call || call.name !== "get_weather") {
  throw new Error("The response did not include a weather call.");
}
const { city } = JSON.parse(call.arguments);
let latestResponseId = response.id;

// Calling an async function starts the application's job immediately.
const job = getWeather(city).catch((error) => ({ error: error.message }));
if (!call.async) {
  // Ordinary synchronous calls must finish before the model resumes.
  await job;
}
// Independent work or conversation turns can happen here.
const result = await job;

response = await client.responses.create({
  model,
  tools,
  previous_response_id: latestResponseId,
  input: [
    {
      type: "function_call_output",
      call_id: call.call_id,
      output: JSON.stringify(result),
    },
  ],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `async` | boolean | On a function or custom tool definition; lets the model continue after issuing the call. Corresponding call items in `response.output` also include `async: true` |
| `call_id` | string | Original API call ID; use it on the output item to match a result to its call |
| `task_handle` | string | Application-defined argument (not built in) that the model assigns to each async call; the application binds it to the original `call_id` and the running job |

| Tool type | Call item | Output item |
|-----------|-----------|-------------|
| Function | `function_call` | `function_call_output` |
| Custom | `custom_tool_call` | `custom_tool_call_output` |

## Notes

- Async tool calling is supported by GPT-6 Astra and later models.
- Your application still executes the tool; async tools do not move execution to OpenAI or manage your background jobs. This differs from Background mode, which runs response generation asynchronously.
- The response can contain both the async call and an answer. If other conversation turns happen before the job finishes, update `latest_response_id` to continue from the latest response while keeping the original tool `call_id`. Include the tools and instructions in the continuation request.
- For earlier dispatch with streaming, start the job when its complete call item arrives while you continue consuming the response.
- Async execution applies to function and custom tools that your application runs. It does not apply to hosted built-in tools. Use direct tool calls; do not configure async tools for programmatic tool calling.
- In Multi-agent mode, do not combine async tools with parallel tool calls.

### Wait tool pattern

A wait tool lets the model choose when it needs a pending result. Add a `task_handle` argument to each async tool and keep handles unique throughout the conversation, including completed tasks. Define the wait tool as an ordinary synchronous function (omit `async` or set `false`). `wait_for_tasks` is not a built-in Responses tool.

```json
{
  "type": "function",
  "name": "wait_for_tasks",
  "description": "Wait for selected tasks whose results you need. Pass a nonempty list of distinct task_handles from your earlier async tool calls. Results arrive on their original calls; this tool returns status only. Do not wait again for results that have already arrived.",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {
      "task_handles": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["task_handles"],
    "additionalProperties": false
  }
}
```

- Register and start each launch before processing a dependent wait. Keep the handle registry for the entire conversation.
- Return each newly completed result on its original `call_id` first, then return status on the wait call's own `call_id`, so the model has the results when it resumes:

```json
[
  {
    "type": "function_call_output",
    "call_id": "call_widget",
    "output": "{\"task_handle\":\"widget_price_1\",\"price_cents\":1200,\"currency\":\"USD\"}"
  },
  {
    "type": "function_call_output",
    "call_id": "call_wait",
    "output": "{\"status\":\"completed\",\"completed_task_handles\":[\"widget_price_1\"]}"
  }
]
```

- Results can also be delivered as they become available, without a wait call. Only use the wait tool when the model's next step depends on results that have not arrived.

### Asking the user for input

An async function such as `request_user_input_async` (application-defined, not a built-in Responses tool) can ask the user a question while the model continues independent work. Register the question's `task_handle` and `call_id`, display the question, and return the user's answer on the original `call_id`:

```json
[
  {
    "type": "function_call_output",
    "call_id": "call_audience",
    "output": "{\"task_handle\":\"report_audience_1\",\"answer\":\"Executives\"}"
  }
]
```

- Do not complete the call with an acknowledgment that the question was displayed; its result is the user's answer.
- Async execution does not keep a response open until the user replies. If a question is dismissed or times out, return an explicit no-answer result.
- If the model called `wait_for_tasks` for that handle, return the answer before the wait status.
- Source: https://developers.openai.com/api/docs/guides/async-tool-calling (retrieved 2026-10-17, no version pin on the site).

## Related

- [Function Calling](./function-calling.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
- [Streaming API Responses](./streaming-responses.md)
- [Mid-turn Steering](./steering.md)
