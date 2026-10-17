---
source: https://ui.shadcn.com/docs/components/base/progress
---

# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar (Base UI Progress).

## Signature / Usage

```bash
npx shadcn@latest add progress
```

Manual install dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={33} />
```

With label and value:

```tsx
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

<Progress value={56} className="w-full max-w-sm">
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>
```

```text
Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator
```

## Notes

- The docs have no API table. See the [Base UI Progress](https://base-ui.com/react/components/progress#api-reference) documentation.
- In the official controlled example, `Slider` passes `onValueChange={(value) => setValue(value as number)}` to drive `Progress`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/progress ; React Aria variant: https://ui.shadcn.com/docs/components/aria/progress
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [spinner](./spinner.md)
- [skeleton](./skeleton.md)
