# hooks

| Name | Description | Path |
|------|-------------|------|
| useActionData | Returns the data from the route's `action` function after a form submission. Returns `undefined` if no action has been called yet. | [useActionData.md](./useActionData.md) |
| useAsyncError | Returns the rejection value from the nearest `<Await>` component. Used inside the `errorElement` of an `<Await>` to render error UI. | [useAsyncError.md](./useAsyncError.md) |
| useAsyncValue | Returns the resolved value from the nearest `<Await>` ancestor component. Used inside components rendered as children of `<Await>`. | [useAsyncValue.md](./useAsyncValue.md) |
| useBeforeUnload | Registers a callback on the browser's `beforeunload` event, allowing cleanup or confirmation prompts when the user leaves the page entirely (hard navigation, tab close, etc.). | [useBeforeUnload.md](./useBeforeUnload.md) |
| useBlocker | Blocks in-app SPA navigations and returns a `Blocker` object that lets you present a confirmation UI before proceeding. | [useBlocker.md](./useBlocker.md) |
| useFetcher | Creates a fetcher for loading data or submitting forms without causing a navigation. Each fetcher tracks its own independent state. | [useFetcher.md](./useFetcher.md) |
| useFetchers | Returns an array of all in-flight `Fetcher` objects. Useful for components that did not create fetchers themselves but want to participate in optimistic UI. | [useFetchers.md](./useFetchers.md) |
| useFormAction | Resolves the URL of the closest route in the component hierarchy and optionally appends a sub-action path. Used internally by `<Form>` but available for custom use. | [useFormAction.md](./useFormAction.md) |
| useHref | Resolves a path against the current location and returns the resulting href string. | [useHref.md](./useHref.md) |
| useInRouterContext | Returns `true` if this component is a descendant of a `Router`, useful to ensure a component is used within a `Router`. | [useInRouterContext.md](./useInRouterContext.md) |
| useLoaderData | Returns data from the closest route's `loader` or `clientLoader` function. Available in Framework and Data modes only. | [useLoaderData.md](./useLoaderData.md) |
| useLocation | Returns the current `Location` object. Triggers a re-render whenever the location changes. | [useLocation.md](./useLocation.md) |
| useLinkClickHandler | Handles the click behavior for router `<Link>` components. Useful if you need to create custom `<Link>` components with the same click behavior as the exported `<Link>`. | [useLinkClickHandler.md](./useLinkClickHandler.md) |
| useMatch | Returns a `PathMatch` object if the given pattern matches the current URL, or `null` if it does not. Useful for determining "active" state of navigation elements. | [useMatch.md](./useMatch.md) |
| useMatches | Returns an array of `UIMatch` objects representing every active route in the current match hierarchy, from root to the current route. | [useMatches.md](./useMatches.md) |
| useNavigate | Returns a function for programmatic navigation in response to user interactions or effects. | [useNavigate.md](./useNavigate.md) |
| useNavigation | Returns the current `Navigation` object representing any in-progress navigation, defaulting to an idle state when none is active. | [useNavigation.md](./useNavigation.md) |
| useNavigationType | Returns the current `Navigation` action which describes how the router came to the current `Location`, either by a pop, push, or replace on the `History` stack. | [useNavigationType.md](./useNavigationType.md) |
| useOutlet | Returns the element for the child route at this level of the route hierarchy. Used internally by `<Outlet>` to render child routes. | [useOutlet.md](./useOutlet.md) |
| useOutletContext | Returns the context value passed via the `context` prop on the parent route's `<Outlet>`. Enables parent-to-child route state sharing without a separate context provider. | [useOutletContext.md](./useOutletContext.md) |
| useParams | Returns an object of dynamic route parameters extracted from the current URL, keyed by their names as defined in the route pattern. | [useParams.md](./useParams.md) |
| unstable_usePrompt | A wrapper around `useBlocker` that shows a `window.confirm` prompt to users instead of building a custom UI with `useBlocker`. | [usePrompt.md](./usePrompt.md) |
| useResolvedPath | Resolves the pathname of the given `to` value against the current `Location`. Similar to `useHref`, but returns a `Path` instead of a string. | [useResolvedPath.md](./useResolvedPath.md) |
| useRevalidator | Returns a `revalidate` function and the current revalidation state, allowing you to manually re-run all active loaders outside of normal mutation flows. | [useRevalidator.md](./useRevalidator.md) |
| useRouteError | Returns the error thrown during a route's loader, action, or component render. Must be called inside a route module's `ErrorBoundary` component. | [useRouteError.md](./useRouteError.md) |
| useRouteLoaderData | Returns the loader data for any route in the hierarchy by its route ID. Useful for accessing data from parent or sibling routes. | [useRouteLoaderData.md](./useRouteLoaderData.md) |
| unstable_useRouterState | A unified hook for reading router state: current (`active`) and in-flight (`pending`) locations, search params, params, matches, and navigation type. Consolidates the information previously read from `useLocation`, `useSearchParams`, `useParams`, `useMatches`, `useNavigation`, and `useNavigationType` into a single hook. | [useRouterState.md](./useRouterState.md) |
| useRoutes | Hook version of `<Routes>` that uses objects instead of components. These objects have the same properties as the component props. The return value is either a valid React element to render the route tree, or `null` if nothing matched. | [useRoutes.md](./useRoutes.md) |
| useSearchParams | Returns a tuple of the current URL's `URLSearchParams` and a setter function. Setting params causes a navigation. | [useSearchParams.md](./useSearchParams.md) |
| useSubmit | Returns a `SubmitFunction` for submitting forms programmatically — the imperative counterpart to the `<Form>` component. | [useSubmit.md](./useSubmit.md) |
| useViewTransitionState | Returns `true` when there is an active View Transition targeting the specified location, enabling fine-grained CSS `view-transition-name` assignments during transitions. | [useViewTransitionState.md](./useViewTransitionState.md) |
