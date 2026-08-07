# React Transitions

React Router integrates with React 18's `startTransition` API and React 19's async transitions, allowing differentiation between urgent and non-urgent UI updates, via the `useTransitions` prop.

**Status (v8)**: `useTransitions` is a stable prop, no longer prefixed `unstable_` (renamed from `unstable_useTransitions` in v7). Requires `react@19.2.7+` / `react-dom@19.2.7+` (v8 minimum).

### Current Behavior

React Router first leveraged `React.startTransition` to be Suspense-friendly via the `future.v7_startTransition` flag (6.13.0), which became the default in v7 — all router state updates are wrapped in `React.startTransition`. The v8 docs still describe making the React 19 opt-in behavior (`useTransitions={true}`) the default as a forward-looking plan, with the opt-out flag retained for `useSyncExternalStore` use cases.

### Two Options

**Opt-out** (`useTransitions={false}`) — disables `startTransition` wrapping:
- Use when your app relies on `useSyncExternalStore`
- Use when synchronous updates are required

**Opt-in** (`useTransitions={true}`) — full React 19 async transition support:
- Requires React 19
- `<Link>` and `<Form>` are wrapped automatically
- Imperative calls (`navigate`, `submit`, `fetcher.load`, `fetcher.submit`) must be manually wrapped in `startTransition`
- Router state surfaced via `useOptimistic`

### State Surfacing with Opt-In

| Surfaced immediately (optimistic) | Deferred until complete |
|---|---|
| `useNavigation()` | `useLocation()` |
| `useRevalidator()` | `useMatches()` |
| `useActionData()` | `useLoaderData()` |
| `useFetcher()` / `useFetchers()` | `useRouteError()` |

## Signature / Usage

**Applying the prop:**
```tsx
// Framework Mode (entry.client.tsx)
<HydratedRouter useTransitions />

// Data Mode
<RouterProvider useTransitions />

// Declarative Mode
<BrowserRouter useTransitions />
```

**Imperative navigation with transitions (opt-in mode):**
```tsx
// ✅ Correct — promise is returned
startTransition(() => navigate("/path"));

// ✅ Correct — promise is awaited
startTransition(async () => {
  setOptimistic(something);
  await navigate("/path");
});

// ❌ Wrong — promise is neither returned nor awaited
startTransition(() => {
  setOptimistic(something);
  navigate("/path");
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `useTransitions` | `boolean` | — | Wraps router state updates (and `<Link>`/`<Form>` navigations) in `React.startTransition`, surfacing state via `useOptimistic` when `true` |

## Notes

- **Renamed in v8**: `unstable_useTransitions` (v7) → `useTransitions` (v8) — the prop is stable, not experimental
- The v8 docs' Current Behavior section still states that all router state updates are wrapped in `React.startTransition` by default (the v7 behavior), while making opt-in (`useTransitions={true}`) the default remains a stated plan rather than a confirmed current default
- **Known bug**: `popstate` navigations (browser back/forward) have an issue with optimistic states if the target route suspends. Defer optimistic updates with a timer or microtask as a workaround
- When using opt-in mode, always return or await the navigation promise inside `startTransition` — a floating promise will not be tracked correctly
- Only `<Link>` and `<Form>` are automatically transition-wrapped; all other navigation/fetcher calls require manual `startTransition` wrapping

## Related

- [State Management](./state-management.md)
- [Concurrency](./concurrency.md)
