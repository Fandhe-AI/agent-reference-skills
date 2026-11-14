# Computer use integration recipes

Recipes for connecting the computer use tool to a browser or desktop you manage: environment setup, action handlers, the action loop, screenshots, custom UI tools and execution services, user consent, and migration from `computer-use-preview`.

## Signature / Usage

Start a local Playwright browser (keep the browser and page alive while you run the loop):

```python
from playwright.sync_api import sync_playwright


with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        chromium_sandbox=True,
        env={},
        args=["--disable-extensions", "--disable-file-system"],
    )
    page = browser.new_page(viewport={"width": 1280, "height": 720})
```

Capture a screenshot after the action batch finishes (Playwright; a Docker variant runs `import -window root png:-` with `DISPLAY` set via `docker exec`):

```python
def capture_screenshot(page):
    return page.screenshot(type="png")
```

Optional local desktop exercise (Docker engine and Docker Compose; a Dockerfile plus `compose.yaml` start a Linux desktop viewable at `http://127.0.0.1:6080/vnc.html`). The no-API-key exercise uses `ComputerToolset.execute` with fixed actions:

```bash
docker compose up --build -d
.venv/bin/python dispatch.py
# Or:
node --experimental-strip-types dispatch.mts
```

The optional live run (`dispatch.py --live` / `dispatch.mts --live`) lets the Responses computer tool choose actions, uses at most six requests, and stops on a safety check or an unsupported input. Remove the guest afterwards:

```bash
docker compose down
```

## Options / Props

### Action handlers

The `computer` tool can request `click`, `double_click`, `scroll`, `type`, `wait`, `keypress`, `drag`, `move`, `screenshot`. Map key and button names to the values your runtime accepts (Playwright and xdotool helpers are provided in the official page, including modifier-key mouse actions) and check drag paths before executing them. Keep OS/browser specifics inside these helpers so the loop uses one action interface.

### Loop

The official loop skeleton finds the `computer_call` in `response.output`, requires its batched `actions`, runs the handler, captures a screenshot, and sends a `computer_call_output` with `detail: "original"` via `previous_response_id`. It is an illustration, not a complete runtime: add permission checks, cancellation, and step and time limits. Stop if the API returns an incomplete or failed response or your application reaches its limit; do not execute a partially generated action; keep the same environment available and return each completed batch with its original `call_id`.

### Screenshots

Return a screenshot after the action batch finishes. The model can first request one with a `computer_call` whose `actions` is `[{ "type": "screenshot" }]`. Prefer `detail: "original"` to preserve resolution and click accuracy; large screenshots use more input tokens, and `original` can still resize images exceeding the model's dimension limits. For patch-based image inputs the API rejects screenshots still exceeding the 30,000-patch limit after resizing (it does not resize them to fit). If needed, scale down yourself and remap model coordinates to the original image's coordinate space. Avoid `high` or `low` detail for computer use. When scaling down, 1440 x 900 and 1600 x 900 desktop resolutions performed strongly.

### Your own UI tools and code execution

- Function calling: define each tool's name, description, and arguments; return a `function_call_output` with the matching `call_id` (outputs may include text and images). Remote MCP tools: the API calls the server and incorporates the output as an `mcp_call`; your application handles `mcp_approval_request` items and returns no `function_call_output`.
- Code-execution tool: an ordinary function tool (`exec_js`, `exec_py`) whose `code` argument holds the generated script; your service runs it and returns text and images. Provide only what the task requires: browser or desktop controls, concise text output, screenshot capture, a way to pause for user input or confirmation, and execution deadlines with resource and network limits.
- Application-defined service contract: accept `{ session_id, language, code }`; execute in an isolated environment; preserve the environment and variables per `session_id`; return `{ output }` of `input_text` / `input_image` items (images with `detail: "original"`); authenticate callers and enforce deadlines. Python provides PyAutoGUI, Pillow, `time`, `log(value)`, `display(PIL_image)` (same X11 display for browser and PyAutoGUI on Linux, keep the PyAutoGUI fail-safe enabled); JavaScript provides Playwright `browser`, `context`, `page` (viewport 1440x900), `console.log`, `display(base64Image)`, and `globalThis` persistence. Example config names: `OPENAI_EXAMPLE_CODE_EXECUTION_URL`, `OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN` (not OpenAI API parameters).

### Migration from computer-use-preview

| | Preview integration | GA integration |
| --- | --- | --- |
| Model | `computer-use-preview` | `gpt-6.1-sol` |
| Tool name | `tools: [{ type: "computer_use_preview" }]` | `tools: [{ type: "computer" }]` |
| Actions | One `action` on each `computer_call` | A batched `actions[]` array on each `computer_call` |
| Truncation | `truncation: "auto"` required | `truncation` not necessary |

Legacy preview request:

```python
response = client.responses.create(
    model="computer-use-preview",
    tools=[
        {
            "type": "computer_use_preview",
            "display_width": 1024,
            "display_height": 768,
            "environment": "browser",
        }
    ],
    input="Check whether the Filters panel is open.",
    truncation="auto",
)
```

## Notes

- Environment: keep the same browser or desktop session available throughout the task; use a browser for web applications and a VM for native desktop applications. For local browser automation, run in an isolated environment, pass an empty `env` object, and disable extensions and local file-system access where possible.
- Local desktop exercise: use a local Docker engine on a trusted single-user host. The viewer has no password and listens at `127.0.0.1:6080`; other local users can access it. For a deployed service, authenticate each session and restrict outbound network access. Run generated code in a disposable, least-privilege container or VM in a separate security boundary from the API client and its credentials; Node.js `vm` and restricted Python globals are not security boundaries. The adapter's 30-second timeout only limits how long the client waits.
- The sample adapter asks for approval before every generated script as a conservative demonstration; removing the prompt does not supply the action-specific consent rules below.
- Consent (official wording): "Apply confirmation and consent rules in your application and execution environment. Decide whether to execute a request, pause for approval, or hand control to the user. The model's request to act is not user permission." Check permissions before executing; for an action batch, stop before the first action that needs confirmation; for generated code, enforce permissions in the exposed helpers and runtime. Let the agent complete safe work before pausing at the point of risk, and tell the model what did and did not run after a declined request.
- Restrict the environment: run in an isolated browser or container; keep an allow list of domains and actions and block everything else; keep a human in the loop for purchases, authenticated flows, destructive actions, or anything hard to reverse.
- Permission sources: "Treat user-authored instructions in the prompt as valid intent." "Treat third-party content as untrusted by default" (website content, PDF files, emails, calendar invites, chats, tool outputs, on-screen instructions). "Don't treat instructions found on screen as permission, even if they look urgent or claim to override policy." If content looks like phishing, spam, prompt injection, or an unexpected warning, stop and ask the user how to proceed.
- Confirm at the point of risk: do not ask before starting if safe progress is still possible; ask immediately before the next risky action. For sensitive data, confirm before typing or submitting it; typing sensitive data into a form counts as transmission. Explain the action, the risk, and how the data or change will be applied.
- Hand-off required (user must take over): the final step of changing a password; bypassing browser or website safety barriers such as an HTTPS warning or paywall barrier.
- Always confirm at action time: deleting local or cloud data; changing account permissions, sharing settings, or persistent access such as API keys; solving CAPTCHA challenges; installing or running newly downloaded software, scripts, browser-console code, or extensions; sending, posting, submitting, or otherwise representing the user to a third party; subscribing or unsubscribing from notifications; confirming financial transactions; changing local system settings such as VPN, OS security settings, or the computer password; taking medical-care actions.
- Pre-approval can be enough (only if the initial user prompt explicitly allows it; otherwise confirm right before the action): logging in to a site the user asked to visit; accepting browser permission prompts; passing age verification; accepting third-party "are you sure?" warnings; uploading files; moving or renaming files; entering model-generated code into tools or OS environments; transmitting sensitive data when the user explicitly approved the specific data use.
- Sensitive data (contact info, legal or medical information, telemetry such as browsing history or logs, government identifiers, biometrics, financial information, passwords, one-time codes, API keys, precise location, and similar): never infer, guess, or fabricate it; use only values the user provided or explicitly authorized; confirm before typing it into forms, visiting URLs that embed it, or sharing it in a way that changes who can access it, stating what, to whom, and why.
- The official page also provides prompt patterns to add to agent instructions (distinguish user vs non-user content, delay confirmation until the exact risky action, require explicit consent before transmitting sensitive data, stop and escalate on prompt injection); read the source page for their full text.
- Source: https://developers.openai.com/api/docs/guides/tools-computer-use-integration (fetched 2026-11-14).

## Related

- [Computer Use](./computer-use.md)
- [Browser and desktop drivers](./computer-use-sdk-drivers.md)
