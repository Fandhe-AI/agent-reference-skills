# Control

| Name | Description | Path |
|------|-------------|------|
| Modifying system prompts | Choose between the `claude_code` preset and a custom system prompt, and customize agent behavior with CLAUDE.md, output styles, `append`, or a fully custom prompt string. | [modifying-system-prompts.md](./modifying-system-prompts.md) |
| Configure permissions | Control how Claude uses tools with permission modes, hooks, and declarative allow/deny rules; the `canUseTool` callback handles everything else at runtime. | [permissions.md](./permissions.md) |
| Handle approvals and user input | Surface Claude's tool-approval requests and clarifying questions (`AskUserQuestion`) to users via the `canUseTool` callback, then return their decisions to the SDK. | [user-input.md](./user-input.md) |
