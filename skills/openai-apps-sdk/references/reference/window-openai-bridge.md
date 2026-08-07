# `window.openai` component bridge

ChatGPT provides `window.openai` for compatibility aliases and optional ChatGPT extensions. New UI should use the MCP Apps bridge whenever the shared specification provides an equivalent, then use `window.openai` only for ChatGPT-specific capabilities.

If your tool requires confirmation, treat missing initial `toolInput` as expected. ChatGPT does not load approval-gated arguments into widget values before approval; instead, the host delivers them through `ui/notifications/tool-input` once the user approves the call.

## Signature / Usage

```ts
export function useOpenAiGlobal<K extends keyof WebplusGlobals>(
  key: K
): WebplusGlobals[K] {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => window.openai[key]
  );
}
```

```tsx
// Presentation mode
await window.openai?.requestDisplayMode({ mode: "fullscreen" });
// On mobile, picture-in-picture may be presented as fullscreen.

// Modal
await window.openai.requestModal({
  template: "ui://widget/checkout.html",
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `window.openai.toolInput` | any | Arguments supplied when the tool was invoked. For approval-gated tools, may remain `null` until the host sends `ui/notifications/tool-input` after approval. |
| `window.openai.toolOutput` | any | Your `structuredContent`. Keep fields concise; the model reads them verbatim. |
| `window.openai.toolResponseMetadata` | object | Canonical widget-only tool result metadata. In ChatGPT this includes `status`, `call_tool_result`, and `mcp_tool_result`, preserving the full MCP result envelope, including hidden `_meta`. |
| `window.openai.widgetState` | any | Snapshot of UI state persisted between renders. |
| `window.openai.setWidgetState(state)` | function | Stores a new snapshot synchronously; call it after every meaningful UI interaction. |
| `window.openai.callTool(name, args)` | function | Invoke another MCP tool from the widget (mirrors model-initiated calls). |
| `window.openai.sendFollowUpMessage({ prompt, scrollToBottom })` | function | Ask ChatGPT to post a message authored by the component. `scrollToBottom` optional, defaults to `true`. |
| `window.openai.uploadFile(file, { library?: boolean })` | function | Upload a user-selected file and receive a `fileId`. Pass `{ library: true }` to also save to the user's ChatGPT file library. |
| `window.openai.selectFiles()` | function | Open ChatGPT's file library picker and return plugin-authorized files as `{ fileId, fileName, mimeType }[]`. Feature-detect this helper. |
| `window.openai.getFileDownloadUrl({ fileId })` | function | Retrieve a temporary download URL for a file uploaded by the widget, selected from the file library, passed via file params, or returned by tool file references. |
| `window.openai.requestDisplayMode(...)` | function | Request PiP/fullscreen modes. |
| `window.openai.requestModal({ params, template })` | function | Spawn a modal owned by ChatGPT. Omit `template` to use the current template, or pass a registered template URI to switch modal content. |
| `window.openai.requestClose()` | function | Ask ChatGPT to close the current widget. |
| `window.openai.notifyIntrinsicHeight(...)` | function | Report dynamic widget heights to avoid scroll clipping. |
| `window.openai.openExternal({ href, redirectUrl })` | function | Open a vetted external link in the user's browser. For approved redirect targets, ChatGPT appends `?redirectUrl=...` by default; set `redirectUrl: false` to skip it. |
| `window.openai.setOpenInAppUrl({ href })` | function | Optionally override the external target shown in fullscreen. If unset, ChatGPT opens the component's current iframe path. |
| `window.openai.theme` / `displayMode` / `maxHeight` / `safeArea` / `view` / `userAgent` / `locale` | various | Environment signals readable/subscribable via `useOpenAiGlobal` to adapt visuals and copy. |

## Notes

- Call `window.openai.requestClose()` to ask ChatGPT to close the current UI.
- The sandbox runtime mirrors iframe navigation history into ChatGPT's UI (see host-backed-navigation).

## Related

- [file-apis.md](./file-apis.md)
- [host-backed-navigation.md](./host-backed-navigation.md)
- [tool-results.md](./tool-results.md)
