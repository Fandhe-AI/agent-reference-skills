---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction
---

# Agent Instructions

Agent instructions give the model natural-language guidance: overall goal, how to behave, persona, and references and dynamic conditions. Global instructions are inherited by every agent in the application.

## Signature / Usage

### Root agent instructions

```text
CURRENT CUSTOMER: {username}

You are the main Weather Agent coordinating multiple agents.
Your primary responsibility is to provide weather information.
Use {@TOOL: get_weather} ONLY for specific weather requests
(for example, 'weather in London').

If you know the user's name, always greet them by their name.

You have specialized sub-agents:
  1. Greeting Agent: Handles simple greetings like 'Hi', 'Hello'.
  2. Farewell Agent: Handles simple farewells like 'Bye', 'See you'.

Analyze the user's query.
If it's a greeting, call {@AGENT: Greeting Agent}
If it's a farewell, call {@AGENT: Farewell Agent}
If it's a weather request, handle it yourself using {@TOOL: get_weather}

For anything else, respond appropriately or state you cannot handle it.
```

### References sample

```text
If it's a greeting, call {@AGENT: Greeting Agent}
If it's a farewell, call {@AGENT: Farewell Agent}
If it's a weather request, handle it yourself using {@TOOL: get_weather}

Please follow these business rules: {{business_rules}}.
```

### Modality and conditional samples

```text
{@startModality_Text}
Text instructions here.
{@endModality_Text}
```

```text
{% if _session.modality == 'TEXT' %}
Say exactly: "Welcome to Customer Support! I am your virtual assistant."
{% else %}
Say exactly: "Hi there! Thank you for calling customer support."
{% endif %}

{% if brand_name == 'Cymbal Retail' or brand_name == 'Cymbal Wholesale' %}
Say exactly: "Welcome to Cymbal support".
{% elif brand_name == 'Acme Corp' %}
Say exactly: "Welcome to Acme Corp support".
{% else %}
Say exactly: "Welcome to support".
{% endif %}
```

### `_session` scenario variable for evaluations

```json
{
  "modality": "TEXT",
  "channel": "API"
}
```

### Few-shot examples

Adapted (not in the official docs): the tool call `get_weather(location="London")` became `get_weather(city="London")`, the parameter name of the `get_weather(city: str)` tool that the Weather Agent quickstart defines.

````xml
<examples>
  EXAMPLE 1:
  Begin example
  [user]
  What's the weather in London?
  [model]
  ```tool_code
  get_weather(city="London")
  ```
  ```tool_outputs
  {"temperature": "15 C", "condition": "Cloudy"}
  ```
  [model]
  The weather in London is 15 C and Cloudy.
  End example
</examples>
````

## Options / Props

### References

| Syntax | Description |
|---|---|
| `{variable_name}` | References a particular dynamic variable. |
| `{{variable_name}}` | References a particular static variable. |
| `{@AGENT: Agent Name}` | References a particular agent. |
| `{@TOOL: tool_name}` | References a particular tool. |

### Modality conditions

| Syntax | Description |
|---|---|
| `{@startModality_Text}` (or `{@startModalityTEXT}`) | Marks the beginning of instructions that only apply to text driven interactions. |
| `{@endModality_Text}` (or `{@endModalityTEXT}`) | Marks the end of instructions that only apply to text driven interactions. |
| `{@startModality_Voice}` (or `{@startModalityVOICE}`) | Marks the beginning of instructions that only apply to voice driven interactions. |
| `{@endModality_Voice}` (or `{@endModalityVOICE}`) | Marks the end of instructions that only apply to voice driven interactions. |

### Flexible conditions

| Syntax | Description |
|---|---|
| `{% if variable_name == 'A' %}` | Marks the beginning of instructions that only apply when the variable is equal to the given value. |
| `{% if _session.modality == 'MODALITY' %}` | Marks the beginning of instructions that only apply to the given MODALITY value, which can be one of: `TEXT` `VOICE` |
| `{% if _session.channel == 'CHANNEL' %}` | Marks the beginning of instructions that only apply to the given CHANNEL value, which can be one of: `API` `WEB_UI` `TWILIO` `GOOGLE_TELEPHONY_PLATFORM` `CONTACT_CENTER_AS_A_SERVICE` `CONTACT_CENTER_AS_A_SERVICE_CHAT` `FIVE9` `WHATSAPP` `INSTAGRAM` `CONTACT_CENTER_INTEGRATION` |
| `and` | Logical AND used within a condition. |
| `or` | Logical OR used within a condition. |
| `not` | Logical NOT used within a condition. |
| `{% else %}` | Start else block of condition. |
| `{% elif ... %}` | Start else-if block of condition. |
| `{% endif %}` | Complete the condition. |

### Recommended XML tags

| Tag | Description |
|---|---|
| `role` | Defines the agent's core function or responsibility. |
| `persona` | Describes the agent's personality, tone, and behavioral guidelines. |
| `primary_goal` | Within `<persona>`, specifies the agent's main objective. |
| `constraints` | Lists rules or limitations the agent must follow. |
| `taskflow` | Outlines conversational flows as a series of subtasks. |
| `subtask` | Within `<taskflow>`, a specific part of the conversation flow, containing one or more steps. |
| `step` | Within `<subtask>`, an individual step that includes a trigger and an action. |
| `trigger` | Within `<step>`, the condition or user input that initiates a step. |
| `action` | Within `<step>`, the action the agent should take when a step is triggered. |
| `examples` | Contains few-shot examples to guide agent behavior for specific scenarios. |

### Few-shot example components

| Component | Tag / Syntax | Description |
|---|---|---|
| User | `[user]` | Represents the end-user's input or query. |
| Model | `[model]` | Represents the agent's textual response or thought process. |
| Tool Input | `tool_code` | Demonstrates how the agent should structure the input or "call" to an external tool or function (e.g., specific arguments/syntax). |
| Tool Output | `tool_outputs` | Simulates the data returned by the tool, teaching the agent how to interpret and utilize that data in its final response. |

## Notes

- Channel conditions use `{@startChannel_API}` / `{@endChannel_API}` (or `{@startChannelAPI}`), `{@startChannel_GoogleTelephonyPlatform}` / `{@endChannel_GoogleTelephonyPlatform}` and `{@startChannel_WEB_UI}` / `{@endChannel_WEB_UI}` (or `{@startChannelWEB_UI}`); the full list of channel tags (`Twilio`, `Five9`, `AudioCodes`, `GoogleCCaaSVoice`, `GoogleCCaaSChat`, `WhatsApp`, `Instagram`) is on the modular components page.
- Select the correct **Modality** setting in the deployment settings for modality conditions to apply.
- Modular components: dynamic instructions let one instruction set behave like multiple agents per channel, modality or session variable using `if`/`elif`/`else`, filters, `for` loops and macros. Operators `!=`, `<`, `>`, `<=`, `>=`, `in`, `is defined`, filters `| default`, `| length`, `| upper` are described on the modular components page.
- Testing: the simulator trace shows the `_session` variable value. For evaluations of modality- or channel-dependent instructions set the `_session` scenario variable; also set custom variables used in dynamic instructions (for example `brand_name`).
- Editor: references are shown as colored chips; typing `@` opens a context menu (navigate with arrow keys and **Tab**); typing `{` lists available variables. For **Tool**, only tools added to the current agent appear.
- Language: write prompts and instructions in English for the highest quality; agents detect the end-user's language and respond in it unless instructed otherwise (for example "you only speak Italian and no other languages").
- **Restructure instructions** reformats natural language instructions into the recommended XML structure; the source shows a full XML sample for the weather root agent (omitted here). **Refine** improves a selected portion of instructions with AI, using the **Requirements** field.
- Few-shot examples go inline in the instructions. Use them to resolve consistent quality issues, complex formatting and nuanced logic. Use sparingly (too many cause overfitting), keep them descriptive rather than exhaustive, and try clear instructions first.
- Response formatting best practices: chunk text into 1-2 sentence blocks with line breaks between ideas; bold key data points (product names, prices, dates, order numbers, deadlines); convert more than two items or steps into bulleted (`-`) or numbered (`1.`) lists.
- Global instructions are set in the advanced agent application settings, inherited by every agent and sent to the model every turn on top of agent-specific instructions; suited to brand tone, general DOs and DON'Ts, globally shared variables and customer profiles.
- Corrected from the official docs: source inconsistency between two pages. The few-shot example on https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction writes `get_weather(location="London")`, while the weather tool created in the quickstart https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/create-agent is `def get_weather(city: str) -> dict:`, so `location` is not a parameter of that tool; the page uses `city="London"`. The example's simulated `tool_outputs` are kept as written.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [modular-components.md](./modular-components.md)
- [variable.md](./variable.md)
- [agent.md](./agent.md)
