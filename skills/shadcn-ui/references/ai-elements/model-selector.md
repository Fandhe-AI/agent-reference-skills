---
source: https://ui.shadcn.com/docs/ai-elements/base/model-selector
---

# Model Selector

Two menus. One picks the model the agent runs, the other picks how hard it thinks (effort). Built with Dropdown Menu and Input Group.

## Signature / Usage

```bash
npx shadcn@latest add dropdown-menu input-group
```

```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Ask the agent to change your code..." />
  <InputGroupAddon align="block-end">
    <DropdownMenu>
      <DropdownMenuTrigger render={<InputGroupButton size="sm" />}>
        GPT-5
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>OpenAI</DropdownMenuLabel>
            <DropdownMenuRadioItem value="gpt-5" closeOnClick>
              GPT-5
            </DropdownMenuRadioItem>
          </DropdownMenuGroup>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <InputGroupButton type="submit" variant="default" className="ml-auto">
      <ArrowUpIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Notes

- AI SDK: send the model and the effort with the message, then map them to a model and provider options in the route. Each provider reads its own key in `providerOptions` and ignores the rest.

```tsx
sendMessage({ text }, { body: { model, effort } })
```

```ts
const result = streamText({
  model: models[model] ?? models["gpt-5"],
  messages: await convertToModelMessages(messages),
  providerOptions: {
    openai: { reasoningEffort: effort },
    anthropic: { effort },
  },
})
return result.toUIMessageStreamResponse()
```

- A menu has no search field. Migration from AI SDK Elements `model-selector.tsx` (which used a Dialog): `ModelSelector` -> `DropdownMenu`; `ModelSelectorList` -> `DropdownMenuRadioGroup`; `ModelSelectorItem` -> `DropdownMenuRadioItem` with `closeOnClick`. Keep `ModelSelectorInput`, `ModelSelectorEmpty` and `ModelSelectorDialog` on Command if you need search.
- The model ids in the demo (`gpt-5`, `claude-sonnet-4-5`, ...) are demo data from the page, not a supported-model list.
- Base UI variant is canonical (`DropdownMenuTrigger` takes `render`). Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/model-selector`; React Aria variant (trigger wraps the button directly, no `render`): `https://ui.shadcn.com/docs/ai-elements/aria/model-selector`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Prompt Input](./prompt-input.md)
- [Dropdown Menu](../components-overlay/dropdown-menu.md)
- [Input Group](../components-form/input-group.md)
