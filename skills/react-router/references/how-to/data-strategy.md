# Data Strategy

Low-level API for controlling how `action`/`loader` functions execute, overriding React Router's default parallel-loader behavior. Foundation for advanced middleware, context, and caching layers.

**Available in:** Data mode only.
**Status:** Advanced/low-level — overrides React Router's internal handling of `action`/`loader` execution; incorrect use will break the app. Use with caution and test thoroughly.

## Signature / Usage

Pass a `dataStrategy` function when creating the router. It receives `matches`, `request`, `params`, `context`, `runClientMiddleware`, and `fetcherKey`, and must return `Record<string, DataStrategyResult>`:

```tsx
interface DataStrategyResult {
  type: "data" | "error";
  result: unknown; // data, Error, Response, data()
}
```

Basic example — log around handler execution:

```tsx
let router = createBrowserRouter(routes, {
  async dataStrategy({ matches, request, runClientMiddleware }) {
    // shouldCallHandler() returns true for routes that need their handler run
    // (new routes + routes needing revalidation for loads; the action route only
    // for submissions; the fetcher route only for fetcher calls)
    const matchesToLoad = matches.filter((m) => m.shouldCallHandler());

    const results: Record<string, DataStrategyResult> = {};
    await runClientMiddleware(() =>
      Promise.all(
        matchesToLoad.map(async (match) => {
          console.log(`Processing ${match.route.id}`);
          results[match.route.id] = await match.resolve();
        }),
      ),
    );
    return results;
  },
});
```

### Calling Route Middleware

If routes use `middleware`, wrap handler execution in `runClientMiddleware` so middleware still runs around the handlers. `runClientMiddleware` accepts the same arguments as `dataStrategy`, so a standalone `dataStrategy` implementation composes cleanly:

```tsx
let router = createBrowserRouter(routes, {
  async dataStrategy({ runClientMiddleware }) {
    return await runClientMiddleware(loggingDataStrategy);
  },
});
```

### Advanced Handler Execution

Pass a callback to `match.resolve()` to control how the handler itself is invoked (e.g. pass a custom second argument):

```tsx
await Promise.all(
  matchesToLoad.map((match) =>
    match.resolve((handler) => {
      let customContext = getCustomContext();
      return handler(customContext); // passed as the loader/action's 2nd param
    }),
  ),
);
```

### Custom Revalidation Behavior

Pass your own `defaultShouldRevalidate` into `match.shouldCallHandler()`; `match.shouldRevalidateArgs` holds the arguments that would be passed to the route's own `shouldRevalidate`:

```tsx
const matchesToLoad = matches.filter((match) => {
  let defaultShouldRevalidate = customShouldRevalidate(match.shouldRevalidateArgs);
  return match.shouldCallHandler(defaultShouldRevalidate);
});
```

### Advanced: Custom Middleware via `handle`

Unlikely to be needed now that React Router has built-in `middleware`, but a `dataStrategy` can implement its own sequential middleware via `route.handle`, then run loaders in parallel with data the middleware produced:

```ts
const routes = [
  {
    id: "parent",
    path: "/parent",
    loader({ request }, context) {},
    handle: {
      async middleware({ request }, context) {
        context.parent = "PARENT MIDDLEWARE";
      },
    },
    children: [/* ... */],
  },
];

let router = createBrowserRouter(routes, {
  async dataStrategy({ matches, params, request }) {
    let context = {};
    for (const match of matches) {
      if (match.route.handle?.middleware) {
        await match.route.handle.middleware({ request, params }, context);
      }
    }
    let matchesToLoad = matches.filter((m) => m.shouldCallHandler());
    let results = await Promise.all(
      matchesToLoad.map((match) => match.resolve((handler) => handler(context))),
    );
    return results.reduce(
      (acc, result, i) => Object.assign(acc, { [matchesToLoad[i].route.id]: result }),
      {},
    );
  },
});
```

### Advanced: Custom Handler (e.g. GraphQL)

Set `route.loader = true` (so the route "has a loader" without an actual per-route implementation), store GQL fragments on `route.handle`, and issue a single combined request instead of calling `match.resolve()`:

```ts
const routes = [
  {
    id: "parent",
    path: "/parent",
    loader: true,
    handle: { gql: gql`fragment Parent on Whatever { parentField }` },
    children: [/* ... */],
  },
];

let router = createBrowserRouter(routes, {
  async dataStrategy({ matches }) {
    const matchesToLoad = matches.filter((m) => m.shouldCallHandler());
    let gql = getFragmentsFromRouteHandles(matchesToLoad);
    let data = await fetchGql(gql);
    return parseResultsFromGql(matchesToLoad, data); // keyed by route id
  },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `matches` | `DataStrategyMatch[]` | Matched routes for the current request |
| `request` | `Request` | The current request |
| `params` | `Params` | Route params |
| `context` | `unknown` | Router context |
| `runClientMiddleware` | `(fn) => Promise<Record<string, DataStrategyResult>>` | Runs route `middleware` around the handlers executed inside `fn` |
| `fetcherKey` | `string \| null` | The key of the fetcher targeted by this execution, or `null` for route loader/action executions. Fetchers reloaded by a navigation or explicit revalidation also provide their key |
| `unstable_initiator` | `"initialization" \| "navigation" \| "fetcher" \| "revalidation" \| "static"` | Experimental (8.5.0). The operation that initiated this execution (see Request Metadata below) |
| `unstable_navigationType` | `"PUSH" \| "REPLACE" \| "POP" \| null` | Experimental (8.5.0). The history action for a navigation-initiated execution, or `null` for other executions |
| `match.shouldCallHandler(defaultShouldRevalidate?)` | `(boolean?) => boolean` | Whether this route's handler should run for the request |
| `match.shouldRevalidateArgs` | `object` | Arguments that would be passed to the route's own `shouldRevalidate` |
| `match.resolve((handler) => ...)` | `(fn?) => Promise<DataStrategyResult>` | Calls through to the route handler; calling it always invokes the handler |

## Notes

- `match.shouldLoad` (boolean) is **deprecated** in favor of `match.shouldCallHandler()` / `match.shouldRevalidateArgs`. Key difference: with `shouldLoad`, calling `resolve()` on all matches was safe (it internally checked `shouldLoad`); with `shouldCallHandler`, you must pre-filter matches yourself before calling `resolve()`, since `resolve()` unconditionally invokes the handler
- Default behavior executes all `loader`s in parallel; `dataStrategy` exists precisely to override this for advanced use cases
- Incorrect implementations can desynchronize UI state from the server — test thoroughly

### Request Metadata (unstable)

`unstable_initiator` and `unstable_navigationType` are experimental and may change in minor or patch releases. `unstable_initiator` identifies why the data strategy is running:

- `"initialization"`: Initial router data loading
- `"navigation"`: A navigation, including action submissions and subsequent loader revalidation
- `"fetcher"`: A fetcher operation, including loader revalidation after a fetcher action
- `"revalidation"`: Explicit revalidation, such as `useRevalidator().revalidate()`
- `"static"`: Execution by `createStaticHandler` on the server

Requests that reload fetchers during a navigation or explicit revalidation retain that initiator while providing the targeted `fetcherKey`; don't use `fetcherKey` alone to determine what initiated the execution. `unstable_navigationType` is `"PUSH"`, `"REPLACE"`, or `"POP"` for navigation-initiated executions, including fetchers reloaded by that navigation; it is `null` for initialization, standalone fetcher operations, explicit revalidation, and static handler executions, and it describes the in-flight navigation rather than the previously committed location. For example, a Data Mode `dataStrategy` can distinguish back/forward navigations with `unstable_initiator === "navigation" && unstable_navigationType === "POP"`. Framework Mode exposes equivalent request metadata through `unstable_fetch` (see [Custom Fetch](./custom-fetch.md)).

- Source: https://reactrouter.com/how-to/data-strategy (docs/how-to/data-strategy.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/data-strategy.md)

## Related

- [./middleware.md](./middleware.md)
- [./fetchers.md](./fetchers.md)
