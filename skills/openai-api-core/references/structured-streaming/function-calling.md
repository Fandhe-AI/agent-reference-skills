# Function Calling

Lets a model connect to external data and systems by declaring callable functions in the `tools` parameter of a Responses API request, then reading back the model's requested tool calls to execute locally.

## Signature / Usage

```python
from openai import OpenAI
import json

client = OpenAI()

def get_horoscope(sign):
    return f"{sign}: Next Tuesday you will befriend a baby otter."

def call_function(name, args):
    if name == "get_horoscope":
        return get_horoscope(args["sign"])

tools = [
    {
        "type": "function",
        "name": "get_horoscope",
        "description": "Get today's horoscope for an astrological sign.",
        "parameters": {
            "type": "object",
            "properties": {
                "sign": {
                    "type": "string",
                    "description": "An astrological sign like Taurus or Aquarius",
                },
            },
            "required": ["sign"],
        },
    },
]

input_list = [{"role": "user", "content": "What is my horoscope? I am an Aquarius."}]

response = client.responses.create(
    model="gpt-6-astra",
    tools=tools,
    input=input_list,
)

# Execute the requested tool call(s) and send results back
input_list += response.output

for tool_call in response.output:
    if tool_call.type != "function_call":
        continue
    name = tool_call.name
    args = json.loads(tool_call.arguments)
    result = call_function(name, args)
    input_list.append({
        "type": "function_call_output",
        "call_id": tool_call.call_id,
        "output": json.dumps(result),
    })

response = client.responses.create(model="gpt-6-astra", input=input_list, tools=tools)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | string | Always `"function"` for a function tool definition |
| `name` | string | The function's name (e.g. `get_weather`) |
| `description` | string | Details on when and how to use the function |
| `parameters` | object | JSON schema defining the function's input arguments |
| `strict` | boolean | Enforces strict schema adherence for the call arguments |
| `tool_choice` | string \| object | `"auto"` (default, zero/one/many calls), `"required"` (at least one call), or `{"type": "function", "name": "..."}` to force one specific function |
| `parallel_tool_calls` | boolean | Set `false` to prevent the model from requesting multiple function calls in one turn |
| `async` | boolean | GPT-6 models: `true` lets the model keep working while your app runs the tool; see [Async tool calling](./async-tool-calling.md) |
| `type: "namespace"` | object | Groups related tools by domain: `{type: "namespace", name, description, tools: [...]}` (e.g. `crm`, `billing`); each function inside can set `defer_loading: true` |

## Notes

- The call/response cycle is a five-step flow: send a request with `tools`, receive a tool call from the model, execute the corresponding function, send the `function_call_output` back with the matching `call_id`, then receive the final (or next tool-calling) response.
- Parallel function calling is available when built-in tools are not mixed into the same batch; built-in tools cannot be included in a parallel function-call batch.
- Strict mode requires `additionalProperties: false` on every object in `parameters` and every field in `properties` to be listed in `required`.
- Keep the initial number of available functions under ~20 for best selection accuracy; for larger tool ecosystems use tool search / deferred loading (`defer_loading: true`) instead of listing every function up front.
- Custom tools accept a freeform string instead of a JSON-schema-validated payload, useful to avoid JSON wrapping; their input can be constrained with a context-free grammar in `lark` or `regex` syntax (lookarounds and lazy modifiers `*?`/`+?`/`??` are unsupported in both).
- Function-call arguments can be streamed incrementally via SSE delta events when `stream: true` is set on the request — see Streaming API Responses.
- GPT-6 Astra and GPT-6.1 Sol require the Responses API for tool calling; the source's Chat Completions examples use GPT-5.6 Terra with reasoning disabled.
- Only `gpt-5.4` and later models support `tool_search` (a hosted tool that lets the model search deferred tools and load them; details belong to the openai-agents skill).
- Namespaces help when the model must choose between tools serving different systems (e.g. a CRM search vs. a support-ticket search). For deferred tools, put detailed guidance in the function description and keep the namespace description concise.
- This is the Responses API's own function calling, distinct from Functions in the Agents API (openai-agents skill).
- This page covers the Responses API's basic function-calling loop only. Deferred tool loading/tool search, built-in tools (web search, file search, code interpreter, MCP), and multi-agent orchestration are covered by the openai-agents skill, not here.
- This is an OpenAI API (developers.openai.com) guide; it is unrelated to job-queue "function"/"task" concepts in bullmq or inngest, or to Supabase Edge Functions.

## Related

- [Structured Outputs](./structured-outputs.md)
- [Streaming API Responses](./streaming-responses.md)
- [Programmatic Tool Calling](./programmatic-tool-calling.md)
