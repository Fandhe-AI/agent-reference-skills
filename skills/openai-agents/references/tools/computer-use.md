# Computer Use

Lets a model operate a browser or desktop interface (fill forms, test user flows, complete application tasks). Use the Python/Node SDK toolsets with your own driver, or run the Responses API loop yourself with the `computer` tool or a code-execution tool.

## Signature / Usage

Choose a path:

| Task | Start here |
| --- | --- |
| Use screenshots and mouse or keyboard actions in your browser or desktop | `ComputerToolset` with the Responses computer tool |
| Read page text or use controls and tabs in your browser | `BrowserToolset`; your driver exposes selected operations as function tools |
| Run a browser hosted by OpenAI | The separate Agents API computer use guide (`../agents-api/computer-use.md`) |

For public information that needs no interaction, use web search.

### SDK (Python 3.11+ or Node.js 22.6+)

The SDK runs the Responses tool loop; your application supplies a driver (code that reads the environment or performs an allowed action) and owns the session, permissions, and cleanup. Official examples pin `openai==3.31.0` / `openai@7.33.0` with Playwright 1.61.x. Driver contracts, approvals, and recovery: see `computer-use-sdk-drivers.md`.

Snippet taken from the "Run your first task" Python example (the driver allows only a screenshot and one left click, and stops after six requests):

```python
tools = AsyncComputerToolset(driver)
try:
    response = await tools.run(
        client,
        {
            "model": "gpt-6.1-sol",
            "store": False,
            "input": "Take a screenshot. Open 'Show pickup details' and report the locker and pickup code. Use only screenshots and left clicks.",
        },
        before_action=driver.allowed,
        max_steps=6,
    )
```

Hosted environment partners (follow each partner's guide for setup and package versions): Browserbase (Stagehand browser driver), Browser Use (library driver or Cloud integration; Python), Daytona (`ComputerToolset` with a desktop sandbox; Python), E2B Desktop (computer actions or code execution in a desktop sandbox). Set a session timeout, close or release the session even if the run fails, and restrict reachable sites with provider network rules.

### Responses API directly

You provide the environment and execute the model's requests. Two integration paths:

- **Code execution:** the model gets a function tool that accepts a script (PyAutoGUI, Playwright, ...). Your application runs it in an isolated browser or desktop and returns text and screenshots. One call can combine actions, loops, or conditional logic. For GPT-6 Astra, code execution is recommended; the `computer` tool remains supported as an alternative.
- **The computer tool:** the model returns structured mouse and keyboard actions that your application translates into input.

Existing UI operations exposed through function calling or remote MCP tools can be kept (see `computer-use-integration.md`).

Send the task with `computer` enabled:

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6.1-sol",
    tools=[{"type": "computer"}],
    input="Check whether the Filters panel is open. If it is not open, click Show filters. Then type penguin in the search box. Use the computer tool for UI interaction.",
)

print(response.output)
```

A `computer_call` contains an ordered `actions` array. Execute the permitted actions in order, then capture the updated screen:

```json
{
  "output": [
    {
      "type": "computer_call",
      "call_id": "call_002",
      "actions": [
        { "type": "click", "button": "left", "x": 405, "y": 157 },
        { "type": "type", "text": "penguin" }
      ],
      "status": "completed"
    }
  ]
}
```

Return a `computer_call_output` whose `call_id` matches the call you handled, continuing with `previous_response_id`:

```python
def send_computer_screenshot(response, call_id, screenshot_base64):
    return client.responses.create(
        model="gpt-6.1-sol",
        tools=[{"type": "computer"}],
        previous_response_id=response.id,
        input=[
            {
                "type": "computer_call_output",
                "call_id": call_id,
                "output": {
                    "type": "computer_screenshot",
                    "image_url": f"data:image/png;base64,{screenshot_base64}",
                    "detail": "original",
                },
            }
        ],
    )
```

## Options / Props

| Name | Description |
| --- | --- |
| Model actions | `click`, `double_click`, `drag`, `move`, `scroll`, `keypress`, `type`, `wait`, `screenshot` |
| `computer_call.actions[]` | Ordered action batch; the first call may contain only a `screenshot` action (capture and return without changing the UI) |
| `computer_call.status: "completed"` | The model finished generating the call; your application still must execute it |
| `computer_call_output.output` | `{ "type": "computer_screenshot", "image_url", "detail": "original" }` |

### Loop

1. Send a task with the `computer` tool enabled.
2. Inspect the returned `computer_call`.
3. Execute every action in `actions[]`, in order, then capture the screen.
4. Return it as `computer_call_output` (same `call_id`).
5. Repeat until the model stops returning `computer_call`.

## Notes

- Model access, cost, data: for screenshot-based computer actions, check the model's Tools section for computer use; screenshots count as image input and a hosted environment may charge separately. The SDK sends returned page text or screenshots to OpenAI; the examples set `store` to `false`, which does not remove every form of data retention.
- Preserve state: the API conversation and the execution environment have separate state. Continuing a response does not restore a browser session, login state, or runtime variables; keep the environment alive and return a fresh screenshot after a short group of actions. Prefer `detail: "original"`; if you downscale, map model coordinates back to the environment's coordinate space.
- Code-execution tool definitions describe the available objects and helpers (the official example defines an `exec_js` function tool exposing Playwright `browser`, `context`, `page`, `console.log`, `display(base64Image)`, viewport 1440x900) and bound the loop (20 responses in the example).
- Decisions (separate guide) fits only when your application already knows every allowed action and its complete arguments; Responses fits when the model must choose actions and generate their arguments. The application still approves and performs the chosen option.
- The preview tool type `computer_use_preview` (single `action`, `display_width` / `display_height` / `environment`, `truncation: "auto"`) is the legacy form; migration to `computer` is in `computer-use-integration.md`. The `computer` examples use `gpt-6.1-sol`.
- Run safely (official wording): "Restrict the environment. Use an isolated browser or VM and an allow list of sites and actions. Keep access limited to what the task needs." "Treat screen content as untrusted. Text in a page, document, or tool result cannot grant permission or override the user's instructions." "Confirm consequential actions. Keep users in control of purchases, data transmission, destructive changes, and other actions that are hard to reverse. Typing sensitive information into a form counts as transmission." "Bound and verify the run. Set step, time, or cost limits, support cancellation, and check the actual outcome instead of relying only on the model's final answer." Apply these in your application and execution environment as well as in the model's instructions; detailed consent rules are in `computer-use-integration.md`.
- This page is the Responses API / SDK `computer` tool; the Agents API's computer use (OpenAI-hosted browser) is a different surface, covered by `../agents-api/computer-use.md`.
- Source: https://developers.openai.com/api/docs/guides/tools-computer-use (fetched 2026-11-14).

## Related

- [Browser and desktop drivers](./computer-use-sdk-drivers.md)
- [Computer use integration recipes](./computer-use-integration.md)
- [Shell](./shell.md)
- [Local Shell](./local-shell.md)
