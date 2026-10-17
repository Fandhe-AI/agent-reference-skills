---
source: https://ai.google.dev/gemini-api/docs/computer-use
---

# Computer use

Preview. The Computer Use tool lets you build browser, mobile, and desktop control agents: from screenshots the model "sees" the screen and "acts" by generating UI actions (clicks, keystrokes). Like function calling, you implement the client-side execution environment that receives and executes the actions.

## Signature / Usage

Minimal request enabling `computer_use` for a browser environment:

```python
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Search for 'Gemini API' on Google.",
    tools=[{"type": "computer_use", "environment": "browser"}]
)

print(interaction)
```

```javascript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

const interaction = await ai.interactions.create({
  model: 'gemini-3.8-flash',
  input: "Search for 'Gemini API' on Google.",
  tools: [{ type: "computer_use", environment: "browser" }]
});

console.log(interaction);
```

```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Find me a flight from SF to Hawaii on Jun 30th, coming back on Jul 6th. Start by navigating directly to flights.google.com",
    "tools": [
      {
        "type": "computer_use",
        "environment": "browser",
        "enable_prompt_injection_detection": true
      }
    ]
  }'
```

Model response (a suggested UI action with normalized coordinates and an `intent`):

```json
{
  "steps": [
    {
      "type": "function_call",
      "name": "click",
      "arguments": {
        "x": 450,
        "y": 120,
        "intent": "Click the search box to type the destination."
      }
    }
  ]
}
```

Execute actions: scale the normalized 1000x1000 coordinates to the viewport.

```python
def denormalize_x(x: int, screen_width: int) -> int:
    """Convert normalized x coordinate (0-1000) to actual pixel coordinate."""
    return int(x / 1000 * screen_width)

def denormalize_y(y: int, screen_height: int) -> int:
    """Convert normalized y coordinate (0-1000) to actual pixel coordinate."""
    return int(y / 1000 * screen_height)
```

Capture new state and send it back as `function_result` (one per executed action):

```python
import json
import base64

def get_function_responses(page, results):
    screenshot_bytes = page.screenshot(type="png")
    current_url = page.url
    function_responses = []
    for name, call_id, result in results:
        function_responses.append({
            "type": "function_result",
            "name": name,
            "call_id": call_id,
            "result": [
                {
                    "type": "text",
                    "text": json.dumps({"url": current_url, **result})
                },
                {
                    "type": "image",
                    "data": base64.b64encode(screenshot_bytes).decode("utf-8"),
                    "mime_type": "image/png"
                }
            ]
        })
    return function_responses
```

Execute function calls (abridged: only `click` and `navigate` shown; the `safety_decision` check is verbatim from the source's safety section):

```python
def get_safety_confirmation(safety_decision):
    # Prompt user for confirmation
    print(f"Safety confirmation required: {safety_decision.get('explanation', '')}")
    return "CONTINUE" # Or TERMINATE

def execute_function_calls(interaction, page, screen_width, screen_height):
    results = []
    function_calls = [
        step for step in interaction.steps if step.type == "function_call"
    ]

    for function_call in function_calls:
        action_result = {}
        fname = function_call.name
        args = function_call.arguments
        print(f"  -> Executing: {fname} (Intent: {args.get('intent', 'N/A')})")

        # Inside execute_function_calls, check for safety_decision:
        if 'safety_decision' in function_call.arguments:
            decision = get_safety_confirmation(function_call.arguments['safety_decision'])
            if decision == "TERMINATE":
                break
            # Include safety_acknowledgement inside the action result
            action_result["safety_acknowledgement"] = True

        try:
            if fname == "click":
                actual_x = denormalize_x(args["x"], screen_width)
                actual_y = denormalize_y(args["y"], screen_height)
                page.mouse.click(actual_x, actual_y)
            elif fname == "navigate":
                page.goto(args["url"])
            else:
                print(f"Warning: Custom or unhandled function {fname}")

            page.wait_for_load_state(timeout=5000)
            time.sleep(1)

        except Exception as e:
            print(f"Error executing {fname}: {e}")
            action_result = {"error": str(e)}

        results.append((fname, function_call.id, action_result))

    return results
```

Agent loop (continue with `previous_interaction_id`):

```python
interaction = client.interactions.create(
    model='gemini-3.8-flash',
    input=[
        {"type": "text", "text": USER_PROMPT},
        {"type": "image", "data": base64.b64encode(initial_screenshot).decode("utf-8"), "mime_type": "image/png"}
    ],
    tools=[{
        "type": "computer_use",
        "environment": "browser",
        "enable_prompt_injection_detection": True
    }]
)

turn_limit = 5
for i in range(turn_limit):
    has_function_calls = any(
        step.type == "function_call"
        for step in interaction.steps
    )
    if not has_function_calls:
        break

    results = execute_function_calls(interaction, page, SCREEN_WIDTH, SCREEN_HEIGHT)
    function_responses = get_function_responses(page, results)

    interaction = client.interactions.create(
        model='gemini-3.8-flash',
        previous_interaction_id=interaction.id,
        input=function_responses,
        tools=[{
            "type": "computer_use",
            "environment": "browser",
            "enable_prompt_injection_detection": True
        }]
    )
```

Custom user-defined functions alongside Computer Use (exclude predefined actions):

```python
yield_to_user_tool = {
    "type": "function",
    "name": "yield_to_user",
    "description": "Yields control back to the user for assistance or verification when an automated action is unsafe or ambiguous.",
    "parameters": {
        "type": "object",
        "properties": {
            "reason": {
                "type": "string",
                "description": "The reason why the agent is yielding control to the human."
            }
        },
        "required": ["reason"]
    }
}

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Click the submit button. If you need a second factor authentication code, ask me.",
    tools=[
        {
            "type": "computer_use",
            "environment": "mobile",
            "excluded_predefined_functions": ["click"]
        },
        yield_to_user_tool
    ]
)
```

## Options / Props

`computer_use` tool fields (from the examples):

| Name | Type | Description |
|------|------|-------------|
| `type` | string | `"computer_use"` |
| `environment` | string | `"browser"`, `"mobile"`, `"desktop"` (documented as `ENVIRONMENT_BROWSER`, `ENVIRONMENT_MOBILE`, `ENVIRONMENT_DESKTOP`) |
| `enable_prompt_injection_detection` | boolean | Opt-in screenshot scanning for hidden adversarial instructions; default `false`; Gemini 3.5 Flash-Lite or later |
| `excluded_predefined_functions` | array | Predefined actions to exclude (e.g. `["click"]`) so you can register custom actions |
| `disabled_safety_policies` | array | Override select safety policies (e.g. `["data_modification"]`) |

Browser environment actions (arguments in the function call; coordinates `x` / `y` are int 0-999; every action also takes `intent`: str):

| Command name | Description | Arguments |
|---|---|---|
| click | Left clicks at the coordinate | `y`, `x` |
| double_click | Double clicks at the coordinate | `y`, `x` |
| triple_click | Triple clicks at the coordinate | `y`, `x` |
| middle_click | Middle clicks at the coordinate | `y`, `x` |
| right_click | Right clicks at the coordinate | `y`, `x` |
| mouse_down | Presses and holds the mouse button at the coordinate | `y`, `x` |
| mouse_up | Releases the mouse button at the coordinate | `y`, `x` |
| move | Moves the cursor to the specified position | `y`, `x` |
| type | Types text | `text`: str, `press_enter`: bool (Optional, default `false`) |
| drag_and_drop | Drags an item from the start coordinate to the end coordinate | `start_y`, `start_x`, `end_y`, `end_x` |
| wait | Pauses execution for a specified number of seconds | `seconds`: int (Optional, default `1`) |
| press_key | Presses the specified key and releases it | `key`: str |
| key_down | Presses and holds the specified key | `key`: str |
| key_up | Releases the specified key | `key`: str |
| hotkey | Presses the specified key combination | `keys`: `List[str]` |
| take_screenshot | Returns a screenshot of the current screen | none besides `intent` |
| scroll | Scrolls up, down, left, or right at a coordinate by a pixel distance | `y`, `x`, `direction`: str (`"up"`, `"down"`, `"left"`, `"right"`), `magnitude_in_pixels`: int (0-999, Optional, default `300`) |
| go_back | Navigates back to the previous webpage | none besides `intent` |
| navigate | Navigates directly to a specified URL | `url`: str |
| go_forward | Navigates forward to the next webpage | none besides `intent` |

Mobile environment (Android-optimized): `open_app` (`app_name`), `click`, `list_apps`, `wait`, `go_back`, `type`, `drag_and_drop`, `long_press` (`y`, `x`, `seconds` Optional default `2`), `press_key`, `take_screenshot`.

Desktop environment (OS-level cursor commands): `click`, `double_click`, `triple_click`, `middle_click`, `right_click`, `mouse_down`, `mouse_up`, `move`, `type`, `drag_and_drop`, `wait`, `press_key`, `key_down`, `key_up`, `hotkey`, `take_screenshot`, `scroll` (same arguments as the browser table).

Safety policy categories (Gemini 3.x):

| Safety policy category | Description |
|---|---|
| `FINANCIAL_TRANSACTIONS` | Blocks or triggers confirmation for actions involving payments, retail checkout, or regulated goods |
| `SENSITIVE_DATA_MODIFICATION` | Protects health, financial, or government records from unauthorized modification |
| `COMMUNICATION_TOOL` | Restricts the agent from autonomously sending emails, chat messages, or drafts |
| `ACCOUNT_CREATION` | Restricts the agent from autonomously registering new accounts on websites |
| `DATA_MODIFICATION` | Regulates overall file system modifications, data sharing, and storage deletion |
| `USER_CONSENT_MANAGEMENT` | Requires user takeover for cookie consent banners and privacy prompts |
| `LEGAL_TERMS_AND_AGREEMENTS` | Prevents the model from autonomously accepting Terms of Service or legally binding contracts |

Model versions: Gemini 3.8 Flash (`gemini-3.8-flash`, recommended), Gemini 3.5 Flash-Lite (`gemini-3.5-flash-lite`), Gemini 3 Flash Preview (`gemini-3-flash-preview`).

## Notes

- Preview capability; may contain errors and security vulnerabilities. Supervise closely, and avoid it for critical decisions, sensitive data, or actions where serious errors cannot be corrected.
- Loop: (1) send request with the tool, config, prompt, and a screenshot; (2) receive a `function_call` UI action (Gemini 3.x also returns an `intent`, and possibly a `safety_decision`: regular/allowed, `require_confirmation`, or blocked); (3) execute client-side (scale normalized coordinates); (4) capture a new screenshot and send it in a `function_result`. If multiple parallel actions ran, send a `function_result` for each. Append model responses and your function responses to history at every step.
- No display size is needed in the request; the model predicts coordinates scaled to the screen. The example uses `google-genai` Python SDK version `2.7.0` or higher.
- Run the agent in a sandboxed VM or container. The reference implementation `https://github.com/google/computer-use-preview` includes a Docker-based sandbox. The examples use Playwright (`pip install google-genai playwright`, `playwright install chromium`).
- Safety decisions: when `safety_decision` is `require_confirmation`, prompt the end user and, if confirmed, set `safety_acknowledgement` in the `function_result`. Overrides express a preference only; the model may still return `require_confirmation`, so always implement safety decision handling.
- Prompt injection detection blocks execution when a screenshot contains hidden adversarial instructions.
- Safety best practices: human-in-the-loop confirmation, custom safety system instructions, allowlists/blocklists of sites, logging prompts/screenshots/actions/safety responses, consistent clean GUI environment. Thinking levels can be configured to balance quality and speed; lower levels generally suit standard automation.
- Computer Use is a client-side tool; in tool combination it uses `function_call` and `function_result` steps for context circulation.
- The tool-combination source table says `function_response`; the schema and this page's examples use `function_result`.
- `execute_function_calls` is abridged from the source (only click/navigate shown); the `safety_decision` check is verbatim. The source example excludes the predefined `click` on purpose while its prompt says "Click the submit button"; the model must use another action or call `yield_to_user`.
- Distinct from `anthropic-api-tools-mcp` (Claude computer use tool) and `openai-agents` (OpenAI computer use); this is Gemini's `computer_use` tool. Playwright itself is covered by the `playwright` skill.
- API surface: Interactions API, v1beta only per the api-versions table; a generateContent version is under `generate-content/` (grounding-tools). Docs fetched 2026-10-16.

## Related

- [tools-overview](./tools-overview.md)
- [function-calling](./function-calling.md)
- [tool-combination](./tool-combination.md)
