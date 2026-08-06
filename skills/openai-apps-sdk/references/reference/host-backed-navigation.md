# Host-backed navigation

The sandbox runtime mirrors navigation history from the iframe into ChatGPT's UI. Use standard routing APIs, such as React Router, and the host keeps its navigation controls in sync with your UI.

## Signature / Usage

```tsx
export default function PizzaListRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PizzaList />}
          children={[
            <Route path="place/:placeId" element={<Details />} />,
          ]}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

```ts
const navigate = useNavigate();

function openDetails(placeId: string) {
  navigate(`place/${placeId}`, { replace: false });
}

function closeDetails() {
  navigate("..", { replace: true });
}
```

## Notes

- Works with React Router's `BrowserRouter` and standard programmatic navigation (`useNavigate`).

## Related

- [window-openai-bridge.md](./window-openai-bridge.md)
