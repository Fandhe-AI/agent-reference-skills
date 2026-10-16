# advanced

| Name | Description | Path |
| --- | --- | --- |
| Accessibility (A11y) | With native form validation, accessibility of custom-designed forms is the developer's responsibility; improve it with ARIA. | [accessibility.md](./accessibility.md) |
| Connect Form | Connect deeply nested inputs via `FormContext` and a `ConnectForm` component built on render props. | [connect-form.md](./connect-form.md) |
| Controlled mixed with Uncontrolled Components | Works with controlled components too; wrap components that do not expose a native input ref (MUI / Antd `Select`, `Checkbox`) with `Controller`. | [controlled-mixed-uncontrolled.md](./controlled-mixed-uncontrolled.md) |
| Custom Hook with Resolver | Build a custom hook as a resolver to integrate Yup / Joi / Superstruct validation. | [custom-hook-resolver.md](./custom-hook-resolver.md) |
| Error Messages | Three ways to read errors from the `errors` object and improve how they are displayed. | [error-messages.md](./error-messages.md) |
| FormProvider Performance | `FormProvider` is Context-based, so state updates re-render the component tree; optimize with `memo`. | [formprovider-performance.md](./formprovider-performance.md) |
| Registering Opaque Types | Register rich value types (Dayjs / Decimal / Luxon `DateTime`) in `OpaqueTypes` to avoid excessively deep type instantiation. | [registering-opaque-types.md](./registering-opaque-types.md) |
| Server Actions / useActionState | `useActionState` returns a plain dispatch function callable directly from `handleSubmit`; no `useEffect` syncing needed. | [server-actions.md](./server-actions.md) |
| Smart Form Component | Compose input components; the `Form` component collects form data and injects react-hook-form methods into its children. | [smart-form-component.md](./smart-form-component.md) |
| Testing Form | Testing with testing-library; requires the latest `jest` and `@testing-library/jest-dom` because react-hook-form uses `MutationObserver`. | [testing-form.md](./testing-form.md) |
| Transform and Parse | Native inputs return `string` unless `valueAsNumber` / `valueAsDate` is used; handle conversion in a `Controller` wrapper or custom hook. | [transform-and-parse.md](./transform-and-parse.md) |
| Working with virtualized lists | Off-screen rows unmounted by virtualization reset to default values on re-render; example using react-window. | [virtualized-lists.md](./virtualized-lists.md) |
| Wizard Form / Funnel | Keep input across multi-page or multi-section forms in a state library such as little-state-machine or redux. | [wizard-form.md](./wizard-form.md) |
