# figma.annotations

Sub-API for managing annotation categories in the current file.

## Signature / Usage

```ts
// List existing categories
const categories = await figma.annotations.getAnnotationCategoriesAsync();

// Add a new category
const category = await figma.annotations.addAnnotationCategoryAsync({
  label: 'Accessibility',
  color: 'RED',
});

// Retrieve by ID
const found = await figma.annotations.getAnnotationCategoryByIdAsync(category.id);
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `getAnnotationCategoriesAsync()` | `() => Promise<AnnotationCategory[]>` | All annotation categories in the current file |
| `getAnnotationCategoryByIdAsync()` | `(id: string) => Promise<AnnotationCategory \| null>` | Find a category by ID; returns `null` if not found |
| `addAnnotationCategoryAsync()` | `(input: { label: string; color: AnnotationCategoryColor }) => Promise<AnnotationCategory>` | Create a new annotation category |

## Notes

- `AnnotationCategoryColor` is an enum of preset color names (e.g. `'RED'`, `'GREEN'`, `'BLUE'`).
- Annotation categories are file-scoped — they appear in all pages of the document.

## Related

- [figma global object](./figma-global.md)
- [data-types](./data-types.md)
