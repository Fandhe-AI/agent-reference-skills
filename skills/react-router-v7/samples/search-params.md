# Search Params

Read and update URL search parameters with `useSearchParams` without triggering a full navigation.

```tsx
// app/routes/products.tsx
import { useSearchParams } from "react-router";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "name";

  return (
    <div>
      <select
        value={category}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("category", e.target.value);
            return prev;
          })
        }
      >
        <option value="all">All</option>
        <option value="books">Books</option>
        <option value="music">Music</option>
      </select>

      <button onClick={() => setSearchParams({ category, sort: "price" })}>
        Sort by Price
      </button>

      <p>Showing: {category} / sorted by {sort}</p>
    </div>
  );
}
```

## Notes

- `setSearchParams` with a callback form (`prev => { prev.set(...); return prev; }`) is safe for partial updates without losing other params
- Setting params causes a navigation and updates the browser URL
- `searchParams` is a stable reference — safe in `useEffect` dependency arrays
- Available in all modes: Framework, Data, and Declarative
