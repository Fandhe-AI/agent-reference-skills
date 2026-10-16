---
source: https://ui.shadcn.com/docs/ai-elements
---

# AI Elements

Patterns for agentic interfaces, built from shadcn/ui components. Each one is a composition of shadcn/ui components that you copy into your project. There is no package to install.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block
```

Open a pattern page, copy its code into your project. Each page lists any other components it needs. Or ask your coding agent:

```txt
Add the Reasoning pattern from https://ui.shadcn.com/docs/ai-elements/base/reasoning.md to my chat.
```

A Chat is a list of Message turns inside a Message Scroller. The steps an agent takes inside a turn (Reasoning, Tool, Plan) are built on Trace, so every step has the same shape. For a chatbot, start from the chatbot template (`https://github.com/shadcn-ui/chatbot-template`: Next.js, AI SDK, shadcn/ui; streaming chat, tool calls, web search, clarifying questions).

## Patterns

| Pattern | Description |
| --- | --- |
| Chain of Thought | A summary that expands into the steps an agent took. |
| Chat | The thread. Message Scroller keeps your place while the reply streams. |
| Checkpoint | A point in the conversation you can return to. |
| Confirmation | A prompt to approve or deny a tool before it runs. |
| Context | How much of the context window the conversation has used. |
| File Tree | The files the agent changed, as a folder tree. |
| Inline Citation | A source in the sentence that opens on hover. |
| Message | One turn. The person's message, and the agent's reply with its actions. |
| Model Selector | Two menus. One picks the model the agent runs, the other picks how hard it thinks. |
| Plan | The steps the agent plans to take, and how far it has got. |
| Prompt Input | A message field with attachments and a send button. |
| Queue | The agent's todo list, split into what is left and what is done. |
| Reasoning | The agent's thinking as it streams. |
| Sources | The links the agent used for a reply. |
| Stack Trace | A failed tool call and its stack frames. |
| Subagent | A subagent run, with its tool calls and result. |
| Suggestion | A short prompt you can send to the agent in one click. |
| Task | The steps the agent takes, as it takes them. |
| Terminal | A command the agent runs, with its output as it streams. |
| Test Results | A test run by the agent, with its suites and failures. |
| Tool | A tool call the agent makes, from input to output. |

## Migrating from AI SDK Elements

Existing projects do not need to migrate: code copied from `elements.ai-sdk.dev` is yours and keeps working. To move a wrapper in `components/ai-elements` onto shadcn/ui components, paste the prompt in the "Migrating from AI SDK Elements" section of the pattern page into your coding agent; it keeps every export and its props.

| AI SDK Elements | shadcn/ui |
| --- | --- |
| `agent.tsx` | Subagent |
| `attachments.tsx` | Attachment (components) |
| `chain-of-thought.tsx` | Chain of Thought |
| `checkpoint.tsx` | Checkpoint |
| `code-block.tsx` | Code Block (components) |
| `commit.tsx` | Trace (components), `#commit` |
| `confirmation.tsx` | Confirmation |
| `context.tsx` | Context |
| `conversation.tsx` | Chat |
| `file-tree.tsx` | File Tree |
| `inline-citation.tsx` | Inline Citation |
| `message.tsx` | Message |
| `model-selector.tsx` | Model Selector |
| `plan.tsx` | Plan |
| `prompt-input.tsx` | Prompt Input |
| `question.tsx` | Questionnaire (components) |
| `queue.tsx` | Queue |
| `reasoning.tsx` | Reasoning |
| `shimmer.tsx` | shimmer (utils) |
| `sources.tsx` | Sources |
| `stack-trace.tsx` | Stack Trace |
| `suggestion.tsx` | Suggestion |
| `task.tsx` | Task |
| `terminal.tsx` | Terminal |
| `test-results.tsx` | Test Results |
| `tool.tsx` | Tool |

Elements without a replacement (build them from existing components):

| AI SDK Elements | Build it with |
| --- | --- |
| `artifact.tsx` | Card, Button and Tooltip |
| `audio-player.tsx` | An `audio` element, with Button Group and Slider |
| `canvas.tsx`, `connection.tsx`, `controls.tsx`, `edge.tsx`, `node.tsx`, `panel.tsx`, `toolbar.tsx` | React Flow (`https://reactflow.dev`), with Card and Button Group |
| `environment-variables.tsx` | Item, Badge and Switch |
| `image.tsx` | An `img` element |
| `jsx-preview.tsx` | A JSX parser, like react-jsx-parser |
| `mic-selector.tsx`, `voice-selector.tsx` | Combobox |
| `open-in-chat.tsx` | Dropdown Menu |
| `package-info.tsx` | Item and Badge |
| `persona.tsx` | A Rive animation (`https://rive.app`) |
| `sandbox.tsx` | Trace, Tabs and Code Block |
| `schema-display.tsx` | Collapsible, Badge and Code Block |
| `snippet.tsx` | Input Group |
| `speech-input.tsx` | Button and Spinner, with the Web Speech API |
| `transcription.tsx` | A Button for each segment, to seek to it |
| `web-preview.tsx` | An `iframe`, with Input Group for the address bar |

## Notes

- AI Elements here are the Base UI variant (the canonical docs). Radix variants live at `https://ui.shadcn.com/docs/ai-elements/radix/<name>` and React Aria variants at `https://ui.shadcn.com/docs/ai-elements/aria/<name>`.
- This is the shadcn/ui copy-in component set (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- These are UI patterns rendering AI SDK message parts, not an agent runtime; agent runtimes are in skills openai-agents / anthropic-agent-sdk.

## Related

- [chat.md](./chat.md)
- [message.md](./message.md)
- [tool.md](./tool.md)
