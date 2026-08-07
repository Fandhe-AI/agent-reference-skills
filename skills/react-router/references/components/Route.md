# Route

Configures an element to render when a pattern matches the current location. Must be rendered within a `<Routes>` element. Available in Framework, Data, and Declarative modes.

## Signature / Usage

```tsx
function Route(props: RouteProps): React.ReactElement | null

// Declarative Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
      </Routes>
    </BrowserRouter>
  );
}

// Data Router with JSX notation
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
| `action` | `function` | The route action. |
| `caseSensitive` | `boolean` | Whether the path should be case-sensitive. Defaults to `false`. |
| `Component` | `React.ComponentType` | The React Component to render when this route matches. Mutually exclusive with `element`. |
| `children` | `Route[]` | Child `Route` components. |
| `element` | `React.ReactElement` | The React element to render when this Route matches. Mutually exclusive with `Component`. |
| `ErrorBoundary` | `React.ComponentType` | Component to render if an error occurs. Mutually exclusive with `errorElement`. |
| `errorElement` | `React.ReactElement` | Element to render if an error occurs. Mutually exclusive with `ErrorBoundary`. |
| `handle` | `any` | The route handle. |
| `HydrateFallback` | `React.ComponentType` | Component to render while loading data. Mutually exclusive with `hydrateFallbackElement`. |
| `hydrateFallbackElement` | `React.ReactElement` | Element to render while loading data. Mutually exclusive with `HydrateFallback`. |
| `id` | `string` | Unique identifier for this route (for Data Routers). |
| `index` | `boolean` | Whether this is an index route. |
| `lazy` | `function` | Function returning a promise that resolves to the route object. Used for code-splitting. |
| `loader` | `function` | The route loader. |
| `path` | `string` | The path pattern to match. If unspecified, becomes a layout route. |
| `shouldRevalidate` | `function` | Function to determine if the route should revalidate. |

## Notes

- Routes rendered this way do not participate in data loading, actions, code splitting, or other route module features (those are configured via route objects / `routes.ts` in Framework mode).
- Available in all three modes: Framework, Data, and Declarative.

## Related

- [Routes](./Routes.md)
- [Outlet](./Outlet.md)
