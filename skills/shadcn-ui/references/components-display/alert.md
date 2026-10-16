---
source: https://ui.shadcn.com/docs/components/base/alert
---

# Alert

Displays a callout for user attention.

## Signature / Usage

```bash
npx shadcn@latest add alert
```

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

Composition:

```text
Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction
```

Destructive variant:

```tsx
<Alert variant="destructive" className="max-w-md">
  <AlertCircleIcon />
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>
    Your payment could not be processed. Please check your payment method
    and try again.
  </AlertDescription>
</Alert>
```

## Options / Props

### Alert

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "destructive"` | `"default"` |

### AlertTitle / AlertDescription / AlertAction

| Prop | Type | Default |
| --- | --- | --- |
| `className` | `string` | - |

## Notes

- `AlertAction` is positioned absolutely in the top-right corner of the alert.
- Custom colors are applied with classes on `Alert`, for example `bg-amber-50 dark:bg-amber-950`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Radix variant: https://ui.shadcn.com/docs/components/radix/alert ; React Aria variant: https://ui.shadcn.com/docs/components/aria/alert

## Related

- [toast](./toast.md)
- [badge](./badge.md)
