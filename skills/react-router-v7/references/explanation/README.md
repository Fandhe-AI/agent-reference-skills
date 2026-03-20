# Explanation

Conceptual documentation for React Router v7.

| Name | Description | Path |
|------|-------------|------|
| Backend For Frontend | BFF pattern — React Router as a gateway between frontend and backend services | [./backend-for-frontend.md](./backend-for-frontend.md) |
| Code Splitting | Automatic per-route code splitting and server code removal from client bundles | [./code-splitting.md](./code-splitting.md) |
| Concurrency | Automatic network concurrency management mirroring browser behavior | [./concurrency.md](./concurrency.md) |
| Form vs. Fetcher | When to use `<Form>` + `useNavigation` vs. `useFetcher` based on URL change intent | [./form-vs-fetcher.md](./form-vs-fetcher.md) |
| Hot Module Replacement | HMR via React Fast Refresh — preserves browser state across code changes | [./hot-module-replacement.md](./hot-module-replacement.md) |
| Index Query Param | How `?index` disambiguates form submissions between parent and index routes | [./index-query-param.md](./index-query-param.md) |
| Lazy Route Discovery | Progressive loading of route metadata via `/__manifest` endpoint | [./lazy-route-discovery.md](./lazy-route-discovery.md) |
| Progressive Enhancement | SSR-first strategy ensuring basic functionality without JavaScript | [./progressive-enhancement.md](./progressive-enhancement.md) |
| Race Conditions | Automatic cancellation of stale requests to prevent UI inconsistencies | [./race-conditions.md](./race-conditions.md) |
| React Transitions | Integration with React 18/19 `startTransition` for urgent vs. non-urgent updates | [./react-transitions.md](./react-transitions.md) |
| State Management | Using loaders, actions, URL params, and cookies instead of client-side state | [./state-management.md](./state-management.md) |
| Type Safety | Per-route TypeScript type generation for loaders, actions, and component props | [./type-safety.md](./type-safety.md) |

> **Note:** Sessions and Cookies の説明は [../utils/sessions-and-cookies.md](../utils/sessions-and-cookies.md) を参照してください。
