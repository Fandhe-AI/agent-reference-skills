# AI-Assisted Testing

The `winapp ui` commands and the `winui-ui-testing` skill let an AI agent inspect, interact with, and validate a WinUI 3 app's UI, describing what it sees in natural language so you can iterate without writing test harness code first.

## Signature / Usage

```powershell
dotnet run
```

Then ask the agent a natural-language question, for example: "Look at the running app and tell me if the Save button is reachable when the form is empty." The agent uses `winapp ui inspect` and `winapp ui screenshot` to examine the app and respond.

Starter prompt for generating a formal test:

```text
Write an xUnit UI test for my WinUI 3 app that:
1. Launches the app with dotnet run
2. Verifies the main window title is "My App"
3. Clicks the button with AutomationId "SaveButton"
4. Verifies a success message appears
Use the winapp ui commands for element interaction.
```

Set AutomationIds so `winapp ui click` can target elements reliably:

```xml
<Button AutomationProperties.AutomationId="SaveButton"
        Content="Save" />
<TextBox AutomationProperties.AutomationId="TitleInput" />
```

Starter prompt for a first-pass accessibility review:

```text
Run "winapp ui inspect" on the running app and identify any issues:
- Controls without accessible names
- Missing keyboard focus order
- Buttons or links that aren't reachable by Tab
Report findings as a prioritized list, most critical first.
```

CI workflow (GitHub Actions, Windows runner):

Adapted (not in the official docs): `actions/checkout` and `actions/setup-dotnet` are pinned to commit SHAs instead of the mutable `@v4` tags.

```yaml
name: UI tests
on: [push, pull_request]
jobs:
  ui-test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4
      - name: Setup .NET
        uses: actions/setup-dotnet@67a3573c9a986a3f9c594539f4ab511d57bb3ce9 # v4
        with:
          dotnet-version: '9.0.x'
      - name: Install winapp CLI
        run: winget install --id Microsoft.WinAppCli --silent --accept-package-agreements --accept-source-agreements --disable-interactivity
      - name: Build
        run: dotnet build
      - name: Run UI tests
        run: dotnet test --filter Category=UITest
```

## Options / Props

| Command | What it does |
|---------|--------------|
| `winapp ui inspect` | Dumps the accessibility tree of the running app |
| `winapp ui screenshot` | Captures a screenshot of the app window |
| `winapp ui click <selector>` | Clicks a button or selects an item |
| `winapp ui invoke <selector>` | Invokes the default action on a control |
| `winapp ui search <text>` | Searches the element tree by name or AutomationId |
| `winapp ui set-value <selector> <value>` | Sets the value of a TextBox or ComboBox |

## Notes

- The `winui-ui-testing` skill is included in the `winui@awesome-copilot` plugin; if you installed the plugin during the official quickstart setup, no additional install is required. This is a Copilot-plugin skill, unrelated to Claude Code Agent Skills (SKILL.md) in this repository.
- The generated tests use `winapp ui` commands as the interaction layer, so they run without a separate UI automation framework.
- `winapp ui` commands interact with the live accessibility tree of a running process. Tests must launch the app as part of the test setup (or in a `TestInitialize` step) and close it in teardown.
- The CI tests require a graphical session; use a Windows runner with `runs-on: windows-latest`.
- Caveat (from the winapp CLI: UI Automation page, not stated on this official page): `winapp ui click`, `hover`, `drag`, `touch`, `pen`, `scroll --wheel` and `send-keys --via send-input` inject real OS-level input and fail with `no_interactive_desktop` on a locked or non-interactive desktop. A `windows-latest` runner alone does not guarantee an unlocked interactive desktop, so for such commands use a runner configured with an interactive session, and for ordinary CI prefer the UIA-based commands (`invoke`, `wait-for`, `search`, `set-value`, `inspect`).
- Adapted from the official docs: the CI example pins `actions/checkout` and `actions/setup-dotnet` to the commit SHAs of the v4 tags (resolved 2026-11-14) instead of the mutable `@v4` tags.
- The WinGet ID in the official CI example is `Microsoft.WinAppCli`.
- The inspect output works as a first-pass accessibility review before running a formal audit tool.
- Full command reference, selectors, and exit codes are in the winapp CLI: UI Automation page; this page covers only the AI-agent workflow.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ai-assisted/testing (page ms.date 2026-10-02; fetched 2026-11-14).

## Related

- [winapp CLI: UI Automation](./winapp-cli-ui-automation.md)
- [Test Your Windows App Before You Ship](./test-before-you-ship.md)
- [Running Windows App Tests in CI](./ci-testing.md)
- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)
