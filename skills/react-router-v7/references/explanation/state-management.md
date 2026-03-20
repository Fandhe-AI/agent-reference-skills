# State Management

React Router replaces most client-side state management by synchronizing server and client state through loaders, actions, and automatic revalidation.

**Availability**: Framework Mode primarily; Data Mode for some patterns.

## 詳細説明

### Where State Lives in React Router

Instead of managing client-side caches of server data, React Router provides natural state homes:

| State type | Where to store |
|---|---|
| Server data (lists, records) | Loaders + automatic revalidation |
| Pending/submitting state | `useNavigation` / `useFetcher` |
| Persistent UI preferences | Cookies |
| Shareable UI state (filters, tabs) | URL search params |
| Server-managed sessions | Server sessions |
| Action results / validation errors | `actionData` prop |

### Anti-Pattern to Avoid

Manual state synchronization with `useState` + `useEffect` + `fetch`:
```tsx
// ❌ Complex, error-prone
const [isSubmitting, setIsSubmitting] = useState(false);
const [errors, setErrors] = useState(null);
// ... manual fetch, error handling, state sync
```

### React Router Approach

Let the framework handle network state:
```tsx
// ✅ Simple
const navigation = useNavigation();
const isSubmitting = navigation.formAction === "/signup";
const errors = actionData?.errors;
```

## コード例

**URL search params for UI state (shareable, no useState needed):**
```tsx
import { Form, useSearchParams } from "react-router";

export function List() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "list";

  return (
    <div>
      <Form>
        <button name="view" value="list">View as List</button>
        <button name="view" value="details">View with Details</button>
      </Form>
      {view === "list" ? <ListView /> : <DetailView />}
    </div>
  );
}
```

**Cookies for persistent UI state (e.g., sidebar open/closed):**
```tsx
import { createCookie, data } from "react-router";
export const prefs = createCookie("prefs");

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = (await prefs.parse(request.headers.get("Cookie"))) || {};
  return data({ sidebarIsOpen: cookie.sidebarIsOpen });
}

export async function action({ request }: Route.ActionArgs) {
  const cookie = (await prefs.parse(request.headers.get("Cookie"))) || {};
  const formData = await request.formData();
  cookie.sidebarIsOpen = formData.get("sidebar") === "open";
  return data(true, {
    headers: { "Set-Cookie": await prefs.serialize(cookie) },
  });
}
```

## 注意点

- React Router handles most state needs; reach for Redux/React Query/Apollo only for complex client-only state or advanced caching scenarios
- Automatic revalidation after actions keeps data fresh without manual cache invalidation
- URL-based state is inherently shareable and survives page refreshes

## 関連

- [Form vs. Fetcher](./form-vs-fetcher.md)
- [Progressive Enhancement](./progressive-enhancement.md)
- [React Transitions](./react-transitions.md)
