---
source: https://ui.shadcn.com/docs/ai-elements/base/confirmation
---

# Confirmation

Asks the person for a yes or no before a tool runs. The question is an Item with Deny and Approve buttons. Once the person answers, the call becomes a Tool line.

## Signature / Usage

```bash
npx shadcn@latest add item button
```

```tsx
<Item variant="outline" size="sm">
  <ItemMedia variant="icon">
    <TerminalIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Run {part.input.command}?</ItemTitle>
    <ItemDescription>The command runs in this project.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline" onClick={deny}>
      Deny
    </Button>
    <Button size="sm" onClick={approve}>
      Approve
    </Button>
  </ItemActions>
</Item>
```

## Notes

- AI SDK: while the part state is `approval-requested`, answer with the approval id, and pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer. Approve streams the tool output; Deny streams `output-denied`. Either way the part becomes a Tool line.

```tsx
addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
})

useChat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
})
```

- AI SDK helper: script an approval with `createChat` by setting `needsApproval: true` on the tool. The `output` streams after approval and the next agent turn reads `toolCall.approved`.

```ts
writer.tool("runCommand", {
  input: { command: "rm -rf dist" },
  needsApproval: true,
  output: { stdout: "" },
})
```

- A pending approval is a prompt, not activity, so it sits outside `Trace`.
- Migration from AI SDK Elements `confirmation.tsx`: `Confirmation` -> `Item variant="outline" size="sm"` (instead of an Alert; keep the approval and state props); `ConfirmationTitle` -> `ItemContent` + `ItemTitle`; `ConfirmationActions` -> `ItemActions`; `ConfirmationAction` -> `Button size="sm"`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/confirmation`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/confirmation`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Tool](./tool.md)
- [Item](../components-display/item.md)
