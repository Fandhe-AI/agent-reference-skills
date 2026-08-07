# Persisting Widget State with window.openai

Read and persist per-widget UI state (e.g. a selected list item) across renders using `window.openai.widgetState` and `window.openai.setWidgetState`.

```tsx
export function TaskList({ tasks }) {
  const [state, setState] = useState(
    window.openai?.widgetState ?? { selectedId: null }
  );

  function selectTask(selectedId) {
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

`setWidgetState` also accepts `modelContent` (text the model can read back) alongside private, UI-only fields:

```tsx
window.openai.setWidgetState({
  modelContent: "Review the currently selected images.",
  privateContent: {
    currentView: "image-viewer",
    filters: ["crop", "sharpen"],
  },
  imageIds: ["file_123", "file_456"],
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
    /* ... */
  });
} else {
  // Fallback behavior for hosts without this extension.
}
```

## Notes

- `window.openai` is the ChatGPT-specific extension layer; the shared MCP Apps standard (`ui/initialize`, `tools/call` over `postMessage`) is host-agnostic and preferred for portable widgets.
- `widgetState` persists across turns for the same widget instance; keep it small and JSON-serializable.
- Always feature-detect ChatGPT-only APIs (`requestModal`, `requestCheckout`, etc.) since other MCP Apps hosts won't implement them.
- This is the ChatGPT-app (server/publisher) side of MCP; consuming MCP servers from the Agents SDK is covered by the `openai-agents` skill.

Source: https://developers.openai.com/plugins/build/chatgpt-ui
