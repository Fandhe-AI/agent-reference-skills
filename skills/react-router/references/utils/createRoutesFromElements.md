# createRoutesFromElements

Converts JSX `<Route>` elements into route configuration objects that can be used with data routers.

## Signature / Usage

```typescript
function createRoutesFromElements(
  children: React.ReactNode,
  parentPath?: string,
): RouteObject[]
```

```typescript
const routes = createRoutesFromElements(
  <>
    <Route index loader={step1Loader} Component={StepOne} />
    <Route path="step-2" loader={step2Loader} Component={StepTwo} />
    <Route path="step-3" loader={step3Loader} Component={StepThree} />
  </>
);

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | The React children (typically `<Route>` elements) to convert into a route configuration array |
| `parentPath` | `string` (optional) | Path of the parent route; used internally for recursive processing, not intended for direct application use |

Returns an array of `RouteObject`s compatible with data router implementations.

## Notes

- Available in **Data Mode** only (not Framework Mode or Declarative Mode)
- Enables a declarative JSX approach to defining routes while still using the data router APIs, bridging JSX-based route definitions and programmatic route configuration

## Related

- [matchRoutes](./matchRoutes.md)
