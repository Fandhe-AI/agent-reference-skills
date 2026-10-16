# Channels

| Name | Description | Path |
| --- | --- | --- |
| Channels reference | Build an MCP server that pushes webhooks, alerts, and chat messages into a Claude Code session. Covers the channel contract: capability declaration, notification format, reply tools, sender gating, and permission relay. To use an existing channel instead, see `channels.md`. | [channels-reference.md](./channels-reference.md) |
| Push events into a running session with channels | Use channels to push messages, alerts, and webhooks into a running Claude Code session from an MCP server. Forward CI results, chat messages, and monitoring events so Claude can react while you're away. Research preview: requires Anthropic authentication (claude.ai or Console API key), not available on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, and Team/Enterprise orgs must explicitly enable it. | [channels.md](./channels.md) |
