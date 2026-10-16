---
source: https://docs.flutter.dev/ai/genui
---

# GenUI SDK for Flutter

The GenUI SDK for Flutter is an orchestration layer: a suite of packages that coordinates information flow between the user, Flutter widgets, and an AI agent, turning text conversations into interactive experiences.

## Signature / Usage

The SDK uses a JSON-based format to compose a UI from an existing widget catalog. As the user interacts with the UI, state changes are fed back to the agent, creating a high-bandwidth loop.

```console
$ dart pub add genui
```

Use cases from the source:

- Instead of describing a list of products in text, render a clickable carousel of product widgets.
- When a user asks to plan a trip, generate a complete form with sliders, date pickers, and text fields.

## Notes

- Experimental: the `genui` package is in alpha and is likely to change.
- The page links the "Getting started with GenUI" and "Flutter + A2UI = GenUI" (Google I/O 2026) videos.
- Distinction: GenUI renders agent-generated Flutter widgets from a catalog (Dart, `package:genui`). It is not an agent framework like openai-agents, the Apps SDK of openai-apps-sdk, or MCP of anthropic-api-tools-mcp.

## Related

- [GenUI SDK main components and concepts](./genui-components.md)
- [Get started with the GenUI SDK for Flutter](./genui-get-started.md)
- [Input and events](./genui-input-events.md)
