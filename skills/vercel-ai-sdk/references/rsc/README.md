# rsc

| Name | Description | Path |
|------|-------------|------|
| createAI | Creates a client-server context provider that wraps parts of the application tree to manage both UI and AI states. Returns an `<AI/>` context provider. | [create-ai.md](./create-ai.md) |
| createStreamableUI | Creates a stream that sends UI from the server to the client. On the client it can be rendered as a normal React node. | [create-streamable-ui.md](./create-streamable-ui.md) |
| createStreamableValue | Creates a stream that sends values from the server to the client. The value can be any serializable data. | [create-streamable-value.md](./create-streamable-value.md) |
| getAIState | Gets the current AI state. | [get-ai-state.md](./get-ai-state.md) |
| getMutableAIState | Gets a mutable copy of the AI state, used to update the state on the server. | [get-mutable-ai-state.md](./get-mutable-ai-state.md) |
| Migrating from RSC to UI | Guide for migrating from AI SDK RSC to AI SDK UI: separate generation (`streamText` in a route handler) from rendering (`useChat` on the client). | [migrating-to-ui.md](./migrating-to-ui.md) |
| AI SDK RSC Overview | AI SDK RSC (`@ai-sdk/rsc`) lets a large language model generate and stream UI from the server to the client using React Server Components and Server Actions. It is currently experimental. | [overview.md](./overview.md) |
| readStreamableValue | Reads, on the client, a streamable value originally created with `createStreamableValue` on the server. Returns an async iterator of the emitted values. | [read-streamable-value.md](./read-streamable-value.md) |
| render (Removed) | `render` was removed in AI SDK 4.0. It was a helper to create a streamable UI from LLM providers; it was deprecated in favor of `streamUI`. | [render.md](./render.md) |
| streamUI | A helper function to create a streamable UI from LLM providers. Similar to AI SDK Core APIs and supports the same model interfaces. | [stream-ui.md](./stream-ui.md) |
| useActions | A hook to access your Server Actions from the client, useful for interfaces requiring user interactions with the server. | [use-actions.md](./use-actions.md) |
| useAIState | A hook to read and update the AI state. The AI state is shared globally between all `useAIState` hooks under the same `<AI/>` provider, and is intended to contain context shared with the model (system messages, function responses, and other relevant data). | [use-ai-state.md](./use-ai-state.md) |
| useStreamableValue | A React hook that takes a streamable value created with `createStreamableValue` and returns the current value, error, and pending state. Useful for consuming streamable values received from a component's props. | [use-streamable-value.md](./use-streamable-value.md) |
| useUIState | A hook to read and update the UI state. The state is client-side and can contain functions, React nodes, and other data. UI state is the visual representation of the AI state. | [use-ui-state.md](./use-ui-state.md) |
