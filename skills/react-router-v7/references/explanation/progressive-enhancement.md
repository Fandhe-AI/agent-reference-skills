# Progressive Enhancement

A web design strategy that ensures basic functionality works for everyone, while users with JavaScript and faster connections receive an enhanced experience.

**Availability**: Framework Mode only (requires SSR).

## 詳細説明

React Router supports progressive enhancement through Server-Side Rendering (SSR), which is the default in Framework Mode. The core principle: build the basic HTML-native version first, then layer on JavaScript enhancements.

**Why it matters for performance:**
```
Typical SPA:
HTML        |---|
JavaScript      |---------|
Data                      |---------------|
                            page rendered 👆

React Router SSR:
                   👇 first byte
HTML        |---|-----------|
JavaScript      |---------|
Data        |---------------|
              page rendered 👆
```

While only 5% of users have permanently slow connections, **100% of users experience slow connections 5% of the time**.

**Core HTML primitives work without JavaScript:**
- `<a href="...">` → rendered as a standard anchor, enhanced to client-side navigation when JS loads
- `<Form method="post">` → submits to server, enhanced with client-side mutations when JS loads

**Enhancement is iterative** — you are not building two separate codebases. You build the basic version and add enhancements progressively.

## コード例

**Basic add-to-cart (works without JavaScript):**
```tsx
export function AddToCart({ id }) {
  return (
    <Form method="post" action="/add-to-cart">
      <input type="hidden" name="id" value={id} />
      <button type="submit">Add To Cart</button>
    </Form>
  );
}
```

**Enhanced with `useFetcher` (prevents navigation when JS loaded):**
```tsx
import { useFetcher } from "react-router";

export function AddToCart({ id }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/add-to-cart">
      <input name="id" value={id} />
      <button type="submit">
        {fetcher.state === "submitting" ? "Adding..." : "Add To Cart"}
      </button>
    </fetcher.Form>
  );
}
```

**Search box with navigation feedback:**
```tsx
import { useNavigation } from "react-router";

export function SearchBox() {
  const navigation = useNavigation();
  const isSearching = navigation.location?.pathname === "/search";

  return (
    <Form method="get" action="/search">
      <input type="search" name="query" />
      {isSearching ? <Spinner /> : <SearchIcon />}
    </Form>
  );
}
```

## 注意点

- Everyone has JavaScript "disabled" until it finishes loading — design accordingly
- Use URLs (search params) as the source of truth for UI state instead of client-side state where possible
- `<Link>` renders as a plain `<a>` tag, so it works without JavaScript
- Progressive enhancement reduces the need for complex client-side state management

## 関連

- [State Management](./state-management.md)
- [Form vs. Fetcher](./form-vs-fetcher.md)
- [Backend For Frontend](./backend-for-frontend.md)
