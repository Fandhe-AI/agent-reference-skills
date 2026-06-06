# Explanation

| Name | Description | Path |
|------|-------------|------|
| Automatic Code Splitting | React Router automatically splits code by route, reducing the JavaScript footprint for initial page loads. | [code-splitting.md](./code-splitting.md) |
| Backend For Frontend (BFF) | An architectural pattern where React Router acts as a dedicated web server that connects your frontend to backend services, rather than having the browser communicate directly with multiple APIs. | [backend-for-frontend.md](./backend-for-frontend.md) |
| Form vs. Fetcher | React Router provides two overlapping tools for form submissions. The primary criterion for choosing between them is **whether the URL should change**. | [form-vs-fetcher.md](./form-vs-fetcher.md) |
| Hot Module Replacement (HMR) | HMR updates modules in your app without a full page reload, preserving browser state (form inputs, modal states) across code changes. | [hot-module-replacement.md](./hot-module-replacement.md) |
| Index Query Param (`?index`) | The `?index` query parameter disambiguates form submissions between a parent route and its index route when both match the same URL path. | [index-query-param.md](./index-query-param.md) |
| Lazy Route Discovery | Lazy Route Discovery loads route metadata progressively as users navigate, rather than sending the full route manifest on initial load. | [lazy-route-discovery.md](./lazy-route-discovery.md) |
| Network Concurrency Management | React Router automates network concurrency handling, mirroring browser behavior for navigations and extending it for concurrent fetcher requests. | [concurrency.md](./concurrency.md) |
| Progressive Enhancement | A web design strategy that ensures basic functionality works for everyone, while users with JavaScript and faster connections receive an enhanced experience. | [progressive-enhancement.md](./progressive-enhancement.md) |
| Race Conditions | React Router automatically handles the most common UI race conditions by mirroring browser network concurrency behavior. | [race-conditions.md](./race-conditions.md) |
| React Transitions | React Router v7 integrates with React 18's `startTransition` API and React 19's async transitions, allowing differentiation between urgent and non-urgent UI updates. | [react-transitions.md](./react-transitions.md) |
| State Management | React Router replaces most client-side state management by synchronizing server and client state through loaders, actions, and automatic revalidation. | [state-management.md](./state-management.md) |
| Type Safety | React Router generates TypeScript types per route, providing type-safe loader args, action args, and component props automatically. | [type-safety.md](./type-safety.md) |
