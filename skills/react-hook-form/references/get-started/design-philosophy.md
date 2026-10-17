# Design and philosophy

React Hook Form's design focuses on user and developer experience: a smoother interaction experience through fine-tuned performance and improved accessibility.

## Signature / Usage

Performance enhancements include:

- Introducing a form state subscription model through the proxy
- Avoiding unnecessary computation
- Isolating component re-rendering when required

For developers: built-in validation closely aligned with HTML standards, extensible with powerful validation methods and native integration with schema validation. A strongly type-checked form with TypeScript provides early build-time feedback.

```tsx
// Proxy-based subscription: read the state you need during render
const {
  formState: { isDirty, isValid },
} = useForm()
```

## Notes

- Source: https://react-hook-form.com/get-started#Designandphilosophy

## Related

- [useForm — formState](../api/useform-formstate.md)
- [useWatch](../api/usewatch.md)
