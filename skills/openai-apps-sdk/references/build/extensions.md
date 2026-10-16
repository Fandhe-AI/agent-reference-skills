# Plugin Extensions

OpenAI MCP Extensions let plugins hook into key surfaces of the ChatGPT user experience, including the sidebar, composer, and file viewers. Declaring support for an extension takes a few lines of SDK code, passed as `_meta` when registering an MCP App tool.

## Signature / Usage

Sidebar app entrypoint (use `{ type: "thread" }` for a conversation side panel):

```ts
const toolMetadata = {
  ui: { resourceUri: "ui://parts/library" },
  "openai/ui": {
    entrypoints: [{ type: "global" }],
  } satisfies OpenAIUiToolMetadata,
};
```

File viewer / editor entrypoint:

```ts
const toolMetadata = {
  ui: { resourceUri: "ui://parts/viewer" },
  "openai/ui": {
    entrypoints: [{ type: "file", extensions: ["stl"] }],
  } satisfies OpenAIUiToolMetadata,
};
```

Extended form schema (passed as `requestedSchema` in the form request):

```ts
function partSelectionSchema(parts: OpenAIFormOption[]): OpenAIForm {
  return {
    type: "object",
    properties: {
      part: {
        type: "string",
        title: "Part",
        oneOf: parts,
      },
    },
    required: ["part"],
  };
}
```

## Options / Props

| Extension | What users can do |
| --- | --- |
| Sidebar apps | Open your app from the sidebar and work in it fullscreen. |
| Conversation panels | Open your app beside a conversation. |
| Plugin settings | Configure product-specific settings from within ChatGPT. |
| File viewers and editors | Open supported files in your own interface, with reading, live updates, and saving. |
| Display modes | Choose where and how your app appears in ChatGPT conversations. |
| Deep links | Go directly to a specific page or item within your sidebar app. |
| Extended model context | Control annotations and how attached context appears in the composer. |
| Extended message sending | Send messages to the current conversation, or a new one on desktop and Work on the web. |
| Composer mentions | Find and select content from your plugin in the ChatGPT desktop composer. |
| Extended forms | Ask for structured input or let users choose from images, then return the response to your tool. |
| Plugin onboarding | Guide users through setup in a new or existing conversation. |

Spec anchors (in `openai/mcp-extensions` `docs/spec.md`): `#global-entrypoint`, `#thread-entrypoint`, `#structured-settings`, `#file-extension-entrypoint`, `#display-modes`, `#deep-links`, `#uiupdate-model-context-extensions`, `#prompt-target-and-send-behavior`, `#composer-at-mentions`, `#openai-form-elicitation`.

## Notes

- Plugin extensions on the web are coming soon to ChatGPT Free and Go users. Existing plugin functionality is unaffected. Composer mentions are available only in the ChatGPT desktop app.
- File entrypoints: the app receives a resource URI for the opened file; follow the file handler guide in the TypeScript SDK README to read it with the app SDK.
- Extended form options each use `const` and `title`, with an optional `x-openai-thumbnail` icon. OpenAI-registered MCP servers require multi-round-trip requests (MRTR, MCP spec 2026-07-28).
- Resources: GitHub `openai/mcp-extensions` (TypeScript SDK, Python SDK for server-side extensions, protocol specification `docs/spec.md`). Sample plugin: Bits & Bolts. Examples in the wild: Canva (sidebar tabs), Figma (composer mentions), Adobe (file extension handlers).
- Onboarding extension is documented in the package-plugin page (add an onboarding skill).
- Once the server is ready, connect and test the plugin, then package it for distribution.

## Related

- [MCP server](./mcp-server.md)
- [Package your plugin](./package-plugin.md)
- [ChatGPT UI](./chatgpt-ui.md)
- [MCP Events](./mcp-events.md)
