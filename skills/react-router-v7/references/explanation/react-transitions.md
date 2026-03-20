# React Transitions

React Router v7 integrates with React 18's `startTransition` API and React 19's async transitions, allowing differentiation between urgent and non-urgent UI updates.

**Status**: Experimental — controlled via `unstable_useTransitions` prop. Subject to breaking changes in minor/patch releases.

## 詳細説明

### Default Behavior (v7)

All router state updates are wrapped in `React.startTransition`. This can conflict with `useSyncExternalStore` and does not fully support React 19 async transitions.

### Two Options

**Opt-out** (`unstable_useTransitions={false}`) — disables `startTransition` wrapping:
- Use when your app relies on `useSyncExternalStore`
- Use when synchronous updates are required

**Opt-in** (`unstable_useTransitions={true}`) — full React 19 async transition support:
- Requires React 19
- `<Link>` and `<Form>` are wrapped automatically
- Imperative calls (`navigate`, `submit`, `fetcher.load`, `fetcher.submit`) must be manually wrapped in `startTransition`

### State Surfacing with Opt-In

| Surfaced immediately (optimistic) | Deferred until complete |
|---|---|
| `useNavigation()` | `useLocation()` |
| `useRevalidator()` | `useMatches()` |
| `useActionData()` | `useLoaderData()` |
| `useFetcher()` / `useFetchers()` | `useRouteError()` |

## コード例

**Applying the prop:**
```tsx
// Framework Mode (entry.client.tsx)
<HydratedRouter unstable_useTransitions />

// Data Mode
<RouterProvider unstable_useTransitions />

// Declarative Mode
<BrowserRouter unstable_useTransitions />
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

## 注意点

- The opt-in behavior (`unstable_useTransitions=true`) is planned to become the default in React Router v8
- **Known bug**: `popstate` navigations (browser back/forward) have an issue with optimistic states if the target route suspends. Defer optimistic updates with a timer or microtask as a workaround
- When using opt-in mode, always return or await the navigation promise inside `startTransition` — a floating promise will not be tracked correctly

## 関連

- [State Management](./state-management.md)
- [Concurrency](./concurrency.md)
