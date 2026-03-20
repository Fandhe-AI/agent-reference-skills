# Form vs. Fetcher

React Router provides two overlapping tools for form submissions. The primary criterion for choosing between them is **whether the URL should change**.

**Availability**: Framework Mode and Data Mode.

## 詳細説明

| Situation | Tool |
|-----------|------|
| Creating a record → redirect to new page | `<Form>` + `useNavigation` |
| Deleting a record → redirect to list | `<Form>` + `useNavigation` |
| Updating a single field in a list | `useFetcher` |
| Deleting an item while staying on the page | `useFetcher` |
| Loading data for a popover/combobox | `useFetcher` |
| Marking an article as read | `useFetcher` |

**API mapping:**

| Navigation/URL API | Fetcher API |
|---|---|
| `<Form>` | `<fetcher.Form>` |
| `actionData` (prop) | `fetcher.data` |
| `navigation.state` | `fetcher.state` |
| `navigation.formAction` | `fetcher.formAction` |
| `navigation.formData` | `fetcher.formData` |

## コード例

**With URL change — creating a record:**
```tsx
export async function action({ request }: Route.ActionArgs) {
  const recipe = await db.recipes.create(await request.formData());
  return redirect(`/recipes/${recipe.id}`);
}

export function NewRecipe({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/recipes/new";

  return (
    <Form method="post">
      <input name="title" />
      <button type="submit">
        {isSubmitting ? "Saving..." : "Create Recipe"}
      </button>
    </Form>
  );
}
```

**Without URL change — deleting a list item:**
```tsx
function RecipeListItem({ recipe }: { recipe: Recipe }) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  return (
    <li>
      <h2>{recipe.title}</h2>
      <fetcher.Form method="post">
        <input type="hidden" name="id" value={recipe.id} />
        <button disabled={isDeleting} type="submit">
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </li>
  );
}
```

## 注意点

- `useFetcher` maintains independent state per instance, making it ideal for per-item operations in a list
- `useFetcher` can also call `fetcher.load("/url")` to fetch data without a form submission (e.g., for hover-triggered popovers)
- `useNavigation` reflects the state of the **current page navigation**; multiple simultaneous mutations require `useFetcher`

## 関連

- [Concurrency](./concurrency.md)
- [Race Conditions](./race-conditions.md)
- [State Management](./state-management.md)
- [Progressive Enhancement](./progressive-enhancement.md)
