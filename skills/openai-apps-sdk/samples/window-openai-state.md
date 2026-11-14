# Persisting Widget State with window.openai

Read and persist per-widget UI state (e.g. a selected list item) across renders using `window.openai.widgetState` and `window.openai.setWidgetState`.

```tsx
import { useState } from "react";

export function TaskList({
  tasks,
}: {
  tasks: { id: string; title: string }[];
}) {
  const [state, setState] = useState(
    window.openai?.widgetState ?? { selectedId: null }
  );

  function selectTask(selectedId: string) {
    const nextState = { ...state, selectedId };
    setState(nextState);
    window.openai?.setWidgetState?.(nextState);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            aria-pressed={state.selectedId === task.id}
            onClick={() => selectTask(task.id)}
          >
            {task.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

For images the model should see on later turns, `setWidgetState` takes the structured shape (`modelContent`: text or JSON the model should see; `privateContent`: UI-only state the model should not see; `imageIds`: file IDs the model should receive):

```tsx
const selectedFiles = await window.openai.selectFiles();

window.openai.setWidgetState({
  modelContent: "Review the currently selected images.",
  privateContent: {
    currentView: "image-viewer",
    filters: ["crop", "sharpen"],
  },
  imageIds: selectedFiles.map((file) => file.fileId),
});
```

Subscribe to host-pushed tool results instead of polling:

```tsx
type ToolResult = { structuredContent?: unknown } | null;

export function useToolResult() {
  const [toolResult, setToolResult] = useState<ToolResult>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      const message = event.data;
      if (!message || message.jsonrpc !== "2.0") return;
      if (message.method !== "ui/notifications/tool-result") return;
      setToolResult(message.params ?? null);
    };

    window.addEventListener("message", onMessage, { passive: true });
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return toolResult;
}
```

Feature-detect optional host APIs before calling them:

```js
const openai = typeof window !== "undefined" ? window.openai : undefined;

if (openai?.requestModal) {
  await openai.requestModal({
    template: "ui://widget/details.html",
  });
} else {
  document.body.textContent = "This host does not support modals.";
}
```

## Notes

- `window.openai` is the ChatGPT-specific extension layer; the shared MCP Apps standard (`ui/initialize`, `tools/call` over `postMessage`) is host-agnostic and preferred for portable widgets.
- Widget state belongs to one rendered UI instance; do not use it as the source of truth for business data or as durable storage. `setWidgetState` is synchronous — call it after each meaningful UI-state change; there is nothing to `await`.
- Only include file IDs uploaded with `window.openai.uploadFile`, selected with `window.openai.selectFiles`, received through tool input file parameters, or returned through tool result file references.
- Always feature-detect ChatGPT-only APIs (`requestModal`, `requestCheckout`, etc.) since other MCP Apps hosts won't implement them.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/chatgpt-ui (local .md twin copy, fetched 2026-11-14).
