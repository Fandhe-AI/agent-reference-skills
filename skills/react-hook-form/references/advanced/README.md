# advanced

| Name | Description | Path |
| --- | --- | --- |
| Accessibility (A11y) | Make custom-designed forms accessible: labels, ARIA, error announcements, focus. | [accessibility.md](./accessibility.md) |
| Conditional Fields | Show, hide, and validate fields based on other inputs with `useWatch`; decide what happens to hidden values. | [conditional-fields.md](./conditional-fields.md) |
| Connect Form | Connect deeply nested inputs via `FormContext` and a `ConnectForm` component built on render props. | [connect-form.md](./connect-form.md) |
| Controlled and uncontrolled inputs | Mix native inputs (`register`) with controlled UI components (`useController` / `Controller`). | [controlled-mixed-uncontrolled.md](./controlled-mixed-uncontrolled.md) |
| Custom resolver | Write a resolver function to plug any validation library or hand-written rules into the form. | [custom-hook-resolver.md](./custom-hook-resolver.md) |
| Editing Saved Data | Load a saved record, keep the user's edits, and save only what changed (`dirtyFields`). | [editing-saved-data.md](./editing-saved-data.md) |
| Error Messages | Read errors from the `errors` object and display them consistently. | [error-messages.md](./error-messages.md) |
| FormProvider Performance | `FormProvider` is Context-based, so state updates re-render the tree; optimize with `memo`. | [formprovider-performance.md](./formprovider-performance.md) |
| Isolating Form Subscriptions | Re-render only the components that display a value by isolating subscriptions. | [isolating-subscriptions.md](./isolating-subscriptions.md) |
| Opaque types | Treat Dayjs, Decimal and other class values as single fields in TypeScript via `OpaqueTypes`. | [registering-opaque-types.md](./registering-opaque-types.md) |
| Handling Server Errors | Map API validation errors onto fields and report failed requests with `setError`. | [server-errors.md](./server-errors.md) |
| Server Actions / useActionState | `useActionState` returns a dispatch function callable from `handleSubmit`. | [server-actions.md](./server-actions.md) |
| Smart Form Component | Compose input components; a `Form` component injects react-hook-form methods into its children. | [smart-form-component.md](./smart-form-component.md) |
| Testing forms | Test validation, submission, and errors the way users interact with the form. | [testing-form.md](./testing-form.md) |
| Transform and Parse | Convert between input strings and stored types in a `Controller` wrapper or custom hook. | [transform-and-parse.md](./transform-and-parse.md) |
| Virtualized lists | Keep values and validation for rows unmounted by virtualization. | [virtualized-lists.md](./virtualized-lists.md) |
| Multi-step forms | Collect one typed payload across steps (wizard / funnel), with saved drafts and server validation. | [wizard-form.md](./wizard-form.md) |
