---
source: https://ui.shadcn.com/docs/components/base/questionnaire
---

# Questionnaire

A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions. It owns the ordered items, active item, answer state, validation, progress, and navigation; the containing page, card, dialog, or drawer owns close/cancel behavior, persistence, transport, and branching.

## Signature / Usage

```bash
npx shadcn@latest add questionnaire
```

Manual install: `npm install @shadcn/react`, then copy the component source into `components/ui/questionnaire.tsx` and update the import paths.

```tsx
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
```

Define the collection once: pass it to `Questionnaire` for server-rendered progress, actions, and shortcuts, then map it into the parts.

```tsx
<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  {items.map((question) => (
    <QuestionnaireItem
      key={question.name}
      name={question.name}
      required={question.required}
    >
      <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
      <QuestionnaireDescription>
        {question.description}
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        {question.choices.map((choice) => (
          <QuestionnaireChoice key={choice.value} value={choice.value}>
            <span className="font-medium">{choice.label}</span>
          </QuestionnaireChoice>
        ))}
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
  ))}
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>
```

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const answers = new FormData(event.currentTarget)
  // answers.get("direction"), answers.getAll(...) for multiple items.
}
```

Composition:

```text
Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit
```

## Options / Props

The props, data attributes, and render states for every part are documented on the `@shadcn/react` Questionnaire page (https://ui.shadcn.com/docs/react/questionnaire#api-reference). The styled components inherit the corresponding unstyled props. Navigation components also accept Button `size` and `variant` props, and `QuestionnaireActions` is a styled-only layout helper. Props that appear in this page's examples:

| Name | Type | Description |
| --- | --- | --- |
| `Questionnaire` `items` | `readonly { name: string; required?: boolean; disabled?: boolean }[]` | The ordered collection; enables server rendering of the active item, progress, actions, and shortcuts. Shape taken from examples. |
| `Questionnaire` `shortcuts` | `"letters" \| "numbers" \| undefined` | Assigns a letter or number key to each answer. |
| `Questionnaire` `defaultItem` | `string` | The initially active item name. |
| `Questionnaire` `item` / `onItemChange` | `string` / `(item: string) => void` | Controlled active item (for example to return to an invalid step). |
| `Questionnaire` `onSubmit` / `onReset` | form event handlers | Submit and reset handling; answers are read from `FormData`. |
| `QuestionnaireItem` `name` | `string` | Item name; also the form field name. |
| `QuestionnaireItem` `required` | `boolean` | Whether an answer is required; non-required items can be skipped. |
| `QuestionnaireItem` `multiple` | `boolean` | Accept more than one fixed answer (checkboxes). |
| `QuestionnaireItem` `invalid` | `boolean` | Marks the item invalid (used with external validation). |
| `QuestionnaireItem` `disabled` | `boolean` | Disables an item that does not apply (conditional items). |
| `QuestionnaireItem` `onStatusChange` | `(status: QuestionnaireItemStatus) => void` | Reports item status; the type is exported from `@shadcn/react/questionnaire`. Values seen in examples: `"unanswered"`, `"skipped"`. |
| `QuestionnaireProgress` `render` | `(props, state) => ReactElement` | Custom progress; `state` exposes `current` and `total`. |
| `QuestionnaireChoice` `value` | `string` | The answer value. Also accepts `defaultChecked`, `checked`, `onChange`. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Same name, different layer: this page is the styled copy-in wrapper; the unstyled `@shadcn/react` Questionnaire is documented in the packages category (react-questionnaire).
- Accessibility: `QuestionnaireItem` renders a `fieldset` and `QuestionnaireTitle` renders its `legend`. Fixed choices keep native radio/checkbox behavior; progress is a named progressbar; inactive items and actions are hidden and inert. Always give `QuestionnaireInput` an accessible name (visible label, `aria-label`, or `aria-labelledby`); a placeholder is not a label.
- Custom validation: combine controlled navigation (`item` + `onItemChange`) with an external schema such as Zod (skill zod) and set `invalid` on the failing item.
- `QuestionnaireTitle` and `QuestionnaireDescription` accept `render` so they can render as `CardTitle` / `CardDescription` or `DialogTitle` / `DialogDescription`. Compose inside Card or Dialog keeping cancellation host-owned.
- Resume: restore a saved item with `defaultItem` and saved answers with `defaultChecked` / `defaultValue`; a `type="reset"` button restores that saved state.
- The component source in the docs for this page references the `base-nova` style name (other chat components reference `base-rhea`).
- Radix and React Aria variants exist at https://ui.shadcn.com/docs/components/radix/questionnaire and https://ui.shadcn.com/docs/components/aria/questionnaire.

## Related

- [message.md](./message.md)
- [message-scroller.md](./message-scroller.md)
