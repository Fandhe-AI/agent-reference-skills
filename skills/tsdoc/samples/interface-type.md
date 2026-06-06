# Interface and Type Comment

Document an exported interface with per-property TSDoc.

```typescript
/**
 * Item displayed in a category card.
 *
 * @category Model
 */
export interface CategoryCardItem {
  /** Unique identifier for the category */
  id: string;
  /** Display name shown to the user */
  name: string;
  /** URL path to the category detail page */
  href: string;
  /** Optional thumbnail image URL */
  thumbnailUrl?: string;
}
```

## Notes

- Write a single `/** ... */` block above each property, not `@param`
- The interface-level block uses `@category Model` (or another unified name) to group types in generated docs
- Optional properties (`?`) should describe the default behaviour or absence semantics in their comment
- Avoid repeating the property name in the description (e.g., prefer "Display name shown…" over "The name that is displayed…")
