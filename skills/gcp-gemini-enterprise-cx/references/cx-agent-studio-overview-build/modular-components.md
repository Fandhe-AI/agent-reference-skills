---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/modular-components
---

# Modular Components

Modular components adapt one set of agent instructions at runtime with template syntax, based on the active channel (API, telephony, web), modality (voice or text) and session variables. Instructions are compiled and resolved before each model invocation, so the model sees only the rendered instructions for the current turn.

## Signature / Usage

### Modality block tags

```text
{@startModality_Voice}
Speak concisely using natural conversational pacing. Spell out confirmation
codes digit by digit.
{@endModality_Voice}
{@startModality_Text}
Format responses using bulleted lists and markdown links where helpful.
{@endModality_Text}
```

### Channel block tag

```text
{@startChannel_Twilio}
If the caller presses {#}, repeat the main menu options.
{@endChannel_Twilio}
```

### Conditional logic

```text
{% if _session.modality == 'TEXT' %}
Welcome to Customer Support! I am your virtual assistant.
{% else %}
Hi there! Thank you for calling customer support.
{% endif %}

{% if brand_name == 'Cymbal Retail' or brand_name == 'Cymbal Wholesale' %}
You represent Cymbal Support.
{% elif brand_name == 'Acme Corp' %}
You represent Acme Corp Support.
{% else %}
You represent General Customer Support.
{% endif %}
```

### Loops

```text
Product Catalog:
{% for category in catalog.categories %}
### {{ category.name | upper }} ({{ category.products | length }} items)
Available: {% for item in category.products %}{{ item.title }} (${{ item.price
}}){% if not loop.last %}, {% endif %}{% endfor %}
{% endfor %}
```

Session variable `catalog`:

```json
{
  "categories": [
    {
      "name": "Electronics",
      "products": [
        {"title": "Phone", "price": 699.99},
        {"title": "Tablet", "price": 399.99}
      ]
    },
    {
      "name": "Books",
      "products": [
        {"title": "Novel", "price": 19.99}
      ]
    }
  ]
}
```

Rendered instructions:

```text
Product Catalog:
### ELECTRONICS (2 items)
Available: Phone ($699.99), Tablet ($399.99)
### BOOKS (1 items)
Available: Novel ($19.99)
```

### Macros

```text
{% macro format_dest(name, price, climate) %}- **{{ name | upper
}}** (Estimated Cost: **${{ price }}**) - *{{ climate }}* climate{% endmacro %}

Recommended destinations:
{% for dest in catalog.destinations %}
{{ format_dest(dest.name, dest.price, dest.climate) }}
{% endfor %}
```

### Evaluation scenario `_session` variable

```json
{
  "modality": "TEXT",
  "channel": "API"
}
```

## Options / Props

### Variable syntax

| Syntax | Type | Runtime behavior | Best used for |
|---|---|---|---|
| `{{variable_name}}` | Static variable (Substitution) | Replaced directly in the instructions with its value at render time before the model call. If a variable is missing or `null` in the session state, the literal `{{variable_name}}` placeholder is preserved. Supports nested object paths (for example, `{{user.profile.name}}`). | 1:1 text substitutions, configuration values, and prompt fields that don't change on every turn. |
| `{variable_name}` | Dynamic variable (Tracking) | Preserved literally as `{variable_name}` in the instructions. When the variable changes during the conversation, its value is appended to the conversation history as `<state_update>variable_name: value</state_update>`. | Tracking runtime values extracted from the user or returned by tools across turns without invalidating the instruction prefix cache. |
| `{@AGENT: Agent Name}` | Agent reference | Explicitly references a sub-agent in your application. | Directing the agent when to transfer or delegate to another agent. |
| `{@TOOL: tool_name}` | Tool reference | Explicitly references a tool added to the current agent. | Directing the agent when to invoke a specific tool. |

### Modality block tags

| Opening tag | Closing tag | Equivalent condition | Description |
|---|---|---|---|
| `{@startModality_Text}` | `{@endModality_Text}` | `{% if _session.modality == 'TEXT' %}` | Includes the enclosed instructions only during text/chat interactions. |
| `{@startModality_Voice}` | `{@endModality_Voice}` | `{% if _session.modality == 'VOICE' %}` | Includes the enclosed instructions only during voice interactions. |

### Channel block tags

| Opening tag | Closing tag | Target `_session.channel` value | Description |
|---|---|---|---|
| `{@startChannel_API}` | `{@endChannel_API}` | `API` | Applies to API-driven sessions. |
| `{@startChannel_WEB_UI}` | `{@endChannel_WEB_UI}` | `WEB_UI` | Applies to web widget sessions. |
| `{@startChannel_GoogleTelephonyPlatform}` | `{@endChannel_GoogleTelephonyPlatform}` | `GOOGLE_TELEPHONY_PLATFORM` | Applies to Google Telephony Platform voice calls. |
| `{@startChannel_Twilio}` | `{@endChannel_Twilio}` | `TWILIO` | Applies to Twilio telephony sessions. |
| `{@startChannel_Five9}` | `{@endChannel_Five9}` | `FIVE9` | Applies to Five9 telephony sessions. |
| `{@startChannel_AudioCodes}` | `{@endChannel_AudioCodes}` | `CONTACT_CENTER_INTEGRATION` | Applies to AudioCodes telephony integrations. |
| `{@startChannel_GoogleCCaaSVoice}` | `{@endChannel_GoogleCCaaSVoice}` | `CONTACT_CENTER_AS_A_SERVICE` | Applies to Google Cloud CCaaS voice sessions. |
| `{@startChannel_GoogleCCaaSChat}` | `{@endChannel_GoogleCCaaSChat}` | `CONTACT_CENTER_AS_A_SERVICE_CHAT` | Applies to Google Cloud CCaaS chat sessions. |
| `{@startChannel_Whatsapp}` (or `{@startChannel_WhatsApp}`) | `{@endChannel_Whatsapp}` (or `{@endChannel_WhatsApp}`) | `WHATSAPP` | Applies to WhatsApp messaging sessions. |
| `{@startChannel_Instagram}` | `{@endChannel_Instagram}` | `INSTAGRAM` | Applies to Instagram messaging sessions. |

### Supported operators and tests

| Category | Syntax | Description |
|---|---|---|
| **Logical** | `and`, `or`, `not` | Combines or negates boolean expressions. |
| **Equality** | `==`, `!=` | Checks whether two values are equal or not equal. |
| **Relational** | `<`, `>`, `<=`, `>=` | Compares numeric values. Numeric strings (such as `"42"`) are coerced to numbers automatically. Comparisons against `null` or empty strings `""` safely evaluate to `false` without throwing an error. |
| **Membership** | `in` | Checks if an item exists in a list, a key exists in a map/object, or a substring exists in a string (for example, `{% if department in ["security", "audit"] %}`). Combine with `not` (`{% if not (item in list) %}`) to negate. |
| **State tests (`is` / `is not`)** | `is defined`, `is not defined`, `is undefined`, `is not undefined` | Evaluates to `true` if the variable exists and is non-null in the session state (or is missing/`null` for `undefined`). |
| **Null \& boolean tests** | `is none`, `is not none`, `is true`, `is not true`, `is false`, `is not false` | Checks explicitly for `null` (`none`) or boolean `true`/`false`. |
| **Grouping \& literals** | `(...)`, `"string"`, `'string'`, `42`, `3.14`, `true`, `false`, `[1, 2, 3]`, `null` | Groups expressions to control evaluation order and compares against literal values. |

### Filters and built-in functions

| Filter / Function | Description | Example |
|---|---|---|
| `value \| length` or `length(value)` | Returns the number of elements in a list, or the character length of a string (`0` for `null`). | `{% if length(user.recent_orders) >= 3 %}` |
| `value \| upper` | Converts a value to an uppercase string. | `{{ user.loyalty_tier \| upper }}` |
| `value \| default(fallback)`, `value \| default(fallback, true)`, or `default(value, fallback)` | Returns `fallback` when `value` is `null`. When `true` is passed as the optional second positional argument, also returns `fallback` when `value` is empty or falsy (`""`, `0`, `false`, or `[]`). | `{{ user.preferred_name \| default("Valued Customer", true) }}` |

## Notes

- Changing rendered instruction text on every turn (updating `{{variable_name}}` values or switching `{% if %}` branches, especially near the top of the instructions) invalidates prompt prefix caching and can increase model latency. For values that change every turn prefer dynamic `{variable_name}` references or place frequently changing sections lower in the instructions.
- Literal preservation: single-brace JSON objects (for example `{"key": "value"}`) and DTMF pound strings (for example `{#}` or `{#1234#}`) are preserved verbatim; non-variable double-brace spans fall back to literal text without affecting other substitutions.
- Reference variables by identifier inside `{% ... %}` blocks (for example `{% if balance > 100 %}`); do not wrap them in `{var}` or `{{var}}`.
- Turn lifecycle: (1) `before_agent` callback executes and its state changes are visible to the renderer for the current turn; (2) instruction rendering evaluates all `{% if %}`, `{% for %}` and `{{var}}` expressions; (3) `before_model` callback executes, and its state changes are not reflected in the rendered instructions for that model call (only on subsequent turns); (4) model invocation. To control template branching for the current turn (such as `{% if is_vip %}`) update variables in `before_agent_callback`.
- Channel and modality tags only filter the instruction text sent to the model; to restrict which tools are available per modality or channel, perform tool masking in a callback. Match the **Modality** in the deployment settings. The tags translate into checks against the built-in `_session` variable (`_session.modality`, `_session.channel`).
- `{% elif %}` can also be written `{% else if %}`. Operator precedence from highest (1) to lowest (7): primary expressions (parentheses, literals, variable lookups `a.b`, function or macro calls); filters `|`; state tests `is` / `is not`; comparisons and membership; unary `not`; `and`; `or`.
- Inside a `for` loop the built-in `loop.last` boolean is `true` on the final iteration. Macros are defined with `{% macro name(param1, param2) %}...{% endmacro %}` and invoked with `{{ name(arg1, arg2) }}` in the same instruction.
- Error handling: each `{{ ... }}` expression is parsed independently; unsupported syntax or an unknown filter makes only that tag fall back to literal text. Control blocks (`if`/`elif`/`else`/`endif`, `for`/`endfor`, `macro`/`endmacro`) must be balanced and closed; a malformed or unclosed block makes the runtime log a diagnostic with line and column and fall back to basic `{{variable}}` substitution for that render.
- Testing: the simulator trace shows the active `_session` values and custom variables per turn; for evaluations that branch on modality or channel set the `_session` scenario variable. Editor shortcuts: `@` inserts agent and tool references and channel or modality tags; `{` lists variables; only tools added to the current agent appear for **Tool**.
- The source also has advanced examples (access control with `and` / `or` / `not` / `in`, `is defined` checks with fallbacks, and an end-to-end XML travel assistant template); they are omitted here.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/modular-components (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [instruction.md](./instruction.md)
- [variable.md](./variable.md)
- [callback.md](./callback.md)
