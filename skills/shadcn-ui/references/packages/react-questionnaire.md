---
source: https://ui.shadcn.com/docs/react/questionnaire
---

# Questionnaire (@shadcn/react)

`Questionnaire` is an unstyled form primitive for presenting one question at a time. It manages answers, progress, validation, and navigation. It works for agent clarification prompts, onboarding, surveys, intake forms, and configuration.

## Signature / Usage

```bash
npm install @shadcn/react
```

```tsx
import { Questionnaire } from "@shadcn/react/questionnaire"
```

`Questionnaire` exports its parts from one namespace. Each part accepts the native props for its default element.

Anatomy:

```tsx
<Questionnaire.Root>
  <Questionnaire.Progress />
  <Questionnaire.Item name="question">
    <Questionnaire.Title />
    <Questionnaire.Description />
    <Questionnaire.Choices>
      <Questionnaire.Choice>
        <Questionnaire.ChoiceInput />
        <Questionnaire.ChoiceLabel />
        <Questionnaire.ChoiceShortcut />
      </Questionnaire.Choice>
      <Questionnaire.Input />
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Previous />
  <Questionnaire.Skip />
  <Questionnaire.Next />
  <Questionnaire.Submit />
</Questionnaire.Root>
```

`Root` renders a form. Each `Item` is a fieldset, with `Title` as its legend. `ChoiceInput` renders a native radio or checkbox.

Basic usage (each `Item` is one step; its `name` becomes the form field name and `Choice.value` is the submitted answer):

```tsx
"use client"

import * as React from "react"
import { Questionnaire } from "@shadcn/react/questionnaire"

export function ProjectQuestionnaire() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    console.log({
      prototype: formData.get("prototype"),
      detail: formData.get("detail"),
    })
  }

  return (
    <Questionnaire.Root items={items} onSubmit={handleSubmit}>
      <Questionnaire.Progress />
      {items.map((question) => (
        <Questionnaire.Item
          key={question.name}
          name={question.name}
          required={question.required}
        >
          <Questionnaire.Title>{question.prompt}</Questionnaire.Title>
          <Questionnaire.Description>
            {question.description}
          </Questionnaire.Description>
          <Questionnaire.Choices>
            {question.choices.map((choice) => (
              <Questionnaire.Choice key={choice.value} value={choice.value}>
                <Questionnaire.ChoiceInput />
                <Questionnaire.ChoiceLabel>
                  <span>{choice.label}</span>
                  {"description" in choice ? (
                    <span>{choice.description}</span>
                  ) : null}
                </Questionnaire.ChoiceLabel>
                <Questionnaire.ChoiceShortcut />
              </Questionnaire.Choice>
            ))}
            {"input" in question ? (
              <Questionnaire.Input
                aria-label={question.input.label}
                placeholder={question.input.placeholder}
              />
            ) : null}
          </Questionnaire.Choices>
          <Questionnaire.Error />
        </Questionnaire.Item>
      ))}
      <Questionnaire.Previous />
      <Questionnaire.Skip />
      <Questionnaire.Next />
      <Questionnaire.Submit />
    </Questionnaire.Root>
  )
}
```

with the `items` collection:

```tsx
const items = [
  {
    name: "prototype",
    required: true,
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    choices: [
      {
        value: "delegation",
        label: "Delegation",
        description: "Show how work moves to a specialist.",
      },
      { value: "both", label: "Both together" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer…" },
  },
  {
    name: "detail",
    required: false,
    prompt: "How much detail should it include?",
    description: "Skip this if you are not sure yet.",
    choices: [
      { value: "focused", label: "Focused" },
      { value: "complete", label: "Complete flow" },
    ],
  },
] as const
```

Pass the same `items` collection to `Root` that you render as `Item` and `Choice` parts. This makes item order, progress, action visibility, and answer shortcuts available in the server-rendered HTML.

Multiple selection: `multiple` turns an item's fixed choices into native checkboxes; read answers with `FormData.getAll()`. Keep `multiple` in your application data and pass it to the rendered `Item`.

```tsx
const signals = new FormData(form).getAll("signals").map(String)
```

Freeform answers: `Input` adds a freeform answer and renders a native text input.

```tsx
<Questionnaire.Choices>
  {/* choices */}
  <Questionnaire.Input
    aria-label="Another answer"
    placeholder="Type another answer…"
  />
</Questionnaire.Choices>
```

Explicit skip: `Skip` records that an optional item was intentionally left unanswered. Use `onStatusChange` to distinguish a skipped answer from a missing one.

```tsx
import {
  Questionnaire,
  type QuestionnaireItemStatus,
} from "@shadcn/react/questionnaire"

const [timingStatus, setTimingStatus] =
  React.useState<QuestionnaireItemStatus>("unanswered")

<Questionnaire.Root defaultItem="timing" onSubmit={handleSubmit}>
  <Questionnaire.Item name="timing" onStatusChange={setTimingStatus}>
    {/* title, choices */}
  </Questionnaire.Item>
  <Questionnaire.Skip />
  <Questionnaire.Submit />
</Questionnaire.Root>
```

Answer shortcuts: `shortcuts="letters"` or `shortcuts="numbers"` assigns a key to each enabled fixed choice, following the `items` order when provided. Compose `ChoiceShortcut` wherever its hint should appear. `"letters"` assigns `A` through `Z`; `"numbers"` assigns `1` through `9`. Disabled choices are skipped. Selecting an answer by shortcut does not advance to the next item.

```tsx
<Questionnaire.Root shortcuts="letters">
  <Questionnaire.Item name="review" required>
    <Questionnaire.Title>What should the agent review?</Questionnaire.Title>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="api">
        <Questionnaire.ChoiceInput />
        <Questionnaire.ChoiceLabel>Public API</Questionnaire.ChoiceLabel>
        <Questionnaire.ChoiceShortcut />
      </Questionnaire.Choice>
    </Questionnaire.Choices>
  </Questionnaire.Item>
</Questionnaire.Root>
```

Validation: the active item is validated before moving forward and all enabled items are validated on submit. A required item is valid after it has an answer; an optional item is valid after it has an answer or is explicitly skipped; disabled items and answers are ignored. `required` does not add visible "Required" text; say it in the `Title` or `Description`. On failure, Questionnaire keeps or opens the invalid item and focuses an answer. Add `Error` to show a message (hidden until the item is invalid; children replace the default message).

```tsx
<Questionnaire.Error>Please choose a project scope.</Questionnaire.Error>
```

For Zod or another external validator, set `Item.invalid`, render the message in `Error`, and move `Root.item` to the first invalid item:

```tsx
<Questionnaire.Root item={item} onItemChange={setItem} onSubmit={handleSubmit}>
  <Questionnaire.Item invalid={Boolean(errors.detail)} name="detail" required>
    <Questionnaire.Title>How much detail?</Questionnaire.Title>
    <Questionnaire.Choices>{/* choices */}</Questionnaire.Choices>
    <Questionnaire.Error>{errors.detail}</Questionnaire.Error>
  </Questionnaire.Item>
</Questionnaire.Root>
```

Controlled navigation: pass `item` and `onItemChange`.

```tsx
const [item, setItem] = React.useState("scope")

<Questionnaire.Root item={item} onItemChange={setItem} onSubmit={handleSubmit}>
  <Questionnaire.Item name="scope" required>
    {/* question and answers */}
  </Questionnaire.Item>
  <Questionnaire.Previous />
  <Questionnaire.Next>Next</Questionnaire.Next>
  <Questionnaire.Submit>Submit</Questionnaire.Submit>
</Questionnaire.Root>
```

Resume with defaults: restore a saved draft with `defaultItem`, `defaultChecked`, and `defaultValue`.

```tsx
<Questionnaire.Root defaultItem="verification">
  <Questionnaire.Item name="scope" required>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="component" defaultChecked>
        <Questionnaire.ChoiceInput />
        <Questionnaire.ChoiceLabel>Component only</Questionnaire.ChoiceLabel>
      </Questionnaire.Choice>
    </Questionnaire.Choices>
  </Questionnaire.Item>
  <Questionnaire.Item name="verification" required>
    <Questionnaire.Input
      aria-label="Extra instructions"
      defaultValue="Run the package tests."
    />
  </Questionnaire.Item>
  <button type="reset">Reset draft</button>
</Questionnaire.Root>
```

Conditional items: set `disabled` on an `Item` to remove it from the current flow; disabled items are excluded from progress, navigation, validation, and submission.

```tsx
<Questionnaire.Item name="region" disabled={runtime !== "remote"} required>
  {/* remote-only question */}
</Questionnaire.Item>
```

Navigation state: navigation actions stay enabled by default so activating Next or Submit can show a validation error. Use the render state (`visible`, `disabled`, `shortcut`, `status`) when you want to disable an action yourself.

Input labelling: always give `Input` an accessible name (a placeholder is not a label).

```tsx
<Label htmlFor="other-answer">Other answer</Label>
<Questionnaire.Input
  id="other-answer"
  placeholder="Type another answer…"
/>
```

## Options / Props

### Questionnaire.Root

The form and coordination root.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | `string` | - | Controlled active item name. |
| `defaultItem` | `string` | first enabled item | Initially active item name. |
| `items` | `readonly QuestionnaireItemDefinition[]` | - | Optional item data for server rendering and item order. |
| `onItemChange` | `(item: string) => void` | - | Called when navigation requests a different item. |
| `shortcuts` | `"letters" \| "numbers"` | - | Assigns scoped answer shortcuts in definition or rendered DOM order. |
| `noValidate` | `boolean` | `true` | Disables native constraint UI while preserving questionnaire validation. |
| `onSubmit` | `FormEventHandler<HTMLFormElement>` | - | Native form submission handler after every item validates. |
| `onReset` | `FormEventHandler<HTMLFormElement>` | - | Native reset handler. Prevent default to stop questionnaire reset. |

Collection types exported from `@shadcn/react/questionnaire`:

```ts
type QuestionnaireChoiceDefinition = {
  value: string
  disabled?: boolean
}

type QuestionnaireItemDefinition = {
  name: string
  required?: boolean
  disabled?: boolean
  choices?: readonly QuestionnaireChoiceDefinition[]
}
```

### Questionnaire.Progress

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `Question {current} of {total}` | Custom progress content. |
| `aria-label` | `string` | `Questionnaire progress` | Accessible progressbar name. |
| `render` | `ReactElement \| (props, state) => ReactElement` | `<div>` | Custom render target with progress state (`current`, `total`, `first`, `last`). |

### Questionnaire.Item

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | required | Unique item identifier and native form field name. |
| `invalid` | `boolean` | `false` | Marks the item invalid from an external validator. |
| `required` | `boolean` | `false` | Requires an answer and prevents Skip. |
| `multiple` | `boolean` | `false` | Renders fixed choices as checkboxes. |
| `disabled` | `boolean` | `false` | Omits the item from progress and navigation. |
| `onStatusChange` | `(status: QuestionnaireItemStatus) => void` | - | Observes `"unanswered"`, `"answered"`, and `"skipped"` changes. |

### Questionnaire.Title / Description / Choices

| Part | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Title` | `render` | `ReactElement \| render function` | `<legend>` | Custom render target. Pair its `id` with the item's `aria-labelledby`. |
| `Description` | `render` | `ReactElement \| render function` | `<p>` | Custom render target. |
| `Choices` | `render` | `ReactElement \| render function` | `<div>` | Custom render target (render state contains `shortcuts`). |

### Questionnaire.Choice

Fixed-answer container; compose one `ChoiceInput`, one `ChoiceLabel`, and an optional `ChoiceShortcut` inside it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | required | Native answer value. |
| `checked` | `boolean` | - | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial checked state. |
| `disabled` | `boolean` | `false` | Disables the native answer control. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | - | Native input change handler. |
| `render` | `ReactElement \| (props, state) => ReactElement` | `<label>` | Custom render target; state contains `checked`, `disabled`, `invalid`, `shortcut`, `type`. |

`ChoiceInput` is the native radio or checkbox (must be inside `Choice`; accepts `className`, `id`, `ref`, `render`, and other non-conflicting native input props). `ChoiceLabel` renders a `<span>` and accepts native span props and `render`. `ChoiceShortcut` renders a `<span>` with the assigned letter or number (hidden when none) and accepts native span props and `render`.

### Questionnaire.Input

Freeform answer; its native `name` is managed by the containing item.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| number \| readonly string[]` | - | Controlled native input value. |
| `defaultValue` | `string \| number \| readonly string[]` | - | Initial native input value. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | - | Native input change handler. |
| `type` | `QuestionnaireInputType` | `"text"` | A text-entry type such as `"email"`, `"number"`, or `"date"`. |
| `render` | `ReactElement \| (props, state) => ReactElement` | `<input>` | Custom render target; state contains `disabled`, `filled`, `invalid`. |

### Questionnaire.Error

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | contextual message | Custom validation message. |
| `render` | `ReactElement \| (props, state) => ReactElement` | `<p>` | Custom render target with invalid state. |

### Navigation actions

`Previous`, `Skip`, `Next`, and `Submit` render native buttons and stay mounted while their visibility changes. Each accepts native button props and `render` (`ReactElement \| (props, state) => ReactElement`); the render state contains `visible`, `disabled`, `shortcut`, and the active item's `status`.

| Part | Default type | Visible when | Disabled when |
| --- | --- | --- | --- |
| `Previous` | `"button"` | Not on the first item. | Consumer sets `disabled`. |
| `Skip` | `"button"` | Active item is optional. | Consumer sets `disabled`. |
| `Next` | `"button"` | Not on the last item. | Consumer sets `disabled`. |
| `Submit` | `"submit"` | On the last item. | Consumer sets `disabled`. |

### Data attributes

Boolean attributes are present when true and absent when false.

| Part | Attributes |
| --- | --- |
| Root / Progress | `data-current` (one-based active position), `data-total`, `data-first`, `data-last`, `data-shortcuts` (`"letters"` \| `"numbers"` on Root) |
| Item | `data-active`, `data-status` (`"unanswered"` \| `"answered"` \| `"skipped"`), `data-required`, `data-multiple`, `data-disabled`, `data-invalid` |
| Choice | `data-type` (`"radio"` \| `"checkbox"`), `data-checked`, `data-unchecked`, `data-disabled`, `data-invalid`, `data-shortcut` |
| Choices | `data-shortcuts` |
| Input | `data-filled`, `data-empty`, `data-disabled`, `data-invalid` |
| Error | `data-invalid` |
| Previous / Skip / Next / Submit | `data-visible`, `data-hidden`, `data-disabled`, `data-shortcut` (`"Enter"` on an enabled, visible Next or Submit), `data-status` |

`Title` and `Description` have no state attributes. The headless parts do not emit `data-slot`.

## Notes

- Keyboard: `Tab` / `Shift+Tab` move between controls and visible actions; `ArrowUp` / `ArrowDown` move between answers (native radios also select); `ArrowLeft` goes to the previous item and `ArrowRight` to the next when the active item is answered or skipped (focus outside a radio or text entry); `Space` selects/toggles/activates; `Enter` continues from a selected choice or filled input; `Command/Ctrl + Enter` validates and continues from anywhere, or submits the final item. Shortcuts and arrow navigation pause while typing in a text field. Preventing the root `onKeyDown` event turns off questionnaire key handling.
- Accessibility: `Item` renders a `fieldset`; `Title` renders its `legend` (with a custom render target, connect its `id` via `aria-labelledby`); `Description` and the active `Error` connect via `aria-describedby`; invalid items and controls expose `aria-invalid`; `Progress` is a named progressbar; shortcuts are exposed with `aria-keyshortcuts`; inactive items and actions are hidden and inert; validation focuses the first available answer control. Disabled items are omitted from progress and navigation.
- Item names must be unique within a Root; the name belongs to the answer controls, not the fieldset.
- The styled registry component (`components-chat/questionnaire.md`, imported from `@/components/ui/questionnaire`) uses flat names: `Questionnaire` = `Questionnaire.Root`, `QuestionnaireProgress` / `Item` / `Title` / `Description` / `Choices` / `Input` / `Error` / `Previous` / `Skip` / `Next` / `Submit` = the same-named namespaced parts, and `QuestionnaireChoice` composes `Choice` + `ChoiceInput` + `ChoiceLabel` + `ChoiceShortcut` plus a visual indicator. `QuestionnaireActions` has no unstyled counterpart (layout only; use your own container). With the unstyled package you compose the choice parts yourself.
- This is an npm package (not copied into `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). Validation examples use Zod (skill zod); form libraries are covered by skill react-hook-form. Despite the agent-oriented examples, this is a UI form primitive, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Questionnaire (styled component)](../components-chat/questionnaire.md)
- [Message Scroller (@shadcn/react)](./react-message-scroller.md)
