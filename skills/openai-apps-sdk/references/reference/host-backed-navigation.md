# Host-backed navigation

The sandbox runtime mirrors navigation history from the iframe into ChatGPT's UI. Use standard routing APIs, such as React Router, and the host keeps its navigation controls in sync with your UI.

## Signature / Usage

Adapted (not in the official docs): the official page's router example loses its JSX in the `.md` twin, so this is a reconstructed minimal version using the official `PizzaListPlugin` / `useParams` names.

```tsx
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function PizzaListPlugin() {
  const { placeId } = useParams();
  return (
    <main>
      <p>{placeId ?? "Choose a place"}</p>
    </main>
  );
}

export default function PizzaListRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaListPlugin />}>
          <Route path="place/:placeId" element={<PizzaListPlugin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

```typescript
import { createElement } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
function NavigationExample() {
  const navigate = useNavigate();

  function openDetails(placeId: string) {
    navigate(`place/${placeId}`, { replace: false });
  }

  function closeDetails() {
    navigate("..", { replace: true });
  }

  return createElement(
    "div",
    null,
    createElement(
      "button",
      { onClick: () => openDetails("pizzeria") },
      "Open details"
    ),
    createElement("button", { onClick: closeDetails }, "Close details")
  );
}
```

## Notes

- Source: https://developers.openai.com/plugins/reference#host-backed-navigation (local .md twin copy, fetched 2026-11-14).
- Adapted from the official docs: the router-setup JSX in the official `.md` twin is truncated, so the router example above is reconstructed; the programmatic-navigation example is verbatim.
- Works with React Router's `BrowserRouter` and standard programmatic navigation (`useNavigate`).

## Related

- [window-openai-bridge.md](./window-openai-bridge.md)
