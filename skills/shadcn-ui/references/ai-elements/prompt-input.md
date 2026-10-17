---
source: https://ui.shadcn.com/docs/ai-elements/base/prompt-input
---

# Prompt Input

The field the person types into to message the agent. It is an Input Group with a textarea, an attach button, the Model Selector menus and a send button. Attached files show as Attachment chips above the text.

## Signature / Usage

```bash
npx shadcn@latest add input-group attachment dropdown-menu
```

```tsx
<form ref={formRef} onSubmit={onSubmit}>
  <InputGroup>
    <InputGroupTextarea
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Ask the agent to change your code..."
      className="p-3"
    />
    <InputGroupAddon align="block-end">
      <InputGroupButton
        size="icon-sm"
        variant="outline"
        className="rounded-full"
        aria-label="Attach files"
        onClick={() => inputRef.current?.click()}
      >
        <PlusIcon />
      </InputGroupButton>
      <InputGroupButton
        type="submit"
        size="icon-sm"
        variant="default"
        className="ml-auto rounded-full"
        disabled={!canSend}
        aria-label="Send"
      >
        <ArrowUpIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</form>
```

## Notes

- Attachments: the attach button opens a hidden file input. Show each file as an Attachment in an addon with `align="block-start"`, with a button to remove it.
- Model and effort: put the two Model Selector menus in the `block-end` addon between the attach and send buttons. Move `ml-auto` from the send button to the first menu trigger.
- Keyboard: Enter sends, Shift+Enter adds a new line.

```tsx
onKeyDown={(event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    formRef.current?.requestSubmit()
  }
}}
```

- IME caveat (not in upstream snippet): the handler above also fires on the Enter that commits IME composition (Japanese/Chinese/Korean input). Guard with `if (event.nativeEvent.isComposing) return` (and `event.keyCode === 229` for older Safari) before the Enter check.
- AI SDK: send the text and the `FileList` from the file input with `sendMessage({ text, files })`. The route streams the reply with `result.toUIMessageStreamResponse()`.
- Migration from AI SDK Elements `prompt-input.tsx`: `PromptInput` already renders an Input Group (keep the form, provider, attachment state and command parts); `PromptInputTextarea` -> `InputGroupTextarea className="p-3"`; `PromptInputActionMenuTrigger` -> `InputGroupButton size="icon-sm" variant="outline"` rounded-full; `PromptInputSubmit` -> `InputGroupButton size="icon-sm" variant="default"` rounded-full; `PromptInputHeader` shows each attachment as an `Attachment size="sm"`.
- Base UI variant is canonical (`DropdownMenuTrigger` takes `render`). Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/prompt-input`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/prompt-input`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Model Selector](./model-selector.md)
- [Suggestion](./suggestion.md)
- [Input Group](../components-form/input-group.md)
- [Attachment](../components-chat/attachment.md)
